## Efectuarea plății online

În cazul plății online (fără prezența cardului, ecommerce), e-Serviciul trebuie să redirecționeze browserul către pagina de plată a MPay. Comunicarea se va realiza prin serviciul WEB, folosind protocolul standard HTTP (HTTP / 1.1) și acordând permisiunea de acces la IP-ul clientului (doar pentru testare).

Mai jos este o descriere a parametrilor implicați în această redirecționare.

## Efectuarea plăților prin terminal POS

### Configurarea terminalului POS

| Proprietate | Valoare |
|----------|-------|
| **Metoda** | POST |
| **URL** | Test: https://mpay.staging.egov.md/service/pay<br>Prod: https://mpay.gov.md/service/pay |
| **Descriere** | Direcționează utilizatorul pentru efectuarea plăților online prin card (fără prezența cardului - ecommerce), internet banking, monedă electronică sau pentru accesarea instrucțiunilor privind alte metode de plată. |

### Parametri de formular sau URL

| Nume | Tip | Obligatoriu/Opțional | Descriere |
|------|------|-------------------|-------------|
| ServiceID | string | Obligatoriu | Identificatorul serviciului în MPay. |
| OrderKey | string | Obligatoriu | Cheia comenzii în cadrul serviciului. Aceasta trebuie să fie o cheie generată unic pentru această comandă (precum cheia sa primară sau un alt tip de număr de referință). |
| ReturnUrl | URL | Opțional | URL-ul către care MPay va redirecționa după plată (fie reușită, fie nereușită). Redirecționarea către această pagină se va face prin metoda HTTP GET. Asigurați-vă că codificați URL (URL encode) orice parametru folosit la construirea acestui URL. |

### Parametri de formular sau parametri de trimis pentru configurare în MPay

| Nume | Tip | Obligatoriu/Opțional | Descriere |
|------|------|-------------------|-------------|
| OrganizationName | string | Obligatoriu | Denumirea Prestatorului de Servicii. |
| OrganizationIdno | string | Obligatoriu | Identificatorul de organizație al Prestatorului de Servicii. |
| OfficeAddress | string | Obligatoriu | Adresa fizică a organizației Prestatorului de Servicii. |
| OrganizationService | string | Opțional | Departamentul organizației (dacă există) care va presta serviciile pentru care se vor colecta plăți prin terminalul POS. |
| Counter | string | Opțional | Numărul ghișeului fizic al organizației (dacă există) care va presta serviciile pentru care se vor colecta plăți prin terminalul POS. |
| TerminalId | string | Obligatoriu | Identificatorul terminalului dispozitivului. |
| VendorName | string | Obligatoriu | Banca proprietară a terminalului POS |
| IntendedIp | string | Obligatoriu | Adresa IP a e-serviciului Prestatorului de Servicii. Această adresă IP urmează a fi adăugată în lista albă (whitelist) a MPay. |

**Notă:** Pentru finalizarea configurării terminalelor POS, asigurați-vă că ați instalat driverul USB al terminalului POS furnizat de Vendor (bancă).

Pentru efectuarea redirecționării pentru tranzacțiile prin terminal POS, urmați descrierea parametrilor implicați în această redirecționare.

| Proprietate | Valoare |
|----------|-------|
| **Metoda** | POST |
| **URL** | Test:<br>- După ServiceId și OrderKey<br>https://mpay.staging.egov.md/PosTerminal/Pay/{ServiceId}/{OrderKey}<br>- sau după InvoiceId din MPay<br>https://mpay.staging.egov.md/PosTerminal/PayInvoice/{InvoiceId}|
| **Descriere** | Direcționează operatorul pentru efectuarea plății prin terminale POS. |

### Parametri de formular sau URL

| Nume | Tip | Obligatoriu/Opțional | Descriere |
|------|------|-------------------|-------------|
| ServiceID | string | Obligatoriu | Identificatorul serviciului în MPay. |
| OrderKey | string | Obligatoriu | Cheia comenzii în cadrul e-serviciului. Aceasta trebuie să fie o cheie generată unic pentru această comandă (precum cheia sa primară sau un alt tip de număr de referință). |
| InvoiceId | string | Obligatoriu | Identificatorul facturii MPay. |

