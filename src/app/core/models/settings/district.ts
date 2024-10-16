export class District {
    districtID: number;
    districtCode: string;
    districtName: string;
    districtNameBangla: string;
    geoFenceID: number | null;
    divisionID: number;
    divisionDistrictMap : DivisionDistrictMap;
    organizationDistrictMap : OrganizationDistrictMap;
    divisionName : string;
    countryID : number;
    countryName : string;
    isChecked : boolean
    isSelected : boolean
    constructor(){
        this.divisionDistrictMap = new DivisionDistrictMap();
        this.organizationDistrictMap = new OrganizationDistrictMap();
    }
}
export class DivisionDistrictMap {
    DivisionDistrictMapID: number;
    divisionID: number;
    districtID: number;
    validityDate: string;
    orderNo: number;
    isActive: boolean;
    organizationID: number;
    createdBy: number;
    createdDate: string;
    updatedBy: number;
    updatedDate: string;
}

export class OrganizationDistrictMap {
    organizationDistrictMapID: number;
    organizationID: number;
    districtID: number;
    orderNo: number;
    isActive: boolean;
    createdBy: number;
    createdDate: string;
    updatedBy: number;
    updatedDate: string;
}