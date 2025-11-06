## Client configuration in MPass

The Service Provider will request the configuration of the client service in MPass before starting the integration with Mdelivery.

## System registration and network access

MDelivery clients must be registered in MDelivery before being able to call the API. The System Provider profile is created by the MDelivery Administrator.

## Service environments

There are 2 services environments available: a testing and a production environment.
It is mandatory to develop the integrations and perform tests with the testing environment.

| Environment | MDelivery service URL |
|-------------|----------------------|
| Testing | https://mdelivery.staging.egov.md |
| Production | ------- |

## Security considerations

### Authentication

MDelivery calls to Service Providers are authenticated. The authentication is performed by using the client certificate used for HTTPS transport.

### Encryption

All communication with SOAP service is encrypted by using standard TLS protocol (HTTPS). The client certificate used to initiate the encrypted transport is also used for Authentication.

## MDelivery profile 

### Profile registration

For a successful integration, the MDelivery Administrator creates a Service provider profile where are added and managed data relevant for interaction with MDelivery system: general information about the Service provider organization, integrated services, products and pick-up points. 

### Profile management

The Service Provider administrator (role assigned in MPass) can view and update the information available in MDelivery profile. Only a Service registered in the MDelivery profile can interact with MDelivery.  

Client ID - filled in the Profile->Services is the client ID assigned in MPass.
Product data - are relevant for cost calculation. 
Pick-up point - data are requested by Carriers to organize the shipment process. 
