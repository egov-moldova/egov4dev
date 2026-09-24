Această secțiune descrie protocolul de comunicare utilizat pentru prezentarea credențialelor.

<img src="../../../assets/protocol.png" alt="Protocol">

Diagrama descrie interacțiunea dintre Utilizatorul EVO, modulul EVO Wallet, Verifier Backend (implementarea server-side a Verifier-ului) și Verifier Frontend (implementarea client-side a Verifier-ului) într-o tranzacție de prezentare.

Interacțiunea constă din următorii pași:

1. În cazul QR-ului dinamic (pașii opționali 1-3), Verifier Frontend (declanșat de reprezentantul Verifier-ului) solicită inițierea tranzacției de prezentare a credențialului de la Verifier Backend.
2. Verifier Backend creează și înregistrează o nouă tranzacție.
3. Verifier Backend returnează identificatorul său și un link complet (care poate fi inclus într-un cod QR) către Verifier Frontend.
4. Utilizatorului i se afișează un cod QR sau un Link nou generat sau static. Link-ul include **request_uri**. Codurile QR statice pot include tipul documentului solicitat, identificatorul filialei, identificatorul operatorului de ghișeu ca parametri în **request_uri**, permițând Verifier Backend să creeze dinamic tranzacția.
5. Utilizatorul scanează codul QR sau apasă pe Link. Aceasta are ca rezultat deschiderea aplicației Wallet.
6. Wallet-ul verifică structura link-ului, creează și înregistrează un **wallet_nonce**.
7. Pentru a obține o Authorization Request de la Verifier Backend, Wallet-ul transmite **wallet_metadata** și **wallet_nonce** către **request_uri** furnizat, utilizând HTTP POST.
8. După identificarea sau crearea unei noi tranzacții, Verifier Backend înregistrează în tranzacție **wallet_nonce**-ul, precum și un **nonce** nou creat și o cheie efemeră pentru decriptarea răspunsului.
9. Verifier Backend creează și semnează un Authorization Request JWS, care include **client_metadata** al său cu cheia efemeră, **nonce, wallet_nonce, dcql_query, response_uri** și **state**, apoi îl returnează Wallet-ului într-un răspuns HTTP 200 OK. **response_uri** include parametri care permit Verifier-ului să identifice tranzacția.
10. Wallet-ul analizează și validează semnătura Authorization Request și **wallet_nonce**-ul primit.
11. Wallet-ul identifică credențialele care corespund **dcql_query** și le afișează utilizatorului pentru a solicita confirmarea prezentării.
12. Utilizatorul examinează cererea, poate selecta credențialele și/sau elementele de date returnate și confirmă prezentarea.
13. Wallet-ul creează un device nonce, creează o structură CBOR DeviceResponse pentru fiecare document și semnează fiecare document cu DeviceKey utilizând formatul COSE_Sign1.
14. Wallet-ul derivă o cheie de criptare simetrică din cheia efemeră transmisă de Verifier, propria sa cheie efemeră, nonce și device nonce (utilizând algoritmul ECDH-ES) și criptează Authorization Response în format JWE.
15. Wallet-ul transmite Authorization Response JWE către Verifier Backend prin **response_uri** furnizat, utilizând HTTP POST. Aceasta include **nonce**, device nonce, cheia efemeră a Wallet-ului, **vp_token** cu DeviceResponse(-urile) serializate și **state**.
16. Verifier Backend identifică tranzacția din **response_uri**, validează nonce-ul și identificatorul cheii efemere, derivă cheia de criptare simetrică din propria sa cheie efemeră și cheile efemere ale Wallet-ului, nonce și device nonce-ul transmis (utilizând ECDH-ES), decriptează Authorization Response, analizează structura(-ile) CBOR DeviceResponse, validează tipul documentului, integritatea documentului, semnăturile device și issuer, certificatul issuer-ului, revocarea certificatului issuer-ului și starea documentului (dacă este referențiată o listă de stare).
17. Verifier Backend înregistrează documentul(-ele) prezentat(-e) drept demonstrație a prezentării și procesează elementele de date ale acestora în funcție de necesitățile sale.
18. Verifier Backend răspunde cu un răspuns HTTP 200 OK către Wallet, care include un obiect JSON cu un **redirect_uri** opțional.
19. Wallet-ul confirmă Utilizatorului prezentarea reușită și, dacă este furnizat, redirecționează utilizatorul către **redirect_uri**.
20. Între timp (după pasul 3), Verifier Frontend verifică periodic starea tranzacției cu Verifier Backend.
21. Verifier Backend returnează starea tranzacției, care poate fi în așteptare, eșuată sau reușită.
22. La finalizarea cu succes a tranzacției, Verifier Frontend poate afișa anumite elemente de date reprezentantului Verifier-ului pentru a-i permite acestuia să potrivească datele primite cu persoana care prezintă documentul(-ele).

