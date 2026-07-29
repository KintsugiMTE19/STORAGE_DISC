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

    const screen =
    document.querySelector(".crt-screen");


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





const finalText = `13:00
Uscita → Teatro
[DISPLAY:GLITCH]
[CRITICALGLITCH]
[DISPLAY:BLUE]
[BGM:STOP]
[DISPLAY:GLITCH]
[BGM 2]
[BGM 3]
ERRORE:
REALITY DESYNCHRONIZATION
CMWODKMKCOW

[TEXT:CORRUPT]
CDWNJKNJKSDN
AKQWLKLKEKQLLK
[DISPLAY:GLITCH]
FKMEKmklsncjflòalmvfklenv
dcsmkjvnkjk

[TEXT:CORRUPT][TEXT:CORRUPT]
CDWNJKNJKSDN
AKQWLKLKEKQLLK
FKMEKmklsncjflòalmvfklenv
dcsmkjvnkjk

[TEXT:CORRUPT][TEXT:CORRUPT]
CDWNJKNJKSDN
AKQWLKLKEKQLLK
FKMEKmklsncjflòalmvfklenv
dcsmkjvnkjk

[TEXT:CORRUPT][TEXT:CORRUPT]
CDWNJKNJKSDN
AKQWLKLKEKQLLK
FKMEKmklsncjflòalmvfklenv
dcsmkjvnkjk

[TEXT:CORRUPT][TEXT:CORRUPT]
CDWNJKNJKSDN
AKQWLKLKEKQLLK
FKMEKmklsncjflòalmvfklenv
dcsmkjvnkjk

[TEXT:CORRUPT][TEXT:CORRUPT]
CDWNJKNJKSDN
AKQWLKLKEKQLLK
FKMEKmklsncjflòalmvfklenv
dcsmkjvnkjk

[TEXT:CORRUPT]



[DISPLAY:RED]
[BGM3:STOP]


—

FINE REGISTRAZIONE PARZIALE
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
        terminal.scrollHeight - 5;



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




        typedText.textContent +=
            finalText.charAt(charIndex);


        charIndex++;


    }





    if (wasAtBottom) {

        terminal.scrollTop =
            terminal.scrollHeight;

    }





    if (fastMode) {


        setTimeout(typeFinal, 8);



    } else if (finalText.charAt(charIndex) === "\n") {


        setTimeout(typeFinal, 150);



    } else {


        setTimeout(typeFinal, 55);


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
        document.querySelector(".screen-shake");



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
        document.querySelector(".screen-shake");




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
        document.querySelector(".screen-shake");


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


// MOVIMENTO SCHERMO GLITCH
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