## Exemplu .NET

Acest document este însoțit de un exemplu de integrare .NET. Dacă arhiva cu exemplul este criptată (pentru a permite trecerea prin filtrele de e-mail), parola este "mpay" (fără ghilimele).

Exemplul demonstrează o implementare completă a scenariului Comandă și Plătește online. Exemplul include o implementare offline simplă a MPay, inclusiv un buton fals „Plătește", care simulează o plată.

### Cerințe software

Exemplul este construit folosind Visual Studio 2013, bazat pe ASP.NET 4.5, MVC 5 și WCF, utilizând C# și managerul de pachete NuGet. Aplicațiile MVC sunt configurate să ruleze sub IIS Express. Nu sunt necesare licențe terțe pentru compilarea exemplului.

### Instalarea sau regenerarea certificatelor

Exemplul include câteva certificate autosemnate care sunt folosite în configurație pentru semnarea mesajelor SOAP. Certificatele incluse pot fi găsite în folderul sample\Certificates. Parola pentru toate cheile private este "123456".

Pentru a instala certificatele pe mașina dumneavoastră de dezvoltare, rulați fișierul batch InstallCertificates.cmd cu drepturi de administrator din Developer Command Prompt for Visual Studio. De asemenea, puteți regenera certificatele rulând fișierul batch GenerateCertificets.cmd.

Tabelul de mai jos descrie semnificația fișierelor generate.

| Nume fișier | Descriere | Depozit de certificate (Certificate Store) |
|-----------|-------------|-------------------|
| MPaySampleRootCA.cer | Certificatul rădăcină autosemnat al exemplului (root CA) | Trusted Root Certification Authorities |
| MPaySampleRootCA.pvk | Cheia privată a certificatului rădăcină | niciunul |
| MPaySampleRootCA.crl | Lista de revocare a certificatului rădăcină | Trusted Root Certification Authorities |
| MPaySampleServiceProvider.pfx | Perechea de chei (privată și publică, semnate de root CA) utilizată de implementarea exemplu a prestatorului de servicii | Personal |
| MPayOfflineSample.pfx | Perechea de chei (privată și publică, semnate de root CA) utilizată de implementarea exemplu offline MPay | Personal și Trusted People |

### Rularea exemplului

Pentru a rula exemplul, urmați pașii de mai jos:

1. Asigurați-vă că certificatele sunt instalate corect în depozitul LocalMachine, conform descrierii din secțiunea anterioară.
2. Rulați VS2013 ca Administrator și deschideți soluția MPay.Sample.sln.
3. Setați MPay.Sample.ServiceProvider ca StartUp Project.
4. Recompilați soluția (Rebuild).
5. Rulați soluția.
6. Ar trebui să se deschidă un browser, afișând pagina principală a exemplului de prestator de servicii.
7. Apăsați pe butonul „Comandă" (Order).
8. Veți fi redirecționat către exemplul offline MPay, care va afișa detaliile noii comenzi și va propune „Plătește".
9. Apăsați pe butonul „Plătește" (Pay).

Veți fi redirecționat înapoi la pagina de status a comenzii din exemplul de prestator de servicii.

Când apăsați „Comandă" (pasul 7 de mai sus), practic executați pașii 1-6 descriși în scenariul Comandă și Plătește online. Când apăsați „Plătește" (pasul 9 de mai sus), vedeți o implementare exemplu a pașilor 7-15.

### Tratarea erorilor

Pentru un exemplu privind modul de generare a erorilor SOAP, consultați metoda ajutătoare numită MPay.Sample.ServiceProvider.Api.ServiceProvider.Error. Există o enumerare internă ErrorCode definită doar din motive de comoditate.

Un exemplu privind modul de generare (sau aruncare) a unei astfel de erori poate fi găsit în operația MPay.Sample.ServiceProvider.Api.ServiceProvider.ConfirmOrderPayment.

