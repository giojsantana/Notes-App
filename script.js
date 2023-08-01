"use strict";

const notesSection = document.querySelector(".notes");
const createButton = document.querySelector(".create-btn");
const editNoteEl = `
      <section class="note-section--edit">
        <div class="card">
          <h2 class="note-title"></h2>
          <div class="title-div">
            <input type="text" placeholder="Note Name" class="title-input" />
            <button class="save-btn">SAVE</button>
            <button class="delete-btn">Delete</button>
          </div>
          <textarea rows="5" class="textarea"></textarea>
        </div>
      </section>
`;

const ifEnter = function (element, saveBtn) {
  element.addEventListener("keypress", function (e) {
    if (e.code === "Enter") {
      const save = saveNote.bind(saveBtn);
      save();
    }
  });
};

const createNote = function () {
  notesSection.insertAdjacentHTML("afterbegin", editNoteEl);
  const saveBtn = [...notesSection.children][0].querySelector(".save-btn");
  const deleteBtn = [...notesSection.children][0].querySelector(".delete-btn");
  const newTitle = saveBtn.previousElementSibling;
  const newText = saveBtn.closest(".card").querySelector(".textarea");
  saveBtn.addEventListener("click", saveNote);
  deleteBtn.addEventListener("click", deleteNote);
  ifEnter(newTitle, saveBtn);
  ifEnter(newText, saveBtn);
};

const editNote = function () {
  if (this.closest(".note-section").previousElementSibling) {
    this.closest(".note-section").previousElementSibling.insertAdjacentHTML(
      "afterend",
      editNoteEl
    );
  } else {
    notesSection.insertAdjacentHTML("afterbegin", editNoteEl);
  }
  const newNote = this.closest(".note-section").previousElementSibling;
  const saveBtn = newNote.querySelector(".save-btn");
  const deleteBtn = newNote.querySelector(".delete-btn");
  const newTitle = newNote.querySelector(".title-input");
  const newText = newNote.querySelector(".textarea");
  newTitle.value = this.previousElementSibling.innerText;
  newText.value = this.closest(".card").querySelector(".note-txt").innerText;
  ifEnter(newTitle, saveBtn);
  ifEnter(newText, saveBtn);
  saveBtn.addEventListener("click", saveNote);
  deleteBtn.addEventListener("click", deleteNote);
  this.closest(".note-section").remove();
};

const saveNote = function () {
  const title = this.previousElementSibling.value;
  const text = this.closest(".card").querySelector(".textarea").value;
  this.closest(".note-section--edit").insertAdjacentHTML(
    "afterend",
    `
    <section class="note-section">
        <div class="card">
          <div class="title-div">
            <h2 class="note-title">${title}</h2>
            <button class="edit-btn">EDIT</button>
          </div>
          <p class="note-txt">${text}</p>
        </div>
      </section>
  `
  );
  const current = this.closest(".note-section--edit").nextElementSibling;
  current.querySelector(".edit-btn").addEventListener("click", editNote);
  this.closest(".note-section--edit").remove();
};

const deleteNote = function () {
  this.closest(".note-section--edit").remove();
};

createButton.addEventListener("click", createNote);
