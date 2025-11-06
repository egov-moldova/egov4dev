#Referință API

##**Procesarea plății online**

În cazul plății online (card not present, ecommerce), prestatorul de servicii trebuie să redirecționeze browserul către pagina de plată a MPay. WEB serviciul va comunica prin protocolul standard HTTP (HTTP / 1.1) și va acorda permisiunea de acces pentru IP-ul clientului (doar pe mediul test).
Descrierea parametrilor implicați în această redirecționare.

<table>
  <tbody>
    <tr>
      <th>Metoda</th>
      <td>POST</td>
    </tr>
    <tr>
      <th>URL</th>
      <td>
        Test <a href="https://testmpay.gov.md/service/pay" target="_blank">https://testmpay.gov.md/service/pay</a><br>
        Prod <a href="https://mpay.gov.md/service/pay" target="_blank">https://mpay.gov.md/service/pay</a>
      </td>
    </tr>
    <tr>
      <th>Descriere</th>
      <td>Utilizatorul efectuează plata online direct (card (card not present - ecommerce), Apple Pay, Google Pay, Instant payment (MIA), internet banking, e-money)
        sau să acceseze instrucțiunile altor metode de plată.</td>
    </tr>
  </tbody>
</table>

**Forma sau parametrii URL**

<table>
  <thead>
    <tr>
      <th>Nume</th>
      <th>Tip</th>
      <th>Obligatoriu/Opțional</th>
      <th>Descriere</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ServiceID</td>
      <td>string</td>
      <td>Obligatoriu</td>
      <td>Identificatorul serviciului în MPay</td>
    </tr>
    <tr>
      <td>OrderKey</td>
      <td>string</td>
      <td>Obligatoriu</td>
      <td>
        Indentificatorul comenzii la prestatorul de serviciu. Aceasta trebuie să fie generat în mod unic pentru
        fiecare comandă (cum ar fi cheia primară sau alt tip de număr de referință).
      </td>
    </tr>
    <tr>
      <td>ReturnUrl</td>
      <td>URL</td>
      <td>Opțional</td>
      <td>
        Adresa URL pe care MPay va redirecționa plătitorul după plata comenzii reușită. Această pagină va fi redirecționată
        prin metoda GET HTTP/S. Asigurați-vă că codificați URL-ul pentru orice parametri pe care îi utilizați pentru a crea această adresă URL.
      </td>
    </tr>
  </tbody>
</table>

##**Reguli de tratare a erorilor**

Erorile rezultate la apelarea interfeței SOAP, MPay se așteaptă la tipul de erori **SOAP faults** cu **fault code** și **fault reason** care sunt descrise în limba engleză. Traducerea erorilor în limba română este opțională. Dacă nu există nici o eroare SOAP returnată de la prestatorul de servicii, MPay consideră că aplearea operațiunii s-a finalizat cu succes, ceea ce înseamnă că tranzacția este validă.

<table>
  <thead>
    <tr>
      <th>Fault Code</th>
      <th>Descriere</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>InternalError</td>
      <td>Eroare internă neașteptată</td>
    </tr>
    <tr>
      <td>AuthenticationFailed</td>
      <td>Procesul de autentificare a consumatorului de web serviciu a eșuat. Consultați Autentificarea</td>
    </tr>
    <tr>
      <td>AuthorizationFailed</td>
      <td>Procesul de autorizare a consumatorului de web serviciu a eșuat. Vezi Eroarea! Sursa de referință nu a fost găsită</td>
    </tr>
    <tr>
      <td>InvalidParameter</td>
      <td>Parametru de intrare este nevalid. Examinați textul Motivului (fault result) returnat și descrierea operațiunii apelate</td>
    </tr>
    <tr>
      <td>UnknownService</td>
      <td>ServiceID-ul nu coincide cu cel al prestatorului de serviciu</td>
    </tr>
    <tr>
      <td>UnknownOrder</td>
      <td>Identificatorul comenzii la prestatorul de serviciu este necunoscut</td>
    </tr>
    <tr>
      <td>UnknownInvoice</td>
      <td>InvoiceID-ul este necunoscut</td>
    </tr>
    <tr>
      <td>UknownPayment</td>
      <td>PaymentID-ul este necunoscut</td>
    </tr>
    <tr>
      <td>InvoiceAlreadyPaid</td>
      <td>Nota de plată MPay cu indentificatorul căutat deține unele încasări și nu poate fi anulată</td>
    </tr>
    <tr>
      <td>InvoiceExpired</td>
      <td>Nota de plată MPay nu mai este valabilă și nu va fi achitată</td>
    </tr>
  </tbody>