Un exemplu privind modul de tratare (sau captare) a unor astfel de erori poate fi găsit în acțiunea MPay.Sample.Offline.Controllers.ServiceController.Pay.

### Salvarea mesajelor SOAP

Pentru un exemplu privind modul de salvare a unei cereri SOAP primite, consultați codul operației MPay.Sample.ServiceProvider.Api.ServiceProvider.ConfirmOrderPayment (necesitatea este descrisă în 9.3). Rețineți că mesajul complet al cererii SOAP primite este salvat în proprietatea ConfirmationSignature a Plății (Payment).

### Restricții privind structura mesajului SOAP

Într-un mesaj SOAP cu semnătură digitală, elementul KeyInfo face parte din standardul XML Signature (XMLDSIG) și servește la furnizarea de informații despre cheia publică folosită pentru semnarea mesajului, permițând destinatarului să verifice semnătura digitală.

În calitate de ClientService, MPay acceptă structura de răspuns în următoarele formate ale elementului KeyInfo:

#### Referință la token de securitate (Security token reference)

```xml
<wsse:BinarySecurityToken EncodingType="...#Base64Binary" ValueType="...#X509v3" 
wsu:Id="SomeCert">
.... 
</wsse:BinarySecurityToken>
...
<ds:KeyInfo>
 <wsse:SecurityTokenReference>
 <wsse:Reference URI='#SomeCert' 
 ValueType="...#X509v3" />
 </wsse:SecurityTokenReference>
</ds:KeyInfo>
```

#### Identificator de cheie (Key identifier)

```xml
<ds:KeyInfo xmlns:ds="https://www.w3.org/2000/09/xmldsig#">
 <wsse:SecurityTokenReference>
 <wsse:KeyIdentifier ValueType="http://docs.oasis-open.org/wss/2004/01
 /oasis-200401-wss-x509-token-profile-1.0#X509v3SubjectKeyIdentifier">
 /62wXO...
 </wsse:KeyIdentifier>
 </wsse:SecurityTokenReference>
</ds:KeyInfo>
```

#### Încorporat (Embedded)

```xml
<ds:KeyInfo xmlns:ds="https://www.w3.org/2000/09/xmldsig#">
 <X509Data>
 <X509Certificate>MIIG...NILA</X509Certificate>
</X509Data>
</ds:KeyInfo>
```

## Mesaje SOAP

Vom oferi aici exemple de mesaje SOAP schimbate. Acest lucru poate fi util pentru cei care se integrează cu MPay, dar nu suportă pe deplin generarea de proxy de serviciu bazată pe WSDL.

---

### GetOrderDetails

#### Cerere:

```xml
<soapenv:Envelope xmlns:mpay="https://mpay.gov.md"
xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
<soapenv:Header>
<wsse:Security soapenv:mustUnderstand="1" xmlns:wsse="http://docs.oasisopen.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"
xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility1.0.xsd">
<wsse:BinarySecurityToken EncodingType="http://docs.oasisopen.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary"
ValueType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-x509-token-profile1.0#X509v3" wsu:Id="X509-
8F7ADA56D4F68BB353175213197193913">MIIG.....tYw=</wsse:BinarySecurityToken>
<ds:Signature Id="SIG-8F7ADA56D4F68BB353175213197194017"
xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
<ds:SignedInfo>
<ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-excc14n#">
<ec:InclusiveNamespaces PrefixList="mpay soapenv"
xmlns:ec="http://www.w3.org/2001/10/xml-exc-c14n#"/>
</ds:CanonicalizationMethod>
<ds:SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/>
<ds:Reference URI="#TS-8F7ADA56D4F68BB353175213197193812">
<ds:Transforms>
<ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#">
<ec:InclusiveNamespaces PrefixList="wsse mpay soapenv"
xmlns:ec="http://www.w3.org/2001/10/xml-exc-c14n#"/>
</ds:Transform>
</ds:Transforms>
<ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
<ds:DigestValue>cuDWXCuN3wB0sEDyC5kP1YuWgm8=</ds:DigestValue>
</ds:Reference>
<ds:Reference URI="#id-8F7ADA56D4F68BB353175213197193916">
<ds:Transforms>
<ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#">
<ec:InclusiveNamespaces PrefixList="mpay"
xmlns:ec="http://www.w3.org/2001/10/xml-exc-c14n#"/>
</ds:Transform>
</ds:Transforms>
<ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
<ds:DigestValue>2Cq8myeEKRtr73N9eiy4N0cfmHE=</ds:DigestValue>
</ds:Reference>
</ds:SignedInfo>
<ds:SignatureValue>aLBDmWd4us1L6rq/55Wg7xGFqD+EBYmcaK13y3dp9GVRYIt95q84zAVOkIg3
+GPrvd1AiacSvPKTuhoF1wzCqmFVSsv8b65xEn3wof5mT6rZychmefv6gLeRWODSMUo9WZ7ql6llLPE9gttyy/rjfdF
eYHi3Y5LwTjLnTWUTgeYbb8M0oCoq78JetgWQka/2UsEdJUZwQ200vouWSwFSLzH9p8fAU6rv/MIxo+x2GqbQlFfM8T
0hulZipULkJpDPaa+z0/+VT4LCaALZuhjjRxEZCPwl2rroFpHDR9mA7wOl5vLrIpOwywImvWJg4SUjE5m6YcCKRlGDw
atXdT0Cqw==</ds:SignatureValue>
<ds:KeyInfo Id="KI-8F7ADA56D4F68BB353175213197193914">
<wsse:SecurityTokenReference wsu:Id="STR-8F7ADA56D4F68BB353175213197193915">
<wsse:Reference URI="#X509-8F7ADA56D4F68BB353175213197193913"
ValueType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-x509-token-profile1.0#X509v3"/>
</wsse:SecurityTokenReference>
</ds:KeyInfo>
</ds:Signature>
<wsu:Timestamp wsu:Id="TS-8F7ADA56D4F68BB353175213197193812">
<wsu:Created>2025-07-10T07:19:31.938Z</wsu:Created>
<wsu:Expires>2025-07-10T07:20:31.938Z</wsu:Expires>
</wsu:Timestamp>
</wsse:Security>
</soapenv:Header>
<soapenv:Body wsu:Id="id-8F7ADA56D4F68BB353175213197193916"
xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility1.0.xsd">
<mpay:GetOrderDetails>
<!--Optional:-->
<mpay:query>
<!--Optional:-->
<mpay:Language>RO</mpay:Language>
<mpay:OrderKey>MDS02250710092629689</mpay:OrderKey>
<mpay:ServiceID>MDS02</mpay:ServiceID>
</mpay:query>
</mpay:GetOrderDetails>
</soapenv:Body>
</soapenv:Envelope>
```

#### Răspuns:

