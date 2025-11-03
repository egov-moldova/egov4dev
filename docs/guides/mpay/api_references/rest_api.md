# MPay Frontend API

Comunicarea cu resursa API-ul al MPay Frontend are loc prin protocolul standard HTTP (HTTP /1.1) arfitectura REST. Accesul către API necesită configurarea IP-ului public în whitelist. Contractul tehnic (Swagger) al resursei API se găsește la adresele [https://testmpay.gov.md:8443/openapi/index.html](https://testmpay.gov.md:8443/openapi/index.html) mediul de test și [https://testmpay.gov.md:8443/openapi/index.html](https://mpay.gov.md:8443/openapi/index.html) pentru mediul de producție.

##**Obțineți numărul notei de plată MPay (InvoiceID)**

Pentru a genera numărul notei de plată MPay (InvoiceID), sistemul dvs informațional efectuează un apel REST.  Vedeți descrierea parametrilor în acest apel.

<table>
  <tbody>
    <tr>
      <th>Metoda</th>
      <td>GET</td>
    </tr>
    <tr>
      <th>URL</th>
      <td>
        Test: <a href="https://testmpay.gov.md:8443/api/invoices?serviceID={serviceID}&orderKey={orderKey}" target="_blank">https://testmpay.gov.md:8443/api/invoices?serviceID={serviceID}&orderKey={orderKey}</a><br>
        Prod: <a href="https://mpay.gov.md:8443/api/invoices?serviceID={serviceID}&orderKey={orderKey}" target="_blank">https://mpay.gov.md:8443/api/invoices?serviceID={serviceID}&orderKey={orderKey}</a>

      </td>
    </tr>
    <tr>
      <th>Descriere</th>
      <td>Prestatorul de servicii poate genera numărul notei de plată MPay (InvoiceID) pentru a fi utilizat în procesul de business (de ex. pentru a-l imprima sau înregistra în sistemul propriu).</td>
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
      <td colspan="4">Parametrii de ieșire</td>
    </tr>
    <tr>
      <td>n/a</td>
      <td>Array</td>
      <td>Opțional</td>
      <td>Lista de InvoiceID-uri MPay (numere note de plată)</td>
    </tr>
  </tbody>
</table>

##**Obțineți nota de plată MPay în format PDF**

Pentru a genera nota de plată MPay în format PDF, sistemul dvs informațional efectuează un apel REST. Vedeți descrierea parametrilor în acest apel.

<table>
  <tbody>
    <tr>
      <th>Metoda</th>
      <td>GET</td>
    </tr>
    <tr>
      <th>URL</th>
      <td>
        Test: <a href="https://testmpay.gov.md:8443/api/Invoices/GetPdfInvoiceBytes?serviceID={serviceId}&orderKey={ordekey}" target="_blank">https://testmpay.gov.md:8443/api/Invoices/GetPdfInvoiceBytes?serviceID={serviceId}&orderKey={ordekey}</a><br>
        Prod: <a href="https://mpay.gov.md:8443/api/Invoices/GetPdfInvoiceBytes?serviceID={serviceId}&orderKey={ordekey}" target="_blank">https://mpay.gov.md:8443/api/Invoices/GetPdfInvoiceBytes?serviceID={serviceId}&orderKey={ordekey}</a>
      </td>
    </tr>
    <tr>
      <th>Descriere</th>
      <td>Prestatorul de servicii poate genera nota de plată MPay în format PDF pentru a fi utilizat în procesul de business (de ex. pentru a fi imprimă).</td>
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
      <td colspan="4">Parametrii de ieșire</td>
    </tr>
    <tr>
      <td>n/a</td>
      <td>Http Response Message</td>
      <td>Obligatoriu</td>
      <td>Nota de plată în format PDF se obține ca HttpResponseMessage cu următoarele proprietăți:
            <ol>
                <li>Content – stochează PDF-ul ca byte array (1 byte = 8 bit)</li>
                <li>Headers - stochează informațiile despre content</li>
            </ol>
            Headers au următoarele proprietăți:
            <ol>
                <li>ContentLength - stochează cantitatea de bytes a PDF-ului</li>
                <li>ContentType - specifică tipul content, care este "application/octet-stream"</li>
                <li>ContentDisposition - stochează informațiile despre fișierul PDF. Proprietatea „FileName”, din obiectul ContentDisposition, are o valoare egală cu „Notă de plată {invoiceID}.pdf”, unde „invoiceID” este egal cu numărul notei de plată MPay care a fost căutată.</li>
            </ol>
        </td>
    </tr>
  </tbody>
</table>