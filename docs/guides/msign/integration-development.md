# Dezvoltarea integrării

## Începeți

### Înregistrarea consumatorului și acces la rețea

MSign autentifică clienții prin numărul de serie al certificatului client. Consumatorii serviciului MSign trebuie să fie înregistrați în MSign înainte de a putea apela API-ul.

API-ul MSign este accesibil doar unui set înregistrat de adrese IP și, pentru sistemele informaționale cu cerințe de securitate sporite, aceasta implică configurarea de rute și/sau a unui VPN între consumator și MSign.

Pentru a înregistra consumatorul dumneavoastră și a obține acces la rețea, vă rugăm să trimiteți o solicitare prin e-mail către posesorul Serviciului, indicând adresa IP publică sau adresa IP privată alocată prin VPN și numărul de serie al certificatului în solicitarea dumneavoastră.

!!! note "Obținerea credențialelor"

    MSign acceptă certificate client generate de Autoritatea de Certificare a Serviciului Tehnologia Informației și Securitate Cibernetică (<https://stisc.gov.md>), prin solicitarea unui certificat pentru autentificare.

### Obținerea contractului tehnic

Contractul WSDL poate fi obținut de la următoarea adresă URL (adresele de bază sunt listate în Mediile sistemului):
/MSign.svc?singleWsdl

(<span class="red-bold-text">De făcut: încărcați un exemplu WSDL de pe site-ul curent</span>)Rețineți că accesarea contractului necesită credențiale valide.
O copie offline a WSDL-ului poate fi găsită în exemplul .NET (.NET Sample).

!!!note "Important"

    Este obligatorie dezvoltarea integrărilor și efectuarea testelor în mediul de testare.

## Testarea integrării

!!!note "Cazuri de testare"

    Iată câteva cazuri de testare de bază care ar putea fi adăugate la suita de teste care se integrează cu MSign.


### Cazul #1

<table>
  <tbody>
    <tr>
      <td><strong>ID Caz de Testare</strong></td>
      <td colspan="3">TC_FUNCT_01</td>
    </tr>
    <tr>
      <td><strong>Descriere</strong></td>
      <td colspan="3">Verificarea integrării cu succes a e-Serviciului cu MSign</td>
    </tr>
    <tr>
      <td><strong>Aplicabil pentru</strong></td>
      <td colspan="3">Lista de browsere specificată în cerințe</td>
    </tr>
    <tr>
      <td><strong>Cerințe</strong></td>
      <td colspan="3">REQ_FUNCT_XX</td>
    </tr>
    <tr>
      <td><strong>Condiții inițiale</strong></td>
      <td colspan="3">Deschideți e-Serviciul testat într-o fereastră de browser. Parcurgeți paginile web ale e-Serviciului, introduceți datele sau încărcați documentul de semnat și navigați la pagina cu butonul Semnează, pentru a efectua semnarea.</td>
    </tr>
    <tr>
      <td><strong>Pas</strong></td>
      <td><strong>Sarcină</strong></td>
      <td><strong>Rezultat așteptat</strong></td>
      <td><strong>Rezultat efectiv</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Apăsați butonul Semnează.</td>
      <td>Pagina de semnare MSign este afișată utilizatorului.</td>
      <td><strong>Trecut / Eșuat</strong></td>
    </tr>
    <tr>
      <td>2</td>
      <td>Selectați primul instrument de semnare și introduceți datele aferente instrumentului selectat. Trimiteți datele.</td>
      <td>Browserul reafișează pagina e-Serviciului, semnăturile solicitate fiind furnizate cu succes.</td>
      <td><strong>Trecut / Eșuat</strong></td>
    </tr>
    <tr>
      <td>3</td>
      <td>Repetați pasul anterior (Pasul 2) pentru fiecare instrument de semnare disponibil.</td>
      <td>Browserul reafișează pagina e-Serviciului, semnăturile solicitate fiind furnizate cu succes.</td>
      <td><strong>Trecut / Eșuat</strong></td>
    </tr>
  </tbody>
</table>

### Cazul #2

<table>
  <tbody>
    <tr>
      <td><strong>ID Caz de Testare</strong></td>
      <td colspan="3">TC_FUNCT_02</td>
    </tr>
    <tr>
      <td><strong>Descriere</strong></td>
      <td colspan="3">Verificarea eșecului semnării prin anularea procesului de semnătură</td>
    </tr>
    <tr>
      <td><strong>Aplicabil pentru</strong></td>
      <td colspan="3">Lista de browsere specificată în cerințe</td>
    </tr>
    <tr>
      <td><strong>Cerințe</strong></td>
      <td colspan="3">REQ_FUNCT_XX</td>
    </tr>
    <tr>
      <td><strong>Condiții inițiale</strong></td>
      <td colspan="3">Deschideți e-Serviciul testat într-o fereastră de browser. Parcurgeți paginile web ale e-Serviciului, introduceți datele sau încărcați documentul de semnat și navigați la pagina cu butonul Semnează, pentru a efectua semnarea.</td>
    </tr>
    <tr>
      <td><strong>Pas</strong></td>
      <td><strong>Sarcină</strong></td>
      <td><strong>Rezultat așteptat</strong></td>
      <td><strong>Rezultat efectiv</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Apăsați butonul Semnează.</td>
      <td>Pagina de semnare MSign este afișată utilizatorului.</td>
      <td><strong>Trecut / Eșuat</strong></td>
    </tr>
    <tr>
      <td>2</td>
      <td>Selectați un instrument de semnare care solicită un PIN sau o confirmare la semnare (cum ar fi Semnătura Mobilă) și anulați semnarea</td>
      <td>MSign afișează faptul că semnătura a eșuat, cu un motiv concludent.</td>
      <td><strong>Trecut / Eșuat</strong></td>
    </tr>
    <tr>
      <td>3</td>
      <td>Analizați mesajul MSign și apăsați OK pentru a continua</td>
      <td>Browserul reafișează pagina e-Serviciului care arată clar că semnătura a eșuat.
      <br>Rețineți că apelarea GetSignResponse pentru această cerere va returna un răspuns cu SignStatus = Failure</td>
      <td><strong>Trecut / Eșuat</strong></td>
    </tr>
  </tbody>
</table>

### Cazul #3

<table>
  <tbody>
    <tr>
      <td><strong>ID Caz de Testare</strong></td>
      <td colspan="3">TC_FUNCT_03</td>
    </tr>
    <tr>
      <td><strong>Descriere</strong></td>
      <td colspan="3">Verificarea retrimiterii cererii de semnătură</td>
    </tr>
    <tr>
      <td><strong>Aplicabil pentru</strong></td>
      <td colspan="3">Lista de browsere specificată în cerințe</td>
    </tr>
    <tr>
      <td><strong>Cerințe</strong></td>
      <td colspan="3">REQ_FUNCT_XX</td>
    </tr>
    <tr>
      <td><strong>Condiții inițiale</strong></td>
      <td colspan="3">Deschideți e-Serviciul testat într-o fereastră de browser. Parcurgeți paginile web ale e-Serviciului, introduceți datele sau încărcați documentul de semnat și navigați la pagina cu butonul Semnează, pentru a efectua semnarea.</td>
    </tr>
    <tr>
      <td><strong>Pas</strong></td>
      <td><strong>Sarcină</strong></td>
      <td><strong>Rezultat așteptat</strong></td>
      <td><strong>Rezultat efectiv</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Apăsați butonul Semnează.</td>
      <td>Pagina de semnare MSign este afișată utilizatorului.</td>
      <td><strong>Trecut / Eșuat</strong></td>
    </tr>
    <tr>
      <td>2</td>
      <td>Reveniți la pagina e-Serviciului și apăsați din nou butonul Semnează.</td>
      <td>Pagina de semnare MSign este afișată utilizatorului.</td>
      <td><strong>Trecut / Eșuat</strong></td>
    </tr>
  </tbody>
</table>

### Cazul #4

<table>
  <tbody>
    <tr>
      <td><strong>ID Caz de Testare</strong></td>
      <td colspan="3">TC_FUNCT_04</td>
    </tr>
    <tr>
      <td><strong>Descriere</strong></td>
      <td colspan="3">Verificarea gestionării corecte a erorilor</td>
    </tr>
    <tr>
      <td><strong>Aplicabil pentru</strong></td>
      <td colspan="3">Lista de browsere specificată în cerințe</td>
    </tr>
    <tr>
      <td><strong>Cerințe</strong></td>
      <td colspan="3">REQ_FUNCT_XX</td>
    </tr>
    <tr>
      <td><strong>Condiții inițiale</strong></td>
      <td colspan="3">Deschideți e-Serviciul testat într-o fereastră de browser. Parcurgeți paginile web ale e-Serviciului, introduceți datele sau încărcați documentul de semnat și navigați la pagina cu butonul Semnează, pentru a efectua semnarea.</td>
    </tr>
    <tr>
      <td><strong>Pas</strong></td>
      <td><strong>Sarcină</strong></td>
      <td><strong>Rezultat așteptat</strong></td>
      <td><strong>Rezultat efectiv</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Utilizați date invalide (cum ar fi un ExpectedSigner.ID invalid, un MSISDN invalid) și apăsați butonul Semnează.</td>
      <td>e-Serviciul afișează un mesaj de eroare și nu redirecționează către MSign.</td>
      <td><strong>Trecut / Eșuat</strong></td>
    </tr>
  </tbody>
</table>

### Cazul #5

<table>
  <tbody>
    <tr>
      <td><strong>ID Caz de Testare</strong></td>
      <td colspan="3">TC_FUNCT_05</td>
    </tr>
    <tr>
      <td><strong>Descriere</strong></td>
      <td colspan="3">Verificarea funcționalității de verificare a unei semnături valide</td>
    </tr>
    <tr>
      <td><strong>Aplicabil pentru</strong></td>
      <td colspan="3">Lista de browsere specificată în cerințe</td>
    </tr>
    <tr>
      <td><strong>Cerințe</strong></td>
      <td colspan="3">REQ_FUNCT_XX</td>
    </tr>
    <tr>
      <td><strong>Condiții inițiale</strong></td>
      <td colspan="3">Semnați niște date sau un document în e-Serviciul integrat (adică urmați TC_FUNCT_01) și navigați la pagina cu butonul Verifică, pentru a efectua verificarea.</td>
    </tr>
    <tr>
      <td><strong>Pas</strong></td>
      <td><strong>Sarcină</strong></td>
      <td><strong>Rezultat așteptat</strong></td>
      <td><strong>Rezultat efectiv</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Apăsați butonul Verifică.</td>
      <td>e-Serviciul afișează un rezultat de verificare a semnăturii reușit, clar vizibil.</td>
      <td><strong>Trecut / Eșuat</strong></td>
    </tr>
  </tbody>
</table>

### Cazul #6

<table>
  <tbody>
    <tr>
      <td><strong>ID Caz de Testare</strong></td>
      <td colspan="3">TC_FUNCT_06</td>
    </tr>
    <tr>
      <td><strong>Descriere</strong></td>
      <td colspan="3">Verificarea funcționalității de verificare a unei semnături valide</td>
    </tr>
    <tr>
      <td><strong>Aplicabil pentru</strong></td>
      <td colspan="3">Lista de browsere specificată în cerințe</td>
    </tr>
    <tr>
      <td><strong>Cerințe</strong></td>
      <td colspan="3">REQ_FUNCT_XX</td>
    </tr>
    <tr>
      <td><strong>Condiții inițiale</strong></td>
      <td colspan="3">Semnați niște date sau un document în e-Serviciul integrat (adică urmați TC_FUNCT_01) și navigați la pagina cu butonul Verifică, pentru a efectua verificarea. Modificați datele semnate, documentul sau semnătura efectivă (dacă este posibil) direct în baza de date sau în fișierele binare rezultate.</td>
    </tr>
    <tr>
      <td><strong>Pas</strong></td>
      <td><strong>Sarcină</strong></td>
      <td><strong>Rezultat așteptat</strong></td>
      <td><strong>Rezultat efectiv</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Apăsați butonul Verifică.</td>
      <td>e-Serviciul afișează un rezultat de verificare a semnăturii eșuat, clar vizibil.</td>
      <td><strong>Trecut / Eșuat</strong></td>
    </tr>
  </tbody>
</table>

## Revizuirea și auditul integrărilor

Nu există cerințe speciale legate de revizuirea integrării.
