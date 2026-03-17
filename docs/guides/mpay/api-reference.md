## Perform online payment

In the case of online payment (card not present, ecommerce), the e-Service must redirect the browser to MPay's pay page. Communication will be performed via the WEB service via the standard HTTP protocol (HTTP / 1.1) and granting permission to access the client IP (for test only).

Here is a description of the parameters involved in this redirect.

| Property | Value |
|----------|-------|
| **Method** | POST |
| **URL** | Test: https://testmpay.gov.md/service/pay<br>Prod: https://mpay.gov.md/service/pay |
| **Description** | Direct user to perform online payments via card (card not present - ecommerce), internet banking, e-money or to access other payment methods instructions. |

### Form or URL parameters

| Name | Type | Required/Optional | Description |
|------|------|-------------------|-------------|
| ServiceID | string | Required | Service identifier in MPay. |
| OrderKey | string | Required | Order key within the service. This must be a uniquely generated key for this order (such as its primary key or other kind of reference number). |
| ReturnUrl | URL | Optional | The URL that MPay will redirect too after payment (either successful or unsuccessful). This page will be redirected via GET HTTP method. Please make sure you URL encode any parameters you use to build this URL. |

### Form or parameters to be sent for configuration in MPay

| Name | Type | Required/Optional | Description |
|------|------|-------------------|-------------|
| OrganizationName | string | Required | Name of the Service Provider. |
| OrganizationIdno | string | Required | Organization identifier of the Service Provider. |
| OfficeAddress | string | Required | Organization physical address of the Service Provider. |
| OrganizationService | string | Optional | Organization department (if any) which will deliver the services for which payments will be collected via POS terminal. |
| Counter | string | Optional | Organization physical counter number (if any) which will deliver the services for which payments will be collected via POS terminal. |
| TerminalId | string | Required | Terminal identifier of the device. |
| VendorName | string | Required | Bank owner of the POS terminal |
| IntendedIp | string | Required | IP address of the Service Provider's e-service. This IP address is to be added in MPay whitelist. |

**Note:** To complete the configuration of POS terminals, make sure to install the POS terminal USB driver provided by the Vendor (bank).

To perform the redirect for POS terminal transactions, follow the description of the parameters involved in this redirect.

| Property | Value |
|----------|-------|
| **Method** | POST |
| **URL** | Test:<br>- By ServiceId and OrderKey<br>https://testmpay.gov.md/PosTerminal/Pay/{ServiceId}/{OrderKey}<br>- or by MPay invoiceId<br>https://testmpay.gov.md/PosTerminal/PayInvoice/{InvoiceId}|
| **Description** | Direct the operator to perform the payment via POS terminals. |

### Form or URL parameters

| Name | Type | Required/Optional | Description |
|------|------|-------------------|-------------|
| ServiceID | string | Required | Service identifier in MPay. |
| OrderKey | string | Required | Order key within the e-service. This must be a uniquely generated key for this order (such as its primary key or other kind of reference number). |
| InvoiceId | string | Required | MPay Invoice identifier. |

## Get MPay InvoiceID

To generate MPay InvoiceID, the e-service can call a MPay API method. Communication will be performed via the WEB service via the standard HTTP protocol (HTTP / 1.1) and granting permission to access the client IP.

Here is a description of the parameters involved in this call.

| Property | Value |
|----------|-------|
| **Method** | GET |
| **URL** | Test:<br>https://testmpay.gov.md:8443/api/invoices?serviceID={serviceID}&orderKey={orderKey}<br><br>Swagger:<br>https://testmpay.gov.md:8443/openapi/index.html or<br>https://mpay.gov.md:8443/openapi/index.html |
| **Description** | E-service can generate MPay InvoiceID and use it for own record or business process (e.g. to print it in the generated order). |

### Form or URL parameters

