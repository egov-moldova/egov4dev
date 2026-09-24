# Referință API

## Reguli de gestionare a erorilor

Pentru erorile rezultate din invocările interfeței SOAP, MSign returnează SOAP faults cu coduri de eroare (fault codes) și motive ale erorii (fault reasons) care descriu eroarea în limbaj clar. Dacă MSign nu returnează niciun SOAP fault, consumatorul serviciului ar trebui să considere că rezultatul operației returnat, conform contractului serviciului MSign, este valid și poate fi utilizat direct, fără verificări suplimentare de eroare.

Rețineți că un SignResponse conține SignStatus, care poate avea valorile Pending, Failure sau Expired, ceea ce înseamnă că nu sunt returnate rezultate de semnare (Results).

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
      <td>Procesul de autentificare a consumatorului serviciului a eșuat. Vezi Autentificare</td>
    </tr>
    <tr>
      <td>AuthorizationFailed</td>
      <td>Procesul de autorizare a consumatorului serviciului a eșuat. Vezi Autorizare</td>
    </tr>
    <tr>
      <td>InvalidParameter</td>
      <td>Un parametru de intrare este invalid. Consultați textul returnat în Fault Reason și descrierea operației apelate.</td>
    </tr>
    <tr>
      <td>RequestNotFound</td>
      <td>requestID furnizat la apelarea GetSignResponse nu a fost găsit de MSign. Poate fi incorect sau expirat (adică eliminat din baza de date online).</td>
    </tr>
  </tbody>
</table>

Pentru consumatorii care utilizează limbaje de programare ce suportă blocuri try…catch, capturarea excepțiilor specifice framework-ului pentru SOAP Fault este modalitatea corectă de a gestiona erorile de invocare a serviciului.

## Operațiile serviciului

### PostSignRequest

<table>
  <tbody>
    <tr>
      <td><strong>Semnătură</strong></td>
      <td>PostSignRequest(request: SignRequest): string</td>
    </tr>
    <tr>
      <td><strong>Descriere</strong></td>
      <td>Trimite o cerere de semnătură pentru semnare ulterioară.</td>
    </tr>
    <tr>
      <td><strong>Returnează</strong></td>
      <td>Un string reprezentând ID-ul cererii, care poate fi utilizat ulterior cu GetSignResponse.</td>
    </tr>
  </tbody>
</table>

**Parametri de intrare**

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
      <td>request</td>
      <td>SignRequest</td>
      <td>O structură reprezentând cererea de semnătură.</td>
    </tr>
  </tbody>
</table>

**Erori**

<table>
  <thead>
    <tr>
      <th>Cod</th>
      <th>Motiv</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>AuthenticationFailed</td>
      <td>Certificat de autentificare furnizat invalid, consumator de serviciu necunoscut: {numărul de serie al certificatului}</td>
    </tr>
    <tr>
      <td>InvalidParameter</td>
      <td>Un parametru de intrare este invalid. Consultați textul returnat în Fault Reason și descrierea operației apelate.</td>
    </tr>
  </tbody>
</table>

### GetSignResponse

<table>
  <tbody>
    <tr>
      <td><strong>Semnătură</strong></td>
      <td>GetSignResponse(requestID: string, language: string): SignResponse</td>
    </tr>
    <tr>
      <td><strong>Descriere</strong></td>
      <td>Obține statusul și rezultatul cererii de semnătură aferente.</td>
    </tr>
    <tr>
      <td><strong>Returnează</strong></td>
      <td>O structură care conține statusul și rezultatele semnăturii.</td>
    </tr>
  </tbody>
</table>

**Parametri de intrare**

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
      <td>requestID</td>
      <td>string</td>
      <td>ID-ul SignRequest-ului trimis anterior prin operația PostSignRequest.</td>
    </tr>
    <tr>
      <td>language</td>
      <td>string</td>
      <td>Limba utilizată pentru localizarea răspunsului. Valori permise: „ro”, „ru”, „en”. Pentru compatibilitate retroactivă, acest parametru este opțional, iar valoarea implicită este „ro”.</td>
    </tr>
  </tbody>
</table>

**Erori**

