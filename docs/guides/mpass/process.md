1. Completați [Formularul unic de conectare](https://forms.office.com/Pages/ResponsePage.aspx?id=Z4f8jWsRaEKDxfvIWTRtOHwLku9yOJZAs22J7gTUxBNUMFhISEJPMUNGOTIwV09OTkFTUUtLSk9LTS4u) disponibil pe site-ul eGov. 
2. Semnați contractul și/sau anexa furnizată de eGov pentru prestarea serviciilor MPass. 
   – Dacă instituția are deja un contract activ pentru un alt serviciu al platformei eGov, nu este necesară semnarea unui contract nou; se va semna doar anexa specifică MPass. 
3. Furnizați [detaliile tehnice de integrare](https://forms.office.com/Pages/ResponsePage.aspx?id=Z4f8jWsRaEKDxfvIWTRtOPEKwFi7MyRNimikcwdXWMlUOTlGSVRPQUJVRUFKVVVYR1I4UE9KTTRYOC4u) după semnarea contractului. Veți primi, prin notificare, linkul către formularul online de detalii de integrare. În acest formular, indicați:
   - denumirea sistemului informațional;
   - adresele URL ale mediilor de testare și producție pentru:
     - LogoutRequest
     - LogoutResponse (Single Logout – SLO);
   - lista atributelor de autentificare care vor fi returnate (de ex., NameIdentifier, FirstName, LastName, BirthDate). 

4. Transmiteți către eGov, la adresa servicii@egov.md: 
  - Certificatul de sistem poate fi obținut prin depunerea unei cereri online la: https://semnatura.md/order/system-certificate
  - certificatul de sistem (.cer – cheie publică), dacă instituția nu are deja înregistrat un certificat valid pentru un alt serviciu eGov, sau
  - numărul de serie al certificatului existent, dacă același certificat va fi utilizat pentru integrarea cu MPass. 

5. eGov configurează accesul la mediul de testare: https://mpass.staging.egov.md. 
6. Implementați integrarea conform documentației tehnice și efectuați [testele funcționale](integration-tests.md) în mediul de testare.
7. eGov efectuează teste suplimentare în mediul de testare și confirmă conformitatea tehnică. 
8. Confirmați către eGov configurarea pentru mediul de producție la adresa de e-mail: servicii@egov.md 
9. eGov activează serviciul în mediul de producție. 
10. Primiți notificarea transmisă de eGov privind finalizarea integrării și activarea în mediul de producție.

## Tarifarea serviciului

| Tip de utilizator | Condiții de acces | Tarif anual per integrare |
|-----------|-------------------|---------------------------|
| **Instituții publice** | În baza contractului | – |
| **Persoane juridice de drept privat** | În baza contractului (conform cadrului legal aplicabil) | 10.800 lei |
| **Persoane fizice** | În baza contractului (conform cadrului legal aplicabil) | 10.800 lei |

**Note:**

- Tariful se aplică integrării unui singur sistem informațional
- Integrările multiple necesită tarife separate pentru fiecare sistem

## Termenul de conectare 

MEGA procesează cererea în cel mult 7 zile lucrătoare, calculate din momentul în care au fost recepționate toate datele necesare din partea instituției. 
