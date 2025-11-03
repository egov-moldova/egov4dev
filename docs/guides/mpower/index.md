# Overview

MPower is a public portal intended for natural persons and legal entities, both public and private, through which powers of representation can be granted, revoked, renounced, and verified.
MPower provides the capability to verify whether the authorized person (representative) is empowered to act on behalf of another natural person or legal entity (represented) whom they represent.

# Quick start for integrators

To access the MPower Clients API component, you must use the system authentication certificate issued by STISC and registered by AGE in MPass

## Constraints
The service depends on the digital identity of third-party systems.

## Terminology

<table>
    <thead>
         <tr>
            <th><strong>Term</strong></th>
            <th><strong>Definition</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th><strong>Power of Representation (IR)</strong></th>
            <td>A unilateral legal act of a natural person or a legal entity under public or private law (the represented), created within the MPower information system, by which they authorize another person (the representative) to represent them and act in relation to third parties, in their name and on their behalf.</td>
        </tr>
        <tr>
            <th><strong>Authorization type</strong></th>
            <td>The list of types of authorizations for which powers of representation can be granted through MPower.</td>
        </tr>
        <tr>
            <th><strong>Represented</strong></th>
            <td>The natural person or legal entity under public or private law who uses the MPower information system to grant, view, or revoke a power of representation.</td>
        </tr>
        <tr>
            <th><strong>Representative</strong></th>
            <td>The natural person who, based on a power of representation created via MPower, is authorized to act on behalf of the represented person.</td>
        </tr>
        <tr>
            <th><strong>Co-signer</strong></th>
            <td>A natural person, as a third party, who uses MPower when granting powers of representation issued by the Represented to the Representative. Exists only for certain authorization types.</td>
        </tr>
        <tr>
            <th><strong>Service provider</strong></th>
            <td>The legal entity under public or private law for whom, in the context of the services they provide, specific authorization types need to be defined.</td>
        </tr>
        <tr>
            <th><strong>MPower Portal</strong></th>
            <td>The public registry of powers of representation intended for the general public.</td>
        </tr>
        <tr>
            <th><strong>MPower Admin</strong></th>
            <td>The administration application for MPower. A portal for MPower administrators.</td>
        </tr>
        <tr>
            <th><strong>Application</strong></th>
            <td>MPower</td>
        </tr>
        <tr>
            <th><strong>IDNP</strong></th>
            <td>Unique identification number for natural persons (in the Republic of Moldova).</td>
        </tr>
        <tr>
            <th><strong>IDNO</strong></th>
            <td>Unique identification number for legal entities (in the Republic of Moldova).</td>
        </tr>
        <tr>
            <th><strong>Template</strong></th>
            <td>Defines the text displayed to the user when creating a power of representation based on the selected authorization type.</td>
        </tr>
    </tbody>
</table>
