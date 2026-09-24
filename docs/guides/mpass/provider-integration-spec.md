# Specificația de integrare a furnizorului de autentificare

!!! note "Public țintă"
    Această pagină se adresează unui **furnizor de autentificare** (o metodă sau soluție de identificare electronică) care se integrează *în* MPass. Este separată de restul ghidului MPass, care acoperă integrarea sistemelor informaționale *cu* MPass, în calitate de consumatori.

## 1. Scop

MPass este serviciul guvernamental de autentificare și control al accesului din Republica Moldova. Acesta permite utilizatorilor să se autentifice în serviciile publice electronice cu un singur cont (single sign-on) și emite fiecărui serviciu electronic o assertion semnată a identității utilizatorului.

MPass oferă serviciilor publice electronice un punct unic de autentificare și integrează diversele metode și soluții de identificare electronică oferite de furnizori.

Într-o integrare cu MPass, furnizorul de autentificare (denumit în continuare „**Furnizorul**”) funcționează astfel: MPass îi transmite o provocare (challenge) unică, Furnizorul autentifică utilizatorul — de exemplu, solicitându-i să confirme în aplicația Furnizorului și să semneze provocarea cu cheia sa calificată — și returnează identitatea utilizatorului împreună cu dovada. MPass mapează apoi această identitate la contul utilizatorului și emite sesiunea SAML către serviciul electronic solicitant. Schimbul SAML cu serviciul electronic este în întregime responsabilitatea MPass — Furnizorul doar autentifică persoana.

