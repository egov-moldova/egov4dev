## Prerequisites

The beneficiary requesting integration must meet the following conditions:

*   Owns an information system compatible with MPass integration
*   For public beneficiaries – the system is registered in the Registry of Resources and Information Systems
*   The contract and/or annex regarding the use of the MPass service is signed
*   For private beneficiaries – the service usage is paid according to the contract
*   Beneficiaries obtain a system certificate from STISC
*   Users possess an electronic signature for authentication via MPass

## Connection steps for the beneficiary

1.  Fill out the [Unified Connection Form](https://forms.office.com/pages/responsepage.aspx?id=Z4f8jWsRaEKDxfvIWTRtOHwLku9yOJZAs22J7gTUxBNUMFhISEJPMUNGOTIwV09OTkFTUUtLSk9LTS4u&route=shorturl)
2.  Sign the contract and annex for authentication and authorization services via MPass
3.  Obtain the system certificate from STISC
4.  Send only the _.cer_ file (public key) to AGE at [servicii@egov.md](mailto:servicii@egov.md)
5.  Submit integration details via the form sent by AGE, including:
    *   Name of the information system
    *   URLs for test and production environments:
        *   `LoginRequest`
        *   `LogoutRequest`
        *   `LogoutResponse (SLO)`
    *   List of authentication attributes (e.g., `NameIdentifier`, `FirstName`, `LastName`, `BirthDate`)
6.  AGE configures access to the test environment: <https://mpass.staging.egov.md>
7.  Beneficiary performs functional tests according to the technical guide
8.  AGE tests and validates the results and confirms technical compliance
9.  After final validation by the beneficiary, AGE activates the service in the production environment
10. Beneficiary receives a notification confirming the completion of integration

<servicii@egov.md> | +373 (22) 820 026
