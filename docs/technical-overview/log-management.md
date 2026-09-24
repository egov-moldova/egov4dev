Jurnalizarea (logging) în sistemele guvernamentale nu este un flux de depanare (debugging) — este un **sistem de evidență** utilizat pentru audit și trasabilitate, investigarea incidentelor, analiza de securitate și observabilitate operațională. Jurnalele trebuie să descrie fapte despre ce s-a întâmplat în sistem, nu cum funcționează codul.

Ecosistemului i se aplică două obligații distincte de jurnalizare, care nu trebuie confundate:

| Tip | Unde | Scop |
| --- | --- | --- |
| **Jurnalizarea evenimentelor cu relevanță juridică** | [MLog](../guides/mlog/index.md) | Înregistrarea evenimentelor cu relevanță juridică — obligatorie pentru toate sistemele care procesează date cu caracter personal și informații guvernamentale critice, conform Hotărârii de Guvern nr. 708/2014. Înregistrează cine a accesat sau a modificat ce, cu valoare probatorie juridică. |
| **Jurnalizarea tehnică** | Platforma centralizată de jurnalizare (bazată pe Elasticsearch) | Telemetrie operațională pentru rularea, monitorizarea și depanarea sistemului. |

O acțiune poate necesita ambele: actualizarea evidenței unui cetățean produce un eveniment juridic în MLog *și* înregistrări în jurnalul tehnic. Înregistrarea unui eveniment în MLog nu înlocuiește niciodată jurnalul tehnic, și nici invers.

* * *

## Jurnalizare structurată

Toate serviciile emit **jurnale structurate** prin `ILogger<T>`, cu un furnizor structurat — niciodată `Console.WriteLine`, niciodată mesaje concatenate din șiruri. Fiecare intrare conține, cel puțin:

```json
{
  "timestamp": "2026-08-07T14:30:00.000Z",
  "level": "Information",
  "service": "certificate-service",
  "correlation_id": "00-4bf92f3577b34da6...",
  "message": "Certificate issued",
  "environment": "production"
}
```

