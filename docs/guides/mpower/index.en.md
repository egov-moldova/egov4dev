MPower is a public portal intended for natural persons and legal entities, both public and private, through which powers of representation can be granted, revoked, renounced, and verified.
MPower provides the capability to verify whether the authorized person (representative) is empowered to act on behalf of another natural person or legal entity (represented) whom they represent.

## At a glance

**What it is.** The government register of powers of representation: where a natural person or legal entity grants, views, revokes or renounces another party's right to act on their behalf. The integrating system need not manage powers of attorney itself — it asks MPower whether the representative holds the invoked power, for the relevant authorisation type. Authorisation types are defined together with the service provider, according to the services it delivers.

**Legal basis.** HG nr. 375/2020 cu privire la serviciul guvernamental de împuterniciri electronice (MPower) — pct. 3 — desemnarea posesorului și deținătorului.

Related acts: Codul civil (reprezentarea); HG nr. 1090/2013 (MPass); HG nr. 405/2014 (MSign).

**Who is accountable.**

| Role | Entity |
|---|---|
| Holder (posesor) | eGov Moldova |
| Keeper (deținător) | eGov Moldova |
| Technical operator (operator tehnico-tehnologic) | STISC |

**Roles in an integration.**

- eGov Moldova — holder/keeper of the platform; signs the integration agreement and registers the integrating system.
- STISC — issues the system certificate required for staging and production; operates the hosting infrastructure.
- Holder of the integrating system — decides the purpose and legal basis of use, the access rights, and is accountable for compliance.
- Development/integration team — implements and tests the technical integration.
- End user — the natural person or legal entity benefiting from the service.

**Access conditions.**

Gratuit. Obligatoriu: certificat de sistem emis de STISC și înregistrat de eGov Moldova în MPass, pentru accesul la componenta MPower Clients API.

**Who this guide is for.**

Primary: development and integration teams of the holders of information systems, public and private.
Secondary: project managers and compliance officers preparing the agreement with EGA and the STISC certificate.

## Jump right in

<div class="quick-links-wrapper">
  <div class="quick-links-container">
    <a href="process/" class="quick-link-card">
      <div class="quick-link-icon">⚡</div>
      <h3 class="quick-link-title">Connection steps</h3>
      <p class="quick-link-description">Get started with integration</p>
    </a>
    <a href="integration-development/" class="quick-link-card">
      <div class="quick-link-icon">📘</div>
      <h3 class="quick-link-title">Integration guide</h3>
      <p class="quick-link-description">Step-by-step documentation</p>
    </a>
    <a href="api-reference/" class="quick-link-card">
      <div class="quick-link-icon">🌐</div>
      <h3 class="quick-link-title">API reference</h3>
      <p class="quick-link-description">Explore endpoints and callbacks</p>
    </a>    
  </div>
</div>

To access the MPower Clients API component, you must use the system authentication certificate issued by STISC and registered by eGov Moldova in MPass

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
