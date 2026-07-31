const bootMessages = [
    "KINTSUGI_BOOT.SYS INIZIALIZZATO",
    "TAICHI_CORE_0329.MEM CARICATO",
    "SISTEMA AVVIATO - GIORNO 0339"
];

const authLines = [
    "> NN54 AUTH PROTOCOL",
    "> CREDENZIALI ACCETTATE"
];

const introLines = [
    "ACCESSO CONSENTITO",
    "BENTORNATO OPERATORE",
    "> MOBILE: TOCCA PER METTERE IN PAUSA/RIPRENDERE - TIENI PREMUTO PER ACCELERARE",
    "> COMPUTER: PREMI ENTER PER METTERE IN PAUSA/RIPRENDERE - TIENI PREMUTO ENTER PER ACCELERARE"
];


// COMANDI SISTEMA
const glitchTrigger = "[GLITCH]";
const criticalTrigger = "[CRITICALGLITCH]";
const corruptDeleteStart = "[CORRUPT_DELETE]";
const corruptDeleteEnd = "[/CORRUPT_DELETE]";
const textCorruptTrigger = "[TEXT:CORRUPT]";

const displayBlueTrigger = "[DISPLAY:BLUE]";
const displayRedTrigger = "[DISPLAY:RED]";
const displayGlitchTrigger = "[DISPLAY:GLITCH]";
const pauseTrigger = "[PAUSE:";
const instantStart = "[INSTANT]";
const instantEnd = "[/INSTANT]";
const smallStart = "[SMALL]";
const smallEnd = "[/SMALL]";

const bgmStopTrigger = "[BGM:STOP]";
const bgm2Trigger = "[BGM 2]";
const bgm3Trigger = "[BGM 3]";
const bgm3StopTrigger = "[BGM3:STOP]";


// AUDIO
const openSound = new Audio("suoni kintsugi/soundsboot.mp3");

const loopSound = new Audio("suoni kintsugi/background.mp3");

const loopSound2 = new Audio("suoni kintsugi/background 2.mp3");

const loopSound3 = new Audio("suoni kintsugi/background 3.mp3");

const corruptSound = new Audio("suoni kintsugi/parola corrotta.mp3");

const glitchSound = new Audio("suoni kintsugi/glitch.mp3");

const criticalGlitchSound = new Audio("suoni kintsugi/critical glitch.mp3");


// SUONI E VOLUME

loopSound.loop = true;
loopSound2.loop = true;
loopSound3.loop = true;

openSound.volume = 0.3;
loopSound.volume = 0.05;
loopSound2.volume = 0.05;
loopSound3.volume = 0.05;

corruptSound.volume = 0.25;
glitchSound.volume = 0.5;
criticalGlitchSound.volume = 0.5;


// PLAY SOUND
function playSound(sound) {

    sound.currentTime = 0;

    sound.play().catch(() => {});

}



let audioStarted = false;



function unlockSound(sound) {

    sound.muted = true;
    sound.currentTime = 0;

    return sound.play()
        .then(() => {

            sound.pause();
            sound.currentTime = 0;
            sound.muted = false;

        })
        .catch(() => {

            sound.muted = false;

        });

}




async function startAudio() {

    if (audioStarted) return;


    await Promise.all([

    unlockSound(openSound),
    unlockSound(loopSound),
    unlockSound(loopSound2),
    unlockSound(loopSound3),
    unlockSound(corruptSound),
    unlockSound(glitchSound),
    unlockSound(criticalGlitchSound)

]);


    audioStarted = true;


    openSound.currentTime = 0;
    openSound.muted = false;

    openSound.play().catch(() => {});



    setTimeout(() => {

        loopSound.currentTime = 0;
        loopSound.muted = false;

        loopSound.play().catch(() => {});


    }, 300);

}

function screenFlicker(screen){

    if(!screen) return;


    // pulisce eventuali residui di glitch
    screen.style.animation = "";


    screen.classList.remove("display-flicker");


    void screen.offsetWidth;


    screen.classList.add("display-flicker");



    setTimeout(() => {


        screen.classList.remove("display-flicker");


        // ripristina CRT normale
        screen.style.animation =
            "crtGlitch 6s infinite";


    }, 400);

}

function executeSystemCommand(command) {

    const screen = document.querySelector(".crt-screen");


    switch (command) {


        case "DISPLAY:BLUE":

            if (screen) {

                screen.classList.remove("display-red");
                screen.classList.add("display-blue");

                //FLICKER CAMBIO 
                screenFlicker(screen);

            }

            playSound(criticalGlitchSound);

            break;



        case "DISPLAY:RED":

            if (screen) {

                screen.classList.remove("display-blue");
                screen.classList.add("display-red");

                // FLICKER CAMBIO 
                screenFlicker(screen);

            }

            playSound(criticalGlitchSound);

            break;



        case "BGM:STOP":

            loopSound.pause();
            loopSound.currentTime = 0;

            break;



     case "BGM 2":

    loopSound.pause();
    loopSound.currentTime = 0;

    loopSound2.volume = 0.2;
    loopSound2.currentTime = 0;

    loopSound2.play().catch(() => {});

    break;

    case "BGM 3":

    loopSound.pause();
    loopSound.currentTime = 0;


    loopSound3.volume = 0.05;
    loopSound3.currentTime = 0;
    loopSound3.play().catch(() => {});

    break;



case "BGM3:STOP":

    loopSound3.pause();
    loopSound3.currentTime = 0;

    break;

    }

}






const corruptMap = {

    "A": "Δ",
    "B": "β",
    "C": "Ͼ",
    "D": "Đ",
    "E": "Ξ",
    "F": "Ғ",
    "G": "₲",
    "H": "Ħ",
    "I": "1",
    "L": "Ł",
    "M": "Μ",
    "N": "И",
    "O": "0",
    "P": "Р",
    "R": "Я",
    "S": "5",
    "T": "7",
    "U": "Ц",
    "V": "Ѵ",
    "Z": "Ζ",

    "健": "会",
    "司": "逢",
    "元": "会",
    "気": "恋",
    "で": "っ",
    "す": "逢",

    "?": "!"

};