## Obținerea InvoiceID din MPay

Pentru a genera un InvoiceID în MPay, e-serviciul poate apela o metodă din API-ul MPay. Comunicarea se va realiza prin serviciul WEB, folosind protocolul standard HTTP (HTTP / 1.1) și acordând permisiunea de acces la IP-ul clientului.

Mai jos este o descriere a parametrilor implicați în acest apel.

| Proprietate | Valoare |
|----------|-------|
| **Metoda** | GET |
| **URL** | Test:<br>https://mpay.staging.egov.md:8443/api/invoices?serviceID={serviceID}&orderKey={orderKey}<br><br>Swagger:<br>https://mpay.staging.egov.md:8443/openapi/index.html sau <br>https://mpay.gov.md:8443/openapi/index.html |
| **Descriere** | E-serviciul poate genera InvoiceID din MPay și îl poate folosi pentru propria evidență sau proces de business (de exemplu, pentru a-l imprima pe comanda generată). |

### Parametri de formular sau URL

| Nume | Tip | Obligatoriu/Opțional | Descriere |
|------|------|-------------------|-------------|
| ServiceID | string | Obligatoriu | Identificatorul serviciului. |
| OrderKey | string | Obligatoriu | Cheia comenzii în cadrul e-serviciului. Aceasta trebuie să fie o cheie generată unic pentru această comandă (precum cheia sa primară sau un alt tip de număr de referință). |

### Parametri de ieșire

| Nume | Tip | Obligatoriu/Opțional | Descriere |
|------|------|-------------------|-------------|
| n/a | Array | Opțional | Lista InvoiceID-urilor din MPay. |

## Obținerea PDF-ului facturii MPay

Pentru a genera factura MPay în format PDF, e-serviciul poate apela o metodă din API-ul MPay. Comunicarea se va realiza prin serviciul WEB, folosind protocolul standard HTTP (HTTP / 1.1) și acordând permisiunea de acces la IP-ul clientului.

Mai jos este o descriere a parametrilor implicați în acest apel.

| Proprietate | Valoare |
|----------|-------|
| **Metoda** | GET |
| **URL** | Test:<br>https://mpay.staging.egov.md:8443/api/Invoices/DownloadInvoicePdf?serviceID={serviceId}&orderKey={ordekey}<br><br>Swagger:<br>https://mpay.staging.egov.md:8443/openapi/index.html sau <br>https://mpay.gov.md:8443/openapi/index.html |
| **Descriere** | E-serviciul poate genera PDF-ul InvoiceID din MPay și îl poate folosi pentru propriul proces de business (de exemplu, pentru a-l imprima și preda plătitorului). |

### Parametri de formular sau URL

| Nume | Tip | Obligatoriu/Opțional | Descriere |
|------|------|-------------------|-------------|
| serviceId | string | Obligatoriu | Identificatorul serviciului în MPay. |
| orderKey | string | Obligatoriu | Cheia comenzii în cadrul e-serviciului. Aceasta trebuie să fie o cheie generată unic pentru această comandă (precum cheia sa primară sau un alt tip de număr de referință). |

### Parametri de ieșire

| Nume | Tip | Obligatoriu/Opțional | Descriere |
|------|------|-------------------|-------------|
| n/a | Http response message | Obligatoriu | Factura PDF MPay obținută ca HttpResponseMessage, cu următoarele proprietăți:<br><br>1. **Content** - stochează PDF-ul ca vector de octeți (8bit)<br>2. **Headers** - stochează informațiile despre conținut<br><br>Headers are următoarele proprietăți:<br>1. **ContentLength** - stochează valoarea întreagă a numărului de octeți ai PDF-ului<br>2. **ContentType** - specifică tipul conținutului, care este "application/octet-stream"<br>3. **ContentDisposition** - stochează informații despre fișierul PDF. Doar proprietatea "FileName" din obiectul ContentDisposition are o valoare egală cu denumirea implicită MPay a fișierelor PDF, de ex. "Nota de plata {invoiceID}.pdf", unde "invoiceID" este egal cu comanda care a fost căutată. |

