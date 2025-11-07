## Event Messages

We will present here samples of REST events.

### Simple JSON Event

**Request:**

```
POST https://mlog.staging.egov.md:8443/register

POST data:
{"event_type": "36lj0r2.1p7cpon", "event_time": "2016-11-28T23:12:37.334+02:00", 
"test": "2pfn147imgrbm3fcbfn3p1pcad3d9l6"}

[no cookies]

Request Headers:
Connection: keep-alive
Content-Type: application/json
Content-Length: 123
Host: mlog.staging.egov.md:8443
User-Agent: Apache-HttpClient/4.2.3 (java 1.5)
```

**Response:**

```json
{"status":"200","message":"OK","timestamp":"1480457557976","UID":"92c12f00-32a2-4e33-8a7e-4bb7a7d5909a"}
```

### Signed JSON Message

**Request:**

```
POST https://mlog.staging.egov.md:8443/register

POST data:
eyJhbGciOiJSUzI1NiJ9.eyJldmVudF90eXBlIjogIjFyZ2w3NmouM2M1Nm0wMSIsICJldm
VudF90aW1lIjogIjIwMTYtMTEtMjhUMjM6MzA6MjIuMDMwKzAyOjAwIiwgImJhc2lzIjog
IjExdGs0YTI1b2V1YnYxNDlyYXIwMmVuNW9qMm1nN2kiLCAicmVhc29uIjogIjE2Z3J0Y
TdyNDRobjcxZHZiMGtpMnY2OGdndDFnYXEiLCAibWVzc2FnZSI6ICIya21xNmlwMWl0a
W40ODN1aGV1NXBoZDZlZm82ZmpzaGIxaW40N3ZzMzFvNnE0MTFoaXE4NGQycGI4
YjFqM2ltNW1zcDJlZDJpdGYyanVpcXZ1NmNuaXNoY2lhc250MXNiNjZtNHFtYm5odGg
2N2NlMTRsOXVraDN0bDI2MmYzdDV2bnZwMTR2dmMxbWVtcGl2czJtbzRpYTN2OD
dpYWQxcmp2djhuMm9oZTZlZDN2Y2hoZDczZGQ1NGxxM2xrY2VlbzdmaGtzZTJqN2R
sMXIyNTBhcmtvMzA3azBkNzFjdThmdmoydnBxc240MW5yY2pkdTF1dGU3dnRycDNq
ZiIsICJjb3VudCI6IC0xMjc2ODI0MDI5fQ.X1I6TBRZprRiEy5FVtdc_hR09AyMGdXaZt_Wgq
QLE6D_2yhSLDuMqJAOrEelnnaLuzMlkbrersqSIQsLBC5tIVwH953HtbueY22oAnzTV8JxEnfU6gFN8GKYYS1JSJ
CKsX4f_WPYeRFK079uniUJLrChpbCE4P64Qwmhg9C7SBbFe7_KMhQMuh3DUyqhXjPqJVJ
yGMv59SqcfEymkNIMQyaEl2xkCEF6541L_6x9NIyXfAHVW9bmOpxo6bHU74PqYhLoEa
kmInDrPy1XT5RGYDj_u2DChQKvOI9xhPu4oKswy5Yky5et0cdgHXHwCdojlV5YzXUyJdP
_Y-khktEw

[no cookies]

Request Headers:
Connection: keep-alive
Content-Type: application/x-www-form-urlencoded
Content-Length: 978
Host: mlog.staging.egov.md:8443
User-Agent: Apache-HttpClient/4.2.3 (java 1.5)
```

**Response:**

```json
{"status":"200","message":"OK","timestamp":"1480458629464","UID":"c6827ad7-411a-4b06-b615-882a55add0c6"}
```

### Multi Signed, Multi-Line

**Request:**

```
POST https://mlog.staging.egov.md:8443/register

POST data:
eyJhbGciOiJSUzI1NiJ9.eyJldmVudF90eXBlIjogImlsbWIyNS4zbGxhMXA5IiwgImV2ZW5
0X3RpbWUiOiAiMjAxNi0xMS0yOFQyMzozMDoyMi4wNTgrMDI6MDAiLCAidGVzdCI6I
CIzaWloMjUwMnB2YmdrNGpoc2x1NTJyYW52cGIxNnVmIn0KeyJldmVudF90eXBlIjogIn
Zxbms3My4xbmxhaXBtIiwgImV2ZW50X3RpbWUiOiAiMjAxNi0xMS0yOFQyMzozMDo
yMi4wNTgrMDI6MDAiLCAidGVzdCI6ICJsZXUxOHUzMG0yMXVpMWU5czFzdTFqM2M
4NGh2OXYwIn0.ioPcA7OsncysV8AtiDTTvKEeD8eOSRfhILl4Lp4fkzpijIcrJLyGnxJwjN7RrF
7XBKUK3RuY3W3I8tYOwvkixtbdDdgt1moS9VUYm84HO0qpng84DBabqzqOnMC0aN2zNaEz
gdouAHbJnGAT44EIloUSa7pwULhRs5C0cXwBz4qAWp5mr4RPvsCJd7QcKGww70AKn0y5RBBrflxZKKByVVguiyvf-JbdZLqw1RroeIBNfREs1bcgOaUamKYdblFiRQs7vcZnDxWrjRSaB-sC6rbfB_Jsl64Gb0sEpCTWLDu6j8Yx1QpMK9VpQYEGgKObYa0OIxSBNq4RIpx-5w

eyJhbGciOiJSUzI1NiJ9.eyJldmVudF90eXBlIjogIjJmbmwxYi4zM2NuaHQ3IiwgImV2ZW5
0X3RpbWUiOiAiMjAxNi0xMS0yOFQyMzozMDoyMi4wNjYrMDI6MDAiLCAiYmFzaXMiO
iAiM2VvbjFhODNiMXZnbnQzNTY2NmFjMXRoNjR1MTNqbCIsICJyZWFzb24iOiAiYnBn
[... additional signed events ...]

[no cookies]

Request Headers:
Connection: keep-alive
Content-Type: application/x-www-form-urlencoded
Content-Length: 2646
Host: mlog.staging.egov.md:8443
User-Agent: Apache-HttpClient/4.2.3 (java 1.5)
```

