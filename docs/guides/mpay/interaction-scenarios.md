Because MPay integrates multiple payable e-Service providers and different payment providers that offer a variety of payment instruments, there are many ways a payer can interact with it.

## 6.1. Order and Pay Online

### Scenario Steps:

1. **Order Creation**
   - A Payer fills in and submits an order at a payable e-Service page
   - The order is persisted in e-Service database

2. **Payment Initiation**
   - e-Service order confirmation page displays a "Pay" button

3. **Redirect to MPay**
   - Clicking on this button redirects payer's browser to MPay's pay page

4. **Payment Page Request**
   - The browser posts ServiceID, OrderKey and, optionally, a ReturnUrl to MPay's pay page (see Perform chapter)

5. **Order Details Retrieval**
   - Before displaying the pay web page, MPay invokes `IServiceProvider.GetOrderDetails` operation implemented by e-Service web-service

6. **Invoice Generation**
   - Based on returned OrderDetails, MPay creates or updates an existing invoice and shows the invoice details to the payer

7. **Payment Method Selection**
   - Payer selects a payment method (instrument)
   - For bank card payments this means publishing invoice details to the appropriate card processor (which is one of the payment providers)

8. **Redirect to Payment Provider**
   - MPay redirects the browser to instrument's specific payment page

9. **Payment Details Submission**
   - Payer fills in the required payment details (such as card details) and submits the payment for authorization

10. **Payment Authorization**
    - Payment provider performs the appropriate payment authorization

11. **Redirect to Payment Result**
    - Payment provider redirects the browser to MPay's payment result page

12. **Payment Confirmation Retrieval**
    - Before displaying payment results, MPay retrieves a payment confirmation from the payment provider

13. **Payment Confirmation to e-Service**
    - If the payment is successful, MPay sends a payment confirmation to e-Service by invoking `IServiceProvider.ConfirmOrderPayment` operation implemented by e-Service web-service and displays payment results to the payer
    - **Note:** ConfirmOrderPayment call can be retried multiple times, until it succeeds. This means that all implementations must be **idempotent**, i.e. multiple calls must not be considered as multiple payments

14. **Receipt Download (Optional)**
    - Optionally, payer can download and print a payment receipt

15. **Return to e-Service (Optional)**
    - Optionally, if ReturnUrl was provided at step 4, payer can choose to return to e-Service page
    - In this case, MPay redirects the browser to the ReturnUrl

---

## 6.2. Pay an Existing Order

### Scenario Steps:

1. **Navigate to MPay**
   - Payer navigates to MPay:
     - Test: https://testmpay.gov.md
     - Production: https://mpay.gov.md

2. **Select Service**
   - Payer selects a service he has the order for

3. **Enter Order Key**
   - Payer enters the order key (such as order/request number, ticket number for fines, etc.)

4. **Continue with Standard Flow**
   - The scenario then continues with **step 5** of the "Order and Pay online" scenario with IServiceProvider implementation (except returning to ReturnUrl)
   - i.e. the order is searched by invoking `IServiceProvider.GetOrderDetails` operation

### Additional Use Case:

This scenario is also applicable when accessing **payment terminals** (just replace MPay with payment terminal in scenario description text).