const finalText = `

[CORRUPT_DELETE]Daisuke:[/CORRUPT_DELETE]
[DISPLAY:GLITCH]
Daisuke:
cannone portatile Nova

Guardia Armata 01:
fucile a pompa

Guardia Armata 02:
fucile a pompa

-

01:50

Kintsugi:
granata: lanciata
interposizione tra Daisuke e Polaris

Esito:
fallimento

Polaris:
colpita

Evie - Guardia Armata 01: Scambio di colpi
Esito: ferite reciproche

Freak Show:
compromissione ottiche Daisuke

Freak Show:
usa sedia come copertura

> COMLINK:
messaggio inviato → Kenji

Contenuto:
Verificare incolumità Daisuke

-

01:51

Daisuke:
fuoco su Evie

Freak Show:
compromissione impianto audio Daisuke

Guardia Armata 02:
colpisce Freak Show

Kintsugi:
tre proiettili termici su Guardia Armata 02

Daisuke:
colpisce Evie

Evie:
Danneggia Guardia Armata 01

Guardia Armata 02:
pugnala Freak Show

Esito:
Freak Show a terra

Evie:
fratture costali inflitte a Guardia Armata 01

Guardia Armata 03:
fuoco su Evie

Kinstugi:
Termina Guardia Armata 02 con munizioni incendiarie.

Daisuke:
spara a Evie

Evie:
Tentativo di persuasione verbale su Daisuke

Supporto Polaris:
riproduzione ninna nanna

Esito:
Fallimento parziale

Evie:
termina Guardia Armata 01

01:52

Daisuke:
fuoco casuale

Daisuke:
utilizza lame a mantide

Nota:
Lacrime

Impatto imminente:
gola Kintsugi

Arresto movimento

Rilevamento:
suoni metallici dal corridoio

Probabilità:
Kitsu - 79%

Probabilità cyberpsicosi Kitsu:
99%

Polaris:
stabilizza Freak Show

Guardia Armata 03:
colpisce Evie

Evie:
a terra

Polaris:
stabilizza Evie

Kintsugi:
termina Guardia Armata 03

Daisuke:
colpisce Kintsugi

Armatura Kintsugi:
compromessa

Kitsu:
ingresso

Kitsu → vetro di contenimento Vance

Tentativo:
rottura barriera

Illuminazione:
off

Sistema:
allarme

> COMLINK:

Kenji:
"Dove cazzo è mio padre?"

Daisuke:
"Uccidimi."

Kitsu:
bloccata da Daisuke

Esito:
liberazione immediata

Kitsu:
Compromissione barriera di contenimento Vance

Vance:
tentata fuga

Esito:
Fallimento per blocco impianti

01:53

Vance:
preme pulsante

[CORRUPT_DELETE]Daisuke[/CORRUPT_DELETE]
[CORRUPT_DELETE]Soldato: 
trauma esplosivo

Emergenza:
Necessaria manovra di primo socc[/CORRUPT_DELETE]
[DISPLAY:GLITCH]
[DISPLAY:BLUE]
[BGM:STOP]
[BGM 3]
[DISPLAY:GLITCH]

[CORRUPT_DELETE]健司、会いたかった[/CORRUPT_DELETE]

TRADUZIONE ATTIVA

TAICHI.MEM/99900

[INSTANT][SMALL]/aud/00622.bin[/SMALL][/INSTANT]

Taichi: "Mi hanno detto che hai un figlio."

[INSTANT][SMALL]/vis/00623.bin[/SMALL][/INSTANT]

Film "Neon Velocity", attualmente bloccato sull'auto a mezz'aria, intervallato da statico.
Daisuke in piedi dietro al televisore, maneggia dei cavi.

[INSTANT][SMALL]hap/00623.bin[/SMALL][/INSTANT]

Divano ruvido.

[INSTANT][SMALL]gus/00623.bin[/SMALL][/INSTANT]

Birra assunta da lattina.

[INSTANT][SMALL]/aud/00623.bin[/SMALL][/INSTANT]

Daisuke: "Sí beh, questa mattina é venuta qui Vanta, non volevo si incontrassero. L’ho portato da un suo amico."

- Ronzio televisore, schiocco elettrico-

[INSTANT][SMALL]/cog/00623.bin[/SMALL][/INSTANT]

Intende Vanta-9? È uno dei nomi noti tra i Cani di Cromo. Perché Daisuke lo sta dicendo con leggerezza? É stupido? Meglio non chiedere.

[INSTANT][SMALL]/vis/00624.bin[/SMALL][/INSTANT]

Daisuke nota lattina di birra vuota sul pavimento.
Daisuke calcia lattina dietro alla poltrona.
Daisuke prende la scossa.
Daisuke scuote la mano.
Film riprende.

[INSTANT][SMALL]/aud/00624.bin[/SMALL][/INSTANT]

Daisuke: "Almeno è ripartito. Scusa il disordine, non aspettavo ospiti."

Taichi: "Posso andare, se…"

Daisuke: "No, no, resta. Tu mi hai pagato la cena, io la preparo. É che pensavo mi avresti dato buca."

Taichi: "Mi hai invitato tu."

[INSTANT][SMALL]/vis/00624.bin[/SMALL][/INSTANT]

Auto sportiva atterra su strada.
Auto che insegue esplode.
Ragazza in testa si sporge dal finestrino e mostra il medio.

[INSTANT][SMALL]/aud/00625.bin[/SMALL][/INSTANT]

Daisuke: "Sí, beh, stavo scherzando, pensavo fosse scontato che mi avresti detto di no."

Taichi: "Non capisco se mi vuoi in casa tua."

Daisuke: "No, cioé sí, intendevo solo che si dicono tante cose di me giù al No Signal, quindi credevo mi avresti detto di no. Non sono abituato ad avere degli amici a casa."

[PAUSE:1000]

Daisuke: "Scusami."

-Risata fragorosa di Taichi-

[INSTANT][SMALL]/vis/00625.bin[/SMALL][/INSTANT]

Film si blocca su inquadratura del cofano dell'auto.

[INSTANT][SMALL]/aud/00626.bin[/SMALL][/INSTANT]

Daisuke: "Scusami, cazzo, non mi so esprimere."

Taichi: "Nah, sei divertente. Nemmeno io ho amici, comunque."

Daisuke: "Divertente?"

Taichi: "É un complimento." 

Daisuke: "Sí, lo so che é un…"

Taichi: "Oh cristo accetta che non fai schifo e basta!"

Daisuke: "Ok."

[PAUSE:2000]

Daisuke: "Non so cucinare."

Taichi: "Avevo intuito, cucino io. Adesso falla finita, voglio guardare il film."

Daisuke: "Se intendi i fanali dell’auto che tremano per un’altra mezz’ora..."

[PAUSE:1000]

Daisuke: "Si, tranquillo Daisuke, é un Hikari System CRT, il migliore sul mercato, certo Daisuke, é come nuovo, ma vaffanculo.

[INSTANT][SMALL]/vis/00626.bin[/SMALL][/INSTANT]

Daisuke lancia lattina piena su angolo televisore.
Film riparte.

[CRITICALGLITCH]

TAICHI.MEM/378900

[INSTANT][SMALL]/aud/00951.bin[/SMALL][/INSTANT]

Daisuke: "potresti trasferirti qui sai?"

[INSTANT][SMALL]/olf/0000962.bin[/SMALL][/INSTANT]

Salsa di soia
Manzo sintetico

[INSTANT][SMALL]/hap/0000959.bin[/SMALL][/INSTANT]

Bollente

[INSTANT][SMALL]/gus/0000782.bin[/SMALL][/INSTANT]

Salato
Verdure e carne liofilizzate

[INSTANT][SMALL]/aud/00952.bin[/SMALL][/INSTANT]

Daisuke: "Questa roba é spettacolare."

Taichi: "Quindi dovrei passare i sei mesi prima di partire a fare il cuoco per voi?"

Kenji: "Sí!"

Taichi: "Ok."

Daisuke: "Ti dispiace?"

Taichi: "Venire qui? No."

[INSTANT][SMALL]/cog/001123.bin[/SMALL][/INSTANT]

-Rilevato imbarazzo in Daisuke-

[PAUSE:2000]

Daisuke: "Chi ti ha insegnato a farlo?"

Taichi: "A fare cosa?"

Daisuke: "L’Hiyashi Chuka, deficente."

Taichi: "La cuoca dell’esercito, si chiama Kaori."

Daisuke: "Beh, ringraziamo Kaori."

Kenji: "Grazie Kaori."

Daisuke: "…e Taichi kun." 

Kenji: "Finito!"

[INSTANT][SMALL]/vis/00996.bin[/SMALL][/INSTANT]

Kenji si alza da tavola corre in direzione porta.

[INSTANT][SMALL]/aud/00953.bin[/SMALL][/INSTANT]

Daisuke: "E Taichi kun, Kenji!"

[INSTANT][SMALL]/vis/00997.bin[/SMALL][/INSTANT]

Kenji si ferma davanti alla porta, sbatte un piede a terra, abbassa la testa.

[INSTANT][SMALL]/aud/00954.bin[/SMALL][/INSTANT]

Kenji: "Grazie Taichi kun!!!"

[INSTANT][SMALL]/vis/00998.bin[/SMALL][/INSTANT]

Kenji si appende alla maniglia della porta e tira.

[INSTANT][SMALL]/aud/00955.bin[/SMALL][/INSTANT]

Daisuke: Oi! Dove credi di andare piccola scimmia? Cos’hai lì arrotolato sul braccio?

[INSTANT][SMALL]/vis/00998.bin[/SMALL][/INSTANT]

Kenji guarda la manica destra arrotolata, fa una linguaccia a Daisuke, corre a prendere il proprio piatto di plastica vuoto.
Kenji corre fuori dalla porta.

[INSTANT][SMALL]/aud/00956.bin[/SMALL][/INSTANT]

-Rumore di coperchio di bidone dei rifuti all'esterno.-

Daisuke: "Questa cosa funziona davvero."

Taichi: "Lo so. Rivolgetevi a mamma Taichi per altri consigli."

[INSTANT][SMALL]/vis/00998.bin[/SMALL][/INSTANT]

Daisuke sorride, si alza dalla sedia e riordina la tavola. Rilevata tristezza.

[INSTANT][SMALL]/aud/00957.bin[/SMALL][/INSTANT]

Taichi: "Scusami, non ci ho pensato."

Daisuke: "Non fa niente."

[CRITICALGLITCH]

TAICHI.MEM/941200

[INSTANT][SMALL]/aud/001234.bin[/SMALL][/INSTANT]

Taichi: "Non ci credo cazzo, non ci credo."

-Pianto di Kenji-

[INSTANT][SMALL]/olf/001221.bin[/SMALL][/INSTANT]

Disinfettante

[INSTANT][SMALL]/vis/001987.bin[/SMALL][/INSTANT]

Vetri rotti, sangue sul pavimento. 
Kenji preme garza imbevuta sulla mano. 
Taichi allontana Kenji, raccoglie schegge di vetro dal pavimento.

[INSTANT][SMALL]/aud/001234.bin[/SMALL][/INSTANT]

Daisuke: -trascinando le parole- "Te lo ripeto, non ha fatto nessun dannato rumore, sono arrivato e lui era a mani in giù sui vetri che piangeva.

[INSTANT][SMALL]/olf/001222.bin[/SMALL][/INSTANT]

Tequila economica

[INSTANT][SMALL]/vis/001987.bin[/SMALL][/INSTANT]

Taichi sposta coltello da tavolo a cassetto.
Taichi fa sedere Kenji sul tavolo.
Taichi arrotola bende attorno alle dita di Kenji

[INSTANT][SMALL]/aud/001235.bin[/SMALL][/INSTANT]

Taichi: "Cosa stavi facendo, Kenji?"

Kenji: -tirando su col naso- "Volevo fare lo Hiyashi-Chuka."

Taichi: "Certo, lo stracazzo di Hiyashi-Chuka."

Kenji: "Lo stracazzo di Hiyashi-Chuka…"

Daisuke: "Perfetto, grazie Taichi."

Taichi: "Tu non devi parlarmi, hai capito?"

Daisuke: "No, tu non mi devi parlare in questo modo. Io ho un problema ed é difficile."

Taichi: "Ah, hai un problema! E ce la stai proprio mettendo tutta, eh?" 

[INSTANT][SMALL]/vis/001987.bin[/SMALL][/INSTANT]

Taichi lancia strofinaccio insanguinato nel lavandino. 

[INSTANT][SMALL]/aud/001236.bin[/SMALL][/INSTANT]

Daisuke: "Io ci sto provando."

Taichi: "No, Daisuke, tu non ci devi provare, devi buttare via quella roba, andare nel primo minimarket che trovi e spendere tutti i tuoi soldi in cibo e vestiti nuovi. Con cosa pagherai tra quattro mesi quando io starò morendo a sud? Con i cinque eddie che guadagni per ogni merdoso display che aggiusti?"

Daisuke: "Come farò senza di te? Come prima che tu arrivassi, stronzo. Pensi che io non sia in grado? Vuoi aiutarmi? Chi cazzo te lo ha chiesto?"

[INSTANT][SMALL]/vis/001988.bin[/SMALL][/INSTANT]

Taichi fa tre passi verso Daisuke
Kenji corre davanti a Taichi per difendere Daisuke
Kenji si mette in guardia come un pugile


Taichi: "Preferisci siano gli scav che ti fanno riparare la loro merce a darti da mangiare? Pensi che non sappia chi fai entrare qui dentro?"

Daisuke: "Ma vaffanculo, Taichi. Fai finta di passartela tanto meglio di me. Vuoi sentirti un figo? Vuoi fare l’eroe in casa mia?"

[INSTANT][SMALL]/vis/001989.bin[/SMALL][/INSTANT]

Daisuke raccoglie bottiglia dal tavolino.
Daisuke sventola bottiglia verso Taichi sfiorando Kenji.
Kenji si sposta.

Daisuke: "I tuoi soldi sono più sporchi dei miei."

Kenji: "Vaffanculo, Taichi-kun!"

Daisuke: "Vuoi andare avanti ad ammazzare i poveracci come me, con la tua toppa rossa e nera sul braccio? Vuoi fare la bella vita? Prova a leccare il culo di Saburo più forte, vediamo se..."

[INSTANT][SMALL]/vis/001990.bin[/SMALL][/INSTANT]

Taichi raccoglie bicchiere di vetro da bancone.
Taichi lancia bicchiere in direzione di Daisuke.
Daisuke si sposta.
Bicchiere si frantuma contro il muro.

[INSTANT][SMALL]/aud/001238.bin[/SMALL][/INSTANT]

-Singhiozzi di Kenji-

[CORRUPT_DELETE]Daisuke: "Vatten[/CORRUPT_DELETE]
[DISPLAY:GLITCH]
ERRORE: L'accesso a TAICHI.MEM/941200 può compromettere le funzioni di KINTSUGI.SYS
ACCESSO NEGATO

[CRITICALGLITCH]

TAICHI.MEM/9631700

[INSTANT][SMALL]/aud/0023478.bin[/SMALL][/INSTANT]

Daisuke: "Pensaci domani Taichi, oggi non è ancora finita."

[INSTANT][SMALL]/olf/0021456.bin[/SMALL][/INSTANT]

Fumo di sigaretta

[INSTANT][SMALL]/gus/0011456.bin[/SMALL][/INSTANT]

Tabacco

[INSTANT][SMALL]/aud/0023479.bin[/SMALL][/INSTANT]

Taichi: "Facile per te. Non vai al macello tra dieci ore."

Daisuke: "Facile per me dici? Egocentrico."

-Risata di Taichi-

Daisuke: "Fai piano, Kenji dorme."

[INSTANT][SMALL]/vis/0024894.bin[/SMALL][/INSTANT]

Mano di Taichi lancia mozzicone su veranda.
Cinque mozziconi a terra.

[INSTANT][SMALL]/aud/0023480.bin[/SMALL][/INSTANT]

Daisuke: "Guarda alla tua sinistra."

Taichi: "Perchè cosa c'è a sinistra?"

Daisuke: "Guarda bene."

Taichi: "Sto guardando."

[INSTANT][SMALL]/vis/0024894.bin[/SMALL][/INSTANT]

Case del vicinato, uomo e donna parlano su muretto, cane fruga tra i rifiuti.

[INSTANT][SMALL]/aud/0023481.bin[/SMALL][/INSTANT]

Daisuke: "No hai ragione non c'è un cazzo lì. Voltati."

[INSTANT][SMALL]/vis/0024895.bin[/SMALL][/INSTANT]

Mano aperta di Daisuke.
Sul palmo cavi di rame e argento formano anello.

[INSTANT][SMALL]/aud/0023482.bin[/SMALL][/INSTANT]

Taichi: "Cos'è?"

Daisuke: "Dai, non si vede? Non è venuto così male."

Taichi: "No, è molto bello, devi averci messo un sacco. Lo appendo al collo insieme alla targhetta. Grazie, Daisuke." 

Daisuke: "Non sono sicuro tu abbia capito."

Taichi: "Cosa devo capire? E' un bel regalo."

Daisuke: "Non vuoi sposarmi?"

Taichi: "Cosa?"

[PAUSE:2000]

Daisuke: "Non vuoi?"

Taichi: "Daisuke sto per andare al fronte, non tornerò più probabilmente. E poi chi cazzo ci sposa? Dove? Qui?"

Daisuke: "E come pensi abbia fatto l'ultima volta? Vado ai registri locali, mi basta una dichiarazione firmata da te."

[INSTANT][SMALL]/vis/0024895.bin[/SMALL][/INSTANT]

Mano di Taichi raccoglie anello da palmo Daisuke.

[INSTANT][SMALL]/aud/0023483.bin[/SMALL][/INSTANT]

[PAUSE:2000]

Taichi: "Perchè?"

Daisuke: "Perchè no?"

Taichi: "Morirò."

Daisuke: "Non morirai. "

Taichi: "Daisuke."

Daisuke: "Non morirai, tornerai qui. Anche se ti manca una gamba o un occhio o se ti restano sei dita."

[INSTANT][SMALL]/vis/0024896.bin[/SMALL][/INSTANT]

Mani giunte di Taichi stringono anello.
Busto Taichi si piega in avanti.

[INSTANT][SMALL]/hap/0010567.bin[/SMALL][/INSTANT]

Nodo alla gola

[INSTANT][SMALL]/aud/0023484.bin[/SMALL][/INSTANT]

Daisuke: "Ehi, guardami."

[INSTANT][SMALL]/vis/0024896.bin[/SMALL][/INSTANT]

Daisuke si alza da sedia di plastica.
Daisuke si china davanti a Taichi.
Vista Taichi annebbiata: lacrime.

[INSTANT][SMALL]/aud/0023485.bin[/SMALL][/INSTANT]

Daisuke: "Tu sopravvivi e io nel frattempo faccio lo stesso. Non raccontiamoci balle, è merito tuo se adesso bevo forse un bicchiere al giorno. Però ho bisogno che torni per smettere, perchè sono un debole del cazzo. Tu sei un vero soldato quando ti arrabbi, a volte mi spaventi, quindi tornerai, me lo sento.

[PAUSE:1000]

Taichi: "Ho paura."

[INSTANT][SMALL]/hap/0010568.bin[/SMALL][/INSTANT]

Abbraccio

[INSTANT][SMALL]/aud/0023486.bin[/SMALL][/INSTANT]

Daisuke: "Nel peggiore dei casi ti vengo a cercare e rimetto insieme i pezzi, imparerò a farlo. 

Taichi: "Fai il serio."

Daisuke: "Sono serio. Ma non succederà, tu tornerai e dopo penseremo a mettere a posto queste nostre teste bacate. Tu la mia e io la tua. Ci stai?"

Taichi: "Ok." 

Daisuke: "Quindi è un sì?"

Taichi: "Sì."

Daisuke: "Sicuro sicuro?"

Taichi: "Piantala."

-Singhiozzo Taichi-

Daisuke: "Ti amo."

[INSTANT][SMALL]/hap/0010568.bin[/SMALL][/INSTANT]

[CORRUPT_DELETE]Bacio Daisu[/CORRUPT_DELETE]

[DISPLAY:RED]
[BGM3:STOP]
[BGM 2]

Tatto Kintsugi:
Poltiglia sul viso
[DISPLAY:GLITCH]
Volto Daisuke:
Poltiglia a terra
[DISPLAY:GLITCH]
[CORRUPT_DELETE]Daisuke: 
"Per chi lo hai fatto?"[/CORRUPT_DELETE]

[CORRUPT_DELETE]Kenji:[/CORRUPT_DELETE]
Polaris:
Utilizza voce Kenji

Polaris:
"Dobbiamo andare"

Kintsugi:
interruzione contatto

Kintsugi:
Recupero Evie

Polaris:
Assistenza Freak Show

Kintsugi, Polaris, Freak Show, Evie → corridoio

Sasha:
identificato

Cinghie paracadute:
Stabili

Evie:
Assicurata a Kintsugi tramite cinghie

Lancio:
Eseguito
[DISPLAY:GLITCH]
Feedback uditivo:
Voce ovattata

Provenienza:
Night City, dirigibile

Feedback ottiche:
Volto Sasha

Trasmissione:
Schermi Night City

Nota:
Troppo lontano per vedere bene

Contenuto:
...Vance ha preso mia madre...
...venduta... 
...uccisa...
...trovato il suo nascondiglio...
...la polizia non farà mai niente...
...prove seppellite a coordinate...
...addio màlen'kaya ptìtsa...

[DISPLAY:GLITCH]

Evento critico:
esplosione

Allerta critica:
caduta detriti

[DISPLAY:GLITCH]
[CORRUPT_DELETE]Voce Sasha: 
"Visto? Io avevo una buona ragione."[/CORRUPT_DELETE]
[DISPLAY:GLITCH]

—

FINE REGISTRAZIONE PARZIALE
[DISPLAY:GLITCH]
`;





