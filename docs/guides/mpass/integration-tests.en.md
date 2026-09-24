This section describes test cases for systems integrating with MPass. These tests ensure both functional correctness and security compliance of the integration.

## Functional Test Cases

### TC_FUNCT_01: Service Initiated Authentication

**Description:** Service initiated authentication

**Initial Conditions:** User not authenticated into the Service and MPass

**Steps:**

| Step | Task | Expected Result |
|------|------|----------------|
| 1 | Access the "Login" button/link of the Service | Browser redirected to MPass, no errors shown |
| 2 | Authenticate in MPass | Browser redirected back to the Service as logged in |

---

### TC_FUNCT_02: Single Sign-On Through MPass

**Description:** Single sign-on through MPass

**Initial Conditions:**
- User not authenticated in the Service
- User authenticated directly in MPass

**Steps:**

| Step | Task | Expected Result |
|------|------|----------------|
| 1 | Access the "Login" button/link of the Service | Browser redirected to MPass and redirected back (with or without authentication consent) to the Service as logged in, no errors shown |

---

### TC_FUNCT_03: Aborted Authentication

**Description:** Aborted authentication

**Initial Conditions:** User not authenticated into the Service and MPass

**Steps:**

| Step | Task | Expected Result |
|------|------|----------------|
| 1 | Access the "Login" button/link of the Service | Browser redirected to MPass for authentication |
| 2 | Cancel the authentication in MPass | Browser redirected back to the Service without authentication and no errors are shown by the Service |

---

### TC_FUNCT_04: Service Initiated Logout

**Description:** Service initiated logout

**Initial Conditions:** User authenticated into Service via MPass

**Steps:**

| Step | Task | Expected Result |
|------|------|----------------|
| 1 | Access the "Logout" button/link of the Service | Browser redirected to MPass and redirected back (with or without authentication consent) to the Service as logged out, no errors shown |
| 2 | Access any Service protected resource | Access to resource is denied and/or user is redirected to MPass for authentication |

---

### TC_FUNCT_05: MPass Initiated Logout (Single Logout)

**Description:** MPass initiated logout (i.e. single logout)

**Initial Conditions:** User authenticated into Service via MPass

**Steps:**

| Step | Task | Expected Result |
|------|------|----------------|
| 1 | Access the "Logout" link in MPass | After performing single sign-out, MPass shows that the user is not authenticated |
| 2 | Access any Service protected resource | Access to resource is denied and/or user is redirected to MPass for authentication |

---

## Security Test Cases

### TC_SEC_01: Check SAML Response Signature Validation

**Description:** Check SAML Response signature validation

**Initial Conditions:**
- User not authenticated into Service, but authenticated in MPass
- Only the following option is checked in SAML Advanced Options: "Do not sign SAML Response"

**Steps:**

| Step | Task | Expected Result |
|------|------|----------------|
| 1 | Access the "Login" button/link of the Service | Browser redirected to MPass and redirected back to the Service without successful authentication, as SAML Response is not signed |

---

### TC_SEC_02: Check SAML Response Signature Validation Certificate

**Description:** Check SAML Response signature validation certificate

**Initial Conditions:**
- User not authenticated into Service, but authenticated in MPass
- Only the following option is checked in SAML Advanced Options: "Use compatible certificate for signing"

**Steps:**

| Step | Task | Expected Result |
|------|------|----------------|
| 1 | Access the "Login" button/link of the Service | Browser redirected to MPass and redirected back to the Service without successful authentication, as SAML Response is signed with invalid certificate |

---

### TC_SEC_03: Check SAML Response is Not Expired

**Description:** Check SAML Response is not expired

**Initial Conditions:**
- User not authenticated into Service, but authenticated in MPass
- No option is checked in SAML Advanced Options
- Service server clock changed to several hours in the future

**Steps:**

| Step | Task | Expected Result |
|------|------|----------------|
| 1 | Access the "Login" button/link of the Service | Browser redirected to MPass and redirected back to the Service without successful authentication, as SAML Response is expired |

---

### TC_SEC_04: Check SAML Response is Not Too New

**Description:** Check SAML Response is not too new

**Initial Conditions:**
- User not authenticated into Service, but authenticated in MPass
- Only the following option is checked in SAML Advanced Options: "SAML Response IssueInstant is specified in local time, instead of UTC"

**Steps:**

| Step | Task | Expected Result |
|------|------|----------------|
| 1 | Access the "Login" button/link of the Service | Browser redirected to MPass and redirected back to the Service without successful authentication, as SAML Response is expired (2 or 3 hours in the future for Moldova time zone) |

---

### TC_SEC_05: Check if SAML Response Destination is Validated

**Description:** Check if SAML Response Destination is validated

**Initial Conditions:**
- User not authenticated into Service, but authenticated in MPass
- Only the following option is checked in SAML Advanced Options: "Do not specify Destination in SAML Response"

**Steps:**

| Step | Task | Expected Result |
|------|------|----------------|
| 1 | Access the "Login" button/link of the Service | Browser redirected to MPass and redirected back to the Service without successful authentication, as SAML Response/@Destination is not specified |

---

### TC_SEC_06: Check if SAML Response InResponseTo is Checked For

**Description:** Check if SAML Response InResponseTo is checked for

**Initial Conditions:**
- User not authenticated into Service, but authenticated in MPass
- Only the following option is checked in SAML Advanced Options: "Do not specify InResponseTo in SAML Response"

**Steps:**

| Step | Task | Expected Result |
|------|------|----------------|
| 1 | Access the "Login" button/link of the Service | Browser redirected to MPass and redirected back to the Service without successful authentication, as SAML Response/@InResponseTo is not specified |

---

### TC_SEC_07: Check if SAML Response InResponseTo is Validated

**Description:** Check if SAML Response InResponseTo is validated

**Initial Conditions:**
- User not authenticated into the Service and MPass
- No option is checked in SAML Advanced Options

**Steps:**

| Step | Task | Expected Result |
|------|------|----------------|
| 1 | Access the "Login" button/link of the Service | Browser redirected to MPass for authentication |
| 2 | Abort user's session in the Service (restart the server or delete it from session store) so that the generated AuthnRequest/@ID is lost | User session aborted |
| 3 | Authenticate in MPass | Browser redirected back to the Service without successful authentication, as SAML Response/@InResponseTo is now invalid |

---

## Important Notes

- The security of MPass integrating systems heavily depends on the security of the integration
- All security-related test cases MUST pass before moving to production
- Services are expected to implement comprehensive SAML validation as described in the security considerations section
- Integration review and audit should be performed using these test cases
