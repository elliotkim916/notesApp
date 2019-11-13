'use strict';

/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

let notes = getNotes();
const filterValues = {
  title: '',
  sortType: 'byEdited'
};
const noteTitle = document.querySelector('.note-title');
const noteBody = document.querySelector('.note-body');
const noteForm = document.querySelector('.notes-form');
const noteFilter = document.querySelector('.filter-notes');
const sorter = document.querySelector('select');

noteForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const note = {
    id: uuid.v4(),
    title: noteTitle.value,
    body: noteBody.value,
    createdAt: moment().valueOf(),
    editedAt: moment().valueOf()
  };

  notes.push(note);
  saveNotes(notes);
  renderNotes(notes, filterValues);

  noteTitle.value = '';
  noteBody.value = '';
});

noteFilter.addEventListener('input', function(e) {
  filterValues.title = e.target.value;
  renderNotes(notes, filterValues);
});

sorter.addEventListener('change', function(e) {
  filterValues.sortType = e.target.value;
  renderNotes(notes, filterValues);
});

window.addEventListener('storage', function(e) {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue);
    saveNotes(notes);
    renderNotes(notes, filterValues);
  }
});

window.addEventListener('load', renderNotes(notes, filterValues));