// if user add the note add it to localstorage
showNotes();
let addbtn = document.querySelector('#addBtn');
addbtn.addEventListener('click',function(){
    let addText = document.querySelector('#addTxt');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addText.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addText.value = '';
    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach((item, index) => {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Note ${index + 1}</h5>
                <p class="card-text"> ${item}</p>
                <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div>`;
    });
    let notesElem = document.querySelector("#notes");
    if (notesObj.length != 0 ) {
        notesElem.innerHTML = html;
    }
    else{
        notesElem.innerHTML = 'No data found';
    }
}

function deleteNote(id){
    let notes = localStorage.getItem('notes');
    if (notes != null) {
        notesObj = JSON.parse(notes);
    }
    // console.log(notesObj, id);
    notesObj.splice(id, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

let search = document.querySelector('#searchTxt');
search.addEventListener('input', () => {
    let inputVal = search.value.toLowerCase();
    let noteCard = document.querySelectorAll('.noteCard');
    noteCard.forEach((card)=>{
        let cardText = card.querySelector('.card-text').innerText;
        if (cardText.includes(inputVal)) {
            card.style.display = 'block';
        }
        else{
            card.style.display = 'none';
        }
    });
});