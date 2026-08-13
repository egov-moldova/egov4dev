<img src="../../assets/wallet-intro.png" />

Following the EUDI Wallet regulation and its implementing acts, EVO Wallet implements remote presentation of attributes to wallet-relying parties according to **OpenID4VP 1.0**, using the mdoc format defined in **ISO/IEC 18013-5**, via same-device flow to retrieve documents. The mechanism is described in Section 8.3.1 of OpenID4VP 1.0 as **direct_post.jwt** response mode. Actual implementation profile is guided by **OpenID4VC HAIP 1.0** with ISO mdoc as credential format.

OpenID4VP is an extension of OAuth 2.0 that enables the Holder (mdoc holder) to present Credential (mdoc) using its Wallet (mdoc app) to a Verifier (mdoc reader) upon request. In this context, the Wallet acts as OAuth 2.0 Authorization Server and the Verifier acts as OAuth 2.0 Client.

<p align="center">
  <a href="https://forms.office.com/pages/responsepage.aspx?id=Z4f8jWsRaEKDxfvIWTRtONCmd0F9yDZKhSOtD6Jvt2xUMTVKOEE2NlRKNkQ0SlJZRkNQWDVISzE3UiQlQCN0PWcu&route=shorturl" target="_blank" style="display:inline-block; background-color:#1a6df0; color:#ffffff; font-size:16px; font-weight:600; padding:14px 28px; border-radius:8px; text-decoration:none; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    Become a Verifier in the EVO Wallet Ecosystem&nbsp;&nbsp;↗
  </a>
</p>

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

## Relying Parties in Production

<style>
.rp-wall {
  --rp-surface: #ffffff;
  --rp-border: rgba(15, 23, 42, .10);
  --rp-border-hover: rgba(26, 109, 240, .45);
  --rp-shadow: 0 1px 2px rgba(15, 23, 42, .04);
  --rp-shadow-hover: 0 10px 28px rgba(15, 23, 42, .10);
  --rp-plate: transparent;
  --rp-plate-ring: transparent;
  --rp-name: #0f172a;
  --rp-meta: #64748b;
  --rp-badge-bg: rgba(16, 185, 129, .12);
  --rp-badge-fg: #047857;
  --rp-dot: #10b981;
  margin: 1.5rem 0 2rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
@media (prefers-color-scheme: dark) {
  .rp-wall {
    --rp-surface: rgba(255, 255, 255, .04);
    --rp-border: rgba(255, 255, 255, .12);
    --rp-border-hover: rgba(96, 165, 250, .55);
    --rp-shadow: none;
    --rp-shadow-hover: 0 10px 28px rgba(0, 0, 0, .45);
    --rp-plate: #ffffff;
    --rp-plate-ring: rgba(255, 255, 255, .10);
    --rp-name: #e8edf5;
    --rp-meta: #94a3b8;
    --rp-badge-bg: rgba(16, 185, 129, .16);
    --rp-badge-fg: #34d399;
  }
}
[data-color-mode="dark"] .rp-wall,
[data-md-color-scheme="slate"] .rp-wall,
html.dark .rp-wall,
body.dark .rp-wall {
  --rp-surface: rgba(255, 255, 255, .04);
  --rp-border: rgba(255, 255, 255, .12);
  --rp-border-hover: rgba(96, 165, 250, .55);
  --rp-shadow: none;
  --rp-shadow-hover: 0 10px 28px rgba(0, 0, 0, .45);
  --rp-plate: #ffffff;
  --rp-plate-ring: rgba(255, 255, 255, .10);
  --rp-name: #e8edf5;
  --rp-meta: #94a3b8;
  --rp-badge-bg: rgba(16, 185, 129, .16);
  --rp-badge-fg: #34d399;
}
.rp-wall__intro {
  display: flex;
  align-items: center;
  gap: .55rem;
  margin: 0 0 1.1rem;
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
.rp-wall__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 300px));
  justify-content: start;
  gap: 1rem;
}
.rp-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .85rem;
  padding: 1.25rem 1.25rem 1.15rem;
  border: 1px solid var(--rp-border);
  border-radius: 14px;
  background: var(--rp-surface);
  box-shadow: var(--rp-shadow);
  text-decoration: none;
  transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
}
a.rp-card:hover,
a.rp-card:focus-visible {
  transform: translateY(-3px);
  border-color: var(--rp-border-hover);
  box-shadow: var(--rp-shadow-hover);
  text-decoration: none;
}
.rp-card__plate {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 72px;
  padding: 0 1rem;
  border-radius: 10px;
  background: var(--rp-plate);
  box-shadow: inset 0 0 0 1px var(--rp-plate-ring);
}
.rp-card__plate img {
  max-width: 100%;
  max-height: 44px;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
}
.rp-card__name {
  margin: 0;
  font-size: .9375rem;
  font-weight: 600;
  line-height: 1.3;
  text-align: center;
  color: var(--rp-name);
  letter-spacing: -.005em;
}
@media (max-width: 480px) {
  .rp-wall__grid { grid-template-columns: 1fr; }
  .rp-card__plate { height: 64px; }
  .rp-wall__intro { flex-wrap: wrap; }
}
</style>

<div class="rp-wall">
  <p class="rp-wall__intro">
    <span class="rp-wall__badge">Live</span>
    <span>Relying parties that have completed onboarding and accept EVO Wallet presentations in production.</span>
  </p>
  <div class="rp-wall__grid">
    <div class="rp-card">
      <span class="rp-card__plate">
        <img src="../../assets/logos/micb.png" srcset="../../assets/logos/micb.png 1x, ../../assets/logos/micb@2x.png 2x" alt="Moldindconbank logo" loading="lazy" width="479" height="80">
      </span>
      <p class="rp-card__name">Moldindconbank</p>
    </div>
    <div class="rp-card">
      <span class="rp-card__plate">
        <img src="../../assets/logos/fincombank.png" srcset="../../assets/logos/fincombank.png 1x, ../../assets/logos/fincombank@2x.png 2x" alt="FinComBank logo" loading="lazy" width="393" height="80">
      </span>
      <p class="rp-card__name">FinComBank</p>
    </div>
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


