# Dezvoltarea integrării

## Începeți

### Înregistrarea sistemului și accesul la rețea

MNotify autentifică sistemele client prin numărul de serie al certificatului client. Clienții MNotify trebuie să fie înregistrați în MNotify înainte de a putea apela API-ul.

API-ul MNotify este accesibil doar unui set înregistrat de adrese IP, iar pentru sistemele informaționale cu cerințe sporite de securitate, aceasta presupune configurarea unui VPN și/sau configurarea rutelor între consumator și MNotify.

Pentru a înregistra sistemul consumator și a obține acces la rețea, vă rugăm să transmiteți o solicitare prin e-mail către posesorul serviciului, indicând adresa IP publică sau adresa IP privată alocată prin VPN, precum și certificatul, în cadrul solicitării.

!!! note "Obținerea credențialelor"

MSign acceptă certificate client generate de Serviciul Tehnologia Informației și Securitate Cibernetică (<https://stisc.gov.md>), prin solicitarea unui certificat pentru autentificare.

### Obținerea contractului tehnic

Contractul tehnic poate fi obținut de la URL-urile din tabelul de mai jos. Înainte de a le putea deschide, confirmați că certificatul de sistem a fost instalat în browser-ul dumneavoastră. La pornirea browser-ului vi se va solicita să furnizați un certificat; vă rugăm să selectați certificatul de sistem.

<table>
  <thead>
    <tr>
      <th>Mediu</th>
      <th>URL-ul serviciului MNotify</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Testare</td>
      <td><a href="https://mnotify.staging.egov.md:8443/api/swagger/index.html">https://mnotify.staging.egov.md:8443/api/swagger/index.html</a></td>
    </tr>
    <tr>
      <td>Producție</td>
      <td><a href="https://mnotify.gov.md:8443/api/swagger/index.html">https://mnotify.gov.md:8443/api/swagger/index.html</a></td>
    </tr>
  </tbody>
</table>

## Trimiterea notificării

<table>
  <thead>
    <tr>
      <th>Mediu</th>
      <th>URL-ul serviciului MNotify</th>
    </tr>
  </thead>
    <tr>
      <td>Testare</td>
      <td><a href="https://mnotify.staging.egov.md:8443/api/swagger/index.html">https://mnotify.staging.egov.md:8443/api/swagger/index.html</a></td>
    </tr>
    <tr>
      <td>Producție</td>
      <td><a href="https://mnotify.gov.md:8443/api/swagger/index.html">https://mnotify.gov.md:8443/api/swagger/index.html</a></td>
    </tr>
  </tbody>
</table>

## Revizuirea și auditul integrărilor

Nu există cerințe speciale legate de revizuirea integrării.
