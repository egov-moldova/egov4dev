# Onboarding a signature or authentication provider

!!! note "Audience"
    This page is for an organisation that operates a **signing or authentication solution** — a qualified trust service provider, a mobile-signature operator, an identity app, a cryptographic-token issuer — and wants it offered as an option **inside** MSign and/or MPass. On this page such an organisation is called the **QTSP** (qualified trust service provider), or simply the **Provider**.

    This is different from connecting an information system as a consumer of the platforms. For that, see the [Connection procedure](../platforms/procedure.md).

## How the integrator model works

MSign and MPass are **integrator services**. They do not replace the QTSP's solution — they route the citizen to it and consume a well-defined interface that the QTSP exposes:

- The QTSP keeps its own users, devices, certificates, and user experience.
- MSign / MPass handle the e-service side: the request that starts the operation, storage of the result, and — for MPass — the SAML session issued to the e-service.
- The e-service never talks to the QTSP directly; it only talks to MSign / MPass.

A QTSP may integrate with **one or both** services. The two tracks are independent contracts and independent technical onboardings.

---

## Integration tracks

<div class="quick-links-wrapper">
  <div class="quick-links-container">
    <a href="../msign/provider-integration-spec/" class="quick-link-card">
      <div class="quick-link-icon">✍️</div>
      <h3 class="quick-link-title">MSign — signature provider</h3>
      <p class="quick-link-description">The QTSP acts as a signing instrument. MSign sends a document hash or a PDF; the QTSP returns a detached XAdES‑T or an embedded PAdES‑T plus the signer's certificate. Qualified and advanced signatures; synchronous or asynchronous. Two APIs are exposed — signing and signature verification. Read the specification →</p>
    </a>
    <a href="../mpass/provider-integration-spec/" class="quick-link-card">
      <div class="quick-link-icon">🔐</div>
      <h3 class="quick-link-title">MPass — authentication provider</h3>
      <p class="quick-link-description">The QTSP acts as an electronic identification method. MPass sends a one-time challenge; the QTSP authenticates the person and returns their identity (qualified certificate) plus a signature over the challenge. The SAML session stays with MPass. One API is exposed — authentication. Read the specification →</p>
    </a>
  </div>
</div>

---

## Onboarding process

Complete the steps below **in order**. Everything in **Step 1** and **Step 2** is on the QTSP and can be done in parallel — but the eGovernance Agency (eGov) starts the technical integration only after Step 2 is complete.

### Step 1 — Prepare and submit (QTSP)

- **Confirm your CA.** The certificate authority behind your solution must be on the national trusted list (or, for EU providers, on your member state's trusted list). Confirm it with the eGov integration team before you build.
- **Build and expose the API(s):**
    - MSign — the **signing** API and the **signature verification** API.
    - MPass — the **authentication** API.
- **Submit the technical package:** endpoint URLs and the service description (WSDL or OpenAPI); the API token your service accepts from eGov (eGov issues you a token for your callback in return).
- **Submit the branding package:** logo (required dimensions and format) and the display texts shown to the citizen.
- **Agree the operational model** with eGov product management: error handling, and how unavailability of your service is detected, communicated, and remediated.

### Step 2 — Agreement and payment

- The **integration agreement** is signed by both parties.
- The **integration fee** is invoiced and **paid**.

!!! warning "The technical integration starts only after Step 2"
    eGov begins work on your integration **only after** the agreement is signed and the integration invoice is paid. Steps 3–5 do not begin before then.

### Step 3 — Scheduling and technical integration (eGov)

Once the agreement and payment are complete, the eGov team **schedules** the work against its current capacity. eGov confirms **when it can start** and an **estimated delivery time**; work does not necessarily begin the moment the invoice is paid.

This is a queue, not a deprioritisation — the platform team runs a shared backlog across many integrations, and each is picked up in turn. The confirmed start date and estimate let you plan your own side accordingly.

eGov then implements your API(s) and configures the integration on the **test / staging environment**.

### Step 4 — Testing

- **Functional testing** — the operations behave as specified end to end.
- **Non-functional testing** — performance and security.
- The QTSP delivers the **test reports**.

<span class="red-bold-text">ToDo (eGov): define the minimum set of non-functional tests.</span>

### Step 5 — Go to production

After acceptance, the integration is activated in the production environment.

## Summary

| # | Technical | Procedural |
|---|-----------|-----------|
| 1 | QTSP exposes the integration API(s): signing and verification (MSign) / authentication (MPass). | Integration agreement signed by both parties. |
| 2 | eGov schedules the work and implements the API(s) on the test environment. | Starts only after the API(s) are delivered and the integration invoice is paid. eGov confirms a start date and estimated delivery based on current capacity. Branding (logo dimensions and format, texts). Operational error handling — how QTSP-side unavailability is handled and remediated. |
| 3 | Functional and non-functional testing (performance, security). | Test reports. |
| 4 | Go to production. | |

## Questions

Direct questions on this process to the MSign / MPass integration team.
