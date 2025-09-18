#API Reference

##**Error handling rules**

For errors resulted for SOAP interface invocations, MSign returns SOAP faults with fault codes and fault reasons describing the fault in plain English. If there is no SOAP fault returned by MSign, the service consumer should expect that the returned operation result, according to MSign service contract, is valid and can be used directly without additional error checking.

Note that a SignResponse contains SignStatus, which can have Pending, Failure or Expired values, meaning there is are no signing Results returned.

<table>
  <thead>
    <tr>
      <th>Fault Code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>AuthenticationFailed</td>
      <td>Service consumer authentication process failed. See Authentication</td>
    </tr>
    <tr>
      <td>AuthorizationFailed</td>
      <td>Service consumer authorization process failed. See Authorization</td>
    </tr>
    <tr>
      <td>InvalidParameter</td>
      <td>Some input parameter is invalid. Please review the returned Fault Reason text and called operation description.</td>
    </tr>
    <tr>
      <td>RequestNotFound</td>
      <td>The provided requestID when calling GetSignResponse was not found by MSign. It might be incorrect or expired (i.e. removed from online DB).</td>
    </tr>
  </tbody>
</table>

The consumers using programming languages that support try… catch blocks, catching framework specific SOAP Fault exceptions is the correct way to handle service invocation errors.

##**Service operations**

###**PostSignRequest**

<table>
  <tbody>
    <tr>
      <td><strong>Signature</strong></td>
      <td>PostSignRequest(request: SignRequest): string</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td>Post a signature request for later signing.</td>
    </tr>
    <tr>
      <td><strong>Returns</strong></td>
      <td>A string representing the request ID that can be later used with GetSignResponse.</td>
    </tr>
  </tbody>
</table>

**Input parameters**

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>request</td>
      <td>SignRequest</td>
      <td>A structure representing the signature request.</td>
    </tr>
  </tbody>
</table>

**Faults**

<table>
  <thead>
    <tr>
      <th>Code</th>
      <th>Reason</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>AuthenticationFailed</td>
      <td>Invalid authentication certificate provided, Unknown service consumer: {certificate serial number}</td>
    </tr>
    <tr>
      <td>InvalidParameter</td>
      <td>Some input parameter is invalid. Please review the returned Fault Reason text and called operation description.</td>
    </tr>
  </tbody>
</table>

###**GetSignResponse**

<table>
  <tbody>
    <tr>
      <td><strong>Signature</strong></td>
      <td>GetSignResponse(requestID: string, language: string): SignResponse</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td>Get the status and result of the related signature request.</td>
    </tr>
    <tr>
      <td><strong>Returns</strong></td>
      <td>A structure that contains the status and signature results.</td>
    </tr>
  </tbody>
</table>

**Input parameters**

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>requestID</td>
      <td>string</td>
      <td>The ID of SignRequest posted earlier using PostSignRequest operation.</td>
    </tr>
    <tr>
      <td>language</td>
      <td>string</td>
      <td>The language to be used for response localization. Allowed values: “ro”, “ru”, “en”. For backward compatibility, this parameter is optional and the default value is “ro”.</td>
    </tr>
  </tbody>
</table>

**Faults**

<table>
  <thead>
    <tr>
      <th>Code</th>
      <th>Reason</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>AuthenticationFailed</td>
      <td>Invalid authentication certificate provided, Unknown or unregistered system: {certificate serial number}</td>
    </tr>
    <tr>
      <td>AuthorizationFailed</td>
      <td>This signature request was not initiated by this system</td>
    </tr>
    <tr>
      <td>InvalidParameter</td>
      <td>Some input parameter is invalid. Please review the returned Fault Reason text and called operation description</td>
    </tr>
    <tr>
      <td>RequestNotFound</td>
      <td>Cannot find such request</td>
    </tr>
  </tbody>
</table>

###**VerifySignatures**

<table>
  <tbody>
    <tr>
      <td><strong>Signature</strong></td>
      <td>VerifySignatures(request: VerificationRequest): VerificationResponse</td>
    </tr>
    <tr>
      <td><strong>Description</strong></td>
      <td>Request signature verification. Due to the fact that the process of verification might take more time than expected, it is advised to invoke this operation asynchronously so that the invoking application does not appear as blocked.</td>
    </tr>
    <tr>
      <td><strong>Returns</strong></td>
      <td>A structure that contains the result and signature verification.</td>
    </tr>
  </tbody>
</table>