## Device Engagement

În timpul fazei de device engagement, aplicația Wallet este deschisă și primește URL-ul pe care îl poate utiliza pentru a se conecta cu Verifier-ul. Acest URL este rezultatul deschiderii unui link sau al scanării unui cod QR de către Utilizator.

Cu alte cuvinte, Verifier-ul transmite o Authorization Request ca Request Object prin referință, așa cum este definit de JWT-Secure Authorization Request (JAR), definit în **RFC 9101**, cu extensii definite de OpenID4VP.

URL-ul are următoarea structură:

| Componentă URI | Descriere |
|---|---|
| eudi-openid4vp:// | Schema URI care determină deschiderea Wallet-ului. |
| client_id | Parametru de interogare obligatoriu care specifică Identificatorul de Client al Verifier-ului. Valoarea este hash-ul SHA-256 codificat base64url al certificatului de cheie publică X.509 codificat DER, utilizat de Verifier pentru a semna cererea, prefixat cu "**x509_hash:**". |
| request_uri | Parametru de interogare obligatoriu care determină URL-ul bazat pe HTTPS de unde Wallet-ul recuperează obiectul Authorization Request. Valoarea TREBUIE să fie codificată URL. |
| request_uri_method | Parametru de interogare obligatoriu care determină metoda HTTP care urmează a fi utilizată. TREBUIE să fie setat la **post**. Aceasta înseamnă că Wallet-ul va transmite către **request_uri**-ul indicat metadatele sale și un nonce, utilizând metoda HTTP POST. |

**request_uri**-ul codificat URL poate include parametri suplimentari necesari pentru a identifica o tranzacție predefinită, pregătită în prealabil sau creată dinamic, care reprezintă starea Authorization Request. De exemplu, poate conține tipul documentului solicitat, identificatorul filialei, identificatorul operatorului de ghișeu sau identificatorul tranzacției Authorization Request creată și persistată recent de backend-ul Verifier-ului. Astfel, este important să se minimizeze lungimea acestuia atunci când este prezentat ca QR, fără a permite unui atacator să genereze sau să ghicească ușor unul corect.

Fie scanat dintr-un QR, fie apăsat ca link, accesarea acestui URL determină deschiderea aplicației Wallet. Aplicația va efectua apoi o cerere HTTP POST către **request_uri**-ul Verifier-ului, cu header-ul **Accept** setat la **application/oauth-authz-req+jwt**, cu următorii parametri codificați ca **application/x-www-form-urlencoded**:

| Parametru | Descriere |
|---|---|
| wallet_metadata | Un șir care conține un obiect JSON descris mai jos. |
| wallet_nonce | O valoare de tip șir utilizată pentru a atenua atacurile de tip replay asupra Authorization Request. Verifier-ul TREBUIE să o utilizeze ca valoare **wallet_nonce** în obiectul Authorization Request semnat. Valoarea este codificată base64url. |

Structura obiectului wallet_metadata este următoarea:

| Parametru | Descriere |
|---|---|
| issuer | Valoarea pentru issuer este identificatorul emitentului Wallet-ului. EVO Wallet utilizează următoarea valoare: **https://evo.gov.md/wallet/v1** |
| authorization_endpoint | Valoarea pentru authorization_endpoint este endpoint-ul OAuth 2 Authorization către care cititorul mdoc transmite Authorization Request. EVO Wallet utilizează următoarea valoare: **eudi-openid4vp:** |
| response_types_supported | Un array ne-gol de șiruri care conține valorile tipurilor de răspuns pe care Wallet-ul le suportă. EVO Wallet utilizează următoarele valori: **["vp_token"]** |
| response_modes_supported | Un array ne-gol de șiruri care conține valorile modurilor de răspuns pe care Wallet-ul le suportă. EVO Wallet utilizează următoarele valori: **["direct_post.jwt"]** |
| vp_formats_supported | Un obiect care conține o listă de perechi nume/valoare, unde numele este un Identificator de Format de Credential, iar valoarea definește parametrii specifici formatului pe care un Wallet îi suportă. EVO Wallet utilizează următoarea valoare: **{ "mso_mdoc": { "issuerauth_alg_values": [-7], "deviceauth_alg_values": [-7] } }** |
| client_id_prefixes_supported | Un array ne-gol de șiruri care conține valorile Prefixelor de Identificator de Client pe care Wallet-ul le suportă. EVO Wallet utilizează următoarele valori: **["x509_hash"]** |
| request_object_signing_alg_values_supported | Un array ne-gol de șiruri care conține lista algoritmilor criptografici suportați pentru securizarea Request Object-ului. EVO Wallet utilizează următoarele valori: **["ES256"]** |
| authorization_encryption_alg_values_supported | Un array ne-gol de șiruri care conține algoritmii suportați pentru criptare. EVO Wallet utilizează următoarele valori: **["ECDH-ES"]** |
| authorization_encryption_enc_values_supported | Un array ne-gol de șiruri care conține tipurile de chei suportate pentru criptare. EVO Wallet utilizează următoarele valori: **["A256GCM"]** |

## Returnarea Authorization Request

Ca rezultat al cererii HTTP POST către **request_uri**-ul Verifier-ului, Verifier-ul trebuie să răspundă cu o nouă Authorization Request.

Se recomandă ca o Authorization Request și Authorization Response corespunzătoare să facă parte dintr-o tranzacție de prezentare persistată de Verifier. Aceasta include un nonce și o cheie efemeră generate recent (cu cheia publică returnată în client_metadata.jwks), are o expirare și o stare de utilizare pentru a preveni atacurile de tip replay.

Authorization Request returnată TREBUIE să fie un JWT semnat, adică un JWS conform **RFC 7515**.

Header-ul Authorization Request JWS are următorii parametri:

| Parametru | Descriere |
|---|---|
| typ | Tipul token-ului JWT. TREBUIE setat la: **oauth-authz-req+jwt** |
| alg | Identificatorul algoritmului utilizat pentru semnarea JWT-ului. TREBUIE setat la: **ES256** |
| x5c | Un array de șiruri care conține lanțul de certificate de cheie publică X.509 utilizat de Verifier pentru a semna cererea. Fiecare șir din array este o valoare certificat DER PKIX codificată base64 (nu base64url). Certificatul care conține cheia publică corespunzătoare cheii utilizate pentru a semna digital cererea TREBUIE să fie primul certificat. Acesta POATE fi urmat de certificate suplimentare, de obicei unul, fiecare certificat ulterior fiind cel utilizat pentru a certifica certificatul anterior. Certificatul X.509 al ancorei de încredere (rădăcina) NU TREBUIE inclus. |

Payload-ul Authorization Request JWS are următorii parametri:

| Parametru | Descriere |
|---|---|
| aud | Audiența obiectului Authorization Request, care trebuie setată la: **https://self-issued.me/v2** |
| client_id | Identificatorul de client emis clientului în timpul procesului de înregistrare, prefixat de prefixul identificatorului de client. Exemplu de valoare: x509_hash:71N_JciVv6eCUmUpqbY9l6pjFWTV14nCt2VEjIY1-2w |
| client_metadata | Un obiect JSON care conține valorile metadatelor Verifier-ului, definite în acest document. |
| dcql_query | Un obiect JSON care conține o interogare DCQL, definită în acest document. |
| scope | Un șir utilizat ca alias pentru o interogare DCQL bine definită. În prezent, EVO Wallet nu definește încă niciun alias. |
| transaction_data | Un array opțional ne-gol de șiruri, unde fiecare șir este un obiect JSON codificat base64url care conține un set de parametri tipizați cu detalii despre tranzacția pentru care Verifier-ul solicită autorizarea Utilizatorului Final. Neutilizat încă de EVO. |
| verifier_info | Un array opțional ne-gol de obiecte JSON care reprezintă atestări despre Verifier. Poate include metadate ale Verifier-ului, politici, statut de încredere, autorizații etc. Menit să sprijine deciziile de autorizare, să informeze aplicarea politicii Wallet-ului sau să îmbogățească dialogul de consimțământ al Utilizatorului Final. Neutilizat încă de EVO. |
| response_type | Tipul de răspuns care urmează a fi utilizat. TREBUIE să fie: **vp_token** |
| response_mode | Modul de răspuns care urmează a fi utilizat. TREBUIE să fie: **direct_post.jwt** |
| response_uri | URL-ul HTTPS care reprezintă endpoint-ul HTTPS POST pentru transmiterea Authorization Response criptată, necesară pentru Modul de Răspuns direct_post.jwt. Acesta include de obicei parametri care permit Verifier-ului să identifice tranzacția de prezentare. |
| nonce | Un nonce criptografic - o valoare aleatoare sau pseudo-aleatoare imprevizibilă. Nonce-urile trebuie să aibă o entropie minimă de 16 octeți. O nouă valoare nonce trebuie aleasă pentru fiecare tranzacție. |
| wallet_nonce | Valoarea TREBUIE setată la cea transmisă de Wallet. |
| state | Valoare de tip șir opțională, care TREBUIE să conțină doar caractere ASCII sigure pentru URL (litere mari și mici, cifre zecimale, cratimă, punct, underscore și tildă). Returnată de Wallet către Verifier la transmiterea Authorization Response. De obicei utilizată pentru a transmite id-ul cererii de autorizare persistat de Verifier, corelând Authorization Request cu Authorization Response. |

Structura obiectului **client_metadata** este următoarea:

| Parametru | Descriere |
|---|---|
| jwks | Un set de chei JSON Web Key, definit în **RFC 7591**, care conține o cheie publică utilizată de Wallet ca input pentru un acord de chei folosit la criptarea Authorization Response. Parametrul **use** al **key**-ei TREBUIE setat la **enc, alg** TREBUIE setat la **ECDH-ES, kty** trebuie să fie **EC, crv** trebuie să fie **P-256**, și TREBUIE să aibă un parametru **kid** (Key ID) care identifică unic cheia în contextul cererii. |
| encrypted_response_enc_values_supported | Algoritmul de criptare a răspunsului care urmează a fi utilizat. TREBUIE să fie: **A256GCM** |
| vp_formats_supported | Identic cu **vp_formats_supported** descris în obiectul **wallet_metadata**. |

Structura obiectului **dcql_query** este următoarea:

| Parametru | Descriere |
|---|---|
| credentials | Un array obligatoriu ne-gol de Credential Query, definite în acest document. |
| credentials_set | Un array opțional ne-gol de Credential Set Query, care specifică restricții suplimentare privind care dintre Credențialele solicitate urmează a fi returnate. |

Fiecare intrare din **credentials** TREBUIE să fie un obiect cu următorii parametri:

| Parametru | Descriere |
|---|---|
| id | Un șir obligatoriu care identifică Credentialul în răspuns și, dacă este furnizat, restricțiile din **credential_sets**. Valoarea TREBUIE să fie un șir ne-gol format din caractere alfanumerice, underscore (_) sau cratimă (-). În cadrul Authorization Request, același id NU TREBUIE să apară de mai multe ori. |
| format | Un șir obligatoriu care specifică formatul Credentialului solicitat. Acesta TREBUIE setat la **mso_mdoc**. |
| multiple | Un boolean opțional care indică dacă pot fi returnate mai multe Credențiale pentru această Credential Query. Dacă este omis, valoarea implicită este false. |
| meta | Un obiect obligatoriu care definește proprietăți suplimentare solicitate de Verifier, care se aplică metadatelor și datelor de valabilitate ale Credentialului. Proprietățile acestui obiect sunt definite per Format de Credential. Acesta TREBUIE să conțină un parametru **doctype_value**, care este un șir ce specifică o valoare permisă pentru doctype-ul Credentialului Verificabil solicitat. Acesta TREBUIE să fie un identificator de doctype valid, așa cum este definit de ISO 18013-5. |
| trusted_authorities | Un array opțional ne-gol de obiecte care specifică autoritățile sau cadrele de încredere așteptate, care certifică Emitenții, pe care Verifier-ul le va accepta. |
| require_cryptographic_holder_binding | O valoare booleană opțională care indică dacă Verifier-ul solicită o probă de Cryptographic Holder Binding. A nu se seta, deoarece valoarea implicită este true. |
| claims | Un array opțional de claims, definite în acest document. Verifier-ii NU TREBUIE să indice același claim de mai multe ori într-o singură interogare. |
| claim_sets | Un array opțional ne-gol care conține array-uri de identificatori pentru elementele din **claims**, care specifică ce combinații de **claims** sunt solicitate pentru Credential. |