</table>

##**Operațiunile idempotente**

Toate apelurile si structurile definite în **IServiceProvider** trebuie să fie idempotente, adică indiferent de numărul de apeluri cu aceleași parametri de intrare, rezultatul returnat și efectul de business al apelării nu trebuie să fie diferit.

##**Operațiunia GetOrderDetails**

<table>
  <tbody>
    <tr>
      <th><strong>Semnatura</strong></hd>
      <td colspan="3">GetOrderDetails(query: OrderDetailsQuery) :OrderDetails[]</td>
    </tr>
    <tr>
      <td><strong>Descrierea</strong></hd>
      <td colspan="3">Returnează detaliile comenzilor, potrivit parametrilor de intrare, din sistemul informațional al prestatorului de servicii</td>
    </tr>
    <tr>
      <th><strong>Retur</strong></hd>
      <td colspan="3">Un șir de obiecte, de tip <strong>OrderDetails</strong>, conform criteriilor de căutare</td>
    </tr>
    <tr>
      <th><strong>Remarci</strong></th>
      <td colspan="3">Această metodă poate fi apelată de mai multe ori și în unele cazuri prestatorul de serviciu poate returna un rezultat diferit, cum ar fi valoarea din TotalAmountDue sau OrderStatus, pentru același număr comandă. Aceasta se poate întâmpla atunci când o comandă este modificată ulterior de către prestatorul de servicii. În acest caz MPay deține detaliile de plată conform ultimei căutări a comenzii la prestatorul de servicii, ca urmare suma sau statutul rămân neactualizată.</td>
    </tr>
  </tbody>
</table>

###**Parametrii de intrare**

<table>
  <thead>
    <tr>
      <th>Nume</th>
      <th>Tip</th>
      <th>Descriere</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>query</td>
      <td>OrderDetailsQuery</td>
      <td>O structură de date care conține criterii de interpelare a detaliilor comenzii</td>
    </tr>
  </tbody>
</table>

###**Erori**

<table>
  <thead>
    <tr>
      <th>Cod</th>
      <th>Motiv</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>InvalidParameter</td>
      <td>Un parametru de intrare este nevalid. Vă rugăm să oferiți detaliile corespunzătoare în <strong>Falut reason</strong>.</td>
    </tr>
    <tr>
      <td>UnknownService</td>
      <td>ServiceID-ul nu coincide cu cel a web serviciului</td>
    </tr>
  </tbody>
</table>


##**Operațiunia ConfirmOrderPayment**

<table>
  <tbody>
    <tr>
      <th><strong>Semnatura</strong></hd>
      <td colspan="3">ConfirmOrderPayment (confirmation:PaymentConfirmation)</td>
    </tr>
    <tr>
      <td><strong>Descrierea</strong></hd>
      <td colspan="3">Confirmă plata pentru comandă</td>
    </tr>
    <tr>
      <th><strong>Retur</strong></hd>
      <td colspan="3">Void</td>
    </tr>
    <tr>
      <th><strong>Remarci</strong></th>
      <td colspan="3">În unele cazuri, această metodă poate fi apelată de mai multe ori pentru aceeași plată (identificată în mod unic de proprietatea PaymentID). Asigurațivă că aceste apeluri nu vor produce dublări de plată pentru o singură comandă.</td>
    </tr>
  </tbody>
</table>

###**Parametrii de intrare**

<table>
  <thead>
    <tr>
      <th>Nume</th>
      <th>Tip</th>
      <th>Descriere</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Confirmation</td>
      <td>PaymentConfirmation</td>
      <td>O structură de date care descrie confirmarea plății</td>
    </tr>
  </tbody>
</table>

###**Erori**

