# Interaction scenarios

## 1. Document exchange between systems
Here is a short description of document exchange between systems:

1. The source system uploads the blob.
2. After uploading the blob, the source system publishes the document to the destination system.
3. For document publishing, use URN format for destination system: `urn:md:system:id-system-destination`.
4. If the document has a parent folder, indicate the folder ID as the parent when publishing.
5. If no folder ID is indicated, the document will be published in the root.
6. The system can publish multiple documents into a folder by indicating the folder ID as destination.
7. The destination system is notified about the availability and ID of the created document.
8. Document publishing is performed both for the owner of the document and for other identities.


## 2. Sharing documents between identities
The created documents can be shared with different permissions. A client must be able to share the document for one or more identities, provided that the share cannot have higher permissions than the document itself.

1. Share a document within a valid time interval (from <= to and to > now).
2. Share a document using a previously reserved share (knowing its ID).
3. List the shares made for the current principal (optionally, if authorized, for the specified `principal` parameter).
4. List the shares made by the current principal (optionally, if authorized, for the specified `principal` parameter).