<table>
  <thead>
    <tr>
      <th>Cod</th>
      <th>Motiv</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>AuthenticationFailed</td>
      <td>Certificat de autentificare furnizat invalid, sistem necunoscut sau neînregistrat: {numărul de serie al certificatului}</td>
    </tr>
    <tr>
      <td>AuthorizationFailed</td>
      <td>Această cerere de semnătură nu a fost inițiată de acest sistem</td>
    </tr>
    <tr>
      <td>InvalidParameter</td>
      <td>Un parametru de intrare este invalid. Consultați textul returnat în Fault Reason și descrierea operației apelate</td>
    </tr>
    <tr>
      <td>RequestNotFound</td>
      <td>Nu se poate găsi o astfel de cerere</td>
    </tr>
  </tbody>
</table>

### VerifySignatures

<table>
  <tbody>
    <tr>
      <td><strong>Semnătură</strong></td>
      <td>VerifySignatures(request: VerificationRequest): VerificationResponse</td>
    </tr>
    <tr>
      <td><strong>Descriere</strong></td>
      <td>Solicită verificarea semnăturii. Având în vedere că procesul de verificare poate dura mai mult decât se așteaptă, se recomandă invocarea acestei operații în mod asincron, astfel încât aplicația apelantă să nu pară blocată.</td>
    </tr>
    <tr>
      <td><strong>Returnează</strong></td>
      <td>O structură care conține rezultatul verificării semnăturii.</td>
    </tr>
  </tbody>
</table>

**Parametri de intrare**

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
      <td>request</td>
      <td>VerificationRequest</td>
      <td>O structură reprezentând cererea de verificare.</td>
    </tr>
  </tbody>
</table>

**Erori**

<table>
  <thead>
    <tr>
      <th>Cod</th>
      <th>Motiv</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>AuthenticationFailed</td>
      <td>Certificat de autentificare furnizat invalid sau consumator de serviciu necunoscut: {numărul de serie al certificatului}</td>
    </tr>
    <tr>
      <td>InvalidParameter</td>
      <td>Un parametru de intrare este invalid. Consultați textul returnat în Fault Reason și descrierea operației apelate.</td>
    </tr>
    <tr>
      <td>RequestNotFound</td>
      <td>Nu se poate găsi o astfel de cerere</td>
    </tr>
  </tbody>
</table>

## Structuri

