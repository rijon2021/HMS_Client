import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { HttpReturnStatus } from 'src/app/core/enums/globalEnum';
import { SweetAlertEnum, SweetAlertService } from 'src/app/core/helpers/sweet-alert.service';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { FoodItem } from 'src/app/core/models/hms/meal-management/foodItem';
import { FoodItemService } from 'src/app/core/services/hms/meal-management/food-item.service';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css']
})
export class FoodItemComponent implements OnInit {

  @ViewChild("modalFoodItem") modalFoodItem: TemplateRef<any>;

  lstFoodItem: FoodItem[] = new Array<FoodItem>();
  objFoodItem: FoodItem = new FoodItem();
  selectedFoodItem: FoodItem = new FoodItem();
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
    private foodItemService: FoodItemService,
    private swal: SweetAlertService,
    private router: Router,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.lstFoodItem = [];
    this.foodItemService.getAll().subscribe((response) => {
      if (response) {
        this.lstFoodItem = Object.assign(this.lstFoodItem, response);
        this.lstFoodItem = [...this.lstFoodItem];
        this.gridOptions.api.redrawRows();
      }
    }
    );
  }


  add() {
    this.objFoodItem = new FoodItem();
    this.gridApi.deselectAll();
    this.modalService.open(this.modalFoodItem, { size: 'md', backdrop: 'static' });
  }

  modalClose() {
    this.modalService.dismissAll(this.modalFoodItem);
    this.gridApi.deselectAll();
  }

  async save() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.foodItemService.save(this.objFoodItem).subscribe(
        (response: HttpResponse<any>) => {
        if (response.status == HttpReturnStatus.Success) { 
            this.modalClose();
            this.swal.message(response.body.message, SweetAlertEnum.success);
            this.getAll();
          } else {
            this.swal.message(response.body.message, SweetAlertEnum.error)
            this.modalClose();
          }
        },
        (error) => {
          this.swal.message(error, SweetAlertEnum.error);
        }
      );
    }
  }

  edit() {
    this.objFoodItem = this.selectedFoodItem;
    this.modalService.open(this.modalFoodItem, { size: 'md' });
  }

  async update() {
    if (await this.swal.confirm_custom('Are you sure?', SweetAlertEnum.question, true, false)) {
      this.foodItemService.update(this.objFoodItem).subscribe(
        (response: HttpResponse<any>) => {
        if (response.status == HttpReturnStatus.Success) { 
            this.modalClose();
            this.swal.message(response.body.message, SweetAlertEnum.success);
            this.getAll();
          } else {
            this.swal.message(response.body.message, SweetAlertEnum.error)
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
      this.foodItemService.deleteByID(this.selectedFoodItem.foodItemId).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status == HttpReturnStatus.Success) { 
            this.swal.message(response.body.message, SweetAlertEnum.success);
            this.getAll();
          }else{
            this.swal.message(response.body.message, SweetAlertEnum.error);
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
      this.selectedFoodItem = selectedRows[0];
    }
    else {
      this.selectedFoodItem = new FoodItem();
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
  { isVisible: true, lockPosition: true, pinned: 'left', field: "foodItemName", headerName: 'Food Item Name' } as ColDef,
];
