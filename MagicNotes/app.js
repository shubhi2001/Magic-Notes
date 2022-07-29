//if user adds a node, we also add it to the local storage.
showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    
    let notes = localStorage.getItem("notes");//string
    if (notes == null) {
        notesObj = [];//blank array
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);

    //updating local storage.
    localStorage.setItem('notes', JSON.stringify(notesObj));

    //so that after clicking add node the text area gets empty.
    addTxt.value = "";
    //console.log(notesObj);

    showNotes();
});
//func to show elements form local storage.
function showNotes() 
{
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class=" my-2 mx-2 card noteCard" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Note ${index+1}</h5>
              <p class="card-text">${element}</p>
              <button id="${index}" onlcick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div>
        `;
    });
    // <div id="notes" class="row container-fluid"></div> is reached.
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0)
        notesElm.innerHTML = html;
    else{
        notesElm.innerText=`Add notes with help of "Add note" buttton!`
    }
}

//function to delete note
function deleteNote(index)
{
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    showNotes();
}

//function for the search bar
let search = document.getElementById("searchTxt");
search.addEventListener("input",function()
{
    let inputVal = search.value;
    let eles = document.getElementsByClassName('noteCard');
    Array.from(eles).forEach(function(element)
    {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if(cardTxt.includes(inputVal))
            element.style.display="block";
        else
            element.style.display="none";
    })

    // console.log(inputVal);
})
