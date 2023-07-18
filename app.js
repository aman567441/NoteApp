const AddBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

AddBtn.addEventListener(
    "click",
    function () {
        AddNote()
    }
)


const savenotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach(
        (note) => {
            data.push(note.value)
        }
    )
    if (data.length === 0) {
        localStorage.removeItem("notes")
    } else {
        localStorage.setItem("notes", JSON.stringify(data));
    }

}



const AddNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="tool">
        <i class=" trash fa-solid fa-trash"></i>
        <i class="save fa-solid fa-floppy-disk"></i>
    </div>
    <textarea>${text}</textarea>
`;
    note.querySelector(".trash").addEventListener(
        "click",
        function () {
            note.remove();
            savenotes();
        }
    )
    note.querySelector(".save").addEventListener(
        "click",
        function () {
            savenotes();
        }
    )
    note.querySelector("textarea").addEventListener(
        "focousout",
        function(){
            savenotes();
        }
    )
    main.appendChild(note);
    savenotes();
}

(
    function () {
        const lsnotes = JSON.parse(localStorage.getItem("notes"));
        if (lsnotes === null) {
            AddNote()
        }
        else {
            lsnotes.forEach(
                (lsnotes) => {
                    AddNote(lsnotes)
                }

            )
        }


    }
)()