**Input parameters**

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>request</td>
      <td>VerificationRequest</td>
      <td>A structure representing the verification request.</td>
    </tr>
  </tbody>
</table>

**Faults**

<table>
  <thead>
    <tr>
      <th>Code</th>
      <th>Reason</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>AuthenticationFailed</td>
      <td>Invalid authentication certificate provided or Unknown service consumer: {certificate serial number}</td>
    </tr>
    <tr>
      <td>InvalidParameter</td>
      <td>Some input parameter is invalid. Please review the returned Fault Reason text and called operation description.</td>
    </tr>
    <tr>
      <td>RequestNotFound</td>
      <td>Cannot find such request</td>
    </tr>
  </tbody>
</table>

##**Structures**

<span class="red-bold-text">Important.</span> The order in which the members are described below is for description purposes only. The order of the elements in the actual XML structures, as defined in WSDL, is alphabetical. To get a correct implementation, it is recommended to use an automatic conversion tool from WSDL to your programming language or environment.

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
    <tr><td colspan="4"><strong>SignRequest</strong></td></tr>
    <tr>
      <td>ContentDescription</td>
      <td>string (512)</td>
      <td>Optional, default: same as ShortContentDescription</td>
      <td>The description of the content to be signed. Displayed by MSing web pages.</td>
    </tr>
    <tr>
      <td>ShortContentDescription</td>
      <td>string (90)</td>
      <td>Required</td>
      <td>The short description of the content to be signed. Displayed by mobile phone if Mobile Signature is used.</td>
    </tr>
    <tr>
      <td>SignatureReason</td>
      <td>string (255)</td>
      <td>Optional</td>
      <td>The reason for signature, e.g. Resolution, Approved, Reviewed, etc. Currently applicable to PDF only.</td>
    </tr>
    <tr>
      <td>ContentType</td>
      <td>ContentType enumeration</td>
      <td>Required</td>
      <td>The type of the content to be signed.</td>
    </tr>
    <tr>
      <td>Contents</td>
      <td>Array of SignContent</td>
      <td>Required, at least one element</td>
      <td>The actual batch of contents to be signed.</td>
    </tr>
    <tr>
      <td>ExpectedSigner</td>
      <td>ExpectedSigner</td>
      <td>Optional</td>
      <td>If provided, MSign will verify the actual signer to match the provided information.</td>
    </tr>
    <tr><td colspan="4"><strong>SignResponse</strong></td></tr>
    <tr>
      <td>Status</td>
      <td>SignStatus enumeration</td>
      <td>Required</td>
      <td>Signature request status</td>
    </tr>
    <tr>
      <td>Message</td>
      <td>string (100)</td>
      <td>Optional, returned for requests that have Failure or Expired status</td>
      <td>Signature request failure message, localized according to language parameter.</td>
    </tr>
    <tr>
      <td>Results</td>
      <td>Array of SignResult</td>
      <td>Available when Status is not Pending</td>
      <td>Signature results for the requested signature request.</td>
    </tr>
    <tr><td colspan="4"><strong>VerificationRequest</strong></td></tr>
    <tr>
      <td>SignedContentType</td>
      <td>ContentType enumeration</td>
      <td>Required</td>
      <td>The type of the content that was previously signed.</td>
    </tr>
    <tr>
      <td>Language</td>
      <td>string (2)</td>
      <td>Optional, default: ro</td>
      <td>The language to be used for response localization. Allowed values: “ro”, “ru”, “en”</td>
    </tr>
    <tr>
      <td>Contents</td>
      <td>Array of VerificationContent</td>
      <td>Required, at least one element</td>
      <td>The actual batch of signatures to be verified.</td>
    </tr>
    <tr><td colspan="4"><strong>VerificationResponse</strong></td></tr>
    <tr>
      <td>Results</td>
      <td>Array of VerificationResult</td>
      <td>Required</td>
      <td>Verification results for the verification request.</td>
    </tr>
    <tr><td colspan="4"><strong>SignRequest</strong></td></tr>
    <tr>
      <td>CorrelationID</td>
      <td>string (36)</td>
      <td>Optional</td>
      <td>The correlation ID for this content. Must be unique within a signature request.</td>
    </tr>
    <tr>
      <td>MultipleSignatures</td>
      <td>Bool</td>
      <td>Optional, default: false</td>
      <td>Specifies if the content could have multiple signatures (i.e. it can be co-signed). Currently, this setting applies only to PDF.</td>
    </tr>
    <tr>
      <td>Name</td>
      <td>string (256)</td>
      <td>Optional</td>
      <td>Name of the PDF file, for Hash this property is redundant.</td>
    </tr>
    <tr>
      <td>Content</td>
      <td>Array of byte</td>
      <td>Required</td>
      <td>The actual content to be signed. Currently this can be 20-bytes SHA1 hash or a PDF file.</td>
    </tr>
    <tr><td colspan="4"><strong>ExpectedSigner</strong></td></tr>
    <tr>
      <td>ID</td>
      <td>String</td>
      <td>Required</td>
      <td>Personal identifier number of the expected signer.
      <br>Note that if not provided, user will be asked to enter it when signing PDF using mobile signature.</td>
    </tr>
    <tr>
      <td>DelegatorType</td>
      <td>DelegatorType enumeration</td>
      <td>Optional, default: None</td>
      <td>The type of the delegator.</td>
    </tr>
    <tr>
      <td>DelegatorID</td>
      <td>String</td>
      <td>Required when DelegatorType is not None</td>
      <td>The identifier of the person or organization that the expected signer can represent (is delegated by).</td>
    </tr>
    <tr>
      <td>DelegatedRoleID</td>
      <td>Int</td>
      <td>Optional, default: 0</td>
      <td>The role of the expected signer in relationship with the delegator.</td>
    </tr>
    <tr><td colspan="4"><strong>SignResult</strong></td></tr>
    <tr>
      <td>CorrelationID</td>
      <td>string (36)</td>
      <td>Returned as in SignContent</td>
      <td>The correlation ID for the signed content, as originally given in SignContent.</td>
    </tr>
    <tr>
      <td>Certificate</td>
      <td>Array of byte</td>
      <td>Optional, present if signature succeeded</td>
      <td>Certificate of the signer in X509 v3 format.</td>
    </tr>
    <tr>
      <td>Signature</td>
      <td>Array of byte</td>
      <td>Optional, present if signature succeeded</td>
      <td>For hash content type this is the actual digital signature in XAdES-T format, for PDF content type - the signed PDF document.</td>
    </tr>
    <tr><td colspan="4"><strong>VerificationContent</strong></td></tr>
    <tr>
      <td>CorrelationID</td>
      <td>string (36)</td>
      <td>Optional</td>
      <td>The correlation ID for this content. Must be unique within a verification request.</td>
    </tr>
    <tr>
      <td>Content</td>
      <td>Array of byte</td>
      <td>Required only for Hash content.</td>
      <td>The hash that was originally signed. Note that this parameter is required only for checking hash signatures. Its value is required for complete signature verification.</td>
    </tr>
    <tr>
      <td>Signature</td>
      <td>Array of byte</td>
      <td>Required</td>
      <td>The actual signature to be verified. This must be a XAdES or signed PDF.</td>
    </tr>
    <tr><td colspan="4"><strong>VerificationResult</strong></td></tr>
    <tr>
      <td>CorrelationID</td>
      <td>string (36)</td>
      <td>Returned as in VerificationContent</td>
      <td>The correlation ID for the verification content, as originally given in VerificationContent.</td>
    </tr>
     <tr>
      <td>SignaturesValid</td>
      <td>Bool</td>
      <td>Required</td>
      <td>Returned as true if all signatures applied to the content are valid.</td>
    </tr>
     <tr>
      <td>Message</td>
      <td>string (100)</td>
      <td>Required</td>
      <td>Verification result message, localized according to VerificationRequest.Language.</td>
    </tr>
     <tr>
      <td>Certificates</td>
      <td>Array of VerificationCertificate</td>
      <td>Optional, present if any certificates where identified in the signature</td>
      <td>The list of certificates (one for signed hash in XAdES case) of the signers. Returned for display purposes.</td>
    </tr>
    <tr><td colspan="4"><strong>VerificationCertificate</strong></td></tr>
    <tr>
      <td>SignatureValid</td>
      <td>Bool</td>
      <td>Required</td>
      <td>Returned as true if the signature corresponding to this certificate is valid.</td>
    </tr>
    <tr>
      <td>Subject</td>
      <td>string (250)</td>
      <td>Required</td>
      <td>Subject details from certificate. Returned as convenience for display purposes.</td>
    </tr>
    <tr>
      <td>Certificate</td>
      <td>Array of byte</td>
      <td>Required</td>
      <td>Certificate of the signer in X509 v3 format.</td>
    </tr>
    <tr>
      <td>SignedAt</td>
      <td>Datetime</td>
      <td>Optional</td>
      <td>Date and time of the signature. Returned only if a valid timestamp was applied.</td>
    </tr>
  </tbody>
