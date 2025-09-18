# MLog — Security

## Security considerations

### Authentication

All calls to MLog operations are authenticated by MLog. Authentication is performed using the client certificate presented over HTTPS (mutual TLS).

For information on obtaining a client certificate and registration, see the Integration development page: Obtaining credentials and Client registration and network access.

Important: Installing, registering, or explicitly trusting the obtained client certificate in the operating system or framework used by the integrating e‑service is specific to that environment and is out of scope for this document.

### Authorization

After successful authentication, all event requests are checked for correct configuration in the MPass system. If authorization fails:
- For register requests: the message is logged into error‑related indices in the MLog internal database.
- For search requests: an error message in JSON format is returned to the requester.

### Encryption

All communication with MLog REST services is encrypted using the standard TLS protocol (HTTPS). The client certificate used to initiate the encrypted transport is also used for authentication.