Fiecare intrare din **credential_sets** TREBUIE să fie un obiect cu următorii parametri:

| Parametru | Descriere |
|---|---|
| options | Un array obligatoriu ne-gol, unde fiecare valoare din array este o listă de identificatori de Credential Query care reprezintă un set de Credențiale ce satisface cazul de utilizare. Valoarea fiecărui element din array-ul **options** este un array ne-gol de identificatori care fac referire la elemente din **credentials**. |
| required | Un boolean opțional care indică dacă acest set de Credențiale este necesar pentru a satisface cazul de utilizare specific la Verifier. Dacă este omis, valoarea implicită este true. |

Fiecare intrare din array-ul **trusted_authorities** TREBUIE să fie un obiect cu următorii parametri:

| Parametru | Descriere |
|---|---|
| type | Un șir obligatoriu care identifică în mod unic tipul de informație despre cadrul de încredere al issuer-ului. <span class="highlight-text-yellow">A se utiliza "aki" sau "etsli_tl".</span> |
| values | Un array obligatoriu ne-gol de șiruri, unde fiecare șir (valoare) conține informații specifice tipului de Trusted Authorities Query utilizat, care permit identificarea unui issuer sau a unui cadru de încredere căruia îi aparține un issuer. |

Fiecare intrare din array-ul **claims** TREBUIE să fie un obiect cu următorii parametri:

| Parametru | Descriere |
|---|---|
| id | Un șir care identifică claim-ul specific. Valoarea TREBUIE să fie un șir ne-gol format din caractere alfanumerice, underscore (_) sau cratimă (-). În cadrul array-ului particular de claims, același id NU TREBUIE să apară de mai multe ori. Obligatoriu dacă este prezent **claims_set**, opțional în caz contrar. |
| path | O valoare obligatorie care TREBUIE să fie un array ne-gol reprezentând un pointer de tip claims path, care specifică calea către un claim în cadrul Credentialului. Un pointer de cale într-un mdoc conține două elemente de tip șir. Primul element face referire la un namespace, iar al doilea element face referire la un identificator de element de date. |
| values | Un array opțional ne-gol de șiruri, numere întregi sau valori booleene care specifică valorile așteptate ale claim-ului. Dacă proprietatea values este prezentă, Wallet-ul AR TREBUI să returneze claim-ul doar dacă tipul și valoarea claim-ului se potrivesc exact cu cel puțin unul dintre elementele din array. |
| intent_to_retain | O variabilă booleană opțională care indică dacă Verifier-ul intenționează să păstreze elementul de date primit. Valoarea implicită este **false**. Verifier-ul NU TREBUIE să păstreze niciun element de date, cu excepția elementelor de date pentru care indicatorul intent_to_retain a fost setat la true în cerere. A păstra este definit ca "a stoca pentru o perioadă mai lungă decât cea necesară pentru desfășurarea tranzacției în timp real". |

Fiecare intrare din **verifier_info** TREBUIE să fie un obiect cu următorii parametri:

