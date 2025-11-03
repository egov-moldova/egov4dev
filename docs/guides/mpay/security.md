###Măsuri de securitate

##**Autentificare**

Interfața IServiceProvider trebuie să valideze semnătura mesajelor SOAP expediate de către MPay. Se recomandă ca dezvoltarea implementării interfeței să reutilizeze logica de validare existentă în framework-urile de web-servicii, cum ar fi .NET WCF sau J2EE JAX-WS, prin configurarea corectă a end-point-urilor.
Pentru informații despre obținerea și înregistrare certificatului digital de sistem, vedeți [Obținerea credențialelor](./../integration_process#obtinerea-credentialelor) și [Înregistrarea prestatorului de servicii](./../integration_process#inregistrarea-prestatorului-de-servicii).

##**Criptarea**

Comunicarea cu web serviciul MPay SOAP este criptată folosind protocolul TLS standard (HTTPS). Certificatul client utilizat pentru a iniția transportul criptat este folosit și pentru autentificare.

##**Depozitarea mesajelor SOAP**

Deoarece toate mesajele SOAP sunt semnate cu certificatul digital al sistemului MPay, se recomandă ca mesajele SOAP să fie salvate într-un depozit de jurnalizare sau direct în procesele de business al codului sursă împreună cu mesajul SOAP care include semnătura MPay. Aceste mesaje pot fi de folos în orice probleme legate de autorizare sau soluționarea altor tipuri de neclarități.