# Moldovan Unified Design System – MUD

## 1. Despre MUD & resurse disponibile

### Ce este MUD și de ce a fost creat

MUD (Moldovan Unified Design System) este standardul național de design pentru toate soluțiile web și mobile utilizate de autoritățile publice din Republica Moldova. Sistemul a fost dezvoltat de Agenția de Guvernare Electronică pentru a rezolva problema fragmentării designului în serviciile digitale guvernamentale și pentru a asigura o experiență unitară, coerentă și accesibilă pentru toți cetățenii.

Până la apariția MUD, fiecare instituție publică dezvolta interfețe după propriile standarde, rezultând în confuzie pentru utilizatori, costuri crescute de dezvoltare și mentenanță, și o experiență inconsistentă în interacțiunea cu serviciile de stat. MUD standardizează componentele UI, paletele de culori, tipografia, spacing-ul și pattern-urile de interacțiune, permițând echipelor să se concentreze pe funcționalitate în loc de reinventarea designului de bază.

### Cui i se adresează

MUD este obligatoriu pentru toate instituțiile publice din Republica Moldova care dezvoltă sau modernizează resurse și sisteme informaționale de stat. De asemenea, toate companiile private care dezvoltă soluții digitale pentru instituțiile guvernamentale trebuie să utilizeze MUD în proiectele lor.

Sistemul se adresează designerilor UI/UX, dezvoltatorilor frontend, managerilor de produs, arhitecților de soluții și specialiștilor TIC care lucrează la proiecte digitale guvernamentale.

### Beneficii directe

Utilizarea MUD aduce beneficii concrete atât pentru echipele de dezvoltare, cât și pentru utilizatorii finali. Timpul de dezvoltare se reduce semnificativ prin reutilizarea componentelor pre-construite și testate. Costurile de mentenanță scad datorită standardizării și actualizărilor centralizate. Calitatea produselor crește prin aplicarea best practices de accesibilitate și usability încorporate în sistem.

Pentru utilizatorii finali, MUD garantează o experiență familială și predictibilă în toate serviciile digitale guvernamentale, reducând curba de învățare și facilitând adoptarea serviciilor digitale. Accesibilitatea îmbunătățită asigură că serviciile sunt utilizabile de către persoanele cu dizabilități.

### Resurse disponibile

