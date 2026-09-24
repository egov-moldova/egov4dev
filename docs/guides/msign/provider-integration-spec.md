# Specificația de integrare pentru furnizorii de servicii de semnătură

!!! note "Public țintă"
    Această pagină se adresează unui **furnizor de servicii de semnătură electronică** (un instrument de semnare) care se integrează *în* MSign. Este separată de restul ghidului MSign, care acoperă integrarea sistemelor informaționale *cu* MSign, în calitate de consumatori.

## 1. Scop

MSign este serviciul guvernamental integrat de semnătură electronică al Republicii Moldova, instituit prin [Hotărârea Guvernului nr. 405/2014](https://www.legis.md/cautare/getResults?doc_id=143127&lang=ro). Posesorul serviciului este Instituția Publică „Agenția de Guvernare Electronică”; administratorul tehnic este Instituția Publică „Serviciul Tehnologia Informației și Securitate Cibernetică”.

MSign este un serviciu integrator: nu emite certificate și nu creează el însuși semnături. Acesta oferă utilizatorilor mecanismul de a selecta un furnizor de semnătură electronică și de a aplica și verifica semnături electronice prin intermediul acestuia. În cadrul MSign pot fi utilizate atât mijloace de semnătură electronică calificată, cât și avansată.

Într-o integrare cu MSign, furnizorul de semnătură electronică (denumit în continuare **„Furnizorul”**) funcționează astfel: MSign îi transmite datele de semnat, iar Furnizorul returnează semnătura electronică finalizată, împreună cu certificatul semnatarului. MSign stochează rezultatul ca atare și îl transmite e-serviciului solicitant. Responsabilitatea pentru autenticitatea semnăturii electronice revine Furnizorului.

Acest document acoperă doar interfața de integrare tehnică pentru semnătura electronică a persoanei fizice (semnatarul, în sensul art. 2 din [Legea nr. 124/2022](https://www.legis.md/cautare/getResults?doc_id=151294&lang=ro)). Nu acoperă sigiliul electronic al persoanei juridice, care nu este încă implementat în Republica Moldova. Obligațiile legale ale Furnizorului în calitate de prestator de servicii de încredere ([secțiunea 8](#8-obligatii-legale-care-raman-in-sarcina-furnizorului)) rămân neschimbate și nu sunt limitate de acest document.

## 2. Ce se semnează

Fiecare cerere de semnare conține unul sau mai multe documente, fiecare dintre următoarele două tipuri:

| Tip | Ce trimite MSign | Ce returnează Furnizorul |
|------|------------------|---------------------------|
| **Hash** | Un hash al documentului — SHA-256 (32 de byte-i) sau un alt algoritm din familia SHA-2 / SHA-3, agreat la etapa de onboarding. **SHA-1 nu este acceptat.** Documentul rămâne la e-serviciu; se semnează doar hash-ul. | O semnătură completă **XAdES detașată (detached)**, de nivel **T**, aplicată asupra acelui hash, plus certificatul semnatarului. |
| **PDF** | Documentul PDF. | Același PDF cu o semnătură **PAdES de nivel T** încorporată, plus certificatul semnatarului. |

O singură cerere poate conține mai multe documente; Furnizorul semnează fiecare document și returnează câte o semnătură pentru fiecare document.

## 3. Cerințe privind formatul semnăturii (obligatorii pentru integrare)

Aceste cerințe sunt stabilite de MSign pe baza reglementărilor tehnice și a standardelor aprobate de organul de supraveghere (Serviciul Informații și Securitate al Republicii Moldova), în temeiul art. 35 alin. (2) lit. f) și h) din Legea nr. 124/2022. Acestea nu sunt prevăzute în lege propriu-zisă, ci în cadrul tehnic subordonat.

1. Hash → **XAdES detașată**, nivel de protecție „T” (baseline, cu marcă temporală), conform ETSI EN 319 132.
2. PDF → **PAdES nivel „T”**, încorporat în PDF-ul returnat, conform ETSI EN 319 142.
3. Nivelul „T” necesită o marcă temporală electronică pe semnătură. Pentru o semnătură electronică calificată, aceasta trebuie să fie o **marcă temporală electronică calificată** (art. 31 din Legea nr. 124/2022).
4. **Tipul semnăturii și statutul Furnizorului:**
    - MSign acceptă atât semnături electronice calificate, cât și avansate, iar furnizorii pot fi prestatori de servicii de încredere calificați sau necalificați (Regulamentul MSign, pct. 2 și 4; art. 6 alin. (1) din Legea nr. 124/2022).
    - Tipul semnăturii produse și nivelul Furnizorului se stabilesc la etapa de onboarding și se consemnează în contractul de integrare semnat cu AGE.
    - Dacă e-serviciul solicitant necesită o semnătură cu aceeași valoare juridică ca o semnătură olografă (art. 21 alin. (2) din Legea nr. 124/2022), este necesară o **semnătură electronică calificată** — bazată pe un certificat calificat pentru semnătură electronică (art. 24 și 25) și creată cu un dispozitiv calificat de creare a semnăturii (art. 27).
5. **Recunoașterea AC-ului emitent.** Prestatorul de servicii de încredere care emite certificatul semnatarului trebuie să figureze pe **lista națională de încredere** administrată și publicată de organul de supraveghere (art. 8 și art. 35 alin. (2) lit. e) din Legea nr. 124/2022). Pentru prestatorii de servicii de încredere calificați stabiliți în statele membre ale UE, se aplică recunoașterea prevăzută la art. 3 și art. 8 alin. (7)–(9). Pentru semnăturile avansate produse de un furnizor necalificat, se aplică condițiile de recunoaștere convenite în contractul de integrare.

