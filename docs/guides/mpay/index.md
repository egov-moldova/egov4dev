## Domeniul de aplicare și publicul vizat

Acest document descrie interfețele tehnice utilizate pentru integrarea cu MPay. Publicul vizat
sunt echipele de dezvoltare care implementează sau întrețin sistemele informaționale pentru 
a fi integrate sau integrate cu MPay.

##**Descrierea generală a sistemului**

MPay este un serviciu reutilizabil și partajat la nivel de platformă, al cărui scop principal este 
de a permite plata oricărui serviciu electronic cu orice instrument de plată disponibil.
Interfața tehnică utilizată pentru integrarea prestatorului de serviciu, cu platforma MPay,
simplifică semnificativ integrările prin expunerea formatelor tehnice de date.
Există multe avantaje non-tehnice activate de MPay, cum ar fi gestionarea mai ușoară a 
contractelor și transparenta, însă nu intră în domeniul de aplicare al acestui document.

##**Dependențe**

Disponibilitatea MPay depinde de disponibilitatea implementării interfetei IServiceProvider, 
adică un plătitor nu va putea să solicite o comandă sau o factură pentru un anumit serviciu 
electronic și să plătească pentru aceasta, dacă serviciul web al prestatorului de servicii 
electronice nu este disponibil

##**Protocoale și standarde**

MPay expune web serviciul interoperabil WS-I Basic Profile 1.1 prin HTTPS, care corespunde 
basicHttpBinding în WCF. MPay folosește erori SOAP pentru raportarea erorilor.
MPay utilizează semnătura XML WS-Security (X.509) (la nivel de mesaj) pentru a permite nonrepudierea.

##**Notații**

Acest document conține mai multe stiluri de notație; următoarele detaliază stilurile care au un 
grad de semnificație dincolo de scopul comunicării informațiilor:

<span class="highlight-text-yellow">Text marcat cu galben</span> – Textul care este evidențiat cu galben, indiferent de atributele fontului 
(tipul fontului, cursive, aldine, subliniat etc.) înseamnă că textul așteaptă clarificare sau 
verificare.

<span class="red-bold-text">Red Bold Text</span> – Textul aldin de culoare roșie definește o informație importantă care trebuie 
citită.

***Italic Bold Text*** – Textul aldin și cursiv detaliază informații sau scripturi reale care trebuie 
executate, create și copiate din sau către.

~~Strikethrough Text~~ – Text care este depășit și care trebuie ignorat
