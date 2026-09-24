## Publicarea documentelor către identități

Documentele pot fi publicate de client atât pentru proprietarul documentului, cât și pentru alte identități.

1. Utilizatorul încarcă blob-ul ([click aici](../api-reference/#blobs)).
2. Utilizatorul publică documentul cu referință la blob ([click aici](../api-reference/#documents)).
3. Utilizatorul va crea un folder — pentru cazul în care documentul nu are referință la blob.
4. Pentru a crea documentul în rădăcină, nu se indică niciun id de folder.
5. Pentru a crea un document într-un folder, id-ul folderului va fi indicat ca folder părinte.
6. Sistemul poate publica mai multe documente într-un folder, indicând id-ul folderului ca destinație.

## Obținerea credențialelor

MDocs acceptă certificate client generate de Autoritatea de Certificare a Serviciului Tehnologia Informației și Securitate Cibernetică (<https://stisc.gov.md>), prin solicitarea unui certificat de autentificare pentru sisteme.

## Înregistrarea clientului și acces la rețea

MDocs autentifică clienții pe baza amprentei (fingerprint) certificatului client. Clienții serviciului MDocs trebuie să fie înregistrați în MDocs înainte de a putea apela API-ul.

API-ul MDocs este accesibil doar unui set înregistrat de adrese IP și, pentru sistemele informaționale sensibile din punct de vedere al securității, aceasta presupune configurarea unor rute și/sau a unui VPN între client și MDocs.

Pentru a înregistra un client și a obține acces la rețea, vă rugăm să trimiteți o solicitare prin e-mail către posesorul serviciului, indicând adresa IP publică sau adresa IP privată alocată prin VPN, precum și amprenta certificatului, în solicitarea dumneavoastră.

## Obținerea contractului tehnic

Documentația API poate fi obținută la următorul URL (adresele de bază sunt listate în secțiunea Medii de sistem):

https://mdocs.staging.egov.md:8443/api/swagger/index.html

## Medii de sistem

Sunt disponibile 2 medii de servicii: un mediu de staging și un mediu de producție.

| **Mediu** | **URL serviciu MDocs** |
|---|---|
| Staging | https://mdocs.staging.egov.md |
| Producție | https://mdocs.gov.md |