```xml
<Envelope xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurityutility-1.0.xsd" xmlns="http://schemas.xmlsoap.org/soap/envelope/">
<Header>
<Security xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecuritysecext-1.0.xsd">
<wsu:Timestamp wsu:Id="TS-0e447cf3a38f487a940ef879a0500fa9">
<wsu:Created>2025-07-10T07:19:25.575Z</wsu:Created>
<wsu:Expires>2025-07-10T07:24:25.575Z</wsu:Expires>
</wsu:Timestamp>
<Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
<SignedInfo>
<CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-excc14n#"/>
<SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/>
<Reference URI="#BD-0e447cf3a38f487a940ef879a0500fa9">
<Transforms>
<Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
</Transforms>
<DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
<DigestValue>KLhSiVXzqBnQf/CViydIvq3iNmQ=</DigestValue>
</Reference>
<Reference URI="#TS-0e447cf3a38f487a940ef879a0500fa9">
<Transforms>
<Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
</Transforms>
<DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
<DigestValue>e4x2F6eKgfGTt0Yh5rwZP6I+OPU=</DigestValue>
</Reference>
</SignedInfo>
<SignatureValue>lKA/KUZvT70cVfd2oYnDoDhJLxw1tcshQlQqd+OwcbU+mAw/OfEsYcVuaZQ875d
pL9v28sUcBcBGPFZW+Py7ddDkxkipr3uss4ijfv4Pps4OunslVv3XsZ9jUhWx3NUO9ISrvp/8wkLezjBU26Ug/wZewT
RyTPdYIkYULBYKwq4Zw0mCgN5AONCNhQSq3zYfsETTUFgxkSm8HAtVRuLBdb/u7FrFPxO8OCNZP0FTRyheazHJvNfbH
CM4uXGTYki65gVxURBaRH07lrWkCkZJooq5ceZ7Air0j7TN1WI9/8h3Km4f1z9Dv8Rjo3Idmcd4s34eBy/bYSyWsNIv
62eSZQ==</SignatureValue>
<KeyInfo>
<X509Data>
<X509Certificate>MIIG...NILA</X509Certificate>
</X509Data>
</KeyInfo>
</Signature>
</Security>
</Header>
<Body wsu:Id="BD-0e447cf3a38f487a940ef879a0500fa9">
<GetOrderDetailsResponse xmlns="https://mpay.gov.md">
<GetOrderDetailsResult>
<OrderDetails xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
<Currency>MDL</Currency>
<CustomerID>2006022048426</CustomerID>
<CustomerName>Nume Prenume</CustomerName>
<CustomerType>Person</CustomerType>
<IssuedAt>2025-07-10T09:26:29.463</IssuedAt>
<Lines>
<OrderLine>
<AllowAdvancePayments>false</AllowAdvancePayments>
<AllowPartialPayments>false</AllowPartialPayments>
<AmountDue>9267.00</AmountDue>
<DestinationAccount>
<BankAccount>MD77TRGAAA14153401000000</BankAccount>
<BankCode>TREZMD2X</BankCode>
<BankFiscalCode>1006601000255</BankFiscalCode>
<BeneficiaryName>Agenția Moldsilva</BeneficiaryName>
</DestinationAccount>
<LineID>Base:1|Nb-1</LineID>
<Properties>
<OrderProperty>
<DisplayName>Descrierea plății</DisplayName>
<Id>7254f94c-6da5-4b3e-be53-613b84c5ca96</Id>
<IsVisible>true</IsVisible>
<Name>Description</Name>
<Required>true</Required>
<Type>LineDescription</Type>
<Value>Plata pentru arenda terenului fondului forestier</Value>
</OrderProperty>
</Properties>
<Reason>Agenția Moldsilva</Reason>
</OrderLine>
</Lines>
<OrderKey>MDS02250710092629689</OrderKey>
<Properties>
<OrderProperty>
<DisplayName>Nr. de telefon de contact</DisplayName>
<Id>ff247faa639344ae87f81b2f0311d7ab</Id>
<IsVisible>true</IsVisible>
<Name>Telephone</Name>
<Required>true</Required>
<Type>number</Type>
<Value>060606060</Value>
</OrderProperty>
<OrderProperty>
<DisplayName>Data contractului</DisplayName>
<Id>59ff92655b7a4ac9b7313bc450031af2</Id>
<IsVisible>true</IsVisible>
<Name>Date</Name>
<Required>true</Required>
<Type>string</Type>
<Value>25.01.2025</Value>
</OrderProperty>
<OrderProperty>
<DisplayName>IDNP/IDNO plătitor</DisplayName>
<Id>75047d2458d74199aaee59c2016aa123</Id>
<Name>IDNP</Name>
<Required>true</Required>
<Type>idn</Type>
<Value>2006022048426</Value>
</OrderProperty>
<OrderProperty>
<DisplayName>Nr. contract</DisplayName>
<Id>440f156964a344fa8270d88789fe81e5</Id>
<IsVisible>true</IsVisible>
<Name>Contract</Name>
<Required>true</Required>
<Type>string</Type>
<Value>23215</Value>
</OrderProperty>
<OrderProperty>
<DisplayName>Nume/prenume sau denumire plătitor</DisplayName>
<Id>a191635dbe004552bfc9d972974ac861</Id>
<Name>Name</Name>
<Required>true</Required>
<Type>CustomerName</Type>
<Value>Nume Prenume</Value>
</OrderProperty>
<OrderProperty>
<DisplayName>Tip plătitor</DisplayName>
<Id>44726274de214e638febf2230024345b</Id>
<IsVisible>true</IsVisible>
<Name>PayerType</Name>
<Required>true</Required>
<Type>CustomerType</Type>
<Value>Person</Value>
</OrderProperty>
</Properties>
<Reason>Agenția Moldsilva plata pentru arenda terenului fondului 
forestier</Reason>
<ServiceID>MDS02</ServiceID>
<Status>Active</Status>
<TotalAmountDue>9267.00</TotalAmountDue>
</OrderDetails>
</GetOrderDetailsResult>
</GetOrderDetailsResponse>
</Body>
</Envelope>
```

