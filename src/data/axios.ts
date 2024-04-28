import axios from 'axios';
import { config } from '../config';

export const axiosClient = axios.create({ baseURL: config.apiEndpoint });