<span class="red-bold-text">Important.</span> Ordinea în care sunt descriși membrii mai jos este doar în scop descriptiv. Ordinea elementelor în structurile XML efective, definite în WSDL, este alfabetică. Pentru a obține o implementare corectă, se recomandă utilizarea unui instrument de conversie automată din WSDL în limbajul sau mediul dumneavoastră de programare.

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
    <tr><td colspan="4"><strong>SignRequest</strong></td></tr>
    <tr>
      <td>ContentDescription</td>
      <td>string (512)</td>
      <td>Opțional, implicit: identic cu ShortContentDescription</td>
      <td>Descrierea conținutului de semnat. Afișată de paginile web MSign.</td>
    </tr>
    <tr>
      <td>ShortContentDescription</td>
      <td>string (90)</td>
      <td>Obligatoriu</td>
      <td>Descrierea scurtă a conținutului de semnat. Afișată pe telefonul mobil dacă se utilizează Semnătura Mobilă.</td>
    </tr>
    <tr>
      <td>SignatureReason</td>
      <td>string (255)</td>
      <td>Opțional</td>
      <td>Motivul semnăturii, de ex. Rezoluție, Aprobat, Revizuit etc. În prezent, aplicabil doar pentru PDF.</td>
    </tr>
    <tr>
      <td>ContentType</td>
      <td>enumerare ContentType</td>
      <td>Obligatoriu</td>
      <td>Tipul conținutului de semnat.</td>
    </tr>
    <tr>
      <td>Contents</td>
      <td>Array de SignContent</td>
      <td>Obligatoriu, cel puțin un element</td>
      <td>Lotul efectiv de conținuturi de semnat.</td>
    </tr>
    <tr>
      <td>ExpectedSigner</td>
      <td>ExpectedSigner</td>
      <td>Opțional</td>
      <td>Dacă este furnizat, MSign va verifica dacă semnatarul efectiv corespunde informațiilor furnizate.</td>
    </tr>
    <tr><td colspan="4"><strong>SignResponse</strong></td></tr>
    <tr>
      <td>Status</td>
      <td>enumerare SignStatus</td>
      <td>Obligatoriu</td>
      <td>Statusul cererii de semnătură</td>
    </tr>
    <tr>
      <td>Message</td>
      <td>string (100)</td>
      <td>Opțional, returnat pentru cererile cu status Failure sau Expired</td>
      <td>Mesajul de eșec al cererii de semnătură, localizat conform parametrului language.</td>
    </tr>
    <tr>
      <td>Results</td>
      <td>Array de SignResult</td>
      <td>Disponibil când Status nu este Pending</td>
      <td>Rezultatele semnăturii pentru cererea de semnătură solicitată.</td>
    </tr>
    <tr><td colspan="4"><strong>VerificationRequest</strong></td></tr>
    <tr>
      <td>SignedContentType</td>
      <td>enumerare ContentType</td>
      <td>Obligatoriu</td>
      <td>Tipul conținutului care a fost semnat anterior.</td>
    </tr>
    <tr>
      <td>Language</td>
      <td>string (2)</td>
      <td>Opțional, implicit: ro</td>
      <td>Limba utilizată pentru localizarea răspunsului. Valori permise: „ro”, „ru”, „en”</td>
    </tr>
    <tr>
      <td>Contents</td>
      <td>Array de VerificationContent</td>
      <td>Obligatoriu, cel puțin un element</td>
      <td>Lotul efectiv de semnături de verificat.</td>
    </tr>
    <tr><td colspan="4"><strong>VerificationResponse</strong></td></tr>
    <tr>
      <td>Results</td>
      <td>Array de VerificationResult</td>
      <td>Obligatoriu</td>
      <td>Rezultatele verificării pentru cererea de verificare.</td>
    </tr>
    <tr><td colspan="4"><strong>SignRequest</strong></td></tr>
    <tr>
      <td>CorrelationID</td>
      <td>string (36)</td>
      <td>Opțional</td>
      <td>ID-ul de corelare pentru acest conținut. Trebuie să fie unic în cadrul unei cereri de semnătură.</td>
    </tr>
    <tr>
      <td>MultipleSignatures</td>
      <td>Bool</td>
      <td>Opțional, implicit: false</td>
      <td>Specifică dacă conținutul poate avea mai multe semnături (adică poate fi cosemnat). În prezent, această setare se aplică doar pentru PDF.</td>
    </tr>
    <tr>
      <td>Name</td>
      <td>string (256)</td>
      <td>Opțional</td>
      <td>Numele fișierului PDF; pentru Hash, această proprietate este redundantă.</td>
    </tr>
    <tr>
      <td>Content</td>
      <td>Array de byte</td>
      <td>Obligatoriu</td>
      <td>Conținutul efectiv de semnat. În prezent, acesta poate fi un hash SHA1 de 20 de byte-i sau un fișier PDF.</td>
    </tr>
    <tr><td colspan="4"><strong>ExpectedSigner</strong></td></tr>
    <tr>
      <td>ID</td>
      <td>String</td>
      <td>Obligatoriu</td>
      <td>Numărul de identificare personal al semnatarului așteptat.
      <br>Rețineți că, dacă nu este furnizat, utilizatorului i se va cere să îl introducă la semnarea PDF-ului prin semnătură mobilă.</td>
    </tr>
    <tr>
      <td>DelegatorType</td>
      <td>enumerare DelegatorType</td>
      <td>Opțional, implicit: None</td>
      <td>Tipul delegatorului.</td>
    </tr>
    <tr>
      <td>DelegatorID</td>
      <td>String</td>
      <td>Obligatoriu când DelegatorType nu este None</td>
      <td>Identificatorul persoanei sau organizației pe care semnatarul așteptat o poate reprezenta (de care este delegat).</td>
    </tr>
    <tr>
      <td>DelegatedRoleID</td>
      <td>Int</td>
      <td>Opțional, implicit: 0</td>
      <td>Rolul semnatarului așteptat în relație cu delegatorul.</td>
    </tr>
    <tr><td colspan="4"><strong>SignResult</strong></td></tr>
    <tr>
      <td>CorrelationID</td>
      <td>string (36)</td>
      <td>Returnat ca în SignContent</td>
      <td>ID-ul de corelare pentru conținutul semnat, așa cum a fost furnizat inițial în SignContent.</td>
    </tr>
    <tr>
      <td>Certificate</td>
      <td>Array de byte</td>
      <td>Opțional, prezent dacă semnarea a reușit</td>
      <td>Certificatul semnatarului în format X509 v3.</td>
    </tr>
    <tr>
      <td>Signature</td>
      <td>Array de byte</td>
      <td>Opțional, prezent dacă semnarea a reușit</td>
      <td>Pentru tipul de conținut hash, aceasta este semnătura electronică efectivă în format XAdES-T; pentru tipul de conținut PDF — documentul PDF semnat.</td>
    </tr>
    <tr><td colspan="4"><strong>VerificationContent</strong></td></tr>
    <tr>
      <td>CorrelationID</td>
      <td>string (36)</td>
      <td>Opțional</td>
      <td>ID-ul de corelare pentru acest conținut. Trebuie să fie unic în cadrul unei cereri de verificare.</td>
    </tr>
    <tr>
      <td>Content</td>
      <td>Array de byte</td>
      <td>Obligatoriu doar pentru conținut de tip Hash.</td>
      <td>Hash-ul care a fost semnat inițial. Rețineți că acest parametru este obligatoriu doar pentru verificarea semnăturilor de tip hash. Valoarea sa este necesară pentru verificarea completă a semnăturii.</td>
    </tr>
    <tr>
      <td>Signature</td>
      <td>Array de byte</td>
      <td>Obligatoriu</td>
      <td>Semnătura efectivă de verificat. Aceasta trebuie să fie un XAdES sau un PDF semnat.</td>
    </tr>
    <tr><td colspan="4"><strong>VerificationResult</strong></td></tr>
    <tr>
      <td>CorrelationID</td>
      <td>string (36)</td>
      <td>Returnat ca în VerificationContent</td>
      <td>ID-ul de corelare pentru conținutul de verificare, așa cum a fost furnizat inițial în VerificationContent.</td>
    </tr>
     <tr>
      <td>SignaturesValid</td>
      <td>Bool</td>
      <td>Obligatoriu</td>
      <td>Returnat ca true dacă toate semnăturile aplicate conținutului sunt valide.</td>
    </tr>
     <tr>
      <td>Message</td>
      <td>string (100)</td>
      <td>Obligatoriu</td>
      <td>Mesajul rezultatului verificării, localizat conform VerificationRequest.Language.</td>
    </tr>
     <tr>
      <td>Certificates</td>
      <td>Array de VerificationCertificate</td>
      <td>Opțional, prezent dacă au fost identificate certificate în semnătură</td>
      <td>Lista certificatelor (câte unul pentru fiecare hash semnat, în cazul XAdES) semnatarilor. Returnată în scop de afișare.</td>
    </tr>
    <tr><td colspan="4"><strong>VerificationCertificate</strong></td></tr>
    <tr>
      <td>SignatureValid</td>
      <td>Bool</td>
      <td>Obligatoriu</td>
      <td>Returnat ca true dacă semnătura corespunzătoare acestui certificat este validă.</td>
    </tr>
    <tr>
      <td>Subject</td>
      <td>string (250)</td>
      <td>Obligatoriu</td>
      <td>Detaliile subiectului din certificat. Returnate ca facilitate pentru afișare.</td>
    </tr>
    <tr>
      <td>Certificate</td>
      <td>Array de byte</td>
      <td>Obligatoriu</td>
      <td>Certificatul semnatarului în format X509 v3.</td>
    </tr>
    <tr>
      <td>SignedAt</td>
      <td>Datetime</td>
      <td>Opțional</td>
      <td>Data și ora semnăturii. Returnată doar dacă a fost aplicată o marcă temporală (timestamp) validă.</td>
    </tr>
  </tbody>