</table>

##**Enumerations**

<table>
  <thead>
    <tr>
      <th><strong>Member</strong></th>
      <th><strong>Description</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="2"><strong>ContentType</strong></td>
    </tr>
    <tr>
      <td>Hash</td>
      <td>The content to be signed is a SHA1 hash.</td>
    </tr>
    <tr>
      <td>Pdf</td>
      <td>The content to be signed is a PDF file.</td>
    </tr>
    <tr>
      <td colspan="2"><strong>DelegatorType</strong></td>
    </tr>
    <tr>
      <td>None</td>
      <td>There is no delegator.</td>
    </tr>
    <tr>
      <td>Person</td>
      <td>The delegator is a person.</td>
    </tr>
     <tr>
      <td>Organization</td>
      <td>The delegator is an organization.</td>
    </tr>
    <tr>
      <td colspan="2"><strong>SignStatus</strong></td>
    </tr>
    <tr>
      <td>Pending</td>
      <td>The signing is pending.</td>
    </tr>
    <tr>
      <td>Success</td>
      <td>The signing is finished and the signature is valid.</td>
    </tr>
    <tr>
      <td>Failure</td>
      <td>The signing failed. The signature request is now invalid.</td>
    </tr>
    <tr>
      <td>Expired</td>
      <td>The signature request is expired. The signature request is now invalid.</td>
    </tr>
  </tbody>
