MDocs is an IT solution provided as a SaaS service based on the MCloud platform designed to implement a centralized mechanism for storing and sharing documents resulting from the provision of public services, and its beneficiaries will be natural persons and legal entities of public and private law.

This document describes the technical interfaces exposed by MDocs for information systems that will use MDocs as document exchange and storage. Its target audience is the development teams for those information systems.

The document contains all relevant information required for a complete understanding of MDocs from the integration point of view. It contains integrations development details, security considerations and an API reference.

This document also includes sample REST requests and responses that exemplify the main interaction scenario.

## Scope and target audience

This document describes the technical interfaces exposed by MDocs for information systems that will use MDocs for storing and sharing documents resulting from the provision of public services. Its target audience is the development teams for those information systems.

The details related to deciding what events are important for an information system are out of scope of this document.

## Structure of this document

This document contains the relevant information required for a complete understanding of MDocs from the integration point of view. It is also accompanied by samples that exemplify some integration scenarios using certain technologies.

The recommended reading sequence are the following chapters:

- System context
- Interaction scenarios
- Integration development
- Security considerations

The remaining chapters are for reference purpose.

## General system capabilities

The Document Hosting and Sharing Service (MDocs) is an IT solution provided as a SaaS service based on the MCloud platform designed to implement a centralized mechanism for storing and sharing documents resulting from the provision of public services, and its beneficiaries will be natural persons and legal entities of public and private law.

The provision of document hosting and sharing services will enable standardization of the processes of sharing the results of public services provided by public authorities in the Republic of Moldova through a digital platform, which will be accessible to public authorities that have not yet digitized their services.

The technological and organizational benefits of providing the file hosting and sharing tool are as follows:

- a centralized data repository of all documents delivered during the provision of public services;
- a standardized process for sharing documents related to the outcome of public service delivery;
- digitization of the document sharing process for public authorities that do not have powerful IT solutions;
- reducing the costs of delivering public services;
- encouraging electronic exchange of documents between public authorities in the Republic of Moldova;
- creating conditions for the implementation of software for the creation and management of electronic archives;
- an efficient mechanism for automatic data exchange between the information systems with which the Document Hosting and Sharing Service (MDocs) will interact;
- integration with government platform services (MPass, MSign, MNotify, MLog, MPower, MCabinet, MDelivery, MWallet, MConnect, Semantic Catalog, Open Data Portal);
- a single intuitive and ergonomic user interface;
- high-performance management, configuration and dynamic development facilities.

By providing document hosting and sharing services, the Government aims to improve public services through the digital platforms of public authorities in the Republic of Moldova and to reduce the use of paper documents by providing adequate facilities to citizens.

## Protocols and standards

**MDocs** exposes HTTP REST interface and uses JSON as message format.

## Document type

By default, there are two document types in the system: Unknown and folder.

All other kind of doc types should be defined by an administrator.

If the document type is not specified when uploading the blob, then the default is document type Unknown.

**Available configuration flags:**

| **Name** | **Description** |
|---|---|
| **Official document** | Allow the Administrator to mark a document type as official. Pre-defined document types cannot be official. |
| **Permanent delete on expiration** | Marks the document types that are completely deleted when expiring or deleted first through Recycle bin. "Expiring" document is considered if ExpiresOn is less than 30 days (configurable time span). Meaning permanent deletion on expiration. |
| **Allow anonymous document verification** | Allows public verification for documents of this type. |
| **Documents versioning** | Allows document versioning |

## Share permission

| **Description** | **Permission** | |
|---|---|---|
| | **Read** | **Write** |
| The principal can **view** the file or folder. | **Yes** | **Yes** |
| The principal can **read** the file or folder (including down the hierarchy). | **Yes** | **Yes** |
| The principal can **edit** the file or folder (including down the hierarchy). | **No** | **Yes** |
| The principal can **overwrite** the file or **add**/**remove** any document in the shared folder. | **No** | **Yes** |
| The principal can **recycle** the shared document (file/folder), but not delete it permanently. | **No** | **Yes** |

## Pagination

**Parameters**

| **Name** | **Data Type** | **Description** |
|---|---|---|
| page | integer($int32) | number of the page you want to display |
| itemsPerPage | integer($int32) | number of items to display per page |
| orderField | string | order list by the field provided |
| searchBy | string | filter list to display documents that have fields containing the provided text |

## Format

The Content-Type representation header is used to indicate the original media type of the resource (prior to any content encoding applied for sending).

Mdocs allows any MIME Types for blobs, but has special treatment for the following:

| **MIME-Type** | **Extension** |
|---|---|
| application/json | .json |

For document type with specified schema the contents of the document is validated against the schema.
