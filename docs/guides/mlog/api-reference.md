## Reguli de tratare a erorilor

Pentru erorile rezultate în urma apelurilor interfeței REST, MLog returnează erori HTTP (fault) cu coduri de eroare și motive care descriu eroarea în limbaj simplu.

Pentru clienții care utilizează limbaje de programare ce suportă blocuri try… catch, tratarea erorilor HTTP este modalitatea corectă de gestionare a erorilor de invocare a serviciului.

| Cod de eroare | Descriere |
|------------|-------------|
| **400 Bad Request** | Cererea de intrare nu este un JSON valid<br><br>Orice altă eroare care nu poate fi ocolită – vă rugăm să rețineți că se oferă o explicație detaliată în răspuns. |
| **401 Unauthorized** | Se declanșează dacă evenimentul de intrare nu poate fi identificat ca aparținând vreunui SI |
| **404 Not Found** | URL-ul accesat nu este disponibil în acest moment (404).<br><br>Nu au fost găsite date pentru parametrii furnizați. |
| **413 Payload Too Large** | Informații despre limita maximă admisă a dimensiunii unui mesaj. Limita curentă pentru dimensiunea totală a mesajului este de 256 KB. |
| **500 Internal Server Error** | Eroare declanșată de o funcționare defectuoasă a sistemului MLog. Vă rugăm să contactați administratorii MLog în cazul în care primiți o astfel de eroare |

## Câmpuri predefinite ale evenimentului

Tabelul de mai jos listează câmpurile predefinite ale evenimentului:

| Denumire câmp | Tip/Lungime | Obligatoriu | Descriere |
|------------|-------------|-----------|-------------|
| **event_time** | datetime | Da | Momentul în care evenimentul s-a produs la sistemul sursă (nu momentul jurnalizării). |
| **event_type** | string | Da | Tipul evenimentului conform definiției SI, care de regulă reprezintă acțiunea întreprinsă care a generat acest eveniment (ex. Created, Authenticated, Deleted etc.).<br><br>Se recomandă următorul tipar: **System.X.Y**<br><br>Exemplu: MPass.User.Authenticated<br><br>MLog definește un subset de tipuri comune tuturor SI, care au scopul de a identifica evenimente speciale. Aceste evenimente fac obiectul unei procesări speciale (filtrare) prin înregistrarea lor în indici specifici, ulterior accesibili altor instituții/sisteme. |
| **event_id** | string | Nu | Identificatorul intern al evenimentului (de regulă unic) sau un alt tip de identificator intern de corelare (precum ID-ul tranzacției, cererii etc.), unic pentru sistemul care jurnalizează. |
| **event_correlation** | string | Nu | Un identificator utilizat pentru corelarea evenimentelor jurnalizate de sisteme diferite într-un anumit context, de regulă o acțiune a utilizatorului. |
| **event_level** | string | Nu | Clasificator al evenimentului. Fiecare SI care înregistrează evenimente în MLog poate utiliza propria definiție pentru acest câmp, de exemplu relevanța (ex. high/medium/low) sau impactul (warning/critical/fatal) etc. |
| **event_source** | string | Nu | Locul în care a fost generat evenimentul. Ex: denumirea clasei de logging, subcomponenta SI sau numele serverului etc. |
| **event_message** | string | Nu | Text liber care descrie evenimentul, indexat de MLog pentru căutare avansată de text. |
| **event_details** | string | Nu | Detalii ale evenimentului, precum un stack trace al unei excepții, un extras de document sau altele. Nu este indexat. |
| **legal_entity** | string | Nu | Entitatea juridică (organizația) în numele căreia a fost efectuată acțiunea (de către un utilizator sau automat).<br><br>De regulă este IDNO-ul organizației. |
| **legal_basis** | string | Nu | Temeiul legal pentru acțiunea întreprinsă. |
| **legal_reason** | string | Nu | Motivul pentru care a fost creat acest eveniment (ex. numărul cererii, numărul de telefon apelat etc.). |
| **user** | string | Nu | Utilizatorul care este proprietarul evenimentului (a participat la crearea acestuia).<br><br>De regulă este IDNP-ul utilizatorului. |
| **user_session** | string | Nu | Sesiunea utilizatorului în al cărei context s-a produs acțiunea. Acest atribut permite separarea acțiunii întreprinse de un utilizator, dacă acțiunea reprezintă un pas dintr-un flux. |
| **user_address** | string | Nu | Adresa IP a utilizatorului, locația sau orice altă formă care identifică de unde a acționat utilizatorul. |
| **subject** | string | Nu | Identificatorul lucrului sau persoanei care este afectată, discutată sau vizată de acest eveniment (de regulă un IDNP). Diferă de obiect, deoarece obiectul este direct implicat în acțiune. |
| **subject_type** | string | Nu | Tipul subiectului. |
| **subject_name** | string | Nu | Numele subiectului. |
| **object** | string | Nu | Identificatorul lucrului sau persoanei către care este direcționată acțiunea evenimentului. |
| **object_type** | string | Nu | Tipul obiectului. |
| **object_name** | string | Nu | Numele obiectului. |

