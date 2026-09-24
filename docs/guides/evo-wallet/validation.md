Pentru a asigura autenticitatea și non-repudierea, înainte de procesarea elementelor de date primite, Verifier-ul trebuie să le valideze conform acestei secțiuni. Rețineți că elementele de date prezentate pentru fiecare document sunt codificate într-o structură CBOR DeviceResponse separată.

## Validarea integrității Authorization Response

Așa cum s-a menționat anterior, după identificarea tranzacției corespunzătoare și înainte de decriptarea JWE-ului primit, Verifier-ul TREBUIE:

1. să verifice că valoarea header-ului JWE **alg** este "ECDH-ES";
2. să verifice că valoarea header-ului JWE **enc** este "A256GCM";
3. să verifice că valoarea header-ului JWE **apv** corespunde valorii **nonce** persistate a tranzacției;
4. să verifice că header-ul JWE **apu** există (fiind oricum obligatoriu pentru decriptarea JWE);
5. să verifice că valoarea header-ului JWE **kid** corespunde identificatorului de cheie persistat al tranzacției.

## Validarea structurală a DeviceResponse

Pentru fiecare DeviceResponse, Verifier-ul TREBUIE:

1. să verifice că DeviceResponse.version este "1.0";
2. să verifice că nu există erori de document (în DeviceResponse.documentErrors);
3. să verifice starea DeviceResponse (DeviceResponse.status trebuie să fie zero);
4. să verifice că este returnat cel puțin un document (în DeviceResponse.documents);
5. să verifice că tipul de document returnat (DeviceResponse.documents[].docType) corespunde unuia dintre cele solicitate (credentials[].meta.doctype_value din parametrul dcql_query al payload-ului Authorization Request JWS, sau corespunde unei interogări DCQL referențiate prin scope).

## Validarea documentului

Pentru fiecare Document, Verifier-ul TREBUIE:

1. să verifice că nu există erori în document (în Document.errors);
2. să verifice că toate elementele de date solicitate și obligatorii sunt prezente (în Document.issuerSigned.nameSpaces);
3. opțional, tipurile de documente cunoscute cu elemente de date privind perioada de valabilitate legală definite trebuie să fie curente (de exemplu issue_date și expiry_date pentru PID moldovenesc).

## Autentificarea datelor issuer-ului

Pentru fiecare Document returnat, Verifier-ul TREBUIE să decodifice MSO-ul încorporat în semnătura COSE_Sign1, care este Document.issuerSigned.issuerAuth, și:

1. să verifice că MSO.version este "1.0";
2. să decodifice lanțul de certificate al issuer-ului din header-ul neprotejat **x5chain** (label 33);
3. să verifice semnătura issuer-ului utilizând cheia publică a certificatului issuer-ului;
4. să verifice că valoarea header-ului protejat **x5t** (label 34) corespunde amprentei SHA-256 a certificatului issuer-ului, dacă este prezent;
5. să calculeze toate digest-urile elementelor de date și să le compare cu MSO.valueDigests, utilizând algoritmul de digest specificat în MSO.digestAlgorithm (de obicei "SHA-256");
6. să verifice corespondența dintre MSO.docType și Document.docType;
7. să verifice perioada de valabilitate a MSO față de ora curentă (ora curentă trebuie să fie între MSO.validityPeriod.validFrom și MSO.validityPeriod.validTo).

## Validarea certificatului issuer-ului

Verifier-ul TREBUIE să valideze certificatul issuer-ului:

1. perioada de valabilitate față de ora curentă (ora curentă trebuie să fie între câmpurile NotBefore și NotAfter ale certificatului);
2. perioada de valabilitate să fie de maximum 457 de zile (conform ISO 18013-5);
3. perioada de valabilitate față de MSO.validityPeriod.signed;
4. lanțul față de ancorele de încredere (certificatul rădăcină);
5. Authority Key Identifier (AKI) să corespundă cu Subject Key Identifier (SKI) al certificatului CA;
6. câmpurile "C" și "ST" ale subiectului (atunci când sunt prezente) să corespundă câmpurilor "C" și "ST" ale certificatului CA;
7. algoritmul de semnătură să fie "1.2.840.10045.4.3.2", "1.2.840.10045.4.3.3" sau "1.2.840.10045.4.3.4";
8. key usage trebuie să fie digitalSignature (bit 0 setat);
9. extended key usage (EKU) trebuie să includă "1.0.18013.5.1.2" (mdlDS);
10. să nu conțină niciuna dintre următoarele extensii:
    * "2.5.29.30" – Name Constraints
    * "2.5.29.33" – Policy Mappings
    * "2.5.29.36" – Policy Constraints
    * "2.5.29.46" – Freshest CRL
    * "2.5.29.54" – Inhibit Any Policy.

## Autentificarea device-ului

Pentru fiecare Document returnat, Verifier-ul TREBUIE:

1. să valideze autorizațiile cheii device-ului, dacă există (pentru fiecare namespace din Document.deviceSigned.nameSpaces[], întregul namespace sau fiecare element de date trebuie să fie prezent în MSO.deviceKeyInfo.keyAuthorizations, care este încorporat în Document.issuerSigned.issuerAuth);
2. să verifice semnătura device-ului a structurii DeviceAuthentication (adică reconstruirea DeviceAuthenticationBytes și verificarea faptului că aceasta este semnată ca semnătură COSE_Sign1 detașată, cu COSE_Key din MSO.deviceKeyInfo.deviceKey).

## Verificări de revocare

Pentru fiecare Document returnat, Verifier-ul TREBUIE:

1. să verifice revocarea certificatului issuer-ului online, utilizând protocoalele standard CRL/OCSP și verificarea semnăturii răspunsului CRL sau OCSP, așa cum este implementat eficient de toate framework-urile și platformele;
2. pentru documentele care au prezentă proprietatea MSO.status, să verifice starea Documentului online față de Status List CWT referențiat prin **uri** (membru al MSO.status.status_list), unde bit-ul de la indexul **idx** trebuie să fie VALID (setat la 0).

## Validarea listei de stare

Pentru documentele revocabile, Status List CWT este obținut utilizând metoda HTTP GET de la **uri** (membru al MSO.status.status_list), folosind negocierea conținutului. Aceasta înseamnă că cererea HTTP trebuie să aibă header-ul **Accept** setat la "application/statuslist+cwt".

Înainte de a procesa un Status List CWT, Verifier-ul TREBUIE:

1. să verifice că răspunsul HTTP indică **Content-Type**: "application/statuslist+cwt";
2. să verifice că valoarea header-ului protejat **type** (label 16) este "application/statuslist+cwt";
3. să decodifice lanțul de certificate de semnare din header-ul neprotejat **x5chain** (label 33) și să verifice corespondența acestuia cu certificatul issuer-ului;
4. să verifice că valoarea header-ului protejat **x5t** (label 34) corespunde amprentei SHA-256 a certificatului de semnare, dacă este prezent;
5. să verifice că lista este semnată ca semnătură COSE_Sign1 încorporată, utilizând cheia publică a certificatului de semnare;
6. să verifice că claim-ul CWT **subject** (key 2) corespunde URI-ului Listei de Stare;
7. să verifice claim-ul CWT **issued at** (key 6) și claim-ul **expiration time** (key 4) față de ora curentă (se recomandă o toleranță de ceas de 10 minute);
8. să decodifice structura CBOR StatusList din claim-ul CWT **status list** (key 65533) și să decompreseze biții de stare din membrul **lst**, utilizând ZLIB (**RFC 1950**).

Deoarece Listele de Stare sunt menite să asigure confidențialitatea prezentării și să stocheze eficient starea mai multor documente, Verifier-ul TREBUIE să le stocheze în cache conform claim-ului CWT **time to live** (key 65534).
