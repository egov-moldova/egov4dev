# Scenarii de interacțiune

## Procesul de semnare

Cel mai important scenariu de integrare cu MSign este solicitarea de a semna un lot (sau un singur) conținut digital și primirea semnăturii(elor) în urma interacțiunii utilizatorului.

<span class="red-bold-text">Observație.</span> Trimiterea unui lot de conținuturi digitale necesită, de regulă, ca utilizatorul să introducă PIN-ul pentru fiecare conținut semnat sau, în cazul Semnăturii Mobile, chiar să primească/trimită mai multe mesaje SMS. Trimiterea mai multor conținuturi spre semnare este practică doar în cazurile în care se știe că utilizatorii pot avea acces la instrumente de mesagerie în masă, cum ar fi atunci când se utilizează token-uri criptografice care păstrează în cache PIN-ul pentru utilizare multiplă.

<img src="../../../assets/umls/msign/interaction_scenarios/lightmode.svg" alt="Fluxul de semnare">

Iată o scurtă descriere a procesului de semnare folosind MSign:

1. După completarea unui formular, încărcarea unui document de semnat (Conținutul) sau selectarea unui lot de Conținuturi, Utilizatorul apasă butonul Semnează în Browser.
2. e-Serviciul pregătește Conținuturile de semnat și/sau calculează un hash pentru fiecare Conținut.
3. e-Serviciul apelează API-ul MSign (operația **PostSignRequest**) cu un **SignRequest** care reprezintă o cerere de semnare a unui lot de Conținuturi.
4. MSign validează și salvează **SignRequest**-ul pentru semnare ulterioară și returnează un **RequestID** generat.
5. e-Serviciul instruiește Browserul să afișeze Pagina de Semnare MSign pentru cererea de semnătură furnizată, oferind un **ReturnUrl**. Vezi Integrarea prin formulare web pentru mai multe detalii.
6. Browserul preia Pagina de Semnare și o afișează Utilizatorului.
7. Utilizatorul interacționează cu Pagina de Semnare pentru a selecta un instrument de semnare și a introduce orice date aferente instrumentului selectat pentru a efectua semnarea propriu-zisă a lotului.
8. MSign salvează semnăturile rezultate pentru preluare ulterioară.
9. MSign instruiește browserul să afișeze **ReturnUrl**, oferind **RequestID**. Vezi Integrarea prin formulare web pentru mai multe detalii.
10. Când Browserul solicită pagina indicată de **ReturnUrl**, e-Serviciul solicită **SignResponse**-ul propriu-zis de la API-ul MSign (operația **GetSignResponse**). Acest răspuns conține semnăturile pentru toate Conținuturile furnizate în lotul **SignRequest**.

## Procesul de verificare

MSign expune, de asemenea, un API de verificare a semnăturii electronice. Procesul de verificare nu expune nicio interfață utilizator pentru sistemele informaționale integrate.

Pentru a verifica un lot de semnături (sau o singură semnătură), apelați **VerifySignatures** și furnizați semnătura care trebuie verificată.

În cazul unei semnături **XAdES** (care rezultă în urma semnării unui hash), furnizați hash-ul original în parametrul Content și semnătura (adică **XAdES**) în parametrul Signature. În caz de verificare reușită, rezultatul va conține un singur certificat, respectiv certificatul semnatarului.

Pentru a verifica semnăturile fișierelor PDF (**PAdES**), este suficient să transmiteți documentul semnat în parametrul Signature. În caz de verificare reușită, rezultatul va conține certificatele pentru toți semnatarii individuali.

Rezultatul conține, de asemenea, un mesaj lizibil pentru utilizator, tradus în mai multe limbi, pe care sistemele integrate trebuie să îl afișeze utilizatorilor.

Având în vedere că procesul de verificare poate dura mai mult decât se așteaptă, se recomandă invocarea acestei operații de verificare în mod asincron, astfel încât sistemul apelant să nu pară blocat pentru utilizatori.
