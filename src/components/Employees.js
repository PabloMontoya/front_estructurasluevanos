import React, {useEffect} from 'react';

function Employees({setTitle}) {

  useEffect(() => {
    setTitle('Administrador')
  },[setTitle]);

  return (
    <h1>Empleados</h1>
  );
}

export default Employees;