## Obținerea PDF-ului facturii MPay (bytes)

| Proprietate | Valoare |
|----------|-------|
| **Metoda** | GET |
| **URL** | Test:<br>https://mpay.staging.egov.md:8443/api/Invoices/GetPdfInvoiceBytes?serviceID={serviceId}&orderKey={ordekey}<br><br>Swagger:<br>https://mpay.staging.egov.md:8443/openapi/index.html sau <br>https://mpay.gov.md:8443/openapi/index.html |
| **Descriere** | E-serviciul poate genera PDF-ul InvoiceID din MPay sub formă de bytes și îl poate folosi pentru propriul proces de business (de exemplu, comunicare server-server). |

### Parametri de formular sau URL

| Nume | Tip | Obligatoriu/Opțional | Descriere |
|------|------|-------------------|-------------|
| ServiceID | string | Obligatoriu | Identificatorul serviciului în MPay. |
| OrderKey | string | Obligatoriu | Cheia comenzii în cadrul e-serviciului. Aceasta trebuie să fie o cheie generată unic pentru această comandă (precum cheia sa primară sau un alt tip de număr de referință). |
| pageFormat | string | Opțional | Dimensiunea implicită a paginii este A4 (nu este necesar să indicați acest format). Alt format de pagină disponibil este A5. |

### Parametri de ieșire

| Nume | Tip | Obligatoriu/Opțional | Descriere |
|------|------|-------------------|-------------|
| n/a | ByteArray | Obligatoriu | Factura PDF MPay obținută ca vector de octeți (8bit). |

## Reguli de tratare a erorilor

Pentru erorile rezultate în urma apelurilor interfeței SOAP, MPay așteaptă **erori SOAP (SOAP faults)** cu **coduri de eroare (fault codes)** și **motive ale erorii (fault reasons)** care descriu eroarea în limba engleză simplă. Este recomandată traducerea erorilor în limba română. Dacă Prestatorul de Servicii Publice nu returnează nicio eroare SOAP, MPay consideră că invocarea operației s-a finalizat cu succes, ceea ce înseamnă că respectivele consecințe de business așteptate sunt acum valide.

### Coduri de eroare

| Cod eroare | Descriere |
|------------|-------------|
| InternalError | Eroare internă neașteptată. |
| AuthenticationFailed | Procesul de autentificare a consumatorului serviciului a eșuat. Vezi Autentificare |
| AuthorizationFailed | Procesul de autorizare a consumatorului serviciului a eșuat. Vezi Eroare! Sursa referinței nu a fost găsită. |
| InvalidParameter | Un parametru de intrare este invalid. Vă rugăm să analizați textul Fault Reason returnat și descrierea operației apelate. |
| UnknownService | ServiceID-ul furnizat este necunoscut. |
| UnknownOrder | OrderKey-ul furnizat este necunoscut. |
| UnknownInvoice | InvoiceID-ul furnizat este necunoscut. |
| UknownPayment | PaymentID-ul furnizat este necunoscut. |
| InvoiceAlreadyPaid | Această factură are deja plăți efectuate și nu poate fi anulată. |
| InvoiceExpired | Factura nu mai este valabilă și nu va fi plătită. |

## Idempotența operațiilor

Toate operațiile definite în IServiceProvider trebuie să fie idempotente, adică rezultatul tehnic returnat și efectul de business rezultat din apelarea unei astfel de operații nu trebuie să difere dacă operația este apelată de mai multe ori cu aceiași parametri de intrare.

## Operații de serviciu

### GetOrderDetails

| Proprietate | Descriere |
|----------|-------------|
| **Semnătura** | GetOrderDetails(query: OrderDetailsQuery): OrderDetails[] |
| **Descriere** | Returnează detaliile comenzilor corespunzătoare din sistemul de înregistrare a comenzilor al prestatorului de servicii. |
| **Returnează** | Un vector de obiecte OrderDetails corespunzătoare. |
| **Observații** | Această metodă poate fi apelată de mai multe ori și, în unele cazuri, poate returna un rezultat diferit, cum ar fi un TotalAmountDue diferit pentru aceeași comandă. Acest lucru se poate întâmpla în mod natural atunci când o comandă expiră sau este modificată ulterior. MPay va considera corectă doar cea mai recentă versiune a detaliilor returnate. |

