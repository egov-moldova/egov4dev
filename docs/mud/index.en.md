# Unitary Design Model

## About the system and available resources

### What the model is and why it was created

The Unitary Design Model (MUD) is the national design standard for all web and mobile solutions used by public authorities in the Republic of Moldova. It was developed by the Electronic Governance Agency (AGE) to solve the problem of design fragmentation across government digital services and to ensure a unified, coherent and accessible experience for all citizens.

Before the model existed, each public institution developed interfaces according to its own standards, resulting in confusion for users, increased development and maintenance costs, and an inconsistent experience when interacting with state services. The model standardizes UI components, color palettes, typography, spacing and interaction patterns, allowing teams to focus on functionality instead of reinventing the basic design.

### Who it is for

The Unitary Design Model is mandatory for all public institutions in the Republic of Moldova that develop or modernize state information resources and systems. Likewise, all private companies that develop digital solutions for government institutions must use the model in their projects.

The model is aimed at UX/UI designers, frontend developers, product managers, solution architects and ICT specialists working on government digital projects.

### Direct benefits

Using the model brings concrete benefits both for development teams and for end users. Development time is significantly reduced through the reuse of pre-built and tested components. Maintenance costs decrease due to standardization and centralized updates. Product quality increases through the application of accessibility and usability best practices built into the system.

For end users, the model guarantees a familiar and predictable experience across all digital government services, reducing the learning curve and facilitating the adoption of digital services. Improved accessibility ensures that services can be used by people with disabilities.

### Available resources

<table>
  <thead>
    <tr>
      <th>Resource</th>
      <th>Description</th>
      <th>How to access</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Figma files</strong></td>
      <td>Complete library of components, styles and patterns. Contains all UI components, the color system, typography, icons, spacing tokens and layout examples.</td>
      <td>
        <strong>Viewing:</strong> <a href="https://mud.egov.md">Direct Guest access</a><br>
        <strong>Copying/Editing:</strong> <a href="https://forms.office.com/pages/responsepage.aspx?id=Z4f8jWsRaEKDxfvIWTRtOKF3nI_LtL9ChzbNY23lEmtUMlFHSTQ1VzQ0UTROMFlWVlBNV01DRUFBUC4u&route=shorturl">Complete the form</a> for permissions
      </td>
    </tr>
    <tr>
      <td><strong>HTML storybook</strong></td>
      <td>Interactive catalog of all components, shown in their main variants and responsive contexts, with the ability to quickly copy tokens and code snippets for use.</td>
      <td><a href="https://mud.dev.egov.md/">View storybook</a></td>
    </tr>
    <tr>
      <td><strong>Blazor storybook</strong></td>
      <td>Interactive catalog of all components, shown in their main variants and responsive contexts, with the ability to quickly copy tokens and code snippets for use.</td>
      <td><a href="https://fod.dev.egov.md/">View storybook</a></td>
    </tr>
    <tr>
      <td><strong>Git repository</strong></td>
      <td>Complete implementation of the model's components in HTML/CSS, ready to use. All components are responsive, cross-browser compatible and comply with WCAG 2.1 AA.</td>
      <td><a href="https://github.com/egov-moldova/design-system">GitHub access</a></td>
    </tr>
    <tr>
      <td><strong>MudBlazor components</strong></td>
      <td>Official library of the model's components for developers working with the Blazor framework in the .NET environment.</td>
      <td><a href="https://www.nuget.org/packages/Egov.FOD.UIComponents">NuGet library</a></td>
    </tr>
    <tr>
      <td><strong>Official brand components</strong></td>
      <td>Official interface components representing the shared government platforms, including:
        <ul>
            <li><strong>MPass</strong> – authentication;</li>
            <li><strong>MSign</strong> – electronic signing;</li>
            <li><strong>MPay</strong> – electronic payments;</li>
            <li><strong>as well as other shared government systems and platforms,</strong> where these are integrated and used within state information systems.</li>
      </td>
      <td>
            <a href="https://drive.google.com/drive/folders/1VDL-G44x5-_A2Z3OC0qHv2If8ZfV6IJy?usp=sharing">Download from brand center</a><br>
            <a href="https://www.figma.com/design/doJ7tDY0PlQ0PqMgbpFVIC/Components?node-id=2925-3568&t=Zj0VxvTiD83JH4NT-4">Access the component in Figma</a><br>
            <a href="https://www.figma.com/design/61kDJHJsGwfmzqmqsfkgkE/Layouts---Patterns?node-id=1429-11832&t=rb7Iqz4FX9oIB0ds-4">Access the guide in Figma</a>
        </td>
    </tr>
  </tbody>
</table>

#### Usage guide by role

