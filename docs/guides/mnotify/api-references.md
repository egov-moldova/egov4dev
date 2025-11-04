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

## Structures

<table>
    <tr>
        <th><strong>Member</strong></th>
        <th>Type</th>
        <th>Required/Optional</th>
        <th>Description</th>
    </tr>
    <tr>
        <td colspan="4"><strong>Notification</strong></td>
    </tr>
    <tr>
        <td><strong>ID</strong></td>
        <td>uniqueidentifier</td>
        <td>Required</td>
        <td>NotificationID</td>
    </tr>
    <tr>
        <td><strong>SenderID</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>Certificate Serial Number</td>
    </tr>
    <tr>
        <td><strong>Subjectro</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>Notification subject in Romanian</td>
    </tr>
    <tr>
        <td><strong>subjecten</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>Notification subject in English</td>
    </tr>
    <tr>
        <td><strong>subjectru</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>Notification subject in Russian</td>
    </tr>
    <tr>
        <td><strong>bodyro</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>Notification body in Romanian</td>
    </tr>
    <tr>
        <td><strong>bodyen</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>Notification body in English</td>
    </tr>
    <tr>
        <td><strong>bodyru</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>Notification body in Russian</td>
    </tr>
    <tr>
        <td><strong>bodyshortro</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>Notification body short in Romanian</td>
    </tr>
    <tr>
        <td><strong>bodyshorten</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>Notification body short in English</td>
    </tr>
    <tr>
        <td><strong>bodyshortru</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>Notification body short in Russian</td>
    </tr>
    <tr>
        <td><strong>statusid</strong></td>
        <td>int</td>
        <td>Required</td>
        <td>Notification status</td>
    </tr>
    <tr>
        <td><strong>senderIDNO</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>sender idno</td>
    </tr>
    <tr>
        <td><strong>servicename</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>service name</td>
    </tr>
    <tr>
        <td><strong>createdat</strong></td>
        <td>datetime2 (7)</td>
        <td>Required</td>
        <td>the date the record was created</td>
    </tr>
    <tr>
        <td><strong>lastupdatedat</strong></td>
        <td>datetime2 (7)</td>
        <td>Required</td>
        <td>the last time the record was changed</td>
    </tr>
    <tr>
        <td><strong>createdby</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>who created the record</td>
    </tr>
    <tr>
        <td><strong>lastupdateby</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>the last to change the record</td>
    </tr>
    <tr>
        <td colspan="4"><strong>Recipient</strong></td>
    </tr>
    <tr>
        <td><strong>ID</strong></td>
        <td>int</td>
        <td>Required</td>
        <td>order id</td>
    </tr>
    <tr>
        <td><strong>firstname</strong></td>
        <td>string (50)</td>
        <td>Required</td>
        <td>recipient first name</td>
    </tr>
    <tr>
        <td><strong>lastname</strong></td>
        <td>string (50)</td>
        <td>Required</td>
        <td>recipient last name</td>
    </tr>
    <tr>
        <td><strong>Idnp</strong></td>
        <td>string (50)</td>
        <td>Required</td>
        <td>RM citizen personal identity number, containing 13 figures.</td>
    </tr>
    <tr>
        <td><strong>languageid</strong></td>
        <td>int</td>
        <td>Required</td>
        <td>notification language set by recipient as preferences</td>
    </tr>
    <tr>
        <td><strong>createdat</strong></td>
        <td>datetime2 (7)</td>
        <td>Required</td>
        <td>the date the record was created</td>
    </tr>
    <tr>
        <td><strong>lastupdateat</strong></td>
        <td>datetime2 (7)</td>
        <td>Required</td>
        <td>the last time the record was changed</td>
    </tr>
    <tr>
        <td><strong>createdby</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>who created the record</td>
    </tr>
    <tr>
        <td><strong>lastupdateby</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>the last to change the record</td>
    </tr>
    <tr>
        <td colspan="4"><strong>Language</strong></td>
    </tr>
    <tr>
        <td><strong>ID</strong></td>
        <td>int</td>
        <td>Required</td>
        <td>order id</td>
    </tr>
    <tr>
        <td><strong>Name</strong></td>
        <td>string (450)</td>
        <td>Optional</td>
        <td>language name</td>
    </tr>
    <tr>
        <td colspan="4"><strong>NotificationMessage</strong></td>
    </tr>
    <tr>
        <td><strong>ID</strong></td>
        <td>uniqueidentifier</td>
        <td>Required</td>
        <td>order id</td>
    </tr>
    <tr>
        <td><strong>NotificationID</strong></td>
        <td>uniqueidentifier</td>
        <td>Required</td>
        <td>notification id</td>
    </tr>
    <tr>
        <td><strong>recipientID</strong></td>
        <td>int</td>
        <td>Required</td>
        <td>recipient id</td>
    </tr>
    <tr>
        <td><strong>Contact</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>contact value</td>
    </tr>
    <tr>
        <td><strong>Channel</strong></td>
        <td>int</td>
        <td>Required</td>
        <td>channel id</td>
    </tr>
    <tr>
        <td><strong>Status</strong></td>
        <td>int</td>
        <td>Required</td>
        <td>status id</td>
    </tr>
    <tr>
        <td><strong>subject</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>message subject</td>
    </tr>
    <tr>
        <td><strong>Body</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>message body</td>
    </tr>
    <tr>
        <td><strong>createdat</strong></td>
        <td>datetime2 (7)</td>
        <td>Required</td>
        <td>the date the record was created</td>
    </tr>
    <tr>
        <td><strong>lastupdateat</strong></td>
        <td>datetime2 (7)</td>
        <td>Required</td>
        <td>the last time the record was changed</td>
    </tr>
    <tr>
        <td><strong>createdby</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>who created the record</td>
    </tr>
    <tr>
        <td><strong>lastupdateby</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>the last to change the record</td>
    </tr>
    <tr>
        <td colspan="4"><strong>NotificationRecipientIdentifier</strong></td>
    </tr>
    <tr>
        <td><strong>notificationID</strong></td>
        <td>uniqueidentifier</td>
        <td>Required</td>
        <td>notification id</td>
    </tr>
    <tr>
        <td><strong>RecipientIdentifier</strong></td>
        <td>string (450)</td>
        <td>Required</td>
        <td>recipient identifier</td>
    </tr>
    <tr>
        <td><strong>IdentifierTypeid</strong></td>
        <td>int</td>
        <td>Required</td>
        <td>identifier type id</td>
    </tr>
    <tr>
        <td colspan="4"><strong>Contact</strong></td>
    </tr>
    <tr>
        <td><strong>Id</strong></td>
        <td>int</td>
        <td>Required</td>
        <td>order id</td>
    </tr>
    <tr>
        <td><strong>value</strong></td>
        <td>string (max)</td>
        <td>Required</td>
        <td>contact value</td>
    </tr>
    <tr>
        <td><strong>recipientid</strong></td>
        <td>int</td>
        <td>Required</td>
        <td>recipient id</td>
    </tr>
    <tr>
        <td><strong>channelid</strong></td>
        <td>int</td>
        <td>Required</td>
        <td>channel id</td>
    </tr>
    <tr>
        <td><strong>active</strong></td>
        <td>bit</td>
        <td>Required</td>
        <td>true/false</td>
    </tr>
    <tr>
        <td><strong>verified</strong></td>
        <td>bit</td>
        <td>Required</td>
        <td>true/false</td>
    </tr>
    <tr>
        <td><strong>timerules</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>preferences</td>
    </tr>
    <tr>
        <td><strong>tagID</strong></td>
        <td>int</td>
        <td>Optional</td>
        <td>tag id</td>
    </tr>
    <tr>
        <td><strong>createdat</strong></td>
        <td>datetime2 (7)</td>
        <td>Required</td>
        <td>the date the record was created</td>
    </tr>
    <tr>
        <td><strong>lastupdateat</strong></td>
        <td>datetime2 (7)</td>
        <td>Required</td>
        <td>the last time the record was changed</td>
    </tr>
    <tr>
        <td><strong>createdby</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>who created the record</td>
    </tr>
    <tr>
        <td><strong>lastupdateby</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>the last to change the record</td>
    </tr>
    <tr>
        <th colspan="4">ContactToken</th>
    </tr>
    <tr>
        <td><strong>Id</strong></td>
        <td>int</td>
        <td>Required</td>
        <td>order id</td>
    </tr>
    <tr>
        <td><strong>contactid</strong></td>
        <td>int</td>
        <td>Required</td>
        <td>contact id</td>
    </tr>
    <tr>
        <td><strong>Token</strong></td>
        <td>string (max)</td>
        <td>Required</td>
        <td>token for activation mail contact</td>
    </tr>
    <tr>
        <td><strong>expireat</strong></td>
        <td>datetime2 (7)</td>
        <td>Required</td>
        <td>Expiration date, time</td>
    </tr>
    <tr>
        <th colspan="4">Channel</th>
    </tr>
    <tr>
        <td><strong>Id</strong></td>
        <td>int</td>
        <td>Required</td>
        <td>order id</td>
    </tr>
    <tr>
        <td><strong>Name</strong></td>
        <td>string</td>
        <td>Required</td>
        <td>channel name</td>
    </tr>
    <tr>
        <th colspan="4">NotificationStatus</th>
    </tr>
    <tr>
        <td><strong>Id</strong></td>
        <td>int</td>
        <td>Required</td>
        <td>order id</td>
    </tr>
    <tr>
        <td><strong>Name</strong></td>
        <td>string (450)</td>
        <td>Optional</td>
        <td>notification status name</td>
    </tr>
    <tr>
        <th colspan="4">IdentifierType</th>
    </tr>
    <tr>
        <td><strong>Id</strong></td>
        <td>int</td>
        <td>Required</td>
        <td>order id</td>
    </tr>
    <tr>
        <td><strong>Name</strong></td>
        <td>string (450)</td>
        <td>Optional</td>
        <td>identifier type name</td>
    </tr>
    <tr>
        <th colspan="4"">NotificationCancel</th>
    </tr>
    <tr>
        <td><strong>Id</strong></td>
        <td>uniqueidentifier</td>
        <td>Required</td>
        <td>notification id</td>
    </tr>
    <tr>
        <th colspan="4">MessageSchedule</th>
    </tr>
    <tr>
        <td><strong>Id</strong></td>
        <td>uniqueidentifier</td>
        <td>Required</td>
        <td>order id</td>
    </tr>
    <tr>
        <td><strong>contact</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>contact value</td>
    </tr>
    <tr>
        <td><strong>channel</strong></td>
        <td>int</td>
        <td>Required</td>
        <td>channel id</td>
    </tr>
    <tr>
        <td><strong>subject</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>message subject</td>
    </tr>
    <tr>
        <td><strong>Body</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>message body</td>
    </tr>
      <tr>
        <td><strong>nextoccurrence</strong></td>
        <td>smalldatetime</td>
        <td>Required</td>
        <td>Date time</td>
    </tr>
      <tr>
        <td><strong>createdat</strong></td>
        <td>datetime2 (7)</td>
        <td>Required</td>
        <td>mthe date the record was created</td>
    </tr>
    <tr>
        <td><strong>lastupdateat</strong></td>
        <td>datetime2 (7)</td>
        <td>Required</td>
        <td>the last time the record was changed</td>
    </tr>
    <tr>
        <td><strong>createdby</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>who created the record</td>
    </tr>
    <tr>
        <td><strong>lastupdateby</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>the last to change the record</td>
    </tr>
    <tr>
        <th colspan="4">Tag</th>
    </tr>
    <tr>
        <td><strong>Id</strong></td>
        <td>int</td>
        <td>Required</td>
        <td>order id</td>
    </tr>
    <tr>
        <td><strong>Name</strong></td>
        <td>string (max)</td>
        <td>Required</td>
        <td>tag name</td>
    </tr>
    <tr>
        <td><strong>createdat</strong></td>
        <td>datetime2 (7)</td>
        <td>Required</td>
        <td>the date the record was created</td>
    </tr>
    <tr>
        <td><strong>lastupdateat</strong></td>
        <td>datetime2 (7)</td>
        <td>Required</td>
        <td>the last time the record was changed</td>
    </tr>
    <tr>
        <td><strong>createdby</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>who created the record</td>
    </tr>
    <tr>
        <td><strong>lastupdateby</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>the last to change the record</td>
    </tr>
    <tr>
        <th colspan="4">Message.dbo.mcabinet</th>
    </tr>
    <tr>
        <td><strong>messageid</strong></td>
        <td>uniqueidentifier</td>
        <td>Required</td>
        <td>message id</td>
    </tr>
    <tr>
        <td><strong>contact</strong></td>
        <td>string</td>
        <td>Required</td>
        <td>contact value</td>
    </tr>
    <tr>
        <td><strong>subject</strong></td>
        <td>string</td>
        <td>Required</td>
        <td>message subject</td>
    </tr>
    <tr>
        <td><strong>Body</strong></td>
        <td>string</td>
        <td>Required</td>
        <td>body subject</td>
    </tr>
    <tr>
        <td><strong>Read</strong></td>
        <td>bit</td>
        <td>Required</td>
        <td>true/false</td>
    </tr>
    <tr>
        <td><strong>createdat</strong></td>
        <td>datetime2 (7)</td>
        <td>Required</td>
        <td>the date the record was created</td>
    </tr>
    <tr>
        <td><strong>lastupdateat</strong></td>
        <td>datetime2 (7)</td>
        <td>Required</td>
        <td>the last time the record was changed</td>
    </tr>
    <tr>
        <td><strong>createdby</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>who created the record</td>
    </tr>
    <tr>
        <td><strong>lastupdateby</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>the last to change the record</td>
    </tr>
    <tr>
        <th colspan="4">MessageAttachment.dbo.mcabinet</th>
    </tr>
    <tr>
        <td><strong>MessageId</strong></td>
        <td>uniqueidentifier</td>
        <td>Required</td>
        <td>message id</td>
    </tr>
    <tr>
        <td><strong>AttachmentUrl</strong></td>
        <td>string (max)</td>
        <td>Required</td>
        <td>Attachment Url</td>
    </tr>
    <tr>
        <th colspan="4">Template</th>
    </tr>
    <tr>
        <td><strong>Id</strong></td>
        <td>uniqueidentifier</td>
        <td>Required</td>
        <td>order id</td>
    </tr>
    <tr>
        <td><strong>Name</strong></td>
        <td>string(50)</td>
        <td>Optional</td>
        <td>Template name</td>
    </tr>
    <tr>
        <td><strong>Description</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>Template description</td>
    </tr>
    <tr>
        <td><strong>SubjectRo</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>Notification subject in Romanian</td>
    </tr>
    <tr>
        <td><strong>SubjectEn</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>Notification subject in English</td>
    </tr>
    <tr>
        <td><strong>SubjectRu</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>Notification subject in Russian</td>
    </tr>
    <tr>
        <td><strong>BodyRo</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>Notification body in Romanian</td>
    </tr>
      <tr>
        <td><strong>BodyEn</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>Notification body in English</td>
    </tr>
    <tr>
        <td><strong>BodyRu</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>Notification body in Russian</td>
    </tr>
    <tr>
        <td><strong>BodyShortRo</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>Notification body short in Romanian</td>
    </tr>
    <tr>
        <td><strong>BodyShortEn</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>Notification body short in English</td>
    </tr>
    <tr>
        <td><strong>BodyShortRu</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>Notification body short in Russian</td>
    </tr>
    <tr>
        <td><strong>CreatedAt</strong></td>
        <td>datetime2 (7)</td>
        <td>Required</td>
        <td>the date the record was created</td>
    </tr>
    <tr>
        <td><strong>CreatedBy</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>who created the record</td>
    </tr>
    <tr>
        <td><strong>LastUpdatedAt</strong></td>
        <td>datetime2 (7)</td>
        <td>Required</td>
        <td>the last time the record was changed</td>
    </tr>
    <tr>
        <td><strong>LastUpdatedBy</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>the last to change the record</td>
    </tr>
    <tr>
        <td><strong>SenderId</strong></td>
        <td>uniqueidentifier</td>
        <td>Required</td>
        <td>Sender ID</td>
    </tr>
    <tr>
        <td><strong>Type</strong></td>
        <td>int</td>
        <td>Required</td>
        <td>Template type</td>
    </tr>
    <tr>
        <td><strong>OwnerId</strong></td>
        <td>string (max)</td>
        <td>Optional</td>
        <td>Owner ID</td>
    </tr>
    <tr>
        <th colspan="4">TemplateType</th>
    </tr>
    <tr>
        <td><strong>Id</strong></td>
        <td>int</td>
        <td>Required</td>
        <td>order id</td>
    </tr>
    <tr>
        <td><strong>Name</strong></td>
        <td>string(450)</td>
        <td>Optional</td>
        <td>Template type name</td>
    </tr>
</table>
