# MLog — Examples

### Signing an event

MLog uses the JSON Object Signing and Encryption (JOSE/JWS, see [1] and [2]) protocol to sign a message.

Below is a Java example that signs and verifies a JSON message:

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

public class JoseTest {
  @SuppressWarnings("restriction")
  public static void main(final String[] args) throws Exception {
    // JKS file must contain a private key with name "me" – or update the code
    final KeyStore ks = KeyStore.getInstance("JKS");
    ks.load(new FileInputStream("D:/TTS-2.3.4/bin/client.jks"), "changeit".toCharArray());

    final KeyStore.PrivateKeyEntry ppk = (KeyStore.PrivateKeyEntry)
        ks.getEntry("me", new KeyStore.PasswordProtection("changeit".toCharArray()));

    final RSAPrivateKey privateKey = (RSAPrivateKey) ppk.getPrivateKey();
    final X509Certificate clientCertificate = new com.sun.security.cert.internal.x509.X509V1CertImpl(
        ppk.getCertificate().getEncoded());

    final JWSHeader.Builder header = new JWSHeader.Builder(JWSAlgorithm.RS256);
    header.keyID(clientCertificate.getSerialNumber().toString(16));

    JWSObject jwsObject = new JWSObject(header.build(), new Payload("{" +
        " \"event_time\" : \"2016-09-15T19:05:56.095Z\"," +
        " \"event_type\" : \"MLog.ClientQuery\"," +
        " \"legal_basis\" : \"As part of a test\"," +
        " \"legal_reason\" : \"As part of a test\"," +
        " \"event_message\" : \"from=12345;to=43321;basis=As part of direct UID search;reason=UID search;filter=UID=1;page=0;page_size=70\"" +
        "}\n{" +
        " \"event_time\" : \"2016-09-15T19:05:56.095Z\"," +
        " \"event_type\" : \"MLog.ClientQuery\"," +
        " \"legal_basis\" : \"As part of a test\"," +
        " \"legal_reason\" : \"As part of a test\"," +
        " \"event_message\" : \"from=12345;to=43321;basis=As part of direct UID search;reason=UID search;filter=UID=1;page=0;page_size=70\"" +
        "}"));

    final RSAPublicKey publicKey = (RSAPublicKey) clientCertificate.getPublicKey();

    // Sign
    final JWSSigner signer = new RSASSASigner(privateKey);
    jwsObject.sign(signer);

    // Serialize
    final String serialized = jwsObject.serialize();
    System.out.println("SIGNED+SERIALIZED = " + serialized);

    // Verify
    jwsObject = JWSObject.parse(serialized);
    final JWSVerifier verifier = new RSASSAVerifier(publicKey);
    System.out.println("Validate input = " + jwsObject.verify(verifier));

    System.out.println("FINAL = " + jwsObject.getPayload().toString());
  }
}
```

JWS compact serialization format:

```
BASE64URL(UTF8(JWS Protected Header)) || '.' ||
BASE64URL(JWS Payload) || '.' ||
BASE64URL(JWS Signature)
```

Dependency (Maven):

```xml
<dependency>
  <groupId>com.nimbusds</groupId>
  <artifactId>nimbus-jose-jwt</artifactId>
  <version>4.26</version> <!-- or a newer version -->
</dependency>
```

Reference:
- https://mvnrepository.com/artifact/com.nimbusds/nimbus-jose-jwt/4.26
- Offline JAR: https://repo1.maven.org/maven2/com/nimbusds/nimbus-jose-jwt/4.26/nimbus-jose-jwt-4.26.jar
