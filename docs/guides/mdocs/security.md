## Autentificare

Toate apelurile către operațiunile MDocs sunt autentificate de MDocs. Autentificarea se realizează prin utilizarea certificatului client folosit pentru transportul HTTPS.
Pentru informații privind obținerea unui certificat client și înregistrarea, vezi Obținerea credențialelor și Înregistrarea clientului și acces la rețea.
Notă! Descrierea procesului de instalare, înregistrare sau acordare explicită a încrederii pentru certificatul client obținut, în sistemul de operare sau framework-ul utilizat de e-serviciul care se integrează, trebuie realizată corespunzător, este specifică respectivului mediu și nu face obiectul acestui document.

## Autorizare
După autentificarea cu succes, toate request-urile pentru evenimente sunt verificate pentru configurarea corectă în sistemul MPass.

## Criptare
Toate comunicările cu serviciile REST ale MDocs sunt criptate prin utilizarea protocolului standard TLS (HTTPS). Certificatul client utilizat pentru inițierea transportului criptat este folosit și pentru Autentificare.
