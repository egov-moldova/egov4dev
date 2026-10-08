## 1. Submit connection request

Complete the onboarding form:

[Connect your institution to eAppointment](https://forms.office.com/e/p8n69by5NZ)

## 2. Verify system registration in MPass

Check whether the integrating system is already registered in **MPass (staging environment)**.

If already registered, provide:

- System name
- Certificate serial number

## 3. Obtain system certificate

[Request a **system authentication certificate** from **STISC**](https://semnatura.md/order/system-certificate)

The API uses mutual TLS, so this certificate is the client certificate your system presents on every call (see [Authentication](api-reference.md#authentication)).

## 4. System configuration

The integration team will:

- Register the system in **MPass**
- Add the system certificate as a service authorized to call the **eAppointment API**

## 5. Implement API integration

Integrate your system with the **eAppointment REST API**. See the [API reference](api-reference.md) and the [examples](examples.md).

## 6. Perform testing

Integration must be tested in the **staging environment**.

## 7. Production activation

After successful validation, production access will be enabled. Production uses different credentials than staging.
