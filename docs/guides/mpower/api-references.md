# API references

##**Error handling**

!!! note "Note"
The MPower Client API component will return REST API errors with the error code and cause; descriptions will be displayed in English.

<table>
  <thead>
    <tr>
      <th>Error code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>AuthenticationFailed</td>
      <td>Service consumer authentication process failed. See Authentication</td>
    </tr>
    <tr>
      <td>InvalidParameter</td>
      <td>Some input parameter is invalid. Please review the returned Fault Reason text and called operation description.</td>
    </tr>
    <tr>
      <td>200</td>
      <td>Success</td>
    </tr>
    <tr>
      <td>400</td>
      <td>Bad request, Validation failed. Check validation rules compliance</td>
    </tr>
    <tr>
      <td>401</td>
      <td>Unauthorized Access. Check authorization requirements</td>
    </tr>
    <tr>
      <td>403</td>
      <td>Forbidden. The requested action is not allowed for the transmitted ID</td>
    </tr>
    <tr>
      <td>404</td>
      <td>Not found. Check sent request data</td>
    </tr>
    <tr>
      <td>500</td>
      <td>A server error occurred. Missing connection with DB from other reasons than: 400 / 401 / 501. Contact the Administrator.</td>
    </tr>
    <tr>
      <td>501</td>
      <td>A server error occurred. Contact the Administrator.</td>
    </tr>
  </tbody>
</table>

##**API methods description**

###**Check authorization validity**

!!! note "Note"
Because this method can be called multiple times on different days/times, the response may vary: at a certain moment the power of representation may no longer be valid due to expiry, revocation, renunciation, suspension, etc.

<table>
  <thead>
    <tr>
      <th>Call signature</th>
      <th colspan="2">GET /api/Authorization/check/Code-True-One</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="2">Based on the authorization code, returns an entry stating whether the power of representation is valid or cancelled.</td>
    </tr>
    <tr>
      <td colspan="3"><strong>Input/Output parameters</strong></td>
    </tr>
     <tr>
      <td><strong>Name</strong></td>
      <td><strong>Type</strong></td>
      <td><strong>Description</strong></td>
    </tr>
     <tr>
      <td><strong>Query</strong></td>
      <td>"authorizationCode"</td>
      <td>The 16-digit unique identification code of the power of representation.</td>
    </tr>
     <tr>
      <td><strong>Response</strong></td>
      <td>"data": = True or False</td>
      <td>If the returned value is True, the power of representation is valid; if False, it is not valid.</td>
    </tr>
     <tr>
      <td colspan="3"><strong>Faults</strong></td>
    </tr>
     <tr>
      <td><strong>Code</strong></td>
      <td><strong>Reason</strong></td>
    </tr>
     <tr>
      <td>200</td>
      <td colspan="2">Success</td>
    </tr>
     <tr>
      <td>404</td>
      <td colspan="2">Not found. Check sent request data</td>
    </tr>
     <tr>
      <td>500</td>
      <td colspan="2">A server error occurred. Missing connection with DB from other reasons than: 400 / 401 / 501. Contact the Administrator.</td>
    </tr>
     <tr>
      <td>501</td>
      <td colspan="2">A server error occurred. Contact the Administrator.</td>
    </tr>
  </tbody>
</table>

###**Get authorization details**

