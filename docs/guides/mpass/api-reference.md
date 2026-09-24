## Prezentare generală

MPass susține în prezent o singură modalitate standard de integrare pentru SSO și SLO: SAML 2.0 prin binding HTTP POST. Deși MPass susține și binding-ul HTTP Redirect, utilizarea acestuia nu este recomandată.

Pentru a înțelege complet cum se realizează integrarea cu MPass, vă rugăm să citiți [SAML Binding, 3.5].

Referința de mai sus descrie modul corect de generare, codificare și transmitere a request-urilor, precum și modul de tratare a erorilor și a răspunsurilor.

MPass utilizează perechile AuthnRequest/Response și LogoutRequest/LogoutResponse pentru a implementa SSO și SLO.

Pentru o descriere detaliată a aspectelor legate de securitate, vă rugăm să citiți [SAML Security Considerations, 6.4].

## Structuri SAML

Această secțiune descrie în detaliu toate structurile SAML implicate.

### Structura Authn Request

O cerere de autentificare, denumită AuthnRequest, este generată de Service și transmisă către MPass prin browser-ul utilizatorului pentru a-l direcționa spre autentificare.

Iată un exemplu de AuthnRequest generat de exemplul .NET:

```xml
<saml2p:AuthnRequest ID="_92a43de2-b6ab-460c-abe5-8580f828bf76" Version="2.0"
    IssueInstant="2014-10-20T08:26:26.9933782Z"
    Destination="https://mpass.staging.egov.md/login/saml"
    AssertionConsumerServiceURL="http://localhost:50341/Account/Acs"
    xmlns:saml2p="urn:oasis:names:tc:SAML:2.0:protocol"
    xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion">
  <saml2:Issuer>http://sample.testmpass.gov.md</saml2:Issuer>
  <Signature xmlns="http://www.w3.org/2000/09/xmldsig#"><!-- ... --></Signature>
  <saml2p:NameIDPolicy AllowCreate="true" />
</saml2p:AuthnRequest>
```

Tabelul următor descrie atributele structurii:

| Element sau @Atribut | Tip | Valoare | Descriere |
|----------------------|------|-------|-------------|
| @ID | orice șir unic | obligatoriu | Generat de Service. Această valoare va fi returnată de MPass în atributul Response/@InResponseTo și poate fi verificată pentru a opri atacurile de tip replay. |
| @Version | Constantă | 2.0 | Această valoare este obligatorie și trebuie setată la „2.0”. |
| @Destination | URL | obligatoriu | Trebuie setat la URL-ul de SSO al MPass. |
| @AssertionConsumerServiceURL | URL | opțional, valoare implicită: setată în configurările Service | Acest URL este utilizat de MPass pentru a transmite SAML Response. |
| @ProtocolBinding (absent în exemplul de mai sus) | URI | opțional, implicit: urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST | Referință URI care identifică binding-ul de protocol SAML utilizat la returnarea Response. Deși MPass susține binding-ul HTTP POST și Redirect, binding-ul Redirect nu este recomandat. |
| @ForceAuthn (absent în exemplul de mai sus) | bool | opțional, implicit: false | Când este setat la „true”, MPass va solicita utilizatorului să se autentifice chiar dacă acesta are deja o sesiune MPass validă și autentificată. |
| @IsPassive (absent în exemplul de mai sus) | bool | opțional, implicit: false | Când este setat la „true”, MPass nu va interacționa cu utilizatorul și va transmite SAML Response cu starea curentă de autentificare a utilizatorului. |
| Issuer | string | obligatoriu | Reprezintă emitentul acestui AuthnRequest, de regulă sub formă de URL. |
| Signature | Xml | obligatoriu | Conține semnătura acestui AuthnRequest, aplicată folosind cheia privată a Issuer-ului. |
| NameIDPolicy | Xml | obligatoriu | MPass ignoră în prezent acest element de politică, însă toate Service-urile trebuie să îl includă (exact ca în exemplul de mai sus, inclusiv atributul AllowCreate) pentru compatibilitate. |

### Structura Response

MPass generează un SAML Response de succes (adică utilizatorul a fost autentificat) sau de eșec (adică utilizatorul a eșuat sau a anulat autentificarea) ca răspuns la AuthnRequest. Response este transmis către Service prin browser-ul utilizatorului, în același mod ca și request-ul. Înainte de a procesa response-ul, Service trebuie să îl valideze corespunzător.

Iată un exemplu de SAML Response de succes returnat de MPass ca răspuns la AuthnRequest de mai sus:

