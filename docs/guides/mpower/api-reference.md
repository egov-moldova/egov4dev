# Referință API

##**Gestionarea erorilor**

!!! note "Notă"
Componenta MPower Client API va returna erorile REST API cu codul de eroare și cauza; descrierile vor fi afișate în limba engleză.

<table>
  <thead>
    <tr>
      <th>Cod eroare</th>
      <th>Descriere</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>AuthenticationFailed</td>
      <td>Procesul de autentificare a consumatorului serviciului a eșuat. Vezi secțiunea Autentificare</td>
    </tr>
    <tr>
      <td>InvalidParameter</td>
      <td>Un parametru de intrare este invalid. Consultați textul Fault Reason returnat și descrierea operațiunii apelate.</td>
    </tr>
    <tr>
      <td>200</td>
      <td>Succes</td>
    </tr>
    <tr>
      <td>400</td>
      <td>Cerere invalidă, validarea a eșuat. Verificați respectarea regulilor de validare</td>
    </tr>
    <tr>
      <td>401</td>
      <td>Acces neautorizat. Verificați cerințele de autorizare</td>
    </tr>
    <tr>
      <td>403</td>
      <td>Interzis. Acțiunea solicitată nu este permisă pentru ID-ul transmis</td>
    </tr>
    <tr>
      <td>404</td>
      <td>Negăsit. Verificați datele trimise în cerere</td>
    </tr>
    <tr>
      <td>500</td>
      <td>A survenit o eroare de server. Lipsă conexiune cu baza de date, din alte motive decât: 400 / 401 / 501. Contactați administratorul.</td>
    </tr>
    <tr>
      <td>501</td>
      <td>A survenit o eroare de server. Contactați administratorul.</td>
    </tr>
  </tbody>
</table>

##**Descrierea metodelor API**

###**Verificarea valabilității împuternicirii**

!!! note "Notă"
Deoarece această metodă poate fi apelată de mai multe ori, în zile/momente diferite, răspunsul poate varia: la un anumit moment împuternicirea poate să nu mai fie valabilă din cauza expirării, revocării, renunțării, suspendării etc.

<table>
  <thead>
    <tr>
      <th>Semnătura apelului</th>
      <th colspan="2">GET /api/Authorization/check/Code-True-One</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Descriere</strong></td>
      <td colspan="2">Pe baza codului de împuternicire, returnează o înregistrare care indică dacă împuternicirea este valabilă sau anulată.</td>
    </tr>
    <tr>
      <td colspan="3"><strong>Parametri de intrare/ieșire</strong></td>
    </tr>
     <tr>
      <td><strong>Nume</strong></td>
      <td><strong>Tip</strong></td>
      <td><strong>Descriere</strong></td>
    </tr>
     <tr>
      <td><strong>Query</strong></td>
      <td>"authorizationCode"</td>
      <td>Codul unic de identificare, din 16 cifre, al împuternicirii.</td>
    </tr>
     <tr>
      <td><strong>Response</strong></td>
      <td>"data": = True sau False</td>
      <td>Dacă valoarea returnată este True, împuternicirea este valabilă; dacă este False, nu este valabilă.</td>
    </tr>
     <tr>
      <td colspan="3"><strong>Erori (Faults)</strong></td>
    </tr>
     <tr>
      <td><strong>Cod</strong></td>
      <td><strong>Motiv</strong></td>
    </tr>
     <tr>
      <td>200</td>
      <td colspan="2">Succes</td>
    </tr>
     <tr>
      <td>404</td>
      <td colspan="2">Negăsit. Verificați datele trimise în cerere</td>
    </tr>
     <tr>
      <td>500</td>
      <td colspan="2">A survenit o eroare de server. Lipsă conexiune cu baza de date, din alte motive decât: 400 / 401 / 501. Contactați administratorul.</td>
    </tr>
     <tr>
      <td>501</td>
      <td colspan="2">A survenit o eroare de server. Contactați administratorul.</td>
    </tr>
  </tbody>
