## Error Handling Rules

For errors resulted for REST interface invocations, MLog returns HTTP faults with fault codes and fault reasons describing the fault in plain English.

The clients that are using programming languages that support try… catch blocks, HTTP errors is the correct way to handle service invocation errors.

| Fault Code | Description |
|------------|-------------|
| **400 Bad Request** | The input request is not a valid JSON<br><br>Any other error which cannot be bypassed – please note the provide detailed explanation in the response. |
| **401 Unauthorized** | Triggered if the input event cannot be identified to be part of any IS |
| **404 Not Found** | The URL you have reached is not in service at this time (404).<br><br>No data found for provided parameters. |
| **413 Payload Too Large** | Information about the maximum allowed limit size for a message. Current limit for the whole message size is 256 KB. |
| **500 Internal Server Error** | Error triggered by a defective work of MLog system. Please contact MLog administrators in case you receive such an error |

## Predefined Event Fields

The following table lists the predefined event fields:

| Field Name | Type/Length | Mandatory | Description |
|------------|-------------|-----------|-------------|
| **event_time** | datetime | Y | The moment when the event happened at the source system (i.e. not the time of the logging). |
| **event_type** | string | Y | The type of the event according to IS definition, which usually represents the action taken that resulted in this event (ex. Created, Authenticated, Deleted, etc.).<br><br>The following pattern is recommended: **System.X.Y**<br><br>Example: MPass.User.Authenticated<br><br>MLog defines a sub-set of types common to all IS which have as scope to identify special events. These events are subject of special processing (filtering) by registering them into specific indices and later accessed by other institutions/systems. |
| **event_id** | string | N | The internal identifier of the event (usually unique) or some other kind of internal correlation identifier (such as the ID of transaction, request, etc.) unique for the logger system. |
| **event_correlation** | string | N | An identifier used to correlate events logged by different systems in some context, usually a user action. |
| **event_level** | string | N | Event classifier. Each IS which register events to MLog can use its own definition for this, e.g. relevance (ex. high/medium/low) or impact (warning/critical/fatal), etc. |
| **event_source** | string | N | Place where the event was generated. Ex: logging class name, IS sub-component, or server name, etc. |
| **event_message** | string | N | Free text that describes the event, indexed by MLog for advanced text search. |
| **event_details** | string | N | Event details, such as an exception stack trace, document extract or other. Not indexed. |
| **legal_entity** | string | N | The legal entity (organization) on behalf of which the action was performed (by a user or automatically).<br><br>Usually it is the IDNO of the organization. |
| **legal_basis** | string | N | Legal basis for taken action. |
| **legal_reason** | string | N | The reason why this event was created (ex. Application number, called phone number, etc.). |
| **user** | string | N | The user which is the owner of the event (participated at this event creation).<br><br>Usually it is the IDNP of the user. |
| **user_session** | string | N | User session in which context the action happened. This attribute permits to split the action taken by a user if the action is a step of a flow. |
| **user_address** | string | N | User IP address or location or any another form which identifies where the user acted from. |
| **subject** | string | N | The identifier of the thing or person that is impacted, discussed, or dealt with by this event (usually an IDNP). Different from the object, as the object is directly involved in the action. |
| **subject_type** | string | N | The type of the subject. |
| **subject_name** | string | N | The name of the subject. |
| **object** | string | N | The identifier of the thing or person to which the event action is directed. |
| **object_type** | string | N | The type of the object. |
| **object_name** | string | N | The name of the object. |

The **event_time** field accepts formats described by the following syntax (square parenthesis meaning optional part):

```
YYYY-MM-dd[THH:mm:ss[.SSS][Z|±HH[mm]]]
```

where yyyy – year, MM – month (01-12), dd – day (01-31), HH – hour (00-23), mm – minutes (00-59), ss – seconds (00-59), SSS – milliseconds (000-999), ±HH[mm] – optional time zone offset specification (with optional minutes).

There are only 2 fields which are mandatory for registering a message: **event_time** and **event_type**. Other fields are optional and may not be included in the input event. Moreover, any field can have more than one value in which case they must be logged as JSON arrays.

It is also possible to use any other field name. In this case, the field will be registered as a string type. Note that names starting with "_" (underline) or "@" (at) are reserved.

**Important:** All strings have a maximum length of 32766 bytes (32KB – 2 bytes). Notices that the limit is in bytes, not characters, meaning that if you journal an UTF-8 string, the actual limit is 8191 characters in worst case scenario. If you need to store more in some field, ask for a special schema from MLog administrator to get a non-indexed field configured for you.

**Remark:** it is possible to log nested objects in the events. They are converted into complex objects and later can be interrogated as by their field names. Still, this option shall be tested in the staging environment before using it in production for any side effect which it may generate. In case the custom field stores a JSON object but it is required to be saved as STRING in the backend database it must be agreed with MLog administrators for a special schema.

