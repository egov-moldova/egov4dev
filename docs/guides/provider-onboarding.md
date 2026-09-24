# Înrolarea furnizorilor (Provider onboarding)

Această pagină se adresează unei organizații care furnizează o **soluție de semnare sau autentificare** — un prestator calificat de servicii de încredere (QTSP) — și dorește ca aceasta să fie oferită ca opțiune în cadrul MSign și/sau MPass.

Acest proces este diferit de conectarea unui sistem informațional în calitate de consumator al platformelor. Pentru acest din urmă caz, vedeți [Procedura de conectare](../platforms/procedure.md).

## Cum funcționează modelul de integrator

MSign și MPass sunt **servicii de tip integrator**. Acestea nu înlocuiesc soluția QTSP-ului — ele direcționează cetățeanul către aceasta și consumă o interfață bine definită, expusă de QTSP:

- QTSP-ul își păstrează propriii utilizatori, dispozitive, certificate și experiență de utilizare.
- MSign / MPass gestionează partea de e-serviciu: cererea care inițiază operațiunea, stocarea rezultatului și — pentru MPass — sesiunea SAML emisă către e-serviciu.
- E-serviciul nu comunică niciodată direct cu QTSP-ul; acesta comunică doar cu MSign / MPass.

Un QTSP poate integra **unul sau ambele** servicii. Cele două trasee tehnice de mai jos sunt independente din punct de vedere al înrolării tehnice, în cadrul unui singur acord juridic.


## Treceți direct la subiect