</table>

## Enumerări

<table>
  <thead>
    <tr>
      <th><strong>Membru</strong></th>
      <th><strong>Descriere</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="2"><strong>ContentType</strong></td>
    </tr>
    <tr>
      <td>Hash</td>
      <td>Conținutul de semnat este un hash SHA1.</td>
    </tr>
    <tr>
      <td>Pdf</td>
      <td>Conținutul de semnat este un fișier PDF.</td>
    </tr>
    <tr>
      <td colspan="2"><strong>DelegatorType</strong></td>
    </tr>
    <tr>
      <td>None</td>
      <td>Nu există delegator.</td>
    </tr>
    <tr>
      <td>Person</td>
      <td>Delegatorul este o persoană.</td>
    </tr>
     <tr>
      <td>Organization</td>
      <td>Delegatorul este o organizație.</td>
    </tr>
    <tr>
      <td colspan="2"><strong>SignStatus</strong></td>
    </tr>
    <tr>
      <td>Pending</td>
      <td>Semnarea este în curs.</td>
    </tr>
    <tr>
      <td>Success</td>
      <td>Semnarea s-a finalizat, iar semnătura este validă.</td>
    </tr>
    <tr>
      <td>Failure</td>
      <td>Semnarea a eșuat. Cererea de semnătură este acum invalidă.</td>
    </tr>
    <tr>
      <td>Expired</td>
      <td>Cererea de semnătură a expirat. Cererea de semnătură este acum invalidă.</td>
    </tr>
  </tbody>
