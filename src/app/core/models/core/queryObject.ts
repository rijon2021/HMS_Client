export class QueryObject {
    requestObj: object;
    fromDate: string;
    toDate: string;
    departmentID: number;
    applicationType: number;
    designation: number;
    accessRight: number;
    bPNumber: string;
    appliedPost: number;
    userAutoID: number;
    userID: number;
    unitID: number;
    applicantName: string;
    sessionID: number;
    userRoleID: number;
    countryID: number = 0;
    organizationID: number;
    divisionID: number = 0;
    districtID: number = 0;
    upazilaCityCorporationID: number = 0;
    thanaID: number = 0;
    dpzID: number = 0;
    mouzaID: number = 0;
    unionWardID: number = 0;
    villageAreaID: number;
    territoryID: number;
    territoryName: string;
    fileNo: string;
    isVisited: boolean;
    visitType: number;
    referenceNo: string;

    static allProps: string[] = [
        'requestObj', 'fromDate', 'toDate', 'departmentID', 'applicationType', 'designation',
        'accessRight', 'bPNumber', 'appliedPost', 'userAutoID', 'userID', 'unitID', 'applicantName',
        'sessionID', 'userRoleID', 'countryID', 'organizationID', 'divisionID', 'districtID',
        'upazilaCityCorporationID', 'thanaID', 'dpzID', 'mouzaID', 'unionWardID', 'villageAreaID',
        'territoryID', 'territoryName', 'fileNo', 'isVisited', 'visitType', 'referenceNo'
    ]

    constructor(params?: Partial<QueryObject>) {
        if (params) {
            Object.keys(params).forEach(key => {
                if (QueryObject.allProps.includes(key)) {
                    this[key] = params[key];
                }
            });
        }
    }
}
