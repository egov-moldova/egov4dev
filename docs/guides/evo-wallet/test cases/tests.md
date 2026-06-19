## 2. Test Scenarios


### 2.1 Issuance Scenarios **TBD**

| ID | Name | Credential type | Format | Protocol |
| --- | --- | --- | --- | --- |
| **I-1** | PID issuance | `eu.europa.ec.eudi.pid.1` | SD-JWT VC | OID4VCI HAIP |
| **I-2** | PID issuance | `eu.europa.ec.eudi.pid.1` | mdoc (ISO 18013-5) | OID4VCI HAIP |
| **I-3** | mDL issuance | `org.iso.18013.5.1.mDL` | mdoc (ISO 18013-5) | OID4VCI HAIP |

### 2.2 Remote Presentation Scenarios

| ID | Name | Credential type | Format | Protocol |
| --- | --- | --- | --- | --- |
| **P-1** | Remote PID presentation | `eu.europa.ec.eudi.pid.1` | SD-JWT VC | OID4VP redirects |
| **P-2** | Remote PID presentation | `eu.europa.ec.eudi.pid.1` | mdoc | OID4VP redirects |
| **P-3** | Remote full mDL presentation | `org.iso.18013.5.1.mDL` | mdoc | OID4VP redirects |

### 2.3 Security and Negative Scenarios

| ID | Name | Expected result |
| --- | --- | --- |
| **S-1** | Presentation with untrusted Reader CA | Wallet **rejects** — no credential data disclosed |
| **S-2** | Presentation of revoked credential | Verifier **rejects** with revocation-specific error |

### 2.4 Optional Showcase

| ID | Name | Description |
| --- | --- | --- |
| **O-1** | Proof of Age Attestation | Issuance and presentation of age-over-18 derived from PID — minimal disclosure demo |

* * *