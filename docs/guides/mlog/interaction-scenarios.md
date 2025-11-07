## Registration Process

The most important integration scenario with MLog is request to register an event.

An event may be a single JSON object or a batch of JSON objects. Are accepted signed, unsigned or mixed (signed and un-signed) versions of events in an input request.

A signed event is an event signed with IS private certificate and is later used to prove that the event remains unchanged and was issued by IS. To sign a legal event, the IS must be registered with MPass system.

**Remark.** Sending an event for registration requires the IS to be registered with the MLog system. Any event received from an IS which is not registered with MLog system is rejected.

<img src="../images/mlog1.svg">

Here is a short description of registration process using MLog:

1. IS sends an event for registration. An event may be a single JSON object or a batch of JSON objects. MLog accepts signed, un-signed or mixed (signed and un-signed) events in one request.

2. MLog receives the event, associate a unique identifier to it and sent a success response back to IS with the associated unique identifier.

3. MLog processes received events later in a separate process doing the following steps:
   - Check that the client certificate is correctly configured in MPass (certificate not expired, etc)
   - Validate the signature of signed events
   - Store the original event (including signature) in the internal storage
   - Extract well-known fields from the input event and store it into the internal search indices
   - Collect various statistics about received events
   - Collect configured KPI for MLog system

## Search Process

MLog also exposes an API which allow IS to search for previously registered legal events.

Here is a short description of searching process using MLog:

1. IS send a search request to MLog system.

2. The request is registered in the MLog system as a separate event. See Registration process for details.

3. MLog Check that the client certificate is correctly configured in MPass (certificate not expired, etc)

4. MLog search in the internal database for the requested events. Search is done only against the configured compartments of the internal search indices. The configuration is stored in MPass.

5. MLog uses the configuration received from MPass to filter returned events to contain a specific list of fields (if required for any security reasons).

6. MLog collects various statistics about received events and processes special events.

7. MLog collects configured KPI for MLog system.

<img src="../images/mlog2.svg">