</table>

###**Obținerea detaliilor împuternicirii**

<table>
  <thead>
    <tr>
      <th>Semnătura apelului</th>
      <th colspan="2">GET /api/Authorization/check/Code-Details-One</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Descriere</strong></td>
      <td colspan="2">Pe baza codului de împuternicire, returnează o înregistrare cu o structură de date care conține detaliile împuternicirii identificate.</td>
    </tr>
    <tr>
      <td colspan="3"><strong>Parametri de intrare/ieșire</strong></td>
    </tr>
     <tr>
      <td><strong>Nume</strong></td>
      <td><strong>Tip</strong></td>
      <td><strong>Descriere</strong></td>
    </tr>
     <tr>
      <td><strong>Query</strong></td>
      <td>"authorizationCode"</td>
      <td>Codul unic de identificare, din 16 cifre, al împuternicirii.</td>
    </tr>
     <tr>
      <td><strong>Response</strong></td>
      <td>AuthorizationDetails</td>
      <td>O structură de date care conține detaliile împuternicirii identificate.</td>
    </tr>
     <tr>
      <td colspan="3"><strong>Erori (Faults)</strong></td>
    </tr>
     <tr>
      <td><strong>Cod</strong></td>
      <td><strong>Motiv</strong></td>
    </tr>
     <tr>
      <td>200</td>
      <td colspan="2">Succes</td>
    </tr>
     <tr>
      <td>404</td>
      <td colspan="2">Negăsit. Verificați datele trimise în cerere</td>
    </tr>
     <tr>
      <td>500</td>
      <td colspan="2">A survenit o eroare de server. Lipsă conexiune cu baza de date, din alte motive decât: 400 / 401 / 501. Contactați administratorul.</td>
    </tr>
     <tr>
      <td>501</td>
      <td colspan="2">A survenit o eroare de server. Contactați administratorul.</td>
    </tr>
  </tbody>
</table>

###**Verificarea valabilității împuternicirii după codul tipului**

<table>
  <thead>
    <tr>
      <th>Semnătura apelului</th>
      <th colspan="2">GET /api/Authorization/check/TypeCode-Valid-One</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Descriere</strong></td>
      <td colspan="2">Pe baza codului tipului de împuternicire, Idn1 și Idn2, returnează o înregistrare cu o structură de date care indică dacă împuternicirea este valabilă sau anulată.</td>
    </tr>
    <tr>
      <td colspan="3"><strong>Parametri de intrare/ieșire</strong></td>
    </tr>
     <tr>
      <td><strong>Nume</strong></td>
      <td><strong>Tip</strong></td>
      <td><strong>Descriere</strong></td>
    </tr>
     <tr>
      <td><strong>Query</strong></td>
      <td>AuthorizationTypeCodeQuery</td>
      <td>O structură de date care conține detaliile împuternicirii identificate pe baza codului tipului de împuternicire.</td>
    </tr>
     <tr>
      <td><strong>Response</strong></td>
      <td>AuthorizationValid</td>
      <td>O structură de date referitoare la împuternicire, care indică valabilitatea acesteia: True sau False.</td>
    </tr>
     <tr>
      <td colspan="3"><strong>Erori (Faults)</strong></td>
    </tr>
     <tr>
      <td><strong>Cod</strong></td>
      <td><strong>Motiv</strong></td>
    </tr>
     <tr>
      <td>200</td>
      <td colspan="2">Succes</td>
    </tr>
     <tr>
      <td>404</td>
      <td colspan="2">Negăsit. Verificați datele trimise în cerere</td>
    </tr>
     <tr>
      <td>500</td>
      <td colspan="2">A survenit o eroare de server. Lipsă conexiune cu baza de date, din alte motive decât: 400 / 401 / 501. Contactați administratorul.</td>
    </tr>
     <tr>
      <td>501</td>
      <td colspan="2">A survenit o eroare de server. Contactați administratorul.</td>
    </tr>
  </tbody>