| Resursă | Descriere | Link | Status |
|---------|-----------|------|--------|
| **Figma files** | Biblioteca completă de componente, stiluri și pattern-uri. Acces Guest (fără cont necesar). Conține toate componentele UI, sistemul de culori, tipografia, iconițele, spacing tokens și exemple de layout-uri. | [Acces Figma](https://mud.egov.md) | ✅ Disponibil |
| **Git repository** | Implementarea completă a componentelor MUD în HTML/CSS,gata de utilizare. Toate componentele sunt responsive, cross-browser compatible și respectă WCAG 2.1 AA. | [Acces GitLab](https://github.com/egov-moldova/design-system) | 🔄 Disponibil 80% |
| **MudBlazor components** | Bibliotecă oficială de componente MUD pentru dezvoltatorii care lucrează cu Blazor framework in mediul .NET. | În dezvoltare | 🔄 Disponibil în 2026 |

#### Ghid de utilizare pe roluri

| Rolul tău | Ce resursă folosești | Pentru ce | Ai nevoie de cont? |
|-----------|---------------------|-----------|-------------------|
| **Manager de proiect / Product Owner** | Figma Design Library | Pentru a vizualiza componentele disponibile, a înțelege capabilitățile sistemului și a coordona cu echipa de design | ❌ Nu (acces Guest) |
| **Designer UX/UI** | Figma Design Library | Pentru a crea mockup-uri și prototipuri folosind componentele MUD, a menține consistența vizuală | ❌ Nu (acces Guest suficient pentru copiere în propriul fișier) |
| **Developer Frontend** | Git Repository HTML/CSS | Pentru a implementa interfețele folosind componentele gata făcute HTML/CSS | ✅ Da (cont GitLab pentru clonare) |
| **Developer Full-stack** | Git Repository HTML/CSS | Pentru a integra componentele MUD în aplicații complexe | ✅ Da (cont GitLab pentru clonare) |
| **Specialist TIC / Coordonator tehnic** | Figma + Git Repository | Pentru a înțelege atât aspectul vizual cât și implementarea tehnică, a face bridge între echipe | ❌ Nu pentru Figma<br>✅ Da pentru GitLab |

---

## 2. Acces rapid la resurse

### 2.1 Figma File

**Link direct:** [Acces Figma](https://mud.egov.md)

Fișierul Figma este configurat pentru acces public în modul Guest. Pur și simplu deschideți link-ul în browser și veți avea acces instant la toate componentele. În modul Guest puteți naviga prin fișier, inspeta proprietățile componentelor, copia stiluri și exporta assets. Nu puteți edita fișierul original, dar puteți copia componentele în propriul vostru fișier Figma.

Fișierul este organizat pe mai multe pagini:

- **Cover** - introducere și versiune
- **Foundation** - culori, tipografie, spacing, shadows, borders
- **Components** - toate componentele UI organizate pe categorii
- **Patterns** - pattern-uri complexe și template-uri de pagini
- **Icons** - biblioteca completă de iconițe
- **Examples** - exemple de ecrane complete pentru scenarii tipice

Fiecare componentă are variante pentru toate stările posibile (default, hover, focus, disabled, error) și pentru toate dimensiunile disponibile. Componentele sunt construite cu Auto Layout pentru a facilita redimensionarea și adaptarea.

### 2.2 Git Repository

**Link direct:** [Acces GitLab](https://github.com/egov-moldova/design-system)

Repository-ul este organizat astfel:
```
/src/components   - toate componentele individuale
/src/styles       - variabilele CSS, tokens și stilurile globale
/src/assets       - iconițele și alte resurse statice
/dist             - versiunile compilate ready for production
/examples         - exemple de utilizare pentru fiecare componentă
```

Fișierul `README.md` din root conține instrucțiuni detaliate de instalare și comenzi disponibile. Fișierul `CHANGELOG.md` documentează toate schimbările între versiuni.

---

## 3. Reguli de utilizare

### 3.1 Când este obligatorie utilizarea MUD

Utilizarea MUD este obligatorie pentru toate resursele și sistemele informaționale de stat dezvoltate sau modernizate după lansare. Aceasta include:

- Site-uri web instituționale
- Portale de servicii
- Aplicații mobile
- Sisteme back-office accesibile funcționarilor publici
- Orice altă interfață digitală destinată utilizării de către cetățeni sau angajați ai instituțiilor publice

⚠️ Pentru proiectele în curs de dezvoltare la momentul lansării MUD, obligativitatea se aplică la următoarea iterație majoră sau refresh de design. Pentru sistemele existente, se recomandă migrarea treptată la MUD, prioritizând secțiunile cu trafic mare sau cele care necesită oricum modernizare.

Companiile private care dezvoltă soluții pentru instituțiile guvernamentale trebuie să includă utilizarea MUD în ofertele tehnice și să asigure conformitatea în toate livrabilele.

### 3.2 Ce poți modifica și ce nu

#### Nu poți modifica:

- Structura de bază
- Sistemul de culori guvernamental (primary colors)
- Spacing tokens
- Tipografia de bază (font families și scale)
- Dimensiunile standard ale componentelor
- Pattern-urile de accesibilitate

#### Poți personaliza:

- Culori secundare și accent pentru branding instituțional specific (în limitele ghidului de brand guvernamental)
- Conținut și copy
- Layout-ul paginilor (folosind grid-ul și componentele standard)
- Imagini și ilustrații specifice instituției
- Componente custom suplimentare care nu există în MUD (cu condiția să respecte principiile generale de design)

⚠️ Dacă aveți nevoie de o componentă care nu există în MUD sau doriți să modificați o componentă existentă pentru un use case specific, contactați echipa MUD pentru a discuta posibilitatea adăugării în sistemul principal. În multe cazuri, nevoia dumneavoastră specifică poate fi relevantă și pentru alte instituții.

### 3.3 Procedura de coordonare design (când e necesară)

Coordonarea cu AGE este necesară în următoarele situații:

- Când doriți să creați componente complet noi care nu există în MUD
- Când trebuie să modificați semnificativ o componentă existentă pentru un use case specific
- Când dezvoltați un pattern complex care combină multiple componente într-un mod nou
- Când aveți îndoieli legate de interpretarea regulilor de brand guvernamental

Pentru coordonare, trimiteți un email la suport@egov.md cu:

- Descrierea use case-ului
- Mockup-uri sau wireframe-uri ale soluției propuse
- Explicația de ce componentele existente nu sunt suficiente

Echipa MUD va răspunde în maximum 5 zile lucrătoare cu feedback și recomandări.

⚠️ Nu este necesară coordonarea pentru:
    - Utilizarea standard a componentelor existente
    - Personalizări minore de culori în limitele permise
    - Layout-uri custom folosind componentele standard
    - Adăugarea de conținut specific instituției

### 3.4 Integrare cu framework-uri - responsabilitatea dezvoltatorului

Componentele MUD sunt furnizate în HTML/CSS vanilla pentru a asigura compatibilitatea maximă. Integrarea cu framework-uri moderne (React, Vue, Angular, etc.) este responsabilitatea echipelor de dezvoltare care lucrează cu aceste tehnologii.

Procesul tipic de integrare presupune:

1. **Importarea design tokens** (variabile CSS/SCSS pentru culori, spacing, tipografie, shadows etc.)
2. **Importarea stilurilor CSS** din MUD
3. **Crearea de wrapper components** în framework-ul dorit care aplică clasele CSS corespunzătoare
4. **Utilizarea token-urilor** în loc de valori hardcodate pentru spacing, culori, font sizes
5. **Adaptarea pattern-urilor interactive** pentru a funcționa cu state management-ul specific framework-ului

Comunitatea dezvoltatorilor este încurajată să împărtășească implementările lor pentru diverse framework-uri. Dacă ați creat o bibliotecă de componente MUD pentru un framework popular, contactați-ne pentru a o lista în secțiunea de resurse comunitare.

⚠️ AGE dezvoltă oficial o bibliotecă de componente MUD pentru Blazor/MudBlazor care va fi disponibilă în 2026. Până atunci, puteți folosi componentele HTML/CSS standard în Blazor sau puteți crea propriile componente Blazor bazate pe stilurile MUD.

---

## 4. Workflow de implementare

Un proiect tipic care utilizează MUD urmează acest workflow:

### Faza 1: Design în Figma

Designerul deschide fișierul MUD în Figma (acces Guest) și creează un nou fișier pentru proiect. Componentele necesare se copiază din biblioteca MUD în noul fișier. Designerul construiește ecranele aplicației folosind componentele MUD, personalizând doar elementele permise (culori instituționale, conținut, imagini). Layout-ul se creează folosind grid-ul și spacing tokens din MUD pentru a asigura consistența.

### Faza 2: Frontend development

Dezvoltatorul clonează repository-ul MUD de pe GitLab și setează structura de bază a proiectului. Componentele necesare se integrează în proiect (fie prin copiere directă, fie prin npm install din GitLab). Dezvoltatorul implementează layout-urile și funcționalitatea conform design-urilor din Figma, folosind clasele CSS și structura HTML din documentația componentelor.

Pentru componente interactive, JavaScript-ul minimal necesar este inclus în repository. Pentru interacțiuni complexe specifice aplicației, dezvoltatorul extinde comportamentul de bază respectând pattern-urile stabilite.

### Faza 3: Testing și optimizare

Testați aplicația pe toate browserele suportate (Chrome, Firefox, Safari, Edge) și pe dispozitive mobile. Verificați accesibilitatea folosind instrumente automate (axe, WAVE) și testare manuală cu screen readers. Optimizați performance-ul prin eliminarea CSS-ului nefolosit și lazy loading pentru componente complexe.

### Exemplu practic: Formular de contact

#### În Figma:

Designerul deschide biblioteca MUD și identifică componentele necesare:

- Input Text
- Text Area
- Button Primary
- Checkbox
- Form layout grid

Creează un nou frame în fișierul proiectului și aranjează componentele conform layout-ului dorit, aplicând spacing-ul standard (8px grid). Adaugă labels, placeholder text și mesaje de eroare conform ghidului de content.

#### În cod:

Dezvoltatorul găsește în `/src/components/forms` toate componentele necesare. Copiază HTML-ul pentru fiecare componentă și îl adaptează cu conținutul specific.

Importă stilurile:
```css
@import 'mud/components/forms/input.css';
@import 'mud/components/forms/textarea.css';
@import 'mud/components/buttons/button.css';
```

Adaugă validare JavaScript folosind pattern-ul din `/examples/form-validation.js`. Testează toate stările: focus, error, disabled, success.

---

## 5. Întrebări frecvente (FAQ)

### Pot folosi MUD pentru proiecte non-guvernamentale?

MUD este dezvoltat specific pentru sectorul guvernamental din Moldova și utilizarea lui este obligatorie pentru proiectele de stat. Pentru proiecte private sau comerciale, puteți folosi MUD ca inspirație sau punct de plecare, dar nu există obligativitate. Totuși, vă încurajăm să respectați principiile de accesibilitate și usability încorporate în sistem indiferent de tipul proiectului.

### Cum obțin actualizări când MUD se schimbă?

MUD este versionat semantic (major.minor.patch). Verificați periodic fișierul `CHANGELOG.md` din repository pentru a vedea ce s-a schimbat. Pentru actualizări majore care pot include breaking changes, AGE va comunica în avans prin canalele oficiale și va oferi ghiduri de migrare.

Dacă folosiți MUD prin npm, puteți actualiza cu:
```bash
npm update mud-design-system
```

Pentru Figma, componentele se actualizează automat în fișierul principal - va trebui să copiați din nou componentele modificate în proiectele voastre.

### Ce fac dacă componentele nu acoperă cazul meu de utilizare?

Primul pas este să verificați dacă puteți rezolva problema combinând componentele existente într-un pattern nou. Consultați secțiunea Patterns din Figma pentru inspirație.

Dacă nu există o soluție viabilă, aveți două opțiuni:

1. Creați o componentă custom care respectă principiile MUD (culori, spacing, tipografie) și folosiți-o în proiectul vostru
2. Contactați echipa MUD la suport@egov.md pentru a propune adăugarea unei noi componente în sistem. Includeți descrierea use case-ului și mockup-uri ale soluției propuse.

### Cum raportez un bug sau sugerez îmbunătățiri?

- **Pentru bug-uri tehnice** în componentele din GitLab, deschideți un Issue în repository cu descriere detaliată, browser/device info și screenshot-uri dacă e relevant
- **Pentru probleme de design** sau sugestii de îmbunătățiri, trimiteți email la suport@egov.md cu detalii clare despre problema identificată și impactul ei
- **Pentru discuții generale** și întrebări, puteți folosi secțiunea Discussions din GitLab

### Trebuie să cer aprobare pentru fiecare implementare?

Nu. Dacă folosiți componentele MUD conform documentației și regulilor de utilizare, nu este necesară nicio aprobare. Coordonarea cu AGE este necesară doar în cazurile specificate la punctul 3.3:

- Componente complet noi
- Modificări majore ale componentelor existente
- Interpretări ambigue ale brand guidelines

### Pot contribui cu componente noi?

Da, AGE încurajează contribuțiile din partea comunității. Dacă ați dezvoltat o componentă care respectă principiile MUD și credeți că ar fi utilă și altor proiecte guvernamentale, trimiteți un Pull Request în repository cu:

- Componenta
- Documentația
- Exemple de utilizare

Echipa MUD va revizui contribuția și, dacă este aprobată, o va include în versiunea următoare. Contributorii vor fi creditați în fișierul `CONTRIBUTORS.md`.

---

## 6. Resurse suplimentare

- **Recording webinar de lansare:** [Vezi webinar pe YouTube](https://www.youtube.com/watch?v=74V-IXQqqY8) - acoperă o prezentare completă a sistemului, demonstrații live și Q&A
- **Webinar prezentare:** [Vezi prezentare în Figma](https://www.figma.com/files/team/1298534698218536546/project/496799860/EGOV-Figma-Slides-presentation?fuid=1143863019910488123)

Pentru întrebări tehnice complexe, coordonare design sau cazuri excepționale care nu sunt acoperite de documentație:

- **Email:** suport@egov.md
- **Timp de răspuns:** 5 zile lucrătoare
- **Program:** Luni-Vineri, 09:00-18:00

⚠️ Vă rugăm să folosiți acest contact doar pentru situații care nu pot fi rezolvate prin documentația existentă, FAQ sau Issues pe GitLab. Înainte de a contacta suportul, verificați că ați consultat toate resursele disponibile.
