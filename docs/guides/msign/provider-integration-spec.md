# Specificație de integrare pentru furnizorii de semnătură electronică

!!! note "Audiență"
    Această pagină se adresează unui **furnizor de semnătură electronică** (instrument de semnare) care se integrează *în* MSign. Este distinctă de restul ghidului MSign, care descrie integrarea sistemelor informaționale *cu* MSign în calitate de consumatori.

## 1. Scopul

MSign este serviciul electronic guvernamental integrat de semnătură electronică al Republicii Moldova, instituit prin [Hotărârea Guvernului nr. 405/2014](https://www.legis.md/cautare/getResults?doc_id=143127&lang=ro). Posesorul serviciului este Instituția publică „Agenția de Guvernare Electronică”, iar administratorul tehnic este Instituția publică „Serviciul Tehnologia Informației și Securitate Cibernetică”.

MSign este un serviciu integrator: nu emite certificate și nu creează el însuși semnături. El pune la dispoziția utilizatorilor mecanismul de a selecta un furnizor de semnătură electronică și de a aplica, respectiv verifica, semnătura electronică prin intermediul acestuia. În cadrul serviciului MSign pot fi utilizate atât mijloace ale semnăturii electronice calificate, cât și ale semnăturii electronice avansate.

În cadrul integrării cu MSign, furnizorul de semnătură electronică (denumit în continuare **„Furnizorul”**) acționează astfel: MSign îi transmite datele spre semnare, iar Furnizorul întoarce semnătura electronică finalizată împreună cu certificatul semnatarului. MSign stochează rezultatul ca atare și îl transmite serviciului electronic solicitant. Responsabilitatea pentru autenticitatea semnăturii electronice revine Furnizorului.

Prezentul document acoperă exclusiv interfața tehnică de integrare pentru semnătura electronică a persoanei fizice (semnatar, în sensul art. 2 din [Legea nr. 124/2022](https://www.legis.md/cautare/getResults?doc_id=151294&lang=ro)). Nu acoperă sigiliul electronic al persoanei juridice, care nu este încă implementat în Republica Moldova. Obligațiile legale ale Furnizorului ca prestator de servicii de încredere ([secțiunea 8](#8-obligatii-legale-care-raman-in-sarcina-furnizorului)) rămân neschimbate și nu sunt limitate de prezentul document.

## 2. Ce se semnează

Fiecare cerere de semnare conține unul sau mai multe documente, fiecare de unul dintre următoarele două tipuri:

| Tip | Ce transmite MSign | Ce întoarce Furnizorul |
|-----|--------------------|------------------------|
| **Hash** | Un hash al documentului — SHA-256 (32 de octeți) sau alt algoritm din familia SHA-2 / SHA-3 agreat la onboarding. **SHA-1 nu este acceptat.** Documentul rămâne la serviciul electronic; se semnează doar hash-ul. | O semnătură **XAdES detașată**, completă, de nivel **T**, peste acel hash, plus certificatul semnatarului. |
| **PDF** | Documentul PDF. | Același PDF, cu o semnătură **PAdES de nivel T** încorporată, plus certificatul semnatarului. |

O singură cerere poate conține mai multe documente; Furnizorul semnează fiecare document și întoarce câte o semnătură per document.

## 3. Cerințe privind formatul semnăturii (obligatorii pentru integrare)

Aceste cerințe sunt stabilite de MSign în temeiul reglementărilor tehnice și al standardelor aprobate de organul de supraveghere (Serviciul de Informații și Securitate al Republicii Moldova), conform art. 35 alin. (2) lit. f) și h) din Legea nr. 124/2022. Ele nu sunt prevăzute ca atare în textul legii, ci în cadrul normativ tehnic subordonat.

1. Hash → **XAdES detașat**, nivel de protecție „T” (baseline, cu marcă temporală), conform ETSI EN 319 132.
2. PDF → **PAdES nivel „T”**, încorporat în PDF-ul întors, conform ETSI EN 319 142.
3. Nivelul „T” presupune o marcă temporală electronică aplicată semnăturii. Pentru semnătura electronică calificată, aceasta trebuie să fie o **marcă temporală electronică calificată** (art. 31 din Legea nr. 124/2022).
4. **Tipul semnăturii și statutul Furnizorului:**
    - MSign acceptă atât semnături electronice calificate, cât și avansate, iar furnizorii pot fi prestatori de servicii de încredere calificați sau necalificați (Regulamentul privind serviciul MSign, pct. 2 și pct. 4; art. 6 alin. (1) din Legea nr. 124/2022).
    - Tipul semnăturii produse și nivelul Furnizorului se stabilesc la onboarding și se consemnează în contractul de integrare încheiat cu Agenția de Guvernare Electronică.
    - Dacă serviciul electronic solicitant are nevoie de o semnătură cu valoare juridică echivalentă semnăturii olografe (art. 21 alin. (2) din Legea nr. 124/2022), este necesară **semnătura electronică calificată** — bazată pe un certificat calificat pentru semnătură electronică (art. 24 și art. 25) și creată cu un dispozitiv calificat de creare a semnăturii (art. 27).
5. **Recunoașterea CA-ului de semnare.** Prestatorul de servicii de încredere care emite certificatul semnatarului trebuie să figureze în **lista sigură** ținută și publicată de organul de supraveghere (art. 8 și art. 35 alin. (2) lit. e) din Legea nr. 124/2022). Pentru prestatorii de servicii de încredere calificați din statele membre ale Uniunii Europene se aplică recunoașterea prevăzută la art. 3 și la art. 8 alin. (7)–(9). Pentru semnături avansate produse de un furnizor necalificat, se aplică condițiile de recunoaștere agreate în contractul de integrare.

