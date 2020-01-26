import React, {useEffect} from 'react';

function Dashboard({setTitle}) {

  useEffect(() => {
    setTitle(`Estructuras Luevano's`)
  },[setTitle]);

  return (
    <h1>Bienvenido</h1>
  );
}

export default Dashboard;
