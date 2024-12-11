
export enum Action {
    Insert = 1,
    Update,
    View,
    Delete,
}

export enum ReturnStatus {
    Success = 1,
    Failed = -1,
    Duplicate = 2,
    PendingOTPAuthentication = 3,
}
export enum HttpReturnStatus {
    Success = 200,
    Failed = -1,
    Duplicate = 2,
    notFound = 401,
    unAuthorized = 401,
    PendingOTPAuthentication = 3,
}

export enum PermissionType {
    Menu = 1,
    Button = 2,
    Role = 3,
}

export enum UserRoleEnum {
    SuperAdmin = 1,
    SystemAdmin = 2,
    Admin = 3,
    User = 4,
    Employee = 11,
}

export enum NotificationType {
    All = 0,
    SMS = 1,
    Email = 2,
    Push = 3,
}

export enum NotificationAreaEnum {
    UserRegistration = 1,
    UserLogin = 2,
}

export enum OrganizationType {
    Govt = 1,
    Private = 2
}

export enum GeoFenceType {
    None = 0,
    All = 1
}

export enum GlobalSettingEnum {
    Login_Session_Time = 1,
    SMS_Base_Url = 2,
    Google_Map_Key = 3
}

export enum AttachmentType {
    Audio = 1,
    Image = 2,
    Video = 3,
    Map = 4,
    File = 5
}
// export enum ApplicationType {
//     BCCase = 1,
//     SpecialCase = 2,
//     LUC = 3,
//     OccupancyCertificate = 4,
//     Others = 5,
//     NUC = 6,
// }

// export enum ApplicationStatus {
//     Initialize = 1,
//     Running = 2,
//     Completed = 3,
// }



// export enum InspectionFileType {
//     Inspection = 1,
//     Technical = 2
// }

// export enum InspectionRoleType {
//     OfficerInCharge = 1,
//     AssistantOfficer = 1
// }

// export enum BuildingType {
//     Null = 1
// }

// export enum LandType {
//     FirmingLand = 1,
//     LivingLand = 2
// }

// export enum DrainType {
//     Paved = 1,
//     Raw = 2
// }

// export enum ElectricLineType {
//     LowTension = 1,
//     HighTension = 2
// }

// export enum RoadNature {
//     None = 1,
//     Front = 2,
//     Connecting = 3
// }

// export enum AuthorizationStatus {
//     Authorized = 1,
//     Unauthorized = 2
// }

// export enum LUCFormat {
//     ATP = 1,
//     Draftman = 2,
//     GIS = 3
// }


