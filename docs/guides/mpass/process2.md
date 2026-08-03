1. Complete the [Unified Connection Form](https://forms.office.com/Pages/ResponsePage.aspx?id=Z4f8jWsRaEKDxfvIWTRtOHwLku9yOJZAs22J7gTUxBNUMFhISEJPMUNGOTIwV09OTkFTUUtLSk9LTS4u) available on MEGA's website.

2. Sign the contract and/or the annex provided by eGov for the delivery of MPass services.
   - If the institution already has an active contract for another eGov platform service, there is no need to sign a new contract; only the MPass specific annex will be signed.

3. Provide the [technical integration details](https://forms.office.com/Pages/ResponsePage.aspx?id=Z4f8jWsRaEKDxfvIWTRtOPEKwFi7MyRNimikcwdXWMlUOTlGSVRPQUJVRUFKVVVYR1I4UE9KTTRYOC4u) after signing the contract. You will receive, via notification, the link to the online integration details form. In this form, indicate:
   - the name of the information system;
   - the test and production environment URLs for:
     - LogoutRequest
     - LogoutResponse (Single Logout – SLO);
   - the list of authentication attributes that will be returned (e.g., NameIdentifier, FirstName, LastName, BirthDate).

4. Send to eGov, at servicii@egov.md, the system certificate for the TEST environment:
   - the certificate can be obtained by submitting an online request at: https://semnatura.md/order/system-certificate
   - the certificate (.cer – public key), if the information system does not yet have a valid certificate for the test environment registered for another integration with the shared government platforms (MPass, MSign, MNotify, MLog etc.), or
   - the serial number of the existing certificate, if the information system already has a valid certificate for the test environment.

5. eGov configures access to the test environment: https://mpass.staging.egov.md.

6. Implement the integration according to the technical documentation and perform [the functional tests](integration-tests.md) in the test environment.

7. eGov performs additional tests in the test environment and confirms technical compliance.

8. Confirm to eGov the configuration for the production environment, including the system certificate for the PROD environment, at the e-mail address: servicii@egov.md
   - the certificate (.cer – public key), if the information system does not yet have a valid certificate for the production environment registered for another integration with the shared government platforms, or
   - the serial number of the existing certificate, if the information system already has a valid certificate for the production environment.

9. eGov activates the service in the production environment.

10. Receive the notification sent by eGov regarding the completion of the integration and activation in the production environment.

**Note on certificates:**

- A certificate can be reused across all integrations of the same information system with the shared government platforms (MPass, MSign, MNotify, MLog etc.), provided the integrations are in the same environment (TEST or PROD).
- A new certificate is required only when:
  1. the beneficiary initiates the integration of another information system with the shared government platforms, or
  2. the currently used certificate has expired.

## Service pricing

| User type | Access conditions | Annual fee per integration |
|-----------|-------------------|---------------------------|
| **Public institutions** | Contract-based | – |
| **Private legal entities** | Contract-based (per applicable legal framework) | 10.800 lei |
| **Natural persons** | Contract-based (per applicable legal framework) | 10.800 lei |

**Notes:**

- The fee applies to the integration of a single information system
- Multiple integrations require separate fees for each system

## Connection time

eGov processes the request within a maximum of 7 working days, calculated from the moment all necessary data from the institution have been received.