<table>
  <thead>
    <tr>
      <th>Cod</th>
      <th>Motiv</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>InvalidParameter</td>
      <td>Un parametru de intrare este nevalid. Vă rugăm să oferiți detaliile corespunzătoare în <strong>Falut reason</strong>.</td>
    </tr>
    <tr>
      <td>UnknownService</td>
      <td>ServiceID-ul nu coincide cu cel a web serviciului</td>
    </tr>
    <tr>
      <td>UnknownOrder</td>
      <td>Identificatorul comenzii nu aparține web serviciului</td>
    </tr>
  </tbody>
</table>

##**Structuri de date**

!!! warning "Important"
    Ordinea în care sunt descrise structurile de date mai jos este informativă. Ordinea elementelor din structurile XML, este alfabetică așa cum este definită în WSDL. Pentru o implementare corectă, se recomandă să utilizați un framework, conform limbajului de programare, pentru implementarea automată a WSDL-lui.

!!! warning "Important"
    La utilizarea funcționalului de plăți în avans sau plăți parțiale proprietățile **AllowPartialPayment** și **AllowAdvancePayment** din **OrderLine** permit următoarele scenarii de procesare cu succes a plății:

      -**Scenariul 1:** Detaliile comenzii de plată conțin un singur **OrderLine** și una din proprietăți, conform modelului de business, **AllowPartialPayment** și **AllowAdvancePayment** trebuie să fie setat în **TRUE** atât în **OrderDetails** cît și în **OrderLine**.
      
      -**Scenariul 2:** Detaliile comenzii de plată conțin mai multe **OrderLine**<span>-uri</span>. În acest caz una din proprietățile, conform modelului de business, **AllowPartialPayment** și **AllowAdvancePayment** din **OrderDetails** trebuie setat în **TRUE**, iar primul **OrderLine** va păstra aceste proprietăți conform celor din **OrderDetails**. Celelalte **OrderLine-uri** implicit trebuie setate în **FALSE** ambele proprietăți (**AllowPartialPayment**, **AllowAdvancePayment**).

###**GetOrderDetails**

