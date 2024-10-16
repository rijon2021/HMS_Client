import { ApplicationStatus, ApplicationType } from "../../enums/globalEnum";

export class BcCaseBIReport{
    applicationFileMasterID: number;
    refNo: string;
    applicantName: string;
    approvalDate: string;
    applicationType: ApplicationType;
    applicationStatus: ApplicationStatus;
    rsNo: string;
    bsNo: string;
    thanaID: number;
    mouzaID: number;
    dPZID: number;
    road: string;
    officerInChargeID: number | null;
    isVisited: boolean;
    latitude: number | null;
    longitude: number | null;
    createdBy: number;
    createdDate: string;
    updatedBy: number;
    updatedDate: string;
    approvalDateSt: string;
    thanaName: string;
    thanaNameBangla: string;
    mouzaName: string;
    mouzaNameBangla: string;
    dPZName: string;
    dPZNameBangla: string;
    // userID: number;
    // userFullName: string;
    assignBy: number;
    assignByName: string;
    assignByNameBangla: string;
    targetDate: string;
    assignDate: string;
    applicationTypeName: string;
    applicationStatusName : string
    investigationOfficerID: number;
    investigationOfficerName: string;
    tR_InvestigationOfficerID: number;
    tR_InvestigationOfficerName: string;

    isChecked : boolean;
    isFileDetails: boolean = false;
    isActive:boolean;
}