</table>


###**Obținerea listei de împuterniciri după IDNx**

<table>
  <thead>
    <tr>
      <th>Semnătura apelului</th>
      <th colspan="2">GET /api/Authorization/check/Idn-Details-List</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Descriere</strong></td>
      <td colspan="2">Pe baza IDNP sau IDNO, returnează lista de împuterniciri.</td>
    </tr>
    <tr>
      <td colspan="3"><strong>Parametri de intrare/ieșire</strong></td>
    </tr>
     <tr>
      <td><strong>Nume</strong></td>
      <td><strong>Tip</strong></td>
      <td><strong>Descriere</strong></td>
    </tr>
     <tr>
      <td><strong>Query</strong></td>
      <td>AuthorizationListQuery</td>
      <td>Identificare pe baza IDNP sau IDNO și, opțional, o structură suplimentară cu date referitoare la împuternicire.</td>
    </tr>
     <tr>
      <td><strong>Response</strong></td>
      <td>AuthorizationDetails</td>
      <td>O structură de date care conține detaliile împuternicirilor.</td>
    </tr>
     <tr>
      <td colspan="3"><strong>Erori (Faults)</strong></td>
    </tr>
     <tr>
      <td><strong>Cod</strong></td>
      <td><strong>Motiv</strong></td>
    </tr>
     <tr>
      <td>200</td>
      <td colspan="2">Succes</td>
    </tr>
     <tr>
      <td>404</td>
      <td colspan="2">Negăsit. Verificați datele trimise în cerere</td>
    </tr>
     <tr>
      <td>500</td>
      <td colspan="2">A survenit o eroare de server. Lipsă conexiune cu baza de date, din alte motive decât: 400 / 401 / 501. Contactați administratorul.</td>
    </tr>
     <tr>
      <td>501</td>
      <td colspan="2">A survenit o eroare de server. Contactați administratorul.</td>
    </tr>
  </tbody>
</table>


###**Descărcarea fișierului de împuternicire**

<table>
  <thead>
    <tr>
      <th>Semnătura apelului</th>
      <th colspan="2">GET /api/Authorization/file</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Descriere</strong></td>
      <td colspan="2">Pe baza codului de împuternicire, returnează o înregistrare cu o structură de date care conține fișierul de împuternicire.</td>
    </tr>
    <tr>
      <td colspan="3"><strong>Parametri de intrare/ieșire</strong></td>
    </tr>
     <tr>
      <td><strong>Nume</strong></td>
      <td><strong>Tip</strong></td>
      <td><strong>Descriere</strong></td>
    </tr>
     <tr>
      <td><strong>Query</strong></td>
      <td>authorizationCode</td>
      <td>O structură de date care conține detaliile împuternicirii identificate pe baza codului de împuternicire.</td>
    </tr>
     <tr>
      <td><strong>Response</strong></td>
      <td>AuthorizationFile</td>
      <td>O structură de date care conține fișierul de împuternicire.</td>
    </tr>
     <tr>
      <td colspan="3"><strong>Erori (Faults)</strong></td>
    </tr>
     <tr>
      <td><strong>Cod</strong></td>
      <td><strong>Motiv</strong></td>
    </tr>
     <tr>
      <td>200</td>
      <td colspan="2">Succes</td>
    </tr>
     <tr>
      <td>404</td>
      <td colspan="2">Negăsit. Verificați datele trimise în cerere</td>
    </tr>
     <tr>
      <td>500</td>
      <td colspan="2">A survenit o eroare de server. Lipsă conexiune cu baza de date, din alte motive decât: 400 / 401 / 501. Contactați administratorul.</td>
    </tr>
     <tr>
      <td>501</td>
      <td colspan="2">A survenit o eroare de server. Contactați administratorul.</td>
    </tr>
  </tbody>
