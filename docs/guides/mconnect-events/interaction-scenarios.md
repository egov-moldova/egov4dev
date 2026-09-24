MConnect Events integrează două tipuri de clienți: producători de evenimente și consumatori de evenimente. Un sistem informațional client poate fi configurat fie ca producător, fie ca consumator, fie ca ambele.

Conform standardului CloudEvents, toate evenimentele au un tip. În contextul MConnect Events, tipurile sunt denumite folosind următoarea convenție: „Organization.System.Entity.Action" (de exemplu „AGE.MPass.User.Authenticated"). Un producător este autorizat să producă, iar un consumator să consume, doar anumite tipuri de evenimente

## Producerea evenimentelor

Un sistem client autorizat ca producător poate produce doar evenimente de **tipuri autorizate**. Evenimentele produse sunt autorizate, **validate în raport cu schema configurată** și persistate în unul sau mai multe locuri, pentru consumare. MConnect Events răspunde apoi cu HTTP 200 OK atunci când toate acestea reușesc, asigurând astfel o mesagerie fiabilă.

Un producător poate produce evenimente unul câte unul sau în loturi. Rețineți că se aplică anumite limite generale privind dimensiunea fiecărui eveniment și a întregului mesaj (vezi secțiunea Limite). MConnect Events persistă fie toate evenimentele către unul sau mai mulți consumatori de destinație, fie niciunul, într-o manieră tranzacțională. Aceasta înseamnă că este sigur ca un producător să **reîncerce producerea evenimentelor** în caz de erori. Totuși, ținând cont de faptul că este posibil ca eroarea să nu ajungă înapoi din cauza problemelor de rețea sau de altă natură, reîncercările ar putea avea ca rezultat producerea unor evenimente duplicate. Pentru a minimiza duplicarea, este important să se atribuie un atribut id unic pentru fiecare eveniment, conform standardului CloudEvents, și să fie folosit inclusiv la reîncercare.

Procesele de business bazate pe schimbul de evenimente necesită de obicei ca niciun eveniment să nu fie omis, fie din motive de business, fie din motive tehnice. Astfel, pentru a asigura livrarea de cel puțin o dată (at least once), se recomandă ca producătorii să implementeze [**pattern-ul outbox**](https://en.wikipedia.org/wiki/Inbox_and_outbox_pattern) în sistemele lor informaționale. Acest lucru va asigura că evenimentele vor fi trimise sau nu, în funcție de schimbările tranzacționale din bazele lor de date.

Un producător poate produce evenimente în paralel, din mai multe instanțe. MConnect Events este un sistem scalabil și poate gestiona un număr semnificativ de evenimente.

Din motive de performanță, MConnect Events nu garantează implicit consumarea ordonată a evenimentelor, ceea ce înseamnă că evenimentele apropiate în timp ar putea fi văzute de consumatori într-o ordine diferită de cea în care au fost produse de producători. **Dacă este necesară o consumare ordonată** pentru o anumită entitate (de exemplu o persoană sau un document), producătorul trebuie să seteze cheia de partiționare la identificatorul entității, conform extensiei standard de partiționare CloudEvents (de exemplu, pentru o persoană, se setează partitionkey la idnp:{idnp}).


## Consumarea evenimentelor
Un sistem client autorizat ca consumator poate consuma doar evenimente de **tipuri autorizate**. Consumatorii interoghează activ (polling) evenimentele lor, fie folosind tehnica HTTP long polling, fie implementând protocolul **WebSocket**, eficient și puternic recomandat, definit în acest document. În ambele cazuri, MConnect Events returnează evenimentele în așteptare pentru consumare, fiecare având asociat un offset care se reinițializează la conectarea consumatorului.

Pentru a asigura livrarea fiabilă a evenimentelor, în manieră de cel puțin o dată (at-least-once), consumatorul trebuie să **confirme consumarea cu succes a evenimentelor**. Fiecare eveniment consumat include un offset, care se reinițializează la începutul sesiunii consumatorului. Consumatorul confirmă consumarea fiecărui eveniment sau, pentru eficiență, a unui lot de evenimente, incluzând în confirmare offset-ul ultimului eveniment consumat cu succes.

Pentru evenimentele care nu pot fi consumate din motive de business (câmp obligatoriu lipsă, date invalide etc.), consumatorul poate modifica și raporta evenimentul către MConnect Events ca fiind eșuat (dead). **Evenimentele eșuate (dead)** sunt stocate într-un loc special, pentru analiză manuală sau pentru o altă instanță de consumator care consumă explicit evenimente eșuate. Este important de menționat că evenimentele nu trebuie considerate eșuate pentru erori tehnice, de exemplu din cauza rețelei consumatorului, a bazei de date sau a altei componente indisponibile.

Erorile tehnice, confirmările nelivrate și alte probleme potențiale ar putea avea ca rezultat consumarea acelorași evenimente de către consumator. Astfel, este foarte important ca acesta să **consume toate evenimentele într-o manieră idempotentă**. Aceasta înseamnă că, în funcție de logica de business implementată, consumatorul trebuie să distingă consumarea inițială a unui eveniment de una repetată, procesată parțial sau complet, apoi să finalizeze procesarea și să confirme consumarea în mod similar în toate cazurile.

Un consumator poate consuma evenimente în paralel, din **mai multe instanțe**.

Pentru sistemele care au mai multe subcomponente ce trebuie să consume aceleași evenimente, setați parametrul **grup de consumatori** la numele subcomponentei. Evenimentele de test și cele eșuate (dead) vor fi văzute și consumate de toate instanțele de consumator, indiferent de grupul de consumatori indicat.