**Response:**

```json
{"status":"200","message":"OK","timestamp":"1480458630189","UID":"e7f8f544-ab11-419b-bda3-d438755e2a63"}
```

### Mix of Plain, Multi-signed and Multi-Line Signed

**Request:**

```
POST https://mlog.staging.egov.md:8443/register

POST data:
eyJhbGciOiJSUzI1NiJ9.eyJldmVudF90eXBlIjogImlsbWIyNS4zbGxhMXA5IiwgImV2ZW50X3RpbWUiOi
AiMjAxNi0xMS0yOFQyMzozMDoyMi4wNTgrMDI6MDAiLCAidGVzdCI6ICIzaWloMjUwMnB2YmdrNGpoc2x1N
TJyYW52cGIxNnVmIn0KeyJldmVudF90eXBlIjogInZxbms3My4xbmxhaXBtIiwgImV2ZW50X3RpbWUiOiAi
MjAxNi0xMS0yOFQyMzozMDoyMi4wNTgrMDI6MDAiLCAidGVzdCI6ICJsZXUxOHUzMG0yMXVpMWU5czFzdTF
qM2M4NGh2OXYwIn0.ioPcA7OsncysV8AtiDTTvKEeD8eOSRfhILl4Lp4fkzpijIcrJLyGnxJwjN7RrF7XBK
UK3RuY3W3I8tYOwvkixtbdDdgt1moS9VUYm84HO0qpng84DBabqzqOnMC0aN2zNaEzgdouAHbJnGAT44EIlo
US-a7pwULhRs5C0cXwBz4qAWp5mr4RPvsCJd7QcKGww70AKn0y5RBBrflxZKKByVVg-uiyvfJbdZLqw1RroeIBNfREs1bcgOaUamKYdblFiRQs7vcZnDxWrjRSaB-sC6rbfB_Jsl64Gb0sEpCTWLDu6j8Yx1QpMK9VpQYEGgKObYa0OIxSBNq4RIpx-5w

eyJhbGciOiJSUzI1NiJ9.eyJldmVudF90eXBlIjogIm9ic3AxcC4zdHZtZWd2IiwgImV2ZW50X3RpbWUiOi
[... more signed events ...]

{"event_type": "pqi8la.1p72h8i", "event_time": "2016-11-28T23:30:22.089+02:00", 
"test": "22uh0e21r3jh8k1s84ssb3rr0ufp1s1"}

eyJhbGciOiJSUzI1NiJ9.eyJldmVudF90eXBlIjogIjNzdHZqN2UuMmNnZ2ZpbCIsICJldmVudF90aW1lIj
[... more signed events ...]

{"event_type": "3mk5cmi.3pi1ttn", "event_time": "2016-11-28T23:30:22.096+02:00", 
"test": "jfajula7g76s26gn7hb68tcfp11okh7"}

[no cookies]

Request Headers:
Connection: keep-alive
Content-Type: application/x-www-form-urlencoded
Content-Length: 2892
Host: mlog.staging.egov.md:8443
User-Agent: Apache-HttpClient/4.2.3 (java 1.5)
```

**Response:**

```json
{"status":"200","message":"OK","timestamp":"1480458630189","UID":"e7f8f544-ab11-419b-bda3-d438755e2a63"}
```

### Search by UID parameter

**Request:**

```
GET https://mlog.staging.egov.md:8443/query/aa8657a6-e0ec-42b6-b212-2b1a76935445

[no cookies]

Request Headers:
Connection: close
Content-Type: application/json
Host: mlog.staging.egov.md:8443
User-Agent: Apache-HttpClient/4.2.3 (java 1.5)
```

**Response:**

