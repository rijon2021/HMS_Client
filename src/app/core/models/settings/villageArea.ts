
export class VillageArea {
    villageAreaID: number;
    villageAreaCode: string;
    villageAreaName: string;
    villageAreaNameBangla: string;
    geoFenceID: number | null;
    unionWardVillageAreaMap: UnionWardVillageAreaMap;
    organizationVillageAreaMap: OrganizationVillageAreaMap;
    isChecked: boolean
    isSelected: boolean
    unionWardID: number;
    constructor() {
        this.unionWardVillageAreaMap = new UnionWardVillageAreaMap();
        this.organizationVillageAreaMap = new OrganizationVillageAreaMap();
    }
}

export class UnionWardVillageAreaMap {
    unionWardVillageAreaMapID: number;
    unionWardID: number;
    villageAreaID: number;
    validityDate: string;
    orderNo: number;
    isActive: boolean;
    organizationID: number;
}

export class OrganizationVillageAreaMap {
    organizationVillageAreaMapID: number;
    organizationID: number;
    villageAreaID: number;
    orderNo: number;
    isActive: boolean;
    createdBy: number;
    createdDate: string;
    updatedBy: number;
    updatedDate: string;
}