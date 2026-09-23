MPay is a reusable and shared platform-level service the main scope of which is to enable the payment for any e-Service with any payment instrument available in the market.
The unified technical interface used for integrating e-Services with MPay significantly simplifies integrations by hiding differences in technical protocols and formats.
There are many non-technical advantages enabled by MPay, such as easier contract management and simplified clearance, but they are out of scope of this document.

## At a glance

**What it is.** The government payment service: a single point for paying fees, fines and public services with any payment instrument available on the market (card, internet banking, terminal, cash at providers). The service provider integrates once with MPay rather than separately with each bank or processor. MPay confirms the payment back to the provider's system and keeps the record and reporting of collections. The ability to pay for a given service depends on the availability of the web service exposed by the provider.

**Legal basis.** HG nr. 712/2020 cu privire la serviciul guvernamental de plăți electronice (MPay) — pct. 16 din Concept — desemnarea posesorului și deținătorului.

Related acts: Legea nr. 234/2021 cu privire la serviciile publice; cadrul bugetar privind încasările la buget.

**Who is accountable.**

| Role | Entity |
|---|---|
| Holder (posesor) | AGE |
| Keeper (deținător) | AGE |
| Technical operator (operator tehnico-tehnologic) | De confirmat în textul HG nr. 712/2020 |

**Roles in an integration.**

- EGA (AGE) — holder/keeper of the platform; signs the integration agreement and registers the integrating system.
- STISC — issues the system certificate required for staging and production; operates the hosting infrastructure.
- Holder of the integrating system — decides the purpose and legal basis of use, the access rights, and is accountable for compliance.
- Development/integration team — implements and tests the technical integration.
- End user — the natural person or legal entity benefiting from the service.

**Access conditions.**

Gratuit pentru integratori (comisioanele instrumentelor de plată se stabilesc separat).
Obligatoriu: acord distinct cu AGE pentru MPay (separat de acordul pentru suita M) și certificat STISC.

**Who this guide is for.**

Primary: development and integration teams of the holders of information systems, public and private.
Secondary: project managers and compliance officers preparing the agreement with EGA and the STISC certificate.

## Jump right in

<div class="quick-links-wrapper">
  <div class="quick-links-container">
    <a href="process/" class="quick-link-card">
      <div class="quick-link-icon">⚡</div>
      <h3 class="quick-link-title">Connection steps</h3>
      <p class="quick-link-description">Get started with integration</p>
    </a>
    <a href="integration-development/" class="quick-link-card">
      <div class="quick-link-icon">📘</div>
      <h3 class="quick-link-title">Integration guide</h3>
      <p class="quick-link-description">Step-by-step documentation</p>
    </a>
    <a href="api-reference/" class="quick-link-card">
      <div class="quick-link-icon">🌐</div>
      <h3 class="quick-link-title">API reference</h3>
      <p class="quick-link-description">Explore endpoints and callbacks</p>
    </a>    
  </div>
</div>

## Scope and target audience

This document describes the technical interfaces used to integrate with MPay. There are interfaces on both sides, on payable e-Service and MPay side. Its target audience is the development teams that implement or maintain information systems to be integrated with MPay.

## Service dependencies

The availability of MPay depends on the availability of the IServiceProvider implementation,
i.e. a payer will not be able to query for an order or an invoice for a particular e-Service and
pay for it, if the e-Service provider's web-service is not available.

## Protocols and standards

MPay exposes WS-I Basic Profile 1.1 interoperable service over HTTPS which corresponds to basicHttpBinding in WCF. MPay uses SOAP faults for error reporting.
MPay uses WS-Security (X.509) XML Signature (at message level) to enable non-repudiation.
