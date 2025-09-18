#Integration development

This chapter describes the process of developing an integration.

##**Get started**

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

###**System environments**

There are 2 services environments available: a testing and a production environment.


<table>
  <thead>
    <tr>
      <th><strong>Environment</strong></th>
      <th><strong>SSO URL</strong></th>
      <th><strong>SLO URL</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Testing</td>
      <td><a href="https://mpass.staging.egov.md/login/saml">https://mpass.staging.egov.md/login/saml</a></td>
      <td><a href="https://mpass.staging.egov.md/logout/saml">https://mpass.staging.egov.md/logout/saml</a></td>
    </tr>
    <tr>
      <td>Production</td>
      <td><a href="https://mpass.gov.md/login/saml">https://mpass.gov.md/login/saml</a></td>
      <td><a href="https://mpass.gov.md/logout/saml">https://mpass.gov.md/logout/saml</a></td>
    </tr>
  </tbody>
</table>

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
  </tbody>
</table>

A Service can have custom attributes created (usually used for authorization purpose, such as Role, Permissions, etc.), assigned to identities and returned as part of the same SAML Response with values corresponding to the authenticated identity.

Please identify the set of required attributes (including custom attribute names and values) to be returned by MPass during the design phase of the Service and specify them as part of Service registration.

##**Integration: functionality testing**

!!!note "Functionality test cases"

    Here are some basic funtionality test cases that could be added to the test suite of the systems that integrates with MPass.

###**Case #1**

<table>
  <tbody>
    <tr>
      <td><strong>Test Case ID</strong></td>
      <td colspan="3">TC_FUNCT_01</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="3">Service initiated authentication</td>
    </tr>
    <tr>
      <td><strong>Initial Conditions</strong></td>
      <td colspan="3">User not authenticated into the Service and MPass</td>
    </tr>
    <tr>
      <td><strong>Step</strong></td>
      <td><strong>Task</strong></td>
      <td><strong>Expected Result</strong></td>
      <td><strong>Actual Result</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Access the “Login” button/link of the Service</td>
      <td>Browser redirected to MPass, no errors shown</td>
      <td><strong>Pass / Fail</strong></td>
    </tr>
    <tr>
      <td>2</td>
      <td>Authenticate in MPass</td>
      <td>Browser redirected back to the Service as logged in</td>
      <td><strong>Pass / Fail</strong></td>
    </tr>
  </tbody>
</table>

###**Case #2**

<table>
  <tbody>
    <tr>
      <td><strong>Test Case ID</strong></td>
      <td colspan="3">TC_FUNCT_02</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="3">Single sign-on through MPass</td>
    </tr>
    <tr>
      <td><strong>Initial Conditions</strong></td>
      <td colspan="3">User not authenticated in the Service
        <br>User authenticated directly in MPass</td>
    </tr>
    <tr>
      <td><strong>Step</strong></td>
      <td><strong>Task</strong></td>
      <td><strong>Expected Result</strong></td>
      <td><strong>Actual Result</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Access the “Login” button/link of the Service</td>
      <td>Browser redirected to MPass and redirected back (with or without authentication consent) to the Service as logged in, no errors shown</td>
      <td><strong>Pass / Fail</strong></td>
    </tr>
  </tbody>
</table>

###**Case #3**

<table>
  <tbody>
    <tr>
      <td><strong>Test Case ID</strong></td>
      <td colspan="3">TC_FUNCT_03</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="3">Aborted authentication</td>
    </tr>
    <tr>
      <td><strong>Initial Conditions</strong></td>
      <td colspan="3">User not authenticated into the Service and MPass</td>
    </tr>
    <tr>
      <td><strong>Step</strong></td>
      <td><strong>Task</strong></td>
      <td><strong>Expected Result</strong></td>
      <td><strong>Actual Result</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Access the “Login” button/link of the Service</td>
      <td>Browser redirected to MPass for authentication</td>
      <td><strong>Pass / Fail</strong></td>
    </tr>
    <tr>
      <td>2</td>
      <td>Cancel the authentication in MPass</td>
      <td>Browser redirected back to the Service without authentication and no errors are shown by the Service</td>
      <td><strong>Pass / Fail</strong></td>
    </tr>
  </tbody>
</table>

###**Case #4**