```xml
<samlp:Response ID="_7722d8dc-3401-4e16-b789-8c4db923ea86" 
    InResponseTo="_7b874d06-2b14-4dbe-b177-3a70140a5b66" Version="2.0" 
    IssueInstant="2014-10-20T08:39:48.786Z" 
    Destination="http://localhost:50341/Account/Acs"
    Consent="urn:oasis:names:tc:SAML:2.0:consent:prior"
    xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol" 
    xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion">
  <saml:Issuer>http://devmpass.gov.md</saml:Issuer>
  <Signature xmlns="http://www.w3.org/2000/09/xmldsig#"><!-- ... --></Signature>
  <samlp:Status>
    <samlp:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success" />
  </samlp:Status>
  <saml:Assertion Version="2.0" ID="_b3ef6fcb-8db0-44dc-9a96-a3ca008ec55c"
      IssueInstant="2014-10-20T08:39:48.786Z">
    <saml:Issuer>http://devmpass.gov.md</saml:Issuer>
    <saml:Subject>
      <saml:NameID>admin</saml:NameID>
      <saml:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
        <saml:SubjectConfirmationData NotOnOrAfter="2014-10-20T08:49:48.786Z"
            Recipient="http://localhost:50341/Account/Acs"
            InResponseTo="_7b874d06-2b14-4dbe-b177-3a70140a5b66" />
      </saml:SubjectConfirmation>
    </saml:Subject>
    <saml:Conditions NotOnOrAfter="2014-10-20T08:49:48.786Z">
      <saml:AudienceRestriction>
        <saml:Audience>http://sample.testmpass.gov.md</saml:Audience>
      </saml:AudienceRestriction>
    </saml:Conditions>
    <saml:AuthnStatement AuthnInstant="2014-10-20T08:38:19.703Z"
        SessionIndex="c5b3376a-a437-4b9c-addf-a3ca008e5883"
        SessionNotOnOrAfter="2014-10-20T08:48:19.697Z">
      <saml:SubjectLocality Address="127.0.0.1" />
      <saml:AuthnContext>
        <saml:AuthnContextClassRef>urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport</saml:AuthnContextClassRef>
      </saml:AuthnContext>
    </saml:AuthnStatement>
    <saml:AttributeStatement>
      <saml:Attribute Name="FirstName">
        <saml:AttributeValue>Admin</saml:AttributeValue>
      </saml:Attribute>
      <saml:Attribute Name="LastName">
        <saml:AttributeValue>Adminovich</saml:AttributeValue>
      </saml:Attribute>
    </saml:AttributeStatement>
  </saml:Assertion>
</samlp:Response>
```

Tabelul următor descrie atributele structurii:

| Element sau @Atribut | Tip | Valoare | Descriere |
|----------------------|------|-------|-------------|
| @ID | orice șir unic | obligatoriu | Generat de MPass, furnizat în scopuri de trasabilitate. |
| @InResponseTo | string | obligatoriu | Această valoare este setată la AuthnRequest/@ID-ul primit. Service poate utiliza această valoare pentru trasabilitate sau o poate verifica pentru a opri autentificările efectuate de terți chiar și în cazul furtului cheii private a Service-ului. |
| @Version | constantă | 2.0 | Această valoare este obligatorie și trebuie setată la „2.0”. |
| @IssueInstant | datetime | obligatoriu, valoare în UTC | Momentul de timp la care a fost generat acest Response. Pentru a minimiza riscul atacurilor replay, Service nu trebuie să accepte response-uri vechi. |
| @Destination | URL | obligatoriu | URL-ul destinației acestui Response. Poate fi verificat de Service pentru a opri response-uri destinate unui alt Service sau unui alt mediu de operare. |
| @Consent | URI | opțional | Informații suplimentare privind consimțământul utilizatorului. Poate fi setat la explicit (consimțământul a fost acordat explicit în timpul autentificării) sau prior (consimțământul a fost păstrat dintr-o autentificare anterioară). |
| Issuer | string | obligatoriu | Reprezintă emitentul acestui Response, care este, evident, una dintre instanțele MPass (mediul de dezvoltare, testare sau producție). |
| Signature | xml | obligatoriu | Conține semnătura MPass a acestui Response, aplicată folosind cheia privată a MPass. Service trebuie să verifice această semnătură. |
| Status | xml | obligatoriu | Conține detaliile de status ale Response. |
| Status/StatusCode/@Value | string | obligatoriu | Specifică statusul de nivel superior al acestui Response. Valorile posibile sunt Success (autentificare reușită), Requestor (eșec pe partea Service), Responder (eșec pe partea MPass sau a utilizatorului) și VersionMismatch. A se vedea [SAML Core, 3.2.2.2]. |
| Status/StatusCode/StatusCode/@Value | string | opțional | Cod de status de nivel secundar care specifică motivul statusului. A se vedea [SAML Core, 3.2.2.2]. |
| Status/StatusMessage | string | opțional | Mesaj suplimentar, lizibil pentru om, referitor la statusul Response. |
| Assertion | xml | inclus în Response de succes | Assertion SAML care include detaliile autentificării, condițiile de autentificare și identitatea autentificată. Dacă este solicitat de Service, MPass poate semna acest element în mod similar cu întregul Response. |
| Assertion/@ID | orice șir unic | obligatoriu | Specifică ID-ul acestei Assertion. |
| Assertion/@IssueInstant | datetime | obligatoriu, valoare în UTC | Momentul de timp la care a fost generată această Assertion. |
| Assertion/Issuer | string | obligatoriu | Reprezintă emitentul acestei Assertion, care este, evident, una dintre instanțele MPass (mediul de dezvoltare, testare sau producție). |
| Assertion/Subject | xml | obligatoriu | Conține detaliile identității autentificate (adică subiectul acesteia) și confirmarea autentificării. |
| Assertion/Subject/NameID | string | obligatoriu | Identificatorul numelui identității autentificate. De regulă, acesta este IDNP-ul rezidentului autentificat, dar poate fi și un nume de utilizator unic al MPass. |
| Assertion/Subject/SubjectConfirmation/SubjectConfirmationData/@Recipient | URL | obligatoriu | Specifică destinatarul preconizat al acestei Assertion. Identic cu Response/@Destination. Obligatoriu conform standardului SAML. |
| Assertion/Subject/SubjectConfirmation/SubjectConfirmationData/@InResponseTo | string | obligatoriu | Identic cu Response/@InResponseTo. Obligatoriu conform standardului SAML. |
| Assertion/Conditions | xml | obligatoriu | Conține condițiile în care această Assertion trebuie considerată valabilă. |
| Assertion/Conditions/@NotOnOrAfter | datetime | obligatoriu, valoare în UTC | Specifică momentul până la care această Assertion poate fi considerată valabilă. |
| Assertion/Conditions/AudienceRestriction/Audience | string | obligatoriu, pot fi mai multe | Specifică audiența preconizată pentru această Assertion. Service trebuie să verifice concordanța cu AuthnRequest/Issuer-ul propriu. Rețineți că o Assertion poate avea mai multe audiențe. |
| Assertion/AuthnStatement | xml | obligatoriu | Conține detaliile autentificării. |
| Assertion/AuthnStatement/@AuthnInstant | datetime | obligatoriu, valoare în UTC | Specifică momentul exact al autentificării. |
| Assertion/AuthnStatement/@SessionIndex | string | obligatoriu | Specifică ID-ul sesiunii MPass în cadrul căreia a fost autentificată identitatea. Trebuie utilizat în LogoutRequest/SessionIndex pentru a specifica sesiunea exactă din care se face delogarea. |
| Assertion/AuthnStatement/@SessionNotOnOrAfter | datetime | obligatoriu, valoare în UTC | Specifică momentul până la care sesiunea MPass este valabilă. |
| Assertion/AuthnStatement/SubjectLocality/@Address | adresă IP | opțional | Specifică adresa IP a clientului care a efectuat autentificarea, așa cum a fost observată de MPass. |
| Assertion/AuthnStatement/AuthnContext/AuthnContextClassRef | string | opțional | Specifică instrumentul sau metoda utilizată pentru autentificare. A se vedea [SAML Core, 2.7.2.2] și [SAML Authn Context, 3.4]. |
| Assertion/AttributeStatement | xml | obligatoriu | Conține valorile atributelor autoritative (adică claims) care reprezintă, sunt atribuite sau asociate identității autentificate. |
| Assertion/AttributeStatement/Attribute/@Name | string | obligatoriu | Numele atributului furnizat. |
| Assertion/AttributeStatement/Attribute/AttributeValue | string sau xml | opțional, pot fi mai multe | Conține valoarea atributului. Rețineți că unele atribute pot avea în mod natural mai multe valori (de exemplu, Role a identității în unele Service-uri). |

### Structura Logout Request

Un LogoutRequest este generat fie de un Service (ca urmare a solicitării explicite de delogare a utilizatorului), fie de MPass (pentru a efectua single logout, ca urmare a solicitării de delogare a utilizatorului de către un alt service în cadrul aceleiași sesiuni de autentificare sau a delogării directe a utilizatorului din interfața MPass).

Iată un exemplu de LogoutRequest generat de exemplul .NET:

```xml
<saml2p:LogoutRequest ID="_bdeed8e2-5c79-4d5b-8f93-2620f1219753" Version="2.0"
    IssueInstant="2014-10-20T08:51:44.8184811Z"
    Destination="http://devmpass.gov.md/logout/saml"
    xmlns:saml2p="urn:oasis:names:tc:SAML:2.0:protocol"
    xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion">
  <saml2:Issuer>http://sample.testmpass.gov.md</saml2:Issuer>
  <Signature xmlns="http://www.w3.org/2000/09/xmldsig#"><!-- ... --></Signature>
  <saml2:NameID>admin</saml2:NameID>
  <saml2p:SessionIndex>ae94d066-67ba-4296-b149-a3ca0091b24e</saml2p:SessionIndex>
</saml2p:LogoutRequest>
```

