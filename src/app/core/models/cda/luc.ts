import { RoadNature, AuthorizationStatus, LUCFormat } from "../../enums/globalEnum";
import { Occupancy } from "./occupancy";

export class LUC {
    inspectionDetailsLUCID: number;
    applicationFileMasterID: number;
    landOwnerName?: string;
    landOccupancyID: number;
    landOccupancyTypeID: number;
    description?: string;
    existingRoadNatureNorth?: RoadNature;
    existingRoadSizeFootNorth?: number;
    existingRoadSizeMeterNorth?: number;
    existingRoadNatureSouth?: RoadNature;
    existingRoadSizeFootSouth?: number;
    existingRoadSizeMeterSouth?: number;
    existingRoadNatureEast?: RoadNature;
    existingRoadSizeFootEast?: number;
    existingRoadSizeMeterEast?: number;
    existingRoadNatureWest?: RoadNature;
    existingRoadSizeFootWest?: number;
    existingRoadSizeMeterWest?: number;
    surroundingsDescription?: string;
    proposedRoadNatureNorth?: RoadNature;
    proposedRoadSizeFootNorth?: number;
    proposedRoadSizeMeterNorth?: number;
    proposedRoadNatureSouth?: RoadNature;
    proposedRoadSizeFootSouth?: number;
    proposedRoadSizeMeterSouth?: number;
    proposedRoadNatureEast?: RoadNature;
    proposedRoadSizeFootEast?: number;
    proposedRoadSizeMeterEast?: number;
    proposedRoadNatureWest?: RoadNature;
    proposedRoadSizeFootWest?: number;
    proposedRoadSizeMeterWest?: number;
    dapExplanation?: string;
    proposedLandUseAuthorizationStatus?: AuthorizationStatus;
    othersDescription?: string;
    investigationOfficerID?: number;
    investigationOfficerSignetureDate?: string;
    dM_IsOwnershipJustifiedByDocument?: string;
    dM_IsLandPositionJustifiedByBSMap?: string;
    dM_IsLandPositionJustifiedByRSMap?: string;
    dM_IsSiteDamagedByCDAApprovedAlignmentOrAlreadyProposed?: string;
    dM_OthersDescription?: string;
    giS_Description?: string;
    giS_DAPAlignmentApprovalOrDamaged?: string;
    giS_IsENIBI2008_SiteAttachedRoadExtensionProposed?: string;
    giS_DBLandClassification?: string;
    giS_IsSiteAttachedRoadAlreadyApplied?: string;
    giS_IsProposedLandObjected?: string;
    isDelete?: boolean;
    createdBy: number;
    createdDate: string;
    updatedBy: number;
    updatedDate: string;
    investigationOfficerName?: string;
    investigationOfficerMobileNo?: string;
    investigationOfficerSignature?: string;
    deptHeadName?: string;
    deptHeadMobileNo?: string;
    deptHeadSignature?: string;

    occupancies?: Occupancy[] = [];
    landOccupancyName: string;
    landOccupancyTypeName: string;

    existingRoadNatureNorthStr: string;
    existingRoadNatureSouthStr: string;
    existingRoadNatureEastStr: string;
    existingRoadNatureWestStr: string;
    proposedRoadNatureNorthStr: string;
    proposedRoadNatureSouthStr: string;
    proposedRoadNatureEastStr: string;
    proposedRoadNatureWestStr: string;
    authorizationStatusStr: string;

    format: LUCFormat;

    constructor(params?: Partial<LUC>) {
        if (params) {
            this.format = params.format;
        }
    }
}