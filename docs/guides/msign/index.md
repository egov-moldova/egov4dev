# Overview

MSign is a reusable and shared platform-level service the main scope of which is to facilitate the use of digital signature and simplify integrations with various digital signature instruments.
This document describes the technical interfaces exposed by MSign for information systems that will use MSign as digital signature provider and verification utility. Its target audience is the development teams for those information systems.
The document contains all of the relevant information required for a complete understanding of MSign from the integration point of view. It contains integrations development details, security considerations and an API reference.
This document is also accompanied by a .NET sample that exemplify the main interaction scenario, i.e. requesting digital signature for a batch of contents.

## Scope and target audience
This document describes the technical interfaces exposed by MSign for information systems that will use MSign as digital signatures provider and verification utility. Its target audience is the development teams for those information systems.
The details related to various digital signature instruments integrated with MSign are out of scope of this document.

For the complete glossary, please visit the [Glossary page](https://egov-moldova.github.io/egov4dev/glossary/glossary/).

## General system capabilities

MSign is a reusable and shared platform-level service the main scope of which is to facilitate the use of digital signature and simplify integrations with various digital signature instruments.
MSign is used as intermediary between various information systems and digital signature instrument providers. Digital signature providers differ significantly from the integration point of view, exposing various APIs that might involve direct user interaction through the browser to access user’s cryptographic device or use of cryptographic devices that are not directly connected to user’s PC. MSign integrates with these providers, hides the differences and exposes a single unified interface to information systems that require digital signature integration.
For actual signing, MSign exposes web pages that guide the user through digital signature instrument selection, instrument specific data input, actual signing progress and signing process result pages.
For digital signature verification, MSign exposes a verification web service which integrates with various certification authorities to perform the actual verification, including certificate revocation checks.

## Service dependencies
MSign depends on the digital signature providers, so its availability and performance is directly influenced by the availability and performance delivered by the providers.

## Protocols and standards

MSign exposes WS-I Basic Profile 1.1 interoperable service over HTTPS which corresponds to basicHttpBinding in WCF. MSign uses SOAP faults for error reporting.
