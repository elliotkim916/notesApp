'use strict';

/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

let notes = getNotes();

const editTitle = document.querySelector('.edit-title');
const editBody = document.querySelector('.edit-body');
const deleteBtn = document.querySelector('.deleteBtn');
const noteId = location.hash.substr(1);

const note = notes.find(function(note) {
  return note.id === noteId;
});

editTitle.value = note.title;
editBody.value = note.body;

editTitle.addEventListener('input', function(e) {
  note.title = e.target.value;
  note.editedAt = moment().valueOf();
  document.querySelector('.lastEdited').innerHTML = generateLastEditTime(note.editedAt);
  saveNotes(notes);
});

editBody.addEventListener('input', function(e) {
  note.body = e.target.value;
  note.editedAt = moment().valueOf();
  document.querySelector('.lastEdited').innerHTML = generateLastEditTime(note.editedAt);
  saveNotes(notes);
});

deleteBtn.addEventListener('click', function(e) {
  deleteNote(noteId);
  saveNotes(notes);

  location.assign('/index.html');
});

// this will work for the original on all the copies, but not vice versa
window.addEventListener('storage', function(e) {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue);
    saveNotes(notes);
    let newNote = notes.find(function(note) {
      return note.id === noteId;
    });

    editTitle.value = newNote.title;
    editBody.value = newNote.body;
    document.querySelector('.lastEdited').innerHTML = generateLastEditTime(note.editedAt);
  }
});