!!! warning "Punctul 5 este condiția esențială pentru semnăturile calificate"
    După semnare, MSign validează independent fiecare semnătură, verificând-o în raport cu lista națională de încredere a prestatorilor de servicii de încredere calificați și cu condițiile de validare de la art. 29 din Legea nr. 124/2022 (certificat calificat, valid la momentul semnării, emis de un prestator calificat).

    O semnătură calificată produsă în baza unui AC care nu se află pe lista de încredere va fi raportată ca **invalidă** — chiar dacă a fost creată corect — și, prin urmare, va fi inutilizabilă. Confirmați AC-ul emitent cu echipa MSign înainte de a începe dezvoltarea.

## 4. Moduri de integrare

Furnizorul implementează modul care corespunde modului în care utilizatorul autorizează semnătura:

- **Sincron** — pentru semnarea instantanee / pe server. MSign apelează operația de semnare (Sign) a Furnizorului și primește semnăturile finalizate direct în răspuns.
- **Asincron** — atunci când utilizatorul trebuie să confirme pe telefon sau într-o aplicație. MSign apelează operația de semnare, Furnizorul acceptă cererea și, după ce utilizatorul a semnat, notifică MSign printr-un callback scurt; MSign preia apoi semnăturile finalizate de la Furnizor.

Oricare dintre moduri poate fi implementat. Datele schimbate sunt aceleași; diferă doar sincronizarea în timp.

## 5. Contractul API