| Parametru | Descriere |
|---|---|
| format | Un șir care identifică formatul atestării și modul în care este codificată. Ecosistemele AR TREBUI să utilizeze identificatori rezistenți la coliziuni. Procesarea ulterioară a atestării este determinată de tipul atestării, care este specificat într-un mod specific formatului. |
| data | Un obiect sau șir care conține o atestare (de exemplu, un JWT). Structura payload-ului este definită la nivelul fiecărui format. |
| credential_ids | Un array opțional ne-gol de șiruri, fiecare referindu-se la un Credential solicitat de Verifier pentru care atestarea este relevantă. Fiecare șir corespunde câmpului id dintr-o Credential Query DCQL. Dacă este omis, atestarea este relevantă pentru toate Credențialele solicitate. |

## Gestionarea Authorization Response

După consimțământul utilizatorului, Wallet-ul transmite Authorization Response criptat ca JWE, utilizând metoda HTTP POST, către **response_uri**-ul Verifier-ului, cu următorii parametri codificați ca **application/x-www-form-urlencoded**:

| Parametru | Descriere |
|---|---|
| response | Un șir care conține Authorization Response criptat în format JWE. |

Header-ul Authorization Response JWE are următorii parametri:

| Parametru | Descriere |
|---|---|
| alg | Întotdeauna setat la **ECDH-ES**. |
| enc | Întotdeauna setat la **A256GCM**. |
| kid | Valoarea parametrului JWK **kid** al cheii publice care a fost utilizată pentru acordul de chei la criptarea răspunsului. |
| epk | Cheia publică a perechii de chei efemere generate ale Wallet-ului, codificată ca JWK. |
| apu | Valoare codificată base64url-fără-padding a device nonce-ului. |
| apv | Valoare codificată base64url-fără-padding a parametrului nonce codificat utf-8 din obiectul Authorization Request. |

Payload-ul Authorization Response JWE are următorii parametri:

| Parametru | Descriere |
|---|---|
| vp_token | Acesta este un obiect codificat JSON care conține intrări, unde cheia este valoarea **id** utilizată pentru o Credential Query în interogarea DCQL, iar valoarea este un array de una sau mai multe structuri DeviceResponse codificate base64url, documentate în secțiunea Format din acest document. |
| state | Valoarea șirului **state** care a fost transmis ca parte a Authorization Request. De obicei utilizată pentru a transmite id-ul cererii de autorizare persistat de Verifier, corelând Authorization Request cu Authorization Response. |

Verifier-ul poate decripta Authorization Response JWE cu o cheie simetrică AES-256 derivată, utilizând algoritmul Concat KDF, conform Secțiunii 4.6 din **RFC 7518**, folosind:

*   Partea privată a cheii efemere a Verifier-ului (destinatarul), a cărei parte publică a fost transmisă Wallet-ului în payload-ul Authorization Request JWS, parametrul **client_metadata.jwks**, identificat de parametrul **kid** transmis înapoi în header-ul Authorization Response JWE.
*  Partea publică a cheii efemere a Wallet-ului (producătorul sau expeditorul), transmisă Verifier-ului în header-ul Authorization Response JWE, parametrul **epk**.
*  Informații despre producător, transmise în header-ul Authorization Response JWE, parametrul **apu**, care reprezintă device nonce-ul generat de Wallet.
* Informații despre destinatar, transmise în header-ul Authorization Response JWE, parametrul **apv**, care reprezintă nonce-ul Verifier-ului transmis inițial în payload-ul Authorization Request JWS.

Verifier-ul trebuie de asemenea să se asigure că valoarea header-ului JWE **apv** corespunde valorii **nonce** persistate a tranzacției.

Pentru a asigura autenticitatea și non-repudierea, înainte de procesarea elementelor documentului primite, Verifier-ul trebuie să le valideze conform secțiunii de validare a răspunsului.

La procesarea cu succes a Authorization Response sau a Authorization Error Response, Verifier-ul TREBUIE să răspundă cu un cod de stare HTTP 200, cu **Content-Type** de **application/json** și un obiect JSON în corpul răspunsului, cu următorii parametri:

| Parametru | Descriere |
|---|---|
| redirect_uri | Un șir opțional care conține un URI. Atunci când acest parametru este prezent, Wallet-ul TREBUIE să redirecționeze user agent-ul către acest URI. Aceasta permite Verifier-ului să continue interacțiunea cu Utilizatorul Final pe dispozitivul pe care se află Wallet-ul, după ce Wallet-ul a transmis Authorization Response către Response URI. |