<table>
  <thead>
    <tr>
      <th>Call signature</th>
      <th colspan="2">GET /api/Authorization/check/Code-Details-One</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="2">Based on the authorization code, returns an entry with a data structure containing details of the identified power of representation.</td>
    </tr>
    <tr>
      <td colspan="3"><strong>Input/Output parameters</strong></td>
    </tr>
     <tr>
      <td><strong>Name</strong></td>
      <td><strong>Type</strong></td>
      <td><strong>Description</strong></td>
    </tr>
     <tr>
      <td><strong>Query</strong></td>
      <td>"authorizationCode"</td>
      <td>The 16-digit unique identification code of the power of representation.</td>
    </tr>
     <tr>
      <td><strong>Response</strong></td>
      <td>AuthorizationDetails</td>
      <td>A data structure that contains the details of the identified power of representation.</td>
    </tr>
     <tr>
      <td colspan="3"><strong>Faults</strong></td>
    </tr>
     <tr>
      <td><strong>Code</strong></td>
      <td><strong>Reason</strong></td>
    </tr>
     <tr>
      <td>200</td>
      <td colspan="2">Success</td>
    </tr>
     <tr>
      <td>404</td>
      <td colspan="2">Not found. Check sent request data</td>
    </tr>
     <tr>
      <td>500</td>
      <td colspan="2">A server error occurred. Missing connection with DB from other reasons than: 400 / 401 / 501. Contact the Administrator.</td>
    </tr>
     <tr>
      <td>501</td>
      <td colspan="2">A server error occurred. Contact the Administrator.</td>
    </tr>
  </tbody>
</table>

###**Check authorization validity by type code**

<table>
  <thead>
    <tr>
      <th>Call signature</th>
      <th colspan="2">GET /api/Authorization/check/TypeCode-Valid-One</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="2">Based on the authorization type code, Idn1 and Idn2, returns an entry with a data structure that states whether the power of representation is valid or cancelled.</td>
    </tr>
    <tr>
      <td colspan="3"><strong>Input/Output parameters</strong></td>
    </tr>
     <tr>
      <td><strong>Name</strong></td>
      <td><strong>Type</strong></td>
      <td><strong>Description</strong></td>
    </tr>
     <tr>
      <td><strong>Query</strong></td>
      <td>AuthorizationTypeCodeQuery</td>
      <td>A data structure that contains the authorization details identified based on the authorization type code.</td>
    </tr>
     <tr>
      <td><strong>Response</strong></td>
      <td>AuthorizationValid</td>
      <td>A data structure related to the power of representation that indicates its validity: True or False.</td>
    </tr>
     <tr>
      <td colspan="3"><strong>Faults</strong></td>
    </tr>
     <tr>
      <td><strong>Code</strong></td>
      <td><strong>Reason</strong></td>
    </tr>
     <tr>
      <td>200</td>
      <td colspan="2">Success</td>
    </tr>
     <tr>
      <td>404</td>
      <td colspan="2">Not found. Check sent request data</td>
    </tr>
     <tr>
      <td>500</td>
      <td colspan="2">A server error occurred. Missing connection with DB from other reasons than: 400 / 401 / 501. Contact the Administrator.</td>
    </tr>
     <tr>
      <td>501</td>
      <td colspan="2">A server error occurred. Contact the Administrator.</td>
    </tr>
  </tbody>
</table>


###**Get authorization list by IDNx**

<table>
  <thead>
    <tr>
      <th>Call signature</th>
      <th colspan="2">GET /api/Authorization/check/Idn-Details-List</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="2">Based on IDNP or IDNO, returns the list of powers of representation.</td>
    </tr>
    <tr>
      <td colspan="3"><strong>Input/Output parameters</strong></td>
    </tr>
     <tr>
      <td><strong>Name</strong></td>
      <td><strong>Type</strong></td>
      <td><strong>Description</strong></td>
    </tr>
     <tr>
      <td><strong>Query</strong></td>
      <td>AuthorizationListQuery</td>
      <td>Identification based on IDNP or IDNO and, optionally, an additional structure with data related to the power of representation.</td>
    </tr>
     <tr>
      <td><strong>Response</strong></td>
      <td>AuthorizationDetails</td>
      <td>A data structure that contains the details of the powers of representation.</td>
    </tr>
     <tr>
      <td colspan="3"><strong>Faults</strong></td>
    </tr>
     <tr>
      <td><strong>Code</strong></td>
      <td><strong>Reason</strong></td>
    </tr>
     <tr>
      <td>200</td>
      <td colspan="2">Success</td>
    </tr>
     <tr>
      <td>404</td>
      <td colspan="2">Not found. Check sent request data</td>
    </tr>
     <tr>
      <td>500</td>
      <td colspan="2">A server error occurred. Missing connection with DB from other reasons than: 400 / 401 / 501. Contact the Administrator.</td>
    </tr>
     <tr>
      <td>501</td>
      <td colspan="2">A server error occurred. Contact the Administrator.</td>
    </tr>
  </tbody>
