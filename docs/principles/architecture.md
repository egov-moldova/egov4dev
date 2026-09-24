Dezvoltarea soluțiilor guvernamentale integrate este ghidată de un set de principii care asigură coerența, eficiența, interoperabilitatea și securitatea în întregul ecosistem. Aceste principii sunt obligatorii pentru toți actorii implicați în proiectarea, dezvoltarea și implementarea sistemelor informaționale guvernamentale.

---

## 🧠 Arhitectură inteligentă

Deciziile de arhitectură trebuie luate la nivelul potrivit, în funcție de domeniul de aplicare și de impactul soluției. Arhitecturile locale (la nivelul unei singure instituții) trebuie aliniate cu arhitecturile naționale și sectoriale, asigurând interoperabilitatea și evitând duplicarea resurselor.

Principiul impune ca orice soluție să fie integrată în ecosistemul digital național, susținând schimbul de date și servicii prin intermediul platformei de interoperabilitate și al standardelor comune.

---

## 🛡️ Securitate încă din concepție (secure by design)

Securitatea trebuie construită în fundația fiecărui sistem, nu adăugată ulterior. Aceasta cuprinde întregul ciclu de viață al securității: modelarea amenințărilor, arhitectura securizată, infrastructura consolidată (hardened), gestionarea vulnerabilităților și răspunsul la incidente.

Securitatea încă din concepție asigură că sistemele guvernamentale pot rezista atacurilor cibernetice, pot menține disponibilitatea serviciilor și pot proteja integritatea operațiunilor guvernamentale.

---

## ♻️ Reutilizarea soluțiilor

Arhitecturile trebuie să echilibreze coerența cu nevoia de inovație. Reutilizarea soluțiilor și tehnologiilor este încurajată, atât timp cât aceasta asigură eficiență și optimizarea costurilor.

Coerența asigură că sistemele respectă reguli comune, în timp ce inovația permite instituțiilor să îmbunătățească procesele și serviciile prin tehnologii moderne.

---

## 📜 Conformitate deplină

Soluțiile trebuie dezvoltate în conformitate deplină cu cadrul legal și normativ aplicabil. Aceasta include respectarea legislației privind protecția datelor cu caracter personal, semnătura electronică, documentul electronic și auditarea sistemelor informaționale.

Conformitatea garantează faptul că serviciile sunt valabile din punct de vedere juridic și de încredere pentru cetățeni, mediul de afaceri și instituții.

---

## 🔒 Confidențialitate încă din concepție (privacy by design)

Confidențialitatea trebuie integrată încă din etapa de proiectare a oricărui sistem. Aceasta include mecanisme de autentificare și autorizare (de exemplu, prin MPass), criptarea comunicațiilor (TLS), controlul accesului bazat pe roluri (RBAC) și jurnalizarea continuă (MLog).

Confidențialitatea încă din concepție asigură reziliența sistemelor la amenințările cibernetice și posibilitatea cetățenilor de a utiliza în siguranță serviciile guvernamentale.

---

## 🚀 Optimizare transversală

Soluțiile trebuie optimizate pentru integrarea în fluxuri de lucru mai ample. Aceasta include fluxuri asincrone, orchestrarea proceselor prin instrumente BPM, integrarea notificărilor (MNotify) și livrarea documentelor (MDelivery).

Optimizarea la nivel transversal (cross-application) crește eficiența și reduce duplicarea eforturilor.

---

## 🤝 Contribuie, nu doar consuma

Instituțiile nu trebuie doar să consume date din registrele guvernamentale, ci și să contribuie și să mențină propriile surse de date autoritare. Fiecare instituție este responsabilă pentru asigurarea acurateței, completitudinii și actualității datelor aflate sub mandatul său.

[Catalogul semantic](http://semantic.gov.md) servește drept punct unic de descoperire pentru toate datele guvernamentale, permițând reutilizarea eficientă și prevenind fragmentarea.

---

## 🎯 Principiul „o singură dată” (once only)

Cetățenii și mediul de afaceri trebuie să furnizeze informații către stat o singură dată. Instituțiile trebuie să reutilizeze datele validate din registrele autentice, prin intermediul catalogului semantic, care sistematizează metadatele din sursele de date guvernamentale.

Principiul „o singură dată” reduce povara administrativă, asigură coerența datelor și previne colectarea duplicată în cadrul serviciilor guvernamentale.

---

## 🔔 Evenimente implicit (events by default)

Sistemele trebuie să emită automat evenimente atunci când au loc modificări semnificative de stare, în loc să impună altor sisteme interogarea periodică (polling) pentru actualizări. Registrele autoritare publică evenimente (de exemplu, „adresă modificată”, „licență emisă”, „termen limită apropiat”), care permit fluxuri de lucru automatizate și integrare asincronă între sisteme. Arhitectura orientată pe evenimente reduce încărcarea sistemelor, îmbunătățește capacitatea de răspuns și asigură livrarea la timp a informațiilor către cetățeni și instituții.

---

## 🔗 Interoperabilitate din start

Soluțiile guvernamentale trebuie să fie interoperabile în mod implicit. Aceasta înseamnă că expun API-uri (REST sau SOAP), respectă standarde deschise și pot fi integrate prin intermediul unor API gateway-uri sau al altor tipuri de middleware.

Principiul interoperabilității încă din concepție previne apariția sistemelor izolate și asigură integrarea la nivel național și transfrontalier.

---

## 🌐 Fiabilitate ridicată

Serviciile guvernamentale trebuie să fie extrem de disponibile și fiabile. Soluțiile sunt găzduite pe infrastructură scalabilă ([MCloud](https://www.egov.md/en/content/mcloud-platform), operată de [STISC](https://stisc.gov.md/)), monitorizate continuu și livrate în baza unor Acorduri de Nivel al Serviciului (SLA) clare.

Disponibilitatea asigură furnizarea neîntreruptă a serviciilor, în timp ce fiabilitatea asigură coerența și încrederea în date și procese.