</table>

## Integrarea prin formulare web

### Cererea de semnare

<table>
  <tbody>
    <tr>
      <td><strong>Metodă<strong></td>
      <td>POST (recomandat) sau GET</td>
    </tr>
    <tr>
      <td><strong>URL<strong></td>
      <td><a htef="https://msign.gov.md/{requestID}">https://msign.gov.md/{requestID}</a></td>
    </tr>
    <tr>
      <td><strong>Descriere<strong></td>
      <td>Direcționează utilizatorul pentru a efectua semnarea propriu-zisă. Observați că requestID este integrat în URL-ul metodei</td>
    </tr>
  </tbody>
</table>

**Parametri de formular sau URL**

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
      <td>ReturnUrl</td>
      <td>string</td>
      <td>Obligatoriu</td>
      <td>URL-ul care va primi rezultatul semnării tranzacției</td>
    </tr>
    <tr>
      <td>Instrument</td>
      <td>string</td>
      <td>Opțional și nerecomandat</td>
      <td>Instrumentul de semnare de utilizat, adică omiterea paginii de selectare a instrumentului de semnare. Valori permise: „mobile”, „moldsign”, „nationalid”, „securesign”, „tax”.
      <br> Rețineți că, pentru ca instrumentul „mobile” să funcționeze fără selectarea instrumentului, trebuie să furnizați MSISDN și ExpectedSigner.ID ale semnatarului așteptat.</td>
    </tr>
    <tr>
      <td>MSISDN</td>
      <td>string conținând cifre</td>
      <td>Opțional</td>
      <td>Numărul de telefon mobil al semnatarului așteptat, dacă este cunoscut</td>
    </tr>
    <tr>
      <td>RelayState</td>
      <td>string</td>
      <td>Opțional</td>
      <td>String opțional care va fi returnat nemodificat după semnare</td>
    </tr>
    <tr>
      <td>lang</td>
      <td>string</td>
      <td>Opțional</td>
      <td>Limba utilizată de interfața utilizator MSign. Valori permise: „ro”, „ru”, „en”</td>
    </tr>
  </tbody>
</table>

### Callback-ul de semnare

<table>
  <tbody>
    <tr>
      <td><strong>Metodă<strong></td>
      <td>POST</td>
    </tr>
    <tr>
      <td><strong>URL<strong></td>
      <td>ReturnUrl-ul furnizat în cererea de semnare</td>
    </tr>
    <tr>
      <td><strong>Descriere<strong></td>
      <td>Redirecționează utilizatorul către sistemul informațional care a solicitat semnătura, informând totodată sistemul despre finalizarea procesării SignRequest-ului. Acest URL este deschis doar după ce rezultatul semnării este cunoscut (adică SignStatus este fie Failure, fie Success).</td>
    </tr>
  </tbody>
</table>

**Parametri de formular**

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
      <td>RequestID</td>
      <td>string</td>
      <td>Obligatoriu</td>
      <td>ID-ul SignRequest-ului finalizat</td>
    </tr>
    <tr>
      <td>RelayState</td>
      <td>string</td>
      <td>Opțional și nerecomandat</td>
      <td>Valoarea nemodificată a RelayState, așa cum a fost trimisă în cerere</td>
    </tr>
  </tbody>
</table>


## Exemple de mesaje SOAP

!!! note "Implementare manuală"

Vom prezenta aici exemple de mesaje SOAP schimbate. Acestea pot fi utile celor care se integrează cu MSign, dar nu suportă complet generarea proxy-ului de serviciu bazat pe WSDL.

### Metoda: PostSignRequest

