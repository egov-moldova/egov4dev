## Prerequisites 
 
The beneficiary requesting integration must meet the following conditions: 
 
1. Owns an information system intended for integration with MPass;
2. For public beneficiaries – the system must be registered in the [Registrul Resurselor și Sistemelor Informaționale](https://rsi.gov.md/procedure);
3. The contract and/or annex regarding the use of the MPass service is signed;
4. For private beneficiaries – the use of the service is paid according to the contract;
5. Beneficiaries must hold a valid system certificate issued by [STISC](https://semnatura.md/order/system-certificate) for integration.<br>If the institution does not yet hold a system certificate, it must request and obtain one from STISC. If the institution already holds an active certificate used for integration with another AGE platform service (e.g., MSign, MNotify, MDocs), the same certificate may be reused, and no new certificate is required.
6. Users hold an electronic signature for authentication through MPass. 

## Connection steps for the beneficiary

1. Complete the [Unified Connection Form](https://forms.office.com/pages/responsepage.aspx?id=Z4f8jWsRaEKDxfvIWTRtOHwLku9yOJZAs22J7gTUxBNUMFhISEJPMUNGOTIwV09OTkFTUUtLSk9LTS4u&route=shorturl);
2. Sign the contract and annex for the provision of authentication and authorization services via MPass; <br>**Note:** If the institution already has an active contract for another AGE platform service, it is not necessary to sign a new contract. In this case, only the specific service annex for integration (e.g, MNotify, MSign, MDocs) must be signed.
3. The institution must send the system certificate (.cer public key) to AGE at servicii@egov.md only if it does not already hold a valid certificate registered for another AGE platform service.  
If the institution already holds an active certificate, it must send the certificate’s serial number to AGE to confirm that it is the same certificate used for another service.
4. Provide integration details through the [form](https://forms.office.com/pages/responsepage.aspx?id=Z4f8jWsRaEKDxfvIWTRtOPEKwFi7MyRNimikcwdXWMlUOTlGSVRPQUJVRUFKVVVYR1I4UE9KTTRYOC4u), including:
   * Name of the information system;
   * URLs for the test and production environments:
     * LogoutRequest,
     * LogoutResponse (SLO);
   * List of authentication attributes (e.g., NameIdentifier, FirstName, LastName, BirthDate);
5. AGE configures access in the test environment: [https://mpass.staging.egov.md](https://mpass.staging.egov.md/)
6. The beneficiary performs functional tests according to the technical guide (in accordance with Chapter 9 of the Integration Guide)
7. AGE tests, validates the results, and certifies technical compliance;
8. After final validation of the beneficiary, AGE activates the service in the production environment;
9. The beneficiary grants access to the test environment of their system for performing the necessary tests.
10. The beneficiary receives a notification confirming the completion of the integration. 
 
<servicii@egov.md> | +373 (22) 820 026
