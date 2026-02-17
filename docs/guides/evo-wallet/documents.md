This section describes the data elements for several known document types. The Encoding column references CBOR data types.

## Moldovan Personal Identification Data

Moldovan PID includes data elements from the identity card and residence information.

Namespace: **md.gov.wallet**  
DocType: **md.gov.wallet.pid.1**

| Identifier | Definition | Encoding |
|---|---|---|
| idnp | IDNP | tstr |
| family_name | Family name | tstr |
| given_name | Given names | tstr |
| sex | Sex | uint |
| nationality | Nationality | tstr |
| birth_date | Date of birth | full-date |
| age_over_18 | 18 age attestation | bool |
| age_over_21 | 21 age attestation | bool |
| portrait | Portrait of the document holder | bstr |
| signature | Signature specimen of the document holder | bstr |
| resident_address | Full place of residence and/or contact, represented as one string. Includes country, region, city, street, house number, block and flat. Optional. | tstr |
| resident_country_name | Country of residence. Optional. | tstr |
| resident_region | Region of residence. Optional. | tstr |
| resident_city | City of residence. Optional. | tstr |
| resident_street | Street of residence. Optional. | tstr |
| resident_house_number | Residence houser number. Optional. | tstr |
| resident_block | Residence block. Optional. | tstr |
| resident_flat | Residence flat. Optional. | tstr |
| issue_date | Date of issue | full-date |
| expiry_date | Date of expiry. Optional. | full-date |
| issuing_authority | Issuing authority | tstr |
| document_type | Document type | tstr |
| document_series | Document series | tstr |
| document_number | Document number | tstr |

## Moldovan Driver License

Moldovan DL includes data elements from driver license.

Namespace: **md.gov.wallet** 
DocType: **md.gov.wallet.dl.1**

| Identifier | Definition | Encoding |
|---|---|---|
| idnp | IDNP | tstr |
| family_name | Family name | tstr |
| given_name | Given names | tstr |
| birth_date | Date of birth | full-date |
| age_over_18 | Attesting whether the User to whom the person identification data relates is currently an adult (true) or a minor (false). | bool |
| age_over_21 | Attesting whether the User to whom the person identification data relates is currently over (true) or under (false) 21 years of age. | bool |
| birth_country | The name of the country of birth. Optional. | tstr |
| birth_city | The name of the municipality, city, town, or village of birth. Optional. | tstr |
| issue_date | Date of issue | full-date |
| expiry_date | Date of expiry. Optional. | full-date |
| issuing_authority | Issuing authority | tstr |
| document_number | Document number | tstr |
| portrait | Portrait of the document holder | bstr |
| signature | Signature specimen of the document holder. Optional. | bstr |
| driving_privileges | A list of categories of vehicles, including restrictions or conditions. See below. | array |

Each element of **driving_privileges** array has the following fields:

| Identifier | Definition | Encoding |
|---|---|---|
| vehicle_category_code | Vehicle category code as per ISO/IEC 18013-1 Annex B | tstr |
| issue_date | Date of issue. Optional. | full-date |
| expiry_date | Date of expiry. Optional. | full-date |
| codes | Array of restrictions or conditions. See below | array |

Each element of **codes** array has the following fields:

| Identifier | Definition | Encoding |
|---|---|---|
| code | Code as per ISO/IEC 18013-2 Annex A. | tstr |
| sign | Sign as per ISO/IEC 18013-2 Annex A. Optional. | tstr |
| value | Value as per ISO/IEC 18013-2 Annex A. Optional. | tstr |

## Moldovan Vehicle Registration Certificate

Moldovan VRC includes data elements from vehicle registration certificate.

Namespace: **md.gov.wallet**  
DocType: **md.gov.wallet.vrc.1**

| Identifier | Definition | Encoding |
|---|---|---|
| plate_number | Vehicle plate number | tstr |
| idnv | Vehicle IDNV | tstr |
| vin | Vehicle VIN. Optional. | tstr |
| make | Vehicle Make | tstr |
| model | Vehicle Model | tstr |
| color | Vehicle Color | tstr |
| category | Vehicle Category | tstr |
| year | Vehicle manufacturing year | uint |
| body_number | Vehicle body number. Optional. | tstr |
| body_type | Vehicle body type | tstr |
| chassis_number | Vehicle chassis number. Optional. | tstr |
| engine_volume | Vehicle engine volume, in cm3 | tstr |
| engine_type | Vehicle engine type | tstr |
| engine_number | Vehicle engine number. Optional. | Tstr |
| authorized_weight | Vehicle authorized weight | uint |
| weight | Vehicle weight | uint |
| places | Vehicle number of places | uint |
| idnp | Owner IDNP | tstr |
| family_name | Owner family name | tstr |
| given_name | Owner given names | tstr |
| address | Owner address | tstr |
| vehicle_right | Vehicle rights specification | tstr |
| special_remarks | An array of special remarks. Optional. | tstr[] |
| issue_date | Date of issue | full-date |
| expiry_date | Date of expiry. Optional. | full-date |
| issuing_authority | Issuing authority | tstr |
| document_number | Document number | tstr |

