Mediul de staging (etapa de testare)
===================================

> Mediul de staging vă permite să testați în siguranță integrarea cu EVO Wallet înainte de lansarea în producție.  
> Acesta asigură că fluxul de verificare, configurația de securitate și interacțiunile utilizatorului funcționează conform așteptărilor.


## 1. Înregistrarea verificatorului


Completați 🔗[**Formularul de onboarding**](https://forms.office.com/e/4h5RFQGqda) cu următoarele informații:

* Detaliile organizației
* Persoana de contact tehnică
* Atestările care urmează a fi verificate
* Utilizarea preconizată pentru fiecare atestare
* Conturi de email / Google pentru accesul la staging
    


## 2. Solicitarea certificatului (CSR)


După trimiterea formularului, veți primi un email cu instrucțiuni pentru depunerea unei **Cereri de semnare a certificatului (Certificate Signing Request - CSR)** cu următoarele specificații:

| Parametru | Valoare |
| --- | --- |
| Tip de cheie | Curbă eliptică |
| Curbă | P-256 |
| Depunere | `wallet@egov.md` |


## 3. Emiterea certificatului


După primirea CSR-ului dumneavoastră:

* Cererea este înregistrată în mediul de testare
* Este generat un certificat de verificator pentru staging
* Certificatul este transmis prin email
    

> ⚠️ Acest certificat este necesar pentru comunicarea și verificarea securizată în timpul testării.


## 4. Accesul la aplicația EVO de staging

Accesul la aplicația EVO de staging este acordat în paralel.
**Canale de distribuție:**

* Google Play (canal de test)  
* Apple TestFlight

Rezultat
-------

După finalizarea acestor pași, veți putea:

* Efectua fluxuri de verificare de tip end-to-end  
* Valida integrarea cu wallet-ul
* Testa scenarii reale de utilizator într-un mediu controlat
* Trece testul self-service [de testare](testing.md).

Pasul următor


> Odată ce testarea este finalizată cu succes, vom prezenta instrucțiuni detaliate pentru mediul de producție.