Câmpul **event_time** acceptă formatele descrise de următoarea sintaxă (parantezele pătrate indică o parte opțională):

```
YYYY-MM-dd[THH:mm:ss[.SSS][Z|±HH[mm]]]
```

unde yyyy – anul, MM – luna (01-12), dd – ziua (01-31), HH – ora (00-23), mm – minutele (00-59), ss – secundele (00-59), SSS – milisecundele (000-999), ±HH[mm] – specificarea opțională a fusului orar (cu minute opționale).

Există doar 2 câmpuri obligatorii pentru înregistrarea unui mesaj: **event_time** și **event_type**. Celelalte câmpuri sunt opționale și pot să nu fie incluse în evenimentul de intrare. Mai mult, orice câmp poate avea mai multe valori, caz în care acestea trebuie jurnalizate ca array-uri JSON.

Este de asemenea posibilă utilizarea oricărei alte denumiri de câmp. În acest caz, câmpul va fi înregistrat ca tip string. Rețineți că denumirile care încep cu „_” (underline) sau „@” (at) sunt rezervate.

**Important:** Toate șirurile de caractere au o lungime maximă de 32766 bytes (32KB – 2 bytes). Rețineți că limita este exprimată în bytes, nu în caractere, ceea ce înseamnă că, dacă jurnalizați un șir UTF-8, limita reală este de 8191 caractere în cel mai defavorabil scenariu. Dacă aveți nevoie să stocați mai mult într-un câmp, solicitați o schemă specială de la administratorul MLog pentru a vi se configura un câmp neindexat.

**Observație:** este posibilă jurnalizarea obiectelor imbricate în evenimente. Acestea sunt convertite în obiecte complexe și pot fi interogate ulterior după denumirea câmpurilor lor. Totuși, această opțiune trebuie testată în mediul de staging înainte de a fi utilizată în producție, din cauza oricărui efect secundar pe care îl poate genera. În cazul în care câmpul personalizat stochează un obiect JSON, dar este necesar să fie salvat ca STRING în baza de date backend, acest lucru trebuie convenit cu administratorii MLog pentru o schemă specială.

## Evenimente speciale

MLog definește un subset de tipuri de evenimente comune tuturor SI, al căror scop este identificarea evenimentelor speciale. Aceste evenimente fac obiectul unei procesări speciale prin înregistrarea unei proiecții a câmpurilor evenimentului în indici speciali, ulterior accesibili altor instituții/sisteme.

MLog identifică evenimentele speciale de regulă prin analizarea câmpului event_type.

În prezent este definit un singur tip special de evenimente, și anume evenimentele legate de accesul la date cu caracter personal. Când câmpul event_type conține „PersonalData”, MLog va considera acest eveniment ca fiind de acest tip. Prin convenție, trebuie utilizat următorul format pentru acest câmp:

**PrefixulSistemuluiDvs.PersonalData.Actiune**

unde se recomandă următoarele valori pentru Acțiune:

| Acțiune | Descriere |
|--------|-------------|
| **Access** | Accesul electronic la date cu caracter personal. |
| **Export** | Exportul sau tipărirea datelor cu caracter personal, nu doar accesul. |
| **Validate** | Validarea datelor cu caracter personal, adică cererea conține date cu caracter personal, iar răspunsul doar confirmă corectitudinea datelor. |
| **Search** | Căutare inexactă a datelor cu caracter personal, ceea ce înseamnă că rezultatul poate conține informații despre mai multe persoane sau entități. |
| **Transfer** | Transferul sau sincronizarea datelor cu caracter personal, adică datele cu caracter personal sunt transferate către un alt sistem pentru procesare ulterioară. |

Tabelul de mai jos listează câmpurile evenimentului care fac parte din evenimentele speciale:

| Denumire câmp | Predefinit | PersonalData | Note |
|------------|-----------|--------------|-------|
| **event_time** | Da | Da | |
| **event_type** | Da | Da | A se vedea descrierea formatului de mai sus. |
| **event_correlation** | Da | Da | |
| **legal_entity** | Da | Da | Entitatea juridică care accesează datele cu caracter personal. |
| **legal_basis** | Da | Da | Temeiul legal pentru accesul la datele cu caracter personal. |
| **legal_reason** | Da | Da | Motivul legal pentru accesul la datele cu caracter personal. |
| **user** | Da | Da | IDNP-ul utilizatorului care a accesat datele cu caracter personal. |
| **user_address** | Da | Da | Adresa utilizatorului (de regulă adresa IP). |
| **subject** | Da | Da | IDNP-ul subiectului datelor cu caracter personal. |
| **subject_type** | Da | Da | Tipul subiectului datelor cu caracter personal (de regulă Persoană). |
| **subject_name** | Da | Da | Numele subiectului datelor cu caracter personal. |
| **object** | Da | Da | Obiectul legat de subiectul datelor cu caracter personal care este accesat (precum numărul de înmatriculare a autovehiculului etc.) |
| **object_type** | Da | Da | Tipul obiectului accesat (de ex. CarNumber). |

## Parametri permiși pentru operațiunile de căutare

Sistemul MLog poate accepta o listă de parametri ca date de intrare pentru operațiunea de căutare, după cum urmează:

### Pentru căutarea după UID:

| Denumire câmp | Tip/Lungime | Obligatoriu | Descriere |
|------------|-------------|-----------|-------------|
| **legal_entity** | string | Nu | Entitatea juridică care efectuează căutarea. Implicit, este setată la posesorul clientului MLog. |
| **legal_basis** | string | Nu | Temeiul legal pentru căutare. |
| **legal_reason** | string | Nu | Motivul legal pentru căutare. |
| **user** | string | Nu | IDNP-ul utilizatorului care caută evenimente. |
| **user_address** | string | Nu | Adresa utilizatorului (de regulă adresa IP). |

### Pentru căutarea după interval de timp:

| Denumire câmp | Tip/Lungime | Obligatoriu | Descriere |
|------------|-------------|-----------|-------------|
| **legal_entity** | string | Nu | Entitatea juridică care efectuează căutarea. Implicit, este setată la posesorul clientului MLog. |
| **legal_basis** | string | Da | Temeiul legal pentru căutare. |
| **legal_reason** | string | Nu | Motivul legal pentru căutare. |
| **user** | string | Nu | IDNP-ul utilizatorului care caută evenimente. |
| **user_address** | string | Nu | Adresa utilizatorului (de regulă adresa IP). |
| **event_time_from** | datetime | Da | Momentul de început al perioadei de căutare (inclusiv). |
| **event_time_to** | datetime | Da | Momentul de sfârșit al perioadei de căutare (exclusiv). |
| **filter** | listă separată prin virgulă | Nu | O listă de perechi cheie/valoare pentru câmpurile cunoscute de căutat. MLog va filtra doar evenimentele care corespund câmpurilor date. Formatul este field1=value1,field2=value2 etc. |
| **page** | număr (>=0) | Nu | Numărul paginii care urmează a fi returnată, în cazul în care există mai multe pagini de rezultate. Implicit, se consideră 0 (prima pagină). |
| **page_size** | număr (> 0) | Nu | Dimensiunea paginii aleasă. Implicit: 50. |

Câmpurile **event_time_from** și **event_time_to** acceptă același format ca și câmpul **event_time** înregistrat.