#### Parametri de intrare

| Nume | Tip | Descriere |
|------|------|-------------|
| query | OrderDetailsQuery | O structură care conține criteriile de căutare a detaliilor comenzii. |

#### Erori

| Cod | Motiv |
|------|--------|
| InvalidParameter | Un parametru de intrare este invalid. Vă rugăm să furnizați detaliile corespunzătoare în Fault Reason. |
| UnknownService | ServiceID-ul furnizat este necunoscut. |

### ConfirmOrderPayment

| Proprietate | Descriere |
|----------|-------------|
| **Semnătura** | ConfirmOrderPayment(confirmation: PaymentConfirmation) |
| **Descriere** | Confirmă o plată pentru o comandă. |
| **Returnează** | void |
| **Observații** | În unele cazuri, această metodă poate fi apelată de mai multe ori pentru aceeași plată (identificată în mod unic prin PaymentID). Asigurați-vă că aceste apeluri nu vor duce la aplicarea mai multor plăți aceleiași Comenzi. |

#### Parametri de intrare

| Nume | Tip | Descriere |
|------|------|-------------|
| confirmation | PaymentConfirmation | O structură care descrie confirmarea plății. |

#### Erori

| Cod | Motiv |
|------|--------|
| InvalidParameter | Un parametru de intrare este invalid. Vă rugăm să furnizați detaliile corespunzătoare în Fault Reason. |
| UnknownService | ServiceID-ul furnizat este necunoscut. |
| UnknownOrder | OrderKey-ul furnizat este necunoscut. |

## Structuri

**Important.** Ordinea în care sunt descriși membrii mai jos are doar scop descriptiv. Ordinea reală a elementelor în structurile XML efective, așa cum sunt definite în WSDL, este alfabetică. Pentru o implementare corectă, se recomandă utilizarea unor instrumente automate de conversie WSDL în limbajul dumneavoastră de programare.

### OrderDetailsQuery

| Membru | Tip | Obligatoriu/Opțional | Descriere |
|--------|------|-------------------|-------------|
| ServiceID | string (36) | Obligatoriu | Identificatorul serviciului. |
| OrderKey | string (36) | Obligatoriu | Cheia comenzii în cadrul serviciului. |
| Language | string (2) | Opțional, implicit: RO | Limba în care trebuie returnați membrii de text localizabili. Limbi disponibile: ro, ru și en. |

### OrderDetails

| Membru | Tip | Obligatoriu/Opțional | Descriere |
|--------|------|-------------------|-------------|
| ServiceID | string (36) | Obligatoriu | Identificatorul serviciului. |
| OrderKey | string (36) | Obligatoriu | Cheia comenzii în cadrul serviciului. |
| Reason | string (50) | Obligatoriu | Motivul plății acestei comenzi. Localizabil. |
| Status | OrderStatus | Obligatoriu | Statusul comenzii. Statusul indică în ce stare se află comanda și dacă este eligibilă pentru plată sau nu. |
| IssuedAt | DateTime | Opțional | Data și ora la care comanda a fost înregistrată în sistemul back-office. |
| DueDate | DateTime | Opțional | Data limită până la care comanda poate fi plătită. Când această proprietate nu este setată, comanda nu are dată de expirare pentru acceptarea plăților. |
| TotalAmountDue | decimal | Opțional | Suma totală datorată pentru comandă. Indică cât trebuie să accepte MPay la plata comenzii.<br><br>Dacă această proprietate nu are valoare, este un semnal că suma datorată pentru comandă nu este încă cunoscută. De asemenea, dacă unul dintre tagurile AllowPartialPayment sau AllowAdvancePayment este setat pe TRUE, MPay va permite plătitorului să introducă informația privind suma. |
| Currency | CurrencyCode | Obligatoriu | Moneda în care trebuie efectuată plata comenzii (de ex. MDL). |
| AllowPartialPayment | boolean | Opțional, implicit: false | Un indicator care arată dacă sunt permise plăți parțiale pentru comandă (poate fi zero sau mai mare). Dacă este TRUE, plătitorul poate plăti integral sau parțial suma afișată. Dacă plătitorul a plătit o parte din sumă, la o nouă căutare a comenzii după Orderkey, Prestatorul de Servicii (e-serviciul) trebuie să returneze doar diferența dintre suma totală și suma plătită. |
| AllowAdvancePayment | boolean | Opțional, implicit: false | Un indicator care arată dacă comanda poate fi plătită în avans, adică cu o sumă mai mare decât cea necesară. |
| CustomerType | CustomerType | Obligatoriu | Tipul clientului pentru care a fost creată această comandă. |
| CustomerID | string (13) | Obligatoriu | Identificatorul clientului (de ex. IDNP sau IDNO). |
| CustomerName | string (60) | Obligatoriu | Numele clientului. |
| Lines | array of OrderLine | Obligatoriu, cel puțin un OrderLine | Conține informații structurate pentru liniile individuale de plată ale comenzii. Fiecare informație de comandă (adică instanța OrderDetail) trebuie să aibă cel puțin o linie definită în proprietatea Lines. |
| Properties | array of OrderProperty | Opțional | Proprietăți contextuale extinse pentru comandă. De exemplu, la plata facturii de electricitate, o proprietate relevantă ar putea fi numărul de kW inclus la plată. |

