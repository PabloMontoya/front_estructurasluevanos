import React, {useEffect} from 'react';

function Notes({setTitle}) {

  useEffect(() => {
    setTitle('Notas');
  },[setTitle]);

  return (
    <h1>Notas</h1>
  );
}

export default Notes;
