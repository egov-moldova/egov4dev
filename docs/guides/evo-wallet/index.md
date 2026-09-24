<img src="../../assets/wallet-intro.png" />

În conformitate cu reglementarea EUDI Wallet și actele sale de implementare, EVO Wallet implementează prezentarea la distanță a atributelor către părțile care se bazează pe portofel (relying parties), conform **OpenID4VP 1.0**, utilizând formatul mdoc definit în **ISO/IEC 18013-5**, printr-un flux same-device pentru recuperarea documentelor. Mecanismul este descris în Secțiunea 8.3.1 din OpenID4VP 1.0 ca mod de răspuns **direct_post.jwt**. Profilul concret de implementare este ghidat de **OpenID4VC HAIP 1.0**, cu ISO mdoc drept format de credențial.

OpenID4VP este o extensie a OAuth 2.0 care permite Holderului (deținătorul mdoc) să prezinte un Credential (mdoc) prin intermediul Wallet-ului său (aplicația mdoc) unui Verifier (cititorul mdoc), la cerere. În acest context, Wallet-ul acționează ca server de autorizare OAuth 2.0, iar Verifier-ul acționează ca client OAuth 2.0.

## Pe scurt

**Ce este.** Portofelul de identitate digitală integrat în aplicația guvernamentală EVO. Cetățeanul păstrează versiunile digitale ale documentelor sale pe telefon și le prezintă, la cerere, unui verificator — o bancă, un ghișeu, un serviciu online — dezvăluind doar datele solicitate și doar cu consimțământ explicit. Un sistem care are nevoie să confirme identitatea unui utilizator sau anumite atribute devine verificator (relying party) în ecosistem, în urma unei cereri adresate AGE. Implementarea urmează standardele europene pentru portofelul de identitate digitală.

**Temei normativ.** HG nr. 5/2024 (aplicația guvernamentală integrată EVO), pct. 3 — desemnarea posesorului și deținătorului; HG nr. 677/2025 (consolidarea accesului în cadrul Portalului guvernamental integrat EVO). Temeiul specific al portofelului de identitate digitală — DE CONFIRMAT — HG nr. 5/2024, pct. 3.

Acte conexe: Legea nr. 91/2014; cadrul european privind identitatea digitală (eIDAS 2 / EUDI Wallet); standardele OpenID4VP 1.0 și ISO/IEC 18013-5 utilizate în implementare.

**Cine răspunde.**

| Rol | Entitate |
|---|---|
| Posesor | AGE (pentru EVO, conform HG nr. 5/2024) |
| Deținător | AGE |
| Operator tehnico-tehnologic | STISC |

**Roluri în integrare.**

- AGE — posesor/deținător al platformei; încheie acordul de integrare și înregistrează sistemul integrat.
- STISC — emite certificatul de sistem necesar conectării în staging și producție; operează infrastructura de găzduire.
- Posesorul sistemului integrat — decide scopul și temeiul legal al utilizării, drepturile de acces și răspunde de conformitate.
- Echipa de dezvoltare/integrare — implementează și testează integrarea tehnică.
- Utilizatorul final — persoana fizică sau unitatea de drept care beneficiază de serviciu.

**Condiții de acces.**

Gratuit. Calitatea de verificator se obține în baza cererii depuse la AGE, prin formularul dedicat, urmată de înregistrarea în ecosistem.

**Cui se adresează acest ghid.**

Principal: echipele de dezvoltare și integrare ale posesorilor de sisteme informaționale, publice și private.
Secundar: managerii de proiect și responsabilii de conformitate care pregătesc acordul cu AGE și certificatul STISC.

<p align="center">
  <a href="https://forms.office.com/pages/responsepage.aspx?id=Z4f8jWsRaEKDxfvIWTRtONCmd0F9yDZKhSOtD6Jvt2xUMTVKOEE2NlRKNkQ0SlJZRkNQWDVISzE3UiQlQCN0PWcu&route=shorturl" target="_blank" style="display:inline-block; background-color:#1a6df0; color:#ffffff; font-size:16px; font-weight:600; padding:14px 28px; border-radius:8px; text-decoration:none; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    Deveniți verificator în ecosistemul EVO Wallet&nbsp;&nbsp;↗
  </a>
</p>

## Relying parties în producție
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
    <span>Relying parties care au finalizat înregistrarea și acceptă prezentări EVO Wallet în producție.</span>
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

## Pornire rapidă

<div class="quick-links-wrapper">
  <div class="quick-links-container">
    <a href="integration/" class="quick-link-card">
      <div class="quick-link-icon">🔌</div>
      <h3 class="quick-link-title">Integrare</h3>
      <p class="quick-link-description">Cum se integrează cu EVO Wallet</p>
    </a>
    <a href="protocol/" class="quick-link-card">
      <div class="quick-link-icon">🔐</div>
      <h3 class="quick-link-title">Protocol</h3>
      <p class="quick-link-description">Fluxul OpenID4VP</p>
    </a>
    <a href="examples/" class="quick-link-card">
      <div class="quick-link-icon">🧾</div>
      <h3 class="quick-link-title">Exemple</h3>
      <p class="quick-link-description">Mostre complete de payload cerere/răspuns</p>
    </a>
    <a href="demoverifierbnm/" class="quick-link-card">
      <div class="quick-link-icon">🏦</div>
      <h3 class="quick-link-title">Verificator demo</h3>
      <p class="quick-link-description">Furnizat de Banca Națională a Moldovei</p>
    </a>
  </div>
</div>


## Standarde de referință

| Standard | Descriere |
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

