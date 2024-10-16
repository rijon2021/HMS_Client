
export class Para {
    paraID: number;
    paraCode: string;
    paraName: string;
    paraNameBangla: string;
    geoFenceID: number | null;
    createdBy: number;
    createdDate: string;
    updatedBy: number;
    updatedDate: string;
    villageAreaParaMap: VillageAreaParaMap;
    organizationParaMap: OrganizationParaMap;
    villageAreaName: string;
    orderNo: number;
  isChecked: any;
  villageAreaID: number;
    constructor(){
        this.villageAreaParaMap = new VillageAreaParaMap();
        this.organizationParaMap = new OrganizationParaMap();
    }
}

export class VillageAreaParaMap {
    villageAreaParaMapID: number;
    villageAreaID: number;
    paraID: number;
    validityDate: string;
    orderNo: number;
    isActive: boolean;
    organizationID: number;
    createdBy: number;
    createdDate: string;
    updatedBy: number;
    updatedDate: string;
}

export class OrganizationParaMap {
    organizationParaMapID: number;
    organizationID: number;
    paraID: number;
    orderNo: number;
    isActive: boolean;
    createdBy: number;
    createdDate: string;
    updatedBy: number;
    updatedDate: string;
}
