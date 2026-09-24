## Obținerea credențialelor

MPay utilizează certificate generate de Serviciul Tehnologia Informației și Securitate Cibernetică (denumit în continuare STISC), prin solicitarea unui certificat pentru [semnătură și autentificare](https://semnatura.md/order/system-certificate). Aceste certificate trebuie utilizate atât pentru autentificarea SSL, cât și pentru semnarea mesajelor SOAP.

Pentru mediul de testare, prestatorul de servicii (dezvoltatorii) va utiliza certificatele de test obținute de la deținătorul serviciului.

## Înregistrarea e-serviciului plătibil

Pentru înregistrare, deținătorului serviciului trebuie să i se furnizeze următoarele detalii.

| Informație | Descriere |
|-------------|-------------|
| URL-ul Prestatorului de Servicii | MPay trebuie să poată accesa serviciul web care implementează interfața IServiceProvider. Vă rugăm furnizați URL-ul care poate fi accesat de MPay. |
| Certificatul serviciului | Conform celor specificate mai sus, acest certificat trebuie utilizat pentru semnarea mesajelor SOAP de către e-Serviciu. Pentru a putea verifica semnăturile, MPay trebuie să aibă certificatul înregistrat. |
| IP-ul Prestatorului de Servicii | Pentru a accesa pagina web front-end a MPay pentru scenarii de testare manuală, vă rugăm furnizați IP-ul public (static) al sistemului dumneavoastră informațional. |

Suplimentar, dacă infrastructura dumneavoastră de implementare poate filtra apelurile după IP-urile de intrare, vă rugăm solicitați adresa IP externă a MPay și configurați filtrele corespunzător.

## Contracte tehnice

Dacă dezvoltați o implementare a interfeței IServiceProvider în .NET, vă rugăm utilizați proiectul MPay.PublicModel, care face parte din exemplul .NET. Puteți pur și simplu crea o nouă „WCF Service Application", referenția proiectul MPay.PublicModel și implementa interfața MPay.PublicModel.IServiceProvider.

Dacă implementați interfața prestatorului de servicii în alte tehnologii, puteți găsi o copie a WSDL-ului care descrie contractul de implementat (precum și o copie offline a WSDL-ului MPay) în același exemplu .NET. Fișierul WSDL poate fi găsit la următoarea cale:

```
sample\MPay.Sample.Offline\Service References\SampleServiceProvider\ServiceProvider.wsdl
```
