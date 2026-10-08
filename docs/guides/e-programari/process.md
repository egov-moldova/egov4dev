## 1. Depunerea cererii de conectare

Completați formularul de onboarding:

[Conectează-ți instituția la eProgramari](https://forms.office.com/e/p8n69by5NZ)

## 2. Verificarea înregistrării sistemului în MPass

Verificați dacă sistemul care se integrează este deja înregistrat în **MPass (mediul de staging)**.

Dacă este deja înregistrat, furnizați:

- Denumirea sistemului
- Numărul de serie al certificatului

## 3. Obținerea certificatului de sistem

[Solicitați un **certificat de autentificare de sistem** de la **STISC**](https://semnatura.md/order/system-certificate)

API-ul folosește TLS mutual, deci acest certificat este certificatul de client pe care sistemul dumneavoastră îl prezintă la fiecare apel (vezi [Autentificare](api-reference.md#autentificare)).

## 4. Configurarea sistemului

Echipa de integrare va:

- Înregistra sistemul în **MPass**
- Adăuga certificatul sistemului ca serviciu autorizat să apeleze **API-ul eProgramari**

## 5. Implementarea integrării API

Integrați sistemul dumneavoastră cu **API-ul REST eProgramari**. Consultați [referința API](api-reference.md) și [exemplele](examples.md).

## 6. Efectuarea testării

Integrarea trebuie testată în **mediul de staging**.

## 7. Activarea în producție

După validarea cu succes, accesul în producție va fi activat. Producția folosește credențiale diferite față de staging.
