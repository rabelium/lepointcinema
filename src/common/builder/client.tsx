import axios from 'axios';
import {API_URL} from '@env';

const API_TIMEOUT = __DEV__ ? 15000 : 15000;

const createClient = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    responseType: 'json',
    timeout: API_TIMEOUT,
  });

  return instance;
};

export default createClient(API_URL);
