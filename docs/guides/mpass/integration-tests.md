# Integration tests

This page consolidates developer-focused test scenarios for MPass integrations.
Tip: Keep production traffic clean. Run these tests only against the testing environment, and when you are ready to move to production, re-run critical tests there.

- Testing SSO URL: https://mpass.staging.egov.md/login/saml
- Testing SLO URL: https://mpass.staging.egov.md/logout/saml
- Metadata (testing): https://mpass.staging.egov.md/meta/saml

Related: See Integration development for endpoints, metadata, and attributes returned by MPass.

## Prerequisites

- Your Service Provider (SP) is registered in MPass testing with correct Assertion Consumer Service (ACS) and Single Logout Service (SLS) endpoints.
- Your SP trusts the MPass IdP signing certificate from testing metadata.
- You can inspect SP logs and application traces to validate signatures, identifiers, and attributes.
- Test user accounts or credentials for the intended authentication methods.

## Functional scenarios

### 1. Service-initiated authentication (fresh session)
Prereq: User is not authenticated in your Service or MPass.
Steps:
1) Click your Service “Login”.
2) Authenticate at MPass.
Expected outcome:
- Browser returns to your ACS; user session is established in your Service.
Verify:
- SAML Response signature valid and chains to MPass testing certificate.
- Audience, Issuer, Destination, and InResponseTo valid for your SP.
- Attributes mapped correctly; your authorization logic executes.

### 2. Single Sign-On (user already authenticated at MPass)
Prereq: User authenticated at MPass; not authenticated in your Service.
Steps:
1) Click your Service “Login”.
Expected outcome:
- User is logged into your Service without re-entering credentials (consent may appear per policy).
Verify:
- Same checks as above; ensure your SP supports SSO when IdP session exists.

### 3. User aborts authentication
Prereq: User is not authenticated in your Service or MPass.
Steps:
1) Click “Login” in your Service.
2) On MPass, cancel/abort authentication.
Expected outcome:
- Browser returns to your Service without an authenticated session; your UI shows a neutral state (no error spam, no partial login).
Verify:
- Error/Status handling shows user-friendly message or silent return to login page.
- No residual session created; no sensitive data persisted.

### 4. Service-initiated logout (local logout + SLO)
Prereq: User authenticated in your Service via MPass.
Steps:
1) Click “Logout” in your Service.
Expected outcome:
- Your Service clears its session; if SLO flow is implemented, MPass is invoked appropriately and returns to your Service.
Verify:
- Accessing a protected resource requires authentication again.
- If SLO used, MPass shows user as logged out (per policy) or continues IdP session if configured.

### 5. MPass-initiated logout (global SLO)
Prereq: User authenticated in your Service via MPass.
Steps:
1) Visit MPass and trigger Logout.
Expected outcome:
- After SLO propagation, your Service shows the user as logged out.
Verify:
- Protected resources require a fresh login.
- Your SLS endpoint handled logout request/response and verified signatures.

### 6. Attribute mapping and authorization
Prereq: User authenticated into your Service via MPass.
Steps:
1) Inspect SAML Assertion attributes received.
Expected outcome:
- Required attributes are present and mapped to your domain model.
Verify:
- NameID, FirstName, LastName, IDNP/IDNO (if applicable), roles/permissions (if configured) are correctly processed.
- Business rules (roles/permissions) are enforced.

### 7. Session lifetime and renewal
Prereq: User authenticated into your Service via MPass.
Steps:
1) Let your SP session expire or invalidate it.
2) Attempt to access a protected resource.
Expected outcome:
- User is redirected to MPass and re-authenticates (or SSO applies if IdP session still valid).
Verify:
- No mixed-session state; CSRF/session fixation protections remain intact across re-login.

## Security scenarios

These scenarios help verify that your SP correctly validates SAML messages and rejects unsafe inputs.

### A. Response/Assertion signature validation
Prereq: IdP sends an unsigned Response/Assertion (simulate via test config if available) or use a mocked response in your SP’s test harness.
Steps:
1) Initiate login.
Expected outcome:
- Your SP rejects the response because required signatures are missing.
Verify:
- Clear log entry indicating signature requirement failure; no session created.

### B. Invalid signing certificate
Prereq: IdP signs with an unexpected/invalid certificate (simulate via config/harness).
Steps:
1) Initiate login.
Expected outcome:
- Your SP rejects the response due to untrusted certificate.
Verify:
- Trust validation fails against the certificate(s) provided in MPass testing metadata.

### C. Clock skew / Expired or NotYetValid conditions
Prereq: Simulate system clock skew or craft a response in your harness.
Steps:
1) Initiate login while SP clock is far ahead/behind.
Expected outcome:
- Your SP rejects responses outside NotOnOrAfter/NotBefore tolerances.
Verify:
- Logs show condition violation; use small allowable skew only.

### D. Destination validation
Prereq: Response/@Destination missing or not matching your ACS URL (simulate in harness).
Steps:
1) Initiate login.
Expected outcome:
- Your SP rejects the response with invalid/missing Destination.
Verify:
- Strict comparison against configured ACS URL (scheme/host/path).

### E. InResponseTo presence and correlation
Prereq: Omit InResponseTo or break correlation (simulate lost SP request state).
Steps:
1) Start auth at your Service.
2) Lose/clear request state; continue login to receive a response.
Expected outcome:
- Your SP rejects the response because InResponseTo is missing or does not match an outstanding request.
Verify:
- One-time request ID tracking; replay of IDs is rejected.

### F. Audience, Issuer, and EntityID validation
Prereq: Response contains unexpected Audience or Issuer values.
Steps:
1) Initiate login with manipulated values (via harness).
Expected outcome:
- Your SP rejects the response with audience/issuer mismatch.
Verify:
- Audience includes your SP EntityID; Issuer equals MPass IdP EntityID from metadata.

### G. Replay protection
Prereq: Capture a valid Response and attempt to reuse it.
Steps:
1) Replay a previously accepted SAML Response.
Expected outcome:
- Your SP rejects the replayed message.
Verify:
- Nonce/ID caching and one-time-use enforcement; distinct logs for replay detection.

### H. Logout request/response validation
Prereq: Trigger SLO from IdP or SP.
Steps:
1) Perform logout flows.
Expected outcome:
- Your SP validates signatures and correlates logout messages correctly.
Verify:
- LogoutRequest/LogoutResponse signatures and InResponseTo checks are enforced.

## Operational checks

- Logging: Ensure sensitive data is not persisted; include correlation IDs for traceability.
- Error handling: Show user-friendly messages; avoid leaking protocol internals.
- Certificates: Rotate and pin per environment; ensure testing and production use different key pairs.
- Monitoring: Alert on signature validation failures, replay attempts, and unexpected issuers/audiences.

## References

- Interaction scenarios: SSO/SLO flows
- Integration development: Registration, metadata, attributes
- API references: Endpoints and bindings
