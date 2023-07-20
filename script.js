let date=new Date().toLocaleDateString()
console.log(date);

let addNoteContainer = document.getElementById('addNoteContainer')
function showAllNotes(){
    addNoteContainer.style.display = 'none';
    let allNotes;
    let notes = localStorage.getItem("notes")
    if(notes === null){
        allNotes =[]
    }else{
        allNotes = JSON.parse(notes);
    }

    let notesContainer = document.getElementById('notes');
    notesContainer.innerHTML = '';
    allNotes.forEach((note, index) => {
        notesToBeShown = `<div class="card" id="card" style="width: 18rem; ">
                            <div class="card-body">
                               <div class="d-flex justify-content-between"> <h4>${index+1}</h4>${date}</div>
                                <h5 class="card-title">${note.title}</h5>
                                <p class="card-text">${note.descp}</p>
                                <button class="btn btc card_btns1 btn-layout-primary
                                 bi bi-pencil" onclick="editNote(${index})"></button>
                                <button class="btn btc btn-layout-denger card_btns2 bi bi-trash" onclick="deleteNote(${index})"></button>
                                
                            </div>
                        </div>`
        
         notesContainer.innerHTML = notesContainer.innerHTML + notesToBeShown
       
    });
}

showAllNotes()

let addNoteBtn = document.getElementById('addNote')
 addNoteBtn.addEventListener('click', ()=>{
    
    
    let allNotes;
    let notes = localStorage.getItem("notes")
    if(notes === null){
      
        allNotes =[]
    }else{
      
        allNotes = JSON.parse(notes);
    }
    let title = document.getElementById('title')
    let descp = document.getElementById('descp');
    let newNoteObj = {
        title : title.value,
        descp : descp.value
    }

    if(addNoteBtn.innerText === "Update Note"){
        let editCard = document.querySelector('.card')
        let editIndex = editCard.getAttribute('editIndex') 
        allNotes[editIndex] = newNoteObj
    }else{
        allNotes.push(newNoteObj);
    }
    localStorage.setItem("notes", JSON.stringify(allNotes))
    title.value = ''
    descp.value = ''
   
    showAllNotes()

})
//create notes 
let navAddNoteBtn = document.getElementById('navAddNote')
navAddNoteBtn.addEventListener('click', function (){
    addNoteContainer.style.display = 'block';
    addNoteBtn.innerText = 'Save'
})
//delete notes
function deleteNote(noteIndex){
    let allNotes = JSON.parse(localStorage.getItem('notes'));
    allNotes.splice(noteIndex, 1)
    localStorage.setItem("notes", JSON.stringify(allNotes))
    showAllNotes()
}
//edit notes
function editNote(noteIndex){
    let allNotes = JSON.parse(localStorage.getItem('notes'));
    addNoteContainer.style.display = 'block';
    addNoteBtn.innerText = 'Update Note'

    let title = document.getElementById('title')
    let descp = document.getElementById('descp');

    title.value = allNotes[noteIndex].title
    descp.value = allNotes[noteIndex].descp

    let editCard = document.querySelector('.card')
    editCard.setAttribute('editIndex', `${noteIndex}`)
    console.log(editCard);
}

//read notes
let search = document.getElementById('search')
search.addEventListener('input', ()=> {
    let inputValue = search.value.toLowerCase();
    let allCards = document.getElementsByClassName('card');

    Array.from(allCards).forEach((ele)=>{
        let cardText = ele.getElementsByTagName('p')[0].innerText

        if(cardText.toLowerCase().includes(inputValue)){
            ele.style.display = 'block';
        }
        else{
            ele.style.display ='none';
        }
    })
})



