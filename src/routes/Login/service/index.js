
import $$ from 'cmn-utils';
import Axios from 'axios'

export async function login(payload) {
  return  await Axios.post('http://localhost:8020/api/login', payload);
}