</table>


###**Download authorization file**

<table>
  <thead>
    <tr>
      <th>Call signature</th>
      <th colspan="2">GET /api/Authorization/file</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Description</strong></td>
      <td colspan="2">Based on the authorization code, returns an entry with a data structure that contains the authorization file.</td>
    </tr>
    <tr>
      <td colspan="3"><strong>Input/Output parameters</strong></td>
    </tr>
     <tr>
      <td><strong>Name</strong></td>
      <td><strong>Type</strong></td>
      <td><strong>Description</strong></td>
    </tr>
     <tr>
      <td><strong>Query</strong></td>
      <td>authorizationCode</td>
      <td>A data structure that contains the details of the authorization identified based on the authorization code.</td>
    </tr>
     <tr>
      <td><strong>Response</strong></td>
      <td>AuthorizationFile</td>
      <td>A data structure that contains the authorization file.</td>
    </tr>
     <tr>
      <td colspan="3"><strong>Faults</strong></td>
    </tr>
     <tr>
      <td><strong>Code</strong></td>
      <td><strong>Reason</strong></td>
    </tr>
     <tr>
      <td>200</td>
      <td colspan="2">Success</td>
    </tr>
     <tr>
      <td>404</td>
      <td colspan="2">Not found. Check sent request data</td>
    </tr>
     <tr>
      <td>500</td>
      <td colspan="2">A server error occurred. Missing connection with DB from other reasons than: 400 / 401 / 501. Contact the Administrator.</td>
    </tr>
     <tr>
      <td>501</td>
      <td colspan="2">A server error occurred. Contact the Administrator.</td>
    </tr>
  </tbody>
</table>

##**Data structures (Query)**

