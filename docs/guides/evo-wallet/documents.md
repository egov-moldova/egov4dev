Această secțiune descrie elementele de date pentru câteva tipuri de documente cunoscute. Coloana Encoding face referire la tipurile de date CBOR.

## Datele de identificare personală moldovenești

PID moldovenesc include elemente de date din cartea de identitate și informații de reședință.

Namespace: **md.gov.wallet**  
DocType: **md.gov.wallet.pid.1**

| Identifier | Definition | Encoding |
|---|---|---|
| idnp | Numărul unic al persoanei | tstr |
| family_name | Numele de familie | tstr |
| given_name | Prenumele | tstr |
| sex | Sexul | uint |
| nationality | Cetățenia | tstr |
| birth_date | Data nașterii | full-date |
| age_over_18 | Atestarea vârstei de 18 ani | bool |
| age_over_21 | Atestarea vârstei de 21 ani | bool |
| portrait | Portretul titularului documentului | bstr |
| signature | Specimenul de semnătură al titularului documentului | bstr |
| resident_address | Adresa completă de reședință și/sau contact, reprezentată ca un singur șir de caractere. Include țara, regiunea, orașul, strada, numărul casei, blocul și apartamentul. Opțional. | tstr |
| resident_country | Țara de reședință, ca și cod de țară alpha-2 conform ISO 3166-1. Opțional. | tstr |
| resident_region | Regiunea de reședință. Opțional. | tstr |
| resident_city | Orașul de reședință. Opțional. | tstr |
| resident_street | Strada de reședință. Opțional. | tstr |
| resident_house_number | Numărul casei de reședință. Opțional. | tstr |
| resident_block | Blocul de reședință. Opțional. | tstr |
| resident_flat | Apartamentul de reședință. Opțional. | tstr |
| issue_date | Data eliberării | full-date |
| expiry_date | Data expirării. Opțional. | full-date |
| issuing_authority | Autoritatea emitentă | tstr |
| document_type | Tipul documentului | tstr |
| document_series | Seria documentului | tstr |
| document_number | Numărul documentului | tstr |

## Permisul de conducere moldovenesc

DL moldovenesc include elemente de date din permisul de conducere.

Namespace: **md.gov.wallet** 
DocType: **md.gov.wallet.dl.1**

| Identifier | Definition | Encoding |
|---|---|---|
| idnp | Numărul unic al persoanei | tstr |
| family_name | Numele de familie | tstr |
| given_name | Prenumele | tstr |
| birth_date | Data nașterii | full-date |
| age_over_18 | Atestă dacă conducătorul auto este în prezent major (true) sau minor (false). | bool |
| age_over_21 | Atestă dacă conducătorul auto are în prezent peste (true) sau sub (false) 21 de ani. | bool |
| birth_country | Denumirea țării de naștere. Opțional. | tstr |
| birth_city | Denumirea localității, orașului sau satului de naștere. Opțional. | tstr |
| issue_date | Data eliberării | full-date |
| expiry_date | Data expirării. Opțional. | full-date |
| issuing_authority | Autoritatea emitentă | tstr |
| document_number | Numărul documentului | tstr |
| portrait | Portretul titularului documentului | bstr |
| signature | Specimenul de semnătură al titularului documentului. Opțional. | bstr |
| driving_privileges | O listă de categorii de vehicule, incluzând restricțiile sau condițiile. A se vedea mai jos. | array |

Fiecare element al array-ului **driving_privileges** are următoarele câmpuri:

| Identifier | Definition | Encoding |
|---|---|---|
| vehicle_category_code | Codul categoriei de vehicul conform ISO/IEC 18013-1 Anexa B | tstr |
| issue_date | Data eliberării. Opțional. | full-date |
| expiry_date | Data expirării. Opțional. | full-date |
| codes | Array de restricții sau condiții. A se vedea mai jos | array |

Fiecare element al array-ului **codes** are următoarele câmpuri:

| Identifier | Definition | Encoding |
|---|---|---|
| code | Cod conform ISO/IEC 18013-2 Anexa A. | tstr |
| sign | Semn conform ISO/IEC 18013-2 Anexa A. Opțional. | tstr |
| value | Valoare conform ISO/IEC 18013-2 Anexa A. Opțional. | tstr |

## Certificatul de înmatriculare a vehiculului moldovenesc

VRC moldovenesc include elemente de date din certificatul de înmatriculare a vehiculului.

Namespace: **md.gov.wallet**  
DocType: **md.gov.wallet.vrc.1**

| Identifier | Definition | Encoding |
|---|---|---|
| plate_number | Numărul de înmatriculare al vehiculului | tstr |
| idnv | IDNV-ul vehiculului | tstr |
| vin | VIN-ul vehiculului. Opțional. | tstr |
| make | Marca vehiculului | tstr |
| model | Modelul vehiculului | tstr |
| color | Culoarea vehiculului | tstr |
| category | Categoria vehiculului | tstr |
| year | Anul de fabricație al vehiculului | uint |
| body_number | Numărul caroseriei vehiculului. Opțional. | tstr |
| body_type | Tipul caroseriei vehiculului | tstr |
| chassis_number | Numărul șasiului vehiculului. Opțional. | tstr |
| engine_volume | Capacitatea cilindrică a motorului vehiculului, în cm3 | tstr |
| engine_type | Tipul motorului vehiculului | tstr |
| engine_number | Numărul motorului vehiculului. Opțional. | Tstr |
| authorized_weight | Masa totală autorizată a vehiculului | uint |
| weight | Masa vehiculului | uint |
| places | Numărul de locuri al vehiculului | uint |
| idnp | IDNP-ul proprietarului | tstr |
| family_name | Numele de familie al proprietarului | tstr |
| given_name | Prenumele proprietarului | tstr |
| address | Adresa proprietarului | tstr |
| vehicle_right | Specificația dreptului asupra vehiculului | tstr |
| special_remarks | Un array de mențiuni speciale. Opțional. | tstr[] |
| issue_date | Data eliberării | full-date |
| expiry_date | Data expirării. Opțional. | full-date |
| issuing_authority | Autoritatea emitentă | tstr |
| document_number | Numărul documentului | tstr |

