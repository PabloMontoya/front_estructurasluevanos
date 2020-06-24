import axios from 'axios';
import { apiUrl } from '../apiUrl';

const getGlobalData = async (endpoint) => {
  return await new Promise (async (resolve,reject) => {
    const req = await axios.get(`${apiUrl}/${endpoint}`)
      .then(res => res.data)
      .catch((err) => reject(err));
    resolve(req);
  });
}

const getFreeEmployeesByDate = async ({start, end}) => {
  console.log(start, end)
  return await new Promise (async (resolve,reject) => {
    const req = await axios.post(`${apiUrl}/notas/empleadoslibresporfecha`, {fechaInicio: start, fechaTermino: end})
      .then(res => {
        console.log(res.data)
        return res.data
      })
      .catch((err) => reject(err));
    resolve(req);
  });
}

const createNote = async (params) => {
  return await new Promise (async (resolve,reject) => {
    const req = await axios.post(`${apiUrl}/notas/agregar`, params)
      .then(res => res.data)
      .catch((err) => reject(err));
    resolve(req);
  });
}

export default {
  getGlobalData: getGlobalData,
  getFreeEmployeesByDate: getFreeEmployeesByDate,
  createNote: createNote,
}