!!! warning "Punctul 5 este condiția prealabilă esențială pentru semnăturile calificate"
    După semnare, MSign validează independent fiecare semnătură, prin verificarea față de lista sigură a prestatorilor de servicii de încredere calificați și față de condițiile de validare din art. 29 din Legea nr. 124/2022 (certificat calificat, valabil la momentul semnării, emis de un prestator calificat).

    O semnătură calificată produsă sub un CA care nu figurează în lista sigură va fi raportată ca **nevalidă** — chiar dacă a fost creată corect din punct de vedere tehnic — și, prin urmare, va fi inutilizabilă. CA-ul de semnare se confirmă cu echipa MSign înainte de începerea dezvoltării.

## 4. Moduri de integrare

Furnizorul implementează modul care corespunde felului în care cetățeanul autorizează semnătura:

- **Sincron** — pentru semnare instantanee / pe server. MSign apelează operațiunea Sign a Furnizorului și primește semnăturile finalizate direct în răspuns.
- **Asincron** — când cetățeanul trebuie să confirme pe telefon sau într-o aplicație. MSign apelează operațiunea Sign, Furnizorul acceptă cererea și, după ce cetățeanul a semnat, notifică MSign printr-un callback scurt; MSign preia apoi semnăturile finalizate de la Furnizor.

Poate fi implementat oricare dintre moduri. Datele schimbate sunt aceleași; diferă doar momentul livrării.

## 5. Contractul API

