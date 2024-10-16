let api_endpoint = '';

const Ui_origin = window.location.origin;

switch (Ui_origin) {
  case 'http://10.1.0.12:8021': //for staging 
    api_endpoint = 'http://10.1.0.12:8020/api/';
    break;
  case 'http://10.201.31.30:8021': //for staging 
    api_endpoint = 'http://10.1.0.12:8020/api/';
    break;
  case 'http://43.240.101.75:8021': //for SWL Public IP 
    api_endpoint = 'http://43.240.101.75:8020/api/';
    break;
  case 'http://182.160.105.228:8021': //for SWL Public IP 
    api_endpoint = 'http://182.160.105.228:8020/api/';
    break;
  default:
    break;
}

export const environment = {
  production: true,
  baseUrl: api_endpoint,
  MAP_API_KEY: 'AIzaSyBiols4lFvOc7_rGeOZVI6l-YE617w7xR0',

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
