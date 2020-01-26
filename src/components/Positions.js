import React, {useEffect} from 'react';

function Positions({setTitle}) {

  useEffect(() => {
    setTitle('Administrador');
  },[setTitle]);

  return (
    <h1>Puestos</h1>
  );
}

export default Positions;
