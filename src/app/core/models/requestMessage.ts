export class RequestMessage {
  Token: string;
  RequestObj: object;
  pageIndex: number;
  pageSize: number;
  sortBy: string;
  sortOrder: string;
  filterBy: string;
  branchID: number;
  userID: string;
  unitID: number;
  organizationID?:number;
  workingUnitID?:number;
  UserAutoID?:number;
}
