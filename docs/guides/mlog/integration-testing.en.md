Here are some basic test cases that could be added to the test suite that integrates with MLog and register an event and then search for it.

### Test Case: TC_FUNCT_01

**Description:** Verify the successful registry of an unsigned event in MLog system

**Applicable for:** Any REST operation

**Requirements:** REQ_FUNCT_XX

**Initial conditions:**

1. Informational System is registered and correctly configured in MPass system. Please contact MLog administrators for details on this step.
2. Informational System is correctly configured in MLog system. Please contact MLog administrators for details on this step.
3. User generate a JSON message with the event details. Message fields may (or may not) contain predefined fields – see Predefined event fields. Example of JSON message:

```json
{
  "event_type": "3vq86ur.kqrjp2", 
  "event_time": "2016-09-28T17:32:54.883Z", 
  "test": "2pif9jvlqjio32deslck17d66js2h3l"
}
```

**Steps:**

| Step | Task | Expected Result | Actual Result |
|------|------|-----------------|---------------|
| 1 | User send message to MLog.<br><br>Example:<br><br>**POST** https://mlog.staging.egov.md:8443/register<br><br>**POST data:**<br>{"event_type": "36lj0r2.1p7cpon", "event_time": "2016-11-28T23:12:37.334+02:00", "test": "2pfn147imgrbm3fcbfn3p1pcad3d9l6"}<br><br>**Request Headers:**<br>Connection: keep-alive<br>Content-Type: application/x-www-form-urlencoded<br>Host: mlog.staging.egov.md:8443 | Response message is received.<br><br>Example:<br>{"status":"200","message":"OK","timestamp":"1480457557976","UID":"92c12f00-32a2-4e33-8a7e-4bb7a7d5909a"} | Pass / Fail |
| 2 | User search for registered event.<br><br>Example:<br><br>**GET** https://mlog.staging.egov.md:8443/query/92c12f00-32a2-4e33-8a7e-4bb7a7d5909a<br><br>**Request Headers:**<br>Connection: close<br>Content-Type: application/json<br>Host: mlog.staging.egov.md:8443 | {"status":"200","message":"OK","timestamp":"1480457563221","result":[{"@uid":"92c12f00-32a2-4e33-8a7e-4bb7a7d5909a","event_type":"36lj0r2.1p7cpon","test":"2pfn147imgrbm3fcbfn3p1pcad3d9l6","event_time":"2016-11-28T23:12:37.334"}],"pagination":{"record-count":1,"page-size":50}} | Pass / Fail |

### Test Case: TC_FUNCT_02

**Description:** Verify the successful registry of a signed event in MLog system

**Applicable for:** Any REST operation

**Requirements:** REQ_FUNCT_XX

**Initial Conditions:**

1. Informational System is registered and correctly configured in MPass system. Please contact MLog administrators for details on this step.
2. Informational System is correctly configured in MLog system. Please contact MLog administrators for details on this step.
3. User generate a JSON message with the event details. Message fields may (or may not) contain predefined fields – see Predefined event fields. Example of JSON message:

```json
{
  "event_type": "3vq86ur.kqrjp2", 
  "event_time": "2016-09-28T17:32:54.883Z", 
  "test": "2pif9jvlqjio32deslck17d66js2h3l"
}
```

**Steps:**

| Step | Task | Expected Result | Actual Result |
|------|------|-----------------|---------------|
| 1 | User send message to MLog.<br><br>Example:<br><br>**POST** https://mlog.staging.egov.md:8443/register<br><br>**POST data:**<br>[Signed JWT token - see document for full example]<br><br>**Request Headers:**<br>Connection: keep-alive<br>Content-Type: application/x-www-form-urlencoded<br>Host: mlog.staging.egov.md:8443 | Response message is received.<br><br>Example:<br>{"status":"200","message":"OK","timestamp":"1480458629464","UID":"c6827ad7-411a-4b06-b615-882a55add0c6"} | Pass / Fail |
| 2 | User search for registered event.<br><br>Example:<br><br>**GET** https://mlog.staging.egov.md:8443/query/c6827ad7-411a-4b06-b615-882a55add0c6<br><br>**Request Headers:**<br>Connection: close<br>Content-Type: application/json<br>Host: mlog.staging.egov.md:8443 | Response with event details including all fields | Pass / Fail |

### Test Case: TC_FUNCT_03