<table>
  <thead>
    <tr>
      <th><strong>Structuri de date</strong></th>
      <th><strong>Tip</strong></th>
      <th><strong>Obligatoriu/Opțional</strong></th>
      <th><strong>Descriere</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="4"><strong>OrderDetailsQuery</strong></td>
    </tr>
    <tr>
      <td>ServiceID</td>
      <td>string (36)</td>
      <td>Obligatoriu</td>
      <td>Identificatorul serviciului MPay</td>
    </tr>
    <tr>
      <td>OrderKey</td>
      <td>string (36)</td>
      <td>Obligatoriu</td>
      <td>Indentificatorul comenzii la prestatorul de serviciu.</td>
    </tr>
    <tr>
      <td>Language</td>
      <td>string (2)</td>
      <td>Opțional, implicit: RO</td>
      <td>Limba în care trebuie returnate valorile din structura de răspuns. Limbi disponibile: RO, RU și EN</td>
    </tr>
    <tr>
      <td colspan="4"><strong>OrderDetails</strong></td>
    </tr>
    <tr>
      <td>ServiceID</td>
      <td>string (36)</td>
      <td>Obligatoriu</td>
      <td>Identificatorul serviciului MPay</td>
    </tr>
    <tr>
      <td>OrderKey</td>
      <td>string (36)</td>
      <td>Obligatoriu</td>
      <td>Indentificatorul comenzii la prestatorul de serviciu.</td>
    </tr>
    <tr>
      <td>OrderKey</td>
      <td>string (36)</td>
      <td>Obligatoriu</td>
      <td>Indentificatorul comenzii la prestatorul de serviciu.</td>
    </tr>
    <tr>
      <td>Reason</td>
      <td>string (50)</td>
      <td>Obligatoriu</td>
      <td>Motivul generării cererii de plată. Disponibil implicit în RO și opțional RU și ENG
      <br><strong><span class="red-bold-text">Atenție!</span></strong> Acest câmp va reflecta valoarea sa pe bonurile de plată eliberate de prestatorii de servicii de plată (terminale de plată, ghișeele băncilor, Poșta Moldovei) în scopul identificării motivului de bază al plății.
      <br>De ex. Taxa pentru vinieta</td>
    </tr>
    <tr>
      <td>Status</td>
      <td>OrderStatus</td>
      <td>Obligatoriu</td>
      <td>Indică statutul comanzii și disponibilitatea pentru plată</td>
    </tr>
    <tr>
      <td>IssuedAt</td>
      <td>DateTime</td>
      <td>Opțional</td>
      <td>Data și ora înregistrării comanzii în sistemul informațional de back-office</td>
    </tr>
    <tr>
      <td>DueDate</td>
      <td>DateTime</td>
      <td>Opțional</td>
      <td>Indică data și ora până când comanda poate fi achitată. Dacă această proprietate nu este setată, atunci comanda nu are un termen de expirare</td>
    </tr>
    <tr>
      <td>TotalAmountDue</td>
      <td>decimal</td>
      <td>Obligatoriu, opțional în cazuri specifice</td>
      <td>Indică suma totală a comenzii. Dacă această proprietate nu are valoare, atunci suma comenzii nu este cunoscută. Pentru procesarea comenzii cu suma necunoscută trebuie ca una din următoarele proprietăți <strong>AllowPartialPayment</strong> sau <strong>AllowAdvancePayment</strong>, conform modelului de business, să fie setată ca <strong>TRUE</strong>. Astfel MPay va permite plătitorului să introducă suma spre plată.</td>
    </tr>
    <tr>
      <td>Currency</td>
      <td>CurrencyCode</td>
      <td>Obligatoriu</td>
      <td>Valuta în care se va efectua plata comenzii. Disponibil doar în valuta națională (de ex. MDL)</td>
    </tr>
    <tr>
      <td>AllowPartialPayment</td>
      <td>boolean</td>
      <td>Opțional, implicit: false</td>
      <td>Indică disponibilitatea de a efectua plăți parțiale pentru comandă unde suma poate fi zero sau mai mare. La setarea cu valoarea <strong>TRUE</strong> plătitorul poate achita integral (dacă proprietatea <strong>TotalAmoutDue</strong> are valoare setată) sau parțial (plătitorul poate edita suma afișată). Dacă plătitorul achită o parte din sumă, atunci la cautarea repetată a comanzii, prestatorul de servicii returnează detaliile comenzii spre plată cu suma restantă (diferența dintre costul serviciului și sumei/lor achitată/e)</td>
    </tr>
    <tr>
      <td>AllowAdvancePayment</td>
      <td>boolean</td>
      <td>Opțional, implicit: false</td>
      <td>Indică disponibilitatea comenzii de a fi achitată în avans cu o sumă mai mare decât cea indicată</td>
    </tr>
    <tr>
      <td>CustomerType</td>
      <td>CustomerType</td>
      <td>Obligatoriu</td>
      <td>Indică statutul plătitorului (persoană fizică sau persoană juridică) pentru care a fost creată comanda. Poate fi setată una din următoarele valori: <strong>Person</strong> sau <strong>Organization</strong></td>
    </tr>
    <tr>
      <td>CustomerID</td>
      <td>string (13)</td>
      <td>Obligatoriu</td>
      <td>Sistemul informațional la prestatorul de servicii va indica identificatorul beneficiarului fie persoană fizică sau juridică (de ex. IDNP sau IDNO).
      <br>Dacă beneficiarul nu deține INDP/IDNO se va indica seria și numărul pașaportului sau identificatorul oraganizației din străinătate.
      <br>Dacă sistemul infomațional nu are dreptul sau posibilitatea de a colecta datele beneficiatului, atunci câmpul va rămâne vid. În acest caz S.I. MPay va colecta datele în momentul achitării.</td>
    </tr>
    <tr>
      <td>CustomerName</td>
      <td>string (60)</td>
      <td>Obligatoriu</td>
      <td>Numele plătitorului sau denumiearea instituției</td>
    </tr>
    <tr>
      <td>Lines</td>
      <td>array of OrderLine</td>
      <td>Obligatoriu, cel puțin un obiect de tip OrderLine</td>
      <td>Conține informații structurate pentru detaliile comenzii setate în proprietatea Lines.
      <br>Fiecare obiect de tip <strong>OrderLine</strong>, membru a proprietății Lines, conține informații detaliate despre serviciul solicitat. O comandă poate deține mai multe servicii descrise in <strong>OrderLine</strong>.</td>
    </tr>
    <tr>
      <td>ServiceID</td>
      <td>string (36)</td>
      <td>Obligatoriu</td>
      <td>Identificatorul serviciului MPay</td>
    </tr>
    <tr>
      <td>Properties</td>
      <td>array of OrderProperty</td>
      <td>Opțional</td>
      <td>Obiecte de tip <strong>OrderProperty</strong> adaugă informații suplimentare aferente comenzii.
      <br>De ex. Informații adiționale ale plătitorului cum ar fi termenul devalabilitate al vinietei în sistemul informațional la prestatorul de servicii (Administrația Națională a Drumurilor)</td>
    </tr>
    <tr><td colspan="4"><strong>OrderLine</strong></td></tr>
    <tr>
      <td>LineID</td>
      <td>string (36)</td>
      <td>Obligatoriu</td>
      <td>Identificatorul unic a obiectului <strong>OrderLine</strong></td>
    </tr>
    <tr>
      <td>Reason</td>
      <td>string (50)</td>
      <td>Obligatoriu</td>
      <td>Descrierea serviciului aferent obiectului <strong>OrderLine</strong>.
      <br>De ex. Taxa pentru vinieta pe termen de 1 lună</td>
    </tr>
    <tr>
      <td>AmountDue</td>
      <td>decimal</td>
      <td>Opțional</td>
      <td>Suma datorată serviciului. Suma trebuie să coincidă cu valoarea din <strong>TotalAmoutDue</strong> în cazul în care comanda conține un singur obiect de tip <strong>OrderLine</strong>. Dacă comanda conține mai multe servicii atunci valoarea totală a proprietății <strong>AmoutDue</strong> din fiecare <strong>OrderLine</strong> trebuie să conicidă cu valoarea din <strong>TotalAmoutDue</strong>.
      </td>
    </tr>
    <tr>
      <td>AllowPartialPayments</td>
      <td>boolean</td>
      <td>Opțional, implicit: cum este în <strong>OrderDetails</strong> cu condiția că acest <strong>OrderLine</strong> este unicul</td>
      <td>Indică disponibilitatea achitării parțiale per serviciu (<strong>OrderLine</strong>)</td>
    </tr>
    <tr>
      <td>AllowAdvancePayments</td>
      <td>boolean</td>
      <td>Opțional, implicit: cum este în <strong>OrderDetails</strong> cu condiția că acest <strong>OrderLine</strong> este unicul</td>
      <td>Indică disponibilitatea achitării în avans per serviciu (<strong>OrderLine</strong>)</td>
    </tr>
    <tr>
      <td>DestinationAccount</td>
      <td>PaymentAccount</td>
      <td>Obligatoriu</td>
      <td>Indică contul trezorerial sau bancar în care se vor debita banii. În cazul în care valorile lipsesc, tranzacția nu va fi decontată (transferată)</td>
    </tr>
     <tr>
      <td>Properties</td>
      <td>array of OrderProperty</td>
      <td>Opțional</td>
      <td>Obiecte de tip <strong>OrderProperty</strong> adaugă informații suplimentare aferente serviciului (<strong>OrderLine</strong>).
      <br>De ex. atunci când plătiți vinieta, o proprietate relevantă ar putea fi perioada de valabilitate inclusă ca detalii suplimentare pentru plata serviciului</td>
    </tr>
    <tr><td colspan="4"><strong>OrderProperty</strong></td></tr>
     <tr>
      <td>Name</td>
      <td>string (36)</td>
      <td>Obligatoriu</td>
      <td>Denumirea proprietății. Poate conține doar litere, cifre și spații</td>
    </tr>
     <tr>
      <td>DisplayName</td>
      <td>string (36)</td>
      <td>Obligatoriu, implicit: RO</td>
      <td>Denumirea proprietății afișată utilizatorului, obligatoriu în limba RO 
      <br>Limbi disponibile: RO, RU și EN</td>
    </tr>
     <tr>
      <td>Value</td>
      <td>string (255)</td>
      <td>Obligatoriu</td>
      <td>Valoarea proprietății afișată utilizatorului, implicit în limba RO Limbi disponibile: RO, RU și EN</td>
    </tr>
     <tr>
      <td>Modifiable</td>
      <td>boolean</td>
      <td>Opțional, implicit: false</td>
      <td>Opțiunea care indică faptul că proprietatea poate fi modificată de către plătitor în sistemul prestatorului de serviciu până la efectuarea plății.
      <br>De exemplu: Numărul de înregistrare a vehiculului</td>
    </tr>
     <tr>
      <td>Required</td>
      <td>boolean</td>
      <td>Opțional, implicit: false</td>
      <td>Opțiunea care indică dacă proprietatea trebuie să fie completată de către plătitor</td>
    </tr>
     <tr>
      <td>Type</td>
      <td>string (36)</td>
      <td>Opțional, implicit: string</td>
      <td>Orice șir de caractere</td>
    </tr>
  </tbody>
