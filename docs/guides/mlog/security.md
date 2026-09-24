## Autentificare

Toate apelurile către operațiunile MLog sunt autentificate de MLog. Autentificarea se realizează utilizând certificatul client prezentat prin HTTPS (TLS mutual).

Pentru informații privind obținerea unui certificat client și înregistrarea, consultați pagina Dezvoltarea integrării: Obținerea credențialelor și Înregistrarea clientului și accesul la rețea.

Important: Instalarea, înregistrarea sau acordarea explicită a încrederii pentru certificatul client obținut, în sistemul de operare sau în framework-ul utilizat de e-serviciul care se integrează, este specifică respectivului mediu și nu face obiectul acestui document.

## Autorizare

După autentificarea cu succes, toate cererile de eveniment sunt verificate pentru configurarea corectă în sistemul MPass. Dacă autorizarea eșuează:

- Pentru cererile de înregistrare (register): mesajul este înregistrat în indicii aferenți erorilor din baza de date internă MLog.
- Pentru cererile de căutare (search): se returnează solicitantului un mesaj de eroare în format JSON.

## Criptare

Toată comunicarea cu serviciile REST MLog este criptată utilizând protocolul standard TLS (HTTPS). Certificatul client utilizat pentru inițierea transportului criptat este de asemenea utilizat pentru autentificare.
