#Parcursul integrării

##**Obținerea credențialelor**

MPay utilizează certificate digitale de sistem generate de Serviciul Tehnologia Informației și Securitate Cibernetică (denumită în continuare STISC) - ([Solicită certificat de sistem](https://semnatura.md/order/system-certificate)
). Aceste certificate pot fi utilizate atât pentru autentificarea SSL, cât și pentru semnarea mesajelor SOAP. Pentru mediul de test, dezvoltatorii pot utiliza atît certificatele de test obținute de la echipa tehnică MPay, cît și pe cele proprii cu condiția că sunt de tip avansat calificat.

##**Înregistrarea prestatorului de servicii**

Informațiile de mai jos trebuie puse la dispoziția serviciului MPay pentru înregistrare

<table>
  <thead>
    <tr>
      <th>Informații</th>
      <th>Descriere</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>URL-ul prestatorului de servicii</td>
      <td>MPay trebuie să poată apela serviciul web care implementează interfața <strong>IServiceProvider</strong>. Vă rugăm să puneți la dispoziție adresa URL prin care serviciul MPay va efectua apelurile.</td>
    </tr>
    <tr>
      <td>Certificatul serviciului</td>
      <td>După cum este specificat mai sus, acest certificat trebuie utilizat pentru a semna mesajele SOAP al prestatorului de servicii, pentru a putea verifica semnăturile. Acest certificat (certificatul cheii publice) trebuie să fie înregistrat în MPay.</td>
    </tr>
    <tr>
      <td>IP-ul prestatorului de servicii</td>
      <td>Pentru accesarea pagina web front-end MPay pe mediul de test, trebuie să prezentați IP-ul public (static) al sistemului informațional.</td>
    </tr>
  </tbody>
</table>

În cazul că sistemul dvs. informational filtrează apelurile după IP, atunci trebuie să solicitați adresa IP externă a web-serviciului MPay și să configurați IP-ul.

##**Contracte tehnice**

<!-- ToDo: adaptarea la nou format  -->
În cazul în care dezvoltați implementarea interfeței IServiceProvider în .NET, utilizați librăria MPay.PublicModel, din exemplul .NET. Pentru implementarea interfeței cu alte tehnologii, găsiți fișierul WSDL care descrie contractul tehnic ce urmează să fie implementat. În sursa de exemple se regăsește modelul MPay offline, pe calea: sample\MPay.Sample.Offline, ce simulează apelurile către web-serviciul dvs. (necesită cunoștințe .NET)