<table>
  <thead>
    <tr>
      <th><strong>Member</strong></th>
      <th><strong>Type</strong></th>
      <th><strong>Required/Optional</strong></th>
      <th><strong>Description</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr><td colspan="4"><strong>AuthorizationTypeCodeQuery</strong></td></tr>
    <tr>
      <td>AuthorizationTypeCode</td>
      <td>String</td>
      <td>Required</td>
      <td>Enter the authorization type code (assigned from the approved form, 10 characters – "AT-xxxxxxx").</td>
    </tr>
    <tr>
      <td>AuthorizingIdn</td>
      <td>String</td>
      <td>Required</td>
      <td>Enter the IDNP or IDNO of the represented party.
      <br>Must contain exactly 13 characters and only digits.</td>
    </tr>
    <tr>
      <td>AuthorizedIdn</td>
      <td>String</td>
      <td>Required</td>
      <td>Enter the IDNP or IDNO of the representative.
      <br>Must contain exactly 13 characters and only digits.</td>
    </tr>
    <tr><td colspan="4"><strong>AuthorizationListQuery</strong></td></tr>
    <tr>
      <td>IDNx</td>
      <td>String</td>
      <td>Required</td>
      <td>The list of powers of representation granted and received by the completed IDNP or IDNO will be returned (where the natural or legal person has the role of represented and representative).
      <br>Must contain exactly 13 characters and only digits.
      <br>Will be compared to be identical to AuthorizingContextIdn and AuthorizedIdn.</td>
    </tr>
    <tr>
      <td>Status</td>
      <td>Integer</td>
      <td>Optional</td>
      <td>Filters the list of powers of representation granted and received according to the indicated status.
      <br>Must contain the status code as per the enumerations indicated in the Enumerations section.
      <br>Will be compared to be identical to Authorization Status.</td>
    </tr>
    <tr>
      <td>AuthorizationTypeCode</td>
      <td>String</td>
      <td>Optional</td>
      <td>Enter the authorization type code (assigned from the approved form, 10 characters – "AT-xxxxxxx").</td>
    </tr>
    <tr>
      <td>StartDate</td>
      <td>String</td>
      <td>Optional</td>
      <td>Displays the powers of representation that became effective starting from the indicated date.
      <br>Constraints: this value must not be later than the value entered in the EndDate field.
      <br>Time is set to UTC.
      <br>Example: "2020-09-28T10:35:16.879Z". Will be compared to be greater than or equal to AuthorizationValidFrom date (AuthorizationValidFrom represents the date the power of representation became effective).</td>
    </tr>
    <tr>
      <td>AuthEndDateorizationTypeCode</td>
      <td>String</td>
      <td>Optional</td>
      <td>Displays the powers of representation that expired up to the indicated date.
      <br>Constraints: this value must not be earlier than the value entered in the StartDate field.
      <br>Time is set to UTC.
      <br>Example: "2020-09-28T10:35:16.879Z". Will be compared to be greater than or equal to AuthorizationValidTo date (AuthorizationValidTo represents the expiration date of the power of representation).</td>
    </tr>
    <tr>
      <td>GrantedByIdn</td>
      <td>String</td>
      <td>Optional</td>
      <td>This parameter will display the list of powers of representation that were granted by the specified IDNP/IDNO.
      <br>Constraints: The value of this field must be different from the value of the GrantedToIdn field. Must contain 13 characters, all digits. Will be compared to be equal to AuthorizingContextIdn.</td>
    </tr>
    <tr>
      <td>GrantedToIdn</td>
      <td>String</td>
      <td>Optional</td>
      <td>Displays the list of powers of representation that were received from the specified IDNP/IDNO.
      <br>Constraints: The value of this field must be different from the value of the GrantedByIdn field. Must contain 13 characters, all digits. Will be compared to be equal to AuthorizedIdn.</td>
    </tr>
    <tr>
      <td>ItemsPerPage</td>
      <td>Integer</td>
      <td>Optional</td>
      <td>The parameter specifies the page to be displayed. By default, records from the first page are displayed.
      <br>Constraints: if a negative number or zero is provided, the system will return powers of representation from the first page; if a number greater than the number of pages is provided, zero powers of representation will be displayed per page.</td>
    </tr>
  </tbody>
</table>

##**Data structures (Response)**

