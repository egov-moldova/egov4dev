## Using .NET integration library

For .NET clients, e-Government Agency developed an integration library, named Age.Integrations.MConnect.Events, available as a NuGet package either from the internal artifact Feeds or upon request.

### Configuring system certificate

To configure a producer or consumer, the client must first ensure the system certificate is added (as used for all platform-level services integration). The following code does that:

```csharp
builder.Services.AddSystemCertificate(builder.Configuration.GetSection("Certificate"));
```

The above code expects the following configuration section (in appsetting.json or from other configuration sources):

```json
"Certificate": {
  "Path": "path to pfx file or mounted Kubernetes secret as folder",
  "Password": "password for pfx file"
}
```

### Producing events

Then the client can configure a producer:

```csharp
builder.Services.AddCloudEventsProducer(builder.Configuration.GetSection("CloudEventsProducer"));
```

with the following configuration section:

```json
"CloudEventsProducer": {
  "BaseAddress": "https://mconnect-events.staging.egov.md:8443/ce/"
}
```

Here is the comprehensive list of configuration keys for a producer:

- **BaseAddress**: The base address for MConnect Events endpoint. Must be explicitly set (see Environments).
- **Timeout**: Timeout for produce calls. Defaults to 100 seconds.
- **JsonSerializerOptions**: Serializer options to use when serializing CloudEvent data to JSON.

The resulting service, ICloudEventsProducer, available from .NET Core dependency injection container, includes several overloaded methods named ProduceAsync that allow producing single instances of CloudEvent or a list of them as a batch.

CloudEvent.Id shall be unique for all events and CloudEvent.Source shall be set as a valid URN set in producer configuration.

Note that to ensure ordered consumption of events related to particular entity, set the CloudEvent.PartitionKey to the same value, such as entity identifier with a prefix (e.g. "idno:1010600034203").

### Consuming events

To configure a consumer, call:

```csharp
builder.Services.AddCloudEventHandlers(builder.Configuration.GetSection("CloudEventsConsumer"))
```

with the following configuration section:

```json
"CloudEventsConsumer": {
  "BaseAddress": "wss://mconnect-events.staging.egov.md:8443/ce/"
}
```

Here is the comprehensive list of configuration keys for a consumer:

- **BaseAddress**: The base address for MConnect Events web-socket endpoint. Must be explicitly set (see Environments).
- **ConnectTimeout**: Timeout for connection opening. Defaults to 30 seconds.
- **ReceiveBufferSize**: Buffer size to receive data in bytes. Defaults to 64 * 1024 bytes (64 KB).
- **ConsumeEvents**: Specifies whether standard events must be consumed. Defaults to true.
- **ConsumeTest**: Specifies whether test events must be consumed. Defaults to true.
- **ConsumeDead**: Specifies whether dead events must be consumed. Defaults to false.
- **Group**: The group this consumer belongs to. Defaults to null, meaning a default consumer group. Set this only when you want to consume the same events in a different consumer group.

Then fluently add one or more handlers, using either AddSingletonHandler<THandler, TData> or AddTransientHandler<THandler, TData> methods, where THandler implements IHandleCloudEvents<TData> interface, and TData is a strongly typed event data. You can also control the deserialization by providing an instance of JsonSerializerOptions to AddXXXHandler methods.

Alternatively, if you need custom logic for event handler identification and data deserialization, you can add a generic implementation of ICloudEventsConsumer by calling AddCloudEventsConsumer<TConsumer>. That handler will receive all events that the consumer can consume.

In both cases, the implementations of IHandleCloudEvents.HandleAsync and ICloudEventsConsumer.ConsumeAsync shall call ConfirmAsync on the provided context. In cases where the received event cannot be consumed, the consumers can call DeadAsync on the provided context, to report the event as dead. Dead events require manual intervention of MConnect Event administrators or the consumer calling with ConsumeDead set to true in configuration.
