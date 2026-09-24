## Redirecționare către MPay

Plata prin MPay este necesară pentru confirmarea comenzii de livrare și pentru a continua procesarea.

Pentru efectuarea plății, Clientul este redirecționat către MPay fie din pagina MDelivery, fie din sistemul Prestatorului de servicii, în funcție de procesul stabilit în cadrul integrării.

Scenariul selectat este determinat de atributul Redirect to MPay, setat în configurările MPass pentru serviciul integrat.

### Redirect to MPay [true]

Atributul Redirect to MPay=true presupune scenariul de interacțiune în care comanda de livrare este confirmată pe pagina MDelivery, iar redirecționarea către MPay pentru plata agregată se face din MDelivery.

**Notă!** Pentru implementarea acestui scenariu, Prestatorul de servicii trebuie să implementeze doar redirecționarea către MDelivery și metodele pentru schimbul statusurilor pe parcursul procesului de livrare. Crearea comenzii de livrare, inclusiv afișarea rezumatului comenzii agregate pentru confirmare și redirecționarea către MPay pentru plată, se realizează pe MDelivery.

<img src="../img/true.png">

### Redirect to MPay [false]

Atributul Redirect to MPay=false presupune scenariul de interacțiune în care comanda cu livrare este confirmată pe pagina Prestatorului de servicii, iar redirecționarea plății agregate către MPay se face din sistemul Prestatorului de servicii.

**Notă!** Pentru implementarea acestui scenariu, Prestatorul de servicii trebuie să dezvolte interfața pentru crearea comenzii de livrare, care afișează rezumatul comenzii agregate și opțiunile de confirmare a comenzii de livrare, redirecționând plata agregată către MPay.

<img src="../img/false.png">

## Solicitarea livrării

Când un Client solicită livrarea unui Produs comandat, sistemul Prestatorului de servicii redirecționează Clientul către MDelivery pentru a completa detaliile de livrare și a selecta opțiunea de livrare din lista disponibilă, oferită de Cărăușii integrați.

MDelivery primește ID-ul comenzii în URL-ul de redirecționare și solicită detaliile comenzii de la sistemul informațional al Prestatorului de servicii prin API (pentru a le transmite Cărăușilor în vederea obținerii opțiunilor de livrare).

**Reguli de redirecționare**

**Autentificare pasivă**

Faptul că Destinatarul este deja autentificat în sistemul Prestatorului de servicii prin MPass va fi indicat prin parametrul mpass = true, sau mpass = 1.

**Limbă**

Redirecționarea se va efectua aplicând aceeași limbă selectată de utilizator.

Exemplu: dacă versiunea RO a fost selectată în sistemul Prestatorului de servicii, pe MDelivery utilizatorul va fi redirecționat către versiunea RO.

Parametrul utilizat pentru a indica limba este "lang" (ex: lang = ro)

**Exemplu de URL:**
```
https://mdelivery.staging.egov.md/public/shipping?orderId=o7515871605102109999&serviceId=1&lang=ro&returUrl=https:%2F%2Fsp-mdelivery.staging.egov.md%2F
```

## Crearea comenzii de livrare

Când Clientul selectează și confirmă o opțiune de livrare, se creează pe MDelivery o Comandă de livrare, asociată Comenzii primite de la Prestatorul de servicii.

Comanda de livrare poate fi inițiată pe:

**Sistemul PS** – cu redirecționare către MDelivery pentru completarea detaliilor de livrare și selectarea opțiunii de livrare.

**Notă!** În funcție de scenariul de plată selectat de Prestatorul de servicii și înregistrat în profilul Prestatorului de servicii pe MDelivery, Livrarea creată este returnată către sistemul Prestatorului de servicii, sau procesul continuă cu redirecționarea către MPay din MDelivery.

**Pagina MDelivery** - prin opțiunea Add delivery, completând ID-ul Comenzii relevante pentru a adăuga livrarea.

**Notă!** Opțiunea de adăugare a livrării pe pagina MDelivery pentru o comandă existentă este disponibilă doar pentru serviciile cu atributul relevant setat în profilul PS (Add delivery = true).

Când comanda de livrare este confirmată, MDelivery transmite datele de livrare pentru a informa Prestatorul de servicii că o comandă de livrare a fost asociată de client unei comenzi.

**Statusul livrării în această etapă**

**AwaitingPayment** – Destinatarul confirmă crearea Comenzii de livrare, dar comanda încă nu este plătită.