## Datele de identificare personală europene

PID moldovenesc include elemente de date din cartea de identitate și informații de reședință.

Namespace: **eu.europa.ec.eudi.pid.1**  
DocType: **eu.europa.ec.eudi.pid.1**

| Identifier | Definition | Encoding |
|---|---|---|
| family_name | Numele de familie | tstr |
| given_name | Prenumele | tstr |
| birth_date | Data nașterii | full-date |
| place_of_birth | Locul nașterii. A se vedea mai jos. | object |
| nationality | Unul sau mai multe coduri de țară alpha-2 conform ISO 3166-1, reprezentând cetățenia. | tstr |
| resident_address | Adresa completă de reședință și/sau contact, reprezentată ca un singur șir de caractere. Include țara, regiunea, orașul, strada, numărul casei, blocul și apartamentul. Opțional. | tstr |
| resident_country | Țara în care își are în prezent reședința utilizatorul căruia îi aparțin datele de identificare a persoanei, ca și cod de țară alpha-2 conform ISO 3166-1. Opțional. | tstr |
| resident_state | Statul, provincia, districtul sau zona locală în care își are în prezent reședința utilizatorul căruia îi aparțin datele de identificare a persoanei. Opțional. | tstr |
| resident_city | Localitatea, orașul sau satul în care își are în prezent reședința utilizatorul căruia îi aparțin datele de identificare a persoanei. Opțional. | tstr |
| resident_postal_code | Codul poștal al locului în care își are în prezent reședința utilizatorul căruia îi aparțin datele de identificare a persoanei. Opțional. | tstr |
| resident_street | Denumirea străzii în care își are în prezent reședința utilizatorul căruia îi aparțin datele de identificare a persoanei. Opțional. | tstr |
| resident_house_number | Numărul casei în care își are în prezent reședința utilizatorul căruia îi aparțin datele de identificare a persoanei, inclusiv orice prefix sau sufix. Opțional. | tstr |
| personal_administrative_number | O valoare atribuită persoanei fizice, unică printre toate numerele administrative personale emise de furnizorul datelor de identificare a persoanei. În cazul Moldovei, aceasta corespunde IDNP-ului. Opțional. | tstr |
| portrait | Imaginea facială a utilizatorului portofelului, conformă cu specificațiile ISO 19794-5 sau ISO 39794. | bstr |
| sex | Valorile trebuie să fie una dintre următoarele: 0 = necunoscut; 1 = masculin; 2 = feminin; 3 = altul; 4 = inter; 5 = divers; 6 = deschis; 9 = nu se aplică. Pentru valorile 0, 1, 2 și 9, se aplică ISO/IEC 5218. | uint |
| expiry_date | Data expirării. Opțional. | full-date |
| issuing_authority | Autoritatea emitentă | tstr |
| issuing_country | Țara emitentă |  |
| document_number | Identificatorul documentului (complet, serie și număr) | tstr |

Obiectul **place_of_birth** are următoarele câmpuri:

| Identifier | Definition | Encoding |
|---|---|---|
| country | Un singur cod de țară alpha-2 conform ISO 3166-1. Opțional. | tstr |
| region | Denumirea unui stat, provincii, district sau zone locale. Opțional. | tstr |
| locality | Denumirea unei localități, oraș sau sat. Opțional. | tstr |

## Permisul de conducere mobil ISO

mDL ISO include elemente de date din permisul de conducere.

Namespace: **org.iso.18013.5.1**  
DocType: **org.iso.18013.5.1.mDL**

| Identifier | Definition | Encoding |
|---|---|---|
| family_name | Numele de familie | tstr |
| given_name | Prenumele | tstr |
| birth_date | Data nașterii | full-date |
| age_over_18 | Atestă dacă conducătorul auto este în prezent major (true) sau minor (false). | bool |
| age_over_21 | Atestă dacă conducătorul auto are în prezent peste (true) sau sub (false) 21 de ani. | bool |
| issue_date | Data eliberării | full-date |
| expiry_date | Data expirării. Opțional. | full-date |
| issuing_authority | Autoritatea emitentă | tstr |
| document_number | Numărul documentului | tstr |
| portrait | Portretul titularului documentului | bstr |
| driving_privileges | O listă de categorii de vehicule, incluzând restricțiile sau condițiile. A se vedea mai jos. | array |
| un_distinguishing_sign | Semnul distinctiv al țării emitente conform ISO/IEC 18013-1:2018, Anexa F. | tstr |

Fiecare element al array-ului **driving_privileges** are următoarele câmpuri:

| Identifier | Definition | Encoding |
|---|---|---|
| vehicle_category_code | Codul categoriei de vehicul conform ISO/IEC 18013-1 Anexa B | tstr |
| issue_date | Data eliberării. Opțional. | full-date |
| expiry_date | Data expirării. Opțional. | full-date |
| codes | Array de restricții sau condiții. A se vedea mai jos | array |

Fiecare element al array-ului **codes** are următoarele câmpuri:

| Identifier | Definition | Encoding |
|---|---|---|
| code | Cod conform ISO/IEC 18013-2 Anexa A. | tstr |
| sign | Semn conform ISO/IEC 18013-2 Anexa A. Opțional. | tstr |
| value | Valoare conform ISO/IEC 18013-2 Anexa A. Opțional. | tstr |
