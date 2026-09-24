## Procesul de înregistrare

Cel mai important scenariu de integrare cu MLog este cererea de înregistrare a unui eveniment.

Un eveniment poate fi un singur obiect JSON sau un lot (batch) de obiecte JSON. Sunt acceptate versiuni semnate, nesemnate sau mixte (semnate și nesemnate) ale evenimentelor într-o cerere de intrare.

Un eveniment semnat este un eveniment semnat cu certificatul privat al sistemului informațional (SI) și este utilizat ulterior pentru a demonstra că evenimentul rămâne neschimbat și a fost emis de SI. Pentru a semna un eveniment legal, SI trebuie să fie înregistrat în sistemul MPass.

**Observație.** Trimiterea unui eveniment pentru înregistrare necesită ca SI să fie înregistrat în sistemul MLog. Orice eveniment recepționat de la un SI care nu este înregistrat în MLog este respins.

<img src="../images/mlog1.svg">

Mai jos este o scurtă descriere a procesului de înregistrare folosind MLog:

1. SI trimite un eveniment pentru înregistrare. Un eveniment poate fi un singur obiect JSON sau un lot de obiecte JSON. MLog acceptă evenimente semnate, nesemnate sau mixte (semnate și nesemnate) într-o singură cerere.

2. MLog recepționează evenimentul, îi asociază un identificator unic și trimite înapoi către SI un răspuns de succes cu identificatorul unic asociat.

3. MLog procesează ulterior evenimentele recepționate într-un proces separat, efectuând următorii pași:
   - Verifică dacă certificatul client este configurat corect în MPass (certificat neexpirat etc.)
   - Validează semnătura evenimentelor semnate
   - Stochează evenimentul original (inclusiv semnătura) în stocarea internă
   - Extrage câmpurile cunoscute din evenimentul de intrare și le stochează în indicii interni de căutare
   - Colectează diverse statistici despre evenimentele recepționate
   - Colectează indicatorii de performanță (KPI) configurați pentru sistemul MLog

## Procesul de căutare

MLog expune de asemenea un API care permite SI să caute evenimente legale înregistrate anterior.

Mai jos este o scurtă descriere a procesului de căutare folosind MLog:

1. SI trimite o cerere de căutare către sistemul MLog.

2. Cererea este înregistrată în sistemul MLog ca eveniment separat. A se vedea Procesul de înregistrare pentru detalii.

3. MLog verifică dacă certificatul client este configurat corect în MPass (certificat neexpirat etc.)

4. MLog caută în baza de date internă evenimentele solicitate. Căutarea se efectuează doar în compartimentele configurate ale indicilor interni de căutare. Configurarea este stocată în MPass.

5. MLog utilizează configurarea primită de la MPass pentru a filtra evenimentele returnate astfel încât să conțină o listă specifică de câmpuri (dacă este necesar din motive de securitate).

6. MLog colectează diverse statistici despre evenimentele recepționate și procesează evenimentele speciale.

7. MLog colectează indicatorii de performanță (KPI) configurați pentru sistemul MLog.

<img src="../images/mlog2.svg">
