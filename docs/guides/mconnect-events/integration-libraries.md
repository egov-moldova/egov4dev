## Utilizarea librăriei de integrare .NET

Pentru clienții .NET, Agenția de Guvernare Electronică a dezvoltat o librărie de integrare, numită Age.Integrations.MConnect.Events, disponibilă ca pachet NuGet, fie din Feed-urile interne de artefacte, fie la cerere.

### Configurarea certificatului de sistem

Pentru a configura un producător sau un consumator, clientul trebuie mai întâi să se asigure că certificatul de sistem este adăugat (așa cum este folosit pentru integrarea tuturor serviciilor la nivel de platformă). Următorul cod face acest lucru:

```csharp
builder.Services.AddSystemCertificate(builder.Configuration.GetSection("Certificate"));
```

Codul de mai sus așteaptă următoarea secțiune de configurare (în appsetting.json sau din alte surse de configurare):

```json
"Certificate": {
  "Path": "path to pfx file or mounted Kubernetes secret as folder",
  "Password": "password for pfx file"
}
```

### Producerea evenimentelor

Apoi, clientul poate configura un producător:

```csharp
builder.Services.AddCloudEventsProducer(builder.Configuration.GetSection("CloudEventsProducer"));
```

cu următoarea secțiune de configurare:

```json
"CloudEventsProducer": {
  "BaseAddress": "https://mconnect-events.staging.egov.md:8443/ce/"
}
```

Iată lista completă a cheilor de configurare pentru un producător:

- **BaseAddress**: Adresa de bază pentru endpointul MConnect Events. Trebuie setată explicit (vezi secțiunea Medii).
- **Timeout**: Timpul de așteptare pentru apelurile de producere. Implicit, 100 de secunde.
- **JsonSerializerOptions**: Opțiunile de serializare folosite la serializarea datelor CloudEvent în JSON.

Serviciul rezultat, ICloudEventsProducer, disponibil din containerul de dependency injection al .NET Core, include mai multe metode supraîncărcate, denumite ProduceAsync, care permit producerea unor instanțe unice de CloudEvent sau a unei liste a acestora, ca lot.

CloudEvent.Id trebuie să fie unic pentru toate evenimentele, iar CloudEvent.Source trebuie setat ca un URN valid, stabilit în configurația producătorului.

Rețineți că, pentru a asigura o consumare ordonată a evenimentelor legate de o anumită entitate, setați CloudEvent.PartitionKey la aceeași valoare, precum identificatorul entității cu un prefix (de exemplu, „idno:1010600034203").

### Consumarea evenimentelor

Pentru a configura un consumator, apelați:

```csharp
builder.Services.AddCloudEventHandlers(builder.Configuration.GetSection("CloudEventsConsumer"))
```

cu următoarea secțiune de configurare:

```json
"CloudEventsConsumer": {
  "BaseAddress": "wss://mconnect-events.staging.egov.md:8443/ce/"
}
```

Iată lista completă a cheilor de configurare pentru un consumator:

- **BaseAddress**: Adresa de bază pentru endpointul WebSocket al MConnect Events. Trebuie setată explicit (vezi secțiunea Medii).
- **ConnectTimeout**: Timpul de așteptare pentru deschiderea conexiunii. Implicit, 30 de secunde.
- **ReceiveBufferSize**: Dimensiunea buffer-ului pentru recepția datelor, în bytes. Implicit, 64 * 1024 bytes (64 KB).
- **ConsumeEvents**: Specifică dacă trebuie consumate evenimentele standard. Implicit, true.
- **ConsumeTest**: Specifică dacă trebuie consumate evenimentele de test. Implicit, true.
- **ConsumeDead**: Specifică dacă trebuie consumate evenimentele eșuate (dead). Implicit, false.
- **Group**: Grupul din care face parte acest consumator. Implicit null, adică un grup de consumatori implicit. Setați acest parametru doar atunci când doriți să consumați aceleași evenimente într-un grup de consumatori diferit.

Apoi adăugați fluent unul sau mai mulți handleri, folosind metodele AddSingletonHandler<THandler, TData> sau AddTransientHandler<THandler, TData>, unde THandler implementează interfața IHandleCloudEvents<TData>, iar TData reprezintă datele evenimentului, tipizat corespunzător. Puteți controla și deserializarea, furnizând o instanță de JsonSerializerOptions metodelor AddXXXHandler.

Alternativ, dacă aveți nevoie de o logică personalizată pentru identificarea handlerului de eveniment și deserializarea datelor, puteți adăuga o implementare generică a ICloudEventsConsumer, apelând AddCloudEventsConsumer<TConsumer>. Acel handler va primi toate evenimentele pe care consumatorul le poate consuma.

În ambele cazuri, implementările IHandleCloudEvents.HandleAsync și ICloudEventsConsumer.ConsumeAsync trebuie să apeleze ConfirmAsync pe contextul furnizat. În cazurile în care evenimentul primit nu poate fi consumat, consumatorii pot apela DeadAsync pe contextul furnizat, pentru a raporta evenimentul ca fiind eșuat (dead). Evenimentele eșuate necesită intervenția manuală a administratorilor MConnect Events sau apelarea de către consumator cu ConsumeDead setat la true în configurație.
