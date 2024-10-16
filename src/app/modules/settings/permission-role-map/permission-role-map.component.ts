import { Component, OnInit } from '@angular/core';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { ResponseMessage } from 'src/app/core/models/responseMessage';
import { Permission } from 'src/app/core/models/settings/permission';
import { PermissionUserRoleMap, VMPermissionUserRoleMap } from 'src/app/core/models/settings/permissionUserRoleMap';
import { UserRole } from 'src/app/core/models/settings/userRole';
import { PermissionRoleMapService } from 'src/app/core/services/settings/permission-role-map.service';

@Component({
  selector: 'app-permission-role-map',
  templateUrl: './permission-role-map.component.html',
  styleUrls: ['./permission-role-map.component.scss']
})
export class PermissionRoleMapComponent implements OnInit {

  lstUserRole: UserRole[] = new Array<UserRole>();
  // lstPermission: Permission[] = new Array<Permission>();
  // lstPermission_1: Permission[] = new Array<Permission>();
  // lstPermissionUserRoleMap: PermissionUserRoleMap[] = new Array<PermissionUserRoleMap>();


  lstvmPermissionUserRoleMap: VMPermissionUserRoleMap[] = new Array<VMPermissionUserRoleMap>();
  // lstvmPermissionUserRoleMap_update: VMPermissionUserRoleMap[] = new Array<VMPermissionUserRoleMap>();


  selectedUserRole: UserRole = new UserRole();

  constructor(
    private permissionRoleMapService: PermissionRoleMapService,
    private swal: SweetAlertService
  ) {


  }

  ngOnInit(): void {
    this.getInitialData();
  }
  getInitialData() {
    this.permissionRoleMapService.getInitialData().subscribe(
      (res: ResponseMessage) => {
        if (res) {
          this.lstUserRole = res.responseObj.lstUserRole;
          this.onClickUserRole(0);
        }
      },
    );
  }

  list_to_tree(list: VMPermissionUserRoleMap[]) {
    var map = {}, node: VMPermissionUserRoleMap, roots = [], i;
    for (i = 0; i < list.length; i += 1) {
      map[list[i].permissionID] = i;
      list[i].childList = [];
    }

    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      node.isCollapsed = false;
      if (node.parentPermissionID !== 0 && list[map[node.parentPermissionID]]) {
        list[map[node.parentPermissionID]].childList.push(node);
      }
      else {
        roots.push(node);
      }
    }
    return roots;
  }

  onCheckPermission(data: VMPermissionUserRoleMap) {
    // var tvNodes = document.getElementById("treeMenu_" + data.permissionID);
    // var chBoxes = tvNodes.getElementsByTagName("input");
    // for (var i = 0; i < chBoxes.length; i++) {
    //   var chk = chBoxes[i];
    //   if (chk.type == "checkbox") {
    //     chk.checked = true;
    //     if (chk.checked == true) {
    //       chk.checked = true;
    //     }
    //     else if (chk.checked == false) {
    //       chk.checked = false;
    //     }
    //   }
    // }
    // // return true;
  }

  onTreeToggle(oItem: Permission) {
    oItem.isCollapsed = !oItem.isCollapsed;
  }
  onClickUserRole(userRoleID: number) {
    this.lstUserRole.forEach(x => {
      x.isSelected = false;
    })
    if (userRoleID > 0) {
      this.selectedUserRole = this.lstUserRole.find(x => x.userRoleID == userRoleID);
      this.selectedUserRole.isSelected = true;
    }
    this.permissionRoleMapService.getByUserRoleID(userRoleID).subscribe(
      (res: VMPermissionUserRoleMap[]) => {
        if (res) {
          this.lstvmPermissionUserRoleMap = res;
          this.lstvmPermissionUserRoleMap.forEach(x => {
            x.isCollapsed = true;
            x.childList = new Array<Permission>();
          });
          this.list_to_tree(this.lstvmPermissionUserRoleMap);
          this.lstvmPermissionUserRoleMap = this.lstvmPermissionUserRoleMap.filter(x => x.parentPermissionID == 0);
          this.lstvmPermissionUserRoleMap[0].isCollapsed = false;
        }
      },
    );

  }
  async updatePermission() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {

      var oList = this.tree_to_array([this.lstvmPermissionUserRoleMap[0]], []);
      this.permissionRoleMapService.updatePermissionList(oList).subscribe(
        (res: boolean) => {
          if (res) {
            this.onClickUserRole(this.selectedUserRole.userRoleID)
            this.swal.message("Data Updated into this User Role", SweetAlertEnum.success);
          }
          else {
            this.swal.message("Data Updated Failed", SweetAlertEnum.error);
          }
        },
      );
    }
  }
  tree_to_array(nodes, arr: any[]) {
    if (!nodes) {
      return [];
    }
    if (!arr) {
      arr = [];
    }
    for (var i = 0; i < nodes.length; i++) {
      arr.push(nodes[i]);
      this.tree_to_array(nodes[i].childList, arr);
    }
    return arr
  }
}


