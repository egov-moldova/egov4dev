# Interaction scenarios

## Signing process

The most important integration scenario with MSign is requesting to sign a batch (or a single) digital content and getting the signature(s) back after user interaction.

<span class="red-bold-text">Remark.</span> Sending a batch of digital content usually requires the user to enter the PIN for each signed content or, in the case of Mobile Signature, even to receive/send multiple SMS messages. Sending multiple contents for signing is practical only in cases when you know your users might have access to bulk messaging instruments, such as when using cryptographic tokens that cache the PIN for multiple use.

<img src="../../assets/umls/msign/interaction_scenarios/lightmode.svg" alt="Signing flow">

Here is a short description of signing process using MSign:

1. After completing a form, uploading a document to be signed (the Content), or selecting a batch of Contents, the User clicks a Sign button in its Browser.
2. The e-Service prepares the Contents to be signed and/or computes a hash of each Content.
3. The e-Service calls MSign API (**PostSignRequest** operation) with a **SignRequest** that represents a request to sign a batch of Contents.
4. MSign validates and saves the **SignRequest** for later signing and returns a generated **RequestID**.
5. E-Service instructs the Browser to show the MSign Sign Page for the provided sign request, providing a **ReturnUrl**. See Web forms integration for more details.
6. The Browser fetches the Sign Page and shows it to User.
7. The User interacts with the Sign Page to select a signing instrument and enter any data related to the selected instrument to perform the actual signing of the batch.
8. MSign saves the resulting signatures for later retrieval.
9. MSign instructs the browser to show the **ReturnUrl**, providing the **RequestID**. See Web forms integration for more details.
10. When the Browser request the page indicated by **ReturnUrl**, the e-Service requests the actual **SignResponse** from MSign API (**GetSignResponse** operation). That response contains the signatures for all Contents provided in the **SignRequest** batch.

## Verification process

MSign also exposes digital signature verification API. The verification process does not expose any user interface for integrated information systems.

To verify a batch of signatures (or a single signature), call **VerifySignatures** and provide the signature to be checked.

In the case of a **XAdES** signature (which results after signing a hash), please provide the original hash in the Content parameter and the signature (i.e. **XAdES**) in the Signature parameter. In the successful verification case, the result will contain a single certificate, i.e. the certificate of the signer.

To verify PDF file signatures (**PAdES**), just pass the signed document in the Signature parameter. In the successful verification case, the result will contain the certificates for all individual signers.

The result also contains a human readable message translated in multiple languages that the integrated systems shall display to the users.

Due to the fact that the process of verification might take more time than expected, it is advised to invoke this verification operation asynchronously so that the invoking system does not appear as blocked to the users.
