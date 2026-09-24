Deoarece MPay integrează mai mulți prestatori de e-Servicii plătibile și diferiți furnizori de plăți care oferă o varietate de instrumente de plată, există numeroase moduri în care un plătitor poate interacționa cu acesta.

## Comandă și plătește online

<img src="../mpay-dark.svg">

### Pașii scenariului:

1. **Crearea comenzii**
    - Un Plătitor completează și trimite o comandă pe pagina unui e-Serviciu plătibil
    - Comanda este persistată în baza de date a e-Serviciului

2. **Inițierea plății**
    - Pagina de confirmare a comenzii din e-Serviciu afișează un buton „Plătește"

3. **Redirecționarea către MPay**
    - Apăsarea acestui buton redirecționează browserul plătitorului către pagina de plată a MPay

4. **Solicitarea paginii de plată**
    - Browserul trimite ServiceID, OrderKey și, opțional, un ReturnUrl către pagina de plată a MPay (vezi capitolul Efectuare)

5. **Preluarea detaliilor comenzii**
    - Înainte de a afișa pagina web de plată, MPay invocă operația `IServiceProvider.GetOrderDetails` implementată de serviciul web al e-Serviciului

6. **Generarea facturii**
    - Pe baza OrderDetails returnat, MPay creează sau actualizează o factură existentă și afișează plătitorului detaliile facturii

7. **Selectarea metodei de plată**
    - Plătitorul selectează o metodă de plată (instrument)
    - Pentru plățile cu card bancar, aceasta înseamnă publicarea detaliilor facturii către procesatorul de card corespunzător (care este unul dintre furnizorii de plăți)

8. **Redirecționarea către furnizorul de plăți**
    - MPay redirecționează browserul către pagina de plată specifică instrumentului

9. **Transmiterea detaliilor de plată**
    - Plătitorul completează detaliile de plată necesare (precum detaliile cardului) și trimite plata pentru autorizare

10. **Autorizarea plății**
    - Furnizorul de plăți efectuează autorizarea corespunzătoare a plății

11. **Redirecționarea către rezultatul plății**
    - Furnizorul de plăți redirecționează browserul către pagina de rezultat a plății din MPay

12. **Preluarea confirmării plății**
    - Înainte de a afișa rezultatele plății, MPay preia o confirmare de plată de la furnizorul de plăți

13. **Confirmarea plății către e-Serviciu**
    - Dacă plata este reușită, MPay trimite o confirmare de plată către e-Serviciu, invocând operația `IServiceProvider.ConfirmOrderPayment` implementată de serviciul web al e-Serviciului, și afișează plătitorului rezultatele plății
    - **Notă:** Apelul ConfirmOrderPayment poate fi reîncercat de mai multe ori, până când reușește. Aceasta înseamnă că toate implementările trebuie să fie **idempotente**, adică apelurile multiple nu trebuie considerate drept plăți multiple

14. **Descărcarea chitanței (opțional)**
    - Opțional, plătitorul poate descărca și imprima o chitanță de plată

15. **Revenirea la e-Serviciu (opțional)**
    - Opțional, dacă ReturnUrl a fost furnizat la pasul 4, plătitorul poate alege să revină la pagina e-Serviciului
    - În acest caz, MPay redirecționează browserul către ReturnUrl

---

## Plătește o comandă existentă

### Pașii scenariului:

1. **Navigarea către MPay**
    - Plătitorul navighează către MPay:
      - Test: https://mpay.staging.egov.md
      - Producție: https://mpay.gov.md

2. **Selectarea serviciului**
    - Plătitorul selectează serviciul pentru care are comanda

3. **Introducerea cheii comenzii**
    - Plătitorul introduce cheia comenzii (precum numărul comenzii/cererii, numărul biletului pentru amenzi etc.)

4. **Continuarea cu fluxul standard**
    - Scenariul continuă apoi cu **pasul 5** al scenariului „Comandă și Plătește online", cu implementarea IServiceProvider (cu excepția revenirii la ReturnUrl)
    - adică, se caută comanda invocând operația `IServiceProvider.GetOrderDetails`

### Caz de utilizare suplimentar:

Acest scenariu este de asemenea aplicabil la accesarea **terminalelor de plată** (înlocuiți pur și simplu MPay cu terminalul de plată în textul descrierii scenariului).
