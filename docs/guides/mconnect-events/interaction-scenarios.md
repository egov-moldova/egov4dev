#Interaction scenarios

MConnect Events integrates two types of clients: event producers and event consumers. A client information system can be configured to be either a producer, a consumer, or both.

As defined by CloudEvents standard, all events have a type. In MConnect Events context, types are named using the following convention: “Organization.System.Entity.Action” (for example “AGE.MPass.User.Authenticated”). A Producer is authorized to produce and a Consumer to consume only certain types of events

##**Produce events**

A client system that is authorized as Producer can only produce events of **authorized types**. Produced events are authorized, **validated against the configured schema** and persisted in one or more places for consumption. MConnect Events then responds with HTTP 200 OK when all of these succeed, thus ensuring reliable messaging.

A Producer can produce events one by one or in batches. Note that there are some general limits applied to the size of each event and the entire message (see Limits). MConnect Events persists either all events to one or more destination consumers or none, in a transactional manner. This means that it is safe for a Producer to **retry producing events** on errors. Nonetheless, taking into account that it is possible for the error to not get back due to networking or other kind of issues, retries might result in duplicate events produced. To minimize duplication, it is important to assign a unique id attribute for each event as specified by CloudEvents standard and use it including on retry.

Business processes based on event exchange typically require that no event must be skipped, due either to business or technical errors. Thus, to ensure at least once delivery, it is recommended that producers implement the [**outbox pattern**](https://en.wikipedia.org/wiki/Inbox_and_outbox_pattern) in their informational systems. This will ensure events will be sent or not according to transactional changes in their databases.

A Producer can produce events in parallel, from multiple instances. MConnect Events is a scalable system and can handle a significant number of events.

For performance reasons, MConnect Events does not by default guarantee ordered consumption of events, meaning that events that are close in time might be seen by consumers in a different order they were produced by producers. **If ordered consumption is required** for some entity (for example a person or document), Producer must set partition key to entity identifier according to CloudEvents standard partitioning extension (for example for a person set partitionkey to idnp:{idnp}).


##**Consume events**
A client system that is authorized as Consumer can only consume events of **authorized types**. Consumers are actively polling for their events using either HTTP long polling technique or by implementing the efficient and strongly recommended **WebSocket protocol** defined in this document. In both cases, MConnect Events returns pending events for consumption, each of them having an associated offset restarted when consumer connects.

To ensure reliable delivery of events in at-least-once manner, the Consumer must **confirm successful consumption of events**. Each consumed event includes an offset that is restarted at the beginning of consumer session. The consumer confirms the consumption of each event or, for efficiency, a batch of events by including the offset of the last successfully consumed event in the confirmation.

For events that cannot be consumed due to business reasons (required field missing, invalid data, etc.), the Consumer can modify and report the event to MConnect Events as dead. **Dead events** are stored in a special place for manual review or for another instance of Consumer that explicitly consumes dead events. It is important to note that events shall not be considered dead for technical errors, for example due to Consumer network, database or some other component not being available.

Technical errors, non-delivered confirmations and other potential issues might result in the same events being consumed by the Consumer. Thus, it is very important that the Consumer **consumes all events in an idempotent manner**. This means that, depending on the implemented business logic, the Consumer must distinguish initial consumption of event from repeated one, processed partially or completely, then finalize the processing and confirm the consumption similarly in all cases.

A Consumer can consume events in parallel, from **multiple instances**.

For systems that have multiple subcomponents that need to consume the same events, set the **consumer group** parameter to the name of the subcomponent. Test and dead events will be seen and consumed by all consumer instances, irrespective of any indicated consumer group.