## Prerequisites 
 
The beneficiary requesting integration must meet the following conditions: 
 
1. Owns an information system intended for integration with MPass;
2. For public beneficiaries – the system must be registered in the [Registrul Resurselor și Sistemelor Informaționale](https://rsi.gov.md/procedure);
3. The contract and/or annex regarding the use of the MPass service is signed;
4. For private beneficiaries – the use of the service is paid according to the contract;
5. Beneficiaries obtain a system certificate from [STISC](https://semnatura.md/order/system-certificate);
6. Users hold an electronic signature for authentication through MPass. 

## Connection steps for the beneficiary

1. Complete the [Unified Connection Form](https://forms.office.com/pages/responsepage.aspx?id=Z4f8jWsRaEKDxfvIWTRtOHwLku9yOJZAs22J7gTUxBNUMFhISEJPMUNGOTIwV09OTkFTUUtLSk9LTS4u&route=shorturl);
2. Sign the contract and annex for the provision of authentication and authorization services via MPass;
3. Obtain the system certificate from STISC;
4. Send to AGE only the .cer file (public key) to: servicii@egov.md;
5. Provide integration details through the [form](https://forms.office.com/Pages/ResponsePage.aspx?id=Z4f8jWsRaEKDxfvIWTRtOHwLku9yOJZAs22J7gTUxBNUMFhISEJPMUNGOTIwV09OTkFTUUtLSk9LTS4u), including:
   * Name of the information system;
   * URLs for the test and production environments:
     * LoginRequest,
     * LogoutRequest,
     * LogoutResponse (SLO);
   * List of authentication attributes (e.g., NameIdentifier, FirstName, LastName, BirthDate);
6. AGE configures access in the test environment: [https://mpass.staging.egov.md](https://mpass.staging.egov.md/)
7. The beneficiary performs functional tests according to the technical guide;
8. AGE tests, validates the results, and certifies technical compliance;
9. After final validation of the beneficiary, AGE activates the service in the production environment;
10. The beneficiary receives a notification confirming the completion of the integration. 
 
<servicii@egov.md> | +373 (22) 820 026
