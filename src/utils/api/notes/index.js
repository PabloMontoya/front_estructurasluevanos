import axios from 'axios';
import { apiUrl } from '../apiUrl';

const getNotes = async () => {
    return await new Promise (async (resolve,reject) => {
        const req = await axios.get(`${apiUrl}/notas`)
            .then(res => res.data)
            .catch((err) => reject(err));
        resolve(req);
    });
}

export default {
    getNotes: getNotes
}
