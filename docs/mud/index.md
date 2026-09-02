# Modelul Unitar de Design

## Despre sistem și resurse disponibile

### Ce este modelul și de ce a fost creat

Modelul Unitar de Design este standardul național de design pentru toate soluțiile web și mobile utilizate de autoritățile publice din Republica Moldova. Acesta a fost dezvoltat de Agenția de Guvernare Electronică pentru a rezolva problema fragmentării designului în serviciile digitale guvernamentale și pentru a asigura o experiență unitară, coerentă și accesibilă pentru toți cetățenii.

Până la apariția modelului, fiecare instituție publică dezvolta interfețe după propriile standarde, rezultând în confuzie pentru utilizatori, costuri crescute de dezvoltare și mentenanță, și o experiență inconsistentă în interacțiunea cu serviciile de stat. Modelul standardizează componentele UI, paletele de culori, tipografia, spacing-ul și pattern-urile de interacțiune, permițând echipelor să se concentreze pe funcționalitate în loc de reinventarea designului de bază.

### Cui i se adresează

Modelul Unitar de Design este obligatoriu pentru toate instituțiile publice din Republica Moldova care dezvoltă sau modernizează resurse și sisteme informaționale de stat. De asemenea, toate companiile private care dezvoltă soluții digitale pentru instituțiile guvernamentale trebuie să utilizeze modelul în proiectele lor.

Modelul se adresează designerilor UX/UI, dezvoltatorilor frontend, managerilor de produs, arhitecților de soluții și specialiștilor TIC care lucrează la proiecte digitale guvernamentale.

### Beneficii directe

Utilizarea modelului aduce beneficii concrete atât pentru echipele de dezvoltare, cât și pentru utilizatorii finali. Timpul de dezvoltare se reduce semnificativ prin reutilizarea componentelor pre-construite și testate. Costurile de mentenanță scad datorită standardizării și actualizărilor centralizate. Calitatea produselor crește prin aplicarea best practices de accesibilitate și usability încorporate în sistem.

Pentru utilizatorii finali, modelul garantează o experiență familială și predictibilă în toate serviciile digitale guvernamentale, reducând curba de învățare și facilitând adoptarea serviciilor digitale. Accesibilitatea îmbunătățită asigură că serviciile sunt utilizabile de către persoanele cu dizabilități.

### Resurse disponibile

<table>
  <thead>
    <tr>
      <th>Resursă</th>
      <th>Descriere</th>
      <th>Cum accesezi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Figma files</strong></td>
      <td>Biblioteca completă de componente, stiluri și pattern-uri. Conține toate componentele UI, sistemul de culori, tipografia, iconițele, spacing tokens și exemple de layout-uri.</td>
      <td>
        <strong>Vizualizare:</strong> <a href="https://mud.egov.md">Acces direct Guest</a><br>
        <strong>Copiere/Editare:</strong> <a href="https://forms.office.com/pages/responsepage.aspx?id=Z4f8jWsRaEKDxfvIWTRtOKF3nI_LtL9ChzbNY23lEmtUMlFHSTQ1VzQ0UTROMFlWVlBNV01DRUFBUC4u&route=shorturl">Completați formularul</a> pentru drepturi
      </td>
    </tr>
    <tr>
      <td><strong>Demo page</strong></td>
      <td>Catalog interactiv al tuturor componentelor, afișate în variantele principale și contexte responsive, cu posibilitatea de copiere rapidă a tokenilor și a fragmentelor de cod pentru utilizare.</td>
      <td><a href="https://mud.dev.egov.md/">Storybook</a></td>
    </tr>
    <tr>
      <td><strong>Git repository</strong></td>
      <td>Implementarea completă a componentelor modelului în HTML/CSS, gata de utilizare. Toate componentele sunt responsive, cross-browser compatible și respectă WCAG 2.1 AA.</td>
      <td><a href="https://github.com/egov-moldova/design-system">Acces GitHub</a></td>
    </tr>
    <tr>
      <td><strong>MudBlazor components</strong></td>
      <td>Bibliotecă oficială de componente modelului pentru dezvoltatorii care lucrează cu Blazor framework în mediul .NET.</td>
      <td><a href="https://www.nuget.org/packages/Egov.FOD.UIComponents">Librărie NuGet</a></td>
    </tr>
    <tr>
      <td><strong>Componente oficiale de brand</strong></td>
      <td>Componente oficiale de interfață pentru reprezentarea platformelor guvernamentale partajate, inclusiv:
        <ul>
            <li><strong>MPass</strong> – autentificare;</li>
            <li><strong>MSign</strong> – semnare electronică;</li>
            <li><strong>MPay</strong> – plăți electronice;</li>
            <li><strong>precum și alte sisteme și platforme guvernamentale partajate,</strong> acolo unde acestea sunt integrate și utilizate în cadrul sistemelor informaționale de stat.</li>
      </td>
      <td>
            <a href="https://drive.google.com/drive/folders/1VDL-G44x5-_A2Z3OC0qHv2If8ZfV6IJy?usp=sharing">Descarca din brand center</a><br>
            <a href="https://www.figma.com/design/doJ7tDY0PlQ0PqMgbpFVIC/Components?node-id=2925-3568&t=Zj0VxvTiD83JH4NT-4">Acess la componenta in Figma</a><br>
            <a href="https://www.figma.com/design/61kDJHJsGwfmzqmqsfkgkE/Layouts---Patterns?node-id=1429-11832&t=rb7Iqz4FX9oIB0ds-4">Acess la ghid in Figma</a>
        </td>
    </tr>
  </tbody>