const typedText = document.getElementById("typed-text");

const terminal = document.getElementById("terminal");

const mainCursor = document.getElementById("main-cursor");





let messageIndex = 0;

let charIndex = 0;

let introIndex = 0;

let phase = "boot";

let paused = false;

let fastMode = false;




let enterPressed = false;

let enterHoldTimer = null;

let touchHoldTimer = null;

let longTouchTriggered = false;



const ENTER_HOLD_DELAY = 250;

const TOUCH_HOLD_DELAY = 350;

const TOUCH_MOVE_THRESHOLD = 12;



let touchStartX = 0;

let touchStartY = 0;

let touchMoved = false;




function showMainCursor() {

    if (mainCursor)

        mainCursor.classList.remove("hidden");

}



function hideMainCursor() {

    if (mainCursor)

        mainCursor.classList.add("hidden");

}

[
    "gesturestart",
    "gesturechange",
    "gestureend",
    "selectstart",
    "contextmenu"

].forEach((eventName) => {

    document.addEventListener(eventName, (e) => {

        e.preventDefault();

    }, { passive: false });

});




// CONTROLLI PC

document.addEventListener("keydown", (e) => {

    if (e.key !== "Enter" || phase !== "final") return;


    e.preventDefault();


    if (!enterPressed) {

        enterPressed = true;


        enterHoldTimer = setTimeout(() => {

            fastMode = true;
            paused = false;

        }, ENTER_HOLD_DELAY);

    }

});



