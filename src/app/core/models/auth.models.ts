import { GlobalSetting } from "./settings/globalSetting";

export class AuthUser {
    userAutoID: number;
    userID: string;
    userTypeID: number;
    organizationID: number;
    designationID: number;
    userFullName: string;
    userRoleID: number;
    tokenResult: TokenResult;
    permissions: [];
    globalSettings: GlobalSetting[];
    password: string;
    userImage: string;
}
export class TokenResult {
    access_token: string;
    expiration: string | null;
    userEmail: string;
    statusCode: number;
    message: string;
}