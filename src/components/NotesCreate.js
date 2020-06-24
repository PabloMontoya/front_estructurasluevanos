import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import API from '../utils/api/admin';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  formControl: {
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button:{
    fontSize:'xx-large', 
    color:'#3f51b5',
  },
  dialogContent:{
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '900px',
  },
  dialogChild: {
    display: 'inline-block',
    color: '#FFF',
    textAlign: 'center',
    padding: '5px',
    margin: '5px',
    '&:first-child': {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
    },
    '&:not(:first-child)': {
      flex: 1,
    }
  },
}));

const NotesCreate = ({refetch}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [companies, setCompanies] = React.useState([]);
  const [proyects, setProyects] = React.useState([]);
  const [workTypes, setWorkTypes] = React.useState([]);
  const [availableEmployees, setAvailableEmployees] = React.useState([]);
  const [dates, setDates] = React.useState({
    start: new Date().toString(),
    end: new Date().toString(),
  });
  const [noteObj, setNoteObj] = React.useState({
    numOrden: '',
    empresa: '',
    proyecto: '',
    empleado: '',
    tipoTrabajo: '',
    cantidad: '',
    descripcion: '',
    direccion: {
      calle: '',
      colonia: '',
      numero: '',
      distrito: ''
    },
    fecha: {
      fechaInicio: dates.start,
      fechaTermino: dates.end
    }
  });

  React.useEffect(() => {
    fetchCompanies();
    fetchProyects();
    fetchWorkTypes();
    fetchAvailableEmployees(dates);
  }, [dates]);

  const fetchCompanies = async () => {
    const data = await API.getGlobalData('empresas');
    setCompanies(data);
  };
  
  const fetchProyects = async () => {
    const data = await API.getGlobalData('proyectos');
    setProyects(data);
  };
  
  const fetchWorkTypes = async () => {
    const data = await API.getGlobalData('tipostrabajos');
    setWorkTypes(data);
  };
  
  const fetchAvailableEmployees = async (dates) => {
    const data = await API.getFreeEmployeesByDate(dates);
    setAvailableEmployees(data);
  };

  const handleDateChange = (date, opt) => {
    const opt_ = opt === 'start' ? 'fechaInicio' : 'fechaTermino';
    setNoteObj({
      ...noteObj,
      fecha:{
        ...noteObj.fecha,
        [opt_]: date.toString()
      }
    });
    setDates({
      ...dates,
      [opt]: date
    })
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    handleClear();
    setOpen(false);
  };

  const handleSave = async () => {
    await API.createNote(noteObj);
    refetch();
    setOpen(false);
  }

  const handleClear = () => {
    setNoteObj({
      numOrden: '',
      empresa: '',
      proyecto: '',
      empleado: '',
      tipoTrabajo: '',
      cantidad: '',
      descripcion: '',
      direccion: {
        calle: '',
        colonia: '',
        numero: '',
        distrito: ''
      },
      fecha: {
        fechaInicio: new Date().toString(),
        fechaTermino: new Date().toString()
      }
    });
  }

  const handleChange = (e, attr, subAttr) => {
    if(subAttr) {
      setNoteObj({
        ...noteObj,
        [attr]: {
          ...noteObj[attr],
          [subAttr]: e.target.value.toString()
        }
      });
    } else {
      setNoteObj({
        ...noteObj,
        [attr]: e.target.value
      });
    }
  };

  return (
    <div>
      <AddBoxIcon  onClick={handleClickOpen} className={classes.button} />
      <Dialog 
        open={open} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title" 
        maxWidth="lg"
      >
        <DialogTitle id="form-dialog-title">Agregar Nota</DialogTitle>
        <DialogContent>
          <div className={classes.dialogContent}>
            <div className={classes.dialogChild}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-start"
                  label="Fecha inicio"
                  value={dates.start}
                  onChange={e => handleDateChange(e, 'start')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-end"
                  label="Fecha termino"
                  value={dates.end}
                  onChange={e => handleDateChange(e, 'end')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className={classes.dialogChild}>
              <TextField
                margin="dense"
                label="Numero de Orden"
                type="Number"
                value={noteObj.numOrden}
                onChange={e => handleChange(e,'numOrden')}
                fullWidth

              />

              <FormControl className={classes.formControl}>
                <InputLabel id="enterprise_label">Empresa</InputLabel>
                <Select
                  labelId="enterprise_label"
                  value={noteObj.empresa}
                  onChange={e => handleChange(e,'empresa')}
                >
                  {companies.map((company, i) => {
                    return <MenuItem key={i} value={company._id}>{company.nombre}</MenuItem>
                  })}
                </Select>
              </FormControl>
            
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Proyecto</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={noteObj.proyecto}
                  onChange={e => handleChange(e,'proyecto')}
                >
                  {proyects.map((proyect, i) => {
                    return (
                      <MenuItem key={i} value={proyect._id}>
                        {`${proyect.num_contrato}, ${proyect.des_descripcion}`}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Empleado</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={noteObj.empleado}
                  onChange={e => handleChange(e,'empleado')}
                >
                  {availableEmployees.map((availableEmployee, i) => {
                    return (
                      <MenuItem key={i} value={availableEmployee._id}>
                        {`${availableEmployee.nombre} ${availableEmployee.apellido_paterno}`}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Tipo Trabajo</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={noteObj.tipoTrabajo}
                  onChange={e => handleChange(e,'tipoTrabajo')}
                >
                  {workTypes.map((workType, i) => {
                    return (
                      <MenuItem key={i} value={workType._id}>
                        {`${workType.tipo} (${workType.descripcion})`}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>

              <TextField
                margin="dense"
                label="Cantidad"
                type="Number"
                value={noteObj.cantidad}
                onChange={e => handleChange(e,'cantidad')}
                fullWidth

              />
            </div>
            <div className={classes.dialogChild}>
              <TextField
                margin="dense"
                label="Descripcion"
                type="text"
                value={noteObj.descripcion}
                onChange={e => handleChange(e,'descripcion')}
                fullWidth

              />
              
              <TextField
                margin="dense"
                label="Calle"
                value={noteObj.direccion.calle}
                type="Text"
                onChange={e => handleChange(e,'direccion', 'calle')}
                fullWidth

              />
              <TextField
                margin="dense"
                label="Numero"
                value={noteObj.direccion.numero}
                type="Text"
                onChange={e => handleChange(e,'direccion', 'numero')}
                fullWidth

              />
              <TextField
                margin="dense"
                label="Colonia"
                value={noteObj.direccion.colonia}
                type="Text"
                onChange={e => handleChange(e,'direccion', 'colonia')}
                fullWidth

              />
              <TextField
                margin="dense"
                label="Distrito"
                value={noteObj.direccion.distrito}
                type="Text"
                onChange={e => handleChange(e,'direccion', 'distrito')}
                fullWidth

              />
            </div>
          </div>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NotesCreate;