document.addEventListener("keyup", (e) => {


    if (e.key !== "Enter" || phase !== "final") return;


    e.preventDefault();


    clearTimeout(enterHoldTimer);



    if (!fastMode) {

        paused = !paused;

    }



    fastMode = false;

    enterPressed = false;


});






// CONTROLLI MOBILE


terminal.addEventListener("touchstart", (e) => {


    if (phase !== "final") return;


    const touch = e.touches[0];


    touchStartX = touch.clientX;

    touchStartY = touch.clientY;


    touchMoved = false;

    longTouchTriggered = false;



    clearTimeout(touchHoldTimer);



    touchHoldTimer = setTimeout(() => {


        if (!touchMoved) {


            longTouchTriggered = true;

            fastMode = true;

            paused = false;


        }


    }, TOUCH_HOLD_DELAY);



}, { passive: true });






terminal.addEventListener("touchmove", (e) => {


    if (phase !== "final") return;


    const touch = e.touches[0];


    const deltaX = Math.abs(touch.clientX - touchStartX);

    const deltaY = Math.abs(touch.clientY - touchStartY);



    if (
        deltaX > TOUCH_MOVE_THRESHOLD ||
        deltaY > TOUCH_MOVE_THRESHOLD
    ) {


        touchMoved = true;

        clearTimeout(touchHoldTimer);


        fastMode = false;

        longTouchTriggered = false;


    }


}, { passive: true });