</table>

##**Structuri de date (Query)**

<table>
  <thead>
    <tr>
      <th><strong>Membru</strong></th>
      <th><strong>Tip</strong></th>
      <th><strong>Obligatoriu/Opțional</strong></th>
      <th><strong>Descriere</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr><td colspan="4"><strong>AuthorizationTypeCodeQuery</strong></td></tr>
    <tr>
      <td>AuthorizationTypeCode</td>
      <td>String</td>
      <td>Obligatoriu</td>
      <td>Introduceți codul tipului de împuternicire (atribuit din formularul aprobat, 10 caractere – „AT-xxxxxxx").</td>
    </tr>
    <tr>
      <td>AuthorizingIdn</td>
      <td>String</td>
      <td>Obligatoriu</td>
      <td>Introduceți IDNP sau IDNO al persoanei reprezentate.
      <br>Trebuie să conțină exact 13 caractere și doar cifre.</td>
    </tr>
    <tr>
      <td>AuthorizedIdn</td>
      <td>String</td>
      <td>Obligatoriu</td>
      <td>Introduceți IDNP sau IDNO al reprezentantului.
      <br>Trebuie să conțină exact 13 caractere și doar cifre.</td>
    </tr>
    <tr><td colspan="4"><strong>AuthorizationListQuery</strong></td></tr>
    <tr>
      <td>IDNx</td>
      <td>String</td>
      <td>Obligatoriu</td>
      <td>Va fi returnată lista de împuterniciri acordate și primite de IDNP sau IDNO introdus (unde persoana fizică sau juridică are rolul de reprezentat și reprezentant).
      <br>Trebuie să conțină exact 13 caractere și doar cifre.
      <br>Va fi comparat pentru a fi identic cu AuthorizingContextIdn și AuthorizedIdn.</td>
    </tr>
    <tr>
      <td>Status</td>
      <td>Integer</td>
      <td>Opțional</td>
      <td>Filtrează lista de împuterniciri acordate și primite în funcție de statutul indicat.
      <br>Trebuie să conțină codul statutului conform enumerărilor indicate în secțiunea Enumerări.
      <br>Va fi comparat pentru a fi identic cu Authorization Status.</td>
    </tr>
    <tr>
      <td>AuthorizationTypeCode</td>
      <td>String</td>
      <td>Opțional</td>
      <td>Introduceți codul tipului de împuternicire (atribuit din formularul aprobat, 10 caractere – „AT-xxxxxxx").</td>
    </tr>
    <tr>
      <td>StartDate</td>
      <td>String</td>
      <td>Opțional</td>
      <td>Afișează împuternicirile care au devenit valabile începând cu data indicată.
      <br>Constrângeri: această valoare nu trebuie să fie ulterioară valorii introduse în câmpul EndDate.
      <br>Ora este setată în UTC.
      <br>Exemplu: „2020-09-28T10:35:16.879Z". Va fi comparată pentru a fi mai mare sau egală cu data AuthorizationValidFrom (AuthorizationValidFrom reprezintă data la care împuternicirea a devenit valabilă).</td>
    </tr>
    <tr>
      <td>AuthEndDateorizationTypeCode</td>
      <td>String</td>
      <td>Opțional</td>
      <td>Afișează împuternicirile care au expirat până la data indicată.
      <br>Constrângeri: această valoare nu trebuie să fie anterioară valorii introduse în câmpul StartDate.
      <br>Ora este setată în UTC.
      <br>Exemplu: „2020-09-28T10:35:16.879Z". Va fi comparată pentru a fi mai mare sau egală cu data AuthorizationValidTo (AuthorizationValidTo reprezintă data expirării împuternicirii).</td>
    </tr>
    <tr>
      <td>GrantedByIdn</td>
      <td>String</td>
      <td>Opțional</td>
      <td>Acest parametru va afișa lista de împuterniciri acordate de IDNP/IDNO specificat.
      <br>Constrângeri: valoarea acestui câmp trebuie să fie diferită de valoarea câmpului GrantedToIdn. Trebuie să conțină 13 caractere, toate cifre. Va fi comparat pentru a fi egal cu AuthorizingContextIdn.</td>
    </tr>
    <tr>
      <td>GrantedToIdn</td>
      <td>String</td>
      <td>Opțional</td>
      <td>Afișează lista de împuterniciri primite de la IDNP/IDNO specificat.
      <br>Constrângeri: valoarea acestui câmp trebuie să fie diferită de valoarea câmpului GrantedByIdn. Trebuie să conțină 13 caractere, toate cifre. Va fi comparat pentru a fi egal cu AuthorizedIdn.</td>
    </tr>
    <tr>
      <td>ItemsPerPage</td>
      <td>Integer</td>
      <td>Opțional</td>
      <td>Parametrul specifică pagina care va fi afișată. Implicit, sunt afișate înregistrările din prima pagină.
      <br>Constrângeri: dacă se introduce un număr negativ sau zero, sistemul va returna împuternicirile din prima pagină; dacă se introduce un număr mai mare decât numărul de pagini, va fi afișat câte zero împuterniciri pe pagină.</td>
    </tr>
  </tbody>
</table>

##**Structuri de date (Response)**

<table>
  <thead>
    <tr>
      <th><strong>Membru</strong></th>
      <th><strong>Tip</strong></th>
      <th><strong>Obligatoriu/Opțional</strong></th>
      <th><strong>Descriere</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr><td colspan="4"><strong>AuthorizationCodeValid</strong></td></tr>
    <tr>
      <td>AuthorizationCode</td>
      <td>String</td>
      <td>Obligatoriu</td>
      <td>Codul unic de identificare al împuternicirii.</td>
    </tr>
    <tr>
      <td>IsValid</td>
      <td>String</td>
      <td>Obligatoriu</td>
      <td>True dacă este valabilă
      <br>False dacă nu este valabilă</td>
    </tr>
    <tr><td colspan="4"><strong>AuthorizationDetails</strong></td></tr>
    <tr>
      <td>AuthorizationCode</td>
      <td>String</td>
      <td>Obligatoriu</td>
      <td>Codul unic de identificare al împuternicirii.</td>
    </tr>
    <tr>
      <td>AuthorizationTypeCode</td>
      <td>String</td>
      <td>Obligatoriu</td>
      <td>Codul tipului de împuternicire (conform formularului aprobat).</td>
    </tr>
    <tr>
      <td>AuthorizingPartyType</td>
      <td>Integer</td>
      <td>Obligatoriu</td>
      <td>ID-ul tipului persoanei reprezentate; vezi secțiunea Enumerări.</td>
    </tr>
    <tr>
      <td>AuthorizingIdn</td>
      <td>String</td>
      <td>Obligatoriu</td>
      <td>IDNP sau IDNO al persoanei reprezentate.</td>
    </tr>
    <tr>
      <td>AuthorizedPartyType</td>
      <td>Integer</td>
      <td>Obligatoriu</td>
      <td>ID-ul tipului părții reprezentante; vezi secțiunea Enumerări.</td>
    </tr>
    <tr>
      <td>AuthorizedIdn</td>
      <td>String</td>
      <td>Obligatoriu</td>
      <td>IDNP sau IDNO al reprezentantului.</td>
    </tr>
    <tr>
      <td>From</td>
      <td>String</td>
      <td>Obligatoriu</td>
      <td>Dacă isValid=True -> Data de la care împuternicirea este valabilă.
      <br>Dacă isValid=False -> Data de la care împuternicirea este suspendată sau nevalabilă.
      <br>Ora este setată în UTC.</td>
    </tr>
    <tr>
      <td>To</td>
      <td>String</td>
      <td>Obligatoriu</td>
      <td>Dacă isValid=True -> Data până la care împuternicirea este valabilă.
      <br>Dacă isValid=False -> „null".
      <br>Ora este setată în UTC.</td>
    </tr>
    <tr>
      <td>IsValid</td>
      <td>String</td>
      <td>Obligatoriu</td>
      <td>True dacă este valabilă
      <br>False dacă nu este valabilă</td>
    </tr>
    <tr>
      <td>AuthorizingPartyName</td>
      <td>String</td>
      <td>Obligatoriu</td>
      <td>Numele și prenumele persoanei reprezentate.</td>
    </tr>
    <tr>
      <td>AuthorizedPartyName</td>
      <td>String</td>
      <td>Obligatoriu</td>
      <td>Numele și prenumele reprezentantului.</td>
    </tr>
    <tr>
      <td>AuthorizationTypeName</td>
      <td>String</td>
      <td>Obligatoriu</td>
      <td>Denumirea tipului de împuternicire.</td>
    </tr>
    <tr>
      <td>ServiceProviderIdno</td>
      <td>String</td>
      <td>Obligatoriu</td>
      <td>IDNO-ul prestatorului de servicii.</td>
    </tr>
    <tr>
      <td>ServiceProviderName</td>
      <td>String</td>
      <td>Obligatoriu</td>
      <td>Denumirea prestatorului de servicii.</td>
    </tr>
    <tr><td colspan="4"><strong>AuthorizationFile</strong></td></tr>
    <tr>
      <td>content</td>
      <td>byte[]</td>
      <td>Obligatoriu</td>
      <td>Conținutul fișierului care conține date despre împuternicirea solicitată.</td>
    </tr>
    <tr>
      <td>content-type</td>
      <td>String</td>
      <td>Obligatoriu</td>
      <td>Tipul MIME al fișierului de împuternicire. Implicit: „application/pdf"</td>
    </tr>
  </tbody>
</table>

##**Enumerări**

<table>
  <thead>
    <tr>
      <th><strong>Atribute</strong></th>
      <th colspan="2"><strong>Descriere</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="3"><strong>AuthorizationGrantedType</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Împuternicire acordată de IDNx</td>
      <td></td>
    </tr>
    <tr>
      <td>2</td>
      <td>Împuternicire primită de IDNx</td>
      <td></td>
    </tr>
    <tr>
      <td>3</td>
      <td>Împuternicire cosemnată de IDNx</td>
      <td></td>
    </tr>
    <tr>
      <td colspan="3"><strong>AuthorizationStaus</strong></td>
    </tr>
    <tr>
      <td>Draft</td>
      <td>Împuternicirea este creată, dar nu este valabilă</td>
      <td>None</td>
    </tr>
    <tr>
      <td>PendingAcceptance</td>
      <td>Împuternicirea este acordată, dar necesită acceptarea reprezentantului pentru a deveni valabilă</td>
      <td>None</td>
    </tr>
    <tr>
      <td>Pending</td>
      <td>Împuternicirea este acordată, dar va deveni valabilă la o dată viitoare</td>
      <td>None</td>
    </tr>
    <tr>
      <td>Valid</td>
      <td>Împuternicirea este valabilă și poate fi utilizată pentru reprezentare</td>
      <td>isValid=True</td>
    </tr>
    <tr>
      <td>Canceled</td>
      <td>Împuternicirea a expirat, a fost revocată sau i s-a renunțat</td>
      <td>isValid=False</td>
    </tr>
    <tr>
      <td>Suspended</td>
      <td>Împuternicirea este suspendată</td>
      <td>isValid=False</td>
    </tr>
    <tr>
      <td colspan="2"><strong>AuthorizingPartyType</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td colspan="2">Persoană fizică</td>
    </tr>
    <tr>
      <td>2</td>
      <td colspan="2">Persoană juridică</td>
    </tr>
    <tr>
      <td colspan="2"><strong>AuthorizedPartyType</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td colspan="2">Persoană fizică</td>
    </tr>
    <tr>
      <td>2</td>
      <td colspan="2">Persoană juridică</td>
    </tr>
<tr>
      <td colspan="3"><strong>Status</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Împuternicirea salvată ca ciornă (neacordată)</td>
      <td>Draft</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Împuternicirea care a fost acordată, dar necesită acceptarea reprezentantului pentru a deveni valabilă</td>
      <td>PendingAcceptance</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Împuternicirea care a fost acordată, dar data de intrare în vigoare este viitoare</td>
      <td>PendingValidity</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Împuternicirea care este valabilă.</td>
      <td>Valid</td>
    </tr>
    <tr>
      <td>5</td>
      <td>Împuternicirea care este suspendată.</td>
      <td>Suspended</td>
    </tr>
    <tr>
      <td>6</td>
      <td>Împuternicirea care nu este valabilă din cauza expirării, renunțării, revocării</td>
      <td>Canceled</td>
    </tr>
  </tbody>
</table>

##**Exemple de apeluri ale metodelor API**

###**GET /api/Authorization/check/Code-True-One**

=== "Request"

    ```curl
    curl -X GET "https://mpower.staging.egov.md:8443/clients-api/api/Authorization/check/Code-True-One?AuthorizationCode=0200905142878268" -H "accept: text/plain"
    ```

=== "Response"

    ```json
    {
      "data": true,
      "success": true,
      "messages": []
    }
    ```

###**GET /api/Authorization/check/Code-Details-One**

=== "Request"

    ```curl
    curl -X GET "https://mpower.staging.egov.md:8443/clients-api/api/Authorization/check/Code-Details-One?AuthorizationCode=0200935852951597" -H "accept: text/plain"
    ```

=== "Response"

    ```json
    {
      "data": {
        "authorizationCode": "0200935852951597",
        "authorizationTypeCode": "AT-2100025",
        "authorizingPartyType": 2,
        "authorizingIdn": "1009600026622",
        "authorizedPartyType": 1,
        "authorizedIdn": "2001003328546",
        "fromDate": "2020-09-22T14:16:06.0932925",
        "toDate": "2021-03-22T21:59:59.999",
        "isValid": true,
        "authorizingPartyName": "Esempla SRL",
        "authorizedPartyName": "L CHIRIŢA",
        "authorizationTypeName": "Ridicare original document",
        "serviceProviderIdno": "1009600026622",
        "serviceProviderName": "Companie SRL"
      },
      "success": true,
      "messages": []
    }
    ```

###**GET /api/Authorization/check/TypeCode-Valid-One**

=== "Request"

    ```curl
    curl -X GET "https://mpower.staging.egov.md:8443/clients-api/api/Authorization/check/TypeCode-Valid-One?AuthorizationTypeCode=AT-2100025&AuthorizingIdn=1009600026622&AuthorizedIdn=2001003328546" -H "accept: text/plain"
    ```

=== "Response"

    ```json
    {
      "data": {
        "authorizationCode": "0200935852951597",
        "isValid": true
      },
      "success": true,
      "messages": []
    }
    ```

###**GET /api/Authorization/check/Idn-Details-List**

!NEFURNIZAT ÎN DOCUMENTAȚIA ANTERIOARĂ

###**GET /api/Authorization/file**

=== "Request"

    ```curl
    curl -X GET "https://mpower.staging.egov.md:8443/clients-api/api/Authorization/file ? ?AuthorizationCode=0200905142878268" " -H "accept: text/plain"
    ```

=== "Response"

    ```json
    {
      "data": {
        "content": "JVBERi0xLjcKJeLjz9MKNyAwIG9iago8PC9GaWx0ZXI…",
        "content-type": "application/pdf"
      },
      "success": true,
      "messages": []
    }
    ```
