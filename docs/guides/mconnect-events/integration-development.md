## Client credentials and network access

Before being able to interact with MConnect Events, a client must be registered accordingly by the Service owner. To perform such a registration, please provide your system certificate. If you don't have one, you can request a system certificate for authentication from Information Technology and Cyber Security Service or E-Government Agency.

For security reasons, the client MUST use a different certificate for integration with staging and production environments, and corresponding private keys MUST be kept as confidential as possible. MConnect Events does not require access to client private keys for integration.

MConnect Events API is accessible only to a registered set of IP addresses and, for security sensitive information systems, this means configuring routes and/or a VPN between the client and MConnect Events.

To register a client and get network access, please write a request by e-mail to the Service owner, providing your public IP address or the VPN assigned private IP address and public key certificate.

## Environments

There are 2 service environments available: staging and production.

| Environment | Endpoint URL |
|------------|--------------|
| **Staging** | |
| Swagger UI address | https://mconnectevents.staging.egov.md:8443/swagger |
| Base address | https://mconnect-events.staging.egov.md:8443/ |
| WebSocket consumer base address | wss://mconnect-events.staging.egov.md:8443/ |
| **Production** | |
| Base address | https://mconnect-events.gov.md:8443/ |
| WebSocket consumer base address | wss://mconnect-events.gov.md:8443/ |

Notice the wss schema used by efficient consumers, meaning WebSocket secured. Endpoints are accessible only using a valid client certificate from registered IPs.

## Personal data processing

MConnect Events logs details related to the consumption of events that include personal data. This requires the following details:

- **Legal entity identifier (IDNO)** – taken from consumer system registration.
- **Legal basis for personal data processing** – taken from consumer configuration (per source or event type) or extracted from each payload using configured JSON path.
- **Legal reason for personal data processing** – taken from consumer configuration (per source or event type) or extracted from event payload using configured JSON path.
- **Personal data subject** – extracted from event payload using configured JSON path

As events are produced and then consumed without a consumer user's explicit request, the personal data processor is considered the consumer's system.

## Integration checklists

Integrations MUST be developed and tested within the staging environment only. To ensure high availability, no performance, security or any other kind of tests are allowed on production environment.

### General checklist for any client:

1. Base address and client certificate are configurable.
2. Client certificate private key is secure and differs between staging and production environments.
3. Any intermediary certificate is sent with the client certificate during handshake.
4. The IP address that is visible to MConnect Events is stable. The address can be a public Internet address or private one from government network.
5. Internal procedure is set up to remind system administrators about certificate expiration in advance.

### Checklist for producers:

1. Producers implement an outbox pattern to ensure no events are skipped from being produced.
2. Events have a correct URI set in CloudEvent source attribute.
3. Events have unique identifiers set in CloudEvent id attribute per source.
4. All producer instances from the same source have a consistent value set in CloudEvent time attribute.
5. For events that require ordered consumption, the producer sets the partitionkey attribute corresponding to event payload. Partition keys should not be constant as this limits the scalability.
6. Events that include personal data include enough information for logging personal data synchronization.
7. Each event is not larger than 64 KB.
8. Event batches are not larger than 1 MB.

### Checklist for consumers:

1. Events consumption is properly confirmed, either individually or periodically.
2. Events are consumed in an idempotent manner, i.e. processing already processed events do not result in double processing or do not create some additional business effect.
3. Dead events are properly reported back to MConnect Events.
4. Events shall not be considered dead for technical errors, for example due to Consumer network, database or some other component being temporarily inaccessible or in a wrong configuration. Events having a wrong structure are a good example of dead events.
5. Consumers use WebSocket protocol.
6. Consumers that use long polling for integration use the returned consumer instance base address without any interpretation.
7. Consumers that use long polling for integration explicitly delete the instance when shutting down.
8. Consumers reconnect when the WebSocket connection is lost or create another long-polling instance when the previous one expires.
9. Consumer instances are scaled in divisors of 12.
10. Consumers are monitored to run permanently or periodically to not miss events.
