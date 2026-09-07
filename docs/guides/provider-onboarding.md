# Onboarding a signature or authentication provider

!!! note "Audience"
    This page is for an organisation that operates a **signing or authentication solution** — a qualified trust service provider, a mobile-signature operator, an identity app, a cryptographic-token issuer — and wants it offered as an option **inside** MSign and/or MPass.

    This is different from connecting an information system as a consumer of the platforms. For that, see the [Connection procedure](../platforms/procedure.md).

## How the integrator model works

MSign and MPass are **integrator services**. They do not replace your solution — they route the citizen to it and consume a well-defined interface that you expose:

- You keep your own users, devices, certificates, and user experience.
- MSign / MPass handle the e-service side: the request that starts the operation, storage of the result, and — for MPass — the SAML session issued to the e-service.
- The e-service never talks to you directly; it only talks to MSign / MPass.

A provider may integrate with **one or both** services. The two tracks are independent contracts and independent technical onboardings.

---

## MSign — signature provider track

!!! note "What you build"
    You act as a **signature provider (signing instrument)** inside MSign.

    - MSign sends you the data to sign — a document **hash** or a **PDF** — with an optional signer identifier (IDNP).
    - You authenticate the signer, produce the signature, and return a **detached XAdES‑T** (for a hash) or an **embedded PAdES‑T** (for a PDF), plus the signer's certificate.
    - Both **qualified** and **advanced** electronic signatures are supported; synchronous and asynchronous modes are both available.
    - You expose **two APIs**: one for **signing** and one for **signature verification**.

    **Full technical interface:** [Signature provider integration specification](msign/provider-integration-spec.md)

## MPass — authentication provider track

!!! note "What you build"
    You act as an **authentication provider (electronic identification method)** inside MPass.

    - MPass sends you a **one-time challenge** and an optional user identifier (IDNP).
    - You authenticate the person and return their **identity** (qualified certificate) plus a **signature over the challenge** as proof.
    - MPass maps the identity to the user's account and issues the **SAML session** to the e-service — that part stays with MPass.
    - You expose **one API** for **authentication**; synchronous and asynchronous modes are both available.

    **Full technical interface:** [Authentication provider integration specification](mpass/provider-integration-spec.md)

---

## Onboarding process

Complete the steps below **in order**. Everything in **Step 1** and **Step 2** is on you and can be done in parallel — but the eGovernance Agency (AGE) starts the technical integration only after Step 2 is complete.

### Step 1 — Prepare and submit (Provider)

- **Confirm your CA.** The certificate authority behind your solution must be on the national trusted list (or, for EU providers, on your member state's trusted list). Confirm it with the AGE integration team before you build.
- **Build and expose the API(s):**
    - MSign — the **signing** API and the **signature verification** API.
    - MPass — the **authentication** API.
- **Submit the technical package:** endpoint URLs and the service description (WSDL or OpenAPI); the API token your service accepts from AGE (AGE issues you a token for your callback in return).
- **Submit the branding package:** logo (required dimensions and format) and the display texts shown to the citizen.
- **Agree the operational model** with AGE product management: error handling, and how unavailability of your service is detected, communicated, and remediated.

### Step 2 — Agreement and payment

- The **integration agreement** is signed by both parties.
- The **integration fee** is invoiced and **paid**.

!!! warning "The technical integration starts only after Step 2"
    AGE begins work on your integration **only after** the agreement is signed and the integration invoice is paid. Steps 3–5 do not begin before then.

### Step 3 — Scheduling and technical integration (AGE)

Once the agreement and payment are complete, the AGE team **schedules** the work against its current capacity. AGE confirms **when it can start** and an **estimated delivery time**; work does not necessarily begin the moment the invoice is paid.

This is a queue, not a deprioritisation — the platform team runs a shared backlog across many integrations, and each is picked up in turn. The confirmed start date and estimate let you plan your own side accordingly.

AGE then implements your API(s) and configures the integration on the **test / staging environment**.

### Step 4 — Testing

- **Functional testing** — the operations behave as specified end to end.
- **Non-functional testing** — performance and security.
- The Provider delivers the **test reports**.

<span class="red-bold-text">ToDo (AGE): define the minimum set of non-functional tests.</span>

### Step 5 — Go to production

After acceptance, the integration is activated in the production environment.

## Summary

| # | Technical | Procedural |
|---|-----------|-----------|
| 1 | Provider exposes the integration API(s): signing and verification (MSign) / authentication (MPass). | Integration agreement signed by both parties. |
| 2 | AGE schedules the work and implements the API(s) on the test environment. | Starts only after the API(s) are delivered and the integration invoice is paid. AGE confirms a start date and estimated delivery based on current capacity. Branding (logo dimensions and format, texts). Operational error handling — how Provider-side unavailability is handled and remediated. |
| 3 | Functional and non-functional testing (performance, security). | Test reports. |
| 4 | Go to production. | |

## Questions

Direct questions on this process to the MSign / MPass integration team.
