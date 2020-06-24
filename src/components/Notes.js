import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import API from '../utils/api/notes';
import Table from './Table';

const headCells = [
  { id: 'numOrden', label: 'Ord.', numeric: false },
  { id: 'empresa', label: 'Empresa', numeric: false },
  { id: 'proyecto', label: 'Proy.', numeric: false },
  { id: 'empleado', label: 'Empleado', numeric: false },
  { id: 'tipoTrabajo', label: 'Tipo Trabajo', numeric: false },
  { id: 'cantidad', label: 'Cant.', numeric: false },
  { id: 'descripcion', label: 'Desc.', numeric: false },
  { id: 'direccion', label: 'Direccion', numeric: false },
  { id: 'distrito', label: 'Dist.', numeric: false },
  { id: 'fechaInicio', label: 'Fecha Inicio', numeric: false },
  { id: 'fechaTermino', label: 'Fecha Termino', numeric: false }
];

function Notes({setTitle}) {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    setTitle('Notas');
    fetchNotes();
  },[setTitle]);

  const fetchNotes = async () => {
    const data = await API.getNotes();
    const formattedData = data.map((row) => {
      let { direccion, empleado, fecha, empresa, proyecto, cantidad, numOrden, tipoTrabajo, descripcion } = row;
      let fechaInicio = fecha.fechaInicio.split('T')[0];
      let fechaTermino = fecha.fechaTermino.split('T')[0];
      return {
        direccion: `${direccion.calle} ${direccion.numero} ${direccion.colonia}`,
        empleado: `${empleado.nombre} ${empleado.apellido_paterno}`,
        fechaInicio: fechaInicio,
        fechaTermino: fechaTermino,
        empresa: empresa.nombre,
        proyecto: proyecto.num_contrato,
        cantidad: cantidad.$numberDecimal,
        numOrden: numOrden,
        tipoTrabajo: tipoTrabajo.tipo,
        descripcion: descripcion,
        distrito: direccion.distrito
      }
    })
    setNotes(formattedData);
  }

  return (
    <>
      {notes.length > 0 ? (
        <Table headCells={headCells} rows={notes} refetch={fetchNotes} />
      ) : (
          <CircularProgress />
      )}
    </>
  );
}

export default Notes;