</table>

###**ConfirmOrderPayment**

<table>
  <thead>
    <tr>
      <th><strong>Structuri de date</strong></th>
      <th><strong>Tip</strong></th>
      <th><strong>Obligatoriu/Opțional</strong></th>
      <th><strong>Descriere</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="4"><strong>PaymentConfirmation</strong></td>
    </tr>
    <tr>
      <td>ServiceID</td>
      <td>string (36)</td>
      <td>Obligatoriu</td>
      <td>Identificatorul serviciului MPay</td>
    </tr>
    <tr>
      <td>OrderKey</td>
      <td>string (36)</td>
      <td>Obligatoriu</td>
      <td>Indentificatorul comenzii la prestatorul de serviciu.</td>
    </tr>
    <tr>
      <td>InvoiceID</td>
      <td>string (36)</td>
      <td>Opțional</td>
      <td>Identificatorul notei de plată MPay</td>
    </tr>
    <tr>
      <td>PaidAt</td>
      <td>DateTime</td>
      <td>Obligatoriu</td>
      <td>Data și ora confirmării plăți</td>
    </tr>
    <tr>
      <td>TotalAmount</td>
      <td>decimal</td>
      <td>Obligatoriu</td>
      <td>Suma totală a tranzacție</td>
    </tr>
    <tr>
      <td>Lines</td>
      <td>array of PaymentConfirmationLine</td>
      <td>Obligatoriu, cel puțin un obiect de tip <strong>PaymentConfirmationLine</strong></td>
      <td>Conține informații structurate pentru detaliile comenzii setate în proprietatea Lines. Fiecare obiect de tip <strong>PaymentConfirmationLine</strong>, membru a proprietății Lines, conține informații detaliate despre serviciul solicitat. O comandă poate deține mai multe servicii descrise in <strong>PaymentConfirmationLin</strong></td>
    </tr>
    <tr>
      <td>Properties</td>
      <td>array of PaymentProperty</td>
      <td>Opțional</td>
      <td>Obiecte de tip <strong>PaymentProperty</strong> adaugă informații suplimentare aferente serviciului.</td>
    </tr>
    <tr>
      <td>ServiceID</td>
      <td>string (36)</td>
      <td>Obligatoriu</td>
      <td>Identificatorul serviciului MPay</td>
    </tr>
    <tr><td colspan="4">PaymentConfirmationLine</td></tr>
    <tr>
      <td>LineID</td>
      <td>string (36)</td>
      <td>Obligatoriu</td>
      <td>Identificatorul unic a obiectului <strong>PaymentConfirmationLine</strong></td>
    </tr>
    <tr>
      <td>Amount</td>
      <td>decimal</td>
      <td>Obligatoriu</td>
      <td>Suma tranzacției pentru serviciu</td>
    </tr>
    <tr>
      <td>DestinationAccount</td>
      <td>PaymentAccount</td>
      <td>Obligatoriu</td>
      <td>Indică contul trezorerial sau bancar în care au fost debitați banii.</td>
    </tr>
    <tr>
      <td>Properties</td>
      <td>array of PaymentProperty</td>
      <td>Opțional</td>
      <td>Obiecte de tip <strong>PaymentProperty</strong> adaugă informații suplimentare aferente serviciului.</td>
    </tr>
    <tr><td colspan="4">PaymentProperty</td></tr>
    <tr>
      <td>Name</td>
      <td>string (36)</td>
      <td>Obligatoriu</td>
      <td>Numele proprietății</td>
    </tr>
    <tr>
      <td>Value</td>
      <td>string (255)</td>
      <td>Opțional</td>
      <td>Valoarea proprietății</td>
    </tr>
  </tbody>