</table>

##**Web forms integration**

###**Signing request**

<table>
  <tbody>
    <tr>
      <td><strong>Method<strong></td>
      <td>POST (recommended) or GET</td>
    </tr>
    <tr>
      <td><strong>URL<strong></td>
      <td><a htef="https://msign.gov.md/{requestID}">https://msign.gov.md/{requestID}</a></td>
    </tr>
    <tr>
      <td><strong>Description<strong></td>
      <td>Direct user to perform the actual signing. Notice that the requestID is embedded in the method URL</td>
    </tr>
  </tbody>
</table>

**Form or URL parameters**

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Required/Optional</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ReturnUrl</td>
      <td>string</td>
      <td>Required</td>
      <td>The URL that will receive the result of transaction signing</td>
    </tr>
    <tr>
      <td>Instrument</td>
      <td>string</td>
      <td>Optional and not recommended</td>
      <td>The signing instrument to be used, i.e. skipping signing instrument selection page. Allowed values: “mobile”, “moldsign”, “nationalid”, “securesign”, “tax”.
      <br> Note that for “mobile” instrument to work without instrument selection, you have to provide MSISDN and ExpectedSigner.ID of the expected signer.</td>
    </tr>
    <tr>
      <td>MSISDN</td>
      <td>string containing digits</td>
      <td>Optional</td>
      <td>The mobile phone number of the expected signer, if known</td>
    </tr>
    <tr>
      <td>RelayState</td>
      <td>string</td>
      <td>Optional</td>
      <td>Optional string that will be returned back unmodified after signing</td>
    </tr>
    <tr>
      <td>lang</td>
      <td>string</td>
      <td>Optional</td>
      <td>Language to be used by MSign user interface. Allowed values: “ro”, “ru”, “en”</td>
    </tr>
  </tbody>
</table>

###**Signing callback**

<table>
  <tbody>
    <tr>
      <td><strong>Method<strong></td>
      <td>POST</td>
    </tr>
    <tr>
      <td><strong>URL<strong></td>
      <td>The provided ReturnUrl in the signing request</td>
    </tr>
    <tr>
      <td><strong>Description<strong></td>
      <td>Redirects user to the information system that requested the signature, while informing the system about finished SignRequest processing. This Url is open only after the result of the signing is known (i.e. SignStatus is either Failure or Success).</td>
    </tr>
  </tbody>
</table>

**Form parameters**

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Required/Optional</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>RequestID</td>
      <td>string</td>
      <td>Required</td>
      <td>The ID of the finished SignRequest</td>
    </tr>
    <tr>
      <td>RelayState</td>
      <td>string</td>
      <td>Optional and not recommended</td>
      <td>The unmodified value of RelayState, as sent in request</td>
    </tr>
  </tbody>
</table>


##**SOAP message samples**

!!! note "Manual implementation"

We will present here samples of exchanged SOAP messages. This might be useful for those that integrate with MSign but do not fully support WSDL-based service proxy generation.

###**Method: PostSignRequest**

