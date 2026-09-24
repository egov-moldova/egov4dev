# Implementarea integrării

##**Primii pași**

###**Înregistrarea sistemului și accesul la serviciu**

MPower autentifică sistemele terțe pe baza numărului de serie al certificatului. Sistemele terțe trebuie să fie înregistrate în MPass înainte de a apela metodele API.

Metodele API MPower sunt accesibile doar din adrese IP înregistrate.

Pentru a solicita acces, trimiteți un email la [suport.mpower@egov.md](mailto:suport.mpower@egov.md) cu următoarele informații: adresa IP sau VPN-ul asociat unei adrese IP private, precum și numărul de serie al certificatului.

###**Obținerea datelor de acces**

Pentru a vă integra cu serviciul, aveți nevoie de certificate emise de Serviciul Tehnologia Informației și Securitate Cibernetică (STISC). Pentru detalii privind obținerea/prelungirea certificatului de cheie publică, vizitați [https://stisc.gov.md/ro/semnatura-electronica](https://stisc.gov.md/ro/semnatura-electronica).

###**Mediile serviciului**

Integrarea se realizează prin REST API. Metodele API pot fi accesate în mediul de testare și în mediul de producție:

<table>
  <thead>
    <tr>
      <th>Mediu</th>
      <th>URL-ul serviciului MPower</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Testare</td>
      <td><a href="https://mpower.staging.egov.md:8443/clients-api/swagger/index.html">https://mpower.staging.egov.md:8443/clients-api/swagger/index.html</a></td>
    </tr>
    <tr>
      <td>Producție</td>
      <td><a href="https://mpower.gov.md:8443/clients-api/swagger/index.html">https://mpower.gov.md:8443/clients-api/swagger/index.html</a></td>
    </tr>
  </tbody>
</table>

!!!note "Important"

    Este obligatorie efectuarea integrărilor și a testărilor aferente în mediul de testare.

##**Testarea integrării**

!!!note "Cazuri de test"

    Mai jos sunt câteva cazuri de test de bază care pot fi adăugate la suita de teste care se integrează cu MSign.


###**Cazul #1**

<table>
  <tbody>
    <tr>
      <td><strong>ID caz de test</strong></td>
      <td colspan="3">TC_FUNCT_01</td>
    </tr>
    <tr>
      <td><strong>Descriere</strong></td>
      <td colspan="3">Verificarea integrării cu succes a serviciului electronic cu MSign</td>
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
      <td colspan="3">Deschideți serviciul electronic testat într-o fereastră de browser. Parcurgeți paginile web ale serviciului electronic, introduceți datele sau încărcați documentul care urmează a fi semnat și navigați la pagina cu butonul Semnează, pentru a efectua semnarea.</td>
    </tr>
    <tr>
      <td><strong>Pas</strong></td>
      <td><strong>Sarcină</strong></td>
      <td><strong>Rezultat așteptat</strong></td>
      <td><strong>Rezultat real</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Faceți clic pe butonul Semnează.</td>
      <td>Utilizatorului i se afișează pagina de semnare MSign.</td>
      <td><strong>Trecut / Eșuat</strong></td>
    </tr>
    <tr>
      <td>2</td>
      <td>Selectați primul instrument de semnare și introduceți datele aferente instrumentului selectat. Trimiteți datele.</td>
      <td>Browserul reafișează pagina serviciului electronic, semnăturile solicitate fiind furnizate cu succes.</td>
      <td><strong>Trecut / Eșuat</strong></td>
    </tr>
    <tr>
      <td>3</td>
      <td>Repetați pasul anterior (Pasul 2) pentru fiecare instrument de semnare disponibil.</td>
      <td>Browserul reafișează pagina serviciului electronic, semnăturile solicitate fiind furnizate cu succes.</td>
      <td><strong>Trecut / Eșuat</strong></td>
    </tr>
  </tbody>
</table>

###**Cazul #2**

<table>
  <tbody>
    <tr>
      <td><strong>ID caz de test</strong></td>
      <td colspan="3">TC_FUNCT_02</td>
    </tr>
    <tr>
      <td><strong>Descriere</strong></td>
      <td colspan="3">Verificarea eșuării semnării prin anularea procesului de semnare</td>
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
      <td colspan="3">Deschideți serviciul electronic testat într-o fereastră de browser. Parcurgeți paginile web ale serviciului electronic, introduceți datele sau încărcați documentul care urmează a fi semnat și navigați la pagina cu butonul Semnează, pentru a efectua semnarea.</td>
    </tr>
    <tr>
      <td><strong>Pas</strong></td>
      <td><strong>Sarcină</strong></td>
      <td><strong>Rezultat așteptat</strong></td>
      <td><strong>Rezultat real</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Faceți clic pe butonul Semnează.</td>
      <td>Utilizatorului i se afișează pagina de semnare MSign.</td>
      <td><strong>Trecut / Eșuat</strong></td>
    </tr>
    <tr>
      <td>2</td>
      <td>Selectați un instrument de semnare care solicită un PIN sau o confirmare la semnare (precum Semnătura mobilă) și anulați semnarea</td>
      <td>MSign afișează un mesaj clar privind eșuarea semnării, cu motivul aferent.</td>
      <td><strong>Trecut / Eșuat</strong></td>
    </tr>
    <tr>
      <td>3</td>
      <td>Analizați mesajul MSign și faceți clic pe OK pentru a continua</td>
      <td>Browserul reafișează pagina serviciului electronic care indică clar eșuarea semnării.
      <br>Rețineți că apelarea GetSignResponse pentru această cerere va returna un răspuns cu SignStatus = Failure</td>
      <td><strong>Trecut / Eșuat</strong></td>
    </tr>
  </tbody>
</table>

###**Cazul #3**

<table>
  <tbody>
    <tr>
      <td><strong>ID caz de test</strong></td>
      <td colspan="3">TC_FUNCT_03</td>
    </tr>
    <tr>
      <td><strong>Descriere</strong></td>
      <td colspan="3">Verificarea retrimiterii cererii de semnare</td>
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
      <td colspan="3">Deschideți serviciul electronic testat într-o fereastră de browser. Parcurgeți paginile web ale serviciului electronic, introduceți datele sau încărcați documentul care urmează a fi semnat și navigați la pagina cu butonul Semnează, pentru a efectua semnarea.</td>
    </tr>
    <tr>
      <td><strong>Pas</strong></td>
      <td><strong>Sarcină</strong></td>
      <td><strong>Rezultat așteptat</strong></td>
      <td><strong>Rezultat real</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Faceți clic pe butonul Semnează.</td>
      <td>Utilizatorului i se afișează pagina de semnare MSign.</td>
      <td><strong>Trecut / Eșuat</strong></td>
    </tr>
    <tr>
      <td>2</td>
      <td>Reveniți la pagina serviciului electronic și faceți clic din nou pe butonul Semnează.</td>
      <td>Utilizatorului i se afișează pagina de semnare MSign.</td>
      <td><strong>Trecut / Eșuat</strong></td>
    </tr>
  </tbody>
</table>

###**Cazul #4**

<table>
  <tbody>
    <tr>
      <td><strong>ID caz de test</strong></td>
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
      <td colspan="3">Deschideți serviciul electronic testat într-o fereastră de browser. Parcurgeți paginile web ale serviciului electronic, introduceți datele sau încărcați documentul care urmează a fi semnat și navigați la pagina cu butonul Semnează, pentru a efectua semnarea.</td>
    </tr>
    <tr>
      <td><strong>Pas</strong></td>
      <td><strong>Sarcină</strong></td>
      <td><strong>Rezultat așteptat</strong></td>
      <td><strong>Rezultat real</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Utilizați date invalide (precum ExpectedSigner.ID invalid, MSISDN invalid) și faceți clic pe butonul Semnează.</td>
      <td>Serviciul electronic afișează un mesaj de eroare și nu redirecționează către MSign.</td>
      <td><strong>Trecut / Eșuat</strong></td>
    </tr>
  </tbody>
</table>

###**Cazul #5**

<table>
  <tbody>
    <tr>
      <td><strong>ID caz de test</strong></td>
      <td colspan="3">TC_FUNCT_05</td>
    </tr>
    <tr>
      <td><strong>Descriere</strong></td>
      <td colspan="3">Verificarea funcționalității de verificare a semnăturii valide</td>
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
      <td colspan="3">Semnați date sau un document în serviciul electronic integrat (adică urmați TC_FUNCT_01) și navigați la pagina cu butonul Verifică, pentru a efectua verificarea.</td>
    </tr>
    <tr>
      <td><strong>Pas</strong></td>
      <td><strong>Sarcină</strong></td>
      <td><strong>Rezultat așteptat</strong></td>
      <td><strong>Rezultat real</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Faceți clic pe butonul Verifică.</td>
      <td>Serviciul electronic afișează clar un rezultat pozitiv al verificării semnăturii.</td>
      <td><strong>Trecut / Eșuat</strong></td>
    </tr>
  </tbody>
</table>

###**Cazul #6**

<table>
  <tbody>
    <tr>
      <td><strong>ID caz de test</strong></td>
      <td colspan="3">TC_FUNCT_06</td>
    </tr>
    <tr>
      <td><strong>Descriere</strong></td>
      <td colspan="3">Verificarea funcționalității de verificare a semnăturii valide</td>
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
      <td colspan="3">Semnați date sau un document în serviciul electronic integrat (adică urmați TC_FUNCT_01) și navigați la pagina cu butonul Verifică, pentru a efectua verificarea. Modificați datele semnate, documentul sau semnătura propriu-zisă (dacă este posibil) direct în baza de date sau în fișierele binare rezultate.</td>
    </tr>
    <tr>
      <td><strong>Pas</strong></td>
      <td><strong>Sarcină</strong></td>
      <td><strong>Rezultat așteptat</strong></td>
      <td><strong>Rezultat real</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Faceți clic pe butonul Verifică.</td>
      <td>Serviciul electronic afișează clar un rezultat negativ al verificării semnăturii.</td>
      <td><strong>Trecut / Eșuat</strong></td>
    </tr>
  </tbody>
</table>

##**Analiza și auditul integrărilor**

Nu există cerințe speciale referitoare la analiza integrării.