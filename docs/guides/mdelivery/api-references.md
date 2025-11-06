## Error handling rules

For errors resulted for SOAP interface invocations, MDelivery returns SOAP faults with fault codes and fault reasons describing the fault in plain English.

**Note!** For the consumers using programming languages that support try… catch blocks, catching framework specific SOAP Fault exceptions is the correct way to handle service invocation errors.

| Fault Code | Description |
|------------|-------------|
| AuthenticationFailed | Service consumer authentication process failed. See Authentication |
| InvalidParameter | Some input parameter is invalid. Please review the returned Fault Reason text and called operation description. |
| 200 | Success |
| 400 | Bad request, Validation failed. Check validation rules compliance |
| 401 | Unauthorized Access. Check authorization requirements |
| 403 | Forbidden. The requested action is not allowed for the transmitted ID |
| 404 | Not found. Check sent request data |
| 500 | A server error occurred. Missing connection with DB from other reasons than: 400 / 401 . Contact the Administrator. |

## Service operations for Service providers

### GET order details

MDelivery API requests the Order details from the Service Provider information system.

| Signature | GET /api/v1/delivery/services/{serviceID}/orders/{orderID}/delivery/details |
|-----------|------------------------------------------------------------------------------|
| **Description** | MDelivery calls the Service Provider system to view details by orderID and serviceID. |
| **Returns** | Details by orderID: status, message, receiver, pickupPointCode, orderSubmittedAt, deliveryAcceptedUntil, estimatedReadyAt, products, isPaid |

#### Input parameters

| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| serviceID | string | Yes | Service unique identification number. |
| orderID | string | Yes | Order identification number. |

#### Response

| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| id | string | Yes | Order identification number. |
| isPaid | | Yes | Order payment status. Values:<br>True – the order was already paid.<br>False – the order was not paid and aggregated payment needs to be sent to MPay from MDelivery. |
| status | string | Yes | Current order status according to statuses enum. |
| message | string | No | Status details. |
| **receiver** | | | The person who will receive the delivery. |
| type | string | Yes | Receiver type. Values:<br>Person - private individual<br>Organization – legal entity |
| id | string | Yes | Receiver IDNP or IDNO depending on the type. |
| name | string | No | |
| first name | string | No | |
| email | string | No | |
| phone | string | No | |
| pickupPointCode | string | No | The identification code of the pickup point where the order will be prepared to be picked up by the carrier.<br>Note! It the Service Provider has more than 1 pickup point registered in MDelivery, the code is mandatory. |
| orderSubmittedAt | data | Yes | Order registration date. |
| deliveryAcceptedUntil | data | Yes | Time limit until when the delivery can be added to the order. |
| estimatedReadyAt | data | Yes | Estimated date when the order will be ready for pickup. |
| **products** | | | The product to be delivered. |
| code | string | No | The product ID registered in MDelivery profile.<br>Note! It the Service Provider has more than 1 product registered in MDelivery, the code is mandatory. |
| description | string | No | Product description |
| price | number | Yes | Oder price |
| quantity | integer | Yes | Products quantity included the order. |
| length | number | Yes | Parcel length in cm. |
| width | number | Yes | Parcel width in cm. |
| height | number | Yes | Parcel height in cm. |
| weight | number | Yes | Parcel weight in kg. Can be expressed in decimals (ex 0.25) |
| holderID | string | No | The IDNP of the person the document was issued for (holder) |
| holderName | string | No | The name of the person the document was issued for. |
| holderFirstName | string | No | The first name of the holder the document was issued for. |

#### Faults

| Code | Reason |
|------|--------|
| 200 | Success |
| 400 | Bad Request |
| 404 | Not found |
| 500 | A server error occurred. |

### PUT delivery status

In order to inform the Service Provider about the delivery order and to track the delivery order the delivery statuses are updated via MDelivery API:
- when the delivery order is confirmed by the Receiver (delivery order status - AwaytingPayment)
- when the delivery order is paid via MPay (delivery order status - Paid)
- when the delivery order status Ready is received from Service provider system, or set manually in MDelivery register (delivery order status – Ready)
- when the final delivery status is received from the Carrier side (delivery order status –Delivered, Returned, Problem)

| Signature | PUT /{serviceID}/orders/{orderID}/delivery/status |
|-----------|---------------------------------------------------|
| **Description** | MDelivery requests the Service Provider to change the delivery status |
| **Returns** | Code response: 200,400,401,404,500 |

#### Input parameters

| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| serviceID | string | Yes | Service unique identification number. |
| orderID | string | Yes | Order identification number. |
| status | string | Yes | Statuses enum. |
| message | string | No | Additional details related to status. |
| carrierName | string | Yes | The name of the carrier in charge with the delivery. |
| trackingID | string | Yes | The ID assigned to the order for tracking. trackingID=deliveryID |

#### Faults

| Code | Reason |
|------|--------|
| 204 | Success |
| 400 | Bad Request |
| 404 | Not found |
| 500 | A server error occurred. |

### GET delivery changes

MDelivery requests the orders statuses changed from the previous request (ex. processing, canceled, ready for shipment) from the Service Provider system to be sent to Carrier's information system and to track the order.

| Signature | GET /{serviceID}/delivery/changes |
|-----------|-----------------------------------|
| **Description** | MDelivery calls Service Provider to get updated orders' statuses. |
| **Returns** | Orders array list. |

#### Input parameters

| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| serviceID | string | Yes | Service unique identification number. |

#### Response

| Name | Type | Mandatory | Description |
|------|------|-----------|-------------|
| serviceID | string | Yes | Service unique identification number. |
| orderID | string | Yes | Order identification number. |
| status | string | Yes | Current order status according to statuses enum. |

#### Faults

| Code | Reason |
|------|--------|
| 200 | Success |
| 400 | Bad Request |
| 404 | Not found |
| 500 | A server error occurred. |
