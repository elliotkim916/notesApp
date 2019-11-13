'use strict';

/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const getNotes = function() {
  const notesJSON = localStorage.getItem('notes');

  if (notesJSON !== null) {
    return JSON.parse(notesJSON);
  } else {
    return [];
  }
};

const saveNotes = function(notes) {
  return localStorage.setItem('notes', JSON.stringify(notes));
};

const generateNotes = function(note) {
  const noteId = note.id;
  const noteContainer = document.createElement('div');
  noteContainer.classList.add('note-container');

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.textContent = 'x';
  deleteBtn.addEventListener('click', function(e) {
    deleteNote(noteId);
    saveNotes(notes);
    renderNotes(notes, filterValues);
  });
  noteContainer.appendChild(deleteBtn);

  const noteDate = document.createElement('p');
  noteDate.textContent = moment(note.createdAt).format('MMMM Do YYYY, h:mma');
  noteContainer.appendChild(noteDate);

  const noteTitle = document.createElement('a');
  noteTitle.textContent = note.title;
  noteTitle.setAttribute('href', `edit.html#${noteId}`);
  noteContainer.appendChild(noteTitle);

  const noteBody = document.createElement('p');
  noteBody.textContent = note.body;
  noteContainer.appendChild(noteBody);

  return noteContainer;
};

const sortNotes = function(notes, sortType) {
  if (sortType === 'byEdited') {
    return notes.sort(function(a, b) {
      if (a.editedAt > b.editedAt) {
        return -1;
      } else if (a.editedAt < b.editedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  if (sortType === 'byCreated') {
    return notes.sort(function(a, b) {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if(a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  if (sortType === 'byAlphabet') {
    return notes.sort(function(a, b) {
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    });
  }
};

const renderNotes = function(notes, filters) {
  const filteredNotes = notes.filter(function(note) {
    return note.title.toLowerCase().includes(filters.title.toLowerCase());
  });
  
  sortNotes(filteredNotes, filters.sortType);

  document.querySelector('#notes').innerHTML = '';

  filteredNotes.forEach(function(note) {
    document.querySelector('#notes').appendChild(generateNotes(note));
  });
};

const deleteNote = function(id) {
  const index = notes.findIndex(function(note) {
    return note.id === id;
  });

  if (index > -1) {
    notes.splice(index, 1);
  } else {
    return;
  }
};

const generateLastEditTime = function(time) {
  return `Last edited ${moment(time).fromNow()}`;
};