## Autentificare

O implementare a interfeței IServiceProvider trebuie să valideze semnătura mesajelor SOAP primite, trimise de MPay. Se recomandă ca implementările să reutilizeze logica de validare existentă, oferită de framework-urile de servicii web, precum .NET WCF sau J2EE JAX-WS, prin configurarea corectă a endpoint-urilor.

Pentru informații privind obținerea unui certificat de serviciu și înregistrarea, vezi Obținerea credențialelor și Înregistrarea e-serviciului plătibil.

## Criptare

Toată comunicarea cu serviciul SOAP al MPay este criptată utilizând protocolul standard TLS (HTTPS). Certificatul client utilizat pentru inițierea transportului criptat este utilizat și pentru Autentificare.

## Salvarea mesajelor SOAP

Deoarece toate mesajele SOAP sunt semnate cu semnătura digitală a sistemului apelant, se recomandă cu tărie ca mesajele să fie salvate într-un depozit de jurnalizare (logging) sau direct în cadrul obiectelor de business, de exemplu, salvarea confirmărilor de plată împreună cu mesajul SOAP care include semnătura MPay. Aceste mesaje persistate pot fi ulterior de ajutor în cazul unor probleme legate de decontare sau alte tipuri de dispute.