| Name | Type | Required/Optional | Description |
|------|------|-------------------|-------------|
| ServiceID | string | Required | Service identifier. |
| OrderKey | string | Required | Order key within the e-service. This must be a uniquely generated key for this order (such as its primary key or other kind of reference number). |

### Output parameters

| Name | Type | Required/Optional | Description |
|------|------|-------------------|-------------|
| n/a | Array | Optional | List of MPay InvoiceIDs. |

## Get MPay Invoice PDF

To generate MPay Invoice in PDF format, the e-service can call a MPay API method. Communication will be performed via the WEB service via the standard HTTP protocol (HTTP / 1.1) and granting permission to access the client IP.

Here is a description of the parameters involved in this call.

| Property | Value |
|----------|-------|
| **Method** | GET |
| **URL** | Test:<br>https://testmpay.gov.md:8443/api/Invoices/DownloadInvoicePdf?serviceID={serviceId}&orderKey={ordekey}<br><br>Swagger:<br>https://testmpay.gov.md:8443/openapi/index.html or<br>https://mpay.gov.md:8443/openapi/index.html |
| **Description** | E-service can generate MPay InvoiceID PDF and use it for own business process (e.g., to print it and hand it over to payer). |

### Form or URL parameters

| Name | Type | Required/Optional | Description |
|------|------|-------------------|-------------|
| serviceId | string | Required | Service identifier in MPay. |
| orderKey | string | Required | Order key within the e-service. This must be a uniquely generated key for this order (such as its primary key or other kind of reference number). |

### Output parameters

| Name | Type | Required/Optional | Description |
|------|------|-------------------|-------------|
| n/a | Http response message | Required | PDF MPay invoice obtained as an HttpResponseMessage with the following properties:<br><br>1. **Content** - store the PDF as (8bit) byte array<br>2. **Headers** - store the content information<br><br>The Headers has following properties:<br>1. **ContentLength** - store the integer value of pdf bytes amount<br>2. **ContentType** - specify the type of content, which is "application/octet-stream"<br>3. **ContentDisposition** - Store information about PDF file. Only property "FileName", from ContentDisposition object, has value equal to default MPay name of PDF files, e.g. "Nota de plata {invoiceID}.pdf", where "invoiceID" equals to order that was searched. |

## Get MPay Invoice PDF (bytes)

| Property | Value |
|----------|-------|
| **Method** | GET |
| **URL** | Test:<br>https://testmpay.gov.md:8443/api/Invoices/GetPdfInvoiceBytes?serviceID={serviceId}&orderKey={ordekey}<br><br>Swagger:<br>https://testmpay.gov.md:8443/openapi/index.html or<br>https://mpay.gov.md:8443/openapi/index.html |
| **Description** | E-service can generate MPay InvoiceID PDF in bytes and use it for own business process (e.g., server to server communication). |

### Form or URL parameters

| Name | Type | Required/Optional | Description |
|------|------|-------------------|-------------|
| ServiceID | string | Required | Service identifier in MPay. |
| OrderKey | string | Required | Order key within the e-service. This must be a uniquely generated key for this order (such as its primary key or other kind of reference number). |
| pageFormat | string | Optional | Default page size is A4 (no need to indicate this format). Other available format page is A5. |

### Output parameters

| Name | Type | Required/Optional | Description |
|------|------|-------------------|-------------|
| n/a | ByteArray | Required | PDF MPay invoice obtained as (8bit) byte array. |

## Error handling rules

For errors resulted for SOAP interface invocations, MPay expects **SOAP faults** with **fault codes** and **fault reasons** describing the fault in plain English. Translating faults to Romanian is advisable. If there is no SOAP fault returned by a Public Service Provider, MPay considers that the operation invocation completed successfully, meaning that the corresponding expected business consequences are now valid.

### Fault codes