```json
{"status":"200","message":"OK","timestamp":"1480457580058","result":[{"@uid":"aa8657a6-e0ec-42b6-b212-2b1a76935445","event_type":"36lj0r2.1p7cpon","test":"2pfn147imgrbm3fcbfn3p1pcad3d9l6","event_time":"2016-11-28T23:12:37.334"}],"pagination":{"record-count":1,"page-size":50}}
```

### Search by event_time_from, event_time_to, legal_basis Fields

**Request:**

```
GET https://mlog.staging.egov.md:8443/query?event_time_from=2016-11-28T23:12:35.334&event_time_to=2016-11-28T23:12:39.334&legal_basis=Ca+parte+a+unei+testari

[no cookies]

Request Headers:
Connection: close
Content-Type: application/json
Host: mlog.staging.egov.md:8443
User-Agent: Apache-HttpClient/4.2.3 (java 1.5)
```

**Response:**

```json
{"status":"200","message":"OK","timestamp":"1480457591047","result":[{"@uid":"92c12f00-32a2-4e33-8a7e-4bb7a7d5909a","event_type":"36lj0r2.1p7cpon","test":"2pfn147imgrbm3fcbfn3p1pcad3d9l6","event_time":"2016-11-28T23:12:37.334"},{"@uid":"32936c25-8fc3-4276-8c91-791eec122172","event_type":"36lj0r2.1p7cpon","test":"2pfn147imgrbm3fcbfn3p1pcad3d9l6","event_time":"2016-11-28T23:12:37.334"},{"@uid":"73dbb0b3-528f-4531-bc6a-e1ddc123e928","event_type":"36lj0r2.1p7cpon","test":"2pfn147imgrbm3fcbfn3p1pcad3d9l6","event_time":"2016-11-28T23:12:37.334"},{"@uid":"1387290c-5831-4178-89c3-90b0d4c9fd43","event_type":"36lj0r2.1p7cpon","test":"2pfn147imgrbm3fcbfn3p1pcad3d9l6","event_time":"2016-11-28T23:12:37.334"},{"@uid":"aa8657a6-e0ec-42b6-b212-2b1a76935445","event_type":"36lj0r2.1p7cpon","test":"2pfn147imgrbm3fcbfn3p1pcad3d9l6","event_time":"2016-11-28T23:12:37.334"},{"@uid":"e7052d5e-54df-4924-a8eb-c4d526f5d13f","event_type":"36lj0r2.1p7cpon","test":"2pfn147imgrbm3fcbfn3p1pcad3d9l6","event_time":"2016-11-28T23:12:37.334"}],"pagination":{"record-count":6,"page-size":50}}
```

### Search by event_time_from, event_time_to, legal_basis, legal_reason, page, page_size Fields

**Request:**

```
GET https://mlog.staging.egov.md:8443/query?event_time_from=2016-11-28T23:12:35.334&event_time_to=2016-11-28T23:12:39.334&legal_basis=Ca+parte+a+unei+testari&legal_reason=Testam+campul+reason&page=0&page_size=3

[no cookies]

Request Headers:
Connection: close
Content-Type: application/json
Host: mlog.staging.egov.md:8443
User-Agent: Apache-HttpClient/4.2.3 (java 1.5)
```

**Response:**

```json
{"status":"200","message":"OK","timestamp":"1480457607344","result":[{"@uid":"92c12f00-32a2-4e33-8a7e-4bb7a7d5909a","event_type":"36lj0r2.1p7cpon","test":"2pfn147imgrbm3fcbfn3p1pcad3d9l6","event_time":"2016-11-28T23:12:37.334"},{"@uid":"32936c25-8fc3-4276-8c91-791eec122172","event_type":"36lj0r2.1p7cpon","test":"2pfn147imgrbm3fcbfn3p1pcad3d9l6","event_time":"2016-11-28T23:12:37.334"},{"@uid":"06a475d2-d68c-4ad1-88e8-85cf566f95fa","event_type":"36lj0r2.1p7cpon","test":"2pfn147imgrbm3fcbfn3p1pcad3d9l6","event_time":"2016-11-28T23:12:37.334"}],"pagination":{"record-count":9,"page-size":3}}
```

### Search by event_time_from, event_time_to, legal_basis, legal_reason, filter, page, page_size

**Request:**

```
GET https://mlog.staging.egov.md:8443/query?event_time_from=2016-11-28T23:13:39.019&event_time_to=2016-11-28T23:13:43.019&legal_basis=Ca+parte+a+unei+testari&filter=event_type=23t049v.m3brms,test=fjm2vd1eflo9mj502l93b3blk9qrme4&page=0&page_size=3

[no cookies]

Request Headers:
Connection: close
Content-Type: application/json
Host: mlog.staging.egov.md:8443
User-Agent: Apache-HttpClient/4.2.3 (java 1.5)
```

**Response:**

```json
{"status":"200","message":"OK","timestamp":"1480457607344","result":[{"@uid":"92c12f00-32a2-4e33-8a7e-4bb7a7d5909a","event_type":"323t049v.m3brms","test":"fjm2vd1eflo9mj502l93b3blk9qrme4","event_time":"2016-11-28T23:12:37.334"}],"pagination":{"record-count":1,"page-size":1}}
```
