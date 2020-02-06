import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {ApiAuth} from "../../../@core/services/api.auth";
import {MobileAttendance} from "../../../@core/domains/webdashboard.model";
import {NbDialogRef} from "@nebular/theme";
import {} from 'googlemaps';
/// <reference types="@types/googlemaps" />

@Component({
  selector: 'add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.scss']
})
export class AddAttendanceComponent implements OnInit {

  @Input() title: string;
  customersList: any[];
  selectedCustomer: any;
  type: string;
  mobileAttendance: MobileAttendance;

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  public lat;
  public lng;

  constructor(private authService: ApiAuth,protected dialogRef: NbDialogRef<AddAttendanceComponent>) { }

  ngOnInit() {
    this.type = "Customer";
    this.loadInitData();
    this.getLocation();



  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
          if (position) {
            console.log("Latitude: " + position.coords.latitude +
              "Longitude: " + position.coords.longitude);
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            console.log(this.lat);
            console.log(this.lat);

            var mapProp = {
              center: new google.maps.LatLng(this.lat, this.lng),
              zoom: 15,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

          }
        },
        (error: PositionError) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  loadInitData(): void {
    try {
      this.authService.getCustomersList().subscribe(data => {
        this.customersList=data.result;
        this.selectedCustomer=0;
      });

    }
    catch (e) {
      console.log(e);
    }
  }

  loadVendorData(): void {
    try {
      this.authService.getVendorsList().subscribe(data => {
        this.customersList=data.result;
        this.selectedCustomer=0;
      });

    }
    catch (e) {
      console.log(e);
    }
  }
  loadProspectiveData(): void {
    try {
      this.authService.getProspectiveList().subscribe(data => {
        this.customersList=data.result;
        this.selectedCustomer=0;
      });

    }
    catch (e) {
      console.log(e);
    }
  }

  callType(value){
    console.log(value);
    this.type=value;
    //this.order.type=value; Customer Prospective Vendor
    if(value === 'Customer'){
      this.loadInitData();
    }else if(value === 'Vendor'){
      this.loadVendorData();
    }else if(value === 'Prospective'){
      this.loadProspectiveData();
    }

  }

  selectedStatus: string;
  note: string;
  public setSelectedStatus(value: string): void {

    this.selectedStatus = value;

    // if (this.customersList && value) {
    //   let status = this.customersList.find(s => s.name == value);
    //   if (status)
    //     this.selectedStatus = status.name;
    // }
    // else
    //  this.selectedStatus = '';
  }

  submit(){
    this.mobileAttendance=new MobileAttendance();
    this.mobileAttendance.userId=+localStorage.getItem('userid');
    this.mobileAttendance.userName=localStorage.getItem('username');//"chadi";
    this.mobileAttendance.customerType=this.type;
    this.mobileAttendance.customerName= this.selectedStatus ;//"Customer1";
    this.mobileAttendance.checkinNote=this.note;
    this.mobileAttendance.checkinLatitude=this.lat;
    this.mobileAttendance.checkinLongitude=this.lng;

    this.authService.addMobileAttendance(this.mobileAttendance).subscribe(data => {
      console.log(data);
      this.dialogRef.close(data.message);
    });
  }

}
