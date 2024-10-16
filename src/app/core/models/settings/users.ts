export class Users {
    userAutoID: number;
    userID: string;
    userTypeID: number;
    userRoleID: number;
    organizationID: number;
    departmentID: number | null;
    designationID: number | null;
    userFullName: string;
    userFullNameBangla: string;
    mobileNo: string;
    address: string;
    password: string;
    newPassword: string;
    confirmPassword: string;
    passwordExpiryDate: string | null;
    status: number;
    statusStr: string;
    email: string;
    userImage: string;
    signature: string;
    lastLatitude: number | null;
    lastLongitude: number | null;
    is2FAauthenticationEnabled: boolean | null;
    nid: string;
    canChangeOwnPassword: boolean | null;
    mobileVerification: boolean | null;

    departmentName: string;
    departmentNameBangla: string;
    designationName: string;
    designationNameBangla: string;

    userImagePreview: any = 'assets/images/logo/profile-default.png';
    signaturePreview: any;
    iMIE: string;
    macAddress: string;
    applicationTypeID?: number;
}