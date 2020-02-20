import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiAuth} from "../../@core/services/api.auth";
import {MobileAttendance} from "../../@core/domains/webdashboard.model";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'my-attendance',
  templateUrl: './my-attendance.component.html',
  styleUrls: ['./my-attendance.component.scss']
})
export class MyAttendanceComponent implements OnInit {

  customersList: any[];
  selectedCustomer: any;
  type: string;
  mobileAttendance: MobileAttendance;
  oldMobileAttendance: MobileAttendance;
  selectedStatus: string;
  note: string;
  hadCheckOut: boolean;
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  public lat;
  public lng;
  lastActivity: string;
  attendanceReasonList: any[];
  selectedReason: any;
  selectedReasonDesc: any;
  demo: boolean =false;
  customerInfo: any;

  constructor(private authService: ApiAuth, private datePipe: DatePipe) { }

  ngOnInit() {
    let url = window.location.href;
    this.demo= url.indexOf("demo")>0;
    this.demo=true;
    this.selectedReason=0;
    this.type = "Customer";
    this.checkIfUserCheckedIn();
    this.loadAttendanceReasonList();
    this.loadInitData();
    if(this.demo)
    this.getLocation();
  }

  loadAttendanceReasonList(): void {
    try {
      this.authService.getHRListValues(159).subscribe(data => {
        this.attendanceReasonList = data.result;
        //this.selectedStreet=0;
      });
    }
    catch (e) {
      console.log(e);
    }
  }

  changeReason($event){
    this.selectedReasonDesc = $event.target.options[$event.target.options.selectedIndex].text;
    console.log(this.selectedReasonDesc);
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

  //customerName":"987 gulf","customerType":"Customer","checkinNote":"Morning check in","checkoutNote":"Morning check in","checkinTime":"2020-02-16 16:53:43"

     checkIfUserCheckedIn():void{
    try {
      this.authService.findLastUserVisit(+localStorage.getItem('userid')).subscribe(data => {
        this.oldMobileAttendance=data.result;
        if(this.oldMobileAttendance){

          if(this.oldMobileAttendance.checkoutTime!=null) {
            this.lastActivity = "Check Out at :" +this.datePipe.transform(this.oldMobileAttendance.checkoutTime, 'dd/MM/yyyy h:mm:ss a');
            this.hadCheckOut=true;
          }
          else {

            this.lastActivity = "Check In at :" + this.datePipe.transform(this.oldMobileAttendance.checkinTime, 'dd/MM/yyyy h:mm:ss a');
          }
          this.lastActivity += " | " + this.oldMobileAttendance.customerType+ " : " + this.oldMobileAttendance.customerName;


        }
      });

    }
    catch (e) {
      console.log(e);
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
      this.authService.getProspectiveSortedList().subscribe(data => {
        this.customersList=data.result;
        this.selectedCustomer=0;
      });

    }
    catch (e) {
      console.log(e);
    }
  }

  callType(value){
    //console.log(value);
    this.customerInfo="";
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




  public setSelectedStatus($event): void {
    console.log($event.target.options.selectedIndex);
    //this.selectedReasonDesc = $event.target.options[$event.target.options.selectedIndex].text;
    var info = this.customersList[$event.target.options.selectedIndex - 1]; //-1 because I add select as first item
    this.customerInfo = "Contact person: ";
    console.log(info);
    if(this.type === 'Prospective'){
      this.customerInfo += info.contact + " | " ;
      this.customerInfo+=`<a href="https://web.whatsapp.com/send?phone=${info.telephone1}&text=Hi, I contacted you Through HinawiOnline."
      data-text="Take a look at this awesome website:" class="wa_btn wa_btn_s"
      target="_blank"
        >${info.telephone1}</a>`;
    }
    if(this.type === 'Vendor' || this.type === 'Customer'){
      this.customerInfo += info.contact + " | ";
      this.customerInfo+=`<a href="https://web.whatsapp.com/send?phone=${info.phone}&text=Hi, I contacted you Through HinawiOnline."
      data-text="Take a look at this awesome website:" class="wa_btn wa_btn_s"
      target="_blank"
        >${info.phone}</a>`;
    }

    //this.selectedStatus = $event.target.options.selectedIndex;
  }

  submit(){
    console.log(this.selectedCustomer);

    //if(this.hadCheckOut) {
      if (!this.selectedCustomer || this.selectedCustomer == "0") {
        alert('Please select your Visitor !!');
        return;
      }
      if (!this.selectedReason || this.selectedReason == "0") {
        alert('Please select Attendance Reason !!');
        return;
      }
    //}

    if(!this.note){
      alert('Please enter your Reason or Result !!');
      return;
    }

    this.mobileAttendance=new MobileAttendance();
    this.mobileAttendance.userId=+localStorage.getItem('userid');
    this.mobileAttendance.userName=localStorage.getItem('username');//"chadi";
    this.mobileAttendance.customerType=this.type;
    this.mobileAttendance.customerName= this.selectedCustomer ;//"Customer1";
    this.mobileAttendance.checkinNote=this.note;
    this.mobileAttendance.checkinLatitude=this.lat;
    this.mobileAttendance.checkinLongitude=this.lng;
    this.mobileAttendance.reasonId=this.selectedReason;
    this.mobileAttendance.reasonDesc=this.selectedReasonDesc;

    //this.mobileAttendance.checkinTime = Date.now();
    this.mobileAttendance.localCheckinTime = Date.now();

    this.authService.addMobileAttendance(this.mobileAttendance).subscribe(data => {
      console.log(data);
      alert(data.message);
      this.mobileAttendance=new MobileAttendance();
      this.note="";
      this.selectedCustomer=0;
      //this.dialogRef.close(data.message);
    });
  }

  submitCheckOut(){
    if(!this.note){
      alert('Please enter your Reason or Result !!');
      return;
    }
    this.mobileAttendance=new MobileAttendance();
    this.mobileAttendance.userId=+localStorage.getItem('userid');
    this.mobileAttendance.userName=localStorage.getItem('username');//"chadi";
    this.mobileAttendance.customerType=this.type;
    this.mobileAttendance.customerName= this.selectedCustomer ;
    this.mobileAttendance.checkoutNote=this.note;
    this.mobileAttendance.checkoutLatitude=this.lat;
    this.mobileAttendance.checkoutLongitude=this.lng;
    //this.mobileAttendance.checkinTime = Date.now();
    this.mobileAttendance.localCheckinTime = Date.now();

    this.authService.addMobileAttendance(this.mobileAttendance).subscribe(data => {
      console.log(data);
      alert(data.message);
      this.mobileAttendance=new MobileAttendance();
      this.note="";
      this.selectedCustomer=0;
      //this.dialogRef.close(data.message);
    });
  }


}
