## Authentication

All calls to MDocs operations are authenticated by MDocs. The authentication is performed by using the client certificate used for HTTPS transport.
For information regarding obtaining a client certificate and registration, see Obtaining credentials and Client registration and network access.
Note! The description of the process of installing, registering or explicitly trusting the obtained client certificate in the operating system or framework used by the integrating e-Service has to be done accordingly, is specific to that environment and it’s out of the scope of this document.

## Authorization
After successful authentication, all event requests are checked for correct configuration in MPass system.

## Encryption
All communication with MDocs REST services are encrypted by using standard TLS protocol (HTTPS). The client certificate used to initiate the encrypted transport is also used for Authentication.