## Scenarii de plată

Atributul Integration type, atribuit Serviciului, determină unde va începe etapa de plată: pe MDelivery, sau pe sistemul Prestatorului de servicii.

**Notă!** Ambele scenarii presupun integrarea Prestatorului de servicii cu MPay, pentru a permite plata Comenzii.

### Redirecționare către MPay din MDelivery

Atributul Redirect to MPay=true presupune că Clientul, la confirmarea livrării pe pagina MDelivery, este redirecționat către MPay pentru plată.

MDelivery transmite către MPay atât DeliveryID, cât și OrderID.

### Redirecționare către MPay din sistemul Prestatorului de servicii

Atributul Redirect to MPay=false presupune că Clientul, la confirmarea livrării pe MDelivery, va fi redirecționat înapoi la comanda sa pe pagina Prestatorului de servicii, pentru a confirma comanda consolidată cu livrare.

Sistemul Prestatorului de servicii transmite către MPay atât OrderID, cât și DeliveryID.

Când confirmarea plății comenzii de livrare este primită de la MPay, MDelivery transmite datele de livrare pentru a informa Prestatorul de servicii că o comandă de livrare a fost plătită de client și că comanda trebuie pregătită pentru livrare.

**Statusul livrării în această etapă**

**Paid** – setat în MDelivery când este primită de la MPay confirmarea plății pentru comanda de livrare.

## Obținerea modificărilor statusului comenzilor

Modificările statusului comenzilor sunt verificate din sistemul Prestatorului de servicii prin API-ul MDelivery.

**Statusurile livrării în această etapă**

**Processing** – returnat de Prestatorul de servicii în perioada de procesare a comenzii, indicând faptul că aceasta va fi pregătită pentru livrare, dar nu este încă gata.

**Cancelled** – returnat de Prestatorul de servicii dacă comanda este anulată în sistemul Prestatorului de servicii și nu va fi necesară nicio livrare.

**Expired** - returnat de Prestatorul de servicii dacă comanda a expirat în sistemul Prestatorului de servicii și nu va fi necesară nicio livrare.

**Ready** - returnat de Prestatorul de servicii sau setat manual de Operator în MDelivery, atunci când comanda este gata la punctul de ridicare pentru a fi transmisă reprezentantului Cărăușului.

**Notă!** Când statusul comenzii de livrare devine ready, comanda de livrare este transmisă de MDelivery către sistemul informațional al Cărăușului pentru crearea documentului de expediere (AWB) și pregătirea procesului de livrare, iar statusul livrării este de asemenea transmis Prestatorului de servicii pentru confirmare.

## Urmărirea statusului livrării

Pe parcursul procesării și livrării, pentru urmărirea Livrării, statusurile sunt transmise către și verificate din sistemul Prestatorului de servicii prin API-ul MDelivery, pe baza OrderID și ServiceID.

**Statusurile livrării în această etapă**

**AwaitingPickup** – transmis de MDelivery pentru a informa Prestatorul de servicii că AWB-ul a fost creat în sistemul Cărăușului și se așteaptă ridicarea de către Cărăuș.

**Delivering** - transmis de MDelivery pentru a informa Prestatorul de servicii că Cărăușul a ridicat comanda de la Prestatorul de servicii și procesul de livrare a început.

**Delivered** - transmis de MDelivery pentru a informa Prestatorul de servicii că Cărăușul a finalizat procesul de livrare și comanda a fost livrată Destinatarului.

**Confirmed** - transmis de MDelivery pentru a informa Prestatorul de servicii că Destinatarul a confirmat livrarea comenzii.

**Problem** - transmis de MDelivery pentru a informa Prestatorul de servicii că a apărut o problemă de livrare în timpul expedierii. Detaliile care explică problema pot fi consultate în Message.

**Returning** - transmis de MDelivery pentru a informa Prestatorul de servicii că comanda nu a fost livrată și este în curs de returnare către punctul de ridicare.

**Returned** - transmis de MDelivery pentru a informa Prestatorul de servicii că comanda nu a fost livrată și a fost deja returnată la punctul de ridicare.

**Notă!** MDelivery notifică Clientul prin MNotify cu privire la statusurile de livrare relevante.

Notificările privind plata Comenzii și/sau alte etape de procesare a Comenzii pot fi transmise de Prestatorul de servicii prin MNotify, dacă este necesar.
