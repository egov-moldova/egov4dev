**Relying Party Tester** este un instrument self-service care verifică dacă implementarea unui Verifier (relying party al wallet-ului) se comportă corect atunci când primește atât o prezentare validă, cât și prezentări manipulate intenționat. Acesta elimină nevoia de a crea credențiale confecționate manual: tester-ul preia locul Wallet-ului, generează o prezentare mdoc corectă și numeroase prezentări mdoc defecte, le transmite Verifier-ului dumneavoastră și raportează ce a făcut Verifier-ul dumneavoastră cu fiecare dintre ele.

| Resursă | Descriere |
|:---------|:------------|
| 🧪 [**Relying Party Tester**](https://wallet.staging.egov.md/rp-tester) | Tester de conformitate automatizat pentru relying parties ale wallet-ului, disponibil în mediul de staging. |

> ⚠️ Tester-ul aparține mediului de staging și trebuie direcționat exclusiv către o instanță **staging** a Verifier-ului dumneavoastră. Mai multe cazuri de testare redau, malformează sau supradimensionează intenționat Authorization Response, astfel încât acestea nu trebuie niciodată trimise către un endpoint de producție.

## Ce face tester-ul

Pentru fiecare caz de testare, tester-ul îndeplinește partea de Wallet a tranzacției de prezentare descrise în secțiunea [Protocol](protocol.md):

1. Verifier Backend-ul dumneavoastră creează o tranzacție de prezentare și produce URL-ul de device engagement — exact același șir pe care l-ați codifica într-un cod QR sau l-ați publica drept link same-device.
2. Introduceți acel URL în tester și apăsați **Run test**.
3. Tester-ul analizează URL-ul, transmite **wallet_metadata** și **wallet_nonce** către **request_uri**-ul dumneavoastră, utilizând HTTP POST, și validează Authorization Request JWS returnat.
4. Acesta construiește o DeviceResponse pentru tipul de document solicitat, aplică manipularea specifică cazului de testare selectat (deloc pentru cazurile de tip *must accept*), criptează Authorization Response ca JWE și o transmite către **response_uri**-ul dumneavoastră.
5. Acesta înregistrează modul în care a răspuns Verifier-ul dumneavoastră și compară rezultatul cu așteptarea declarată de cazul de testare.

Fiecare caz de testare exercită astfel una sau mai multe reguli din secțiunea [Validarea răspunsului](validation.md), din perspectiva unui tester sau atacator. Tester-ul listează fiecare caz disponibil cu o scurtă descriere a manipulării aplicate și precizează dacă prezentarea trebuie acceptată sau respinsă. Suita este extinsă pe măsură ce profilul de implementare evoluează.

## Înainte de a începe

| Precondiție | Detalii |
| --- | --- |
| Onboarding pentru staging finalizat | Verifier înregistrat, CSR depus și certificat de verificator pentru staging primit, conform descrierii din secțiunea [Integrare](integration.md). |
| Verifier accesibil din internet | Tester-ul apelează **request_uri**-ul și **response_uri**-ul dumneavoastră de pe propria sa gazdă. Endpoint-urile publicate doar pe `localhost`, într-o rețea privată sau în spatele unui VPN nu pot fi testate. |
| TLS valid pe endpoint-urile dumneavoastră | Ambele endpoint-uri trebuie să fie servite prin HTTPS, cu un certificat de încredere publică. |
| Tranzacții noi la cerere | Trebuie să puteți produce o nouă tranzacție de prezentare (și, implicit, un nou URL de cerere) ori de câte ori un test are nevoie de una. |
| Ancore de încredere pentru staging instalate | Credențialele de test valide sunt semnate de CA-ul de emitere pentru staging. Dacă acest lanț lipsește din magazinul dumneavoastră de încredere, chiar și cazurile de testare de tip *must accept* eșuează. Solicitați ancorele de încredere pentru staging la `mconnect@egov.md`, dacă nu le-ați primit în timpul onboarding-ului. |
| Respingerea este observabilă | Endpoint-ul dumneavoastră **response_uri** trebuie să răspundă diferit pentru o prezentare acceptată față de una respinsă — altfel tester-ul nu poate distinge o respingere de o acceptare silențioasă. A se vedea [Interpretarea rezultatelor](#interpretarea-rezultatelor). |

## Furnizarea URL-urilor de cerere

Primul pas din **Test setup** stabilește modul în care sunt furnizate URL-urile de cerere. Introduceți link-ul complet de device engagement produs de Verifier-ul dumneavoastră — fie deep link-ul codificat în codul dumneavoastră QR (`eudi-openid4vp://?client_id=…&request_uri=…&request_uri_method=post`), fie link-ul HTTPS echivalent.

| Mod | Când se utilizează | Efect |
| --- | --- | --- |
| **Un URL reutilizabil pentru toate testele** | Verifier-ul dumneavoastră acceptă același **request_uri** de mai multe ori, de exemplu atunci când servește un cod QR static care creează dinamic o tranzacție la fiecare apel. | Un singur câmp URL este utilizat de fiecare test din setul selectat, iar întregul set poate fi executat nesupravegheat, într-o singură rulare. |
| **Un URL unic pentru fiecare test** | Verifier-ul dumneavoastră emite URL-uri de cerere strict de unică folosință, ceea ce reprezintă comportamentul recomandat. | Fiecare card de test primește propriul câmp URL, iar testele sunt executate unul câte unul. |

> 💡 URL-urile de cerere sunt în mod normal de unică folosință și cu durată scurtă de viață. În modul URL unic, creați tranzacția imediat înainte de a rula testul și utilizați **Start guided testing** pentru a fi ghidat prin setul selectat, caz cu caz.

## Alegerea setului de teste

Al doilea pas din **Test setup** selectează scopul rulării.

| Set | Conținut |
| --- | --- |
| **Core tests** | Cazurile esențiale pe care orice relying party trebuie să le treacă: prezentarea validă, plus manipulările care compromit autentificarea issuer-ului, autentificarea device-ului, valabilitatea credentialului, valabilitatea certificatului issuer-ului și revocarea. |
| **Online tests** | Cazuri în care Verifier-ul dumneavoastră trebuie să acceseze din nou gazda proprie a tester-ului pentru a prelua o listă de stare, un răspuns OCSP sau un CRL. Rulați-le doar atunci când Verifier-ul dumneavoastră are acces outbound către `wallet.staging.egov.md`. |
| **All tests** | Core, online și toate cazurile suplimentare/specializate. Aceasta este rularea de conformitate completă. |

## Rularea testelor

1. Deschideți [Relying Party Tester](https://wallet.staging.egov.md/rp-tester).
2. Alegeți modul în care vor fi furnizate URL-urile de cerere și ce set de teste va fi inclus.
3. Creați o tranzacție de prezentare în Verifier-ul dumneavoastră și copiați URL-ul său de cerere.
4. Introduceți URL-ul și apăsați **Run test** pentru un singur caz, **Run *N* tests** pentru a executa în secvență întregul set selectat (doar în modul URL reutilizabil), sau **Start guided testing** pentru a fi condus prin set, pas cu pas.
5. Urmăriți în paralel jurnalele Verifier-ului dumneavoastră — pentru un caz eșuat, propria dumneavoastră intrare de jurnal identifică de obicei mai rapid regula de validare lipsă decât rezumatul.

## Interpretarea rezultatelor

Rezultatele apar deasupra listei de teste și pot fi filtrate cu selectorul **Filter by result**.

| Rezultat | Semnificație | Ce trebuie făcut |
| --- | --- | --- |
| **Passed** | Verifier-ul dumneavoastră a reacționat conform cerințelor cazului: a acceptat prezentarea validă sau a refuzat-o pe cea manipulată. | Nimic. |
| **Failed** | Verifier-ul dumneavoastră a reacționat greșit. Un caz de tip *must reject* eșuat înseamnă că o prezentare manipulată a fost acceptată, ceea ce reprezintă un defect de securitate. | Localizați regula corespunzătoare în [Validarea răspunsului](validation.md) și implementați-o sau corectați-o. |
| **Tester error** | Schimbul nu a putut fi finalizat deloc — de exemplu URL-ul de cerere fusese deja consumat sau expirase, Authorization Request nu a putut fi recuperată sau semnătura sa nu a putut fi validată. | Cazul nu spune nimic despre logica dumneavoastră de validare. Remediați cauza, creați o tranzacție nouă și rulați-o din nou. |
| **Not run** | Cazul nu a fost executat în această sesiune. | — |

Deoarece o respingere trebuie să fie recognoscibilă din exterior, asigurați-vă că endpoint-ul dumneavoastră **response_uri** nu răspunde identic la fiecare transmitere. Secțiunea Protocol impune un `HTTP 200 OK` cu un **redirect_uri** opțional pentru o Authorization Response *procesată cu succes*; o prezentare care eșuează la validare nu trebuie să primească acest răspuns, nu trebuie să marcheze tranzacția ca reușită și elementele sale de date nu trebuie procesate.

## Criterii de ieșire

| Etapă | Cerință |
| --- | --- |
| Pragul minim | Toate **core tests** trec. |
| Conformitate completă | Fiecare caz din setul **All tests** trece, cu cazurile online executate față de un Verifier care poate accesa gazda tester-ului. |
| Raportare | După finalizarea rulării, trimiteți rezultatele la `mconnect@egov.md`, împreună cu identificatorul dumneavoastră de Verifier pentru staging. Instrucțiuni detaliate pentru mediul de producție sunt furnizate ulterior, conform descrierii din secțiunea [Integrare](integration.md). |

## Depanare

| Simptom | Cauză probabilă |
| --- | --- |
| Fiecare caz se încheie cu **Tester error** | URL-ul de cerere fusese deja consumat sau a expirat, **request_uri**-ul dumneavoastră nu este accesibil din internet, sau Authorization Request returnat nu este un JWS valid, conform descrierii din secțiunea [Protocol](protocol.md). |
| Cazul de tip *must accept* eșuează, în timp ce cazurile *must reject* trec | Verifier-ul dumneavoastră refuză și prezentarea validă. De obicei, ancora de încredere pentru staging lipsește din magazinul dumneavoastră de încredere, sau o regulă de validare este aplicată mai strict decât cere specificația. |
| Majoritatea cazurilor *must reject* eșuează | Endpoint-ul dumneavoastră **response_uri** răspunde cel mai probabil la fiecare transmitere cu același răspuns de succes, astfel încât tester-ul interpretează o respingere ca fiind o acceptare, sau DeviceResponse nu este validat deloc înainte ca tranzacția să fie marcată ca reușită. |
| Cazurile online eșuează, în timp ce restul trec | Verifier-ul dumneavoastră nu poate accesa `wallet.staging.egov.md`, HTTP outbound este blocat de un proxy sau firewall, sau preluarea listei de stare, OCSP și CRL nu este implementată. |
| Doar cazurile privind lista de stare eșuează | Preluarea Status List CWT, negocierea conținutului (`Accept: application/statuslist+cwt`) sau verificarea semnăturii lipsesc. A se vedea [Validarea listei de stare](validation.md#status-list-validation). |
| Rezultatele diferă între rulări | Răspunsuri CRL, OCSP sau listă de stare aflate în cache. Respectați regulile de caching din secțiunea [Validarea răspunsului](validation.md) și ștergeți cache-ul între rulări. |

## În afara scopului

Tester-ul verifică doar gestionarea protocolului și validarea criptografică ale Verifier-ului. Următoarele rămân în responsabilitatea dumneavoastră și sunt revizuite separat:

* fluxurile orientate către utilizator, ecranele de consimțământ și mesajele de eroare prezentate Utilizatorului Final;
* minimizarea datelor — solicitarea doar a elementelor de date necesare pentru scopul declarat;
* comportamentul de retenție și utilizarea corectă a indicatorului **intent_to_retain**;
* logarea, auditabilitatea și securitatea operațională a implementării Verifier-ului;
* performanța și disponibilitatea sub sarcină de producție.
