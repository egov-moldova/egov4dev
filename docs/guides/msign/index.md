#Introduction

MSign is a reusable and shared platform-level service the main scope of which is to facilitate the use of digital signature and simplify integrations with various digital signature instruments.
This document describes the technical interfaces exposed by MSign for information systems that will use MSign as digital signature provider and verification utility. Its target audience is the development teams for those information systems.
The document contains all of the relevant information required for a complete understanding of MSign from the integration point of view. It contains integrations development details, security considerations and an API reference.
This document is also accompanied by a .NET sample that exemplify the main interaction scenario, i.e. requesting digital signature for a batch of contents.

##**Scope and target audience**
This document describes the technical interfaces exposed by MSign for information systems that will use MSign as digital signatures provider and verification utility. Its target audience is the development teams for those information systems.
The details related to various digital signature instruments integrated with MSign are out of scope of this document.

##**Notations**
This document contains several notation styles; the following details the styles that have a degree of significance beyond the purpose of communicating information:
<br><span class="highlight-text-yellow">Yellow Highlighted Text</span> – Text that is highlighted in yellow irrespective of font attributes (font type, italics, bold, underlined, etc.) means that the text is waiting clarification or verification.
<br><span class="red-bold-text">Red Bold Text</span> – Text that is red in color and bold, defines an important piece of information that must be read.
<br>***Italic Bold Text*** – Text that is bold and italic detail actual information or scripts that need to be executed, created, and copied from or to.
<br>~~Strikethrough Text~~ – Text which is outdated and should be ignored

##**Glossary of terms**

<table>
    <thead>
         <tr>
            <th><strong>Term</strong></th>
            <th><strong>Definition</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th><strong>PAdES</strong></th>
            <td>PDF Advanced Electronic Signatures</td>
        </tr>
        <tr>
            <th><strong>PAdES-T</strong></th>
            <td>PAdES with timestamp field</td>
        </tr>
        <tr>
            <th><strong>SOAP</strong></th>
            <td>Simple Object Access Protocol</td>
        </tr>
        <tr>
            <th><strong>XAdES</strong></th>
            <td>XML Advanced Electronic Signatures</td>
        </tr>
        <tr>
            <th><strong>XAdES-T</strong></th>
            <td>XAdES with timestamp field</td>
        </tr>
    </tbody>
</table>

##**General system capabilities**

MSign is a reusable and shared platform-level service the main scope of which is to facilitate the use of digital signature and simplify integrations with various digital signature instruments.
MSign is used as intermediary between various information systems and digital signature instrument providers. Digital signature providers differ significantly from the integration point of view, exposing various APIs that might involve direct user interaction through the browser to access user’s cryptographic device or use of cryptographic devices that are not directly connected to user’s PC. MSign integrates with these providers, hides the differences and exposes a single unified interface to information systems that require digital signature integration.
For actual signing, MSign exposes web pages that guide the user through digital signature instrument selection, instrument specific data input, actual signing progress and signing process result pages.
For digital signature verification, MSign exposes a verification web service which integrates with various certification authorities to perform the actual verification, including certificate revocation checks.

##**Service dependencies**
MSign depends on the digital signature providers, so its availability and performance is directly influenced by the availability and performance delivered by the providers.

##**Protocols and standards**

MSign exposes WS-I Basic Profile 1.1 interoperable service over HTTPS which corresponds to basicHttpBinding in WCF. MSign uses SOAP faults for error reporting.