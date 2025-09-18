#Interaction scenarios

##**Authentication Process**

The most important integration scenario with MPass is user authentication.

During this process, if the user is already authenticated, MPass session is not expired and authentication is not forced, user is not requested to proof its identity again. This is actually how single sign-on (SSO) is implemented.

<picture class="theme-picture">
  <img src="../../../../assets/umls/mpass/interaction_scenarios/sso_darkmode.svg" alt="Signing flow" data-theme="dark">
  <img src="../../../../assets/umls/mpass/interaction_scenarios/sso_lightmode.svg" alt="Signing flow" data-theme="light">
</picture>

Here is the description of authentication process using MPass:

1. The user accesses some protected service resource or explicitly chooses to authenticate in the service. The Browser sends this request to the Service on behalf of user.
2. The Service generates an AuthnRequest (authentication request) and signs it using its private key. See AuthnRequest structure description for details.
3. The signed AuthnRequest is returned to the Browser in a special redirection page.
4. The Browser posts (using HTTP POST method) the request to MPass.
5. MPass verifies incoming AuthnRequest and the properties of service registration.
6. If user is not already authenticated or the authentication is forced, MPass interacts with
   sd SSOUserBrowserServiceMPass3. Redirect to MPass()10. Verify SAMLResponse()2. Generate and signAuthnRequest()9. POST Response()Send Signing request()11. Return protected page()8. Redirect to Service()4. POST AuthnRequest()7. Generate and signSAML Response()Authenticate, ask andauthorize User()6. Authenticate (if not already)1. Initiate Signin()5. Verify AuthnRequest()
   Page | 10 of 32
   MPass Integration Guide
   the user for authentication, authorization and requests user’s consent to provide its identity attributes if needed.
7. MPass generates and signs a SAML Response with the result of authentication. Note that if AuthnRequest verification fails or user explicitly cancels or refuses the authentication, the SAML Response will be generated with an unsuccessful status. See Response structure description for details.
8. The signed Response is returned to the Browser in a special redirection page.
9. The Browser posts (using HTTP POST method) the request to Service.
10. The Service verifies the Response and creates its own session/cookie or handles the Response is any other specific way. For details on the correct way of this verification process, please refer to Security considerations.
11. The Service serves the protected resources to the now authenticated user until its local session expires or the user explicitly request logout (see below).

##**Logout Process**

Because users can login into many services during an MPass session, from security point of view SSO is not fully implemented without a proper SLO (Single logout). Integrating services MUST implement both.

<picture class="theme-picture">
  <img src="../../../../assets/umls/mpass/interaction_scenarios/slo_darkmode.svg" alt="Signing flow" data-theme="dark">
  <img src="../../../../assets/umls/mpass/interaction_scenarios/slo_lightmode.svg" alt="Signing flow" data-theme="light">
</picture>

Here is the description of logout process using MPass:

1. The user explicitly requests to logout. Its Browser submits this request to the Service.
2. The Service terminates its local session of the user, i.e. user will have to authenticate again to further access any protected resources.
3. The Service generates and signs a LogoutRequest and returns this request to the browser in a special redirection page.
4. The Browser posts (using HTTP POST method) the request to MPass.
5. If during user’s MPass session, user has authenticated in other services, MPass generates and signs a LogoutRequest for each such service, returning them all to the Browser.
6. The Browser posts these requests to respective services.
7. Upon LogoutRequest receipt, each service validates the request, then terminates its local session of the user, i.e. user will have to authenticate again to further access service protected resources.
8. Each service then generates and signs a LogoutResponse to confirm the logout result and returns this response to the Browser in a special redirection page. Note that for correct logout processing when using HTTP POST, services must return the following header in HTTP response:
   X
   Frame Option allow from https://mpass.gov.md
9. The Browser sends all the resulted responses to MPass.
10. MPass is informed on results after all participating services confirm the logout or after a timeout (to handle the case for services that cannot confirm the logout).
11. MPass then terminates its local session of the user, i.e. user will have to authenticate again to access its MPass profile.
12. MPass generates and signs a LogoutResponse and returns it to the Browser.
13. The Browser posts (using HTTP POST method) the response to Service.
14. Finally, after handling the resulting LogoutResponse, the Service is free to return to the user any page that fits the needs.