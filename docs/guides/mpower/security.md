## Autentificare

Toate apelurile MPower Clients API pot fi efectuate doar de sisteme autentificate. Autentificarea se realizează cu ajutorul unui certificat de autentificare client.

Informații privind obținerea și înregistrarea certificatului pot fi găsite în Capitolul 7: Implementarea integrării.

## Autorizarea accesului

Pentru a accesa componenta MPower Clients API, este necesar să utilizați certificatul de autentificare a sistemului emis de STISC și înregistrat de AGE în MPass.

Clientul va apela API-ul MPower folosind certificatul de sistem propriu pentru autentificare. API-ul va verifica dacă certificatul are drepturile necesare pentru a accesa endpointul solicitat. Dacă drepturile sunt valabile, cererea va fi procesată; în caz contrar, va fi returnat un răspuns 403 (Forbidden).
Exemple de configurare MPass:

=== "Setări JSON"

    ``` json 
        {
            "AllowedEndpoints": [
            "/api/Authorization/check/Code-True-One",
            "/api/Authorization/check/Code-Details-One",
            "/api/Authorization/check/TypeCode-Valid-One",
            "/api/Authorization/check/Idn-Details-List",
            "/api/Authorization/file",
        ],
        "ViewAllAuthorizations": false
        }
    ```
!!! note "Notă"

     **"AllowedEndpoints"** – specifică lista endpointurilor la care sistemul terț are acces.
     <br>**"ViewAllAuthorizations"** – true/false: true – este acordat accesul la toate împuternicirile (IR); false – accesul este limitat la împuternicirile care aparțin exclusiv prestatorului de servicii.

## Criptare
Comunicarea cu componenta MPower REST API este criptată folosind protocolul standard TLS (HTTPS).
