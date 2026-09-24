Mai jos sunt câteva cazuri de test de bază care pot fi adăugate în suita de teste, care se integrează cu MLog, înregistrează un eveniment și apoi îl caută.

### Caz de test: TC_FUNCT_01

**Descriere:** Verifică înregistrarea cu succes a unui eveniment nesemnat în sistemul MLog

**Aplicabil pentru:** Orice operațiune REST

**Cerințe:** REQ_FUNCT_XX

**Condiții inițiale:**

1. Sistemul informațional este înregistrat și configurat corect în sistemul MPass. Vă rugăm să contactați administratorii MLog pentru detalii privind acest pas.
2. Sistemul informațional este configurat corect în sistemul MLog. Vă rugăm să contactați administratorii MLog pentru detalii privind acest pas.
3. Utilizatorul generează un mesaj JSON cu detaliile evenimentului. Câmpurile mesajului pot (sau nu) conține câmpuri predefinite – a se vedea Câmpurile predefinite ale evenimentului. Exemplu de mesaj JSON:

```json
{
  "event_type": "3vq86ur.kqrjp2", 
  "event_time": "2016-09-28T17:32:54.883Z", 
  "test": "2pif9jvlqjio32deslck17d66js2h3l"
}
```

**Pași:**

| Pas | Sarcină | Rezultat așteptat | Rezultat efectiv |
|------|------|-----------------|---------------|
| 1 | Utilizatorul trimite mesajul către MLog.<br><br>Exemplu:<br><br>**POST** https://mlog.staging.egov.md:8443/register<br><br>**POST data:**<br>{"event_type": "36lj0r2.1p7cpon", "event_time": "2016-11-28T23:12:37.334+02:00", "test": "2pfn147imgrbm3fcbfn3p1pcad3d9l6"}<br><br>**Request Headers:**<br>Connection: keep-alive<br>Content-Type: application/x-www-form-urlencoded<br>Host: mlog.staging.egov.md:8443 | Mesajul de răspuns este recepționat.<br><br>Exemplu:<br>{"status":"200","message":"OK","timestamp":"1480457557976","UID":"92c12f00-32a2-4e33-8a7e-4bb7a7d5909a"} | Pass / Fail |
| 2 | Utilizatorul caută evenimentul înregistrat.<br><br>Exemplu:<br><br>**GET** https://mlog.staging.egov.md:8443/query/92c12f00-32a2-4e33-8a7e-4bb7a7d5909a<br><br>**Request Headers:**<br>Connection: close<br>Content-Type: application/json<br>Host: mlog.staging.egov.md:8443 | {"status":"200","message":"OK","timestamp":"1480457563221","result":[{"@uid":"92c12f00-32a2-4e33-8a7e-4bb7a7d5909a","event_type":"36lj0r2.1p7cpon","test":"2pfn147imgrbm3fcbfn3p1pcad3d9l6","event_time":"2016-11-28T23:12:37.334"}],"pagination":{"record-count":1,"page-size":50}} | Pass / Fail |

### Caz de test: TC_FUNCT_02

**Descriere:** Verifică înregistrarea cu succes a unui eveniment semnat în sistemul MLog

**Aplicabil pentru:** Orice operațiune REST

**Cerințe:** REQ_FUNCT_XX

**Condiții inițiale:**

1. Sistemul informațional este înregistrat și configurat corect în sistemul MPass. Vă rugăm să contactați administratorii MLog pentru detalii privind acest pas.
2. Sistemul informațional este configurat corect în sistemul MLog. Vă rugăm să contactați administratorii MLog pentru detalii privind acest pas.
3. Utilizatorul generează un mesaj JSON cu detaliile evenimentului. Câmpurile mesajului pot (sau nu) conține câmpuri predefinite – a se vedea Câmpurile predefinite ale evenimentului. Exemplu de mesaj JSON:

```json
{
  "event_type": "3vq86ur.kqrjp2", 
  "event_time": "2016-09-28T17:32:54.883Z", 
  "test": "2pif9jvlqjio32deslck17d66js2h3l"
}
```

**Pași:**

| Pas | Sarcină | Rezultat așteptat | Rezultat efectiv |
|------|------|-----------------|---------------|
| 1 | Utilizatorul trimite mesajul către MLog.<br><br>Exemplu:<br><br>**POST** https://mlog.staging.egov.md:8443/register<br><br>**POST data:**<br>[Token JWT semnat - a se vedea documentul pentru exemplul complet]<br><br>**Request Headers:**<br>Connection: keep-alive<br>Content-Type: application/x-www-form-urlencoded<br>Host: mlog.staging.egov.md:8443 | Mesajul de răspuns este recepționat.<br><br>Exemplu:<br>{"status":"200","message":"OK","timestamp":"1480458629464","UID":"c6827ad7-411a-4b06-b615-882a55add0c6"} | Pass / Fail |
| 2 | Utilizatorul caută evenimentul înregistrat.<br><br>Exemplu:<br><br>**GET** https://mlog.staging.egov.md:8443/query/c6827ad7-411a-4b06-b615-882a55add0c6<br><br>**Request Headers:**<br>Connection: close<br>Content-Type: application/json<br>Host: mlog.staging.egov.md:8443 | Răspuns cu detaliile evenimentului, incluzând toate câmpurile | Pass / Fail |

### Caz de test: TC_FUNCT_03

