const url = "https://bible-api.com/" 
const translation = "?translation=kjv";

// Fetch book list when the page loads and print to the DOM book dropdown
const bookList = async () => {
    let response = await fetch("https://bible-api.com/data/kjv",{method: "GET", cache: "no-cache"});
    let jsonResponse = {};
    try {
        if(response.ok){
            jsonResponse = await response.json();
            let len = jsonResponse.books.length;
        } 
    } catch (error) {
        console.log(error);
    }
    jsonResponse.books.forEach((x) => {
        let opt = document.createElement("option");
        opt.value = x.id;
        opt.innerHTML = x.name;
        document.getElementById('book').appendChild(opt);
    });
};

bookList();

// Fetch chapter list after book is selected and print to the DOM chapter dropdown
const chapterList = async () => {
    let option = document.createElement("option");
    option.selected = true;
    option.innerHTML = "Choose a chapter:";
    document.getElementById('chapter').replaceChildren(option);

    let book = document.getElementById('book').value;
    let url = "https://bible-api.com/data/kjv/" + book;

    let response = await fetch(url, {method: "GET", cache: "no-cache"})
    let jsonResponse = {};
    try { 
        if (response.ok) {
        jsonResponse = await response.json();
    }} catch (error) {
        console.log(error);
    }

    jsonResponse.chapters.forEach((x) => {
        // console.log(x);
        let opt = document.createElement('option');
        opt.value = x.chapter;
        opt.innerHTML = x.chapter;
        document.getElementById('chapter').appendChild(opt);
    })
}

// Fetch verses list after chapter is selected from book and print to the DOM verse dropdown
const verseList = async () => {
    let option = document.createElement("option");
    option.selected = true;
    option.innerHTML = "Choose a verse:"
    document.getElementById('verse').replaceChildren(option);

    let book = document.getElementById('book').value;
    let chapter = document.getElementById('chapter').value;
    let url = `https://bible-api.com/data/kjv/${book}/${chapter}`;

    let response = await fetch(url, {method: "GET", cache: "no-cache"});
    let jsonResponse = {};
    try{
        if (response.ok) {
            jsonResponse = await response.json();
        }
    } catch(error){
        console.log(error);
    }

    jsonResponse.verses.forEach((x) => {
        let opt = document.createElement('option');
        opt.value = x.verse;
        opt.innerHTML = x.verse;
        document.getElementById('verse').appendChild(opt);
    })
}

// Keeps verse select option clean when either book or chapter dropdowns are changed without selecting the verse
const optVerse = () => {
    let optVerse = document.createElement('option');
    optVerse.selected = true;
    optVerse.innerHTML = "Choose a verse:";
    document.getElementById('verse').replaceChildren(optVerse);
}

// Retrieves selected text from API
const textRetrieval = async () => {
    let book = document.getElementById('book').value;
    let chapter = document.getElementById('chapter').value;
    let verse = document.getElementById('verse').value;
    let revealText = document.getElementById('verseText');
    let revealRef = document.getElementById('verseRef')
 
    if(book === "Choose a book:" || chapter === "Choose a chapter:" || verse === "Choose a verse:"){
        console.log("Please fill out all fields");
        revealText.replaceChildren("");
        revealRef.replaceChildren("");
        let icon = document.createElement("i");
        let br = document.createElement("br");
        revealText.append("Please fill out all fields");
        revealText.style.color = "red";
        return;
    };

    let finalURL = url + book + "%20" + chapter + ":" + verse + translation;
    let response = await fetch(finalURL,{method: "GET", cache: "no-cache"})
    let jsonResponse = {};
    try{
        if(response.ok){
            jsonResponse = await response.json();
            console.log(`${jsonResponse.text}` & "<br>" & `${jsonResponse.reference}`);
        }
    } catch(error) {
        console.log(error)
    }

    let data = JSON.stringify({
        text: jsonResponse.text,
        reference: jsonResponse.reference
    })

    console.log(data);

    revealText.replaceChildren("");
    revealRef.replaceChildren("");
    revealText.style.color = "";
    revealText.append(`${jsonResponse.text}`);
    // revealVerse.appendChild(lineBreak);
    revealRef.append(`${jsonResponse.reference}`);

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    let post = new Request("https://high-balancer-452319-n8.rj.r.appspot.com/history", 
        {
            method: "POST", 
            mode: "cors",
            headers: headers,
            body: data,
            redirect: "follow"
        })
    fetch(post);
}