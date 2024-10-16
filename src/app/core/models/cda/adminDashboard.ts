import { ApplicationType } from "../../enums/globalEnum";

export class AdminDashboard {
    adminDashboardFileTypeWiseList: AdminDashboardFileTypeWise[];
    adminDashboardFileUserWiseList: AdminDashboardFileUserWise[];
    adminDashboardFileListUserWise: AdminDashboardFileListUserWise[];
}

export class AdminDashboardFileTypeWise {
    applicationType: ApplicationType;
    totalFile: number;
    visited: number;
    applicationTypeDescription: string;
    colorCode: string;
    icon: string;
    border: string;
    applicationTypeName: string;
}

export class AdminDashboardFileUserWise {
    userID: number;
    userFullName: string;
    userFullNameBangla: string;
    departmentID: number;
    departmentName: string;
    departmentNameBangla: string;
    totalFile: number;
    visited: number;
    isFileDetails: boolean;
}

export class AdminDashboardFileListUserWise {
    refNo: string;
    applicantName: string;
    thanaID: number;
    thanaName: string;
    mouzaID: number;
    mouzaName: string;
    isVisited: boolean;
    assignDate: Date;
    targetDate: Date;
    visitDate: Date;
}
