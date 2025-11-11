## Prerequisites: 

The beneficiary requesting integration must meet the following conditions:

1. Owns an information system intended for integration with MLog; 
2. The information system is registered in the [Register of Information Resources and Systems](https://rsi.gov.md/procedure); 
3. The contract and/or annex on the use of the MLog service is signed; 
4. The beneficiary holds a system certificate issued by [STISC](https://semnatura.md/order/system-certificate); 
5. If the institution does not hold a system certificate, it shall request and obtain it from STISC; 
6. If the institution already holds an active certificate used for integration with another governmental platform service (e.g. MPass, MSign, MNotify), it is not necessary to obtain a new certificate. 

## Connection steps for the beneficiary: 

1. Fill in the [Unified Connection Form](https://forms.office.com/pages/responsepage.aspx?id=Z4f8jWsRaEKDxfvIWTRtOHwLku9yOJZAs22J7gTUxBNUMFhISEJPMUNGOTIwV09OTkFTUUtLSk9LTS4u&route=shorturl); 
2. Sign the contract and the annex for the provision of the MLog service.<br>Note: If the institution already has a system integrated with another AGE service and holds an active contract, it is not necessary to sign a new contract; only the annex for the MLog service must be signed. 
3. Send to AGE at servicii@egov.md the following information: 
   a. the name of the system; 
   b. the public IP address;
   c. the system certificate issued by STISC (the .cer public key file), only if the institution does not already hold a valid certificate for another governmental platform service;
   d. if the institution already holds an active certificate, it shall send the certificate serial number for confirmation;
   e. the complete list of event types that will be logged. 
4. AGE configures access in the staging environment. 
5. AGE verifies logging in the staging environment to ensure that: 
   a. all declared events are recorded;
   b. the fields are complete and correctly named according to the technical guide;
   c. no non-standard fields are logged without necessity. 
6. After completing the tests, the beneficiary sends confirmation to AGE. 
7. After the beneficiary’s final validation, AGE activates the service in the production environment. 
8. The beneficiary receives a notification confirming the completion of the integration.

servicii@egov.md  |  +373 (22) 820 026
