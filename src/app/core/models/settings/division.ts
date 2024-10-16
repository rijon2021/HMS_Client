
export class Division {
    divisionID: number;
    divisionCode: string;
    divisionName: string;
    divisionNameBangla: string;
    // orderNo: number;
    geoFenceID: number | null;
    countryName: string;
    isChecked: boolean
    isSelected: boolean
    countryDivisionMap: CountryDivisionMap;
    organizationDivisionMap: OrganizationDivisionMap;
    countryID: number;
    constructor() {
        this.countryDivisionMap = new CountryDivisionMap();
        this.organizationDivisionMap = new OrganizationDivisionMap();
    }
}

export class CountryDivisionMap {
    countryDivisionMapID: number;
    countryID: number;
    divisionID: number;
    validityDate: string;
    isActive: boolean;
    organizationID: number;
    createdBy: number;
    createdDate: string;
    updatedBy: number;
    updatedDate: string;
}
export class OrganizationDivisionMap {
    organizationDivisionMapID: number;
    organizationID: number;
    divisionID: number;
    orderNo: number;
    isActive: boolean;
    createdBy: number;
    createdDate: string;
    updatedBy: number;
    updatedDate: string;
}