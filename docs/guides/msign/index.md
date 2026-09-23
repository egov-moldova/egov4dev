# Overview

MSign is a reusable and shared platform-level service the main scope of which is to facilitate the use of digital signature and simplify integrations with various digital signature instruments.

## At a glance

**What it is.** The government service that acts as an intermediary for signing and verifying documents electronically. Instead of integrating separately with every signature instrument on the market, a system integrates once with MSign, which hides the differences and exposes a single interface. MSign also performs signature verification, including certificate revocation checks with the trust service provider. MSign does not issue certificates and is not a trust service provider — it is an intermediary.

**Legal basis.** HG nr. 405/2014 privind serviciul electronic guvernamental de semnătură digitală (MSign) — pct. 3 sbp. 1) — desemnarea posesorului.

Related acts: Legea nr. 91/2014 privind semnătura electronică și documentul electronic; Legea nr. 467/2003.

**Who is accountable.**

| Role | Entity |
|---|---|
| Holder (posesor) | AGE |
| Keeper (deținător) | De confirmat — tabelul AGE indică doar calitatea de posesor |
| Technical operator (operator tehnico-tehnologic) | STISC |

**Roles in an integration.**

- EGA (AGE) — holder/keeper of the platform; signs the integration agreement and registers the integrating system.
- STISC — issues the system certificate required for staging and production; operates the hosting infrastructure.
- Holder of the integrating system — decides the purpose and legal basis of use, the access rights, and is accountable for compliance.
- Development/integration team — implements and tests the technical integration.
- End user — the natural person or legal entity benefiting from the service.

**Access conditions.**

Instituții publice: gratuit.
Persoane juridice de drept privat și persoane fizice: în baza contractului — 15.200 lei/an per sistem integrat.
Obligatoriu: certificat de sistem emis de STISC.

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
  </div>
    <div class="quick-links-container">
    <a href="api-reference/" class="quick-link-card">
      <div class="quick-link-icon">🌐</div>
      <h3 class="quick-link-title">API reference</h3>
      <p class="quick-link-description">Explore endpoints and callbacks</p>
    </a>
    <a href="https://www.nuget.org/profiles/egov-moldova" class="quick-link-card">
      <div class="quick-link-icon">📦</div>
      <h3 class="quick-link-title">NuGet packages</h3>
      <p class="quick-link-description">.NET packages for your application.</p>
    </a>
  </div>
</div>

## Scope and target audience

The details related to various digital signature instruments integrated with MSign are out of scope of this document.

For the complete glossary, please visit the [Glossary page](https://egov-moldova.github.io/egov4dev/glossary/glossary/).

## General system capabilities

MSign is a reusable and shared platform-level service the main scope of which is to facilitate the use of digital signature and simplify integrations with various digital signature instruments.
MSign is used as intermediary between various information systems and digital signature instrument providers. Digital signature providers differ significantly from the integration point of view, exposing various APIs that might involve direct user interaction through the browser to access user's cryptographic device or use of cryptographic devices that are not directly connected to user's PC. MSign integrates with these providers, hides the differences and exposes a single unified interface to information systems that require digital signature integration.
For actual signing, MSign exposes web pages that guide the user through digital signature instrument selection, instrument specific data input, actual signing progress and signing process result pages.
For digital signature verification, MSign exposes a verification web service which integrates with various certification authorities to perform the actual verification, including certificate revocation checks.

## Service dependencies
MSign depends on the digital signature providers, so its availability and performance is directly influenced by the availability and performance delivered by the providers.

## Protocols and standards

MSign exposes WS-I Basic Profile 1.1 interoperable service over HTTPS which corresponds to basicHttpBinding in WCF. MSign uses SOAP faults for error reporting.