=== "request.xml"

    ```xml
    <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
      <s:Header>
        <Action s:mustUnderstand="1" xmlns="http://schemas.microsoft.com/ws/2005/05/addressing/none">https://msign.gov.md/IMSign/PostSignRequest</Action>
      </s:Header>
      <s:Body>
        <PostSignRequest xmlns="https://msign.gov.md">
          <request xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
            <ContentDescription>Sample long description</ContentDescription>
            <ContentType>Hash</ContentType>
            <Contents>
              <SignContent>
                <Content>ZhKVycv51rL2QoQUUEqN7tMCBkE=</Content>
                <CorrelationID>3408cc344e474a529f3425176a75d08e</CorrelationID>
              </SignContent>
            </Contents>
            <ShortContentDescription>MSign Sample.</ShortContentDescription>
          </request>
        </PostSignRequest>
      </s:Body>
    </s:Envelope>
    ```

=== "response.xml"

    ```xml
    <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
      <s:Body>
        <PostSignRequestResponse xmlns="https://msign.gov.md">
          <PostSignRequestResult>eec7709d372b41109e2ea3e200e99727</PostSignRequestResult>
        </PostSignRequestResponse>
      </s:Body>
    </s:Envelope>
    ```

###**Method: GetSignResponse**

=== "request.xml"

    ```xml
    <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
      <s:Header>
        <Action s:mustUnderstand="1" xmlns="http://schemas.microsoft.com/ws/2005/05/addressing/none">https://msign.gov.md/IMSign/GetSignResponse</Action>
      </s:Header>
      <s:Body>
        <GetSignResponse xmlns="https://msign.gov.md">
          <requestID>eec7709d372b41109e2ea3e200e99727</requestID>
          <language>en</language> 
        </GetSignResponse> 
      </s:Body> 
    </s:Envelope>

    ```

=== "response.xml"

    ```xml
    <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
      <s:Body>
        <GetSignResponseResponse xmlns="https://msign.gov.md">
          <GetSignResponseResult xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
            <Results>
              <SignResult>
                <Certificate>MIIG… </Certificate>
                <CorrelationID>3408cc344e474a529f3425176a75d08e</CorrelationID>
                <Signature>PD94… </Signature>
              </SignResult>
            </Results>
            <Status>Success</Status>
          </GetSignResponseResult>
        </GetSignResponseResponse>
      </s:Body>
    </s:Envelope>
    ```

###**Method: VerifySignatures**

=== "request.xml"

    ```xml
    <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
      <s:Header>
        <Action s:mustUnderstand="1" xmlns="http://schemas.microsoft.com/ws/2005/05/addressing/none">https://msign.gov.md/IMSign/VerifySignatures</Action>
      </s:Header>
      <s:Body>
        <VerifySignatures xmlns="https://msign.gov.md">
          <request xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
            <Contents>
              <VerificationContent>
                <Content>ZhKVycv51rL2QoQUUEqN7tMCBkE=</Content>
                <CorrelationID>bd73ed7eabc44ab290b18181a9e7fd2b</CorrelationID>
                <Signature>PD94… </Signature>
              </VerificationContent>
            </Contents>
            <Language>en</Language>
            <SignedContentType>Hash</SignedContentType>
          </request>
        </VerifySignatures>
      </s:Body>
    </s:Envelope>
    ```

=== "response.xml"

    ```xml
    <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
      <s:Body>
        <VerifySignaturesResponse xmlns="https://msign.gov.md">
          <VerifySignaturesResult xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
            <Results>
              <VerificationResult>
                <Certificates>
                  <VerificationCertificate>
                    <Certificate>MIIG… </Certificate>
                    <SignatureValid>true</SignatureValid>
                    <Subject>O=Centrul de Guvernare Electronică (e-government) 1010600034203, OU=IT, C=MD, PostalCode=MD-2033, T=Functia, STREET=Piața Marii Adunări Naționale 1, Phone=022250234, S=Republica Moldova, L=Chișinău, SERIALNUMBER=IDNP, CN=Nume Prenume</Subject>
                  </VerificationCertificate>
                </Certificates>
                <CorrelationID>bd73ed7eabc44ab290b18181a9e7fd2b</CorrelationID>
                <Message>The signature is valid</Message>
                <SignaturesValid>true</SignaturesValid>
              </VerificationResult>
            </Results>
          </VerifySignaturesResult>
        </VerifySignaturesResponse>
      </s:Body>
    </s:Envelope>
    ```
