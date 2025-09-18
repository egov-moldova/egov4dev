# Security

##**Authentication**

All MPower Clients API calls can be made only by authenticated systems. Authentication is performed using a client authentication certificate.

Information on obtaining and registering the certificate can be found in Chapter 7: Integration implementation.

##**Access authorization**

To access the MPower Clients API component, it is necessary to use the system authentication certificate issued by STISC and registered by AGE in MPass.

The MPower Client API will call [https://mpower.staging.egov.md:8443/clients-api/api/authorization/check/](https://mpower.staging.egov.md:8443/clients-api/api/authorization/check/) and will use, for authentication, the certificate of the system integrating with MPower. In response, a list of rights assigned in accordance with the system's certificate will be returned, and access will be granted based on the allocated rights.

MPass configuration examples:

=== "JSON settings"

    ``` json 
    {
        "AllowedEndpoints": [
            "/api/Authorization/check/Code-True-One",
            "/api/Authorization/check/Code-Details-One",
            "/api/Authorization/check/TypeCode-Valid-One",
            "/api/Authorization/check/Idn-Details-List",
        ],
        "ViewAllAuthorizations": false
    }
    ```
!!! note "Note"

     **"AllowedEndpoints"** – specifies the list of endpoints that the third-party system has access to.
     <br>**"ViewAllAuthorizations"** – true/false: true – access to all powers of representation (IR) is granted; false – access is limited to the powers of representation belonging exclusively to the service provider.

##**Encryption**
Communication with the MPower REST API component is encrypted using the standard TLS (HTTPS) protocol.