| Fault Code | Description |
|------------|-------------|
| InternalError | Unexpected internal error. |
| AuthenticationFailed | Service consumer authentication process failed. See Authentication |
| AuthorizationFailed | Service consumer authorization process failed. See Error! Reference source not found. |
| InvalidParameter | Some input parameter is invalid. Please review the returned Fault Reason text and called operation description. |
| UnknownService | The provided ServiceID is unknown. |
| UnknownOrder | The provided OrderKey is unknown. |
| UnknownInvoice | The provided InvoiceID is unknown. |
| UknownPayment | The provided PaymentID is unknown. |
| InvoiceAlreadyPaid | This invoice already has some payments and cannot be cancelled. |
| InvoiceExpired | The invoice is no longer valid and will not be paid. |

## Operation idempotence

All operations defined in IServiceProvider must be idempotent, i.e. the returned technical result and resulting business effect of calling such an operation must not be different if called multiple times with the same input parameters.

## Service operations

### GetOrderDetails

| Property | Description |
|----------|-------------|
| **Signature** | GetOrderDetails(query: OrderDetailsQuery): OrderDetails[] |
| **Description** | Returns matching orders' details from service provider order registration system. |
| **Returns** | An array of matching OrderDetails. |
| **Remarks** | This method might be called multiple times and, in some cases, it might return a different result, such as a different TotalAmountDue for the same order. This might naturally happen when an order expires or is later amended. MPay will consider correct only the latest version of returned details. |

#### Input parameters

| Name | Type | Description |
|------|------|-------------|
| query | OrderDetailsQuery | A structure that contains order details query criteria. |

#### Faults

| Code | Reason |
|------|--------|
| InvalidParameter | Some input parameter is invalid. Please provide the appropriate details in Fault Reason. |
| UnknownService | The provided ServiceID is unknown. |

### ConfirmOrderPayment

| Property | Description |
|----------|-------------|
| **Signature** | ConfirmOrderPayment(confirmation: PaymentConfirmation) |
| **Description** | Confirms a payment for an order. |
| **Returns** | void |
| **Remarks** | In some cases this method might be called multiple times for the same payment (uniquely identified by PaymentID). Please make sure that these calls will not result in multiple payments being applied to the same Order. |

#### Input parameters

| Name | Type | Description |
|------|------|-------------|
| confirmation | PaymentConfirmation | A structure that describes the payment confirmation. |

#### Faults

| Code | Reason |
|------|--------|
| InvalidParameter | Some input parameter is invalid. Please provide the appropriate details in Fault Reason. |
| UnknownService | The provided ServiceID is unknown. |
| UnknownOrder | The provided OrderKey is unknown. |

## Structures

**Important.** The order in which the members are described below is for description purposes only. The actual order of the elements in the actual XML structures, as defined in WSDL, is alphabetical. To get a correct implementation, it is recommended to use automatic WSDL to your programming language conversion tools.

### OrderDetailsQuery

| Member | Type | Required/Optional | Description |
|--------|------|-------------------|-------------|
| ServiceID | string (36) | Required | Service identifier. |
| OrderKey | string (36) | Required | Order key within the service. |
| Language | string (2) | Optional, default: RO | The language in which the localizable text members must be returned. Available languages: ro, ru and en. |

### OrderDetails