terminal.addEventListener("touchend", () => {


    if (phase !== "final") return;


    clearTimeout(touchHoldTimer);



    if (!longTouchTriggered && !touchMoved) {

        paused = !paused;

    }



    fastMode = false;

    longTouchTriggered = false;

    touchMoved = false;



}, { passive: true });







// AVVIO


function startBootSequence() {


    hideMainCursor();


    typedText.textContent = "AVVIO";


    animateBootDots(0);


}




function animateBootDots(cycle) {


    if (cycle >= 3) {


        setTimeout(() => {


            typedText.textContent = "";

            showMainCursor();

            typeBoot();



        }, 600);


        return;

    }




    let dots = 0;



    const dotInterval = setInterval(() => {



        dots++;


        typedText.textContent =
            "AVVIO" + ".".repeat(dots);




        if (dots === 3) {


            clearInterval(dotInterval);



            setTimeout(() => {



                typedText.textContent = "AVVIO";



                setTimeout(() => {


                    animateBootDots(cycle + 1);



                }, 300);



            }, 500);



        }



    }, 350);


}






// BOOT


function typeBoot() {


    const currentMessage = bootMessages[messageIndex];



    if (charIndex < currentMessage.length) {



        typedText.textContent =
            currentMessage.substring(0, charIndex + 1);



        charIndex++;



        setTimeout(typeBoot, 35);



    } else {



        setTimeout(() => {



            messageIndex++;



            if (messageIndex >= bootMessages.length) {



                typedText.textContent = "";

                charIndex = 0;


                phase = "auth";


                showAuthLines();


                return;


            }



            charIndex = 0;


            typedText.textContent = "";


            typeBoot();



        }, 600);



    }



}






