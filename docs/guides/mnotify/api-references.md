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

<table>
  <tr>
    <td><strong>Signature</strong></td>
    <td colspan="2"><strong>GET /api/Notifications/</strong></td>
  </tr>
  <tr>
    <td><strong>Description</strong></td>
    <td colspan="2">Shows all the notifications transmitted by a sender.</td>
  </tr>
  <tr>
    <td><strong>Returns</strong></td>
    <td colspan="2">Shows all the notifications transmitted by a sender: <code>notificationId</code> and <code>notificationStatus</code>.</td>
  </tr>
  <tr>
    <td colspan="3"><strong>Input Parameters</strong></td>
  </tr>
  <tr>
    <td>Name</strong></td>
    <td>Type</strong></td>
    <td>Description</th>
  </tr>
  <tr>
    <td>request</td>
    <td>NotificationRequest</td>
    <td>A structure representing the notification request.</td>
  </tr>
  <tr>
    <td colspan="3"><strong>Faults</strong></td>
  </tr>
  <tr>
    <td colspan="2"><strong>Code</strong></td>
    <td><strong>Reason</strong></td>
  </tr>
  <tr>
    <td colspan="2">200</td>
    <td>Success</td>
  </tr>
  <tr>
    <td colspan="2">500</td>
    <td>A server error occurred.</td>
  </tr>
  <tr>
    <td colspan="2">501</td>
    <td>A server error occurred.</td>
  </tr>
</table>

<table>
  <tr>
    <td><strong>Signature</strong></td>
    <td colspan="2"><strong>GET | /api/Notification/{id}</strong> <i>(id-string)</i></td>
  </tr>
  <tr>
    <td><strong>Description</strong></td>
    <td colspan="2">Returns the ID of the messages generated based on the respective notification, including message status and the channel used for transmission.</td>
  </tr>
  <tr>
    <td><strong>Returns</strong></td>
    <td colspan="2">Returns the ID of the messages generated based on the respective notification, including message status and the channel used for transmission.</td>
  </tr>
  <tr>
    <td colspan="3">Input parameters</td>
  </tr>
  <tr>
    <td><strong>Name</strong></td>
    <td><strong>Type</strong></td>
    <td><strong>Description</strong></td>
  </tr>
  <tr>
    <td>notificationID</td>
    <td>String</td>
    <td>The ID of the notification posted earlier using PostNotification.</td>
  </tr>
  <tr>
    <td colspan="3"><strong>Faults</strong></th>
  </tr>
  <tr>
    <td colspan="2">Code</th>
    <td>Reason</th>
  </tr>
  <tr>
    <td colspan="2">200</td>
    <td>Success</td>
  </tr>
  <tr>
    <td colspan="2">404</td>
    <td>Not found.</td>
  </tr>
  <tr>
    <td colspan="2">500</td>
    <td>A server error occurred.</td>
  </tr>
  <tr>
    <td colspan="2">501</td>
    <td>A server error occurred.</td>
  </tr>
</table>

<table>
        <tr>
            <td><strong>Signature</strong></td>
            <td colspan="2"><strong>POST/api/Notification</strong> <em>(subject - string, body - string, bodyshort – string, recipients [value - string, type - string], priority - string)</em></td>
        </tr>
        <tr>
            <td><strong>Description</strong></td>
            <td colspan="2">Notification transmission metdod.</td>
        </tr>
        <tr>
            <td><strong>Returns</strong></td>
            <td colspan="2">notificationID</td>
        </tr>
        <tr>
            <td colspan="3"><strong>Input parameters</strong></td>
        </tr>
        <tr>
            <td>Name</td>
            <td>Type</td>
            <td>Description</td>
        </tr>
        <tr>
            <td style="color:red;">userId</td>
            <td style="color:red;">String</td>
            <td style="color:red;">tdis parameter should be ignored</td>
        </tr>
        <tr>
            <td>subject</td>
            <td>String</td>
            <td>tde notification subject</td>
        </tr>
        <tr>
            <td>Body</td>
            <td>String</td>
            <td>tde notification body</td>
        </tr>
        <tr>
            <td>Bodyshort</td>
            <td>String</td>
            <td>tde notification bodyshort</td>
        </tr>
        <tr>
            <td>recipients</td>
            <td>String</td>
            <td>tde person who will receive tde message.</td>
        </tr>
        <tr>
            <td>Priority</td>
            <td>String</td>
            <td>tde priority witd which tde notification will be transmitted</td>
        </tr>
        <tr>
            <td>template</td>
            <td>String</td>
            <td><em>Not Mandatory</em><br>tde notification template</td>
        </tr>
        <tr>
            <td>resolutionPolicy</td>
            <td>String</td>
            <td><em>Not Mandatory</em><br>IDR Identity Resolver parameter (ex: IDNO, IDNV, cadastral number), for cases when recipient IDNP is not known.</td>
        </tr>
        <tr>
            <td>attachments</td>
            <td>String</td>
            <td><em>Not Mandatory</em><br>Base 64 format attachments.</td>
        </tr>
        <tr>
            <td colspan="3" style="text-align:left;"><strong>Faults</strong></td>
        </tr>
        <tr>
            <td colspan="2">Code</td>
            <td>Reason</td>
        </tr>
        <tr>
            <td colspan="2">200</td>
            <td>Success</td>
        </tr>
        <tr>
            <td colspan="2">404</td>
            <td>Not found.</td>
        </tr>
        <tr>
            <td colspan="2">500</td>
            <td>A server error occurred.</td>
        </tr>
        <tr>
            <td colspan="2">501</td>
            <td>A server error occurred.</td>
        </tr>
</table>

<table>
    <tr>
        <td><strong>Signature</strong></td>
        <td colspan="2"><strong>DELETE /api/Notification/{id}</strong> <em>(subject - string, body - string, bodyshort – string, recipients [value - string, type - string], priority - string)</em></td>
    </tr>
    <tr>
        <<td><strong>Description</strong></td>
        <<td colspan="2">Delete notification if it has not been transmitted</td>
    </tr>
    <tr>
        <td><strong>Returns</strong></td>
        <td colspan="2">notificationID</td>
    </tr>
    <tr>
        <td colspan="3" ><strong>Input parameters</strong></td>
    </tr>
    <tr>
        <td>Name</td>
        <td>Type</td>
        <td>Description</td>
    </tr>
    <tr>
        <td>NotificationID</td>
        <td>String</td>
        <td>NotificationID which is to be deleted</td>
    </tr>
    <tr>
        <td colspan="3"><strong>Faults</strong></td>
    </tr>
    <tr>
        <td colspan="2">Code</td>
        <td>Reason</td>
    </tr>
    <tr>
        <td colspan="2">200</td>
        <td>Succes</td>
    </tr>
    <tr>
        <td colspan="2">404</td>
        <td>Not found.</td>
    </tr>
    <tr>
        <td colspan="2">500</td>
        <td>A server error occurred.</td>
    </tr>
    <tr>
        <td colspan="2">501</td>
        <td>A server error occurred.</td>
    </tr>
</table>
