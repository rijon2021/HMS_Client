import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { PermissionType } from 'src/app/core/enums/globalEnum';
import { LOCALSTORAGE_KEY } from 'src/app/core/models/localstorage-item';
import { Permission } from 'src/app/core/models/settings/permission';


@Component({
  selector: 'app-page-title',
  templateUrl: './pagetitle.component.html',
  styleUrls: ['./pagetitle.component.scss']
})
export class PagetitleComponent implements OnInit {
  @Input() title: string;
  @Input() toggleSearch: string;
  @Output() newItemEvent = new EventEmitter<boolean>();

  breadcrumbItems: any;
  currentPermissionID: number;
  monitoringSearchTogglerAction: boolean = false;
  lstmenuItems: Permission[] = new Array<Permission>();


  constructor() { }


  ngOnInit() {
    this.currentPermissionID = parseInt(localStorage.getItem(LOCALSTORAGE_KEY.ACTIVE_PERMISSION_ID));
    this.lstmenuItems = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY.PERMISSIONS));
    this.lstmenuItems = this.lstmenuItems.filter(x => x.permissionID != 1);
    this.makeBreadcrumb();
  }

  makeBreadcrumb() {
    this.breadcrumbItems = [];
    let dataList = [];

    let currentPermission = this.lstmenuItems.find(x => x.permissionID == this.currentPermissionID);
    while (currentPermission != null && currentPermission.permissionType == PermissionType.Menu) {
      dataList.push({ label: currentPermission.displayName })
      currentPermission = this.getParent(currentPermission)
    }

    if (dataList) {
      while (dataList && dataList.length > 0) {
        this.breadcrumbItems.push(dataList.pop());
      }
    }
  }

  getParent(permission: Permission) {
    return this.lstmenuItems.find(x => x.permissionID == permission.parentPermissionID);
  }

  monitoringSearchToggler() {
    this.newItemEvent.emit(this.monitoringSearchTogglerAction != this.monitoringSearchTogglerAction);

  }
}
