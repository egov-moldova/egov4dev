<img src="../../assets/wallet-intro.png" />

Following the EUDI Wallet regulation and its implementing acts, EVO Wallet implements remote presentation of attributes to wallet-relying parties according to **OpenID4VP 1.0**, using the mdoc format defined in **ISO/IEC 18013-5**, via same-device flow to retrieve documents. The mechanism is described in Section 8.3.1 of OpenID4VP 1.0 as **direct_post.jwt** response mode. Actual implementation profile is guided by **OpenID4VC HAIP 1.0** with ISO mdoc as credential format.

OpenID4VP is an extension of OAuth 2.0 that enables the Holder (mdoc holder) to present Credential (mdoc) using its Wallet (mdoc app) to a Verifier (mdoc reader) upon request. In this context, the Wallet acts as OAuth 2.0 Authorization Server and the Verifier acts as OAuth 2.0 Client.

<p align="center">
  <a href="https://forms.office.com/pages/responsepage.aspx?id=Z4f8jWsRaEKDxfvIWTRtONCmd0F9yDZKhSOtD6Jvt2xUMTVKOEE2NlRKNkQ0SlJZRkNQWDVISzE3UiQlQCN0PWcu&route=shorturl" target="_blank" style="display:inline-block; background-color:#1a6df0; color:#ffffff; font-size:16px; font-weight:600; padding:14px 28px; border-radius:8px; text-decoration:none; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    Become a Verifier in the EVO Wallet Ecosystem&nbsp;&nbsp;↗
  </a>
</p>

## Relying Parties in Production
<style>
.rp-wall {
  --rp-meta: #64748b;
  --rp-badge-bg: rgba(16, 185, 129, .12);
  --rp-badge-fg: #047857;
  --rp-dot: #10b981;
  --rp-plate: transparent;
  --rp-plate-pad: 0;
  margin: 1.5rem 0 2rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
@media (prefers-color-scheme: dark) {
  .rp-wall {
    --rp-meta: #94a3b8;
    --rp-badge-bg: rgba(16, 185, 129, .16);
    --rp-badge-fg: #34d399;
    --rp-plate: #ffffff;
    --rp-plate-pad: .5rem .9rem;
  }
}
[data-color-mode="dark"] .rp-wall,
[data-md-color-scheme="slate"] .rp-wall,
html.dark .rp-wall,
body.dark .rp-wall {
  --rp-meta: #94a3b8;
  --rp-badge-bg: rgba(16, 185, 129, .16);
  --rp-badge-fg: #34d399;
  --rp-plate: #ffffff;
  --rp-plate-pad: .5rem .9rem;
}
.rp-wall__intro {
  display: flex;
  align-items: center;
  gap: .55rem;
  margin: 0 0 1.25rem;
  font-size: .8125rem;
  color: var(--rp-meta);
}
.rp-wall__badge {
  display: inline-flex;
  align-items: center;
  gap: .4rem;
  padding: .25rem .6rem;
  border-radius: 999px;
  background: var(--rp-badge-bg);
  color: var(--rp-badge-fg);
  font-size: .6875rem;
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
  white-space: nowrap;
}
.rp-wall__badge::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--rp-dot);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, .18);
}
.rp-wall__logos {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem 2.75rem;
}
.rp-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  padding: var(--rp-plate-pad);
  border-radius: 8px;
  background: var(--rp-plate);
}
.rp-logo img {
  max-height: 40px;
  max-width: 200px;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
}
@media (max-width: 480px) {
  .rp-wall__logos { gap: 1.25rem 1.75rem; }
  .rp-logo { height: 48px; }
  .rp-logo img { max-height: 32px; max-width: 150px; }
  .rp-wall__intro { flex-wrap: wrap; }
}
</style>
<div class="rp-wall">
  <p class="rp-wall__intro">
    <span class="rp-wall__badge">Live</span>
    <span>Relying parties that have completed onboarding and accept EVO Wallet presentations in production.</span>
  </p>
  <div class="rp-wall__logos">
    <span class="rp-logo">
      <img src="../../assets/logos/micb.png" srcset="../../assets/logos/micb.png 1x, ../../assets/logos/micb@2x.png 2x" alt="Moldindconbank" loading="lazy" width="479" height="80">
    </span>
    <span class="rp-logo">
      <img src="../../assets/logos/fincombank.png" srcset="../../assets/logos/fincombank.png 1x, ../../assets/logos/fincombank@2x.png 2x" alt="FinComBank" loading="lazy" width="393" height="80">
    </span>
  </div>
</div>

## Jump right in

<div class="quick-links-wrapper">
  <div class="quick-links-container">
    <a href="integration/" class="quick-link-card">
      <div class="quick-link-icon">🔌</div>
      <h3 class="quick-link-title">Integration</h3>
      <p class="quick-link-description">How to integrate with EVO Wallet</p>
    </a>
    <a href="protocol/" class="quick-link-card">
      <div class="quick-link-icon">🔐</div>
      <h3 class="quick-link-title">Protocol</h3>
      <p class="quick-link-description">OpenID4VP flow</p>
    </a>
    <a href="examples/" class="quick-link-card">
      <div class="quick-link-icon">🧾</div>
      <h3 class="quick-link-title">Examples</h3>
      <p class="quick-link-description">Full request/ response payload samples</p>
    </a>
    <a href="demoverifierbnm/" class="quick-link-card">
      <div class="quick-link-icon">🏦</div>
      <h3 class="quick-link-title">Demo verifier</h3>
      <p class="quick-link-description">Provided by the National Bank of Moldova</p>
    </a>
  </div>
</div>


## Referenced standards

| Standard | Description |
|----------|-------------|
| OpenID4VP 1.0 | OpenID for Verifiable Presentations 1.0 |
| OpenID4VC HAIP 1.0 | OpenID for Verifiable Credentials High Assurance Interoperability Profile 1.0 |
| RFC 6749 | The OAuth 2.0 Authorization Framework |
| RFC 8414 | OAuth 2.0 Authorization Server Metadata |
| RFC 9101 | The OAuth 2.0 Authorization Framework: JWT-Secured Authorization Request (JAR) |
| ISO/IEC 18013-5:2021 | Personal identification — ISO-compliant driving licence Part 5: Mobile driving licence (mDL) application |
| ISO/IEC TS 18013-7:2025 | Personal identification — ISO-compliant driving licence Part 7: Mobile driving licence (mDL) add-on functions |
| RFC 7049 | Concise Binary Object Representation (CBOR) |
| RFC 8152 | CBOR Object Signing and Encryption (COSE) |
| RFC 8610 | Concise Data Definition Language (CDDL): A Notational Convention to Express Concise Binary Object Representation (CBOR) and JSON Data Structures |
| RFC 9360 | CBOR Object Signing and Encryption (COSE): Header Parameters for Carrying and Referencing X.509 Certificates |
| IETF TSL _draft_ | IETF Token Status List - _draft-ietf-oauth-status-list-21_ |