Furnizorul expune operațiunile de mai jos peste HTTPS; fiecare apel este autentificat conform [secțiunii 6](#6-autentificare-si-securitate). Denumirile câmpurilor sunt orientative — un echivalent SOAP sau REST este acceptabil; schema exactă (WSDL / OpenAPI) se agreează în timpul onboarding-ului.

### 5.1 Sign — cerere (MSign → Furnizor)

| Câmp | Tip | Note |
|------|-----|------|
| `requestId` | string | Identificator de corelare pentru întreaga cerere. Se retransmite. |
| `signerId` | string, opțional | Numărul de identificare personală al cetățeanului (IDNP). Când este prezent, semnătura trebuie produsă de exact această persoană (vezi [secțiunea 6](#6-autentificare-si-securitate)). |
| `description` | string | Text scurt, lizibil, care descrie ce se semnează (poate fi afișat cetățeanului). |
| `callbackUrl` | string | Doar în mod asincron — adresa la care Furnizorul face POST când semnarea s-a finalizat. |
| `items[]` | listă | Câte o intrare per document (mai jos). |

Fiecare intrare `items[]`:

| Câmp | Tip | Note |
|------|-----|------|
| `id` | string | Identificator de corelare per document. Se retransmite în rezultatul corespunzător. |
| `contentType` | enum | `Hash` sau `Pdf`. |
| `hash` | bytes | Prezent pentru Hash — digestul de semnat. |
| `document` | bytes | Prezent pentru Pdf — PDF-ul de semnat. |
| `fileName`, `fileMediaType` | string, opțional | Pentru afișare către cetățean. |

### 5.2 Rezultat (Furnizor → MSign)

Întors direct (sincron) sau prin operațiunea de stare (asincron):

| Câmp | Tip | Note |
|------|-----|------|
| `status` | enum | `Pending`, `Success` sau `Failure`. |
| `failureReason` | string | Prezent la `Failure` — un motiv scurt, pe înțelesul cetățeanului (vezi [secțiunea 7](#7-conventii-privind-starea-si-erorile)). |
| `signerCertificate` | bytes | Certificatul X.509 al semnatarului (DER). |
| `items[]` | listă | Câte o intrare per document (mai jos). |

Fiecare intrare `items[]` din rezultat:

| Câmp | Tip | Note |
|------|-----|------|
| `id` | string | Identificatorul de corelare al documentului, retransmis din cerere. |
| `signature` | bytes | Pentru Hash: semnătura XAdES-T detașată, finalizată. Pentru Pdf: PDF-ul întors, cu semnătura PAdES-T încorporată. |

### 5.3 Callback (doar mod asincron)

Când semnarea s-a finalizat, Furnizorul face POST la `callbackUrl` cu un corp minimal care conține doar `requestId` / identificatorul tranzacției. Este doar o notificare de „trezire” — **semnătura nu se include în callback**. La primire, MSign apelează operațiunea de stare a Furnizorului pentru a prelua semnăturile finalizate.

### 5.4 Operațiunea de stare / rezultat (doar mod asincron)

MSign solicită rezultatul unei semnări depuse anterior, după `requestId`. Se întoarce structura din secțiunea 5.2. Cât timp semnarea este în curs, se întoarce `status = Pending`.

## 6. Autentificare și securitate

- **Autentificare.** Fiecare cerere este autentificată cu un bearer token peste HTTPS. MSign trimite antetul `Authorization: Bearer <token>` la fiecare apel către serviciul Furnizorului, folosind un token (cheie API) emis de Furnizor pentru MSign. Callback-ul Furnizorului către MSign poartă antetul `Authorization: Bearer <token>` folosind un token emis de MSign pentru Furnizor. Tokenurile se schimbă în timpul onboarding-ului, pot fi rotite și nu se plasează niciodată în URL.
- **Transport.** Tot traficul se desfășoară peste HTTPS (TLS 1.2 sau superior). Endpoint-ul Furnizorului trebuie să prezinte un certificat de server valid. Schimbul informațional se realizează prin canale securizate, cu mecanisme de protecție criptografică a informației (Regulamentul privind serviciul MSign, pct. 14).
- **Legarea de semnatar.** Când se transmite `signerId` (IDNP), semnătura trebuie să aparțină exact acelei persoane. Identificatorul persoanei se regăsește în atributul `serialNumber` din câmpul „subiect” (Subject Distinguished Name) al certificatului — **nu în numărul de serie al certificatului** — conform structurii certificatului calificat stabilite de organul de supraveghere (art. 13 alin. (4) din Legea nr. 124/2022) și semanticii din ETSI EN 319 412-1 (de regulă cu prefix, de ex. `PNOMD-<IDNP>`). Formatul exact al câmpului se agreează la onboarding. Dacă identificatorul din certificat nu corespunde IDNP-ului transmis, Furnizorul respinge cererea în loc să întoarcă o semnătură.
- **Corelare.** Se retransmit întotdeauna `requestId` și fiecare `id` de item, astfel încât rezultatele să se mapeze neambiguu la documente.
- **Fără material de semnătură în callback-uri** — callback-urile poartă doar identificatorul și sunt autentificate ca mai sus.

## 7. Convenții privind starea și erorile

- `Success` se raportează doar când toate documentele din cerere au fost semnate.
- La eșec, se întoarce un `failureReason` concis, care poate fi arătat cetățeanului — de exemplu: utilizatorul a anulat, PIN greșit, niciun dispozitiv activ, certificat expirat, certificat revocat sau semnatarul nu corespunde persoanei așteptate.
- Dacă cetățeanul are mai multe dispozitive / identități de semnare și trebuie aleasă una, Furnizorul semnalează acest lucru, astfel încât MSign să poată prezenta opțiunea (opțional — mecanismul se descrie la onboarding).

## 8. Obligații legale care rămân în sarcina Furnizorului

Prezentul document acoperă doar interfața tehnică de integrare. Ca prestator de servicii de încredere integrat în MSign, Furnizorul rămâne supus obligațiilor din Legea nr. 124/2022 și din Regulamentul privind serviciul MSign, printre care:

- Contract de integrare cu Agenția de Guvernare Electronică, încheiat înainte de punerea în producție (Regulament pct. 5 subpct. 8 și pct. 9 subpct. 4); integrarea noilor furnizori se realizează „în modul stabilit de legislaţia în vigoare … dacă întrunesc exigenţele legale” (Regulament pct. 23).
- Verificarea identității solicitantului certificatului prin una dintre metodele prevăzute la art. 10 alin. (2) pct. 4 din Legea nr. 124/2022.
- Revocarea certificatului cheii publice și introducerea mențiunii în registru în cel mult 3 ore de lucru de la primirea informației care impune revocarea (art. 16 alin. (3)).
- Înregistrarea și menținerea accesibilă a informațiilor relevante timp de 15 ani, inclusiv după încetarea activității (art. 10 alin. (2) pct. 9); păstrarea certificatului cheii publice cel puțin 15 ani de la data revocării sau expirării (art. 15 alin. (2)).
- Organizarea, pe cont propriu, cel puțin o dată la doi ani, a unui audit al conformității prestării serviciilor de încredere calificate, efectuat de un organism de evaluare a conformității (art. 10 alin. (2) pct. 10).
- Îndeplinirea obligațiilor privind asigurarea securității cibernetice prevăzute de Legea nr. 48/2023 (art. 39 din Legea nr. 124/2022).
- Respectarea legislației privind protecția datelor cu caracter personal în procesul de prestare a serviciilor de încredere (art. 52; Regulamentul privind serviciul MSign, cap. IV).
- Doar prestatorii calificați: informarea organului de supraveghere cu privire la modificările survenite în prestarea serviciilor de încredere calificate și la intenția de a înceta această activitate (art. 10 alin. (2) pct. 2).

## 9. Ce se solicită Furnizorului pentru a începe

1. URL-urile endpoint-urilor API și descrierea serviciului (WSDL sau OpenAPI).
2. Tokenul (cheia API) pe care serviciul Furnizorului îl va accepta de la MSign; în schimb, MSign va emite un token pentru autentificarea callback-ului Furnizorului.
3. Confirmarea scrisă a tipului de semnătură produs (calificată sau avansată) și a statutului Furnizorului (prestator de servicii de încredere calificat sau necalificat).
4. Pentru semnături calificate: confirmarea scrisă a CA-ului de semnare și a faptului că acesta figurează în lista sigură națională (secțiunea 3, punctul 5); pentru prestatorii din UE — referința la lista sigură a statului membru.
5. Un mediu de test și o identitate de semnatar de test pentru validarea integrală (end-to-end).

## 10. Lista de verificare pentru acceptare

1. API-ul Sign expus peste HTTPS și autentificat cu bearer token (secțiunea 6), în mod sincron sau asincron.
2. Documentele Hash întoarse ca XAdES-T detașat; documentele PDF întoarse cu PAdES-T încorporat; certificatul semnatarului întors în ambele cazuri.
3. Nivelul „T” asigurat printr-o marcă temporală electronică (calificată, pentru semnături calificate).
4. `requestId` și fiecare `id` de item retransmise corect pentru cererile cu mai multe documente.
5. `signerId` (IDNP) respectat — identificatorul din certificatul semnatarului corespunde persoanei așteptate.
6. Mod asincron (dacă se folosește): callback de notificare + preluarea rezultatului prin operațiunea de stare; fără semnătură în callback.
7. Tipul semnăturii și statutul Furnizorului consemnate în contractul de integrare cu Agenția de Guvernare Electronică.
8. Pentru semnături calificate: CA-ul de semnare confirmat ca recunoscut (lista sigură) — o semnătură de test trece validarea MSign de la un capăt la altul.
9. Obligațiile din secțiunea 8 confirmate.

## Anexă. Referințe normative

- [Hotărârea Guvernului nr. 405/2014](https://www.legis.md/cautare/getResults?doc_id=143127&lang=ro) privind serviciul electronic guvernamental integrat de semnătură electronică (MSign), cu Regulamentul anexat — modificată prin HG nr. 291/2024 (în vigoare 08.06.2024).
- [Legea nr. 124/2022](https://www.legis.md/cautare/getResults?doc_id=151294&lang=ro) privind identificarea electronică și serviciile de încredere (transpune parțial Regulamentul (UE) nr. 910/2014) — modificată prin Legea nr. 227/2025 (în vigoare 30.12.2025).
- Legea nr. 48/2023 privind securitatea cibernetică.
- ETSI EN 319 132 — semnături electronice XAdES.
- ETSI EN 319 142 — semnături electronice PAdES.
- ETSI EN 319 412-1 — profiluri de certificate; semantica identificatorilor din câmpul „subiect”.