</table>

#### Ghid de utilizare pe roluri

| Rolul tău | Ce resursă folosești | Note despre acces |
|-----------|---------------------|-------------------|
| **Manager de proiect / Product Owner** | Figma Design Library - vizualizare componente și coordonare cu echipa | Acces direct Guest (fără cont) |
| **Designer UX/UI** | Figma Design Library - creare mockup-uri și prototipuri | ⚠️ **Cerere acces obligatorie** prin [formular](https://forms.office.com/pages/responsepage.aspx?id=Z4f8jWsRaEKDxfvIWTRtOKF3nI_LtL9ChzbNY23lEmtUMlFHSTQ1VzQ0UTROMFlWVlBNV01DRUFBUC4u&route=shorturl) pentru copiere |
| **Developer Frontend** | Git Repository HTML/CSS - implementare interfețe | Cont GitLab necesar |
| **Developer Full-stack** | Git Repository HTML/CSS - integrare în aplicații | Cont GitLab necesar |
| **Developer Blazor** | Git Repository HTML/CSS (temporar până în 2026) | Cont GitLab necesar |
| **Specialist TIC / Coordonator tehnic** | Figma (vizualizare) + Git Repository (implementare) | Figma: direct / GitLab: cont necesar |

## Acces rapid la resurse

### Figma Files

**Link direct:** [Acces Figma](https://mud.egov.md)

Fișierele Figma sunt configurate pentru acces public în modul Guest. Pur și simplu deschideți link-ul în browser și veți avea acces instant pentru vizualizare. În modul Guest puteți naviga prin fișiere, inspecta proprietățile componentelor și exporta assets pentru referință.

**Pentru a copia componentele în propriul vostru fișier Figma**, este necesar să solicitați drepturi de copiere prin completarea [formularului de acces](https://forms.office.com/pages/responsepage.aspx?id=Z4f8jWsRaEKDxfvIWTRtOKF3nI_LtL9ChzbNY23lEmtUMlFHSTQ1VzQ0UTROMFlWVlBNV01DRUFBUC4u&route=shorturl). După aprobare (maximum 5 zile lucrătoare), veți putea duplica și utiliza componentele în proiectele voastre. Fișierul original rămâne protejat și nu poate fi editat de utilizatori.

Modelul Unitar de Design este organizat pe mai multe fisiere Figma:

- **Foundations** – culori, tipografie, spațiere, pictograme și alte stiluri de bază.
- **Components** – elemente UI gata de utilizat, personalizabile, și recomandări pentru implementarea lor eficientă.
- **Layouts & Patterns** – structuri recomandate pentru pagini și soluții pentru scenarii de design recurente.
- **Purpose & Principles** – principiile, obiectivele și direcția pe termen lung care ghidează Modelul Unitar de Design.

Fiecare componentă are variante pentru toate stările posibile (default, hover, focus, disabled, error) și pentru toate dimensiunile disponibile. Componentele sunt construite cu Auto Layout pentru a facilita redimensionarea și adaptarea.

### Git Repository

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

## Reguli de utilizare

### Când este obligatorie utilizarea

Utilizarea Modelul Unitar de Design este obligatorie pentru toate resursele și sistemele informaționale de stat dezvoltate sau modernizate după lansare. Aceasta include:

- Site-uri web instituționale
- Portale de servicii
- Aplicații mobile
- Sisteme back-office accesibile funcționarilor publici
- Orice altă interfață digitală destinată utilizării de către cetățeni sau angajați ai instituțiilor publice

⚠️ Pentru proiectele în curs de dezvoltare la momentul lansării Modelului Unitar de Design, obligativitatea se aplică la următoarea iterație majoră sau refresh de design. Pentru sistemele existente, se recomandă migrarea treptată la model, prioritizând secțiunile cu trafic mare sau cele care necesită oricum modernizare.

Companiile private care dezvoltă soluții pentru instituțiile guvernamentale trebuie să includă utilizarea modelului în ofertele tehnice și să asigure conformitatea în toate livrabilele.

### Ce poți modifica și ce nu

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
- Componente custom suplimentare care nu există în model (cu condiția să respecte principiile generale de design)

⚠️ Dacă aveți nevoie de o componentă care nu există în model sau doriți să modificați o componentă existentă pentru un use case specific, contactați echipa AGE pentru a discuta posibilitatea adăugării în sistemul principal. În multe cazuri, nevoia dumneavoastră specifică poate fi relevantă și pentru alte instituții.

### Procedura de coordonare design (când e necesară)

Coordonarea cu AGE este necesară în următoarele situații:

- Când doriți să creați componente complet noi care nu există în model
- Când trebuie să modificați semnificativ o componentă existentă pentru un use case specific
- Când dezvoltați un pattern complex care combină multiple componente într-un mod nou
- Când aveți îndoieli legate de interpretarea regulilor de brand guvernamental

Pentru coordonare, trimiteți un email la design@egov.md cu:

- Descrierea use case-ului
- Mockup-uri sau wireframe-uri ale soluției propuse
- Explicația de ce componentele existente nu sunt suficiente

Echipa AGE va răspunde în maximum 10 zile lucrătoare cu feedback și recomandări.

⚠️ Nu este necesară coordonarea pentru:
    - Utilizarea standard a componentelor existente
    - Personalizări minore de culori în limitele permise
    - Layout-uri custom folosind componentele standard
    - Adăugarea de conținut specific instituției

### Integrare cu framework-uri - responsabilitatea dezvoltatorului

Componentele modelului sunt furnizate în HTML/CSS vanilla pentru a asigura compatibilitatea maximă. Integrarea cu framework-uri moderne (React, Vue, Angular, etc.) este responsabilitatea echipelor de dezvoltare care lucrează cu aceste tehnologii.

Procesul tipic de integrare presupune:

1. **Importarea design tokens** (variabile CSS/SCSS pentru culori, spacing, tipografie, shadows etc.)
2. **Importarea stilurilor CSS** din Modelul Unitar de Design
3. **Crearea de wrapper components** în framework-ul dorit care aplică clasele CSS corespunzătoare
4. **Utilizarea token-urilor** în loc de valori hardcodate pentru spacing, culori, font sizes
5. **Adaptarea pattern-urilor interactive** pentru a funcționa cu state management-ul specific framework-ului

Comunitatea dezvoltatorilor este încurajată să împărtășească implementările lor pentru diverse framework-uri. Dacă ați creat o bibliotecă de componente pentru un framework popular, contactați-ne pentru a o lista în secțiunea de resurse comunitare.

⚠️ AGE dezvoltă oficial o bibliotecă de componente pentru Blazor/MudBlazor care va fi disponibilă în 2026. Până atunci, puteți folosi componentele HTML/CSS standard în Blazor sau puteți crea propriile componente Blazor bazate pe stilurile Modelul Unitar de Design.

---

## Workflow de implementare

Un proiect tipic care utilizează Modelul Unitar de Design urmează acest workflow:

### Faza 1: Design în Figma

Designerul deschide fișierul în Figma (acces Guest) și creează un nou fișier pentru proiect. Componentele necesare se copiază din biblioteca în noul fișier (după acordarea dreptului de copiere). Designerul construiește ecranele aplicației folosind componentele modelului, personalizând doar elementele permise (culori instituționale, conținut, imagini). Layout-ul se creează folosind grid-ul și spacing tokens din model pentru a asigura consistența.

### Faza 2: Frontend development

Dezvoltatorul clonează repository-ul de pe GitLab și setează structura de bază a proiectului. Componentele necesare se integrează în proiect (fie prin copiere directă, fie prin npm install din GitLab). Dezvoltatorul implementează layout-urile și funcționalitatea conform design-urilor din Figma, folosind clasele CSS și structura HTML din documentația componentelor.

Pentru componente interactive, JavaScript-ul minimal necesar este inclus în repository. Pentru interacțiuni complexe specifice aplicației, dezvoltatorul extinde comportamentul de bază respectând pattern-urile stabilite.

### Faza 3: Testing și optimizare

Testați aplicația pe toate browserele suportate (Chrome, Firefox, Safari, Edge) și pe dispozitive mobile. Verificați accesibilitatea folosind instrumente automate (axe, WAVE) și testare manuală cu screen readers. Optimizați performance-ul prin eliminarea CSS-ului nefolosit și lazy loading pentru componente complexe.

### Exemplu practic: Formular de contact

#### În Figma:

Designerul deschide biblioteca moldelului și identifică componentele necesare:

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

## Întrebări frecvente (FAQ)

### Pot folosi Modelul Unitar de Design pentru proiecte non-guvernamentale?

Modelul Unitar de Design este dezvoltat specific pentru sectorul guvernamental din Moldova și utilizarea lui este obligatorie pentru proiectele de stat. Pentru proiecte private sau comerciale, puteți folosi modelul ca inspirație sau punct de plecare, dar nu există obligativitate. Totuși, vă încurajăm să respectați principiile de accesibilitate și usability încorporate în sistem indiferent de tipul proiectului.

### Cum obțin actualizări când modelul se schimbă?

Modelul Unitar de Design este versionat semantic (major.minor.patch). Verificați periodic fișierul `CHANGELOG.md` din repository pentru a vedea ce s-a schimbat. Pentru actualizări majore care pot include breaking changes, AGE va comunica în avans prin canalele oficiale și va oferi ghiduri de migrare.

Dacă folosiți modelul prin npm, puteți actualiza cu:
```bash
npm update mud-design-system
```

Pentru Figma, componentele se actualizează automat în fișierul principal - va trebui să copiați din nou componentele modificate în proiectele voastre.

### Ce fac dacă componentele nu acoperă cazul meu de utilizare?

Primul pas este să verificați dacă puteți rezolva problema combinând componentele existente într-un pattern nou. Consultați secțiunea Patterns din Figma pentru inspirație.

Dacă nu există o soluție viabilă, aveți două opțiuni:

1. Creați o componentă custom care respectă principiile modelului (culori, spacing, tipografie) și folosiți-o în proiectul vostru
2. Contactați echipa AGE la design@egov.md pentru a propune adăugarea unei noi componente în sistem. Includeți descrierea use case-ului și mockup-uri ale soluției propuse.

### Cum raportez un bug sau sugerez îmbunătățiri?

- **Pentru bug-uri tehnice** în componentele din GitLab, deschideți un Issue în repository cu descriere detaliată, browser/device info și screenshot-uri dacă e relevant
- **Pentru probleme de design** sau sugestii de îmbunătățiri, trimiteți email la design@egov.md cu detalii clare despre problema identificată și impactul ei
- **Pentru discuții generale** și întrebări, puteți folosi secțiunea Discussions din GitLab

### Trebuie să cer aprobare pentru fiecare implementare?

Da. Dacă folosiți componentele modelului conform documentației și regulilor de utilizare, este necesară coordonarea si aprobarea cu AGE.

- Componente complet noi
- Modificări majore ale componentelor existente
- Interpretări ambigue ale brand guidelines

### Pot contribui cu componente noi?

Da, AGE încurajează contribuțiile din partea comunității. Dacă ați dezvoltat o componentă care respectă principiile modelului și credeți că ar fi utilă și altor proiecte guvernamentale, trimiteți un Pull Request în repository cu:

- Componenta
- Documentația
- Exemple de utilizare

Echipa AGE va revizui contribuția și, dacă este aprobată, o va include în versiunea următoare. Contributorii vor fi creditați în fișierul `CONTRIBUTORS.md`.

---

## Resurse suplimentare

- **Recording webinar de lansare:** [Vezi webinar pe YouTube](https://www.youtube.com/watch?v=74V-IXQqqY8) - acoperă o prezentare completă a sistemului, demonstrații live și Q&A
- **Webinar prezentare:** [Vezi prezentarea](Modelul Unitar de Design.pdf)

Pentru întrebări tehnice complexe, coordonare design sau cazuri excepționale care nu sunt acoperite de documentație:

- **Email:** design@egov.md
- **Timp de răspuns:** 5 zile lucrătoare
- **Program:** Luni-Vineri, 09:00-18:00

⚠️ Vă rugăm să folosiți acest contact doar pentru situații care nu pot fi rezolvate prin documentația existentă, FAQ sau Issues pe GitLab. Înainte de a contacta suportul, verificați că ați consultat toate resursele disponibile.