**Description:** Verify the successful registry of a signed event in MLog system

**Applicable for:** Any REST operation

**Requirements:** REQ_FUNCT_XX

**Initial Conditions:**

1. Informational System is registered and correctly configured in MPass system. Please contact MLog administrators for details on this step.
2. Informational System is correctly configured in MLog system. Please contact MLog administrators for details on this step.
3. User generate a JSON message with the event details. Message fields may (or may not) contain predefined fields – see Predefined event fields. Example of JSON message:

```json
{
  "event_type": "3vq86ur.kqrjp2", 
  "event_time": "2016-09-28T17:32:54.883Z", 
  "test": "2pif9jvlqjio32deslck17d66js2h3l"
}
```

**Steps:**

| Step | Task | Expected Result | Actual Result |
|------|------|-----------------|---------------|
| 1 | User send message to MLog.<br><br>Example:<br><br>**POST** https://mlog.staging.egov.md:8443/register<br><br>**POST data:**<br>[Multiple signed JWT tokens - batch of signed events, see document for full example]<br><br>**Request Headers:**<br>Connection: keep-alive<br>Content-Type: application/x-www-form-urlencoded<br>Host: mlog.staging.egov.md:8443 | Response message is received.<br><br>Example:<br>{"status":"200","message":"OK","timestamp":"1480458629702","UID":"f45a5dd1-d79d-4b54-bdc0-b4f2560089e8"} | Pass / Fail |
| 2 | User search for registered event.<br><br>Example:<br><br>**GET** https://mlog.staging.egov.md:8443/query/f45a5dd1-d79d-4b54-bdc0-b4f2560089e8<br><br>**Request Headers:**<br>Connection: close<br>Content-Type: application/json<br>Host: mlog.staging.egov.md:8443 | {"status":"200","message":"OK","timestamp":"1480457563221","result":[{"@uid":"c6827ad7-411a-4b06-b615-882a55add0c6","event_type": "1acuqpn.3fkn5t", "event_time": "2016-11-28T23:30:22.045+02:00", "basis": "19epvmn168s1e015se5q62v0b7fe28i", "reason": "n01j553q2oe312qqjkin2q6pm5v26u9", "message": [long message], "count": -51341672},{"@uid":"c6827ad7-411a-4b06-b615-882a55add0c6","event_type": "1fd1q74.2le822m", "event_time": "2016-11-28T23:30:22.039+02:00", "basis": "18gen8j1il2utn33kfafi1q00q8113d", "reason": "38ugvupu7eusc38ppp3u3inoboaer5f", "message": [long message], "count": -1223798338}],"pagination":{"record-count":2,"page-size":50}} | Pass / Fail |

### Test Case: TC_FUNCT_04

**Description:** Verify the successful search with filtering fields, page and page size

**Applicable for:** Any REST operation

**Requirements:** REQ_FUNCT_XX

**Initial conditions:**

1. Informational System is registered and correctly configured in MPass system. Please contact MLog administrators for details on this step.
2. Informational System is correctly configured in MLog system. Please contact MLog administrators for details on this step.
3. User generate a JSON message with the event details. Message fields may (or may not) contain predefined fields – see Predefined event fields.

**Steps:**

| Step | Task | Expected Result | Actual Result |
|------|------|-----------------|---------------|
| 1 | User send message to MLog.<br><br>**POST** https://mlog.staging.egov.md:8443/register<br><br>**POST data:**<br>{"event_type": "2lulpsq.29a0h82", "event_time": "2016-12-02T14:22:25.752+02:00", "test": "3or2gjm2qr9v7b3a6hbbp8db8093173"} | Response message is received.<br><br>Example:<br>{"status":"200","message":"OK","timestamp":"1480771346236","UID":"8b4cc54f-6134-441d-821c-bc8d0d092b13"} | Pass / Fail |
| 2 | User search for registered event with filters.<br><br>**GET** https://mlog.staging.egov.md:8443/query?event_time_from=2016-12-02T14:36:23.435&event_time_to=2016-12-02T14:36:27.435&legal_basis=Ca+parte+a+unei+testari&legal_reason=Ca+parte+a+unei+testari&filter=event_type=2c471ut.2ljgn2n,test=3b4glff1kiqe7i147jqas3uocrhl34b&page=0&page_size=3 | Response with filtered results including pagination info | Pass / Fail |

## Integrations review and audit

There are no special requirements related to integration review.