// AUTENTICAZIONE


function showAuthLines() {


    let authIndex = 0;



    function showLine() {


        if (authIndex < authLines.length) {



            typedText.textContent +=
                authLines[authIndex] + "\n";



            authIndex++;



            setTimeout(showLine, 400);



        } else {



            setTimeout(() => {



                typedText.textContent = "";



                setTimeout(() => {



                    phase = "intro";


                    showIntroLines();



                }, 300);



            }, 800);



        }



    }



    showLine();



}






// INTRO


function showIntroLines() {



    if (introIndex < introLines.length) {



        typedText.textContent +=
            introLines[introIndex] + "\n";



        introIndex++;



        terminal.scrollTop = terminal.scrollHeight;



        setTimeout(showIntroLines, 300);



    } else {



        typedText.textContent += "\n";


        phase = "final";



        setTimeout(typeFinal, 2000);



    }



}







// TESTO FINALE

// TESTO FINALE

function typeFinal() {

    if (charIndex >= finalText.length) return;


    if (paused) {

        setTimeout(typeFinal, 80);

        return;

    }



    const wasAtBottom =
    terminal.scrollTop + terminal.clientHeight >=
    terminal.scrollHeight - 30;



    const charsPerTick = fastMode ? 5 : 1;



    for (
        let i = 0;
        i < charsPerTick &&
        charIndex < finalText.length;
        i++
    ) {



        if (finalText.startsWith(corruptDeleteStart, charIndex)) {


            const endIndex =
                finalText.indexOf(
                    corruptDeleteEnd,
                    charIndex
                );


            if (endIndex !== -1) {


                const textToCorrupt =
                    finalText.slice(
                        charIndex + corruptDeleteStart.length,
                        endIndex
                    );


                charIndex =
                    endIndex + corruptDeleteEnd.length;


                typeCorruptAndDelete(textToCorrupt);

                return;

            }

        }



        if (finalText.startsWith(textCorruptTrigger, charIndex)) {


            charIndex += textCorruptTrigger.length;


            triggerTextCorruption();


            continue;

        }

        if (finalText.startsWith(pauseTrigger, charIndex)) {

    const endPause = finalText.indexOf("]", charIndex);

    if (endPause !== -1) {

        const duration =
            parseInt(
                finalText.slice(
                    charIndex + pauseTrigger.length,
                    endPause
                )
            );

        charIndex = endPause + 1;

        setTimeout(typeFinal, duration);

        return;
        }

    }

    if (finalText.startsWith(instantStart, charIndex)) {

    const endInstant =
        finalText.indexOf(
            instantEnd,
            charIndex
        );


    if (endInstant !== -1) {


        const instantText =
            finalText.slice(
                charIndex + instantStart.length,
                endInstant
            );


        // istantaneo
        typedText.innerHTML +=
    instantText.replace(
        /\[SMALL\](.*?)\[\/SMALL\]/g,
        '<span class="small-text">$1</span>'
    );

const smallElements = typedText.querySelectorAll(".small-text");

smallElements.forEach(el => {
    el.style.fontSize = "0.6em";
});


        charIndex =
            endInstant + instantEnd.length;


        continue;

    }


}

        if (finalText.startsWith(smallStart, charIndex)) {

            const endSmall =
                finalText.indexOf(
                    smallEnd,
                    charIndex
                );


            if (endSmall !== -1) {

                const smallText =
                    finalText.slice(
                        charIndex + smallStart.length,
                        endSmall
                    );


                typedText.innerHTML +=
                    `<span class="small-text">${smallText}</span>`;


                charIndex =
                    endSmall + smallEnd.length;


                continue;

            }

        }


        if (finalText.startsWith(displayBlueTrigger, charIndex)) {


            charIndex += displayBlueTrigger.length;


            executeSystemCommand("DISPLAY:BLUE");


            continue;

        }




        if (finalText.startsWith(displayRedTrigger, charIndex)) {


            charIndex += displayRedTrigger.length;


            executeSystemCommand("DISPLAY:RED");


            continue;

        }

        if (finalText.startsWith(displayGlitchTrigger, charIndex)) {


    charIndex += displayGlitchTrigger.length;


    triggerDisplayGlitch();


    return;


}




        if (finalText.startsWith(bgmStopTrigger, charIndex)) {


            charIndex += bgmStopTrigger.length;


            executeSystemCommand("BGM:STOP");


            continue;

        }




        if (finalText.startsWith(bgm2Trigger, charIndex)) {


            charIndex += bgm2Trigger.length;


            executeSystemCommand("BGM 2");


            continue;

        }

        if (finalText.startsWith(bgm3Trigger, charIndex)) {

    charIndex += bgm3Trigger.length;

    executeSystemCommand("BGM 3");

    continue;

}


if (finalText.startsWith(bgm3StopTrigger, charIndex)) {

    charIndex += bgm3StopTrigger.length;

    executeSystemCommand("BGM3:STOP");

    continue;

}




        if (finalText.startsWith(criticalTrigger, charIndex)) {


            charIndex += criticalTrigger.length;


            triggerCriticalGlitch();


            return;

        }




        if (finalText.startsWith(glitchTrigger, charIndex)) {


            charIndex += glitchTrigger.length;


            triggerGlitchEffect();


            return;

        }




        typedText.innerHTML +=
    finalText.charAt(charIndex);


        charIndex++;


    }





    if (wasAtBottom) {

    terminal.scrollTop = terminal.scrollHeight;

}





    if (fastMode) {


        setTimeout(typeFinal, 8);



    } else if (finalText.charAt(charIndex) === "\n") {


        setTimeout(typeFinal, 150);



    } else {


        setTimeout(typeFinal, 34);


    }

}

