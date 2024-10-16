import { AgmInfoWindow, AgmMarker } from '@agm/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InspectionFileType } from 'src/app/core/enums/globalEnum';
import { ApplicationFileMaster } from 'src/app/core/models/cda/applicationFileMaster';
import { InspectionCoordinate } from 'src/app/core/models/cda/inspectionCoordinate';
import { InspectionMonitoringSearch } from 'src/app/core/models/cda/inspectionMonitoringSearch';
import { Attachment } from 'src/app/core/models/common/attachment';
import { PageModel } from 'src/app/core/models/core/pageModel';
import { QueryObject } from 'src/app/core/models/core/queryObject';
import { LOCALSTORAGE_KEY } from 'src/app/core/models/localstorage-item';
import { ResponseMessage } from 'src/app/core/models/responseMessage';
import { AttachmentsService } from 'src/app/core/services/cda/attachments.service';
import { InspectionMonitoringService } from 'src/app/core/services/cda/inspection-monitoring.service';

declare const google: any;


@Component({
  selector: 'app-inspection-monitoring',
  templateUrl: './inspection-monitoring.component.html',
  styleUrls: ['./inspection-monitoring.component.scss'],
  animations: [
    trigger('inOutPaneAnimation',
      [
        transition(':enter', [
          style({ transform: 'translateX(80%)' }),
          animate(500, style({ transform: 'translateX(0)' }))
        ]),
        transition(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate(500, style({ transform: 'translateX(-100%)' }))
        ])
      ]
    ),
    trigger('inOutPaneAnimation2',
      [
        transition(':enter', [
          style({ transform: 'translateX(80%)' }),
          animate(500, style({ transform: 'translateX(0)' }))
        ]),
        transition(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate(500, style({ transform: 'translateX(-100%)' }))
        ])
      ]
    )
  ]
})
export class InspectionMonitoringComponent implements OnInit {
  searchToggle = true;

  @ViewChild("customNav") nav: NgbNav;
  pageModel: PageModel = new PageModel();
  mapTypeControlOptions = false;
  queryObject: QueryObject = new QueryObject();
  fileOrRefNo: string;
  lstApplicationFileMaster: ApplicationFileMaster[] = new Array<ApplicationFileMaster>();
  lstApplicationFileMaster_checked: ApplicationFileMaster[] = new Array<ApplicationFileMaster>();
  lstAttachmentAllType: Array<Attachment>;
  lstAttachmentSingleType: Array<Attachment>;
  lstAttachmentWithLocation: Array<Attachment>;
  lstInspectionCoordinates: Array<InspectionCoordinate>;
  lstCoordPolygonPts: Array<any>;
  responsData: any;

  lightboxAlbums = [];
  agmInfoSlideToggler: boolean = false;
  selectValue = [];
  selectValue1 = [];

