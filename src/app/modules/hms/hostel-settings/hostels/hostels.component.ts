import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions} from 'ag-grid-community';
import { ReturnStatus } from 'src/app/core/enums/globalEnum';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { Hostels } from 'src/app/core/models/hms/hostel-settings/hostels';
import { ResponseMessage } from 'src/app/core/models/responseMessage';
import { HostelsService } from 'src/app/core/services/hms/hostel-settings/hostels.service';
@Component({
  selector: 'app-hostels',
  templateUrl: './hostels.component.html',
  styleUrls: ['./hostels.component.css']
})
export class HostelsComponent implements OnInit {

  @ViewChild("modalHostels") modalHostels: TemplateRef<any>;

  lstHostels: Hostels[] = new Array<Hostels>();
  objHostels: Hostels = new Hostels();
  selectedHostels: Hostels = new Hostels();
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
    private hostelsService: HostelsService,
    private swal: SweetAlertService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.pageModel = new PageModel();
    this.getAll();
  }

  getAll() {
    this.lstHostels = [];
    this.hostelsService.getAll().subscribe(
      (res) => {
        if (res) {
          this.lstHostels = Object.assign(this.lstHostels, res);
          this.lstHostels = [...this.lstHostels];
          this.gridOptions.api.redrawRows();
        }
      }
    )
  }

  add() {
    this.objHostels = new Hostels();
    this.gridApi.deselectAll();
    this.modalService.open(this.modalHostels, { size: 'md', backdrop: 'static' });
  }

  modalClose() {
    this.modalService.dismissAll(this.modalHostels);
    this.gridApi.deselectAll();
  }

  async save() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.hostelsService.save(this.objHostels).subscribe(
        (res: ResponseMessage) => {
          if (res.statusCode === ReturnStatus.Success) { 
              this.swal.message("Data Saved Successfully", SweetAlertEnum.success);
              this.modalClose();
              this.getAll(); 
          } else {
            this.swal.message(res.message, SweetAlertEnum.error)
            this.modalClose();
          }
      },
      (error) => {
          // Handle API errors (e.g., network issues, server errors)
          console.error("Error occurred during file upload:", error);
      }
      );
    }
  }

  edit() {
    this.objHostels = this.selectedHostels;
    this.modalService.open(this.modalHostels, { size: 'md' });
  }

  async update() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.hostelsService.update(this.objHostels).subscribe( 
        (response:HttpResponse<any>) => {
          if (response) { 
            console.log('Status Code:', response.status); // Server response code
            console.log('Body:', response.body);    
            console.log('Body:', response);    
              this.swal.message("Success"+response, SweetAlertEnum.success);
              this.modalClose();
              this.getAll(); 
          } else {
            this.swal.message('Not Success', SweetAlertEnum.error)
            this.modalClose();
          }
      },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        }
      );
    }
  }
  async deleteData() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.hostelsService.deleteByID(this.selectedHostels.hostelId).subscribe(
        (res:Hostels) => {
          if (res) {
            this.swal.message('Data Deleted Successfully', SweetAlertEnum.success);
            this.getAll();
            
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        }
      );
    }
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
      this.selectedHostels = selectedRows[0];
    }
    else {
      this.selectedHostels = new Hostels();
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
  { isVisible: true, field: "hostelName", headerName: 'Hostel Name' } as ColDef,
  { isVisible: true, field: "contactNumber", headerName: 'Contact No' } as ColDef,
  { isVisible: true, field: "email", headerName: 'Email' } as ColDef,
  { isVisible: true, field: "description", headerName: 'Description' } as ColDef,
  { isVisible: true, field: "establishedDate", headerName: 'Esteblish Date' } as ColDef,
  { isVisible: true, field: "website", headerName: 'Website' } as ColDef,
  { isVisible: true, field: "address", headerName: 'Address' } as ColDef,
];
