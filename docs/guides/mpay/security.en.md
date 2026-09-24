## Authentication

An IServiceProvider interface implementation must validate the signature of the incoming SOAP messages sent by MPay. It is recommended that implementations re-use the existing validation logic provided by web-service frameworks, such as .NET WCF or J2EE JAX-WS, by correctly configuring the end-points.

For information regarding obtaining a service certificate and registration, see Obtaining credentials and Payable e-Service registration.

## Encryption

All communication with MPay SOAP service is encrypted by using standard TLS protocol (HTTPS). The client certificate used to initiate the encrypted transport is also used for Authentication.

## Saving SOAP messages

Because all SOAP messages are signed with the digital signature of the caller system, it is strongly recommended that messages are saved in some logging repository or directly against business objects, e.g. save payment confirmations along with SOAP message that includes the MPay signature. These persisted messages can further help in any issues related to clearance or other kind of disagreements.