</table>

###**PaymentAccount**

<table>
  <thead>
    <tr>
      <th><strong>Structuri de date</strong></th>
      <th><strong>Tip</strong></th>
      <th><strong>Obligatoriu/Opțional</strong></th>
      <th><strong>Descriere</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="4"><strong>PaymentAccount</strong></td>
    </tr>
    <tr>
      <td>ConfigurationCode</td>
      <td>string (36)</td>
      <td>Opțional</td>
      <td>Identificatorul unei configurații de cont predefinite</td>
    </tr>
    <tr>
      <td>BankCode</td>
      <td>string (20)</td>
      <td>Obligatoriu</td>
      <td>Codul băncii destinatare (de ex. TREZMD2X)</td>
    </tr>
    <tr>
      <td>BankFiscalCode</td>
      <td>string (20)</td>
      <td>Obligatoriu</td>
      <td>Codul fiscal al prestatorului de servicii (<strong>IDNO</strong>)</td>
    </tr>
    <tr>
      <td>BankAccount</td>
      <td>string (24)</td>
      <td>Obligatoriu</td>
      <td>Numărul contului bancar sau trezorerial al prestatorului de servicii (<strong>IBAN</strong>)</td>
    </tr>
    <tr>
      <td>BeneficiaryName</td>
      <td>string (60)</td>
      <td>Obligatoriu</td>
      <td>Denumirea beneficiarului (de ex. Administrația Națională a Drumurilor)</td>
    </tr>
  </tbody>
