import axios, { AxiosHeaders } from 'axios';
import { LocalStorage } from '../../local/LocalStorage';
import { User } from '../../../../Domain/entities/User';

const ApiDelivery = axios.create({
    baseURL: 'http://192.168.1.73:3000/api',
    headers: {
        'Content-type': 'application/json'
    }
})
const ApiDeliveryForImage = axios.create({
    baseURL: 'http://192.168.1.73:3000/api',
    headers: {
        'Content-type': 'multipart/form-data',
        'accept': 'application/json'
    }
})

//INTERCEPTORS


export { ApiDelivery, ApiDeliveryForImage }