**Identificatorii de corelare sunt propagați de la un capăt la altul** — de la cererea primită, prin apelurile interne, până la apelurile către platformele partajate și mesajele publicate către MConnect Events — astfel încât un singur identificator reconstituie un flux întreg, pe mai multe sisteme. Același identificator este returnat consumatorilor API în [răspunsurile de eroare](api-design-guide.md#erori), sub numele `traceId`.

## Modelul actorului: cine a făcut ce

Fiecare intrare de jurnal de business relevantă răspunde la: **cine** a făcut **ce**, asupra **cărui obiect**, în legătură cu **care subiect**. Acestea sunt dimensiuni structurate, independente — nu proză de îngropat în textul mesajului:

| Câmp | Semnificație | Obligatoriu |
| --- | --- | --- |
| `user` | **Actorul** — operatorul autentificat, sau `system` pentru joburi de fundal | Întotdeauna, pentru acțiuni de business |
| `subject` | **Persoana** vizată de acțiune — cetățean, angajat, beneficiar | Atunci când este implicată o persoană |
| `object` | **Înregistrarea** — declarație, document, cerere, plată | Atunci când este implicată o înregistrare |
| `legal_entity` | Contextul **organizației** în care are loc acțiunea | Atunci când se acționează într-un context organizațional |

Câmpurile sunt independente (ortogonale) și nu se substituie niciodată unul altuia — o persoană nu este niciodată un `object`, un document nu este niciodată un `subject`:

| Scenariu | user | subject | object |
| --- | --- | --- | --- |
| Operatorul se autentifică | ✅ | – | – |
| Operatorul editează cererea unui cetățean | ✅ | ✅ | ✅ |
| Operatorul vizualizează un document | ✅ | – | ✅ |
| Job de sincronizare nocturn | `system` | – | numele job-ului |

* * *

## Ce se jurnalizează

1. **Evenimente de business — întotdeauna**: creare/actualizare/ștergere, tranziții de stare, depuneri, aprobări și respingeri, semnături, importuri și exporturi.
2. **Acțiuni relevante pentru securitate**: autentificare/deautentificare, autentificare eșuată, acces refuzat, modificări de permisiuni și roluri.
3. **Erori care afectează rezultatele**: operațiuni eșuate, posibil impact asupra consecvenței datelor, reîncercări (retries) și soluții de rezervă (fallbacks) — cu excepția, obiectul/subiectul afectat și motivul la nivel general.
4. **Granițe de integrare**: apeluri către platformele partajate și API-uri externe, publicarea și consumul de mesaje, inițierea și rezultatele plăților — jurnalizați **intenția și rezultatul, nu payload-urile**.
5. **Joburi de fundal**: start, sfârșit, numărul de elemente procesate, eșecuri.

## Ce nu se jurnalizează

- **Date cu caracter personal și sensibile** — fără IDNP, nume, adrese, token-uri, parole sau numere de card în jurnalele tehnice. Jurnalizați în schimb identificatorii propriilor înregistrări; identificatorul permite unui investigator să găsească datele în sistemul de evidență, ceea ce reprezintă exact nivelul potrivit de indirecție.
- **SQL brut și diagnostice ORM** — fără interogări generate, parametri sau ieșiri ale change tracker-ului în producție. Jurnalizați intenția („se încarcă declarația după număr"), nu mecanismul. În EF Core, păstrați `EnableSensitiveDataLogging` și `EnableDetailedErrors` dezactivate în producție.
- **Volcaje de payload-uri (payload dumps)** — fără DTO-uri serializate, corpuri de cerere/răspuns sau blob-uri JSON. Preferați identificatori, numărători și rezumate de stare.
- **Zgomot repetitiv** — fără jurnalizare în bucle strânse, salvări per-rând sau accesări cu succes ale cache-ului (cache hits); jurnalele zgomotoase sunt exact modul în care semnalele reale sunt ratate.
- Aceeași eroare, de mai multe ori, la mai multe straturi — jurnalizați-o acolo unde este tratată.

## Niveluri

| Nivel | Utilizare |
| --- | --- |
| `Critical` | Serviciul nu poate continua sau datele sunt în pericol |
| `Error` | O operațiune a eșuat |
| `Warning` | Neașteptat, dar tratat — dependențe degradate, reîncercări, date de intrare suspecte |
| `Information` | Evenimente de business și schimbări importante de stare — aceasta este narațiunea de producție |
| `Debug` | Intenția dezvoltatorului și diagnostice — doar în mediile de dezvoltare |

Producția transmite către depozitul central nivelul `Information` și cele superioare. Evitați `Information` în interiorul buclelor nemărginite; dacă un nivel sub `Information` este necesar în producție pentru diagnosticarea unui incident, este activat temporar și deliberat, nu lăsat pornit.

* * *

## Monitorizare și retenție

- Jurnalele tehnice sunt centralizate (Elasticsearch + Kibana), cu alertare pe anomaliile de rată a erorilor; serviciile expun de asemenea endpoint-uri de sănătate (health) și metrici, consumate de stiva de monitorizare (Prometheus + Grafana) — vedeți [Instrumente și tehnologii](../tools/technologies.md).
- Structura jurnalului este un contract: tablourile de bord (dashboards), alertele și auditurile depind de aceasta, astfel încât numele câmpurilor rămân stabile, iar modificările sunt revizuite ca și modificările de API.
- Perioadele de retenție respectă cadrul normativ aplicabil: retenția MLog pentru evenimentele cu relevanță juridică este guvernată de reglementarea proprie; retenția jurnalelor tehnice este definită per sistem, de comun acord cu cerințele operaționale ale Agenției.

## Listă de verificare înainte de commit

1. Cine a efectuat acțiunea? → `user`
2. Este implicată o persoană? → `subject`
3. Este implicată o înregistrare? → `object`
4. Această intrare ar ajuta un auditor sau un responsabil cu răspunsul la incidente?
5. Expune date cu caracter personal, secrete sau payload-uri? → eliminați-le

Dacă o intrare nu ajută pe nimeni și expune ceva — nu este o linie de jurnal, este o responsabilitate (liability).