| Member | Type | Required/Optional | Description |
|--------|------|-------------------|-------------|
| ServiceID | string (36) | Required | Service identifier. |
| OrderKey | string (36) | Required | Order key within the service. |
| Reason | string (50) | Required | The reason for the payment of this order. Localizable. |
| Status | OrderStatus | Required | The status of the order. The status indicates in what state the order is and if it is eligible for payment or not. |
| IssuedAt | DateTime | Optional | The date and time when the order was registered in the back-office system. |
| DueDate | DateTime | Optional | The due date until the order can be paid. When this property is not set then the order has no expiration date for accepting payments. |
| TotalAmountDue | decimal | Optional | Total amount due for the order. It indicates how much MPay must accept when paying the order.<br><br>If this property has no value, then it is a signal that the amount due for the order is not yet known. Also, if one of the tags AllowPartialPayment or AllowAdvancePayment is set as TRUE, MPay will allow the payer to enter the amount information. |
| Currency | CurrencyCode | Required | The currency in which the payment of the order must be made (e.g. MDL). |
| AllowPartialPayment | boolean | Optional, default: false | A flag indicating if partial payments are allowed for the order (it can be zero amount or greater). In case of TRUE then the payer can pay in full or in part the displayed amount. If the payer has paid a part of the amount, when searching again the order by Orderkey, Service Provider (e-service) shall return only the difference of the total amount and paid amount. |
| AllowAdvancePayment | boolean | Optional, default: false | A flag indicating if the order might be paid in advance, i.e. with higher amount than required. |
| CustomerType | CustomerType | Required | The type of the customer this order was created for. |
| CustomerID | string (13) | Required | The identifier of the customer (e.g. its IDNP or IDNO). |
| CustomerName | string (60) | Required | The name of the customer. |
| Lines | array of OrderLine | Required, at least one OrderLine | Contains structured information for individual payment lines for the order. Each order information (i.e. OrderDetail instance) must have at least one line defined in the Lines property. |
| Properties | array of OrderProperty | Optional | Extended contextual properties for the order. For instance, when paying for electricity a relevant property might be the number of kW included for payment. |

### OrderLine

| Member | Type | Required/Optional | Description |
|--------|------|-------------------|-------------|
| LineID | string (36) | Required | The identifier of the line within order lines. |
| Reason | string (50) | Required | The reason for the payment behind this line. Localizable. |
| AmountDue | decimal | Optional | The amount due for this line. |
| AllowPartialPayments | boolean | Optional, default: as specified in OrderDetails | A flag indicating if the line allows partial payments. |
| AllowAdvancePayments | boolean | Optional, default: as specified in OrderDetails | A flag indicating if the line allows advance payments. |
| DestinationAccount | PaymentAccount | Required | Indicates details of the Treasury account or a Bank account where the money received for this line will be finally transferred.<br><br>Details not sent in this field will have default service provider values if any (according to the agreement or contract). In case the values are missing, the transaction will not be settled (transferred). |
| Properties | array of OrderProperty | Optional | Extended contextual properties for the order line. For instance, when paying for electricity a relevant property might be the number of kW included for payment. Order line extended properties are optional. |

### OrderProperty

| Member | Type | Required/Optional | Description |
|--------|------|-------------------|-------------|
| Name | string (36) | Required | The name of the property. Can contain letters, numbers and spaces only. |
| DisplayName | string (36) | Required, default: in RO | The display name of the property. Mandatory in RO language. |
| Value | string (255) | Required | The value of the property. Mandatory in RO language. |
| Modifiable | boolean | Optional, default: false | A flag indicating that the property can be modified at the time of payment on the payer side. A relevant example would be the tax code of the payer when unknown or the current indication in kW of electricity counter. |
| Required | boolean | Optional, default: false | A flag indicating if the property is required to be filled in by the payer or not. |
| Type | string | Optional, default: string | The type of the property. The following types are currently supported:<br>- string, any string;<br>- idn, meaning a valid IDNP (personal identifier) or IDNO (organization identifier);<br>- tc, a tax code, either an IDNx (see above) or any string containing non-digits (minim 5 chars). |

### PaymentConfirmation

| Member | Type | Required/Optional | Description |
|--------|------|-------------------|-------------|
| ServiceID | string (36) | Required | Service identifier for which payment was made. |
| OrderKey | string (36) | Required | Order key within the service for which payment was made. |
| InvoiceID | string (36) | Optional | Invoice identifier for this payment operation. |
| PaymentID | string (36) | Required | The actual Payment transaction identifier, unique within MPay. |
| PaidAt | DateTime | Required | Payment transaction time. |
| TotalAmount | decimal | Required | Total amount received in this payment transaction. |
| Currency | CurrencyCode | Required | The currency of the payment transaction. |
| Lines | array of PaymentConfirmationLine | Required, at least one object type PaymentConfirmationLine | Detailed information about each payment line as part of this payment transaction. |
| Properties | array of PaymentProperty | Optional | Values of modifiable extended properties for the order paid in this payment transaction. |

