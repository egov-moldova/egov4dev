# Integration development

## Authentication

The eDemocracy API supports two authentication methods.

### JWT Token (recommended)

JWT tokens must be signed using an RSA private key.

The corresponding public key must be registered with **AGE**. 

The token payload must include the **IDNP/IDNO** of the caller in the `data.idno` claim.

This identifier is used by the platform as the **owner context** for all API calls.

**Example header:**

```
Authorization: Bearer <jwt_token>
```

### X.509 Certificate (Mutual TLS)

Alternative authentication method.

**Requirements:** 

- Certificate issued by **STISC**
- Registered in **MPass**
- Authentication based on the certificate serial number 

If a JWT token is present in the `Authorization` header and is valid, it takes precedence over certificate authentication.

Otherwise, the system identity is derived from the client certificate. 

# Service Environments

**API base URL**

| Environment | API base URL |
|---|---|
| Test | `https://epetitii.staging.egov.md/petitie/` |
| Production | `https://epetitii.gov.md/petitie/` |

**Swagger documentation**  

| Environment | Swagger |
|---|---|
| Test | [Swagger UI (Test)](https://epetitii.staging.egov.md/petitie/swagger/index.html) |

> All integrations must be tested in the **test environment** before production activation. 

## Security

  

### Access Authorization

After authentication, the platform verifies whether the system has permission to access the requested endpoint.

**Example permission configuration:**

```json
{

"AllowedEndpoints": [

  "/authority/petitions",

  "/authority/petitions/{petitionNumber}",

  "/authority/petitions/{petitionNumber}/pdf",

  "/authority/petitions/{petitionNumber}/attachment/{attachmentId}"

],

"Scope": "own-authority"

}

```

### Scope values

| Scope | Description |
|---|---|
| `own-authority` | Access limited to petitions assigned to the authority |
| `all` | Access to all petitions (central integrations) |

## Encryption

All communication with the eDemocracy API uses **TLS (HTTPS)** encryption.

Unencrypted HTTP connections are not accepted.
