1. Complete the [Unified Connection Form](https://forms.office.com/Pages/ResponsePage.aspx?id=Z4f8jWsRaEKDxfvIWTRtOHwLku9yOJZAs22J7gTUxBNUMFhISEJPMUNGOTIwV09OTkFTUUtLSk9LTS4u) available on MEGA's website. 
2. Sign the contract and/or the annex provided by MEGA for the delivery of MPass services. 
   – If the institution already has an active contract for another AGE platform service, there is no need to sign a new contract; only the MPass specific annex will be signed. 
3. Provide the [technical integration details](https://forms.office.com/Pages/DesignPageV2.aspx?origin=NeoPortalPage&subpage=design&id=Z4f8jWsRaEKDxfvIWTRtOPEKwFi7MyRNimikcwdXWMlUOTlGSVRPQUJVRUFKVVVYR1I4UE9KTTRYOC4u) after signing the contract. You will receive, via notification, the link to the online integration details form. In this form, indicate:
   - the name of the information system;
   - the test and production environment URLs for:
     - LogoutRequest
     - LogoutResponse (Single Logout – SLO);
   - the list of authentication attributes that will be returned (e.g., NameIdentifier, FirstName, LastName, BirthDate). 

4. Send to MEGA, at servicii@egov.md: 
  - The system certificate can be obtained by submitting an online request at: https://semnatura.md/order/system-certificate
  - the system certificate (.cer – public key), if the institution does not yet have a valid certificate registered for another MEGA service, or
  - the serial number of the existing certificate, if the same certificate will be used for the MPass integration. 

5. MEGA configures access to the test environment: https://mpass.staging.egov.md. 
6. Implement the integration according to the technical documentation and perform [the functional tests](integration-tests.md) in the test environment.
7. MEGA performs additional tests in the test environment and confirms technical compliance. 
8. Confirm to MEGA the configuration for the production environment at the e-mail address: servicii@egov.md 
9. MEGA activates the service in the production environment. 
10. Receive the notification sent by MEGA regarding the completion of the integration and activation in the production environment. 

## Connection time 

MEGA processes the request within a maximum of 7 working days, calculated from the moment all necessary data from the institution have been received. 