Furnizorul expune operațiile de mai jos prin HTTPS; fiecare apel este autentificat conform descrierii din [secțiunea 6](#6-autentificare-si-securitate). Denumirile câmpurilor sunt orientative — un echivalent SOAP sau REST este acceptabil; schema exactă (WSDL / OpenAPI) se convine la etapa de onboarding.

### 5.1 Sign — cerere (MSign → Furnizor)

| Câmp | Tip | Note |
|-------|------|-------|
| `requestId` | string | ID-ul de corelare pentru întreaga cerere. Se returnează identic (echoed back). |
| `signerId` | string, opțional | Numărul de identificare de stat al persoanei (IDNP) a utilizatorului. Dacă este prezent, semnătura trebuie să fie produsă exact de acea persoană (vezi [secțiunea 6](#6-autentificare-si-securitate)). |
| `description` | string | Text scurt, lizibil pentru om, care descrie ce se semnează (poate fi afișat utilizatorului). |
| `callbackUrl` | string | Doar în modul asincron — adresa la care Furnizorul trimite un POST atunci când semnarea se finalizează. |
| `items[]` | listă | O intrare per document (mai jos). |

Fiecare intrare din `items[]`:

| Câmp | Tip | Note |
|-------|------|-------|
| `id` | string | ID-ul de corelare per document. Se returnează identic în rezultatul corespunzător. |
| `contentType` | enum | `Hash` sau `Pdf`. |
| `hash` | bytes | Prezent pentru Hash — sinteza (digest) de semnat. |
| `document` | bytes | Prezent pentru Pdf — PDF-ul de semnat. |
| `fileName`, `fileMediaType` | string, opțional | Pentru afișare către utilizator. |

### 5.2 Rezultat (Furnizor → MSign)

Returnat direct (în modul sincron) sau prin operația de status (în modul asincron):

| Câmp | Tip | Note |
|-------|------|-------|
| `status` | enum | `Pending`, `Success` sau `Failure`. |
| `failureReason` | string | Prezent la `Failure` — un motiv scurt, inteligibil pentru utilizator (vezi [secțiunea 7](#7-conventii-privind-statusul-si-erorile)). |
| `signerCertificate` | bytes | Certificatul X.509 al semnatarului (DER). |
| `items[]` | listă | O intrare per document (mai jos). |

Fiecare intrare de rezultat din `items[]`:

| Câmp | Tip | Note |
|-------|------|-------|
| `id` | string | ID-ul de corelare al documentului, returnat identic din cerere. |
| `signature` | bytes | Pentru Hash: semnătura XAdES-T detașată finalizată. Pentru Pdf: PDF-ul returnat cu semnătura PAdES-T încorporată. |

### 5.3 Callback (doar în modul asincron)

Când semnarea se finalizează, Furnizorul trimite un POST către `callbackUrl` cu un corp minimal, care conține doar `requestId` / ID-ul tranzacției. Aceasta este doar o notificare de trezire (wake-up) — **semnătura nu este inclusă în callback**. La primirea acestuia, MSign apelează operația de status a Furnizorului pentru a prelua semnăturile finalizate.

### 5.4 Operația de status / rezultat (doar în modul asincron)

MSign solicită rezultatul unei semnări trimise anterior, folosind `requestId`-ul acesteia. Returnați structura de la secțiunea 5.2. Cât timp semnarea este încă în curs, returnați `status = Pending`.

## 6. Autentificare și securitate

- **Autentificare.** Fiecare cerere este autentificată printr-un token de tip bearer, prin HTTPS. MSign trimite un antet `Authorization: Bearer <token>` la fiecare apel către serviciul Furnizorului, utilizând un token (cheie API) emis de Furnizor pentru MSign. Callback-ul Furnizorului către MSign poartă un antet `Authorization: Bearer <token>`, utilizând un token emis de MSign pentru Furnizor. Token-urile se schimbă la etapa de onboarding, pot fi rotite și nu sunt niciodată plasate în URL-uri.
- **Transport.** Tot traficul se desfășoară prin HTTPS (TLS 1.2 sau mai recent). Endpoint-ul Furnizorului trebuie să prezinte un certificat de server valid. Schimbul are loc prin canale securizate, cu protecție criptografică a informației (Regulamentul MSign, pct. 14).
- **Asocierea semnatarului.** Când este furnizat `signerId` (IDNP), semnătura trebuie să aparțină exact acelei persoane. Identificatorul persoanei este transmis în atributul `serialNumber` din Subject Distinguished Name al certificatului — **nu numărul de serie al certificatului** — conform structurii certificatului calificat stabilite de organul de supraveghere (art. 13 alin. (4) din Legea nr. 124/2022) și semanticii ETSI EN 319 412-1 (de regulă cu un prefix, de ex. `PNOMD-<IDNP>`). Formatul exact al câmpului se convine la etapa de onboarding. Dacă identificatorul din certificat nu corespunde IDNP-ului furnizat, Furnizorul respinge cererea în loc să returneze o semnătură.
- **Corelare.** Returnați întotdeauna identic `requestId` și `id`-ul fiecărui element, astfel încât rezultatele să corespundă fără ambiguitate documentelor.
- **Fără material de semnătură în callback-uri** — callback-urile conțin doar identificatorul și sunt autentificate conform celor de mai sus.

## 7. Convenții privind statusul și erorile

- Raportați `Success` doar atunci când toate documentele din cerere au fost semnate.
- În caz de eșec, returnați un `failureReason` concis, care poate fi afișat utilizatorului — de exemplu: utilizatorul a anulat, PIN greșit, niciun dispozitiv activ, certificat expirat, certificat revocat sau semnatarul nu corespunde persoanei așteptate.
- Dacă utilizatorul are mai multe dispozitive/identități de semnare și trebuie aleasă una, Furnizorul indică acest lucru, astfel încât MSign să poată prezenta opțiunea de alegere (opțional — descrieți mecanismul la etapa de onboarding).

## 8. Obligații legale care rămân în sarcina Furnizorului

Acest document acoperă doar interfața de integrare tehnică. În calitate de prestator de servicii de încredere integrat în MSign, Furnizorul rămâne supus obligațiilor prevăzute de Legea nr. 124/2022 și de Regulamentul MSign, inclusiv:

- Un contract de integrare cu AGE, semnat înainte de trecerea în producție (Regulamentul MSign, pct. 5 subpct. 8) și pct. 9 subpct. 4)); noii furnizori sunt integrați „în modul stabilit de legislația în vigoare … dacă îndeplinesc cerințele legale” (Regulamentul MSign, pct. 23).
- Verificarea identității solicitantului de certificat prin una dintre metodele prevăzute la art. 10 alin. (2) pct. 4) din Legea nr. 124/2022.
- Revocarea certificatului cheii publice și înregistrarea acesteia în registru în cel mult 3 ore lucrătoare de la primirea informației care impune revocarea (art. 16 alin. (3)).
- Înregistrarea și păstrarea accesibilă a informațiilor relevante timp de 15 ani, inclusiv după încetarea activității (art. 10 alin. (2) pct. 9)); păstrarea certificatului cheii publice pentru cel puțin 15 ani de la revocare sau expirare (art. 15 alin. (2)).
- Organizarea, pe cont propriu, cel puțin o dată la doi ani, a unui audit de conformitate a serviciilor sale de încredere calificate, efectuat de un organism de evaluare a conformității (art. 10 alin. (2) pct. 10)).
- Îndeplinirea obligațiilor de securitate cibernetică prevăzute de Legea nr. 48/2023 (art. 39 din Legea nr. 124/2022).
- Respectarea legislației privind protecția datelor cu caracter personal în furnizarea serviciilor de încredere (art. 52; Regulamentul MSign, capitolul IV).
- Doar pentru prestatorii calificați: notificarea organului de supraveghere cu privire la modificările în prestarea serviciilor de încredere calificate și la orice intenție de a înceta această activitate (art. 10 alin. (2) pct. 2)).