  markerRemovedOrAdded: boolean = false;
  zoomPosition: any;
  onMapReady(mapInstance) {
    let trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(mapInstance);
    mapInstance.setOptions(
      {
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_RIGHT
        },
        fullscreenControlOptions: {
          position: google.maps.ControlPosition.TOP_RIGHT
        },
        streetViewControlOptions: {
          position: google.maps.ControlPosition.LEFT_TOP
        },
        zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_TOP
        }
      }
    );
  }

  mapType = 'roadmap';
  annotation: any;
  lat: number = 23.8750074;
  lng: number = 90.3382872;
  plat: number = 23.785064;
  plng: number = 90.397394;
  zoom: number = 9;

  center: any = {
    lat: 23.8750074,
    lng: 90.3382872
  };

  color: string = 'navyblue';
  opacity: number = 0.0;
  poSearch: any;
  strokeColor: string = 'red';
  strokeOpacity: number = 0.6;

  @ViewChild('streetviewMap', { static: true }) streetviewMap: any;
  @ViewChild('streetviewPano', { static: true }) streetviewPano: any;

  refNo: string;
  searchObj: InspectionMonitoringSearch = new InspectionMonitoringSearch();

  // bread crumb items
  constructor(
    private attachmentsService: AttachmentsService,
    private inspectionMonitoringService: InspectionMonitoringService
  ) { }


  ngOnInit(): void { }

  onCheckFileMaster(fileMaster?: ApplicationFileMaster) {
    this.markerRemovedOrAdded = true;
    this.changePickupMarkerLocation(null);

    this.lstApplicationFileMaster_checked = this.lstApplicationFileMaster.filter(x => x.isChecked == true);

    if (!fileMaster || !fileMaster.isChecked) {
      this.lstApplicationFileMaster_checked.forEach(el => {
        this.focusInspection(el, 18);
      });

      // changed from checked to unchecked
      if (fileMaster) {
        if (this.lstAttachmentWithLocation.find(item => item.referenceID === fileMaster.applicationFileMasterID)) {
          this.lstAttachmentWithLocation = [];
        }

        if (this.lstInspectionCoordinates.find(item => item.applicationFileMasterID === fileMaster.applicationFileMasterID)) {
          this.lstInspectionCoordinates = [];
          this.lstCoordPolygonPts = [];
        }
      }
    } else {
      this.focusInspection(fileMaster, 18);
    }
  }

  onCheckAllFileMaster() {
    this.markerRemovedOrAdded = true;
    this.changePickupMarkerLocation(null);

    if (this.pageModel.isCheckAll) {
      this.lstApplicationFileMaster.forEach(x => {
        x.isChecked = true;
      });

      this.lstApplicationFileMaster_checked = this.lstApplicationFileMaster;
    }
    else {
      this.lstApplicationFileMaster.forEach(x => {
        x.isChecked = false;
      });

      this.lstApplicationFileMaster_checked = [];
    }

    this.lstApplicationFileMaster.forEach(el => {
      this.focusInspection(el, 8);
    });
  }

  getContentMarkerIcon(attachementTypeID: number) {
    let contentMarkerIcon = ''
    switch (attachementTypeID) {
      case 1:
        contentMarkerIcon = `./assets/images/rtims/audio-location-filled.png`;
        break;
      case 2:
        contentMarkerIcon = `./assets/images/rtims/image-location-filled.png`;
        break;
      case 3:
        contentMarkerIcon = `./assets/images/rtims/video-location-filled.png`;
        break;
      default:
        break;
    }

    return contentMarkerIcon;
  }

  onClickExtendedView(fileMaster: ApplicationFileMaster) {
    // load attachments
    this.getAttachments(fileMaster.applicationFileMasterID).subscribe(() => {
      this.lstAttachmentWithLocation = this.lstAttachmentAllType.filter(
        attachment => attachment.latitude &&
          attachment.longitude &&
          attachment.referenceID === fileMaster.applicationFileMasterID
      );

      this.markerRemovedOrAdded = true;
      this.changePickupMarkerLocation(null);

      this.focusInspection(fileMaster, 30);
    });

    // load coordinates
    this.inspectionMonitoringService.getInspectionCoordinates(fileMaster.applicationFileMasterID).subscribe((res: any) => {
      if (res) {
        this.lstInspectionCoordinates = res;
        this.lstCoordPolygonPts = this.lstInspectionCoordinates.map(item => new google.maps.LatLng(item.latitude, item.longitude));
      }
    });
  }

  focusInspection(fileMaster: ApplicationFileMaster, zoomScale: number) {
    // set center
    if (this.center.lat === fileMaster.latitude) {
      this.center = {
        lat: this.center.lat + 0.0000001,
        lng: this.center.lng + 0.0000001
      }
    }
    else if (this.center.lat - fileMaster.latitude === 0.0000001) {
      this.center = {
        lat: this.center.lat - 0.0000001,
        lng: this.center.lng - 0.0000001
      }
    } else {
      this.center = {
        lat: fileMaster.latitude,
        lng: fileMaster.longitude
      }
    }

    // set zoom
    if (this.zoom === zoomScale) {
      this.zoom += 1;
    } else if (this.zoom - zoomScale === 1) {
      this.zoom -= 1;
    } else {
      this.zoom = zoomScale;
    }
  }

  searchData(data: InspectionMonitoringSearch) {
    this.lstApplicationFileMaster = [];
    this.inspectionMonitoringService.searchMultiple(data).subscribe(
      (res) => {
        if (res) {
          this.responsData = JSON.stringify(res);

          this.lstApplicationFileMaster = JSON.parse(this.responsData);
          this.visitDateSortOrder = 'sort';

          this.refNo = localStorage.getItem(LOCALSTORAGE_KEY.REFERENCE_NO);
          let fileByRefNo: ApplicationFileMaster;

          if (this.refNo != null && this.lstApplicationFileMaster.length > 0) {
            let fileByRefNo = this.lstApplicationFileMaster.find(file => file.refNo === this.refNo);
            if (fileByRefNo) {
              fileByRefNo.isChecked = true;
            }

            localStorage.removeItem(LOCALSTORAGE_KEY.REFERENCE_NO);
          }

          this.onCheckFileMaster(fileByRefNo);
        }
      }
    );
  }

  changePickupMarkerLocation($event: any) {
    // close current info window on map click or marker add/remove
    if (this.currentInfoWindow && ($event || this.markerRemovedOrAdded)) {
      this.currentInfoWindow.close();
      this.currentInfoWindow = null;

      this.markerRemovedOrAdded = false;
    }
    // info window closes itself or closed by click on another marker
    else if (this.previousInfoWindow) {
      this.previousInfoWindow.close();
      this.previousInfoWindow = null;
    }
  }

  previousInfoWindow: AgmInfoWindow;
  currentInfoWindow: AgmInfoWindow;

  markerClicked(fileMasterID: number, agmMarker: AgmMarker) {
    this.previousInfoWindow = this.currentInfoWindow;

    if (this.previousInfoWindow) {
      this.previousInfoWindow.close();
      this.previousInfoWindow = null;
    }

    if (agmMarker.infoWindow.length) {
      this.currentInfoWindow = agmMarker.infoWindow.first as AgmInfoWindow;
    }

    this.getAttachments(fileMasterID).subscribe(() => this.nav.select(1));
  }

  mediaMarkerClicked(fileMasterID: number, agmMarker: AgmMarker) {
    this.previousInfoWindow = this.currentInfoWindow;

    if (this.previousInfoWindow) {
      this.previousInfoWindow.close();
      this.previousInfoWindow = null;
    }

    if (agmMarker.infoWindow.length) {
      this.currentInfoWindow = agmMarker.infoWindow.first as AgmInfoWindow;
    }
  }

  getAttachments(fileMasterID: number) {
    this.lstAttachmentAllType = [];

    if (fileMasterID) {
      const response = this.attachmentsService.getAttachmentListByFileID(fileMasterID).pipe(
        tap((res: ResponseMessage) => {
          if (res) {
            this.lstAttachmentAllType = res.responseObj;
            this.lstAttachmentAllType.forEach(attchment => attchment.referenceType = InspectionFileType[attchment.referenceType] as unknown as InspectionFileType);
          }
        })
      );

      return response;
    } else return EMPTY;
  }

  attachmentTabLink(id: number) {
    if (id) {
      this.lstAttachmentSingleType = this.lstAttachmentAllType.filter(x => x.attachementTypeID == id);
    }
  }

  searchToggler() {
    this.searchToggle = !this.searchToggle;
  }

  visitDateSortOrder: string = 'sort';

  sortOnVisitDate() {
    if (['sort', 'sort-down'].includes(this.visitDateSortOrder)) {
      this.visitDateSortOrder = 'sort-up';
    } else {
      this.visitDateSortOrder = 'sort-down';
    }

    this.lstApplicationFileMaster.sort((a, b) => {
      if (this.visitDateSortOrder === 'sort-up') {
        return new Date(a.visitDate).getTime() - new Date(b.visitDate).getTime();
      } else {
        return new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime();
      }
    });
  }
}
