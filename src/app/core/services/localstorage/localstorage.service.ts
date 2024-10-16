import { Injectable } from '@angular/core';
import { localStorageKeys } from './localstorage-keys';



@Injectable()
export class LocalStorageService {
    clear() {
      throw new Error('Method not implemented.');
    }

    // getAllLocalStorage() {
    //     return localStorageKeys().map(e => {
    //         return JSONX.tryParse(localStorage.getItem(e));
    //     });
    // }

    /*clearAllLocalStorage () {
        localStorageKeys().map(key => {
            localStorage.setItem(key, '');
        });
    }*/
    /**
     * Clear all localstorage value only
     */
    clearAllLocalStorageValue() {
        localStorageKeys().map(key => {
            localStorage.setItem(key, '');
        });
    }
    /**
     * Clear localstorage value with specific key
     * @param key 
     */
    clearLocalStorageValue(key: string) {
        localStorage.setItem(key, '');
    }
    /**
     * Clear full localstorage(both key and value)
     */
    clearAllLocalStorageKeyAndValue() {
        localStorage.clear();
    }
    /**
     * Clear localstorage both key and value with specific key 
     * @param key 
     */
    clearLocalStorageKeyAndValue(key: string) {
        localStorage.removeItem(key);
    }

}