## 9. Ce ne trebuie de la Furnizor pentru a începe

1. Adresa (adresele) URL a endpoint-ului API și descrierea serviciului (WSDL sau OpenAPI).
2. Token-ul (cheia API) pe care serviciul Furnizorului îl va accepta de la MSign; în schimb, MSign va emite un token pentru autentificarea callback-ului Furnizorului.
3. Confirmarea scrisă a tipului de semnătură produs (calificată sau avansată) și a statutului Furnizorului (prestator de servicii de încredere calificat sau necalificat).
4. Pentru semnăturile calificate: confirmarea scrisă a AC-ului emitent și a faptului că acesta figurează pe lista națională de încredere (secțiunea 3, punctul 5); pentru furnizorii din UE — referința la lista de încredere a statului membru.
5. Un mediu de testare și o identitate de semnatar de test pentru validarea end-to-end.

## 10. Lista de verificare pentru acceptare

1. API de semnare expus prin HTTPS și autentificat printr-un token de tip bearer (secțiunea 6), în mod sincron sau asincron.
2. Documentele de tip Hash returnate ca XAdES-T detașat; documentele PDF returnate cu PAdES-T încorporat; certificatul semnatarului returnat în ambele cazuri.
3. Nivelul „T” asigurat printr-o marcă temporală electronică (calificată, pentru semnăturile calificate).
4. `requestId` și `id`-ul fiecărui element returnate corect pentru cererile cu mai multe documente.
5. `signerId` (IDNP) respectat — identificatorul din certificatul semnatarului corespunde persoanei așteptate.
6. Modul asincron (dacă este utilizat): callback de trezire + preluarea rezultatului prin operația de status; fără semnătură în callback.
7. Tipul semnăturii și statutul Furnizorului consemnate în contractul de integrare cu AGE.
8. Pentru semnăturile calificate: AC-ul emitent confirmat ca recunoscut (lista de încredere) — o semnătură de test trece validarea MSign de la un capăt la altul (end to end).
9. Obligațiile de la secțiunea 8 confirmate.