<table>
  <thead>
    <tr>
      <th><strong>Member</strong></th>
      <th><strong>Type</strong></th>
      <th><strong>Required/Optional</strong></th>
      <th><strong>Description</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr><td colspan="4"><strong>AuthorizationCodeValid</strong></td></tr>
    <tr>
      <td>AuthorizationCode</td>
      <td>String</td>
      <td>Required</td>
      <td>The unique identification code of the power of representation.</td>
    </tr>
    <tr>
      <td>IsValid</td>
      <td>String</td>
      <td>Required</td>
      <td>True if valid
      <br>False if not valid</td>
    </tr>
    <tr><td colspan="4"><strong>AuthorizationDetails</strong></td></tr>
    <tr>
      <td>AuthorizationCode</td>
      <td>String</td>
      <td>Required</td>
      <td>The unique identification code of the power of representation.</td>
    </tr>
    <tr>
      <td>AuthorizationTypeCode</td>
      <td>String</td>
      <td>Required</td>
      <td>The type code of the power of representation (according to the approved form).</td>
    </tr>
    <tr>
      <td>AuthorizingPartyType</td>
      <td>Integer</td>
      <td>Required</td>
      <td>ID of the represented party type; see the Enumerations section.</td>
    </tr>
    <tr>
      <td>AuthorizingIdn</td>
      <td>String</td>
      <td>Required</td>
      <td>IDNP or IDNO of the represented party.</td>
    </tr>
    <tr>
      <td>AuthorizedPartyType</td>
      <td>Integer</td>
      <td>Required</td>
      <td>ID of the representative party type; see the Enumerations section.</td>
    </tr>
    <tr>
      <td>AuthorizedIdn</td>
      <td>String</td>
      <td>Required</td>
      <td>IDNP or IDNO of the representative.</td>
    </tr>
    <tr>
      <td>From</td>
      <td>String</td>
      <td>Required</td>
      <td>If isValid=True -> The date from which the power of representation is valid.
      <br>If isValid=False -> The date from which the power of representation is suspended or invalid.
      <br>Time is set to UTC.</td>
    </tr>
    <tr>
      <td>To</td>
      <td>String</td>
      <td>Required</td>
      <td>If isValid=True -> The date until which the power of representation is valid.
      <br>If isValid=False -> "null".
      <br>Time is set to UTC.</td>
    </tr>
    <tr>
      <td>IsValid</td>
      <td>String</td>
      <td>Required</td>
      <td>True if valid
      <br>False if not valid</td>
    </tr>
    <tr>
      <td>AuthorizingPartyName</td>
      <td>String</td>
      <td>Required</td>
      <td>First and last name of the represented party.</td>
    </tr>
    <tr>
      <td>AuthorizedPartyName</td>
      <td>String</td>
      <td>Required</td>
      <td>First and last name of the representative.</td>
    </tr>
    <tr>
      <td>AuthorizationTypeName</td>
      <td>String</td>
      <td>Required</td>
      <td>Name of the authorization type.</td>
    </tr>
    <tr>
      <td>ServiceProviderIdno</td>
      <td>String</td>
      <td>Required</td>
      <td>IDNO of the service provider.</td>
    </tr>
    <tr>
      <td>ServiceProviderName</td>
      <td>String</td>
      <td>Required</td>
      <td>Name of the service provider.</td>
    </tr>
    <tr><td colspan="4"><strong>AuthorizationFile</strong></td></tr>
    <tr>
      <td>content</td>
      <td>byte[]</td>
      <td>Required</td>
      <td>File content that contains data about the requested authorization.</td>
    </tr>
    <tr>
      <td>content-type</td>
      <td>String</td>
      <td>Required</td>
      <td>Authorization file MIME type. Default: "application/pdf"</td>
    </tr>
  </tbody>
</table>

##**Enumerations**

<table>
  <thead>
    <tr>
      <th><strong>Attributes</strong></th>
      <th colspan="2"><strong>Description</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="3"><strong>AuthorizationGrantedType</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>Power of representation granted by IDNx</td>
      <td></td>
    </tr>
    <tr>
      <td>2</td>
      <td>Power of representation received by IDNx</td>
      <td></td>
    </tr>
    <tr>
      <td>3</td>
      <td>Power of representation co-signed by IDNx</td>
      <td></td>
    </tr>
    <tr>
      <td colspan="3"><strong>AuthorizationStaus</strong></td>
    </tr>
    <tr>
      <td>Draft</td>
      <td>The power of representation is created, but not valid</td>
      <td>None</td>
    </tr>
    <tr>
      <td>PendingAcceptance</td>
      <td>The power of representation is granted, but requires the representative’s acceptance to become valid</td>
      <td>None</td>
    </tr>
    <tr>
      <td>Pending</td>
      <td>The power of representation is granted, but will become valid at a future date</td>
      <td>None</td>
    </tr>
    <tr>
      <td>Valid</td>
      <td>The power of representation is valid and can be used for representation</td>
      <td>isValid=True</td>
    </tr>
    <tr>
      <td>Canceled</td>
      <td>The power of representation is expired, revoked or renounced</td>
      <td>isValid=False</td>
    </tr>
    <tr>
      <td>Suspended</td>
      <td>The power of representation is suspended</td>
      <td>isValid=False</td>
    </tr>
    <tr>
      <td colspan="2"><strong>AuthorizingPartyType</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td colspan="2">Natural person</td>
    </tr>
    <tr>
      <td>2</td>
      <td colspan="2">Legal entity</td>
    </tr>
    <tr>
      <td colspan="2"><strong>AuthorizedPartyType</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td colspan="2">Natural person</td>
    </tr>
    <tr>
      <td>2</td>
      <td colspan="2">Legal entity</td>
    </tr>
