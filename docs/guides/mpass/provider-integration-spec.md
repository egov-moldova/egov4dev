# Specificație de integrare pentru furnizorii de autentificare

!!! note "Audiență"
    Această pagină se adresează unui **furnizor de autentificare** (metodă sau soluție de identificare electronică) care se integrează *în* MPass. Este distinctă de restul ghidului MPass, care descrie integrarea sistemelor informaționale *cu* MPass în calitate de consumatori.

## 1. Scopul

MPass este serviciul electronic guvernamental de autentificare și control al accesului al Republicii Moldova. Permite cetățenilor să se autentifice în serviciile publice electronice cu un singur cont (autentificare unică — single sign-on) și emite fiecărui serviciu electronic o aserțiune semnată privind identitatea cetățeanului.

MPass oferă serviciilor publice electronice un punct unic de autentificare și integrează diferite metode și soluții de identificare electronică oferite de furnizori.

În cadrul integrării cu MPass, furnizorul de autentificare (denumit în continuare **„Furnizorul”**) acționează astfel: MPass îi transmite o provocare unică (`challenge`), Furnizorul autentifică cetățeanul — de exemplu prin confirmarea în aplicația proprie și semnarea provocării cu cheia calificată a cetățeanului — și întoarce identitatea cetățeanului împreună cu dovada. MPass mapează apoi această identitate la contul cetățeanului și emite sesiunea SAML către serviciul electronic solicitant. Schimbul SAML cu serviciul electronic este integral responsabilitatea MPass — Furnizorul doar autentifică persoana.

