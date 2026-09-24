## Obținerea credențialelor

MLog acceptă certificate client generate de Autoritatea de Certificare a Serviciului Tehnologia Informației și Securitate Cibernetică (<https://stisc.gov.md>), prin solicitarea unui certificat de autentificare pentru sisteme.

## Înregistrarea clientului și accesul la rețea

MLog autentifică clienții prin amprenta (fingerprint) certificatului client. Clienții serviciului MLog trebuie să fie înregistrați în MLog înainte de a putea apela API-ul.

API-ul MLog este accesibil doar unui set înregistrat de adrese IP și, pentru sistemele informaționale sensibile din punct de vedere al securității, aceasta presupune configurarea rutelor și/sau a unui VPN între client și MLog.

Pentru a înregistra un client și a obține acces la rețea, vă rugăm să trimiteți o solicitare prin e-mail către posesorul serviciului, indicând adresa IP publică sau adresa IP privată alocată prin VPN, precum și amprenta certificatului în solicitarea dumneavoastră.

## Obținerea contractului tehnic

Nu este necesar niciun contract pentru trimiterea cererilor către sistemul MLog. Sistemul se bazează pe servicii REST și utilizează JSON ca protocol de mesaje.

## Mediile sistemului

Sunt disponibile 2 medii de servicii: un mediu de staging și un mediu de producție.

| Mediu | URL serviciu MLog |
|-------------|------------------|
| **Staging** | https://mlog.staging.egov.md:8443/register<br>https://mlog.staging.egov.md:8443/query<br>https://mlog.staging.egov.md:8443/query/{uid}<br><br>Fost MLog 1.0:<br>https://mlog.staging.egov.md:8443/MLog.svc |
| **Producție** | https://mlog.gov.md:8443/register<br>https://mlog.gov.md:8443/query<br>https://mlog.gov.md:8443/query/{uid}<br><br>Fost MLog 1.0:<br>https://mlog.gov.md:8443/MLog.svc |

Este obligatorie dezvoltarea integrărilor și efectuarea testelor pe mediul de staging.