//TESTO CORRUPT DELETE e anche quando sfarfalla e basta

function typeCorruptAndDelete(text) {


    let i = 0;

    let visibleText = "";



    function type() {


        if (i < text.length) {


            visibleText += text[i];


            typedText.textContent += text[i];


            i++;


            terminal.scrollTop = terminal.scrollHeight;



            setTimeout(
                type,
                fastMode ? 5 : 50
            );



        } else {


            setTimeout(corrupt, 500);


        }


    }





    let corruptCycles = 0;




    function corrupt() {



        if (corruptCycles === 0) {


            playSound(corruptSound);


        }






        if (corruptCycles < 8) {



            let corrupted = "";



            for (let j = 0; j < visibleText.length; j++) {



                const original = visibleText[j];



                const mapped =
                    corruptMap[original] ||
                    corruptMap[original.toUpperCase()];



                corrupted +=
                    Math.random() < 0.4 && mapped
                    ? mapped
                    : original;



            }





            typedText.textContent =
                typedText.textContent.slice(
                    0,
                    -visibleText.length
                )
                +
                corrupted;




            corruptCycles++;



            setTimeout(corrupt, 70);



        } else {



            setTimeout(deleteText, 250);



        }



    }





    function deleteText() {



        typedText.textContent =
            typedText.textContent.slice(
                0,
                -visibleText.length
            );



        visibleText = "";



        setTimeout(typeFinal, 80);



    }





    type();



}






function triggerTextCorruption() {

    let cycles = 0;

    const maxCycles = 8;

    const originalText = typedText.textContent;


    const interval = setInterval(() => {


        let corrupted = "";


        for (let i = 0; i < originalText.length; i++) {


            const char = originalText[i];


            const mapped =
                corruptMap[char] ||
                corruptMap[char.toUpperCase()];


            corrupted +=
                Math.random() < 0.15 && mapped
                ? mapped
                : char;

        }


        typedText.textContent = corrupted;


        cycles++;


        if (cycles >= maxCycles) {


            clearInterval(interval);


            typedText.textContent = originalText;


        }


    }, 70);

}


// GLITCH RANDOM


