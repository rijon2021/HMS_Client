import { ApplicationStatus, ApplicationType } from "../../enums/globalEnum";
import { Organization } from "../data/organization";
import { Department } from "../settings/department";
import { DPZ } from "../settings/dpz";
import { Mouza } from "../settings/mouza";
import { Thana } from "../settings/thana";
import { Users } from "../settings/users";

export class InspectionMonitoringSearch {
    refNo: string;
    organizations: Organization[];
    departments: Department[];
    dPZs: DPZ[];
    thanas: Thana[];
    mouzas: Mouza[];
    users: Users[];
    applicationTypes: ApplicationType[];
    applicationStatus: ApplicationStatus[];
    fromDateObj: Date;
    toDateObj: Date;
    fromDate: string;
    toDate: string;
    visitStatus: number;
    dateType: number;
}

export class InspectionMonitoringSearchResult {

}