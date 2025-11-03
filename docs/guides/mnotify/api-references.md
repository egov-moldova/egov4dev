## Error handling rules

For errors resulted for SOAP interface invocations, MNotify returns SOAP faults with fault codes and fault reasons describing the fault in plain English. If there is no SOAP fault returned, MNotify guarantees that the notification was persisted for later delivery.

| Fault Code | Description |
|----------|----------|
| AuthenticationFailed  | Service consumer authentication process failed. See Authentication |
| InvalidParameter | Some input parameter is invalid. Please review the returned Fault Reason text and called operation description. |
| 200	| Success |
| 400	| Bad request, Validation failed. Check validation rules compliance |
| 401	| Unauthorized Access. Check authorisation requirements |
| 403	| Forbidden. The requested action is not allowed for the transmitted ID |
| 404	| Not found.  Check sent request data |
| 500	| A server error occurred. missing connection with DB from other reasons than: 400 / 401 / 501. Contact the Administrator. |
| 501	| A server error occurred. Contact the Administrator. |

For the consumers using programming languages that support try… catch blocks, catching framework specific SOAP Fault exceptions is the correct way to handle service invocation errors.

## Service operations

| Signature	GET | /api/Notifications/ |
| Description	| shows all the notifications transmitted by a sender. |
| Returns | shows all the notifications transmitted by a sender : notificationId and notificationstatus |
| Input parameters |
| Name | Type | Description |
| request	NotificationRequest	A structure representing the notification request. |
| Faults |
| Code | Reason |
| 200 | Success |
| 500 | A server error occurred. |
| 501 | A server error occurred. |
