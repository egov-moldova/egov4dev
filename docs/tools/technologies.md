At MEGA, the development of government digital services is based on a modern, secure, and scalable technology ecosystem. This page provides an overview of the technologies, infrastructure, and tools used to build interoperable, compliant, and citizen-oriented solutions.

* * *

## Design system

**MUD (Moldovan Statewide Design System)** – the unified design system for government digital services
  - Provides reusable UI components, patterns, and guidelines
  - Ensures consistency across all governmental applications
  - Focuses on accessibility, clarity, and user-centered design
  - Documentation available [here](https://egov-moldova.github.io/egov4dev/mud/)
  - Includes design tokens, component library, and implementation examples

## Development stack

AGE services are developed with robust technologies, chosen for compatibility with government infrastructure and to support an efficient application lifecycle.

### Frontend

Web applications are built with **MudBlazor**, a UI framework for Blazor that enables rapid development of modern, responsive, and accessible interfaces:

*   **MudBlazor** – NuGet: `MudBlazor` – reusable UI components, consistent styling
*   **Blazor Server / WebAssembly** – for interactive applications in .NET
*   Following standards from the **Government Design System** (coming soon), focusing on clarity, simplicity, and accessibility

### Backend

Business logic is implemented within the .NET ecosystem:

*   **ASP.NET Core** – NuGet: `Microsoft.AspNetCore.*` – for REST services and scalable web applications
*   **Entity Framework Core** – NuGet: `Microsoft.EntityFrameworkCore` – for relational database access
*   **FluentValidation** – NuGet: `FluentValidation` – for declarative validations
*   **Swashbuckle.AspNetCore** – NuGet: `Swashbuckle.AspNetCore` – for generating Swagger documentation

### Databases

*   **SQL Server**, **PostgreSQL** – for relational data storage
*   **Redis** – NuGet: `StackExchange.Redis` – for caching and performance optimization
*   **JSON structures** – used for dynamic configuration of rules and categories

* * *

## Infrastructure and DevOps

AGE uses government infrastructure for hosting and orchestrating services:

### Hosting

*   **MCloud** – the government cloud platform used for hosting AGE applications
*   Configurations for **scalability**, **security**, and **disaster recovery** adapted to institutional requirements

### Orchestration and containers

*   **Kubernetes** – for orchestrating containerized services
*   **Docker** – for packaging applications into portable containers
*   **Helm** – for managing deployments in Kubernetes, offering controlled versions, fast rollback, and declarative configuration through charts

### CI/CD and DevOps

*   **Azure DevOps** – for managing deliveries, tasks, and bugs
*   Automated pipelines for build, test, and deploy
*   **GitLab** – for version control and continuous integration

### Monitoring and SRE

*   Centralization through **Azure DevOps**
*   Systems for **alerting**, **logging**, **auditing**, and **tracing**
*   **Elasticsearch** – for indexing and fast searching of logs and operational data
*   **Kibana** – for visualizing data from Elasticsearch
*   **Prometheus + Grafana** – for monitoring and visualizing metrics

* * *

## Integration tools

AGE provides a suite of interoperable services that can be integrated into any government application:

*   **MConnect** – data exchange between institutions
*   **MPass** – unified authentication (including with digital signature)
*   **MPower** – digital delegation
*   **MSign** – qualified digital signature
*   **MNotify** – official notifications with proof of delivery

Each service is documented with **integration guides**, code examples, and usage scenarios.

* * *

## Best practices and conventions

To ensure code consistency and quality:

*   Conventions for **naming**, **code structuring**, and **project organization**
*   Configurable validations in **JSON**
*   Automated and manual testing
*   Standardized UI/UX for all AGE applications
*   Use of **private NuGet feeds** for distributing reusable internal components