## Authorization Error Response

În caz de eroare, Wallet-ul transmite Authorization Error Response în clar, utilizând metoda HTTP POST, către **response_uri**-ul Verifier-ului, cu următorii parametri codificați ca **application/x-www-form-urlencoded**:

| Parametru | Descriere |
|---|---|
| error | Cod de eroare cu valorile descrise în această secțiune. |
| error_description | Descriere a erorii, lizibilă pentru om. |
| state | Valoarea șirului **state** care a fost transmis ca parte a Authorization Request. De obicei utilizată pentru a transmite id-ul cererii de autorizare persistat de Verifier, corelând Authorization Request cu Authorization Response. |

La procesarea cu succes a Authorization Error Response, Verifier-ul TREBUIE să răspundă conform celor documentate pentru Authorization Response.

Răspunsul de eroare respectă regulile definite în **RFC 6749**, cu următoarele clarificări suplimentare:

#### invalid_scope
* Valoarea scope solicitată este invalidă, necunoscută sau incorect formată.

#### invalid_request
* Cererea conține atât un parametru **dcql_query**, cât și un parametru **scope** care face referire la o interogare DCQL.
* Cererea utilizează Response Type-ul **vp_token**, dar nu include nici un parametru **dcql_query**, nici un parametru **scope** care face referire la o interogare DCQL.
* Wallet-ul nu suportă Client Identifier Prefix-ul transmis în Authorization Request.
* Client Identifier-ul transmis în cerere nu a aparținut Client Identifier Prefix-ului său, sau au fost încălcate cerințele unui anumit prefix, de exemplu o cerere nesemnată a fost trimisă cu Client Identifier Prefix https.

#### invalid_client
* Parametrul **client_metadata** este prezent, dar Wallet-ul recunoaște Client Identifier-ul și cunoaște metadatele asociate acestuia.
* Metadatele preînregistrate ale Verifier-ului au fost găsite pe baza Client Identifier-ului, dar este prezent și parametrul **client_metadata**.

#### access_denied
* Wallet-ul nu a avut Credențialele solicitate pentru a satisface Authorization Request.
* Utilizatorul Final nu și-a dat consimțământul pentru a partaja Credențialele solicitate cu Verifier-ul.
* Wallet-ul nu a reușit să autentifice Utilizatorul Final.

Acest document definește de asemenea următoarele coduri și descrieri de eroare suplimentare:

#### vp_formats_not_supported
* Wallet-ul nu suportă niciunul dintre formatele solicitate de Verifier, cum ar fi cele incluse în parametrul de înregistrare **vp_formats_supported**.

#### invalid_request_uri_method
* Valoarea parametrului de cerere **request_uri_method** nu este nici get, nici post (sensibil la majuscule/minuscule).

#### invalid_transaction_data
* oricare dintre următoarele este adevărată pentru cel puțin un obiect din structura **transaction_data**:
  - conține o valoare de tip transaction data necunoscută sau nesuportată,
  - este un obiect de tip cunoscut, dar conține câmpuri necunoscute,
  - conține câmpuri de tip greșit pentru tipul de transaction data,
  - conține câmpuri cu valori invalide pentru tipul de transaction data,
  - lipsesc câmpuri obligatorii pentru tipul de transaction data,
  - credential_ids nu corespunde, sau
  - Credentialul(ele) referențiat(e) nu sunt disponibile în Wallet.

#### wallet_unavailable
* Wallet-ul pare a fi indisponibil și, prin urmare, incapabil să răspundă cererii. Poate fi util în situațiile în care user agent-ul nu poate invoca Wallet-ul, iar o altă componentă primește cererea în timp ce Utilizatorul Final dorește să continue parcursul pe website-ul Verifier-ului. De exemplu, aceasta se aplică atunci când se utilizează URI-uri HTTPS revendicate (claimed), gestionate de furnizorul Wallet-ului, în cazul în care platforma nu poate sau nu traduce URI-ul într-o intenție de platformă pentru a invoca Wallet-ul. În acest caz, furnizorul Wallet-ului ar returna Authorization Error Response către Verifier și ar putea redirecționa user agent-ul înapoi către website-ul Verifier-ului.
