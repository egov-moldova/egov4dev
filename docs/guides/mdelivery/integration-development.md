## Configurarea clientului în MPass

Prestatorul de servicii va solicita configurarea serviciului client în MPass înainte de a începe integrarea cu MDelivery.

## Înregistrarea sistemului și accesul la rețea

Clienții MDelivery trebuie să fie înregistrați în MDelivery înainte de a putea apela API-ul. Profilul Prestatorului de servicii este creat de Administratorul MDelivery.

## Medii de servicii

Sunt disponibile 2 medii de servicii: un mediu de testare și un mediu de producție.
Este obligatoriu ca integrările să fie dezvoltate și testele să fie efectuate pe mediul de testare.

| Mediu | URL-ul serviciului MDelivery |
|-------------|----------------------|
| Testare | https://mdelivery.staging.egov.md |
| Producție | ------- |

## Considerații de securitate

### Autentificare

Apelurile MDelivery către Prestatorii de servicii sunt autentificate. Autentificarea se realizează utilizând certificatul client folosit pentru transportul HTTPS.

### Criptare

Toată comunicarea cu serviciul SOAP este criptată utilizând protocolul standard TLS (HTTPS). Certificatul client utilizat pentru inițierea transportului criptat este utilizat și pentru autentificare.

## Profilul MDelivery

### Înregistrarea profilului

Pentru o integrare reușită, Administratorul MDelivery creează un profil de Prestator de servicii, în care sunt adăugate și gestionate datele relevante pentru interacțiunea cu sistemul MDelivery: informații generale despre organizația Prestatorului de servicii, serviciile integrate, produsele și punctele de ridicare.

### Gestionarea profilului

Administratorul Prestatorului de servicii (rol atribuit în MPass) poate vizualiza și actualiza informațiile disponibile în profilul MDelivery. Doar un Serviciu înregistrat în profilul MDelivery poate interacționa cu MDelivery.

Client ID - completat în Profile->Services este ID-ul de client alocat în MPass.
Datele produsului - sunt relevante pentru calcularea costului.
Punctul de ridicare - datele sunt solicitate de Cărăuși pentru organizarea procesului de expediere.
