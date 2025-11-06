## Redirect to MPay

The payment via MPay is required to confirm the delivery order and to proceed with the processing.

In order to make the payment the Customer is redirected to MPay either from MDelivery page or Service Provider system, depending on the process set during the integration.

The selected scenario is set using the attribute Redirect to MPay set in MPass configurations for the integrated service.

### Redirect to MPay [true]

The attribute Redirect to MPay=true supposes the interaction scenario when the delivery order is confirmed on MDelivery page and the redirect to MPay for aggregated payment is made from MDelivery.

**Note!** To implement this scenario the Service Provider has to implement only the redirect to MDelivery and the methods to exchange the statuses during the delivery process. The delivery order creation, including the display of the aggregated order summary for confirmation and the redirect to MPay for payment are made on MDelivery.

<img src="img/true.png">

### Redirect to MPay [false]

The attribute Redirect to MPay=false supposes the interaction scenario when the order with delivery is confirmed on Service Provider page and the redirect to MPay of the aggregated payment is made from the Service Provider system.

**Note!** To implement this scenario the Service Provider has to develop the interface for delivery order creation displaying the aggregated order summary and options to confirm the delivery order redirecting the aggregated payment to MPay.

<img src="img/false.png">

## Request delivery

When a Customer requests a delivery for an ordered Product, the Service Provider's system redirects the Customer to MDelivery to fill in the delivery details and select delivery option from the available list provided by the integrated Carriers.

MDelivery receives the Order ID in the redirect URL and requests the Order details from the Service Provider information system via API (to send them to Carriers to obtain delivery options).

**Redirect rules**

**Passive authentication**

The fact that the Receiver is already authenticated on the Service Provider system via MPass, will be indicated by the parameter mpass = true, or mpass = 1.

**Language**

The redirect will be performed by applying the same language selected by the user.

Example: if the RO version was selected on the System Provider system, on MDelivery the user will be redirected on the RO version.

The parameter used to indicate the language is "lang" (ex: lang = ro)

**Example URL:**
```
https://mdelivery.staging.egov.md/public/shipping?orderId=o7515871605102109999&serviceId=1&lang=ro&returUrl=https:%2F%2Fsp-mdelivery.staging.egov.md%2F
```

## Delivery order creation

When the Customer selects and confirms a delivery option, a Delivery order is created on MDelivery assigned to the Order received form Service Provider.

The delivery order can be initiated on:

**SP system** – with redirect to MDelivery to fill in delivery details and select the delivery option.

**Note!** Depending on the payment scenario selected by the Service Provider and registered in the Service Provider profile on MDelivery, the created Delivery is returned to the Service Provider system, or the process is continued with redirecting to MPay from MDelivery.

**MDelivery page** - via Add delivery option, completing the relevant Order ID to add the delivery.

**Note!** The option to add the delivery on MDelivery page for an existing order is available only for the services with the relevant attribute in SP profile (Add delivery = true).

When the delivery order is confirmed, MDelivery sends the delivery data to inform the Service Provider that a delivery order was assigned by the customer to an order.

**Delivery status at this stage**

**AwaitingPayment** – the Receiver confirms the Delivery order creation, but the order is still not payed.

## Payment scenarios

The Integration type attribute assigned to the Service determines where the payment phase will start: on MDelivery, or on Service Provider system.

**Note!** Both scenarios requests the Service Provider integration with MPay, to enable the Order payment.

### Redirect to MPay from MDelivery

The attribute Redirect to MPay=true supposes the Customer, when confirming the delivery on MDelivery page is redirected to MPay for payment.

MDelivery sends to MPay both DeliveryID and OrderID.

###  Redirect to MPay Service Provider system

The attribute Redirect to MPay=false supposes that the Customer, when confirming the delivery on MDelivery will be redirected back to his order on Service Provider page to confirm consolidated order with delivery.

The Service Provider system sends to MPay both OrderID and DeliveryID.

When the delivery order payment confirmation is received from MPay, MDelivery sends the delivery data to inform the Service Provider that a delivery order was paid by the customer and the order should be prepared for delivery.

**Delivery status at this stage**

**Paid** – set in MDelivery when the payment confirmation for the delivery order is received from MPay.

## Get orders' status changes

The orders status changes are checked from the Service Provider system via MDelivery API.

**Delivery statuses at this stage**

**Processing** – returned by the Service provider during the period of order processing, meaning the order will be prepared for delivery, but is still not ready.

**Cancelled** – returned by the Service Provider if the order is cancelled in the Service provider system and no delivery will be needed.

**Expired** - returned by the Service Provider if the order is expired in the Service provider system Service provider and no delivery will be needed.

**Ready** - returned by the Service Provider or set manually by the Operator in MDelivery when the order is ready at the pickup point to be transmitted to the Carrier's reprresentative.

**Note!** When the delivery order status becomes ready, the delivery order is sent by MDelivery to the Carrier's information system to create the shipment document (AWB) and prepare delivery process and also the delivery status is the delivery status is sent o Service Provider to confirm it.

## Delivery status tracking

During the processing and delivery process, to track the Delivery, the statuses are send to and checked from the Service Provider system via MDelivery API based on the OrderID and ServiceID.

**Delivery statuses at this stage**

**AwaitingPickup** – sent by MDelivery to inform the Service provider the AWB was created in the Carrier system and Carrier pickup is awaited.

**Delivering** - sent by MDelivery to inform the Service provider the Carrier picked up the order and the delivery process is started.

**Delivered** - sent by MDelivery to inform the Service provider the Carrier finished the delivery process and the order is delivered to the Receiver.

**Confirmed** - sent by MDelivery to inform the Service provider the Receiver confirmed the order is delivered.

**Problem** - sent by MDelivery to inform the Service provider that a delivery problem occurred during the shipment. The details explaining the problem can be seen in the Message.

**Returning** - sent by MDelivery to inform the Service provider that the order was not delivered and is on the way to be returned to the pickup point.

**Returned** - sent by MDelivery to inform the Service provider that the order was not delivered and was already returned to the pickup point.

**Note!** MDelivery notifies the Customer via MNotify regarding relevant delivery statuses.

Notifications regarding Order payment and/or other Order processing steps can be sent by the System Provider via MNotify if necessary.