Prezentul document acoperă exclusiv interfața tehnică de integrare pentru autentificarea persoanei fizice. Obligațiile legale ale Furnizorului ([secțiunea 8](#8-obligatii-legale-care-raman-in-sarcina-furnizorului)) rămân neschimbate și nu sunt limitate de prezentul document.

## 2. Ce face Furnizorul

Pentru fiecare autentificare, MPass transmite o provocare și, opțional, identificatorul cetățeanului; Furnizorul autentifică cetățeanul și întoarce:

| Ce întoarce Furnizorul | Rol |
|------------------------|-----|
| **certificatul calificat al cetățeanului** | MPass citește numărul de identificare personală (IDNP) din certificat pentru a identifica cetățeanul. |
| **o semnătură peste provocare** | Dovada că cetățeanul a fost prezent și controlează cheia sa, legată de această autentificare anume (anti-replay); MPass o păstrează ca probă. |
| **o stare** | Reușita sau eșecul autentificării. |

## 3. Cerințe privind identitatea și certificatul (obligatorii pentru integrare)

Aceste cerințe sunt stabilite de MPass. Recunoașterea certificatului și structura acestuia decurg din [Legea nr. 124/2022](https://www.legis.md/cautare/getResults?doc_id=151294&lang=ro) și din reglementările tehnice aprobate de organul de supraveghere (Serviciul de Informații și Securitate al Republicii Moldova).

1. Cetățeanul este autentificat pe baza unui **certificat calificat pentru semnătură electronică** (art. 25 din Legea nr. 124/2022). Nivelul de asigurare a încrederii al mijlocului de identificare electronică — scăzut, substanțial sau ridicat (art. 5¹ din Legea nr. 124/2022) — se stabilește la onboarding.
2. Atributul `serialNumber` din câmpul „subiect” (Subject Distinguished Name) al certificatului conține **IDNP-ul cetățeanului** (13 cifre) — **nu numărul de serie al certificatului** — conform structurii certificatului calificat stabilite de organul de supraveghere (art. 13 alin. (4) din Legea nr. 124/2022) și semanticii din ETSI EN 319 412-1 (de regulă cu prefix, de ex. `PNOMD-<IDNP>`). Aceasta este valoarea folosită de MPass pentru identificarea contului.
3. Semnătura se produce peste **exact** provocarea transmisă de MPass pentru această autentificare ([secțiunea 6](#6-autentificare-si-securitate)). Algoritmii de semnare și de digest se agreează la onboarding (algoritmi în vigoare; nu se acceptă algoritmi considerați nesiguri).
4. **Recunoașterea CA-ului.** Certificatul este emis sub o autoritate de certificare recunoscută: prestatorul de servicii de încredere emitent trebuie să figureze în **lista sigură** ținută și publicată de organul de supraveghere (art. 8 și art. 35 alin. (2) lit. e) din Legea nr. 124/2022). Pentru prestatorii de servicii de încredere calificați din statele membre ale Uniunii Europene se aplică recunoașterea prevăzută la art. 3 și la art. 8 alin. (7)–(9).

!!! warning "Punctul 4 este condiția prealabilă esențială"
    MPass acordă încredere identității numai dacă aceasta se bazează pe un certificat calificat recunoscut. Un certificat emis sub un CA care nu figurează în lista sigură nu poate fi acceptat ca identitate, chiar dacă semnătura este validă tehnic.

    La validare, MPass aplică și condițiile din art. 29 din Legea nr. 124/2022 (certificat calificat, valabil la momentul autentificării, emis de un prestator calificat). CA-ul certificatului se confirmă cu echipa MPass înainte de începerea dezvoltării.

## 4. Moduri de integrare

Furnizorul implementează modul care corespunde felului în care cetățeanul autorizează autentificarea:

- **Sincron** — pentru autentificare instantanee. MPass apelează operațiunea Authenticate a Furnizorului și primește identitatea + dovada direct în răspuns.
- **Asincron** — când cetățeanul trebuie să confirme pe telefon sau într-o aplicație. MPass apelează operațiunea Authenticate, Furnizorul acceptă cererea și, după ce cetățeanul a confirmat, notifică MPass printr-un callback scurt; MPass preia apoi rezultatul de la Furnizor.

Poate fi implementat oricare dintre moduri. Datele schimbate sunt aceleași; diferă doar momentul livrării.

## 5. Contractul API

Furnizorul expune operațiunile de mai jos peste HTTPS; fiecare apel este autentificat conform [secțiunii 6](#6-autentificare-si-securitate). Denumirile câmpurilor sunt orientative — un echivalent SOAP sau REST este acceptabil; schema exactă (WSDL / OpenAPI) se agreează în timpul onboarding-ului.

### 5.1 Authenticate — cerere (MPass → Furnizor)

| Câmp | Tip | Note |
|------|-----|------|
| `requestId` | string | Identificator de corelare pentru această autentificare. Se retransmite. |
| `challenge` | bytes | Valoare unică, generată de MPass pentru această autentificare. Semnătura cetățeanului trebuie să fie exact peste această valoare. |
| `userId` | string, opțional | IDNP-ul cetățeanului, când MPass îl cunoaște deja (de ex. l-a introdus cetățeanul). Când lipsește, Furnizorul determină cetățeanul din aplicația / dispozitivul propriu și îi întoarce identitatea. |
| `description` | string | Text scurt afișat cetățeanului (de ex. numele serviciului în care se autentifică). |
| `callbackUrl` | string | Doar în mod asincron — adresa la care Furnizorul face POST când autentificarea s-a finalizat. |
| `withNotification` | bool, opțional | Dacă se trimite o notificare push către dispozitivul cetățeanului. |

### 5.2 Rezultat (Furnizor → MPass)

Întors direct (sincron) sau prin operațiunea de stare (asincron):

| Câmp | Tip | Note |
|------|-----|------|
| `status` | enum | `Pending`, `Success` sau `Failure`. |
| `failureReason` | string | Prezent la `Failure` — un motiv scurt, pe înțelesul cetățeanului (vezi [secțiunea 7](#7-conventii-privind-starea-si-erorile)). |
| `signerCertificate` | bytes | Certificatul calificat al cetățeanului (DER). MPass citește IDNP-ul din câmpul „subiect”. |
| `subject` | string, opțional | Câmpul „subiect” al certificatului (distinguished name), dacă se preferă transmiterea explicită. |
| `challengeSignature` | bytes | Semnătura cetățeanului peste provocarea din 5.1. |

### 5.3 Callback (doar mod asincron)

Când autentificarea s-a finalizat, Furnizorul face POST la `callbackUrl` cu un corp minimal care conține doar `requestId`. Este doar o notificare de „trezire” — **certificatul, câmpul „subiect” și semnătura nu se includ în callback**. La primire, MPass apelează operațiunea de stare a Furnizorului pentru a prelua rezultatul.

### 5.4 Operațiunea de stare / rezultat (doar mod asincron)

MPass solicită rezultatul unei autentificări depuse anterior, după `requestId`. Se întoarce structura din secțiunea 5.2. Cât timp cetățeanul nu a confirmat, se întoarce `status = Pending`.

### 5.5 Selectarea dispozitivului (opțional)

Dacă un cetățean poate avea mai multe dispozitive sau identități și trebuie aleasă una, Furnizorul semnalează acest lucru în răspuns, astfel încât MPass să poată prezenta opțiunea cetățeanului. Mecanismul se descrie la onboarding.

## 6. Autentificare și securitate

- **Autentificare.** Fiecare cerere este autentificată cu un bearer token peste HTTPS. MPass trimite antetul `Authorization: Bearer <token>` la fiecare apel către serviciul Furnizorului, folosind un token (cheie API) emis de Furnizor pentru MPass. Callback-ul Furnizorului către MPass poartă antetul `Authorization: Bearer <token>` folosind un token emis de MPass pentru Furnizor. Tokenurile se schimbă în timpul onboarding-ului, pot fi rotite și nu se plasează niciodată în URL.
- **Transport.** Tot traficul se desfășoară peste HTTPS (TLS 1.2 sau superior). Endpoint-ul Furnizorului trebuie să prezinte un certificat de server valid.
- **Legarea de provocare (anti-replay).** Semnătura cetățeanului trebuie să fie peste exact provocarea transmisă de MPass pentru această autentificare. Nu se acceptă și nu se reutilizează o provocare veche; fiecare autentificare folosește una nouă.
- **Legarea de identitate.** Când se transmite `userId` (IDNP), cetățeanul autentificat trebuie să fie acea persoană — atributul `serialNumber` din câmpul „subiect” al certificatului trebuie să fie egal cu IDNP-ul transmis. Dacă nu corespunde, Furnizorul respinge cererea în loc să întoarcă un rezultat de succes.
- **Corelare.** Se retransmite întotdeauna `requestId`, astfel încât rezultatul să se mapeze neambiguu la autentificare.
- **Fără material de identitate în callback-uri** — callback-urile poartă doar identificatorul și sunt autentificate ca mai sus.

## 7. Convenții privind starea și erorile

- `Success` se raportează doar când cetățeanul a confirmat efectiv și a fost autentificat.
- La eșec, se întoarce un `failureReason` concis, care poate fi arătat cetățeanului — de exemplu: utilizatorul a anulat, PIN greșit, niciun dispozitiv activ, dispozitiv blocat, certificat expirat, certificat revocat sau utilizator neînregistrat.
- O provocare expirată sau neconfirmată trebuie să conducă la `Failure` (sau să rămână `Pending` până expiră), niciodată la `Success`.

## 8. Obligații legale care rămân în sarcina Furnizorului

Prezentul document acoperă doar interfața tehnică de integrare. Furnizorul rămâne supus obligațiilor din cadrul normativ în vigoare, printre care:

- Contract de integrare cu Agenția de Guvernare Electronică, încheiat înainte de punerea în producție, conform Regulamentului privind serviciul MPass.
- Evaluarea conformității mijlocului de identificare electronică cu criteriile, specificațiile tehnice și procedurile pentru nivelul de asigurare a încrederii (scăzut / substanțial / ridicat), realizată de un organism de evaluare a conformității (art. 5¹ alin. (3) din Legea nr. 124/2022); mijlocul și nivelul corespunzător se publică pe pagina web oficială a organului de supraveghere (art. 5¹ alin. (4)).
- Dacă Furnizorul emite el însuși certificatele calificate folosite la autentificare: obligațiile prestatorului de servicii de încredere calificat din Legea nr. 124/2022 — verificarea identității solicitantului (art. 10 alin. (2) pct. 4), revocarea în cel mult 3 ore de lucru (art. 16 alin. (3)), păstrarea înregistrărilor 15 ani (art. 10 alin. (2) pct. 9), audit de conformitate cel puțin o dată la doi ani (art. 10 alin. (2) pct. 10). Dacă certificatele sunt emise de un prestator terț, aceste obligații revin acelui prestator.
- Îndeplinirea obligațiilor privind asigurarea securității cibernetice prevăzute de Legea nr. 48/2023 (art. 39 din Legea nr. 124/2022).
- Respectarea legislației privind protecția datelor cu caracter personal în procesul de autentificare.
- Identificarea cetățeanului în cadrul sistemelor informaționale nu poate fi limitată de datele de identitate ale acestuia (art. 5 din Legea nr. 124/2022).

## 9. Ce se solicită Furnizorului pentru a începe

1. URL-urile endpoint-urilor API și descrierea serviciului (WSDL sau OpenAPI).
2. Tokenul (cheia API) pe care serviciul Furnizorului îl va accepta de la MPass; în schimb, MPass va emite un token pentru autentificarea callback-ului Furnizorului.
3. Confirmarea scrisă a CA-ului din spatele autentificării și a faptului că acesta figurează în lista sigură națională (secțiunea 3, punctul 4); pentru prestatorii din UE — referința la lista sigură a statului membru.
4. Nivelul de asigurare a încrederii vizat (scăzut / substanțial / ridicat) și, dacă e cazul, raportul de evaluare a conformității.
5. Un mediu de test și o identitate de cetățean de test pentru validarea integrală (end-to-end).

## 10. Lista de verificare pentru acceptare

1. API-ul Authenticate expus peste HTTPS și autentificat cu bearer token (secțiunea 6), în mod sincron sau asincron.
2. Întoarce certificatul calificat al cetățeanului (IDNP în atributul `serialNumber` din câmpul „subiect”) și o semnătură peste provocare.
3. `requestId` retransmis; semnătura este legată de exact provocarea transmisă (anti-replay aplicat).
4. `userId` (IDNP) respectat când este transmis — cetățeanul autentificat corespunde.
5. Mod asincron (dacă se folosește): callback de notificare + preluarea rezultatului prin operațiunea de stare; fără material de identitate în callback.
6. CA-ul certificatului confirmat ca recunoscut (lista sigură) — o autentificare de test se mapează la cetățeanul corect, de la un capăt la altul.
7. Nivelul de asigurare a încrederii agreat și consemnat în contractul de integrare.
8. Obligațiile din secțiunea 8 confirmate.

## Anexă. Referințe normative

- Regulamentul privind serviciul electronic guvernamental de autentificare și control al accesului (MPass), aprobat prin Hotărârea Guvernului nr. 1090/2013.
- [Legea nr. 124/2022](https://www.legis.md/cautare/getResults?doc_id=151294&lang=ro) privind identificarea electronică și serviciile de încredere (transpune parțial Regulamentul (UE) nr. 910/2014) — modificată prin Legea nr. 227/2025 (în vigoare 30.12.2025).
- Legea nr. 48/2023 privind securitatea cibernetică.
- ETSI EN 319 412-1 — profiluri de certificate; semantica identificatorilor din câmpul „subiect”.