**Descriere:** Verifică înregistrarea cu succes a unui eveniment semnat în sistemul MLog

**Aplicabil pentru:** Orice operațiune REST

**Cerințe:** REQ_FUNCT_XX

**Condiții inițiale:**

1. Sistemul informațional este înregistrat și configurat corect în sistemul MPass. Vă rugăm să contactați administratorii MLog pentru detalii privind acest pas.
2. Sistemul informațional este configurat corect în sistemul MLog. Vă rugăm să contactați administratorii MLog pentru detalii privind acest pas.
3. Utilizatorul generează un mesaj JSON cu detaliile evenimentului. Câmpurile mesajului pot (sau nu) conține câmpuri predefinite – a se vedea Câmpurile predefinite ale evenimentului. Exemplu de mesaj JSON:

```json
{
  "event_type": "3vq86ur.kqrjp2", 
  "event_time": "2016-09-28T17:32:54.883Z", 
  "test": "2pif9jvlqjio32deslck17d66js2h3l"
}
```

**Pași:**

| Pas | Sarcină | Rezultat așteptat | Rezultat efectiv |
|------|------|-----------------|---------------|
| 1 | Utilizatorul trimite mesajul către MLog.<br><br>Exemplu:<br><br>**POST** https://mlog.staging.egov.md:8443/register<br><br>**POST data:**<br>[Mai multe tokenuri JWT semnate - lot de evenimente semnate, a se vedea documentul pentru exemplul complet]<br><br>**Request Headers:**<br>Connection: keep-alive<br>Content-Type: application/x-www-form-urlencoded<br>Host: mlog.staging.egov.md:8443 | Mesajul de răspuns este recepționat.<br><br>Exemplu:<br>{"status":"200","message":"OK","timestamp":"1480458629702","UID":"f45a5dd1-d79d-4b54-bdc0-b4f2560089e8"} | Pass / Fail |
| 2 | Utilizatorul caută evenimentul înregistrat.<br><br>Exemplu:<br><br>**GET** https://mlog.staging.egov.md:8443/query/f45a5dd1-d79d-4b54-bdc0-b4f2560089e8<br><br>**Request Headers:**<br>Connection: close<br>Content-Type: application/json<br>Host: mlog.staging.egov.md:8443 | {"status":"200","message":"OK","timestamp":"1480457563221","result":[{"@uid":"c6827ad7-411a-4b06-b615-882a55add0c6","event_type": "1acuqpn.3fkn5t", "event_time": "2016-11-28T23:30:22.045+02:00", "basis": "19epvmn168s1e015se5q62v0b7fe28i", "reason": "n01j553q2oe312qqjkin2q6pm5v26u9", "message": [mesaj lung], "count": -51341672},{"@uid":"c6827ad7-411a-4b06-b615-882a55add0c6","event_type": "1fd1q74.2le822m", "event_time": "2016-11-28T23:30:22.039+02:00", "basis": "18gen8j1il2utn33kfafi1q00q8113d", "reason": "38ugvupu7eusc38ppp3u3inoboaer5f", "message": [mesaj lung], "count": -1223798338}],"pagination":{"record-count":2,"page-size":50}} | Pass / Fail |

### Caz de test: TC_FUNCT_04

**Descriere:** Verifică succesul căutării cu filtrarea câmpurilor, paginare (page) și dimensiune de pagină (page size)

**Aplicabil pentru:** Orice operațiune REST

**Cerințe:** REQ_FUNCT_XX

**Condiții inițiale:**

1. Sistemul informațional este înregistrat și configurat corect în sistemul MPass. Vă rugăm să contactați administratorii MLog pentru detalii privind acest pas.
2. Sistemul informațional este configurat corect în sistemul MLog. Vă rugăm să contactați administratorii MLog pentru detalii privind acest pas.
3. Utilizatorul generează un mesaj JSON cu detaliile evenimentului. Câmpurile mesajului pot (sau nu) conține câmpuri predefinite – a se vedea Câmpurile predefinite ale evenimentului.

**Pași:**

| Pas | Sarcină | Rezultat așteptat | Rezultat efectiv |
|------|------|-----------------|---------------|
| 1 | Utilizatorul trimite mesajul către MLog.<br><br>**POST** https://mlog.staging.egov.md:8443/register<br><br>**POST data:**<br>{"event_type": "2lulpsq.29a0h82", "event_time": "2016-12-02T14:22:25.752+02:00", "test": "3or2gjm2qr9v7b3a6hbbp8db8093173"} | Mesajul de răspuns este recepționat.<br><br>Exemplu:<br>{"status":"200","message":"OK","timestamp":"1480771346236","UID":"8b4cc54f-6134-441d-821c-bc8d0d092b13"} | Pass / Fail |
| 2 | Utilizatorul caută evenimentul înregistrat cu filtre.<br><br>**GET** https://mlog.staging.egov.md:8443/query?event_time_from=2016-12-02T14:36:23.435&event_time_to=2016-12-02T14:36:27.435&legal_basis=Ca+parte+a+unei+testari&legal_reason=Ca+parte+a+unei+testari&filter=event_type=2c471ut.2ljgn2n,test=3b4glff1kiqe7i147jqas3uocrhl34b&page=0&page_size=3 | Răspuns cu rezultatele filtrate, incluzând informațiile de paginare | Pass / Fail |

## Revizuirea și auditul integrărilor

Nu există cerințe speciale referitoare la revizuirea integrării.
