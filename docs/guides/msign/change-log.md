# Change Log

## **Date: September 15, 2020**

!!!note "Version: 1.7"
Changed test platform address from testmsign.gov.md to msign.staging.egov.md

## **Date: April 11, 2016**

!!!note "Version: 1.6"
ExpectedSigner.ID is now not required for PDF signing. If not provided, it will be entered by the user on each signature request, so providing it is highly recommended.

## **Date: March 9, 2015**
!!!note "Version: 1.5"
Added Expired SignStatus.  
Added optional Language property to VerificationRequest and changed Message property in VerificationResult from VerificationMessage to a simple string.  
Added optional language parameter to GetSignResponse and added Message property to SignResponse.

## **Date: November 13, 2014**
!!!note "Version: 1.4"
Added Instrument and lang parameters to forms integration. Added sample SOAP messages

## **Date: August 7, 2014**
!!!note "Version: 1.3"
Added SignRequest.SignatureReason field

## **Date: July 16, 2014**
!!!note "Version: 1.2"
Fixed some typos and added some clarifications

## **Date: April 22, 2014**
!!!note "Version: 1.1"
Added SignedAt member to VerificationCertificate structure

## **Date: March 19, 2014**
!!!note "Version: 1.0"
Completed Glossary of terms

## **Date: January 30, 2014**
!!!note "Version: 0.4"
Added signature verification operation, test cases and structures

## **Date: November 8, 2013**
!!!note "Version: 0.3"
SignResponse.Results is now also returned for Failed requests

## **Date: October 15, 2013**
!!!note "Version: 0.2"
Added Pdf as ContentType and MultipleSignatures field

## **Date: May 27, 2013**
!!!note "Version: 0.1"
Initial version
