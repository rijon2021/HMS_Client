import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input, OnChanges } from '@angular/core';
import MetisMenu from 'metismenujs/dist/metismenujs';
import { Router, NavigationEnd } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { LOCALSTORAGE_KEY } from 'src/app/core/models/localstorage-item';
import { Permission } from 'src/app/core/models/settings/permission';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import { PermissionType } from 'src/app/core/enums/globalEnum';


/**
 * Sidebar component
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit, OnChanges {
  menu: any;
  data: any;

  menuItems = [];
  lstmenuItemsFull: Permission[] = new Array<Permission>();
  lstmenuItems: Permission[] = new Array<Permission>();
  selectedPermission: Permission;
  routingPermission: Permission;

  @Input() isCondensed = false;
  @ViewChild('componentRef') scrollRef;
  @ViewChild('sideMenu') sideMenu: ElementRef;


  constructor(private router: Router, public translate: TranslateService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this._activateMenuDropdown();
        this._scrollElement();
      }
    });
  }

  ngOnInit() {
    this.initialize();
    this._scrollElement();
  }

  ngAfterViewInit() {
    this.menu = new MetisMenu(this.sideMenu.nativeElement);
    this._activateMenuDropdown();
  }

  ngOnChanges() {
    if (!this.isCondensed && this.sideMenu || this.isCondensed) {
      setTimeout(() => {
        this.menu = new MetisMenu(this.sideMenu.nativeElement);
      });
    } else if (this.menu) {
      this.menu.dispose();
    }
  }

  initialize(): void {
    this.lstmenuItemsFull = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY.PERMISSIONS));

    this.lstmenuItems = this.lstmenuItemsFull.slice();
    this.lstmenuItems = this.lstmenuItems.filter(x => x.permissionType == PermissionType.Menu);

    if (this.router.url !== '/') {
      this.selectedPermission = this.lstmenuItems.find(mi => mi.permissionID == parseInt(localStorage.getItem(LOCALSTORAGE_KEY.ACTIVE_PERMISSION_ID)));
      this.routingPermission = this.lstmenuItemsFull.find(
        mi =>
          mi.routePath &&
          mi.routePath.trim().length > 0 &&
          this.router.url.indexOf(mi.routePath) !== -1
      );

      if (!this.selectedPermission || (this.routingPermission && this.routingPermission != this.selectedPermission)) {
        this.routingPermission.routePath = this.router.url; // necessary to set url with route param
        this.selectedPermission = this.routingPermission;
      }

      if (this.selectedPermission) {
        this.selectedPermission.isLinkActive = true;
        localStorage.setItem(LOCALSTORAGE_KEY.ACTIVE_PERMISSION_ID, this.selectedPermission.permissionID.toString());
      }

      let parentPermissionIDs = this.getParentPermissionIDs(this.selectedPermission);

      this.lstmenuItems.forEach((mi) => {
        mi.isCollapsed = !parentPermissionIDs.includes(mi.permissionID);
      });
    } else {
      this.lstmenuItems.forEach((mi) => {
        mi.isCollapsed = true;
      });
    }

    this.listToTree(this.lstmenuItems);
    this.lstmenuItems = this.lstmenuItems.filter(x => x.parentPermissionID == 1);

    if (
      this.router.url !== '/' &&
      this.selectedPermission &&
      this.selectedPermission.routePath &&
      this.selectedPermission.routePath.trim().length > 0
      // permission of type Page should be navigable
      //&&
      // this.selectedPermission.permissionType == PermissionType.Menu &&
      // this.router.url.indexOf(this.selectedPermission.routePath.trim()) === -1
    ) {
      RoutingHelper.navigate2([], [this.selectedPermission.routePath], this.router);
    }
  }

  getParentPermissionIDs(oItem: Permission) {
    let parentPermissionIDs = [];

    if (oItem) {
      let parentTracer = { ...oItem };

      do {
        if (parentTracer.permissionID) parentPermissionIDs.push(parentTracer.permissionID);
        if (parentTracer.parentPermissionID) {
          parentTracer = { ...(this.lstmenuItemsFull.find(mi => mi.permissionID == parentTracer.parentPermissionID)) };
        } else parentTracer = null;
      } while (parentTracer);
    }

    return parentPermissionIDs;
  }

  listToTree(list: Permission[]) {
    var map = {}, node: Permission, roots = [], i;
    for (i = 0; i < list.length; i += 1) {
      map[list[i].permissionID] = i;
      list[i].childList = [];
    }

    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parentPermissionID !== 0 && list[map[node.parentPermissionID]]) {
        list[map[node.parentPermissionID]].childList.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  }

  onToggle(oItem: Permission) {
    // collapse siblings
    let siblingPermissions = this.lstmenuItemsFull.filter(mi => mi.permissionID != oItem.permissionID && mi.parentPermissionID == oItem.parentPermissionID);

    siblingPermissions.forEach(sp => {
      sp.isCollapsed = true;
      this.collapseChildren(sp);
    });

    if (oItem.hasChild) {
      oItem.isCollapsed = !oItem.isCollapsed;

      if (oItem.isCollapsed) this.collapseChildren(oItem);

      let parentPermissionIDs = this.getParentPermissionIDs(oItem);

      this.lstmenuItems.forEach((mi) => {
        if (!parentPermissionIDs.includes(mi.permissionID)) {
          mi.isCollapsed = true;

          if (mi.hasChild) {
            this.collapseChildren(mi);
          }
        }
      });
    }
    else {
      oItem.isCollapsed = false;
    }

    if (oItem.routePath && oItem.routePath.trim().length > 0 && oItem.permissionType == PermissionType.Menu) {
      localStorage.setItem(LOCALSTORAGE_KEY.ACTIVE_PERMISSION_ID, oItem.permissionID.toString());

      // unmark previous
      if (this.selectedPermission) {
        this.selectedPermission.isLinkActive = false
      }

      // mark current
      oItem.isLinkActive = true;
      this.selectedPermission = oItem;
      RoutingHelper.navigate2([], [oItem.routePath], this.router);
    }
  }

  collapseChildren(mi: Permission) {
    let childTracer = [mi],
      childTracers = [];

    do {
      if (childTracer.length > 0 && childTracer[0].hasChild) {
        childTracers.push(childTracer[0].childList.filter(mi => mi.hasChild && !mi.isCollapsed));
      }

      childTracer = childTracers.pop();

      if (childTracer && childTracer.length > 0 && childTracer[0].isCollapsed != undefined) {
        childTracer[0].isCollapsed = true;
      }
    } while (childTracer);
  }

  _scrollElement() {
    setTimeout(() => {
      if (document.getElementsByClassName("mm-active").length > 0) {
        const currentPosition = document.getElementsByClassName("mm-active")[0]['offsetTop'];
        if (currentPosition > 500)
          if (this.scrollRef.SimpleBar !== null)
            this.scrollRef.SimpleBar.getScrollElement().scrollTop =
              currentPosition + 300;
      }
    }, 300);
  }

  /**
   * remove active and mm-active class
   */
  _removeAllClass(className) {
    const els = document.getElementsByClassName(className);
    while (els[0]) {
      els[0].classList.remove(className);
    }
  }

  /**
   * Activate the parent dropdown
   */
  _activateMenuDropdown() {
    this._removeAllClass('mm-active');
    this._removeAllClass('mm-show');
    const links = document.getElementsByClassName('side-nav-link-ref');
    let menuItemEl = null;

    // tslint:disable-next-line: prefer-for-of
    const paths = [];
    for (let i = 0; i < links.length; i++) {
      paths.push(links[i]['pathname']);
    }

    var itemIndex = paths.indexOf(window.location.pathname);
    if (itemIndex === -1) {
      const strIndex = window.location.pathname.lastIndexOf('/');
      const item = window.location.pathname.substr(0, strIndex).toString();
      menuItemEl = links[paths.indexOf(item)];
    } else {
      menuItemEl = links[itemIndex];
    }

    if (menuItemEl) {
      menuItemEl.classList.add('active');

      const parentEl = menuItemEl.parentElement;
      if (parentEl) {
        parentEl.classList.add('mm-active');

        const parent2El = parentEl.parentElement.closest('ul');
        if (parent2El && parent2El.id !== 'side-menu') {
          parent2El.classList.add('mm-show');

          const parent3El = parent2El.parentElement;
          if (parent3El && parent3El.id !== 'side-menu') {
            parent3El.classList.add('mm-active');

            const childAnchor = parent3El.querySelector('.has-arrow');
            const childDropdown = parent3El.querySelector('.has-dropdown-expanded');
            if (childAnchor) {
              childAnchor.classList.add('mm-active');
            }

            if (childDropdown) {
              childDropdown.classList.add('mm-active');
            }

            const parent4El = parent3El.parentElement;
            if (parent4El && parent4El.id !== 'side-menu') {
              parent4El.classList.add('mm-show');

              const parent5El = parent4El.parentElement;
              if (parent5El && parent5El.id !== 'side-menu') {
                parent5El.classList.add('mm-active');

                const childanchor = parent5El.querySelector('.is-parent');
                if (childanchor && parent5El.id !== 'side-menu') { childanchor.classList.add('mm-active'); }
              }
            }
          }
        }
      }
    }
  }
}