<style>
.quick-link-description { font-size: 0.72rem !important; }
.quick-link-card { cursor: default; }
.quick-link-card:hover { background: #f6f6f6 !important; }
.quick-link-btn {
  display: inline-block;
  margin-top: 0.5rem;
  padding: 8px 16px;
  background: #0058D2;
  color: #ffffff !important;
  border-radius: 10px;
  font-size: 0.7rem;
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
      <h3 class="quick-link-title">MSign — furnizor de semnătură</h3>
      <ol class="quick-link-description">
        <li>MSign trimite un hash al documentului sau un PDF.</li>
        <li>QTSP-ul autentifică semnatarul, semnează și returnează o semnătură XAdES‑T detașată (pentru un hash) sau o semnătură PAdES‑T încorporată (pentru un PDF), plus certificatul semnatarului.</li>
        <li>Semnături calificate și avansate; sincrone sau asincrone.</li>
        <li>Sunt expuse două API-uri — semnare și verificarea semnăturii.</li>
      </ol>
      <a href="../msign/provider-integration-spec/" class="quick-link-btn">Vezi specificația</a>
    </div>
    <div class="quick-link-card">
      <div class="quick-link-icon">🔐</div>
      <h3 class="quick-link-title">MPass — furnizor de autentificare</h3>
      <ol class="quick-link-description">
        <li>MPass trimite o provocare (challenge) de unică folosință.</li>
        <li>QTSP-ul autentifică persoana și returnează identitatea acesteia (certificat calificat), plus o semnătură aplicată asupra provocării.</li>
        <li>Sesiunea SAML rămâne la MPass.</li>
        <li>Este expus un singur API — autentificare.</li>
      </ol>
      <a href="../mpass/provider-integration-spec/" class="quick-link-btn">Vezi specificația</a>
    </div>
  </div>
</div>

## Condiții prealabile

Înainte de începerea înrolării, QTSP-ul trebuie să:

- Dețină **statutul de prestator calificat de servicii de încredere**, acordat de organismul de supraveghere (Serviciul de Informații și Securitate) în temeiul legii. Autoritatea de certificare a QTSP-ului trebuie să figureze pe lista națională de încredere; furnizorii din UE sunt recunoscuți prin lista de încredere a statului lor membru.
- Studieze specificația de integrare și scenariile de interacțiune pentru serviciul (serviciile) pe care dorește să-l (le) integreze — [MSign](msign/provider-integration-spec.md) și/sau [MPass](mpass/provider-integration-spec.md).
- Semneze **acordul de confidențialitate (NDA)** furnizat de eGov. Acesta este obligatoriu înainte de acordarea accesului la orice resursă de integrare.
- Aibă un **contract** încheiat cu deținătorul serviciilor MSign / MPass (acordul de integrare de la Pasul 2).

## Procesul de înrolare

Parcurgeți pașii de mai jos **în ordine**. Tot ceea ce ține de **Pasul 1** și **Pasul 2** revine QTSP-ului și poate fi realizat în paralel — însă Agenția de Guvernare Electronică (eGov) începe integrarea tehnică doar după finalizarea Pasului 2.

### Pasul 1 — Pregătire și depunere (QTSP)

- **Depuneți cererea** prin formularul online de pe site-ul eGov și semnați NDA-ul.
- **Desemnați persoanele de contact:** responsabilii tehnici și operaționali din partea QTSP-ului.
- **Confirmați că autoritatea dumneavoastră de certificare (CA)** figurează pe lista națională de încredere (a se vedea Condiții prealabile). Confirmați acest lucru cu echipa de integrare eGov înainte de a începe dezvoltarea.
- **Construiți și expuneți API-ul (API-urile):** MSign — API-ul de **semnare** și API-ul de **verificare a semnăturii**; MPass — API-ul de **autentificare**.
- **Depuneți pachetul tehnic:** descrierea serviciului (WSDL sau OpenAPI) și adresele URL ale endpoint-urilor, precum și token-ul API pe care serviciul dumneavoastră îl acceptă din partea eGov (eGov vă emite, la rândul său, un token pentru callback-ul dumneavoastră). Documentați — conform specificației [MSign](msign/provider-integration-spec.md) / [MPass](mpass/provider-integration-spec.md) — fluxul de inițiere, mecanismul de autentificare a semnatarului / utilizatorului, tratarea documentului sau a hash-ului (MSign) ori a provocării (challenge) (MPass), confirmarea și refuzul, returnarea rezultatului, mecanismul de status / callback pentru fluxurile asincrone, anularea și expirarea, formatul semnăturii generate și certificatul și autoritatea de certificare utilizate (MSign) sau atributele returnate către MPass, precum și codurile și mesajele specifice de eroare.
- **Depuneți pachetul de branding:** logo (dimensiuni și format necesare) și textele afișate cetățeanului.
- **Conveniți SLA-ul** cu eGov, care acoperă: canalul de raportare a incidentelor și punctele de contact; clasificarea severității incidentelor; termenele de confirmare, răspuns și restabilire; procedura de escaladare; notificarea lucrărilor planificate și a indisponibilității; comunicarea incidentelor de securitate; și disponibilitatea angajată a serviciului.

### Pasul 2 — Acord și plată (ambele părți)

- **Acordul de integrare** este semnat de ambele părți.
- **Taxa de integrare** este facturată și **achitată**.

!!! warning "Integrarea tehnică începe doar după Pasul 2"
    eGov începe lucrul la integrarea dumneavoastră **doar după** semnarea acordului și achitarea facturii de integrare. Pașii 3–5 nu încep înainte de acest moment.

### Pasul 3 — Planificare și integrare tehnică (eGov)

După finalizarea acordului și a plății, echipa eGov **planifică** lucrarea în funcție de capacitatea sa curentă. eGov confirmă **momentul la care poate începe** și un **termen estimat de livrare**; lucrul nu începe neapărat imediat după achitarea facturii.

Aceasta este o coadă de așteptare, nu o depriorizare — echipa platformei gestionează un backlog partajat pentru numeroase integrări, iar fiecare este preluată pe rând. Data confirmată de începere și estimarea permit planificarea corespunzătoare din partea dumneavoastră.

Ulterior, eGov analizează pachetul tehnic (și solicită clarificări, dacă este necesar), configurează QTSP-ul în **mediul de testare (staging) MSign / MPass** și verifică conectivitatea.

!!! note "Termen"
    Odată ce eGov deține toate informațiile tehnice și sunt îndeplinite condițiile prealabile, integrarea durează în mod obișnuit **30–40 de zile lucrătoare**. Această perioadă nu include timpul de așteptare a informațiilor sau modificărilor din partea QTSP-ului, ori timpul necesar remedierii neconformităților identificate în timpul testării.

### Pasul 4 — Testare și acceptanță tehnică

- **Testare funcțională** — operațiunile se comportă conform specificațiilor, de la un capăt la altul.
- **Testare nefuncțională** — performanță și securitate.
- **Scenarii specifice serviciului** — anulare, expirare, refuz, autentificare eșuată, tratarea erorilor.
- QTSP-ul remediază neconformitățile și confirmă pregătirea pentru retestare; QTSP-ul livrează **rapoartele de testare**. eGov documentează rezultatele și confirmă **acceptanța tehnică**.

### Pasul 5 — Pregătirea producției și lansarea

- QTSP-ul depune endpoint-urile / configurația de **producție** și orice certificate sau chei, și confirmă persoanele de contact pentru suport, incidente și escaladare.
- eGov verifică configurația de producție, confirmă acceptanța tehnică și îndeplinirea condițiilor contractuale, apoi configurează și activează QTSP-ul în producție.
- Se efectuează un **test controlat în producție** împreună cu QTSP-ul, înainte ca integrarea să fie declarată funcțională (live).
