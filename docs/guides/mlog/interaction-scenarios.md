# MLog — Interaction scenarios

## Registration process

The most important integration scenario with MLog is registering an event. An event may be a single JSON object or a batch of JSON objects. MLog accepts signed, unsigned, or mixed (signed and unsigned) events in a single request.

A signed event is an event signed with the IS private certificate and is later used to prove that the event remains unchanged and was issued by the IS. To sign a legal event, the IS must be registered with the MPass system.

Note: Sending an event for registration requires the IS to be registered with the MLog system. Any event received from an unregistered IS is rejected.

Steps of the registration process:

1. The IS sends an event for registration (single JSON object or batch). MLog accepts signed, unsigned, or mixed events in one request.
2. MLog receives the event, associates a unique identifier (UID) to it, and returns a success response to the IS with the associated UID.
3. MLog then processes received events asynchronously by:
   - Checking that the client certificate is correctly configured in MPass (e.g., not expired)
   - Validating signatures of signed events
   - Storing the original event (including signature) in internal storage
   - Extracting well‑known fields from the input event and storing them in internal search indices
   - Collecting various statistics about received events
   - Collecting configured KPIs for the MLog system

## Search process

MLog also exposes an API that allows IS to search for previously registered legal events. See the API Reference for allowed parameters and filters.
