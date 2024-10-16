import { LOCALSTORAGE_KEY } from 'src/app/core/models/localstorage-item';

let api_endpoint = '';
const Ui_origin = window.location.origin;

switch (Ui_origin) {
  //local development
  case 'http://localhost:4200':
  case 'http://localhost:4300':
  case 'http://localhost:4400':
  case 'http://localhost:4500':
  case 'http://localhost:4600':
    api_endpoint = 'http://localhost:56006/api/';
    break;
  //dev proxy
  case 'http://10.1.0.116:8021':
    api_endpoint = 'http://10.1.0.116:8020/api/';
    break;
  default:
    break;
}

let googlemapAPi = localStorage.getItem(LOCALSTORAGE_KEY.GOOGLE_MAP_API_KEY);
googlemapAPi = JSON.parse(googlemapAPi);

export const environment = {
  production: false,
  baseUrl: api_endpoint,
  MAP_API_KEY: googlemapAPi,

  defaultauth: 'fackbackend',
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  }
};
