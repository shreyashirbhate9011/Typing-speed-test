const words = [
    "The", "quick", "brown", "fox", "jumps",
    "over", "the", "lazy", "dog", "in",
    "the", "park", "under", "the", "blue",
    "sky", "amidst", "the", "green", "trees",
    "beside", "the", "rippling", "stream", "flowing",
    "gently", "through", "the", "meadow", "underneath",
    "the", "golden", "sunlight", "shining", "brightly",
    "on", "the", "world", "full", "of",
    "wonders", "and", "endless", "possibilities", "waiting",
    "to", "be", "explored", "by", "curious",
    "minds", "and", "adventurous", "spirits", "forever",
    "seeking", "knowledge", "and", "wisdom", "in",
    "the", "journey", "of", "life", "itself",
    "the", "be", "to", "of", "and",
    "a", "in", "that", "have", "I",
    "it", "for", "not", "on", "with",
    "he", "as", "you", "do", "at",
    "this", "but", "his", "by", "from",
    "they", "we", "say", "her", "she",
    "or", "an", "will", "my", "one",
    "all", "would", "there", "their", "what",
    "so", "up", "out", "if", "about",
    "who", "get", "which", "go", "me",
    "when", "make", "can", "like", "time",
    "no", "just", "him", "know", "take",
    "people", "into", "year", "your", "good",
    "some", "could", "them", "see", "other",
    "than", "then", "now", "look", "only",
    "come", "its", "over", "think", "also",
    "back", "after", "use", "two", "how",
    "our", "work", "first", "well", "way",
    "even", "new", "want", "because", "any",
    "these", "give", "day", "most", "us",
    "make", "very", "great", "since", "through",
    "much", "same", "own", "before", "found",
    "live", "world", "here", "where", "after",
    "back", "little", "only", "round", "man",
    "year", "came", "show", "every", "good",
    "me", "give", "our", "under", "name",
    "very", "line", "just", "before", "away",
    "old", "need", "both", "big", "high",
    "though", "thought", "against", "few", "while",
    "along", "might", "just", "must", "went",
    "place", "word", "answer", "school", "read",
    "point", "high", "how", "kind", "again",
    "each", "they", "found", "spell", "add",
    "even", "land", "here", "must", "big",
    "such", "follow", "act", "why", "ask",
    "men", "change", "went", "light", "kind",
    "off", "need", "house", "picture", "try",
    "us", "again", "animal", "point", "mother",
    "world", "near", "build", "self", "earth",
    "father", "head", "stand", "own", "page",
    "should", "country", "found", "answer", "school",
    "grow", "study", "still", "learn", "plant",
    "cover", "food", "sun", "four", "between",
    "state", "keep", "eye", "never", "last"
];

const successSound = new Audio('success.mp3');
const msgSound = new Audio('msg.mp3');
successSound.playbackRate = 1;
msgSound.playbackRate = 1;

let timer = 15;
let timerForCalc = timer;

let word1 = document.querySelector("#word1");
let word2 = document.querySelector("#word2");
let word3 = document.querySelector("#word3");
let word4 = document.querySelector("#word4");
let word5 = document.querySelector("#word5");

let textBox = document.querySelector("#text-box");

let timerElement = document.querySelector("#timer");
let wpmElement = document.querySelector("#wpm");
let accuracyElement = document.querySelector("#accuracy");
let statusElement = document.querySelector("#status");

let typedText = "";
let correctWords = 0;
let totalCharacterTyped = 0;
let totalWordsTyped = 0;

let wpm = 0;
let accuracy = 0;

let input = 0;

let generate = () => {
    
    msgSound.play();

    let i1 = Math.floor(Math.random() * words.length);
    let i2 = Math.floor(Math.random() * words.length);
    let i3 = Math.floor(Math.random() * words.length);
    let i4 = Math.floor(Math.random() * words.length);
    let i5 = Math.floor(Math.random() * words.length);
    word1.innerHTML = words[i1];
    word2.innerHTML = words[i2];
    word3.innerHTML = words[i3];
    word4.innerHTML = words[i4];
    word5.innerHTML = words[i5];

    timerElement.innerHTML = timer;
    wpmElement.innerHTML = 0;
    accuracyElement.innerHTML = 0;
    statusElement.innerHTML = "Not Started";
    statusElement.style = "color:#d14900;";
}

let start = () => {
    textBox.focus();
    statusElement.innerHTML = "On going"
    statusElement.style = "color:green;";


    const interval = setInterval(() => {
        if (timer > 0) {
            timer -= 1; 
            document.querySelector("#timer").innerHTML = timer;
        } else {
            calculate();
            successSound.play();
            // bellSound.play();                
            textBox.disabled = true;

            statusElement.innerHTML = "Ended"
            statusElement.style = "color:crimson;";

            document.querySelector("#wpm").innerHTML = isNaN(wpm) ? 0 : wpm;
            document.querySelector("#accuracy").innerHTML = isNaN(accuracy) ? 0 : accuracy;
            clearInterval(interval);
        }
    }, 1000);

}

let reset = () => {
    document.location.reload();
}


let calculate = () => {
    console.log(totalCharacterTyped);
    console.log(totalWordsTyped);
    console.log(correctWords);

    if (totalWordsTyped !== "") {
        let denominator = timerForCalc / 60;
        wpm = Math.round(totalWordsTyped / denominator);
        console.log(denominator);
        console.log(wpm);

        accuracy = Math.round((correctWords / totalWordsTyped) * 100);
    }
}

textBox.addEventListener('keydown', function (event) {
    const key = event.key;
    if (!/[a-zA-Z0-9\s]/.test(key)) {
        event.preventDefault();
        return;
    }

    if (key === "Backspace") {
        typedText = typedText.slice(0, -1);
        return;
    }

    if (key === " ") {
        totalWordsTyped++;
        totalCharacterTyped += textBox.value.length;

        if (typedText === textBox.value) {
            correctWords++;
        }

        event.preventDefault();
        word1.innerHTML = word2.innerHTML;
        word2.innerHTML = word3.innerHTML;
        word3.innerHTML = words[Math.floor(Math.random() * words.length)];
        textBox.value = typedText = "";

    }

});

textBox.addEventListener('input', function (event) {

    if (input === 0) {
        start();
    }
    input++;
    // calculate();
    let toBeTypedText = word1.innerHTML;
    let inputText = event.target.value;

    let characterTyped = inputText.slice(-1);


    if (toBeTypedText.startsWith(typedText + characterTyped)) {
        // document.querySelector("#word1").innerHTML
        typedText += characterTyped;

        word1.style = "text-decoration:none;";

        // console.log(toBeTypedText);
        // console.log(typedText);

    } else {
        word1.style = "text-decoration:line-through;color:crimson";
    }


});

generate();