</table>

##**Enumerații**

<table>
  <thead>
    <tr>
      <th><strong>Membru</strong></th>
      <th colspan="2"><strong>Descriere</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr><td colspan="3"><strong>Statutul Comenzii (OrderStatus)</strong></td></tr>
    <tr>
      <td>Active</td>
      <td>Comanda este activă și poate fi achitată</td>
      <td>Poate fi achitată</td>
    </tr>
    <tr>
      <td>PartiallyPaid</td>
      <td>Comanda a fost achitată parțial sau în avans. Pot fi efectuate tranzacții adiționale</td>
      <td>Poate fi achitată</td>
    </tr>
    <tr>
      <td>Paid</td>
      <td>Comanda este achitată integral</td>
      <td>Achitată</td>
    </tr>
    <tr>
      <td>Completed</td>
      <td>Comanda este finalizată, adică serviciul este prestat</td>
      <td>Nu poate fi achitată</td>
    </tr>
    <tr>
      <td>Expired</td>
      <td>Comanda a expirat și nu poate fi achitată</td>
      <td>Nu poate fi achitată</td>
    </tr>
    <tr>
      <td>Cancelled</td>
      <td>Comanda este anulată și nu poate fi achitată</td>
      <td>Nu poate fi achitată</td>
    </tr>
    <tr>
      <td>Refunding</td>
      <td>Comanda este în proces de rambursare</td>
      <td>Nu poate fi achitată</td>
    </tr>
    <tr>
      <td>Refunded</td>
      <td>Comanda a fost rambursată</td>
      <td>Nu poate fi achitată</td>
    </tr>
    <tr><td colspan="3"><strong>CustomerType</strong></td></tr>
    <tr>
      <td>Person</td>
      <td colspan="2">Consumatorul este persoană fizică</td>
    </tr>
    <tr>
      <td>Organization</td>
      <td colspan="2">Consumatorul este persoană juridică</td>
    </tr>
    <tr><td colspan="3"><strong>CurrencyCode</strong></td></tr>
    <tr><td colspan="3">MPay utilizează codul de valute ISO 4217. Următoarea listă este doar un subset al codurilor active.</td></tr>
    <tr>
      <td>MDL</td>
      <td colspan="2">Leu Moldovenesc</td>
    </tr>
    <tr>
      <td>EUR</td>
      <td colspan="2">Euro</td>
    </tr>
    <tr>
      <td>USD</td>
      <td colspan="2">Dolar American</td>
    </tr>
  </tbody>
</table>