## Special Events

MLog defines a sub-set of event types common to all IS which have as scope to identify special events. These events are subject of special processing by registering a projection of the event fields into special indices and later accessed by other institutions/systems.

MLog identifies special events usually by analysing event_type field.

Currently only one special type of events is defined, particularly events related to personal data access. When event_type field contains "PersonalData" MLog will consider this event as such. By convention, the following format for this field must be used:

**YourSystemPrefix.PersonalData.Action**

where the following Action values are recommended:

| Action | Description |
|--------|-------------|
| **Access** | Electronic access of personal data. |
| **Export** | Export or printing of personal data, not just access. |
| **Validate** | Personal data validation, i.e. the request contains personal data, the response just confirms the correctness of the data. |
| **Search** | Inexact search of personal data, meaning that the result might contain information about more than one person or entity. |
| **Transfer** | Personal data transfer or synchronization, i.e. the personal data is transferred to some system for later processing. |

The following table lists the event fields that are part of special events:

| Field Name | Predefined | PersonalData | Notes |
|------------|-----------|--------------|-------|
| **event_time** | Y | Y | |
| **event_type** | Y | Y | Please see the format description above. |
| **event_correlation** | Y | Y | |
| **legal_entity** | Y | Y | Legal entity that is accessing the personal data. |
| **legal_basis** | Y | Y | Legal basis for personal data access. |
| **legal_reason** | Y | Y | Legal reason for personal data access. |
| **user** | Y | Y | IDNP of the user that accessed personal data. |
| **user_address** | Y | Y | User address (usually IP address). |
| **subject** | Y | Y | Personal data subject IDNP. |
| **subject_type** | Y | Y | Personal data subject type (usually Person). |
| **subject_name** | Y | Y | Personal data subject name. |
| **object** | Y | Y | Object related to the personal data subject that is accessed (such as car number, etc.) |
| **object_type** | Y | Y | Type of the accessed object (e.g. CarNumber). |

## Allowed Parameters for Search Operations

MLog system can accept a list of parameters as input for search operation as below:

### For search by UID:

| Field Name | Type/Length | Mandatory | Description |
|------------|-------------|-----------|-------------|
| **legal_entity** | string | N | Legal entity that performs the search. By default, this is set to MLog client owner. |
| **legal_basis** | string | N | Legal base for search. |
| **legal_reason** | string | N | Legal reason for search. |
| **user** | string | N | IDNP of the user that searches for events. |
| **user_address** | string | N | User address (usually IP address). |

### For search by time range:

| Field Name | Type/Length | Mandatory | Description |
|------------|-------------|-----------|-------------|
| **legal_entity** | string | N | Legal entity that performs the search. By default, this is set to MLog client owner. |
| **legal_basis** | string | Y | Legal base for search. |
| **legal_reason** | string | N | Legal reason for search. |
| **user** | string | N | IDNP of the user that searches for events. |
| **user_address** | string | N | User address (usually IP address). |
| **event_time_from** | datetime | Y | Start time for period to search (inclusive). |
| **event_time_to** | datetime | Y | End time for period to search (exclusive). |
| **filter** | comma separated list | N | A list of key/value for the known fields to search. MLog will filter only those events that match these given fields. The format is field1=value1,field2=value2, etc. |
| **page** | number (>=0) | N | The page number to be returned in case there are more than 1 page on the results. By default this is considered to be 0 (first page). |
| **page_size** | number (> 0) | N | The chosen page size. Default: 50. |

The fields **event_time_from** and **event_time_to** accept the same format as registered **event_time** field.

Maximum number of returned events is **page * page_size <= 10,000**.

## Signing an Event

MLog system uses the JSON Object Signing and Encryption (**JOSE/JWS**, see [1] and [2]) protocol to sign a message.

Below is a JAVA example that sign and check a JSON message:

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

MLog uses the compact mode of JOSE protocol, which are displayed in the following format. In the JWS Compact Serialization, a JWS is represented as the concatenation:

```
BASE64URL(UTF8(JWS Protected Header)) || '.' ||
BASE64URL(JWS Payload) || '.' ||
BASE64URL(JWS Signature)
```

In order to enable JOSE signing in a project, add the following libraries to it:

**Maven:**

http://mvnrepository.com/artifact/com.nimbusds/nimbus-jose-jwt/4.26

```xml
<dependency>
    <groupId>com.nimbusds</groupId>
    <artifactId>nimbus-jose-jwt</artifactId>
    <version>4.26</version><!-- or a newer version -->
</dependency>
```

**Offline mode** – download and attach the following jar to the project:

http://central.maven.org/maven2/com/nimbusds/nimbus-jose-jwt/4.26/nimbus-jose-jwt-4.26.jar
