# Scenarii de interacțiune

## Procesul de autentificare

Cel mai important scenariu de integrare cu MPass este autentificarea utilizatorului.

În cadrul acestui proces, dacă utilizatorul este deja autentificat, sesiunea MPass nu a expirat, iar autentificarea nu este forțată, utilizatorului nu i se solicită să își dovedească din nou identitatea. Astfel este implementat, de fapt, single sign-on (SSO).

<img src="../../../assets/umls/mpass/interaction_scenarios/sso_lightmode.svg" alt="Diagrama SSO">

Iată descrierea procesului de autentificare folosind MPass:

1. Utilizatorul accesează o resursă protejată a serviciului sau alege explicit să se autentifice în serviciu. Browser-ul transmite această cerere către Service în numele utilizatorului.
2. Service generează un AuthnRequest (cerere de autentificare) și îl semnează folosind cheia sa privată. A se vedea descrierea structurii AuthnRequest pentru detalii.
3. AuthnRequest-ul semnat este returnat browser-ului printr-o pagină de redirecționare specială.
4. Browser-ul transmite (folosind metoda HTTP POST) cererea către MPass.
5. MPass verifică AuthnRequest-ul primit și proprietățile înregistrării serviciului.
6. Dacă utilizatorul nu este deja autentificat sau autentificarea este forțată, MPass interacționează cu
   sd SSOUserBrowserServiceMPass
7. MPass generează și semnează un SAML Response cu rezultatul autentificării. Rețineți că, dacă verificarea AuthnRequest eșuează sau utilizatorul anulează sau refuză explicit autentificarea, SAML Response va fi generat cu un status de eșec. A se vedea descrierea structurii Response pentru detalii.
8. Response-ul semnat este returnat browser-ului printr-o pagină de redirecționare specială.
9. Browser-ul transmite (folosind metoda HTTP POST) cererea către Service.
10. Service verifică Response-ul și își creează propria sesiune/cookie sau tratează Response-ul în orice alt mod specific. Pentru detalii privind modul corect de desfășurare a acestui proces de verificare, consultați secțiunea Considerații de securitate.
11. Service oferă resursele protejate utilizatorului acum autentificat, până când sesiunea sa locală expiră sau utilizatorul solicită explicit delogarea (a se vedea mai jos).

## Procesul de delogare

Deoarece utilizatorii se pot autentifica în mai multe servicii în cadrul unei sesiuni MPass, din punctul de vedere al securității SSO nu este pe deplin implementat fără un SLO (Single Logout) corespunzător. Serviciile care se integrează TREBUIE să implementeze ambele.

<img src="../../../assets/umls/mpass/interaction_scenarios/slo_lightmode.svg" alt="Diagrama SLO">

Iată descrierea procesului de delogare folosind MPass:

1. Utilizatorul solicită explicit delogarea. Browser-ul său transmite această cerere către Service.
2. Service încheie sesiunea locală a utilizatorului, adică utilizatorul va trebui să se autentifice din nou pentru a accesa în continuare orice resursă protejată.
3. Service generează și semnează un LogoutRequest și returnează această cerere browser-ului printr-o pagină de redirecționare specială.
4. Browser-ul transmite (folosind metoda HTTP POST) cererea către MPass.
5. Dacă, în cadrul sesiunii MPass a utilizatorului, acesta s-a autentificat și în alte servicii, MPass generează și semnează câte un LogoutRequest pentru fiecare astfel de serviciu, returnându-le pe toate browser-ului.
6. Browser-ul transmite aceste cereri către serviciile respective.
7. La primirea LogoutRequest, fiecare serviciu validează cererea, apoi încheie sesiunea locală a utilizatorului, adică utilizatorul va trebui să se autentifice din nou pentru a accesa în continuare resursele protejate ale serviciului.
8. Fiecare serviciu generează și semnează apoi un LogoutResponse pentru a confirma rezultatul delogării și returnează acest response browser-ului printr-o pagină de redirecționare specială. Rețineți că, pentru o procesare corectă a delogării atunci când se utilizează HTTP POST, serviciile trebuie să returneze următorul header în răspunsul HTTP:
   X
   Frame Option allow from https://mpass.gov.md
9. Browser-ul transmite toate response-urile rezultate către MPass.
10. MPass este informat despre rezultate după ce toate serviciile participante confirmă delogarea sau după un timeout (pentru a trata cazul serviciilor care nu pot confirma delogarea).
11. MPass încheie apoi sesiunea locală a utilizatorului, adică utilizatorul va trebui să se autentifice din nou pentru a accesa profilul său MPass.
12. MPass generează și semnează un LogoutResponse și îl returnează browser-ului.
13. Browser-ul transmite (folosind metoda HTTP POST) response-ul către Service.
14. În final, după procesarea LogoutResponse-ului rezultat, Service este liber să returneze utilizatorului orice pagină corespunzătoare necesităților sale.
