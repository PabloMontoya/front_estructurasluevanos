import axios from 'axios';

const getNotes = async () => {
    return await new Promise (async (resolve,reject) => {
        const req = await axios.get('https://api-estructurasluevanos.herokuapp.com/notas')
            .then(res => res.data)
            .catch((err) => reject(err));
        resolve(req);
    });
}

export default {
    getNotes: getNotes
}
