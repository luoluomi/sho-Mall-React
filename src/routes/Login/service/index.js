
import $$ from 'cmn-utils';
import Axios from 'axios'
import libConfig from '@/config/config'
export async function login(payload) {
  return  await Axios.post(`${libConfig.address}api/login`, payload);
}