### PaymentConfirmationLine

| Member | Type | Required/Optional | Description |
|--------|------|-------------------|-------------|
| LineID | string (36) | Required | Payment line identifier within order lines. |
| Amount | decimal | Required | Amount paid for this line within the payment. |
| DestinationAccount | PaymentAccount | Required | The receiving account used for this payment line. |
| Properties | Array of PaymentProperty | Optional | Values of modifiable extended properties for the order line paid in this payment transaction |

### PaymentAccount

| Member | Type | Required/Optional | Description |
|--------|------|-------------------|-------------|
| ConfigurationCode | string (36) | Optional | The code of a predefined account configuration. |
| BankCode | string (20) | Required | The code of the receiving bank. (ex. TREZMD2X ) |
| Service Provider FiscalCode | string (20) | Required | The fiscal code (e.g. IDNO) of the Service Provider. |
| BankAccount | string (24) | Required | The receiving bank account number/ Treasury account number (IBAN) |
| BeneficiaryName | string (60) | Required | The beneficiary (Institution/Company) name. (ex. Administratia de Stat a Drumurilor) |
| TreasuryAccountName | string (60) | Optional | The receiving treasury account name. |
| TreasuryAccount | string (24) | Required | The receiving treasury account number. (In caz ca este SP Public) |

### PaymentProperty

| Member | Type | Required/Optional | Description |
|--------|------|-------------------|-------------|
| Name | string (36) | Required | Payment property name. |
| Value | string (255) | Optional | Payment property value. |

## Enumerations

<table>
  <tr>
    <th>Member</th>
    <th>Description</th>
  </tr>
  <tr>
    <th colspan="2">OrderStatus</th>
  </tr>
  <tr>
    <td>Active</td>
    <td>The order is active and can be paid. (Can be paid)</td>
  </tr>
  <tr>
    <td>PartiallyPaid</td>
    <td>The order was partially paid and can be additionally paid. (Can be paid)</td>
  </tr>
  <tr>
    <td>Paid</td>
    <td>The order is fully paid. (Already paid)</td>
  </tr>
  <tr>
    <td>Completed</td>
    <td>The order is complete, i.e. the service is delivered. (Cannot be paid)</td>
  </tr>
  <tr>
    <td>Expired</td>
    <td>The order expired and cannot be paid. (Cannot be paid)</td>
  </tr>
  <tr>
    <td>Cancelled</td>
    <td>The order is cancelled and cannot be paid. (Cannot be paid)</td>
  </tr>
  <tr>
    <td>Refunding</td>
    <td>The order is being refunded. (Cannot be paid)</td>
  </tr>
  <tr>
    <td>Refunded</td>
    <td>The order was refunded. (Cannot be paid)</td>
  </tr>  
  <tr>
    <th colspan="2">CustomerType</th>
  </tr>
  <tr>
    <td>Person</td>
    <td>The customer is a Person.</td>
  </tr>
  <tr>
    <td>Organization</td>
    <td>The customer is an Organization.</td>
  </tr>
  
  <tr>
    <th colspan="2">CurrencyCode</th>
  </tr>
  <tr>
    <td colspan="2">MPay uses ISO 4217 currency codes. The following list is just a subset of the active codes.</td>
  </tr>
  <tr>
    <td>MDL</td>
    <td>Moldovan leu</td>
  </tr>
  <tr>
    <td>EUR</td>
    <td>Euro</td>
  </tr>
  <tr>
    <td>USD</td>
    <td>United States dollar</td>
  </tr>
</table>
