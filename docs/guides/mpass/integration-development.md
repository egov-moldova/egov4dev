This chapter describes the process of developing an integration.

## Service registration

Before being able to interact with MPass, a Service must be registered accordingly in MPass. To perform such a registration, please generate a self-signed or provide any existing certificate file (in .cer file format) to Service owner.

For security reasons, Service test and production environments MUST use a different certificate and corresponding private keys MUST be kept as confidential as possible. MPass does not require access to Service private keys for integration.

## Returned attributes

After a successful authentication and user consent (if required), MPass generates and returns a SAML Response with authenticated identity attributes. The list of the returned attributes is configurable as part of Service registration.

The following table contains the list of standard attributes.

| Attribute name | Type | Description |
|----------------|------|-------------|
| NameIdentifier | string (128) | Username or IDNP. This is a special attribute and it should be returned as NameID (i.e. SubjectAttribute) in SAML. |
| IsResident | Boolean | Specifies whether the user is verified to be a resident of Republic of Moldova. |
| FirstName | string (64) | User's first name or given name. |
| LastName | string (64) | User's last name or surname. |
| BirthDate | string (10) | User's birth date in "yyyy-MM-dd" format (e.g. "1990-12-31"). |
| Gender | integer | User's gender. Allowed values:<br>• 0 – Unspecified<br>• 1 – Male<br>• 2 – Female |
| EmailAddress | string (64) | User's e-mail address. |
| MobilePhone | string (16) | User's mobile phone number. |
| HomePhone | string (16) | User's home phone number. |
| Language | string (2) | User's preferred language. Allowed values: "ro", "ru", "en". |
| AdministeredLegalEntity | string (512) | The name and identifier of the companies (zero or more) the user is administering in the following format:<br>"Legal Entity Name IDNO"<br>Notice that the IDNO is after the last space of the name. |
| IDNO | string (13) | User's organization identifier. This attribute is only available if the authentication was performed using an instrument which includes this value in the certificate. |
| CompanyName | string (128) | User's organization or company name. This attribute is only available if the authentication was performed using an instrument which includes this value in the certificate. |

A Service can have custom attributes created (usually used for authorization purpose, such as Role, Permissions, etc.), assigned to identities and returned as part of the same SAML Response with values corresponding to the authenticated identity.

Please identify the set of required attributes (including custom attribute names and values) to be returned by MPass during the design phase of the Service and specify them as part of Service registration.

## Network access

Because MPass interface is exposed to public, there is no need for special network configuration or access control list modifications. A developer can integrate with MPass using its local development machine and use a localhost address for AssertionConsumerServiceURL in AuthnRequest.

Note that, for security reasons, a localhost address is not accepted in MPass production environment.

## Authentication methods

MPass provides several authentication methods. All strong authentication methods require a strong authentication instrument, which means that the private key of the person that authenticates is generated and held on special devices. It is in the integrator responsibility to obtain such a secure device from available providers.

Weak authentication methods (such as username/password) are discouraged and usually not enabled for any systems in production environment.

## System environments

There are 2 services environments available: a testing and a production environment.

| Environment | SSO URL | SLO URL |
|-------------|---------|---------|
| Testing | https://mpass.staging.egov.md/login/saml | https://mpass.staging.egov.md/logout/saml |
| Production | https://mpass.gov.md/login/saml | https://mpass.gov.md/logout/saml |

Integrations MUST be developed and tested within the testing environment only. To ensure high availability, no performance, security or any other kind of tests are allowed on production environment.

## SAML metadata

MPass exposes SAML metadata, conformant with SAML Metadata specification at the following URL:

| Environment | Metadata Index | SAML Metadata URL |
|-------------|----------------|-------------------|
| Testing | https://mpass.staging.egov.md/meta | https://mpass.staging.egov.md/meta/saml |
| Production | https://mpass.gov.md/meta | https://mpass.gov.md/meta/saml |

The index page also includes links to MPass certificate used to sign SAML messages as Identity Provider.
