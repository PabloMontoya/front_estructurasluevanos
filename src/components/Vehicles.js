import React, {useEffect} from 'react';

function Vehicles({setTitle}) {

  useEffect(() => {
    setTitle('Inventarios');
  },[setTitle]);

  return (
    <h1>Vehiculos</h1>
  );
}

export default Vehicles;