### OrderLine

| Membru | Tip | Obligatoriu/Opțional | Descriere |
|--------|------|-------------------|-------------|
| LineID | string (36) | Obligatoriu | Identificatorul liniei în cadrul liniilor comenzii. |
| Reason | string (50) | Obligatoriu | Motivul plății aferent acestei linii. Localizabil. |
| AmountDue | decimal | Opțional | Suma datorată pentru această linie. |
| AllowPartialPayments | boolean | Opțional, implicit: conform valorii din OrderDetails | Un indicator care arată dacă linia permite plăți parțiale. |
| AllowAdvancePayments | boolean | Opțional, implicit: conform valorii din OrderDetails | Un indicator care arată dacă linia permite plăți în avans. |
| DestinationAccount | PaymentAccount | Obligatoriu | Indică detaliile contului de Trezorerie sau ale contului Bancar către care va fi transferată în final suma primită pentru această linie.<br><br>Detaliile netransmise în acest câmp vor avea valorile implicite ale prestatorului de servicii, dacă există (conform acordului sau contractului). În cazul în care valorile lipsesc, tranzacția nu va fi decontată (transferată). |
| Properties | array of OrderProperty | Opțional | Proprietăți contextuale extinse pentru linia comenzii. De exemplu, la plata facturii de electricitate, o proprietate relevantă ar putea fi numărul de kW inclus la plată. Proprietățile extinse ale liniei comenzii sunt opționale. |

### OrderProperty

| Membru | Tip | Obligatoriu/Opțional | Descriere |
|--------|------|-------------------|-------------|
| Name | string (36) | Obligatoriu | Numele proprietății. Poate conține doar litere, cifre și spații. |
| DisplayName | string (36) | Obligatoriu, implicit: în RO | Numele afișat al proprietății. Obligatoriu în limba RO. |
| Value | string (255) | Obligatoriu | Valoarea proprietății. Obligatoriu în limba RO. |
| Modifiable | boolean | Opțional, implicit: false | Un indicator care arată că proprietatea poate fi modificată de plătitor în momentul plății. Un exemplu relevant ar fi codul fiscal al plătitorului atunci când este necunoscut, sau indicația curentă în kW a contorului de electricitate. |
| Required | boolean | Opțional, implicit: false | Un indicator care arată dacă proprietatea trebuie completată obligatoriu de plătitor sau nu. |
| Type | string | Opțional, implicit: string | Tipul proprietății. Sunt suportate în prezent următoarele tipuri:<br>- string, orice șir de caractere;<br>- idn, adică un IDNP valid (identificator personal) sau IDNO (identificator de organizație);<br>- tc, un cod fiscal, fie un IDNx (vezi mai sus), fie orice șir de caractere care conține caractere nenumerice (minim 5 caractere). |

### PaymentConfirmation

