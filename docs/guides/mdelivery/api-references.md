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

## Received results from Swagger

### GET {link}/auth/api/v1/delivery/services/{serviceID}/orders/{orderID}/delivery/details

**CURL:**
```bash
curl -X GET "https://{link}/auth/api/v1/delivery/services/1/orders/o7741072598796449999/delivery/details" -H  "accept: text/plain"
```

**Request URL:**
```
https://{link}/auth/api/v1/delivery/services/1/orders/o7741072598796449999/delivery/details
```

**Server response**
Code: 200
Response body:
```json
{
  "id": "string",
  "isPaid": true,
  "status": "AwaytingPayment",
  "message": "string",
  "receiver": {
    "type": "Person",
    "id": "string",
    "name": "string",
    "firstName": "string",
    "email": "string",
    "phone": "string"
  },
  "pickupPointCode": "string",
  "orderSubmittedAt":"2022-04-18T20:03:38.005Z",
  "deliveryAcceptedUntil": "2022-04-19T20:03:38.005Z"
  "estimatedReadyAt": "2022-04-25T20:03:38.005Z",
  "products": [
    {
      "code": "string",
      "description": "string",
      "price": 50,
      "quantity": 1,
      "length": 0,
      "width": 0,
      "height": 0,  
      "weight": 0,
      "holderID": "string",
      "holderName": "string",
      "holderFirstName": "string"
    }
  ]
}
```

### PUT /{serviceID}/orders/{orderID}/delivery/status

**CURL:**
```bash
curl -X PUT "{link}/auth/api/v1/delivery/services/1/orders/o7741072598796449999/delivery/status" -H  "accept: */*" -H  "Content-Type: application/json" -d "{\"status\":\"Ready\",\"message\":\"test\",\"carrierName\":\"Muvi Express\",\"trackingID\":\"0220106997753968\",\"carrierEstimatedDeliveryStart\":\"2022-01-20T15:20:52.923Z\",\"carrierEstimatedDeliveryEnd\":\"2022-01-20T15:20:52.923Z\",\"carrierCost\":65}"
```

**Request URL:**
```
https://{link}/auth/api/v1/delivery/services/1/orders/0220106997753968/delivery/status
```

**Server response**
Code: 204

### GET /{serviceID}/delivery/changes

**CURL:**
```bash
curl -X GET "https://{link]/aurh/api/v1/delivery/services/1/delivery/changes" -H  "accept: text/plain"
```

**Request URL:**
```
https://{link}/auth/api/v1/delivery/services/1/delivery/changes
```

**Server response**
Code: 200
Response body:
```json
[
[
 { 
    "serviceID": "1",
    "orderID": "o5581066056252949999",
     "status": "Ready"
  },
  {
    "serviceID": "1",
    "orderID": "o5581309365303909999",
    "status": "Ready"
  }
]
```

## Statuses

Delivery statuses used in the system during the delivery process are defining the stage of the delivery and requested actions to be triggered.

The delivery statuses in MDelivery may not reflect the order processing status in the Service Provider system or the AWB status in the Carriers systems. During the integration works the relevant statuses should be mapped in order to reflect the appropriate actions/stages.

- statuses set in MDelivery related to delivery order creation and payment, until the order processing starts.
- statuses received from Service Provider related to order processing and preparation for shipment process.
- statuses received from the Carrier after the order pickup and during the shipment process.

| Nr | Name | Description | Comments |
|----|------|-------------|----------|
| 1 | AwaitingPayment | Delivery is awaiting payment | The delivery order is created, but not yet paid.<br>The status is generated by MDelivery when the Receiver confirms the Delivery order, but the order is still not payed. |
| 2 | Paid | Delivery is paid | The previous status (AwaitingPayment) is changed in MDelivery when the payment confirmation is received from MPay. |
| 3 | Processing | The Service provider is processing the Order. | The status is received from the Service Provider system via GET delivery/changes. |
| 4 | Cancelled | The order is cancelled in the Service provider system. No delivery can be made. | The status is received from the Service Provider system via GET delivery/changes. |
| 5 | Expired | Service provider order is expired. No delivery changes can be made. | The status is received from the Service Provider system via GET delivery/changes. |
| 6 | Ready | Products are ready for shipment. | The status is received from the Service Provider system via GET delivery/changes.<br>Based on this status MDelivery makes the request to the assigned Carrier to create the waybill. |
| 7 | AwaitingPickup | Carrier pickup is awaited. | The status is changed on MDelivery side after the successful request sent to the Carrier to create the waybill. |
| 8 | Delivering | Delivery is in progress. | The status is received from the Carrier confirming the order was picked up from the Service provider. |
| 9 | Delivered | Delivery is finished. | The status is received from the Carrier. |
| 10 | Confirmed | Delivery is confirmed by the final Receiver. | |
| 11 | Problem | Delivery problem occurred. | Details can be seen in the Message. |
| 12 | Returning | Products are being returned. | The order was not delivered and is returning to Service Provider. |
| 13 | Returned | Products returned. | The order is returned to Service Provider. |
| 14 | Unknown | Delivery status is unknown, i.e. the Order does not include delivery. | |

  - statuses 1 and 2 set in MDelivery related to delivery order creation and payment, until the order processing starts.
  - statuses 3 to 6 received from Service Provider related to order processing and preparation for shipment process. 
  - statuses 7 to 13 received from the Carrier after the order pickup and during the shipment process. 

