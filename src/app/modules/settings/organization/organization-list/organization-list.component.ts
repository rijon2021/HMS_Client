import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridOptions, GridReadyEvent, RowNode } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { Organization } from 'src/app/core/models/data/organization';
import { OrganizationService } from 'src/app/core/services/settings/organization.service';


@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss'],
})
export class OrganizationListComponent implements OnInit {
  // bread crumb items
  lstOrganization: Organization[] = new Array<Organization>();
  selectedOrganization: Organization = new Organization();
  public pageModel: PageModel;

  private gridApi;
  private gridColumnApi;
  columnDefs = dataColumnDefs;
  gridOptions: GridOptions = {
    pagination: true,
    rowSelection: 'single',
    suppressDragLeaveHidesColumns: true,
    suppressPropertyNamesCheck: true,
    suppressRowDrag: false,
    rowDragManaged: true,
    getRowHeight: () => 40,
    defaultColDef: dataDefaultColDef,
  }

  constructor(
    private organizationService: OrganizationService,
    private swal: SweetAlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.pageModel = new PageModel();
    this.getAll();
  }

  getInitialData() {
    this.organizationService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstOrganization = Object.assign(this.lstOrganization, res);
          this.lstOrganization = [...this.lstOrganization];
          this.gridOptions.api.redrawRows();
        }
      }
    );
  }

  getAll() {
    this.organizationService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstOrganization = Object.assign(this.lstOrganization, res);
          this.lstOrganization = [...this.lstOrganization];
          this.gridOptions.api.redrawRows();
        }
      }
    );
  }

  addOrganization() {
    RoutingHelper.navigate2([], ['settings', 'organization', 'organization-create', 0], this.router);
  }

  async editOrganization() {
    if (this.selectedOrganization.organizationID > 0) {
      RoutingHelper.navigate2([], ['settings', 'organization', 'organization-create', this.selectedOrganization.organizationID], this.router);
    }
    else {
      this.swal.message('No organization selected', SweetAlertEnum.error);
    }
  }

  async viewOrganization() {
    if (this.selectedOrganization.organizationID > 0) {
      RoutingHelper.navigate2([], ['settings', 'organization', 'organization-create', this.selectedOrganization.organizationID], this.router);
    }
    else {
      this.swal.message('No organization selected', SweetAlertEnum.error);
    }
  }

  filterToggler() {
    this.pageModel.isActiveFilter = !this.pageModel.isActiveFilter;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    let nodes = this.gridApi.getRenderedNodes();
    if (nodes.length) {
      nodes[0].setSelected(true); //selects the first row in the rendered view
    }
  }

  onSelect() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows && selectedRows.length == 1) {
      this.selectedOrganization = selectedRows[0];
    }
    else {
      this.selectedOrganization = new Organization();
    }
  }

  onChangeColName(colDef: ColDef) {
    const columns = this.gridOptions.columnApi.getColumns();
    const valueColumn = columns.filter(column => column.getColDef().headerName === colDef.headerName)[0];
    const newState = !valueColumn.isVisible();
    this.gridOptions.columnApi.setColumnVisible(valueColumn, newState);
    this.gridOptions.api.sizeColumnsToFit();
  }

  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }
}

const dataDefaultColDef: ColDef = {
  resizable: true,
  sortable: true,
  suppressMovable: false,
  filter: true,
  cellClass: 'suppress-movable-col'
};

const dataColumnDefs = [
  {
    isVisible: true, field: 'slNo', headerName: 'SL', lockPosition: true, pinned: 'left',
    suppressMovable: true, valueGetter: "node.rowIndex + 1", resizable: false, width: 80
  } as ColDef,
  { isVisible: true, field: "organizationName", lockPosition: true, pinned: 'left', suppressMovable: true, headerName: 'Organization Name' } as ColDef,
  { isVisible: true, field: "organizationTypeStr", headerName: 'Organization Type' } as ColDef,
  { isVisible: true, field: "shortName", headerName: 'Short Name' } as ColDef,
  { isVisible: true, field: "address", headerName: 'Address' } as ColDef,
  { isVisible: true, field: "publicURL", headerName: 'Public URL', } as ColDef,
  { isVisible: true, field: "privateURL", headerName: 'Private URL' } as ColDef,
  { isVisible: true, field: "mobileNo", headerName: 'MobileNo' } as ColDef,
  { isVisible: true, field: "email", headerName: 'Email' } as ColDef,
  { isVisible: true, field: "latitude", headerName: 'Latitude' } as ColDef,
  { isVisible: true, field: "longitude", headerName: 'Longitude' } as ColDef,
];

// interface pdfExportOptions {
// 	/** styles to be applied to cells
//     see supported list here: https://pdfmake.github.io/docs/0.1/document-definition-object/styling/. **/
// 	styles?: {
//     	background: String,
//         fontSize: Number,
//         bold: Boolean,
//         color: String,
// 		alignment: 'left' | 'center' | 'right',
// 	},
//     /** creates a hyperlink for each value in a column **/
// 	createURL?: () => String,
//     /** if true, does not include the column in the exported file **/
// 	skipColumn?: Boolean
// }
