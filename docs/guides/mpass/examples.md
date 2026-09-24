## Mesaje SAML

Acest ghid trebuie să fie însoțit de mesaje SAML exemplu, aflate în următoarele fișiere:

1. **AuthnRequest.xml** – exemplu de AuthnRequest generat de exemplul .NET
2. **Response.xml** – exemplu de SAML Response de succes, generat de MPass ca răspuns la AuthnRequest de mai sus
3. **Response - Cancelled.xml** – exemplu de SAML Response eșuat, generat de MPass ca urmare a anulării autentificării de către utilizator
4. **LogoutRequest.xml** – exemplu de LogoutRequest generat de exemplul .NET
5. **LogoutResponse.xml** – exemplu de LogoutResponse de succes, generat de MPass ca răspuns la LogoutRequest de mai sus

## Exemplu .NET

Acest document este însoțit de un exemplu de integrare .NET. Dacă arhiva ZIP este criptată (în scopul trecerii prin filtrele de e-mail), parola este „mpass” (fără ghilimele).

### Cerințe software

Exemplul este construit folosind Visual Studio 2013, bazat pe ASP.NET 4.5, MVC 5.2, utilizând C# și managerul de pachete NuGet. Deși nu sunt necesare librării sau licențe terțe pentru a construi exemplul, NuGet necesită o conexiune la internet pentru descărcarea pachetelor la prima compilare.

### Prezentare generală a exemplului

După deschiderea fișierului MPass.Sample.sln, vă rugăm să accesați Web.config și să modificați elementele de configurare corespunzătoare din secțiunea applicationSettings. Toate configurările legate de integrarea cu MPass sunt plasate în această secțiune.

Veți găsi codul important în AccountController. Rulați exemplul și urmăriți codul.

Procesarea mesajelor SAML este implementată în clasa helper SamlMessage. Simțiți-vă liberi să o copiați în propria soluție pentru o integrare mai ușoară.

Vă rugăm să observați următoarele:

- Modul în care AccountController.Login construiește un AuthnRequest, îl semnează și îl transmite către MPass
- Modul în care AccountController.Acs procesează Response și utilizează SamlMessage.LoadAndVerifyLoginResponse pentru a verifica response-ul rezultat
- Modul în care AccountController.Logout construiește și transmite un LogoutRequest, iar AccountController.AfterLogout procesează LogoutResponse
- Modul în care AccountController.SingleLogout procesează LogoutRequest și generează un LogoutResponse pentru MPass
- Modul în care view-ul Redirect este utilizat pentru a transmite atât un request SAML, cât și un response SAML
- Modul în care OutputCacheAttribute este aplicat acțiunilor Login și Logout pentru a preveni caching-ul, conform recomandării din [SAML Binding, 3.5.5.1]
- SamlMessage aruncă ApplicationException la orice eșec de verificare, iar această eroare nu este tratată de AccountController, în mod intenționat, pentru a vă permite să finalizați o implementare corectă a tratării erorilor, conform necesităților propriului Service
- RelayState este returnat ca parte a transmiterii response-ului și poate conține orice valoare utilă pentru Service-ul dumneavoastră (rețineți că, potrivit [SAML Binding, 3.5.3], RelayState nu trebuie să depășească 80 de bytes în lungime)
- Comentarii furnizate în codul sursă pentru personalizarea ulterioară a integrării, specifică Service-ului dumneavoastră
