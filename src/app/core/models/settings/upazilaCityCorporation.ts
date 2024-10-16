export class UpazilaCityCorporation {
    upazilaCityCorporationID: number;
    upazilaCityCorporationCode: string;
    upazilaCityCorporationName: string;
    upazilaCityCorporationNameBangla: string;
    isUpazila: boolean;
    geoFenceID: number | null;
    districtUpazilaCityCorporationMap: DistrictUpazilaCityCorporationMap;
    organizationUpazilaCityCorporationMap: OrganizationUpazilaCityCorporationMap;
    districtName: string;
    orderNo: number;
    isChecked: boolean
    isSelected: boolean
    districtID: number;
    divisionID: number;
    divisionName: string;
    countryID: number;
    countryName: string;
    constructor() {
        this.districtUpazilaCityCorporationMap = new DistrictUpazilaCityCorporationMap();
        this.organizationUpazilaCityCorporationMap = new OrganizationUpazilaCityCorporationMap();
    }
}

export class DistrictUpazilaCityCorporationMap {
    districtUpazilaCityCorporationMapID: number;
    districtID: number;
    upazilaCityCorporationID: number;
    validityDate: string;
    orderNo: number;
    isActive: boolean = true;
    organizationID: number;
}


export class OrganizationUpazilaCityCorporationMap {
    organizationUpazilaCityCorporationMapID: number;
    organizationID: number;
    upazilaCityCorporationID: number;
    orderNo: number;
    isActive: boolean;
    createdBy: number;
    createdDate: string;
    updatedBy: number;
    updatedDate: string;
}