| Membru | Tip | Obligatoriu/Opțional | Descriere |
|--------|------|-------------------|-------------|
| ServiceID | string (36) | Obligatoriu | Identificatorul serviciului pentru care s-a efectuat plata. |
| OrderKey | string (36) | Obligatoriu | Cheia comenzii în cadrul serviciului pentru care s-a efectuat plata. |
| InvoiceID | string (36) | Opțional | Identificatorul facturii pentru această operațiune de plată. |
| PaymentID | string (36) | Obligatoriu | Identificatorul efectiv al tranzacției de Plată, unic în cadrul MPay. |
| PaidAt | DateTime | Obligatoriu | Data și ora tranzacției de plată. |
| TotalAmount | decimal | Obligatoriu | Suma totală primită în această tranzacție de plată. |
| Currency | CurrencyCode | Obligatoriu | Moneda tranzacției de plată. |
| Lines | array of PaymentConfirmationLine | Obligatoriu, cel puțin un obiect de tip PaymentConfirmationLine | Informații detaliate despre fiecare linie de plată din cadrul acestei tranzacții de plată. |
| Properties | array of PaymentProperty | Opțional | Valorile proprietăților extinse modificabile pentru comanda plătită în această tranzacție de plată. |

### PaymentConfirmationLine

| Membru | Tip | Obligatoriu/Opțional | Descriere |
|--------|------|-------------------|-------------|
| LineID | string (36) | Obligatoriu | Identificatorul liniei de plată în cadrul liniilor comenzii. |
| Amount | decimal | Obligatoriu | Suma plătită pentru această linie în cadrul plății. |
| DestinationAccount | PaymentAccount | Obligatoriu | Contul destinatar utilizat pentru această linie de plată. |
| Properties | Array of PaymentProperty | Opțional | Valorile proprietăților extinse modificabile pentru linia comenzii plătite în această tranzacție de plată |

### PaymentAccount

| Membru | Tip | Obligatoriu/Opțional | Descriere |
|--------|------|-------------------|-------------|
| ConfigurationCode | string (36) | Opțional | Codul unei configurații predefinite de cont. |
| BankCode | string (20) | Obligatoriu | Codul băncii destinatare. (ex. TREZMD2X ) |
| Service Provider FiscalCode | string (20) | Obligatoriu | Codul fiscal (de ex. IDNO) al Prestatorului de Servicii. |
| BankAccount | string (24) | Obligatoriu | Numărul contului bancar destinatar / numărul contului de Trezorerie (IBAN) |
| BeneficiaryName | string (60) | Obligatoriu | Numele beneficiarului (Instituție/Companie). (ex. Administrația de Stat a Drumurilor) |

### PaymentProperty

| Membru | Tip | Obligatoriu/Opțional | Descriere |
|--------|------|-------------------|-------------|
| Name | string (36) | Obligatoriu | Numele proprietății de plată. |
| Value | string (255) | Opțional | Valoarea proprietății de plată. |

## Enumerări

| Membru | Descriere |
|---|---|
| **OrderStatus** | |
| Active | Comanda este activă și poate fi plătită. (Poate fi plătită) |
| PartiallyPaid | Comanda a fost plătită parțial și mai poate fi plătită suplimentar. (Poate fi plătită) |
| Paid | Comanda este plătită integral. (Deja plătită) |
| Completed | Comanda este finalizată, adică serviciul a fost livrat. (Nu poate fi plătită) |
| Expired | Comanda a expirat și nu mai poate fi plătită. (Nu poate fi plătită) |
| Cancelled | Comanda este anulată și nu poate fi plătită. (Nu poate fi plătită) |
| Refunding | Comanda este în curs de rambursare. (Nu poate fi plătită) |
| Refunded | Comanda a fost rambursată. (Nu poate fi plătită) |
| **CustomerType** | |
| Person | Clientul este o Persoană. |
| Organization | Clientul este o Organizație. |
| **CurrencyCode** | |
| *(toate)* | MPay folosește codurile de monedă ISO 4217. Lista de mai jos este doar un subset al codurilor active. |
| MDL | Leu moldovenesc |
| EUR | Euro |
| USD | Dolar american |
