import { PermissionType } from "../../enums/globalEnum";

export class Permission {
    permissionID: number;
    permissionName: string;
    displayName: string;
    parentPermissionID: number | null;
    isActive: boolean;
    isVisible?: boolean;
    iconName: string;
    routePath: string;
    permissionType: PermissionType;
    permissionTypeStr : string
    orderNo: number;
    createdBy: number;
    createdDate: string;
    updatedBy: number;
    updatedDate: string;
    isCollapsed: boolean = true;
    childList: Permission[] = new Array<Permission>();
    hasChild : boolean;
    isChecked:boolean;
    isVisited:boolean;
    isLinkActive:boolean;
}