=== "request.xml"

    ```xml
    <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
      <s:Header>
        <Action s:mustUnderstand="1" xmlns="http://schemas.microsoft.com/ws/2005/05/addressing/none">https://msign.gov.md/IMSign/PostSignRequest</Action>
      </s:Header>
      <s:Body>
        <PostSignRequest xmlns="https://msign.gov.md">
          <request xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
            <ContentDescription>Sample long description</ContentDescription>
            <ContentType>Hash</ContentType>
            <Contents>
              <SignContent>
                <Content>ZhKVycv51rL2QoQUUEqN7tMCBkE=</Content>
                <CorrelationID>3408cc344e474a529f3425176a75d08e</CorrelationID>
              </SignContent>
            </Contents>
            <ShortContentDescription>MSign Sample.</ShortContentDescription>
          </request>
        </PostSignRequest>
      </s:Body>
    </s:Envelope>
    ```

=== "response.xml"

    ```xml
    <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
      <s:Body>
        <PostSignRequestResponse xmlns="https://msign.gov.md">
          <PostSignRequestResult>eec7709d372b41109e2ea3e200e99727</PostSignRequestResult>
        </PostSignRequestResponse>
      </s:Body>
    </s:Envelope>
    ```

### Metoda: GetSignResponse

=== "request.xml"

    ```xml
    <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
      <s:Header>
        <Action s:mustUnderstand="1" xmlns="http://schemas.microsoft.com/ws/2005/05/addressing/none">https://msign.gov.md/IMSign/GetSignResponse</Action>
      </s:Header>
      <s:Body>
        <GetSignResponse xmlns="https://msign.gov.md">
          <requestID>eec7709d372b41109e2ea3e200e99727</requestID>
          <language>en</language> 
        </GetSignResponse> 
      </s:Body> 
    </s:Envelope>

    ```

=== "response.xml"

    ```xml
    <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
      <s:Body>
        <GetSignResponseResponse xmlns="https://msign.gov.md">
          <GetSignResponseResult xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
            <Results>
              <SignResult>
                <Certificate>MIIG… </Certificate>
                <CorrelationID>3408cc344e474a529f3425176a75d08e</CorrelationID>
                <Signature>PD94… </Signature>
              </SignResult>
            </Results>
            <Status>Success</Status>
          </GetSignResponseResult>
        </GetSignResponseResponse>
      </s:Body>
    </s:Envelope>
    ```

### Metoda: VerifySignatures

=== "request.xml"

    ```xml
    <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
      <s:Header>
        <Action s:mustUnderstand="1" xmlns="http://schemas.microsoft.com/ws/2005/05/addressing/none">https://msign.gov.md/IMSign/VerifySignatures</Action>
      </s:Header>
      <s:Body>
        <VerifySignatures xmlns="https://msign.gov.md">
          <request xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
            <Contents>
              <VerificationContent>
                <Content>ZhKVycv51rL2QoQUUEqN7tMCBkE=</Content>
                <CorrelationID>bd73ed7eabc44ab290b18181a9e7fd2b</CorrelationID>
                <Signature>PD94… </Signature>
              </VerificationContent>
            </Contents>
            <Language>en</Language>
            <SignedContentType>Hash</SignedContentType>
          </request>
        </VerifySignatures>
      </s:Body>
    </s:Envelope>
    ```

=== "response.xml"

    ```xml
    <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
      <s:Body>
        <VerifySignaturesResponse xmlns="https://msign.gov.md">
          <VerifySignaturesResult xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
            <Results>
              <VerificationResult>
                <Certificates>
                  <VerificationCertificate>
                    <Certificate>MIIG… </Certificate>
                    <SignatureValid>true</SignatureValid>
                    <Subject>O=Centrul de Guvernare Electronică (e-government) 1010600034203, OU=IT, C=MD, PostalCode=MD-2033, T=Functia, STREET=Piața Marii Adunări Naționale 1, Phone=022250234, S=Republica Moldova, L=Chișinău, SERIALNUMBER=IDNP, CN=Nume Prenume</Subject>
                  </VerificationCertificate>
                </Certificates>
                <CorrelationID>bd73ed7eabc44ab290b18181a9e7fd2b</CorrelationID>
                <Message>The signature is valid</Message>
                <SignaturesValid>true</SignaturesValid>
              </VerificationResult>
            </Results>
          </VerifySignaturesResult>
        </VerifySignaturesResponse>
      </s:Body>
    </s:Envelope>
    ```
