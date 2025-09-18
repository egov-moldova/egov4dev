# Security considerations

## Authentication
All calls to MDocs operations are authenticated by MDocs. Authentication is performed using the client certificate during HTTPS transport.

For information regarding obtaining a client certificate and registration, see:
- Obtaining credentials
- Client registration and network access

Note: Installation, registration, or explicit trusting of the obtained client certificate in the operating system or framework used by the integrating e-service is specific to that environment and is out of scope of this document.

## Authorization
After successful authentication, requests are authorized according to the configured permissions and integration settings.

## Encryption
All communication with MDocs REST services is encrypted using standard TLS (HTTPS). The client certificate used to initiate the encrypted transport is also used for authentication.