Tabelul următor descrie atributele structurii:

| Element sau @Atribut | Tip | Valoare | Descriere |
|----------------------|------|-------|-------------|
| @ID | orice șir unic | obligatoriu | Generat de MPass/Service, furnizat în scopuri de trasabilitate. |
| @InResponseTo | string | obligatoriu | Această valoare este setată la LogoutRequest/@ID-ul primit. Partea solicitantă poate utiliza această valoare pentru trasabilitate sau o poate verifica pentru a opri autentificările efectuate de terți chiar și în cazul furtului cheii private a părții respective. |
| @Version | constantă | 2.0 | Această valoare este obligatorie și trebuie setată la „2.0”. |
| Issuer | string | Obligatoriu | Reprezintă emitentul acestui LogoutResponse, de regulă sub formă de URL. |
| Signature | xml | Obligatoriu | Conține semnătura acestui LogoutRequest, aplicată folosind cheia privată a Issuer-ului. |
| NameID | string | Obligatoriu | Conține numele de utilizator (de regulă IDNP-ul) al utilizatorului autentificat, așa cum a fost returnat anterior de MPass în Response/Assertion/Subject/NameID. |
| SessionIndex | string | Obligatoriu | Conține ID-ul sesiunii returnate anterior de MPass în Response/Assertion/AuthnStatement/@SessionIndex. |

### Structura Logout Response

Un LogoutResponse este returnat ca răspuns la un LogoutRequest, fie de MPass (ca răspuns la solicitarea unui Service), fie de un service (ca răspuns la solicitarea de single logout venită din partea MPass).

Iată un exemplu de LogoutResponse de succes returnat de MPass ca răspuns la LogoutRequest de mai sus:

```xml
<samlp:LogoutResponse ID="_34650a27-f348-41cc-a2ef-e481d89a727c"
    InResponseTo="_bdeed8e2-5c79-4d5b-8f93-2620f1219753" Version="2.0"
    IssueInstant="2014-10-20T08:52:13.207Z"
    Destination="http://localhost:50341/Account/AfterLogout"
    xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
    xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion">
  <saml:Issuer>http://devmpass.gov.md</saml:Issuer>
  <Signature xmlns="http://www.w3.org/2000/09/xmldsig#"><!-- ... --></Signature>
  <samlp:Status>
    <samlp:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success" />
  </samlp:Status>
</samlp:LogoutResponse>
```

Tabelul următor descrie atributele structurii:

| Element sau @Atribut | Tip | Valoare | Descriere |
|----------------------|------|-------|-------------|
| @ID | orice șir unic | obligatoriu | Generat de MPass sau Service. Această valoare va fi/trebuie să fie returnată de MPass/Service în atributul LogoutResponse/@InResponseTo și poate fi verificată pentru a opri atacurile de tip replay. |
| @Version | constantă | 2.0 | Această valoare este obligatorie și trebuie setată la „2.0”. |
| @IssueInstant | datetime | obligatoriu, valoare în UTC | Momentul de timp la care a fost generat acest LogoutResponse. Pentru a minimiza riscul atacurilor replay, partea solicitantă nu trebuie să accepte response-uri vechi. |
| @Destination | URL | obligatoriu | URL-ul destinației acestui LogoutResponse. Poate fi verificat de partea solicitantă pentru a opri response-uri destinate unei alte părți sau unui alt mediu de operare. |
| Issuer | string | obligatoriu | Reprezintă emitentul acestui LogoutResponse, de regulă sub formă de URL. |
| Signature | xml | obligatoriu | Conține semnătura acestui LogoutResponse, aplicată folosind cheia privată a Issuer-ului. |
| Status | xml | obligatoriu | Conține detaliile de status ale LogoutResponse. |
| Status/StatusCode/@Value | string | obligatoriu | Specifică statusul de nivel superior al acestui LogoutResponse. Valorile posibile sunt Success (delogare reușită), Requestor (eșec pe partea solicitantă), Responder (eșec pe partea care răspunde) și VersionMismatch. A se vedea [SAML Core, 3.2.2.2]. |
| Status/StatusCode/StatusCode/@Value | string | opțional | Cod de status de nivel secundar care specifică motivul statusului. A se vedea [SAML Core, 3.2.2.2]. |
| Status/StatusMessage | string | opțional | Mesaj suplimentar, lizibil pentru om, referitor la statusul LogoutResponse. |