### ConfirmOrderPayment

#### Cerere:

```xml
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility1.0.xsd">
<Header xmlns="http://schemas.xmlsoap.org/soap/envelope/">
<Security xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecuritysecext-1.0.xsd">
<BinarySecurityToken wsu:Id="ST-653470e3c2154f72aa12ccc097940986"
EncodingType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-messagesecurity-1.0#Base64Binary" ValueType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-
wss-x509-token-profile-1.0#X509v3"> MIIG.....tYw=</BinarySecurityToken>
<wsu:Timestamp wsu:Id="TS-653470e3c2154f72aa12ccc097940986">
<wsu:Created>2025-07-10T07:51:25.959Z</wsu:Created>
<wsu:Expires>2025-07-10T07:56:25.959Z</wsu:Expires>
</wsu:Timestamp>
<Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
<SignedInfo>
<CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#" />
<SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1" />
<Reference URI="#BD-653470e3c2154f72aa12ccc097940986">
<Transforms>
<Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#" />
</Transforms>
<DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1" />
<DigestValue>KFpPQEmhgt0B7hYK0kNtsgE4czs=</DigestValue>
</Reference>
<Reference URI="#TS-653470e3c2154f72aa12ccc097940986">
<Transforms>
<Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#" />
</Transforms>
<DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1" />
<DigestValue>Mi1u52oz+KjRyRphaArhcdKZ2Eg=</DigestValue>
</Reference>
</SignedInfo>
<SignatureValue>IIwVdwCoe7cx6VFgFO+/nZ2bkhG347nBqmJCoqwcQhtVBwOYN3tf6CCDCjAoexKbRLp
NnXzFnXDfXI+zPb/eoQpMfkqiqRGgqbOcd0mfHYF85bug6qz9h7zngPyBalxNopTAIc4LdZwEJVHW16aJJ/OeDeIgaG
iNBKqNNu0H7G1DppLFWRo+NTZ6+tFuH+97ulxUbhzMIrpaD5wQH95GIn7qFkvMqBI+GjDUC/xc97LWmdF0F9YLpDe4U
PMhwznxRSyBHiyh38lslzAm2Nee3Gp8CWNAE5J9hgzy4vWvdgc9lrDSllQ+UPNsZaQHFMybWzp66MfHRhKNRUYuTjOp
oA==</SignatureValue>
<KeyInfo>
<SecurityTokenReference xmlns="http://docs.oasis-open.org/wss/2004/01/oasis200401-wss-wssecurity-secext-1.0.xsd">
<Reference ValueType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wssx509-token-profile-1.0#X509v3" URI="#ST-653470e3c2154f72aa12ccc097940986" />
</SecurityTokenReference>
</KeyInfo>
</Signature>
</Security>
</Header>
<s:Body wsu:Id="BD-653470e3c2154f72aa12ccc097940986">
<ConfirmOrderPayment xmlns="https://mpay.gov.md">
<confirmation xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
<Currency>MDL</Currency>
<InvoiceID>00069002233014</InvoiceID>
<Lines>
<PaymentConfirmationLine>
<Amount>9267.00</Amount>
<DestinationAccount />
<LineID>Base:1|Nb-1</LineID>
<Properties>
<PaymentProperty>
<Name>Cont beneficiar</Name>
<Value>MD77TRGAAA14153401000000</Value>
</PaymentProperty>
...
<PaymentProperty>
<Name>HO:Telephone</Name>
<Value>060606060</Value>
</PaymentProperty>
<PaymentProperty>
<Name>HO:Date</Name>
<Value>25.01.2025</Value>
</PaymentProperty>
</Properties>
</PaymentConfirmationLine>
</Lines>
<OrderKey>MDS02250710092629689</OrderKey>
<PaidAt>2025-07-10T10:51:23</PaidAt>
<PaymentID>79042133</PaymentID>
<Properties>
<PaymentProperty>
<Name>Bank</Name>
<Value>MAIB (Card)</Value>
</PaymentProperty>
</Properties>
<ServiceID>MDS02</ServiceID>
<TotalAmount>9267.00</TotalAmount>
</confirmation>
</ConfirmOrderPayment>
</s:Body>
</s:Envelope>
```

