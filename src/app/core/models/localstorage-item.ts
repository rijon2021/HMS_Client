const ACCESS_TOKEN = 'ACCESS_TOKEN';
const USER_ID = 'USER_ID';
const USER_AUTO_ID = 'USER_AUTO_ID';
const USER_TYPE_ID = 'USER_TYPE_ID';
const ORGANIZATION_ID = 'ORGANIZATION_ID';
const DESIGNATION_ID = 'DESIGNATION_ID';
const USER_FULL_NAME = 'USER_FULL_NAME';
const ROLE_ID = 'ROLE_ID';
const LOG_OUT = 'LOG_OUT';
const PERMISSIONS = 'PERMISSIONS';
const GLOBAL_SETTINGS = 'GLOBAL_SETTINGS';
const ACTIVE_PERMISSION_ID = 'ACTIVE_PERMISSION_ID';
const GOOGLE_MAP_API_KEY = 'GOOGLE_MAP_API_KEY';
const USER_IMAGE = 'USER_IMAGE';
const REFERENCE_NO = 'REFERENCE_NO';


const LOCALSTORAGE_KEY = {
    ACCESS_TOKEN,
    USER_ID,
    USER_AUTO_ID,
    USER_TYPE_ID,
    ORGANIZATION_ID,
    DESIGNATION_ID,
    USER_FULL_NAME,
    ROLE_ID,
    LOG_OUT,
    PERMISSIONS,
    GLOBAL_SETTINGS,
    ACTIVE_PERMISSION_ID,
    GOOGLE_MAP_API_KEY,
    USER_IMAGE,
    REFERENCE_NO
}

export { LOCALSTORAGE_KEY }


export function GetAccessToken(): any {
    let data = localStorage.getItem(LOCALSTORAGE_KEY.ACCESS_TOKEN);
    if (data && data !== "undefined" && data !== "" && data !== "null") {
        // data = JSON.parse(data);
    } else {
        data = null;
    }

    return data;
}

export function GetUserID(): any {
    let data: any = localStorage.getItem(LOCALSTORAGE_KEY.USER_ID);
    if (data && data !== "undefined" && data !== "" && data !== "null") {
        data = +data;
    } else {
        data = null;
    }

    return data;
}

export function GetFullUserName(): any {
    let data = localStorage.getItem(LOCALSTORAGE_KEY.USER_FULL_NAME);
    if (data && data !== "undefined" && data !== "" && data !== "null") {
        data = data;
    } else {
        data = null;
    }

    return data;
}

// export function GetUser(): any {
//     let data = localStorage.getItem(LOCALSTORAGE_KEY.USER);
//     if (data && data !== "undefined" && data !== "" && data !== "null") {
//         data = JSON.parse(data);
//     } else {
//         data = null;
//     }

//     return data;
// }
// export function GetModuleID(): any {
//     let data = localStorage.getItem(LOCALSTORAGE_KEY.MODULE_ID);
//     if (data && data !== "undefined" && data !== "" && data !== "null") {
//         data = data;
//     } else {
//         data = null;
//     }

//     return data;
// }

// export function GetClientLevelName(): any {
//     let data = localStorage.getItem(LOCALSTORAGE_KEY.CLIENT_LEVEL_NAME);
//     return data;
// }

export function GetLogOut(): any {
    let data = localStorage.getItem(LOCALSTORAGE_KEY.LOG_OUT);
    return data;
}

// export function GetMasterLogIn(): any {
//     let data = localStorage.getItem(LOCALSTORAGE_KEY.MASTER_LOG_IN);
//     return data;
// }
