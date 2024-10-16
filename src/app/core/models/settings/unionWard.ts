export class UnionWard {
    unionWardID: number;
    unionWardCode: string;
    unionWardName: string;
    unionWardNameBangla: string;
    isUpazila: boolean;
    geoFenceID: number | null;
    isUnion: boolean;
    thanaUnionWardMap: ThanaUnionWardMap;
    organizationUnionWardMap: OrganizationUnionWardMap;
    thanaName: string;
    orderNo: number;
    isChecked: boolean
    isSelected: boolean
    thanaID: number;
    constructor() {
        this.thanaUnionWardMap = new ThanaUnionWardMap();
        this.organizationUnionWardMap = new OrganizationUnionWardMap();

    }
}
export class ThanaUnionWardMap {
    thanaUnionWardMapID: number;
    thanaID: number;
    unionWardID: number;
    validityDate: string;
    orderNo: number;
    isActive: boolean;
    organizationID: number;
}
export class OrganizationUnionWardMap {
    organizationUnionWardMapID: number;
    organizationID: number;
    unionWardID: number;
    orderNo: number;
    isActive: boolean;
    createdBy: number;
    createdDate: string;
    updatedBy: number;
    updatedDate: string;
}