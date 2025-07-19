const x= document.getElementById('notecard');
const y= document.getElementById('btn');
getnotes().forEach((note) => {
  const noteEl = createlement(note.id, note.content);
  x.insertBefore(noteEl, y);
});
function createlement(id,content){
  const ele=document.createElement("textarea");
  ele.classList.add('note');
  ele.value=content;
  ele.addEventListener("dblclick",()=>{
    const msgg=confirm("Delete this note ?");
    if(msgg){
      deletenote(id,ele);
    }
  });
  ele.addEventListener('input',()=>{
    updatenote(id,ele.value);
  });
  return ele;
}
function updatenote(id,content){
  const notes=getnotes();
  const tar=notes.filter((note)=>note.id==id)[0];
  tar.content=content;
  savenotes(notes);
}
function deletenote(id,element){
    const notes=getnotes().filter((note)=>note.id!=id);
    savenotes(notes);
    x.removeChild(element);
}
function addnote(){
   const prvnotes=getnotes();
   const noteobj={
    id:Math.floor(Math.random()*1000000),
    content:""
   };
   const notelement=createlement(noteobj.id,noteobj.content);
   x.insertBefore(notelement,y);
   prvnotes.push(noteobj);
   savenotes(prvnotes);
}
function getnotes(){
  return JSON.parse(localStorage.getItem("app")||"[]");
}
function savenotes(notes){
  return localStorage.setItem("app",JSON.stringify(notes));
}
y.addEventListener('click',addnote);