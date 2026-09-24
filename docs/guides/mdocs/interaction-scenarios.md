## Schimbul de documente între sisteme

Iată o scurtă descriere a schimbului de documente între sisteme:

1. Sistemul sursă încarcă blob-ul (vezi referința API).
2. După încărcarea blob-ului, sistemul emitent publică documentul către sistemul destinatar (vezi referința API).
3. Pentru publicarea documentului, se utilizează urn:md:system:id-system-destination
4. Dacă documentul are un folder părinte, la publicare, id-ul folderului este indicat ca folder părinte.
5. Documentul va fi publicat în rădăcină dacă nu este indicat niciun id de folder
6. De asemenea, sistemul poate publica mai multe documente într-un folder, indicând id-ul folderului ca destinație.
7. Sistemul destinatar este notificat despre disponibilitatea și id-ul documentului creat.
8. Publicarea documentului se face atât pentru proprietarul documentului, cât și pentru alte identități.

## Partajarea documentelor între identități

Documentele create pot fi partajate cu diferite permisiuni, astfel încât clientul trebuie să poată partaja documentul către una sau mai multe identități, cu condiția ca partajarea să nu poată avea permisiuni mai mari decât documentul.

1. Utilizatorul va partaja un document, unde from <= to și to > now (vezi referința API).
2. Având o partajare rezervată în prealabil (cunoscând id-ul acesteia), un client va partaja un document folosind această rezervare (vezi referința API).
3. Clientul va lista partajările făcute pentru el (opțional, dacă este autorizat, pentru parametrul principal specificat) (vezi referința API).
4. Clientul va lista partajările făcute de el (opțional, dacă este autorizat, pentru parametrul principal specificat) (vezi referința API).