<table>
  <tbody>
    <tr>
      <td><strong>Test Case ID</strong></td>
      <td colspan="3">TC_FUNCT_04</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="3">Service initiated logout</td>
    </tr>
    <tr>
      <td><strong>Initial Conditions</strong></td>
      <td colspan="3">User authenticated into Service via MPass</td>
    </tr>
    <tr>
      <td><strong>Step</strong></td>
      <td><strong>Task</strong></td>
      <td><strong>Expected Result</strong></td>
      <td><strong>Actual Result</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Access the “Logout” button/link of the Service</td>
      <td>Browser redirected to MPass and redirected back (with or without authentication consent) to the Service as logged out, no errors shown</td>
      <td><strong>Pass / Fail</strong></td>
    </tr>
    <tr>
      <td>2</td>
      <td>Access any Service protected resource</td>
      <td>Access to resource is denied and/or user is redirected to MPass for authentication</td>
      <td><strong>Pass / Fail</strong></td>
    </tr>
  </tbody>
</table>

###**Case #5**

<table>
  <tbody>
    <tr>
      <td><strong>Test Case ID</strong></td>
      <td colspan="3">TC_FUNCT_05</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="3">MPass initiated logout (i.e. single logout)</td>
    </tr>
    <tr>
      <td><strong>Initial Conditions</strong></td>
      <td colspan="3">User authenticated into Service via MPass</td>
    </tr>
    <tr>
      <td><strong>Step</strong></td>
      <td><strong>Task</strong></td>
      <td><strong>Expected Result</strong></td>
      <td><strong>Actual Result</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Access the “Logout” link in MPass</td>
      <td>After performing single sign-out, MPass shows that the user is not authenticated</td>
      <td><strong>Pass / Fail</strong></td>
    </tr>
    <tr>
      <td>2</td>
      <td>Access any Service protected resource</td>
      <td>Access to resource is denied and/or user is redirected to MPass for authentication</td>
      <td><strong>Pass / Fail</strong></td>
    </tr>
  </tbody>
</table>

##**Integration: security testing**

!!!note "Security test cases"

    Here are some basic security test cases that could be added to the test suite of the systems that integrates with MPass.

###**Case #1**

<table>
  <tbody>
    <tr>
      <td><strong>Test Case ID</strong></td>
      <td colspan="3">TC_SEC_01</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="3">Check SAML Response signature validation</td>
    </tr>
    <tr>
      <td><strong>Initial Conditions</strong></td>
      <td colspan="3">User not authenticated into Service, but authenticated in MPass
      <br>Only the following option is checked in SAML Advanced Options: “Do not sign SAML Response”</td>
    </tr>
    <tr>
      <td><strong>Step</strong></td>
      <td><strong>Task</strong></td>
      <td><strong>Expected Result</strong></td>
      <td><strong>Actual Result</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Access the “Login” button/link of the Service</td>
      <td>Browser redirected to MPass and redirected back to the Service without successful authentication, as SAML Response is not signed</td>
      <td><strong>Pass / Fail</strong></td>
    </tr>
  </tbody>
</table>

###**Case #2**

<table>
  <tbody>
    <tr>
      <td><strong>Test Case ID</strong></td>
      <td colspan="3">TC_SEC_02</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="3">Check SAML Response signature validation certificate</td>
    </tr>
    <tr>
      <td><strong>Initial Conditions</strong></td>
      <td colspan="3">User not authenticated into Service, but authenticated in MPass
      <br>Only the following option is checked in SAML Advanced Options: “Use compatible certificate for signing”</td>
    </tr>
    <tr>
      <td><strong>Step</strong></td>
      <td><strong>Task</strong></td>
      <td><strong>Expected Result</strong></td>
      <td><strong>Actual Result</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Access the “Login” button/link of the Service</td>
      <td>Browser redirected to MPass and redirected back to the Service without successful authentication, as SAML Response is signed with invalid certificate</td>
      <td><strong>Pass / Fail</strong></td>
    </tr>
  </tbody>
</table>

###**Case #3**

<table>
  <tbody>
    <tr>
      <td><strong>Test Case ID</strong></td>
      <td colspan="3">TC_SEC_03</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="3">Check SAML Response is not expired</td>
    </tr>
    <tr>
      <td><strong>Initial Conditions</strong></td>
      <td colspan="3">User not authenticated into Service, but authenticated in MPass
      <br>No option is checked in SAML Advanced Options
      <br>Service server clock changed to several hours in the future</td>
    </tr>
    <tr>
      <td><strong>Step</strong></td>
      <td><strong>Task</strong></td>
      <td><strong>Expected Result</strong></td>
      <td><strong>Actual Result</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Access the “Login” button/link of the Service</td>
      <td>Browser redirected to MPass and redirected back to the Service without successful authentication, as SAML Response is expired</td>
      <td><strong>Pass / Fail</strong></td>
    </tr>
  </tbody>
