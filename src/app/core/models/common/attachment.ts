import { InspectionFileType } from "../../enums/globalEnum";


export class Attachment {
    attachmentID: number;
    referenceType: InspectionFileType;
    referenceID: number;
    attachementTypeID: number;
    applicationTypeID: number;
    fileFormat: string;
    attachmentName: string;
    attachmentLink: string;
    fileContent: string;
    notes: string;
    status: number;
    latitude?: number;
    longitude?: number;
    createdBy: number;
    createdDate?: Date;
    updatedBy: number;
    updatedDate?: Date
}
