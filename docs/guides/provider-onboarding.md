# Provider onboarding

This page is for an organisation that provides a **signing or authentication solution** — a qualified trust service provider (QTSP) — and wants it offered as an option inside MSign and/or MPass.

This is different from connecting an information system as a consumer of the platforms. For that, see the [Connection procedure](../platforms/procedure.md).

## How the integrator model works

MSign and MPass are **integrator services**. They do not replace the QTSP's solution — they route the citizen to it and consume a well-defined interface that the QTSP exposes:

- The QTSP keeps its own users, devices, certificates, and user experience.
- MSign / MPass handle the e-service side: the request that starts the operation, storage of the result, and — for MPass — the SAML session issued to the e-service.
- The e-service never talks to the QTSP directly; it only talks to MSign / MPass.

A QTSP may integrate with **one or both** services. The following two tracks are independent technical onboardings within one legal agreement.


## Jump right in

<style>
.quick-link-description { font-size: 0.72rem !important; }
.quick-link-card { cursor: default; }
.quick-link-card:hover { background: #f6f6f6 !important; }
.quick-link-btn {
  display: inline-block;
  margin-top: 0.9rem;
  padding: 6px 14px;
  background: #0058D2;
  color: #ffffff !important;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 500;
  text-decoration: none !important;
  transition: background 0.2s;
}
.quick-link-btn:hover { background: #0046b8 !important; color: #fff !important; }
</style>

<div class="quick-links-wrapper">
  <div class="quick-links-container">
    <div class="quick-link-card">
      <div class="quick-link-icon">✍️</div>
      <h3 class="quick-link-title">MSign — signature provider</h3>
      <ol class="quick-link-description">
        <li>MSign sends a document hash or a PDF.</li>
        <li>The QTSP authenticates the signer, signs, and returns a detached XAdES‑T (for a hash) or an embedded PAdES‑T (for a PDF) plus the signer's certificate.</li>
        <li>Qualified and advanced signatures; synchronous or asynchronous.</li>
        <li>Two APIs are exposed — signing and signature verification.</li>
      </ol>
      <a href="../msign/provider-integration-spec/" class="quick-link-btn">View specification</a>
    </div>
    <div class="quick-link-card">
      <div class="quick-link-icon">🔐</div>
      <h3 class="quick-link-title">MPass — authentication provider</h3>
      <ol class="quick-link-description">
        <li>MPass sends a one-time challenge.</li>
        <li>The QTSP authenticates the person and returns their identity (qualified certificate) plus a signature over the challenge.</li>
        <li>The SAML session stays with MPass.</li>
        <li>One API is exposed — authentication.</li>
      </ol>
      <a href="../mpass/provider-integration-spec/" class="quick-link-btn">View specification</a>
    </div>
  </div>
</div>

## Preconditions

Before onboarding starts, the QTSP must:

- Hold **qualified trust service provider status**, granted by the supervisory body (the Information and Security Service) under the law. The QTSP's certificate authority must be on the national trusted list; EU providers are recognised through their member state's trusted list.
- Study the integration specification and interaction scenarios for the service(s) it wants to integrate — [MSign](msign/provider-integration-spec.md) and/or [MPass](mpass/provider-integration-spec.md).
- Sign the **confidentiality agreement (NDA)** provided by eGov. This is required before access to any integration resources is granted.
- Have a **contract** in place with the owner of the MSign / MPass services (the integration agreement of Step 2).

## Onboarding process

Complete the steps below **in order**. Everything in **Step 1** and **Step 2** is on the QTSP and can be done in parallel — but the eGovernance Agency (eGov) starts the technical integration only after Step 2 is complete.

### Step 1 — Prepare and submit (QTSP)

- **Submit the request** through the online form on the eGov website, and sign the NDA.
- **Designate contacts:** the technical and operational responsibles on the QTSP side.
- **Confirm your CA** is on the national trusted list (see Preconditions). Confirm it with the eGov integration team before you build.
- **Build and expose the API(s):** MSign — the **signing** API and the **signature verification** API; MPass — the **authentication** API.
- **Submit the technical package:** the service description (WSDL or OpenAPI) and endpoint URLs, plus the API token your service accepts from eGov (eGov issues you a token for your callback in return). Document — against the [MSign](msign/provider-integration-spec.md) / [MPass](mpass/provider-integration-spec.md) specification — the initiation flow, the signer / user authentication mechanism, document-or-hash (MSign) or challenge (MPass) handling, confirmation and refusal, result return, the status / callback mechanism for asynchronous flows, cancellation and expiry, the generated signature format and the certificate and CA used (MSign) or the attributes returned to MPass, and the specific error codes and messages.
- **Submit the branding package:** logo (required dimensions and format) and the display texts shown to the citizen.
- **Agree the SLA** with eGov, covering: the incident-reporting channel and contact points; incident severity classification; acknowledgement, response and restoration times; the escalation procedure; notification of planned works and of unavailability; security-incident communication; and the committed service availability.

### Step 2 — Agreement and payment (both parties)

- The **integration agreement** is signed by both parties.
- The **integration fee** is invoiced and **paid**.

!!! warning "The technical integration starts only after Step 2"
    eGov begins work on your integration **only after** the agreement is signed and the integration invoice is paid. Steps 3–5 do not begin before then.

### Step 3 — Scheduling and technical integration (eGov)

Once the agreement and payment are complete, the eGov team **schedules** the work against its current capacity. eGov confirms **when it can start** and an **estimated delivery time**; work does not necessarily begin the moment the invoice is paid.

This is a queue, not a deprioritisation — the platform team runs a shared backlog across many integrations, and each is picked up in turn. The confirmed start date and estimate let you plan your own side accordingly.

eGov then reviews the technical package (and asks for clarifications if needed), configures the QTSP in the **MSign / MPass test environment**, and verifies connectivity.

!!! note "Timeline"
    Once eGov has all the technical information and the preconditions are met, integration typically takes **30–40 working days**. This does not count time spent waiting for information or changes from the QTSP, or time fixing nonconformities found during testing.

### Step 4 — Testing and technical acceptance

- **Functional testing** — the operations behave as specified end to end.
- **Non-functional testing** — performance and security.
- **Service-specific scenarios** — cancellation, expiry, refusal, failed authentication, error handling.
- The QTSP fixes any nonconformities and confirms readiness for retest; the QTSP delivers the **test reports**. eGov documents the results and confirms **technical acceptance**.

### Step 5 — Production preparation and go-live

- The QTSP submits the **production** endpoints / configuration and any certificates or keys, and confirms the support, incident and escalation contacts.
- eGov verifies the production configuration, confirms technical acceptance and that the contractual conditions are met, then configures and activates the QTSP in production.
- A **controlled test in production** is run with the QTSP before the integration is declared live.
