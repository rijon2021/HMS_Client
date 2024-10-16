import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridApi, GridOptions, GridReadyEvent, RowNode } from 'ag-grid-community';
import { Observable, throwError } from 'rxjs';
import { RoutingHelper } from 'src/app/core/helpers/routing-helper';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { Country } from 'src/app/core/models/settings/country';
import { CountryService } from 'src/app/core/services/settings/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  @ViewChild("modalCountry") modalCountry: TemplateRef<any>;

  lstCountry: Country[] = new Array<Country>();
  selectedCountry: Country = new Country();
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
    private countryService: CountryService,
    private swal: SweetAlertService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    // this.selectedCountry.isActive = true;
    this.pageModel = new PageModel();
    this.getAll();
  }

  getAll() {
    this.countryService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstCountry = Object.assign(this.lstCountry, res);
          this.lstCountry = [...this.lstCountry];
          this.gridOptions.api.redrawRows();
        }
      }
    )
  }

  addCountry() {
    this.selectedCountry = new Country();
    this.modalService.open(this.modalCountry, { size: 'md', backdrop: 'static' });
  }

  modalClose() {
    this.modalService.dismissAll(this.modalCountry);
  }

  async saveCountry() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.countryService.save(this.selectedCountry).subscribe(
        (res: Country) => {
          if (res && res.countryID > 0) {
            this.swal.message('Data Updated Successfully', SweetAlertEnum.success);
            this.modalClose();
            this.getAll();
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        }
      );
    }
  }

  editCountry() {
    this.modalService.open(this.modalCountry, { size: 'md' });
  }

  async updateCountry() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.countryService.update(this.selectedCountry).subscribe(
        (res: Country) => {
          if (res && res.countryID > 0) {
            this.swal.message('Data Updated Successfully', SweetAlertEnum.success);
            this.modalClose();
            this.getAll();
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        }
      );
    }
  }

  // async updateOrder() {
  //   if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
  //     let dataLength = this.lstCountry.length;
  //     for (let i = 0; i < dataLength; i++) {
  //       let row = this.gridApi.getDisplayedRowAtIndex(i);
  //       let dbData = this.lstCountry.find(x => x.countryID == row.data.countryID);
  //       dbData.organizationCountryMap.orderNo = i + 1;
  //     }
  //     this.countryService.updateOrder(this.lstCountry).subscribe(
  //       (res) => {
  //         if (res) {
  //           this.gridOptions.api.redrawRows();
  //           this.swal.message('Order Updated', SweetAlertEnum.success);
  //         }
  //       }
  //     );
  //   }
  // }

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
      this.selectedCountry = selectedRows[0];
    }
    else {
      this.selectedCountry = new Country();
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
  { isVisible: true, field: "countryName", headerName: 'Country Name' } as ColDef,
  { isVisible: true, field: "countryCode", headerName: 'Country Code' } as ColDef,
  { isVisible: true, field: "countryNameBangla", headerName: 'Country Name (বাংলা)' } as ColDef
];
