import { InspectionFileType, InspectionRoleType } from "../../enums/globalEnum";

export class ApplicationFileUserMap {
    applicationFileUserMapID: number;
    applicationFileMasterID: number;
    userID: number;
    inspectionFileType: InspectionFileType;
    inspectionRoleType: InspectionRoleType;
    isActive: boolean;
    assignDate: string;
    targetDate: Date;
    investigationDate: Date | null;
    assignBy: number;
    createdDate: string | null;
    userName: string;
    userNameBangla: string;
    assignByName: string;
    userImage: string;
    isVisitingOfficer: boolean;
    inspectionRoleTypeName: string;

    constructor(params?: Partial<ApplicationFileUserMap>) {
        if (params) {
            this.assignDate = params?.assignDate;
            this.isActive = true;
            this.inspectionRoleType = InspectionRoleType.OfficerInCharge;
        }
    }
}
