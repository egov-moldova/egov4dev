## Acreditări de client și acces la rețea

Înainte de a putea interacționa cu MConnect Events, un client trebuie să fie înregistrat în mod corespunzător de către deținătorul serviciului. Pentru a efectua o astfel de înregistrare, vă rugăm să furnizați certificatul de sistem. Dacă nu dispuneți de unul, puteți solicita un certificat de sistem pentru autentificare de la Serviciul Tehnologia Informației și Securitate Cibernetică sau de la Agenția de Guvernare Electronică.

Din motive de securitate, clientul TREBUIE să folosească un certificat diferit pentru integrarea cu mediul de staging și cu cel de producție, iar cheile private corespunzătoare TREBUIE păstrate cât mai confidențial posibil. MConnect Events nu necesită acces la cheile private ale clientului pentru integrare.

API-ul MConnect Events este accesibil doar unui set înregistrat de adrese IP și, pentru sistemele informaționale sensibile din punct de vedere al securității, aceasta presupune configurarea de rute și/sau a unui VPN între client și MConnect Events.

Pentru a înregistra un client și a obține acces la rețea, vă rugăm să trimiteți o solicitare prin e-mail către deținătorul serviciului, furnizând adresa IP publică sau adresa IP privată alocată prin VPN, precum și certificatul de cheie publică.

## Medii

Sunt disponibile 2 medii de serviciu: staging și producție.

| Mediu | URL endpoint |
|------------|--------------|
| **Staging** | |
| Adresa Swagger UI | https://mconnect-events.staging.egov.md:8443/swagger |
| Adresa de bază | https://mconnect-events.staging.egov.md:8443/ |
| Adresa de bază pentru consumatorul WebSocket | wss://mconnect-events.staging.egov.md:8443/ |
| **Producție** | |
| Adresa de bază | https://mconnect-events.gov.md:8443/ |
| Adresa de bază pentru consumatorul WebSocket | wss://mconnect-events.gov.md:8443/ |

Observați schema wss folosită de consumatorii eficienți, adică WebSocket securizat.

*Notă:* Endpointurile sunt accesibile doar folosind un certificat de client valid, din adrese IP înregistrate.

## Prelucrarea datelor cu caracter personal

MConnect Events înregistrează detalii legate de consumarea evenimentelor care includ date cu caracter personal. Acest lucru necesită următoarele detalii:

- **Identificatorul persoanei juridice (IDNO)** – preluat din înregistrarea sistemului consumator.
- **Temeiul legal pentru prelucrarea datelor cu caracter personal** – preluat din configurația consumatorului (pe sursă sau tip de eveniment) sau extras din fiecare payload folosind JSON path-ul configurat.
- **Motivul legal pentru prelucrarea datelor cu caracter personal** – preluat din configurația consumatorului (pe sursă sau tip de eveniment) sau extras din payload-ul evenimentului folosind JSON path-ul configurat.
- **Subiectul datelor cu caracter personal** – extras din payload-ul evenimentului folosind JSON path-ul configurat

Deoarece evenimentele sunt produse și apoi consumate fără o solicitare explicită din partea unui utilizator al consumatorului, operatorul de date cu caracter personal este considerat sistemul consumatorului.

## Liste de verificare pentru integrare

Integrările TREBUIE dezvoltate și testate exclusiv în mediul de staging. Pentru a asigura o disponibilitate ridicată, nu sunt permise teste de performanță, securitate sau de orice alt tip în mediul de producție.

### Lista de verificare generală, pentru orice client:

1. Adresa de bază și certificatul de client sunt configurabile.
2. Cheia privată a certificatului de client este securizată și diferă între mediul de staging și cel de producție.
3. Orice certificat intermediar este trimis împreună cu certificatul de client în timpul handshake-ului.
4. Adresa IP vizibilă pentru MConnect Events este stabilă. Adresa poate fi o adresă publică de Internet sau una privată din rețeaua guvernamentală.
5. Este stabilită o procedură internă pentru a reaminti administratorilor de sistem, în avans, despre expirarea certificatului.

### Lista de verificare pentru producători:

1. Producătorii implementează un pattern outbox pentru a se asigura că niciun eveniment nu este omis de la producere.
2. Evenimentele au un URI corect setat în atributul source al CloudEvent.
3. Evenimentele au identificatori unici setați în atributul id al CloudEvent, per sursă.
4. Toate instanțele de producător din aceeași sursă au o valoare consecventă setată în atributul time al CloudEvent.
5. Pentru evenimentele care necesită o consumare ordonată, producătorul setează atributul partitionkey corespunzător payload-ului evenimentului. Cheile de partiționare nu ar trebui să fie constante, deoarece acest lucru limitează scalabilitatea.
6. Evenimentele care includ date cu caracter personal conțin suficiente informații pentru înregistrarea sincronizării datelor cu caracter personal.
7. Fiecare eveniment nu depășește 64 KB.
8. Loturile de evenimente nu depășesc 1 MB.

### Lista de verificare pentru consumatori:

1. Consumarea evenimentelor este confirmată corespunzător, fie individual, fie periodic.
2. Evenimentele sunt consumate într-o manieră idempotentă, adică procesarea evenimentelor deja procesate nu are ca rezultat o procesare dublă și nu creează vreun efect suplimentar la nivel de business.
3. Evenimentele eșuate (dead) sunt raportate corespunzător înapoi către MConnect Events.
4. Evenimentele nu trebuie considerate eșuate (dead) pentru erori tehnice, de exemplu din cauza rețelei consumatorului, a bazei de date sau a altei componente temporar indisponibile sau configurate greșit. Evenimentele cu o structură greșită sunt un exemplu bun de evenimente eșuate.
5. Consumatorii folosesc protocolul WebSocket.
6. Consumatorii care folosesc long polling pentru integrare utilizează adresa de bază a instanței de consumator returnată, fără nicio interpretare.
7. Consumatorii care folosesc long polling pentru integrare șterg explicit instanța la oprire.
8. Consumatorii se reconectează atunci când conexiunea WebSocket se pierde sau creează o altă instanță long-polling atunci când cea anterioară expiră.
9. Instanțele de consumator sunt scalate în divizori ai lui 12.
10. Consumatorii sunt monitorizați să ruleze permanent sau periodic, pentru a nu pierde evenimente.