Numărul maxim de evenimente returnate este **page * page_size <= 10 000**.

## Semnarea unui eveniment

Sistemul MLog utilizează protocolul JSON Object Signing and Encryption (**JOSE/JWS**, a se vedea [1] și [2]) pentru semnarea unui mesaj.

Mai jos este un exemplu în JAVA care semnează și verifică un mesaj JSON:

```java
import java.io.FileInputStream;
import java.security.KeyStore;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

import javax.security.cert.X509Certificate;

import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.RSASSASigner;
import com.nimbusds.jose.crypto.RSASSAVerifier;

/**
* @author Constantin Stropsa constantin.stropsa@iello.ro
* @Aug 29, 2016
*
*/
public class JoseTest {
    /**
    * @param args
    */
    @SuppressWarnings("restriction")
    public static void main(final String[] args) throws Exception {
        //JKS file must contain a private key with "me" name – or update the 
        //code to point to a valid private key
        final KeyStore ks = KeyStore.getInstance("JKS");
        ks.load(new FileInputStream("D:/TTS-2.3.4/bin/client.jks"), 
            "changeit".toCharArray());
        
        final KeyStore.PrivateKeyEntry ppk = (KeyStore.PrivateKeyEntry) 
            ks.getEntry("me", new KeyStore.PasswordProtection("changeit".toCharArray()));
        
        final RSAPrivateKey privateKey = (RSAPrivateKey) ppk.getPrivateKey();
        
        final X509Certificate clientCertificate = new
            com.sun.security.cert.internal.x509.X509V1CertImpl(ppk.getCertificate().getEncoded());
        
        final JWSHeader.Builder header = new JWSHeader.Builder(JWSAlgorithm.RS256);
        header.keyID(clientCertificate.getSerialNumber().toString(16));
        System.out.println(header);
        
        // Create JWS object with event data
        JWSObject jwsObject = new JWSObject(header.build(), new Payload("{" +
            " \"event_time\" : \"2016-09-15T19:05:56.095Z\"," +
            " \"event_type\" : \"MLog.ClientQuery\"," +
            " \"legal_basis\" : \"As part of a test\"," +
            " \"legal_reason\" : \"As part of a test\"," +
            " \"event_message\" : \"from=12345;to=43321;basis=As part of direct UID search;reason=UID search;filter=UID=1;page=0;page_size=70\"" +
            "}"));
        
        final RSAPublicKey publicKey = (RSAPublicKey) clientCertificate.getPublicKey();
        
        // Create RSA-signer with the private key
        final JWSSigner signer = new RSASSASigner(privateKey);
        
        // Apply the HMAC to the JWS object
        jwsObject.sign(signer);
        
        // Output to URL-safe format
        final String serialized = jwsObject.serialize();
        System.out.println("SIGNED+SERIALIZED = " + serialized);
        System.out.println("-------------------");
        
        jwsObject = JWSObject.parse(serialized);
        final JWSVerifier verifier = new RSASSAVerifier(publicKey);
        System.out.println("Validate input = " + jwsObject.verify(verifier));
        System.out.println("FINAL = " + jwsObject.getPayload().toString());
    }
}
```

MLog utilizează modul compact al protocolului JOSE, afișat în formatul de mai jos. În Serializarea Compactă JWS, un JWS este reprezentat ca o concatenare:

```
BASE64URL(UTF8(JWS Protected Header)) || '.' ||
BASE64URL(JWS Payload) || '.' ||
BASE64URL(JWS Signature)
```

Pentru a activa semnarea JOSE într-un proiect, adăugați următoarele librării:

**Maven:**

http://mvnrepository.com/artifact/com.nimbusds/nimbus-jose-jwt/4.26

```xml
<dependency>
    <groupId>com.nimbusds</groupId>
    <artifactId>nimbus-jose-jwt</artifactId>
    <version>4.26</version><!-- or a newer version -->
</dependency>
```

**Mod offline** – descărcați și atașați următorul jar în proiect:

http://central.maven.org/maven2/com/nimbusds/nimbus-jose-jwt/4.26/nimbus-jose-jwt-4.26.jar
