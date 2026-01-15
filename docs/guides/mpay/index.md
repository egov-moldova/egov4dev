MPay is a reusable and shared platform-level service the main scope of which is to enable the payment for any e-Service with any payment instrument available in the market.
The unified technical interface used for integrating e-Services with MPay significantly simplifies integrations by hiding differences in technical protocols and formats.
There are many non-technical advantages enabled by MPay, such as easier contract management and simplified clearance, but they are out of scope of this document.

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
    <a href="api-references/" class="quick-link-card">
      <div class="quick-link-icon">🌐</div>
      <h3 class="quick-link-title">API references</h3>
      <p class="quick-link-description">Explore endpoints and callbacks</p>
    </a>    
  </div>
</div>

## Scope and target audience

This document describes the technical interfaces used to integrate with MPay. There are interfaces on both sides, on payable e-Service and MPay side. Its target audience is the development teams that implement or maintain information systems to be integrated with MPay.

## Service dependencies

The availability of MPay depends on the availability of the IServiceProvider implementation,
i.e. a payer will not be able to query for an order or an invoice for a particular e-Service and
pay for it, if the e-Service provider’s web-service is not available.

## Protocols and standards

MPay exposes WS-I Basic Profile 1.1 interoperable service over HTTPS which corresponds to basicHttpBinding in WCF. MPay uses SOAP faults for error reporting.
MPay uses WS-Security (X.509) XML Signature (at message level) to enable non-repudiation.
