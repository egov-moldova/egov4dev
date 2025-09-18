document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("a[href^='http']").forEach(link => {
        const isExternal = !link.href.includes(window.location.hostname);
        if (isExternal) {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
        }
    });
});