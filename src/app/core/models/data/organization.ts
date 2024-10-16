import { OrganizationType } from "../../enums/globalEnum";
export class Organization {
    organizationID: number;
    organizationCode: string;
    organizationName: string;
    organizationNameBangla: string;
    organizationShortName : string;
    organizationType: OrganizationType;
    productName: string;
    productCode: string;
    address: string;
    organizationLogo: string;
    organizationLogoPreview: any;
    productLogo: string;
    productLogoPreview: any;
    publicURL: string;
    privateURL: string;
    contactPersonID: number | null;
    mobileNo: string;
    email: string;
    latitude: string;
    longitude: string;
    organizationUserID: number | null;
    organizationTypeStr: string;
}



