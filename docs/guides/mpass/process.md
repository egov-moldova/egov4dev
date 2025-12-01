1. Complete the [Unified Connection Form](https://forms.office.com/pages/responsepage.aspx?id=Z4f8jWsRaEKDxfvIWTRtOHwLku9yOJZAs22J7gTUxBNUMFhISEJPMUNGOTIwV09OTkFTUUtLSk9LTS4u&route=shorturl);
2. Sign the contract and annex for the provision of authentication and authorization services via MPass; <br>**Note:** If the institution already has an active contract for another MEGA platform service, it is not necessary to sign a new contract. In this case, only the specific service annex for integration (e.g, MNotify, MSign, MDocs) must be signed.
3. The institution must send the system certificate (.cer public key) to MEGA at servicii@egov.md only if it does not already hold a valid certificate registered for another MEGA platform service.  
If the institution already holds an active certificate, it must send the certificate’s serial number to MEGA to confirm that it is the same certificate used for another service.
4. Provide integration details through the [form](https://forms.office.com/pages/responsepage.aspx?id=Z4f8jWsRaEKDxfvIWTRtOPEKwFi7MyRNimikcwdXWMlUOTlGSVRPQUJVRUFKVVVYR1I4UE9KTTRYOC4u), including:
   * Name of the information system;
   * URLs for the test and production environments:
     * LogoutRequest,
     * LogoutResponse (SLO);
   * List of authentication attributes (e.g., NameIdentifier, FirstName, LastName, BirthDate);
5. AGE configures access in the test environment: [https://mpass.staging.egov.md](https://mpass.staging.egov.md/)
6. The beneficiary performs functional tests according to the technical guide (in accordance with Chapter 9 of the Integration Guide)
7. AGE tests, validates the results, and certifies technical compliance;
8. After final validation of the beneficiary, MEGA activates the service in the production environment;
9. The beneficiary grants access to the test environment of their system for performing the necessary tests.
10. The beneficiary receives a notification confirming the completion of the integration.