## European Personal Identification Data

Moldovan PID includes data elements from the identity card and residence information.

Namespace: **eu.europa.ec.eudi.pid.1**  
DocType: **eu.europa.ec.eudi.pid.1**

| Identifier | Definition | Encoding |
|---|---|---|
| family_name | Family name | tstr |
| given_name | Given names | tstr |
| birth_date | Date of birth | full-date |
| age_over_18 | Attesting whether the User to whom the person identification data relates is currently an adult (true) or a minor (false). | bool |
| age_over_21 | Attesting whether the User to whom the person identification data relates is currently over (true) or under (false) 21 years of age. | bool |
| place_of_birth | Place of birth. See below. | object |
| nationality | One or more alpha-2 country codes as specified in ISO 3166-1, representing the nationality. | tstr |
| resident_address | Full place of residence and/or contact, represented as one string. Includes country, region, city, street, house number, block and flat. Optional. | tstr |
| resident_country | The country where the user to whom the person identification data relates currently resides, as an alpha-2 country code as specified in ISO 3166-1. Optional. | tstr |
| resident_state | The state, province, district, or local area where the user to whom the person identification data relates currently resides. Optional. | tstr |
| resident_city | The municipality, city, town, or village where the user to whom the person identification data relates currently resides. Optional. | tstr |
| resident_postal_code | The postal code of the place where the user to whom the person identification data relates currently resides. Optional. | tstr |
| resident_street | The name of the street where the user to whom the person identification data relates currently resides. Optional. | tstr |
| resident_house_number | The house number where the user to whom the person identification data relates currently resides, including any affix or suffix. Optional. | tstr |
| portrait | Facial image of the wallet user compliant with ISO 19794-5 or ISO 39794 specifications. | bstr |
| sex | Values shall be one of the following: 0 = not known; 1 = male; 2 = female; 3 = other; 4 = inter; 5 = diverse; 6 = open; 9 = not applicable. For values 0, 1, 2 and 9, ISO/IEC 5218 applies. | uint |
| expiry_date | Date of expiry. Optional. | full-date |
| issuing_authority | Issuing authority | tstr |
| issuing_country | Issuing country |  |
| document_number | Document identifier (complete, series and number) | tstr |

The **place_of_birth** object has the following fields:

| Identifier | Definition | Encoding |
|---|---|---|
| country | A single alpha-2 country code as specified in ISO 3166-1. Optional. | tstr |
| region | The name of a state, province, district, or local area. Optional. | tstr |
| locality | The name of a municipality, city, town, or village. Optional. | tstr |

## ISO Mobile Driver License

ISO mDL includes data elements from driver license.

Namespace: **org.iso.18013.5.1**  
DocType: **org.iso.18013.5.1.mDL**

| Identifier | Definition | Encoding |
|---|---|---|
| family_name | Family name | tstr |
| given_name | Given names | tstr |
| birth_date | Date of birth | full-date |
| age_over_18 | Attesting whether the User to whom the person identification data relates is currently an adult (true) or a minor (false). | bool |
| age_over_21 | Attesting whether the User to whom the person identification data relates is currently over (true) or under (false) 21 years of age. | bool |
| issue_date | Date of issue | full-date |
| expiry_date | Date of expiry. Optional. | full-date |
| issuing_authority | Issuing authority | tstr |
| document_number | Document number | tstr |
| portrait | Portrait of the document holder | bstr |
| driving_privileges | A list of categories of vehicles, including restrictions or conditions. See below. | array |
| un_distinguishing_sign | Distinguishing sign of the issuing country according to ISO/IEC 18013-1:2018, Annex F. | tstr |

Each element of **driving_privileges** array has the following fields:

| Identifier | Definition | Encoding |
|---|---|---|
| vehicle_category_code | Vehicle category code as per ISO/IEC 18013-1 Annex B | tstr |
| issue_date | Date of issue. Optional. | full-date |
| expiry_date | Date of expiry. Optional. | full-date |
| codes | Array of restrictions or conditions. See below | array |

Each element of **codes** array has the following fields:

| Identifier | Definition | Encoding |
|---|---|---|
| code | Code as per ISO/IEC 18013-2 Annex A. | tstr |
| sign | Sign as per ISO/IEC 18013-2 Annex A. Optional. | tstr |
| value | Value as per ISO/IEC 18013-2 Annex A. Optional. | tstr |
