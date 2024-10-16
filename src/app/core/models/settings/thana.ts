

export class Thana {
    thanaID: number;
    thanaCode: string;
    thanaName: string;
    thanaNameBangla: string;
    geoFenceID: number | null;
    upazilaCityCorporationThanaMap: UpazilaCityCorporationThanaMap;
    organizationThanaMap: OrganizationThanaMap;
    districtName: string;
    orderNo: number;
    isChecked : boolean;
    isSelected : boolean;
    upazilaCityCorporationID : number;
    districtID: number;
    divisionID: number;
    divisionName : string
    countryID: number;
    countryName : string
    constructor(){
        this.upazilaCityCorporationThanaMap = new UpazilaCityCorporationThanaMap();
        this.organizationThanaMap = new OrganizationThanaMap();
    }
}


export class UpazilaCityCorporationThanaMap {
    upazilaCityCorporationThanaMapID: number;
    upazilaCityCorporationID: number;
    thanaID: number;
    validityDate: string;
    isActive: boolean;
    createdBy: number;
    createdDate: string;
    updatedBy: number;
    updatedDate: string;
}

export class OrganizationThanaMap {
    organizationThanaMapID: number;
    organizationID: number;
    thanaID: number;
    orderNo: number;
    isActive: boolean;
    createdBy: number;
    createdDate: string;
    updatedBy: number;
    updatedDate: string;
}