Acest document acoperă exclusiv interfața tehnică de integrare pentru autentificarea unei persoane fizice. Obligațiile legale ale Furnizorului ([secțiunea 8](#8-obligatiile-legale-care-raman-in-sarcina-furnizorului)) rămân neschimbate și nu sunt limitate de acest document.

## 2. Ce face Furnizorul

Pentru fiecare autentificare, MPass transmite o provocare și, opțional, identificatorul utilizatorului; Furnizorul autentifică utilizatorul și returnează:

| Ce returnează Furnizorul | Scop |
|---------------------------|---------|
| **certificatul calificat al utilizatorului** | MPass citește numărul de identificare de stat (IDNP) din certificat pentru a identifica utilizatorul. |
| **o semnătură aplicată asupra provocării** | Dovadă că utilizatorul a fost prezent și controlează cheia sa, legată de această autentificare specifică (anti-replay); MPass o păstrează drept probă. |
| **un status** | Succesul sau eșecul autentificării. |

## 3. Cerințe privind identitatea și certificatul (obligatorii pentru integrare)

Aceste cerințe sunt stabilite de MPass. Recunoașterea și structura certificatului derivă din [Legea nr. 124/2022](https://www.legis.md/cautare/getResults?doc_id=151294&lang=ro) și din reglementările tehnice aprobate de organul de supraveghere (Serviciul de Informații și Securitate al Republicii Moldova).

1. Utilizatorul este autentificat pe baza unui **certificat calificat pentru semnătură electronică** (art. 25 din Legea nr. 124/2022). Nivelul de asigurare a mijlocului de identificare electronică — scăzut, substanțial sau ridicat (art. 5¹ din Legea nr. 124/2022) — este stabilit la etapa de onboarding.
2. Atributul `serialNumber` din Subject Distinguished Name al certificatului conține **IDNP-ul utilizatorului** (13 cifre) — **nu numărul de serie al certificatului** — conform structurii certificatului calificat stabilite de organul de supraveghere (art. 13 alin. (4) din Legea nr. 124/2022) și semanticii ETSI EN 319 412-1 (de regulă, cu un prefix, de ex. `PNOMD-<IDNP>`). Aceasta este valoarea pe care MPass o utilizează pentru a identifica contul.
3. Semnătura este produsă **exact** asupra provocării transmise de MPass pentru această autentificare ([secțiunea 6](#6-autentificare-si-securitate)). Algoritmii de semnătură și de digest sunt agreați la etapa de onboarding (algoritmi în vigoare; algoritmii considerați nesiguri nu sunt acceptați).
4. **Recunoașterea CA.** Certificatul este emis sub o autoritate de certificare recunoscută: furnizorul de servicii de încredere emitent trebuie să figureze pe **lista națională de încredere** întreținută și publicată de organul de supraveghere (art. 8 și art. 35 alin. (2) lit. e) din Legea nr. 124/2022). Pentru furnizorii de servicii de încredere calificați stabiliți în statele membre UE, se aplică recunoașterea în temeiul art. 3 și art. 8 alin. (7)–(9).

!!! warning "Punctul 4 este condiția prealabilă esențială"
    MPass acordă încredere unei identități doar atunci când aceasta se bazează pe un certificat calificat recunoscut. Un certificat emis sub o CA care nu se află pe lista de încredere nu poate fi acceptat ca identitate, chiar dacă semnătura este valabilă din punct de vedere tehnic.

    La validare, MPass aplică de asemenea condițiile art. 29 din Legea nr. 124/2022 (certificat calificat, valabil la momentul autentificării, emis de un furnizor calificat). Confirmați CA-ul certificatului împreună cu echipa MPass înainte de a începe dezvoltarea.

## 4. Moduri de integrare

Furnizorul implementează modul care corespunde modului în care utilizatorul autorizează autentificarea:

- **Sincron** — pentru autentificare instantanee. MPass apelează operațiunea Authenticate a Furnizorului și primește identitatea + dovada direct în response.
- **Asincron** — atunci când utilizatorul trebuie să confirme pe telefon sau într-o aplicație. MPass apelează operațiunea Authenticate, Furnizorul acceptă cererea și, după ce utilizatorul a confirmat, notifică MPass printr-un callback scurt; MPass preia apoi rezultatul de la Furnizor.

Oricare dintre moduri poate fi implementat. Datele transmise sunt aceleași; diferă doar momentul transmiterii.

## 5. Contractul API

Furnizorul expune operațiunile de mai jos prin HTTPS; fiecare apel este autentificat conform descrierii din [secțiunea 6](#6-autentificare-si-securitate). Denumirile câmpurilor sunt orientative — un echivalent SOAP sau REST este acceptabil; schema exactă (WSDL/OpenAPI) se agreează la etapa de onboarding.

### 5.1 Authenticate — request (MPass → Furnizor)

| Câmp | Tip | Note |
|-------|------|-------|
| `requestId` | string | ID de corelare pentru această autentificare. Este returnat identic. |
| `challenge` | bytes | O valoare unică, generată de MPass pentru această autentificare. Semnătura utilizatorului trebuie aplicată exact asupra acestei valori. |
| `userId` | string, opțional | IDNP-ul utilizatorului, atunci când MPass îl cunoaște deja (de ex., utilizatorul l-a introdus). Când lipsește, Furnizorul determină utilizatorul din propria aplicație/dispozitiv și returnează identitatea acestuia. |
| `description` | string | Text scurt afișat utilizatorului (de ex., denumirea serviciului în care se autentifică). |
| `callbackUrl` | string | Doar în modul asincron — adresa la care Furnizorul transmite un POST atunci când autentificarea este finalizată. |
| `withNotification` | bool, opțional | Dacă se trimite sau nu o notificare push pe dispozitivul utilizatorului. |

### 5.2 Result (Furnizor → MPass)

Returnat direct (sincron) sau prin operațiunea de status (asincron):

| Câmp | Tip | Note |
|-------|------|-------|
| `status` | enum | `Pending`, `Success` sau `Failure`. |
| `failureReason` | string | Prezent la `Failure` — un motiv scurt, relevant pentru utilizator (a se vedea [secțiunea 7](#7-conventii-privind-statusul-si-erorile)). |
| `signerCertificate` | bytes | Certificatul calificat al utilizatorului (DER). MPass citește IDNP-ul din Subject-ul acestuia. |
| `subject` | string, opțional | Subject-ul certificatului (distinguished name), dacă preferați să îl transmiteți explicit. |
| `challengeSignature` | bytes | Semnătura utilizatorului aplicată asupra provocării din 5.1. |

### 5.3 Callback (doar în modul asincron)

Când autentificarea este finalizată, Furnizorul transmite un POST către `callbackUrl` cu un corp minimal, conținând doar `requestId`. Aceasta este exclusiv o notificare de tip wake-up — **certificatul, Subject-ul și semnătura nu sunt incluse în callback**. La primirea acesteia, MPass apelează operațiunea de status a Furnizorului pentru a prelua rezultatul.

### 5.4 Operațiunea de status/rezultat (doar în modul asincron)

MPass solicită rezultatul unei autentificări transmise anterior, pe baza `requestId`-ului acesteia. Se returnează structura din secțiunea 5.2. Atât timp cât utilizatorul nu a confirmat încă, se returnează `status = Pending`.

### 5.5 Selectarea dispozitivului (opțional)

Dacă un utilizator poate avea mai multe dispozitive sau identități și trebuie aleasă una dintre ele, Furnizorul indică acest lucru în răspunsul său, astfel încât MPass să poată prezenta opțiunea utilizatorului. Mecanismul se descrie la etapa de onboarding.

## 6. Autentificare și securitate

- **Autentificare.** Fiecare cerere este autentificată printr-un bearer token, prin HTTPS. MPass transmite un header `Authorization: Bearer <token>` la fiecare apel către serviciul Furnizorului, folosind un token (cheie API) emis de Furnizor pentru MPass. Callback-ul Furnizorului către MPass conține un header `Authorization: Bearer <token>`, folosind un token emis de MPass pentru Furnizor. Token-urile se schimbă la etapa de onboarding, pot fi rotite și nu sunt plasate niciodată în URL-uri.
- **Transport.** Tot traficul rulează prin HTTPS (TLS 1.2 sau superior). Endpoint-ul Furnizorului trebuie să prezinte un certificat de server valid.
- **Legarea provocării (anti-replay).** Semnătura utilizatorului trebuie aplicată exact asupra provocării transmise de MPass pentru această autentificare. O provocare veche nu este acceptată sau reutilizată; fiecare autentificare folosește o provocare nouă.
- **Legarea identității.** Când este furnizat `userId` (IDNP), utilizatorul autentificat trebuie să fie exact acea persoană — atributul `serialNumber` din Subject-ul certificatului trebuie să fie identic cu IDNP-ul furnizat. Dacă nu este identic, Furnizorul respinge cererea, în loc să returneze un succes.
- **Corelare.** Returnați întotdeauna `requestId` identic, astfel încât rezultatul să corespundă fără ambiguitate autentificării respective.
- **Fără date de identitate în callback-uri** — callback-urile conțin doar identificatorul și sunt autentificate conform descrierii de mai sus.

## 7. Convenții privind statusul și erorile

- Raportați `Success` doar atunci când utilizatorul a confirmat efectiv și a fost autentificat.
- În caz de eșec, returnați un `failureReason` concis, care poate fi afișat utilizatorului — de exemplu: utilizatorul a anulat, PIN greșit, niciun dispozitiv activ, dispozitiv blocat, certificat expirat, certificat revocat sau utilizator neînregistrat.
- O provocare expirată sau neconfirmată trebuie să rezulte în `Failure` (sau să rămână `Pending` până la expirare), niciodată în `Success`.

## 8. Obligațiile legale care rămân în sarcina Furnizorului

Acest document acoperă exclusiv interfața tehnică de integrare. Furnizorul rămâne supus obligațiilor prevăzute de cadrul normativ în vigoare, inclusiv:

- Un contract de integrare cu eGov, semnat înainte de trecerea în producție, în temeiul Regulamentului MPass.
- Evaluarea conformității mijlocului de identificare electronică față de criteriile, specificațiile tehnice și procedurile pentru nivelul de asigurare (scăzut/substanțial/ridicat), efectuată de un organism de evaluare a conformității (art. 5¹ alin. (3) din Legea nr. 124/2022); mijlocul și nivelul său de asigurare sunt publicate pe site-ul oficial al organului de supraveghere (art. 5¹ alin. (4)).
- Dacă Furnizorul emite el însuși certificatele calificate utilizate pentru autentificare: obligațiile unui furnizor de servicii de încredere calificat în temeiul Legii nr. 124/2022 — verificarea identității solicitantului (art. 10 alin. (2) pct. 4), revocarea în cel mult 3 ore lucrătoare (art. 16 alin. (3)), păstrarea evidențelor timp de 15 ani (art. 10 alin. (2) pct. 9), un audit de conformitate cel puțin o dată la doi ani (art. 10 alin. (2) pct. 10). Dacă certificatele sunt emise de un furnizor terț, aceste obligații revin furnizorului respectiv.
- Îndeplinirea obligațiilor de securitate cibernetică prevăzute de Legea nr. 48/2023 (art. 39 din Legea nr. 124/2022).
- Respectarea legislației privind protecția datelor cu caracter personal pe parcursul procesului de autentificare.
- Identificarea utilizatorului în cadrul sistemelor informaționale nu poate fi restricționată de datele sale de identitate (art. 5 din Legea nr. 124/2022).

## 9. Ce ne trebuie de la Furnizor pentru a începe

1. URL-ul (URL-urile) endpoint-ului API și descrierea serviciului (WSDL sau OpenAPI).
2. Token-ul (cheia API) pe care serviciul Furnizorului îl va accepta de la MPass; în schimb, MPass va emite un token pentru a autentifica callback-ul Furnizorului.
3. Confirmarea scrisă a CA-ului din spatele autentificării și faptul că acesta figurează pe lista națională de încredere (secțiunea 3, punctul 4); pentru furnizorii din UE — referința la lista de încredere a statului membru.
4. Nivelul de asigurare țintă (scăzut/substanțial/ridicat) și, după caz, raportul de evaluare a conformității.
5. Un mediu de testare și o identitate de utilizator de test pentru validarea end-to-end.

## 10. Listă de verificare pentru acceptare

1. API-ul Authenticate este expus prin HTTPS și autentificat printr-un bearer token (secțiunea 6), în mod sincron sau asincron.
2. Returnează certificatul calificat al utilizatorului (IDNP-ul în atributul `serialNumber` al Subject-ului) și o semnătură aplicată asupra provocării.
3. `requestId` este returnat identic; semnătura este legată exact de provocarea care a fost transmisă (protecția anti-replay este aplicată).
4. `userId` (IDNP) este respectat atunci când este furnizat — utilizatorul autentificat corespunde.
5. Modul asincron (dacă este utilizat): callback de tip wake-up + preluarea rezultatului prin operațiunea de status; fără date de identitate în callback.
6. CA-ul certificatului este confirmat ca fiind recunoscut (listă de încredere) — o autentificare de test se mapează corect la utilizatorul corespunzător, end-to-end.
7. Nivelul de asigurare țintă este agreat și consemnat în contractul de integrare.
8. Obligațiile din secțiunea 8 sunt confirmate.