| Your role | Which resource to use | Notes about access |
|-----------|---------------------|-------------------|
| **Project Manager / Product Owner** | Figma Design Library - viewing components and coordinating with the team | Direct Guest access (no account) |
| **UX/UI Designer** | Figma Design Library - creating mockups and prototypes | ⚠️ **Access request required** via [form](https://forms.office.com/pages/responsepage.aspx?id=Z4f8jWsRaEKDxfvIWTRtOKF3nI_LtL9ChzbNY23lEmtUMlFHSTQ1VzQ0UTROMFlWVlBNV01DRUFBUC4u&route=shorturl) for copying |
| **Frontend Developer** | Git Repository HTML/CSS - implementing interfaces | GitLab account required |
| **Full-stack Developer** | Git Repository HTML/CSS - integration into applications | GitLab account required |
| **Blazor Developer** | Git Repository HTML/CSS (temporary until 2026) | GitLab account required |
| **ICT Specialist / Technical Coordinator** | Figma (viewing) + Git Repository (implementation) | Figma: direct / GitLab: account required |

## Quick access to resources

### Figma Files

**Direct link:** [Figma access](https://mud.egov.md)

The Figma files are configured for public access in Guest mode. Simply open the link in your browser and you will have instant access for viewing. In Guest mode you can browse through files, inspect component properties and export assets for reference.

**To copy the components into your own Figma file**, you need to request copy rights by completing the [access form](https://forms.office.com/pages/responsepage.aspx?id=Z4f8jWsRaEKDxfvIWTRtOKF3nI_LtL9ChzbNY23lEmtUMlFHSTQ1VzQ0UTROMFlWVlBNV01DRUFBUC4u&route=shorturl). After approval (maximum 5 business days), you will be able to duplicate and use the components in your projects. The original file remains protected and cannot be edited by users.

The Unitary Design Model is organized across several Figma files:

- **Foundations** – colors, typography, spacing, icons and other basic styles.
- **Components** – ready-to-use, customizable UI elements, with recommendations for their effective implementation.
- **Layouts & Patterns** – recommended page structures and solutions for recurring design scenarios.
- **Purpose & Principles** – the principles, objectives and long-term direction guiding the Unitary Design Model.

Each component has variants for all possible states (default, hover, focus, disabled, error) and for all available sizes. Components are built with Auto Layout to facilitate resizing and adaptation.

### Git Repository

**Direct link:** [GitLab access](https://github.com/egov-moldova/design-system)

The repository is organized as follows:
```
/src/components   - toate componentele individuale
/src/styles       - variabilele CSS, tokens și stilurile globale
/src/assets       - iconițele și alte resurse statice
/dist             - versiunile compilate ready for production
/examples         - exemple de utilizare pentru fiecare componentă
```

The `README.md` file in the root contains detailed installation instructions and available commands. The `CHANGELOG.md` file documents all changes between versions.

---

## Usage rules

### When use is mandatory

Use of the Unitary Design Model is mandatory for all state information resources and systems developed or modernized after launch. This includes:

- Institutional websites
- Service portals
- Mobile applications
- Back-office systems accessible to public servants
- Any other digital interface intended for use by citizens or employees of public institutions

⚠️ For projects under development at the time the Unitary Design Model was launched, the obligation applies starting with the next major iteration or design refresh. For existing systems, gradual migration to the model is recommended, prioritizing high-traffic sections or those that require modernization in any case.

Private companies that develop solutions for government institutions must include use of the model in their technical proposals and ensure compliance across all deliverables.

### What you can and cannot modify

#### You cannot modify:

- The basic structure
- The government color system (primary colors)
- Spacing tokens
- The base typography (font families and scale)
- The standard dimensions of components
- Accessibility patterns

#### You can customize:

- Secondary and accent colors for institution-specific branding (within the limits of the government brand guide)
- Content and copy
- Page layout (using the standard grid and components)
- Institution-specific images and illustrations
- Additional custom components that do not exist in the model (provided they follow the general design principles)

⚠️ If you need a component that does not exist in the model, or want to modify an existing component for a specific use case, contact the AGE team to discuss the possibility of adding it to the main system. In many cases, your specific need may also be relevant to other institutions.

### Design coordination procedure (when required)

Coordination with AGE is required in the following situations:

- When you want to create entirely new components that do not exist in the model
- When you need to significantly modify an existing component for a specific use case
- When you are developing a complex pattern that combines multiple components in a new way
- When you have doubts about interpreting the government brand rules

For coordination, send an email to design@egov.md with:

- A description of the use case
- Mockups or wireframes of the proposed solution
- An explanation of why the existing components are not sufficient

The AGE team will respond within a maximum of 10 business days with feedback and recommendations.

⚠️ Coordination is not required for:
    - Standard use of existing components
    - Minor color customizations within the permitted limits
    - Custom layouts using the standard components
    - Adding institution-specific content

### Integration with frameworks - the developer's responsibility

The model's components are provided in vanilla HTML/CSS to ensure maximum compatibility. Integration with modern frameworks (React, Vue, Angular, etc.) is the responsibility of the development teams working with those technologies.

The typical integration process involves:

1. **Importing design tokens** (CSS/SCSS variables for colors, spacing, typography, shadows, etc.)
2. **Importing the CSS styles** from the Unitary Design Model
3. **Creating wrapper components** in the desired framework that apply the corresponding CSS classes
4. **Using tokens** instead of hardcoded values for spacing, colors, font sizes
5. **Adapting interactive patterns** to work with the framework's specific state management

The developer community is encouraged to share their implementations for various frameworks. If you have created a component library for a popular framework, contact us to have it listed in the community resources section.

⚠️ AGE is officially developing a component library for Blazor/MudBlazor which will be available in 2026. Until then, you can use the standard HTML/CSS components in Blazor or create your own Blazor components based on the Unitary Design Model's styles.

---

## Implementation workflow

A typical project using the Unitary Design Model follows this workflow:

### Phase 1: Design in Figma

The designer opens the file in Figma (Guest access) and creates a new file for the project. The required components are copied from the library into the new file (after copy rights have been granted). The designer builds the application screens using the model's components, customizing only the permitted elements (institutional colors, content, images). The layout is created using the grid and spacing tokens from the model to ensure consistency.

### Phase 2: Frontend development

The developer clones the repository from GitLab and sets up the project's base structure. The required components are integrated into the project (either by direct copying or via npm install from GitLab). The developer implements the layouts and functionality according to the Figma designs, using the CSS classes and HTML structure from the component documentation.

For interactive components, the minimal JavaScript needed is included in the repository. For complex application-specific interactions, the developer extends the base behavior while respecting the established patterns.

### Phase 3: Testing and optimization

Test the application on all supported browsers (Chrome, Firefox, Safari, Edge) and on mobile devices. Check accessibility using automated tools (axe, WAVE) and manual testing with screen readers. Optimize performance by removing unused CSS and lazy loading complex components.

### Practical example: Contact form

#### In Figma:

The designer opens the model's library and identifies the required components:

- Input Text
- Text Area
- Button Primary
- Checkbox
- Form layout grid

They create a new frame in the project file and arrange the components according to the desired layout, applying the standard spacing (8px grid). Labels, placeholder text and error messages are added according to the content guide.

#### In code:

The developer finds all the required components in `/src/components/forms`. They copy the HTML for each component and adapt it with the specific content.

They import the styles:
```css
@import 'mud/components/forms/input.css';
@import 'mud/components/forms/textarea.css';
@import 'mud/components/buttons/button.css';
```

JavaScript validation is added using the pattern from `/examples/form-validation.js`. All states are tested: focus, error, disabled, success.

---

## Frequently Asked Questions (FAQ)

### Can I use the Unitary Design Model for non-government projects?

The Unitary Design Model is developed specifically for the government sector in Moldova, and its use is mandatory for state projects. For private or commercial projects, you may use the model as inspiration or a starting point, but there is no obligation to do so. However, we encourage you to follow the accessibility and usability principles built into the system regardless of the type of project.

### How do I get updates when the model changes?

The Unitary Design Model is versioned using semantic versioning (major.minor.patch). Periodically check the `CHANGELOG.md` file in the repository to see what has changed. For major updates that may include breaking changes, AGE will communicate in advance through official channels and will provide migration guides.

If you use the model via npm, you can update with:
```bash
npm update mud-design-system
```

For Figma, the components are updated automatically in the main file - you will need to copy the modified components into your projects again.

### What do I do if the components do not cover my use case?

The first step is to check whether you can solve the problem by combining existing components into a new pattern. Check the Patterns section in Figma for inspiration.

If there is no viable solution, you have two options:

1. Create a custom component that follows the model's principles (colors, spacing, typography) and use it in your project
2. Contact the AGE team at design@egov.md to propose adding a new component to the system. Include a description of the use case and mockups of the proposed solution.

### How do I report a bug or suggest improvements?

- **For technical bugs** in the GitLab components, open an Issue in the repository with a detailed description, browser/device info and screenshots if relevant
- **For design issues** or improvement suggestions, send an email to design@egov.md with clear details about the identified problem and its impact
- **For general discussions** and questions, you can use the Discussions section on GitLab

### Do I need approval for every implementation?

Yes. If you use the model's components according to the documentation and usage rules, coordination and approval with AGE is required.

- Entirely new components
- Major modifications to existing components
- Ambiguous interpretations of the brand guidelines

### Can I contribute new components?

Yes, AGE encourages contributions from the community. If you have developed a component that follows the model's principles and believe it would be useful to other government projects, submit a Pull Request to the repository with:

- The component
- The documentation
- Usage examples

The AGE team will review the contribution and, if approved, will include it in the next version. Contributors will be credited in the `CONTRIBUTORS.md` file.

---

## Additional resources

- **Launch webinar recording:** [Watch the webinar on YouTube](https://www.youtube.com/watch?v=74V-IXQqqY8) - covers a complete presentation of the system, live demonstrations and Q&A
- **Presentation webinar:** [View the presentation](Modelul Unitar de Design.pdf)

For complex technical questions, design coordination or exceptional cases not covered by the documentation:

- **Email:** design@egov.md
- **Response time:** 5 business days
- **Hours:** Monday-Friday, 09:00-18:00

⚠️ Please use this contact only for situations that cannot be resolved through the existing documentation, FAQ or Issues on GitLab. Before contacting support, verify that you have consulted all available resources.
