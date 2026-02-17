The integration consists of the following steps:

1. Verifier requests integration with EVO Wallet via an electronically signed request by authorized representative (administrator) sent to support.evo@egov.md. The request shall include the intended uses, and for each of intended use, its description and the list of attestations and the attributes that the Verifier intends to request from users and be accompanied by a Certificate Signature Request(CSR) for staging environment.
2. Verifier certificate is issued by AGE based on a CSR provided by Verifier. CSR key must be EC based on P-256 curve. There must be separate certificates for staging and production environments.
3. The integration is firstly done with staging environment.
4. Certificate is issued and integration is configured on production environment only after successful integration is tested on staging environment.
