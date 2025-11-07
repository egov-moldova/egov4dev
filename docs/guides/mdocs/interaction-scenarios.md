## Document exchange between systems

Here is a short description of document exchange between systems:

1. The source system uploads the blob (view API references).
2. After the blob uploading, the input system publishes the document to the destination system (view API references).
3. For document publishing, it is used urn:md:system:id-system-destination
4. If the document has a parent folder, on publishing, the folder id is indicated as parent folder.
5. The document will be published in the root if no folder id is indicated
6. Also, the system can publish more documents into a folder, indicating the folder id as destination.
7. The destination system is notified about the availability and id of the created document.
8. The document publishing is done both for the owner of the document and for other identities.

## Sharing documents between identities

The created documents can be shared with different permissions, so that the client must be able to share the document for one or more identities, provided that share cannot have higher permissions than document.

1. The user will share a document, where from <= to and to > now (view API references).
2. Having a previously reserved share (knowing its ID), a client will share a document using this reservation (view API references).
3. The client will list the shares made for him (optionally, if authorized, for the specified principal parameter) ([cview API references).
4. The client will list the shares made by him (optionally, if authorized, for the specified principal parameter) (view API references).
