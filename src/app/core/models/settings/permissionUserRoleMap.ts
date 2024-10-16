import { PermissionType } from "../../enums/globalEnum";
import { Permission } from "./permission";

export class PermissionUserRoleMap {
    permissionUserRoleMapID: number;
    permissionID: number;
    userRoleID: number;
    organizationID: number;
    createdBy: number;
    createdDate: string;
}

export class VMPermissionUserRoleMap {
    childList: Permission[] = new Array<Permission>();
    isCollapsed: boolean;
    permissionUserRoleMapID: number | null;
    permissionID: number;
    parentPermissionID: number;
    userRoleID: number;
    organizationID: number | null;
    permissionName: string;
    displayName: string;
    permissionType: PermissionType;
    routePath: string;
    isChecked: boolean;
    permissionTypeStr: string;
    hasChild : boolean;
    isVisited:boolean;
    isActive: boolean;
    iconName: string;
    orderNo: number;
    createdBy: number;
    createdDate: string;
    updatedBy: number;
    updatedDate: string;
    isLinkActive: boolean;
}