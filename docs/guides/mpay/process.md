## Condiție prealabilă

Beneficiarul care solicită integrarea trebuie să îndeplinească următoarele condiții:

1. Deține un sistem informațional destinat integrării cu MPay;
2. Pentru beneficiarii publici – sistemul trebuie să fie înregistrat în Registrul resurselor și sistemelor informaționale;
3. Contractul și/sau anexa privind utilizarea serviciului MPay a fost semnat(ă);
4. Pentru beneficiarii privați sau publici care dețin conturi la bănci comerciale – utilizarea serviciului este plătită conform contractului;
5. Beneficiarii trebuie să dețină un certificat de sistem valid, emis de STISC, pentru integrare. Dacă instituția nu deține încă un certificat de sistem, trebuie să solicite și să obțină unul de la STISC;
6. Utilizatorii trebuie să dețină o semnătură electronică pentru a accesa platforma back-office MPay, în vederea vizualizării plăților;
7. Dacă beneficiarul nu are propriul sistem informațional pentru integrare, MPay poate propune crearea unui serviciu generic – un șablon standard de pagină frontend MPay care poate fi completat de plătitor.

## Pașii de conectare pentru beneficiar

1. Semnați contractul și completați formularul de conectare pentru înregistrarea serviciului în MPay;
2. Instituția trebuie să trimită certificatul de sistem (cheia publică .cer) către eGov, la adresa suport.mpay@gov.md, și să furnizeze sigla sa în format .png;
3. Furnizați detaliile de integrare prin intermediul formularului, inclusiv:
   – Informațiile de contact ale solicitantului;
   – Modul intenționat de utilizare a MPay;
   – Informații despre serviciul web (denumirea prestatorului de servicii, site-ul web al prestatorului de servicii, denumirea serviciului, adresa IP a endpoint-ului de test);
4. eGov configurează serviciul în mediul de testare: [https://mpay.staging.egov.md](https://mpay.staging.egov.md);
5. Beneficiarul își integrează sistemul conform ghidului de integrare, apoi efectuează testarea funcțională conform ghidului tehnic, împreună cu reprezentantul MPay;
6. După validarea finală de către beneficiar, eGov activează serviciul în mediul de producție;
7. Beneficiarul primește o notificare care confirmă finalizarea integrării.
