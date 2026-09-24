# What is PDSE

PDSE (Platforma de Digitalizare a Serviciilor Electronice / Electronic Services Digitalization Platform) is a development framework that provides **reusable components** and integration libraries for the rapid design and development of digital public services.

## In brief

**What it is.** The common development framework on which institutions build their electronic public services: reusable interface components aligned with the Unitary Design Model (MUD), flow components (data queries, payment, signing, delivery, apostille) and integration libraries for the M-suite services, published by AGE on NuGet.
Important distinction: the owner of the platform is AGE, while the owner of the service developed on the platform remains the beneficiary institution. Using the components does not transfer to AGE the responsibility for the resulting service.

**Legal basis.** HG nr. 717/2014 (Government Decision no. 717/2014) regarding the electronic services development platform (PDSE) — item 3 — designation of the owner.

Related acts: HG nr. 677/2025 (Unitary Design Model); HG nr. 153/2021 (RRSIS — registration of the information system); HG nr. 544/2019 and the ICT Procurement Coordination Methodology.

**Who is responsible.**

| Role | Entity |
|---|---|
| Owner | AGE (for the platform). For the service developed on the platform — the beneficiary institution, as owner. |
| Holder |  |
| Technical-technological operator | STISC (technical administrator of MCloud) |

**Roles in the integration.**

- AGE — owner/holder of the platform; concludes the integration agreement and registers the integrated system.
- STISC — issues the system certificate required for connecting to the staging and production environments; operates the hosting infrastructure.
- Owner of the integrated system — decides the purpose and legal basis for use, access rights, and is responsible for compliance.
- Development/integration team — implements and tests the technical integration.
- End user — the natural person or legal entity benefiting from the service.

**Access conditions.**

The components and documentation are public on NuGet, with no prior approval required. Connecting to the staging and production environments requires a client certificate issued by STISC (distinct for each environment) and an agreement with AGE for the M-suite, as well as a separate agreement for MConnect and MPay.

**Who this guide is for.**

Primary: development and integration teams of the owners of information systems, public and private.
Secondary: project managers and compliance officers preparing the agreement with AGE and the STISC certificate.

For developing an information system on PDSE, two categories of libraries published by AGE on NuGet are available:

- **Integration libraries** — used for connecting with government services from the M-suite (MPass, MSign, MNotify, MDocs, MDelivery and others)
- **UI component libraries** — used for building interfaces and digital public service flows, aligned with the Unitary Design Model (MUD)

To use the reusable components, the following steps should be followed:

## 1. Needs analysis

Before starting development, the institution must identify:

- the flows needed within the service (querying data from state registers, processing payments, signing documents, delivering results, etc.);
- the government services with which integration is required (M-suite, MConnect, MPay, etc.).

This analysis helps in selecting the PDSE components and determining the agreements and certificates required for implementation.

## 2. Registering the development intent

For public institutions, the information system to be developed must be registered in the Registry of Information Resources and Systems ([RSI](https://rsi.gov.md/procedure)). The institution goes through the relevant stages, such as planning, budgeting, approval, procurement, and development. Registration must be carried out in accordance with the applicable procedure.

## 3. Reviewing the available components

The components and technical documentation are publicly available on [NuGet](https://www.nuget.org/profiles/egov-moldova) and require no special approvals for access or a written agreement. These libraries include:

- interface components: buttons, forms, tables, alerts, data fields, etc. (`Egov.FOD.UIComponents`);
- flow components: data querying, payment, delivery, apostille, etc. (`Egov.FOD.ServiceComponents`);
- libraries for integrating AGE services, such as MPass, MSign, MPower and others.

For access to the design files for the interface components in Figma, the institution must complete the request form, indicating the institution's name, the information system, and the technical contact person.

## 4. Integrating the components

The development team selects and integrates the required packages into the developed system, verifying version and technical requirements. Interface and flow components can be used and tested locally without any additional formalities.

> **Important:** Libraries for integrating with M-suite services can be included in the code, but actual connection to the testing (staging) and production environments requires a client certificate issued by STISC (see step 5).

## 5. Obtaining the client certificate

If the developed system integrates with one or more M-suite services, the institution must request a client certificate from STISC. Without this certificate, integration cannot be carried out in the testing (staging) or production environments.

> **Important:** The testing and production environments will be configured with distinct client certificates. For the production environment, a dedicated certificate, separate from the one used in the testing environment, will be requested from STISC.

## 6. Concluding agreements with AGE

Before using the government services, the institution concludes with AGE:

- an **agreement** for using the M-suite services (MPass, MSign, MNotify, MDocs, MDelivery, etc.);
- a **separate agreement** for MConnect and MPay, if integration with these services is required.

The agreement signing procedure is initiated by completing the [integration request form](https://forms.cloud.microsoft/pages/responsepage.aspx?id=Z4f8jWsRaEKDxfvIWTRtOHwLku9yOJZAs22J7gTUxBNUMFhISEJPMUNGOTIwV09OTkFTUUtLSk9LTS4u&route=shorturl) made available by AGE.

## 7. Testing and going live in production

After development is complete, the institution tests the developed system in the staging environment. Following validation and acceptance by AGE, the system can be launched into production. For the production launch, the dedicated client certificate for that environment, previously obtained from STISC, is used.

## 8. Updates and maintenance

AGE periodically publishes new versions of the libraries on NuGet. The institution's development team must monitor the packages used and check the information about changes (release notes) and the need to apply them directly on NuGet. Currently, AGE does not send automatic notifications about the release of new versions.
