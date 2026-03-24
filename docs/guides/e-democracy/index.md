# Overview 

eDemocracy (ePetitions) is the platform that enables citizens and legal entities to submit petitions electronically to public authorities. The platform allows authorities to review, process, and respond to petitions through a centralized digital service.

The platform exposes a **REST API** that allows external information systems of public authorities to integrate with the service and manage petitions electronically.

API access is granted through one of the following authentication mechanisms:

- **X.509 system certificate** issued by **STISC** and registered in **MPass**
- **JWT token signed with RSA key**, validated using the public certificate registered
