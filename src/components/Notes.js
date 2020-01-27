import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import API from '../utils/api/notes';

function Notes({setTitle}) {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    setTitle('Notas');
    fetchNotes();
  },[setTitle]);

  const fetchNotes = async () => {
    let data = await API.getNotes();
    setNotes(data);
  }

  return (
    <>
      <h1>Notas</h1>

      {notes.length > 0 ? (
        notes.map((note, index) => {
          return(
            <h5 key={index}> {note._id} </h5>
          )
        })
      ) : (
          <CircularProgress />
      )}
    </>
  );
}

export default Notes;
