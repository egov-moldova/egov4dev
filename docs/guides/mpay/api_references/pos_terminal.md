# POS Terminal

##**Plăți prin terminalul POS**

În cazul plăților cu terminalul POS, mai întâi trebuie configurat terminalul POS și apoi sistemul informațional al prestatorului de servicii urmează să redirecționeze/deschidă browserul către pagina web de plată a terminalului POS. WEB serviciul va comunica prin protocolul standard HTTP (HTTP / 1.1) și va acorda permisiunea de acces pentru IP-ul clientului (doar pe mediul test).
Pentru a configura terminalele POS, urmați descrierea de mai jos:

<table>
  <tbody>
    <tr>
      <th>Acțiune</th>
      <td>Configurare POS terminal</td>
    </tr>
    <tr>
      <th>URL</th>
      <td>
        Test <a href="https://testmpay.gov.md/PosTerminal/Configure" target="_blank">https://testmpay.gov.md/PosTerminal/Configure</a><br>
        Prod <a href="https://mpay.gov.md/PosTerminal/Configure" target="_blank">https://mpay.gov.md/PosTerminal/Configure</a>
      </td>
    </tr>
    <tr>
      <th>Descriere</th>
      <td>Accesați adresa URL și urmați pașii din ghidul de configurare.</td>
    </tr>
  </tbody>
</table>

**Forma sau parametrii care urmează să fie expediați pentru configurare în MPay**

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
      <td>OrganizationName</td>
      <td>string</td>
      <td>Obligatoriu</td>
      <td>Denumirea prestatorului de servicii.</td>
    </tr>
    <tr>
      <td>OrganizationIdno</td>
      <td>string</td>
      <td>Obligatoriu</td>
      <td>Codul fiscal al prestatorului de servicii.</td>
    </tr>
    <tr>
      <td>OrganizationService</td>
      <td>string</td>
      <td>Opțional</td>
      <td>Departamentul (dacă există) care va presta serviciile pentru plățile ce vor fi încasate prin terminalul POS.</td>
    </tr>
    <tr>
      <td>Counter</td>
      <td>string</td>
      <td>Opțional</td>
      <td>Numărul ghișeului din organizație (dacă există) care va presta serviciile pentru plățile ce vor fi încasate prin terminalul POS.</td>
    </tr>
    <tr>
      <td>TerminalId</td>
      <td>string</td>
      <td>Obligatoriu</td>
      <td>Identificatorul terminalului.</td>
    </tr>
    <tr>
      <td>VendorName</td>
      <td>string</td>
      <td>Obligatoriu</td>
      <td>Denumirea Băncii ce eliberează terminalul POS</td>
    </tr>
    <tr>
      <td>IntendedIp</td>
      <td>string</td>
      <td>Obligatoriu</td>
      <td>Adresa IP a locației unde se efectuează plata la POS terminal. Acest IP trebuie adăugat în whitelist MPay.</td>
    </tr>
  </tbody>
</table>

!!! Note "Notă:"
    Pentru a finaliza configurarea terminalelor POS, asigurați-vă că instalați driverele, puse la dispoziție de Bancă.

Pentru a efectua redirecționarea pentru tranzacțiile cu terminalul POS, urmați descrierea parametrilor implicați în această redirecționare.

<table>
  <tbody>
    <tr>
      <th>Metoda</th>
      <td>POST</td>
    </tr>
    <tr>
      <th>URL</th>
      <td>
        <strong>Test:</strong><br>
        - După ServiceId și OrderKey<br>
        <a href="https://testmpay.gov.md/PosTerminal/Pay/{ServiceId}/{OrderKey}" target="_blank">
          https://testmpay.gov.md/PosTerminal/Pay/{ServiceId}/{OrderKey}
        </a><br>
        - sau după MPay InvoiceId<br>
        <a href="https://testmpay.gov.md/PosTerminal/PayInvoice/{InvoiceId}" target="_blank">
          https://testmpay.gov.md/PosTerminal/PayInvoice/{InvoiceId}
        </a><br><br>

        <strong>Prod:</strong><br>
        - După ServiceId și OrderKey<br>
        <a href="https://mpay.gov.md/PosTerminal/Pay/{ServiceId}/{OrderKey}" target="_blank">
          https://mpay.gov.md/PosTerminal/Pay/{ServiceId}/{OrderKey}
        </a><br>
        - sau după MPay InvoiceId<br>
        <a href="https://mpay.gov.md/PosTerminal/PayInvoice/{InvoiceId}" target="_blank">
          https://mpay.gov.md/PosTerminal/PayInvoice/{InvoiceId}
        </a>
      </td>
    </tr>
    <tr>
      <th>Descriere</th>
      <td>Îndrumați operatorul să efectueze plata prin terminale POS.</td>
    </tr>
  </tbody>
</table>

Forma sau parametrii URL

<table class="custom-table">
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
      <td>Identificatorul serviciului MPay.</td>
    </tr>
    <tr>
      <td>OrderKey</td>
      <td>string</td>
      <td>Obligatoriu</td>
      <td>
        Indentificatorul comenzii la prestatorul de serviciu.
        Aceasta trebuie să fie generat în mod unic pentru fiecare comandă.
      </td>
    </tr>
  </tbody>
</table>