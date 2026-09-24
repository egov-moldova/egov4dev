MDelivery is a governmental electronic service designed to provide a unified and integrated delivery mechanism in order to improve the logistic capability of Public Service Providers to deliver, sort and track physical goods (resulted from provided public services) to individuals and legal entities.

To enable the delivery process, MDelivery is integrated with Service Providers (to receive orders to be delivered) and Carriers systems (to order delivery services) and other governmental electronic services facilitating the process (MPass, MPay, MNotify).

"## At a glance

**What it is.** The government delivery service: the mechanism by which the physical output of a public service (certificate, apostilled act, civil status document, etc.) reaches the applicant at home or at work, through integrated postal operators and couriers, with no counter visit. The provider places the delivery order from its own system; MDelivery passes it to the carrier and returns the delivery status. The service is integrated with MPass, MPay and MNotify for authentication, payment and notifying the beneficiary.

**Legal basis.** HG nr. 152/2021 cu privire la serviciul guvernamental de livrare (MDelivery) — pct. 2 — desemnarea posesorului și deținătorului.

Related acts: Legea nr. 234/2021 cu privire la serviciile publice; cadrul privind serviciile poștale.

**Who is accountable.**

| Role | Entity |
|---|---|
| Holder (posesor) | eGov Moldova |
| Keeper (deținător) | eGov Moldova |
| Technical operator (operator tehnico-tehnologic) | STISC |

**Roles in an integration.**

- eGov Moldova — holder/keeper of the platform; signs the integration agreement and registers the integrating system.
- STISC — issues the system certificate required for staging and production; operates the hosting infrastructure.
- Holder of the integrating system — decides the purpose and legal basis of use, the access rights, and is accountable for compliance.
- Development/integration team — implements and tests the technical integration.
- End user — the natural person or legal entity benefiting from the service.

**Access conditions.**

Gratuit pentru integrare (tariful de livrare se achită cărăușului). Obligatoriu: certificat STISC și acord cu eGov Moldova.

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

## Document structure

This document contains the relevant information required for a complete understanding of MDelivery system from the integration point of view. It includes samples of integration scenarios for different technologies. As well this document describes the technical interfaces exposed by MDelivery for Service Providers systems that will use MDelivery and technical details explaining the interaction.

The target audience are the development teams responsible for integration and system administration.