<tr>
      <td colspan="3"><strong>Status</strong></td>
    </tr>
    <tr>
      <td>1</td>
      <td>The power of representation saved as draft (not granted)</td>
      <td>Draft</td>
    </tr>
    <tr>
      <td>2</td>
      <td>The power of representation that was granted, but requires the representative’s acceptance to become valid</td>
      <td>PendingAcceptance</td>
    </tr>
    <tr>
      <td>3</td>
      <td>The power of representation that was granted, but the effective date is in the future</td>
      <td>PendingValidity</td>
    </tr>
    <tr>
      <td>4</td>
      <td>The power of representation that is valid.</td>
      <td>Valid</td>
    </tr>
    <tr>
      <td>5</td>
      <td>The power of representation that is suspended.</td>
      <td>Suspended</td>
    </tr>
    <tr>
      <td>6</td>
      <td>The power of representation that is not valid due to expiry, renunciation, revocation</td>
      <td>Canceled</td>
    </tr>
  </tbody>
</table>

##**Examples of API method calls**

###**GET /api/Authorization/check/Code-True-One**

=== "Request"

    ```curl
    curl -X GET "https://mpower.staging.egov.md:8443/clients-api/api/Authorization/check/Code-True-One?AuthorizationCode=0200905142878268" -H "accept: text/plain"
    ```

=== "Response"

    ```json
    {
      "data": true,
      "success": true,
      "messages": []
    }
    ```

###**GET /api/Authorization/check/Code-Details-One**

=== "Request"

    ```curl
    curl -X GET "https://mpower.staging.egov.md:8443/clients-api/api/Authorization/check/Code-Details-One?AuthorizationCode=0200935852951597" -H "accept: text/plain"
    ```

=== "Response"

    ```json
    {
      "data": {
        "authorizationCode": "0200935852951597",
        "authorizationTypeCode": "AT-2100025",
        "authorizingPartyType": 2,
        "authorizingIdn": "1009600026622",
        "authorizedPartyType": 1,
        "authorizedIdn": "2001003328546",
        "fromDate": "2020-09-22T14:16:06.0932925",
        "toDate": "2021-03-22T21:59:59.999",
        "isValid": true,
        "authorizingPartyName": "Esempla SRL",
        "authorizedPartyName": "L CHIRIŢA",
        "authorizationTypeName": "Ridicare original document",
        "serviceProviderIdno": "1009600026622",
        "serviceProviderName": "Companie SRL"
      },
      "success": true,
      "messages": []
    }
    ```

###**GET /api/Authorization/check/TypeCode-Valid-One**

=== "Request"

    ```curl
    curl -X GET "https://mpower.staging.egov.md:8443/clients-api/api/Authorization/check/TypeCode-Valid-One?AuthorizationTypeCode=AT-2100025&AuthorizingIdn=1009600026622&AuthorizedIdn=2001003328546" -H "accept: text/plain"
    ```

=== "Response"

    ```json
    {
      "data": {
        "authorizationCode": "0200935852951597",
        "isValid": true
      },
      "success": true,
      "messages": []
    }
    ```

###**GET /api/Authorization/check/Idn-Details-List**

!NOT PROVIDED INTO PREVIOUS DOCUMENTATION

###**GET /api/Authorization/file**

=== "Request"

    ```curl
    curl -X GET "https://mpower.dev.egov.md:8443/clients-api/api/Authorization/file ? ?AuthorizationCode=0200905142878268" " -H "accept: text/plain"
    ```

=== "Response"

    ```json
    {
      "data": {
        "content": "JVBERi0xLjcKJeLjz9MKNyAwIG9iago8PC9GaWx0ZXI…",
        "content-type": "application/pdf"
      },
      "success": true,
      "messages": []
    }
    ```

