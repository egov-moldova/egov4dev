The **Relying Party Tester** is a self-service tool that verifies whether a Verifier (wallet-relying party) implementation behaves correctly when it receives both a valid presentation and deliberately manipulated ones. It removes the need to exchange hand-crafted test documents by e-mail: the tester takes the place of the Wallet, generates one correct and many defective mdoc presentations, submits them to your Verifier and reports what your Verifier did with each of them.

| Resource | Description |
|:---------|:------------|
| 🧪 [**Relying Party Tester**](https://wallet.staging.egov.md/rp-tester) | Automated conformance tester for wallet-relying parties, available in the staging environment. |

> ⚠️ The tester belongs to the staging environment and must only be pointed at a **staging** deployment of your Verifier. Several test cases deliberately replay, malform or oversize the Authorization Response, so they must never be sent to a production endpoint.

## What the tester does

For every test case, the tester performs the Wallet side of the presentation transaction described in the [Protocol](protocol.md) section:

1. Your Verifier Backend creates a presentation transaction and produces the device engagement URL — the very same string you would encode in a QR code or publish as a same-device link.
2. You paste that URL into the tester and press **Run test**.
3. The tester parses the URL, submits **wallet_metadata** and **wallet_nonce** to your **request_uri** using HTTP POST, and validates the returned Authorization Request JWS.
4. It builds a DeviceResponse for the requested document type, applies the manipulation specific to the selected test case (none at all for the *must accept* cases), encrypts the Authorization Response as JWE and submits it to your **response_uri**.
5. It records how your Verifier answered and compares the outcome with the expectation declared by the test case.

Each test case therefore exercises one concrete rule from the [Response validation](validation.md) section, from an attacker's perspective. The tester lists every available case with a short description of the manipulation it applies and states whether the presentation must be accepted or rejected. The suite is extended as the implementation profile evolves.

## Before you start

| Prerequisite | Details |
| --- | --- |
| Staging onboarding completed | Verifier registered, CSR submitted and staging verifier certificate received, as described in the [Integration](integration.md) section. |
| Verifier reachable from the internet | The tester calls your **request_uri** and your **response_uri** from its own host. Endpoints published only on `localhost`, on a private network or behind a VPN cannot be tested. |
| Valid TLS on your endpoints | Both endpoints must be served over HTTPS with a publicly trusted certificate. |
| Fresh transactions on demand | You must be able to produce a new presentation transaction (and thus a new request URL) whenever a test needs one. |
| Staging trust anchors installed | The valid test credentials are signed by the staging issuing CA. If that chain is missing from your trust store, even the *must accept* test cases fail. Request the staging trust anchors at `mconnect@egov.md` if you did not receive them during onboarding. |
| Rejection is observable | Your **response_uri** endpoint must answer differently for an accepted and for a refused presentation — otherwise the tester cannot distinguish a rejection from a silent acceptance. See [Reading the results](#reading-the-results). |

## Providing request URLs

The first step of **Test setup** declares how request URLs are supplied. Paste the full device engagement link produced by your Verifier — either the deep link encoded in your QR code (`eudi-openid4vp://?client_id=…&request_uri=…&request_uri_method=post`) or the equivalent HTTPS link.

| Mode | When to use it | Effect |
| --- | --- | --- |
| **One reusable URL for all tests** | Your Verifier accepts the same **request_uri** more than once, for example when it serves a static QR code that dynamically creates a transaction per call. | A single URL field is used by every test in the selected set, and the whole set can be executed unattended in one run. |
| **A unique URL for each test** | Your Verifier issues strictly single-use request URLs, which is the recommended behaviour. | Every test card gets its own URL field, and tests are run one at a time. |

> 💡 Request URLs are normally single-use and short-lived. In the unique-URL mode, create the transaction immediately before running the test, and use **Start guided testing** to be walked through the selected set one case at a time.

## Choosing the test set

The second step of **Test setup** selects the scope of the run.

| Set | Content |
| --- | --- |
| **Core tests** | The essential cases that every relying party must pass: the valid presentation plus the manipulations that break issuer authentication, device authentication, credential validity, issuer certificate validity and revocation. |
| **Online tests** | Cases in which your Verifier must reach back into the tester's own host to fetch a status list, an OCSP response or a CRL. Run them only when your Verifier has outbound access to `wallet.staging.egov.md`. |
| **All tests** | Core, online and all additional/specialised cases. This is the full conformance run. |

## Running the tests

1. Open the [Relying Party Tester](https://wallet.staging.egov.md/rp-tester).
2. Choose how request URLs will be provided and which test set to include.
3. Create a presentation transaction in your Verifier and copy its request URL.
4. Paste the URL and press **Run test** for a single case, **Run *N* tests** to execute the whole selected set in sequence (reusable-URL mode only), or **Start guided testing** to be taken through the set step by step.
5. Watch your Verifier logs in parallel — for a failing case, your own log entry usually identifies the missing validation rule faster than the summary does.

## Reading the results

Results appear above the test list and can be narrowed with the **Filter by result** selector.

| Result | Meaning | What to do |
| --- | --- | --- |
| **Passed** | Your Verifier reacted as the case requires: it accepted the valid presentation, or refused the manipulated one. | Nothing. |
| **Failed** | Your Verifier reacted the wrong way. A failed *must reject* case means a manipulated presentation was accepted, which is a security defect. | Locate the corresponding rule in [Response validation](validation.md) and implement or fix it. |
| **Tester error** | The exchange could not be completed at all — for example the request URL was already consumed or had expired, the Authorization Request could not be retrieved or its signature could not be validated. | The case says nothing about your validation logic. Fix the cause, create a fresh transaction and run it again. |
| **Not run** | The case has not been executed in this session. | — |

Because a rejection has to be recognisable from the outside, make sure your **response_uri** endpoint does not answer every submission identically. The Protocol section requires an `HTTP 200 OK` with an optional **redirect_uri** for a *successfully processed* Authorization Response; a presentation that fails validation must not be answered that way, must not mark the transaction as succeeded and must not have its data elements processed.

## Exit criteria

| Stage | Requirement |
| --- | --- |
| Minimum bar | All **core tests** pass. |
| Full conformance | Every case of the **All tests** set passes, with the online cases executed against a Verifier that can reach the tester's host. |
| Reporting | Once the run is complete, send the results to `mconnect@egov.md` together with your staging Verifier identifier. Detailed instructions for the production environment are provided afterwards, as described in the [Integration](integration.md) section. |

## Troubleshooting

| Symptom | Probable cause |
| --- | --- |
| Every case ends in **Tester error** | The request URL was already consumed or has expired, your **request_uri** is not reachable from the internet, or the returned Authorization Request is not a valid JWS as described in the [Protocol](protocol.md) section. |
| The *must accept* case fails while the *must reject* cases pass | Your Verifier refuses the valid presentation as well. Usually the staging trust anchor is missing from your trust store, or a validation rule is applied more strictly than the specification requires. |
| Most *must reject* cases fail | Your **response_uri** endpoint most likely answers every submission with the same success response, so the tester reads a rejection as an acceptance, or the DeviceResponse is not validated at all before the transaction is marked as succeeded. |
| Online cases fail while all the rest pass | Your Verifier cannot reach `wallet.staging.egov.md`, outbound HTTP is blocked by a proxy or firewall, or status list, OCSP and CRL retrieval is not implemented. |
| Only the status list cases fail | Status List CWT retrieval, content negotiation (`Accept: application/statuslist+cwt`) or signature verification is missing. See [Status List validation](validation.md#status-list-validation). |
| Results differ between runs | Cached CRL, OCSP or status list responses. Respect the caching rules of the [Response validation](validation.md) section and clear the cache between runs. |

## Out of scope

The tester verifies the Verifier's protocol handling and cryptographic validation only. The following remain your responsibility and are reviewed separately:

* user-facing flows, consent screens and error messages presented to the End-User;
* data minimisation — requesting only the data elements needed for the declared purpose;
* retention behaviour and the correct use of the **intent_to_retain** flag;
* logging, auditability and the operational security of the Verifier deployment;
* performance and availability under production load.