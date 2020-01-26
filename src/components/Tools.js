import React, {useEffect} from 'react';

function Tools({setTitle}) {

  useEffect(() => {
    setTitle('Inventarios')
  },[setTitle]);
  
  return (
    <h1>Herramientas</h1>
  );
}

export default Tools;
