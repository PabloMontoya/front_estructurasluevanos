import React, {useEffect} from 'react';

function Companies({setTitle}) {

  useEffect(() => {
    setTitle('Administrador');
  },[setTitle]);

  return (
    <h1>Empresas</h1>
  );
}

export default Companies;
