export class Country {
    countryID: number;
    countryCode: string;
    countryName: string;
    countryNameBangla: string;
    geoFenceID: number | null;
    createdBy: number;
    createdDate: string;
    updatedBy: number;
    updatedDate: string;
    organizationCountryMap: OrganizationCountryMap | null;
    isChecked : boolean
    isSelected : boolean
    constructor(){
        this.organizationCountryMap = new OrganizationCountryMap();
    }
    
}

export class OrganizationCountryMap {
    organizationDivisionMapID: number;
    organizationID: number;
    countryID: number;
    validityDate: string;
    orderNo: number;
    isActive: boolean;
    createdBy: number;
    createdDate: string;
    updatedBy: number;
    updatedDate: string;
}