</table>

###**Case #4**

<table>
  <tbody>
    <tr>
      <td><strong>Test Case ID</strong></td>
      <td colspan="3">TC_SEC_04</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="3">Check SAML Response is not too new</td>
    </tr>
    <tr>
      <td><strong>Initial Conditions</strong></td>
      <td colspan="3">User not authenticated into Service, but authenticated in MPass
      <br>Only the following option is checked in SAML Advanced Options: “SAML Response IssueInstant is specified in local time, instead of UTC”</td>
    </tr>
    <tr>
      <td><strong>Step</strong></td>
      <td><strong>Task</strong></td>
      <td><strong>Expected Result</strong></td>
      <td><strong>Actual Result</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Access the “Login” button/link of the Service</td>
      <td>Browser redirected to MPass and redirected back to the Service without successful authentication, as SAML Response is expired (2 or 3 hours in the future for Moldova time zone)</td>
      <td><strong>Pass / Fail</strong></td>
    </tr>
  </tbody>
</table>

###**Case #5**

<table>
  <tbody>
    <tr>
      <td><strong>Test Case ID</strong></td>
      <td colspan="3">TC_SEC_05</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="3">Check if SAML Response Destination is validated</td>
    </tr>
    <tr>
      <td><strong>Initial Conditions</strong></td>
      <td colspan="3">User not authenticated into Service, but authenticated in MPass
      <br>Only the following option is checked in SAML Advanced Options: “Do not specify Destination in SAML Response”</td>
    </tr>
    <tr>
      <td><strong>Step</strong></td>
      <td><strong>Task</strong></td>
      <td><strong>Expected Result</strong></td>
      <td><strong>Actual Result</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Access the “Login” button/link of the Service</td>
      <td>Browser redirected to MPass and redirected back to the Service without successful authentication, as SAML Response/@Destination is not specified</td>
      <td><strong>Pass / Fail</strong></td>
    </tr>
  </tbody>
</table>

###**Case #6**

<table>
  <tbody>
    <tr>
      <td><strong>Test Case ID</strong></td>
      <td colspan="3">TC_SEC_06</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="3">Check if SAML Response InResponseTo is checked for</td>
    </tr>
    <tr>
      <td><strong>Initial Conditions</strong></td>
      <td colspan="3">User not authenticated into Service, but authenticated in MPass
      <br>Only the following option is checked in SAML Advanced Options: “Do not specify InResponseTo in SAML Response”</td>
    </tr>
    <tr>
      <td><strong>Step</strong></td>
      <td><strong>Task</strong></td>
      <td><strong>Expected Result</strong></td>
      <td><strong>Actual Result</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Access the “Login” button/link of the Service</td>
      <td>Browser redirected to MPass and redirected back to the Service without successful authentication, as SAML Response/@InResponseTo is not specified</td>
      <td><strong>Pass / Fail</strong></td>
    </tr>
  </tbody>
</table>

###**Case #7**

<table>
  <tbody>
    <tr>
      <td><strong>Test Case ID</strong></td>
      <td colspan="3">TC_SEC_07</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="3">Check if SAML Response InResponseTo is validated</td>
    </tr>
    <tr>
      <td><strong>Initial Conditions</strong></td>
      <td colspan="3">User not authenticated into the Service and MPass
      <br>No option is checked in SAML Advanced Options</td>
    </tr>
    <tr>
      <td><strong>Step</strong></td>
      <td><strong>Task</strong></td>
      <td><strong>Expected Result</strong></td>
      <td><strong>Actual Result</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Access the “Login” button/link of the Service</td>
      <td>Browser redirected to MPass for authentication</td>
      <td><strong>Pass / Fail</strong></td>
    </tr>
    <tr>
      <td>2</td>
      <td>Abort user’s session in the Service (restart the server or delete it from session store) so that the generated AuthnRequest/@ID is lost</td>
      <td>User session aborted</td>
      <td><strong>Pass / Fail</strong></td>
    </tr>
    <tr>
      <td>3</td>
      <td>Authenticate in MPass</td>
      <td>Browser redirected back to the Service without successful authentication, as SAML Response/@InResponseTo is now invalid</td>
      <td><strong>Pass / Fail</strong></td>
    </tr>
  </tbody>
</table>

##**Integration review and audit**

The security of MPass integrating systems heavily depends on the security of the integration. Please review the provided Test cases which include security related tests to thoroughly test the security of the integration.