#### Răspuns:

```xml
<Envelope xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurityutility-1.0.xsd" xmlns="http://schemas.xmlsoap.org/soap/envelope/">
<Header>
<Security xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecuritysecext-1.0.xsd">
<wsu:Timestamp wsu:Id="TS-e12b4bcbdc994043871f9e0de6a523be">
<wsu:Created>2025-07-10T07:51:24.321Z</wsu:Created>
<wsu:Expires>2025-07-10T07:56:24.321Z</wsu:Expires>
</wsu:Timestamp>
<Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
<SignedInfo>
<CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#" />
<SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1" />
<Reference URI="#BD-e12b4bcbdc994043871f9e0de6a523be">
<Transforms>
<Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#" />
</Transforms>
<DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1" />
<DigestValue>nsrD0CSFA8NZUqTLhXehvS7CeA4=</DigestValue>
</Reference>
<Reference URI="#TS-e12b4bcbdc994043871f9e0de6a523be">
<Transforms>
<Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#" />
</Transforms>
<DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1" />
<DigestValue>THtjbIflgW5fpzFymYGqCPaZINM=</DigestValue>
</Reference>
</SignedInfo>
<SignatureValue>IEokrdnruG8mli9O9GjE2+z0TnLQjNbYv3/uoLzSgVoH65PCoAZgQ79+RJw9bMC2eam
pwttcFTajImrgf6up8rpstKRNWemXbV3MmYbMdJQkQ9yhsfNEVdSMTzJsWAC9JSLzhkO1jm3ZA5lt414KwMNPaVMoOU
AgCKuLZd7lYJQ7xcrSmI7U7v7yITdXHihGDDiYvf9WTJUYdFZXk6zHWCSgvxusFVf6pBBriXjxlMOKBYTHdgyjWgVsy
HVBvJVsjvV5lfCD01Ssa9vWm2voLgEuxNxDPuHa4uNdrRdeWKbFRapanHxhLDsh6V33vttHokhUoz42djUsvld1mfp9
TA==</SignatureValue>
<KeyInfo>
<X509Data>
<X509Certificate> MIIG...NILA</X509Certificate>
</X509Data>
</KeyInfo>
</Signature>
</Security>
</Header>
<Body wsu:Id="BD-e12b4bcbdc994043871f9e0de6a523be">
<ConfirmOrderPaymentResponse xmlns="https://mpay.gov.md" />
</Body>
</Envelope>
```
