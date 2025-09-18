# MDocs – Overview

MDocs is the government platform for the storage and exchange of documents in digital format. It allows public institutions to upload, share, and access documents securely, while citizens can retrieve their documents directly via MCabinet.

The platform reduces paper usage, simplifies administrative processes, and ensures compliance with transparency and security standards. MDocs is an essential component of Moldova’s digital government ecosystem, contributing to the efficiency of public administration and the convenience of interactions between citizens, businesses, and the state.

## Executive summary
MDocs is provided as a SaaS service on the MCloud platform to implement a centralized mechanism for storing and sharing documents resulting from public services. Beneficiaries include natural persons and legal entities under public and private law.

This guide describes the technical interfaces exposed by MDocs for information systems that will use MDocs for document exchange and storage. It contains integration development details, security considerations, and an API reference, with sample REST requests and responses for the main interaction scenarios.

## Introduction
### Scope and target audience
This guide targets development teams of information systems that will use MDocs for storing and sharing documents resulting from the provision of public services.

### Structure of this guide
Recommended reading order:

- System context
- Usage (interaction) scenarios
- Integration development
- Security considerations

### Notations

- Yellow highlighted text: pending clarification or verification.
- Red bold text: important information that must be read.
- Italic bold text: concrete information or scripts that need to be executed or copied.

## Organizational context
### Service owner

- Organization: e-Governance Agency of Moldova (EGA)
- General Point of Contact: office@egov.md

## System context
### General system capabilities
The Document Hosting and Sharing Service (MDocs) provides a standardized, centralized mechanism for storing and sharing documents produced by public services, accessible to public authorities and their beneficiaries.

Key benefits:

- Centralized repository of all documents produced during public service delivery
- Standardized process for sharing documents
- Digitization for authorities lacking extensive IT solutions
- Reduced costs of delivering public services
- Encouraged electronic exchange of documents between public authorities
- Conditions for implementing electronic archives
- Efficient automatic data exchange between interacting information systems
- Integration with government platform services (MPass, MSign, MNotify, MLog, MPower, MCabinet, MDelivery, MWallet, MConnect, Semantic Catalog, Open Data Portal)
- Single intuitive user interface
- High‑performance management, configuration, and dynamic development facilities

### Protocols and standards

- Exposes **HTTP REST** interfaces
- Uses **JSON** as the message format
- 
## Concepts
### Document type

- Default document types: Unknown and folder.
- Other document types must be defined by an administrator.
- If not specified when uploading a blob, the document type defaults to Unknown.

Configuration flags:

- Official document — allow marking a document type as official (pre-defined types cannot be official)
- Permanent delete on expiration — permanently delete when expired or when deleted from Recycle Bin; an “expiring” document is one with ExpiresOn < configurable threshold (default 30 days)
- Allow anonymous document verification — permit public verification for this type
- Documents versioning — enable versioning

### Share permission
Permissions available when sharing documents or folders:

| Action | Read | Write |
|--------|------|-------|
| View file/folder | ✅ | ✅ |
| Read file/folder (hierarchy included) | ✅ | ✅ |
| Edit file/folder | ❌ | ✅ |
| Overwrite / add / remove documents | ❌ | ✅ |
| Recycle (not permanently delete) | ❌ | ✅ |

### Pagination

- page: integer — page number to display
- itemsPerPage: integer — number of items per page
- orderField: string — order list by the provided field
- searchBy: string — filter by text present in item fields

### Format

- Content-Type indicates the original media type of the resource.
- MDocs allows any MIME type for blobs, with special treatment for some types (for example, application/json .json).
- For document types with an assigned schema, the document content is validated against that schema.