function triggerGlitchEffect() {


    playSound(glitchSound);



    const screen =
        document.querySelector(".crt-screen");



    const glitchChars =
        "█▓▒░#@$%&01ΔΞΩ";



    let cycles = 0;

    let currentLine = "";







    const interval = setInterval(() => {



        if (currentLine.length > 0) {



            typedText.textContent =
                typedText.textContent.slice(
                    0,
                    -(currentLine.length + 1)
                );

        }





        currentLine = "";



        for (let i = 0; i < 26; i++) {



            currentLine +=
                glitchChars[
                    Math.floor(
                        Math.random() *
                        glitchChars.length
                    )
                ];



        }





        typedText.textContent +=
            "\n" + currentLine;







       if (screen) {

    screen.style.transform =
        "translate(4px, -4px)";

}






        terminal.scrollTop =
            terminal.scrollHeight;



        cycles++;






        if (cycles >= 10) {

    clearInterval(interval);

    typedText.textContent =
        typedText.textContent.slice(
            0,
            -(currentLine.length + 1)
        );


    if (screen) {

        screen.style.transform =
            "translate(0,0)";

    }


    typedText.style.textShadow =
    "0 0 5px rgba(255,0,0,0.8)";


    setTimeout(typeFinal, 250);

}





    }, 45);



}









// CRITICAL GLITCH


function triggerCriticalGlitch() {


    playSound(criticalGlitchSound);




    const screen =
        document.querySelector(".crt-screen");




    const glitchChars =
        "█▓▒░#@$%&01ΔΞΩERRORCRITICAL";





    let cycles = 0;

    let currentLine = "";





    if (screen) {


        screen.style.animation = "none";


    }







    const interval = setInterval(() => {



        if (currentLine.length > 0) {



            typedText.textContent =
                typedText.textContent.slice(
                    0,
                    -(currentLine.length + 1)
                );



        }





        currentLine = "";





        for (let i = 0; i < 34; i++) {



            currentLine +=
                glitchChars[
                    Math.floor(
                        Math.random() *
                        glitchChars.length
                    )
                ];



        }






        typedText.textContent +=
            "\n" + currentLine;

            typedText.style.textShadow =
`
-3px 0 rgba(255,0,0,0.8),
3px 0 rgba(0,150,255,0.8),
0 0 5px rgba(255,255,255,0.5)
`;








        if (screen) {



            screen.style.transform =
                `translate(
                    ${Math.random() * 14 - 7}px,
                    ${Math.random() * 10 - 5}px
                )`;



            screen.style.opacity =
                cycles % 2 === 0
                ? "0.25"
                : "1";



        }






        terminal.scrollTop =
            terminal.scrollHeight;




        cycles++;







        if (cycles >= 12) {



            clearInterval(interval);





            typedText.textContent =
                typedText.textContent.slice(
                    0,
                    -(currentLine.length + 1)
                );






            if (screen) {



                screen.style.opacity = "0";

                screen.style.transform =
                    "scaleY(0.03)";



            }







            setTimeout(() => {

    if (screen) {

    screen.style.opacity = "1";

    screen.style.transform = "none";

    // reset animazioni inline
    screen.style.animation = "";

    void screen.offsetWidth;

    screen.style.animation =
        "crtGlitch 6s infinite";

}


    if (typedText) {

        typedText.style.removeProperty("text-shadow");
        typedText.style.removeProperty("transform");

        void typedText.offsetHeight;

    }


    setTimeout(
        typeFinal,
        400
    );


}, 1000);




        }





    }, 45);



}

// DISPLAY RGB VHS GLITCH

function triggerDisplayGlitch() {


    const screen =
        document.querySelector(".crt-screen");


    const text = typedText;


    playSound(corruptSound);


    let cycles = 0;


    if (screen) {

        screen.classList.add("rgb-glitch");

    }



    const interval = setInterval(() => {



        if (text) {

    text.style.textShadow = `

    -3px 0 rgba(255,0,0,0.8),
     3px 0 rgba(0,255,255,0.8),
     0 0 6px rgba(255,255,255,0.5)

    `;

}


// MOVIMENTO SCHERMO GLIT
if (screen) {

    screen.style.transform =
    `
    translate(
        ${Math.random() * 8 - 4}px,
        ${Math.random() * 8 - 4}px
    )
    `;

}



        cycles++;



        if (cycles >= 15) {


            clearInterval(interval);



            if (screen) {


                screen.classList.remove(
                    "rgb-glitch"
                );


                screen.style.transform =
                    "none";


            }



            if (text) {


                text.style.transform =
                    "none";


                text.style.removeProperty("text-shadow");

                void text.offsetHeight;


            }


            // QUESTO FA RIPARTIRE IL TESTO
            setTimeout(
                typeFinal,
                250
            );


        }



    },50);


}

// STORAGE DISC TAP TO ACCESS

const startOverlay =
    document.getElementById("start-overlay");

const startTyped =
    document.getElementById("start-typed");



const storageText =
    ">TAP TO ACCESS: TEMP_CACHE>";



let storageIndex = 0;

let storageReady = false;

let startClicked = false;






function typeStorageDisc() {


    if (!startTyped) return;



    if (storageIndex < storageText.length) {



        startTyped.textContent +=
            storageText.charAt(storageIndex);



        storageIndex++;



        setTimeout(
            typeStorageDisc,
            70
        );



    } else {



        storageReady = true;



    }



}








async function handleStart(e) {



    e.preventDefault();




    if (!storageReady || startClicked)

        return;





    startClicked = true;





    await startAudio();





    startOverlay.style.display = "none";





    startBootSequence();





}








if (startOverlay && startTyped) {



    typeStorageDisc();





    startOverlay.addEventListener(
        "touchstart",
        handleStart,
        {
            passive: false
        }
    );





    startOverlay.addEventListener(
        "click",
        handleStart
    );





} else {



    startBootSequence();



}