#Integration development

This chapter describes the process of developing an integration.

###**Service registration**

Before being able to interact with MPass, a Service must be registered accordingly in MPass. To perform such a registration, please generate a self-signed or provide any existing certificate file (in .cer file format) to Service owner.

For security reasons, Service test and production environments MUST use a different certificate and corresponding private keys MUST be kept as confidential as possible. MPass does not require access to Service private keys for integration

###**Network access**

Because MPass interface is exposed to public, there is no need for special network configuration or access control list modifications. A developer can integrate with MPass using its local development machine and use a localhost address for AssertionConsumerServiceURL in AuthnRequest.

!!! warning "Atention"

    For security reasons, a **localhost** address is not accepted in MPass production environment.

###**Authentication methods**

MPass provides several authentication methods. All strong authentication methods require a strong authentication instrument, which means that the private key of the person that authenticates is generated and held on special devices. It is in the integrator responsibility to obtain such a secure device from available providers.

Weak authentication methods (such as username/password) are discouraged and usually not enabled for any systems in production environment.

Integrations MUST be developed and tested within the testing environment only. To ensure high availability, no performance, security or any other kind of tests are allowed on production environment.

###**SAML Metadata**

MPass exposes SAML metadata, conformant with SAML Metadata specification at the following URL:

<table>
  <thead>
    <tr>
      <th><strong>Environment</strong></th>
      <th><strong>Metadata Index</strong></th>
      <th><strong>SAML Metadata URL</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Testing</td>
      <td><a href="https://mpass.staging.egov.md/meta">https://mpass.staging.egov.md/meta</a></td>
      <td><a href="https://mpass.staging.egov.md/meta/saml">https://mpass.staging.egov.md/meta/saml</a></td>
    </tr>
    <tr>
      <td>Production</td>
      <td><a href="https://mpass.gov.md/meta">https://mpass.gov.md/meta</a></td>
      <td><a href="https://mpass.gov.md/meta/saml">https://mpass.gov.md/meta/saml</a></td>
    </tr>
  </tbody>
</table>

The index page also includes links to MPass certificate used to sign SAML messages as Identity Provider.

###**Returned attributes**

After a successful authentication and user consent (if required), MPass generates and returns a **SAML Response** with authenticated identity attributes. The list of the returned attributes is configurable as part of Service registration.

The following table contains the list of standard attributes.

<table>
  <thead>
    <tr>
      <th><strong>Attribute Name</strong></th>
      <th><strong>Type</strong></th>
      <th><strong>Description</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>NameIdentifier</td>
      <td>string (128)</td>
      <td>Username or IDNP. This is a special attribute and it should be returned as NameID (i.e. SubjectAttribute) in SAML.</td>
    </tr>
    <tr>
      <td>IsResident</td>
      <td>Boolean</td>
      <td>Specifies whether the user is verified to be a resident of Republic of Moldova.</td>
    </tr>
    <tr>
      <td>FirstName</td>
      <td>string (64)</td>
      <td>User’s first name or given name.</td>
    </tr>
    <tr>
      <td>LastName</td>
      <td>string (64)</td>
      <td>User’s last name or surname.</td>
    </tr>
    <tr>
      <td>BirthDate</td>
      <td>string (10)</td>
      <td>User’s birth date in “yyyy-MM-dd” format (e.g. “1990-12-31”).</td>
    </tr>
    <tr>
      <td>Gender</td>
      <td>integer</td>
      <td>User’s gender. Allowed values:
        <ul>
          <il>0 – Unspecified</il>
          <il>1 – Male</il>
          <il>2 – Female</il>
        </ul>
      </td>
    </tr>
    <tr>
      <td>EmailAddress</td>
      <td>string (64)</td>
      <td>User’s e-mail address.</td>
    </tr>
    <tr>
      <td>MobilePhone</td>
      <td>string (16)</td>
      <td>User’s mobile phone number.</td>
    </tr>
    <tr>
      <td>HomePhone</td>
      <td>string (16)</td>
      <td>User’s home phone number.</td>
    </tr>
    <tr>
      <td>Language</td>
      <td>string (2)</td>
      <td>User’s preferred language. Allowed values: “ro”, “ru”, “en”.</td>
    </tr>
    <tr>
      <td>AdministeredLegalEntity</td>
      <td>string (512)</td>
      <td>The name and identifier of the companies (zero or more) the user is administering in the following format:
        <br>“Legal Entity Name IDNO”
        <br>Notice that the IDNO is after the last space of the name.
      </td>
    </tr>
    <tr>
      <td>IDNO</td>
      <td>string (13)</td>
      <td>User’s organization identifier. This attribute is only available if the authentication was performed using an instrument which includes this value in the certificate.</td>
    </tr>
    <tr>
      <td>CompanyName</td>
      <td>string (128)</td>
      <td>User’s organization or company name. This attribute is only available if the authentication was performed using an instrument which includes this value in the certificate.</td>
    </tr>
    <tr>
      <td>LegalProfession</td>
      <td>string (64)</td>
      <td>
        <ul>
          <li>AuthorizedAdministrator</li>
          <li>Bailiff</li>
          <li>Lawyer</li>
          <li>Interpreter</li>
          <li>LegalExpert</li>
          <li>Mediator</li>
          <li>Notary</li>
          <li>Translator</li>
          <li>TranslatorInterpreter</li>
        </ul>
      </td>
    </tr>    
  </tbody>
</table>

A Service can have custom attributes created (usually used for authorization purpose, such as Role, Permissions, etc.), assigned to identities and returned as part of the same SAML Response with values corresponding to the authenticated identity.

Please identify the set of required attributes (including custom attribute names and values) to be returned by MPass during the design phase of the Service and specify them as part of Service registration.

##**Integration testing**

The detailed integration test scenarios have been moved to a dedicated, developer-focused page. Please follow:

- Integration tests: [guides/mpass/integration-tests.md](integration-tests.md)

That page provides structured functional and security scenarios with clear steps, expected outcomes, and verification points.

##**Integration review and audit**

The security of MPass integrating systems heavily depends on the security of the integration. Please review the developer-focused Integration tests to thoroughly validate both functional and security aspects of your integration: see [Integration tests](integration-tests.md).