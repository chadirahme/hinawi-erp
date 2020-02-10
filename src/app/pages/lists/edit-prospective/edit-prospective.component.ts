import {Component, OnInit, Input} from '@angular/core';
import {ApiAuth} from "../../../@core/services/api.auth";
import {NbDialogRef} from "@nebular/theme";
import {ProspectiveModel, ProspectiveCotact, ProspectiveCotactId} from "../../../@core/domains/user.model";
import {LocalDataSource} from "ng2-smart-table";
import {HttpErrorResponse} from "@angular/common/http";
import {WsTopic} from "../../../@core/services/ws.topic";

@Component({
  selector: 'edit-prospective',
  templateUrl: './edit-prospective.component.html',
  styleUrls: ['./edit-prospective.component.scss']
})
export class EditProspectiveComponent implements OnInit {

  @Input() title: string;
  @Input() prospective: any;
  listProfessionsValues: any[];
  selectedProfession: any;
  dateValue: Date;
  value : any;

  cityFieldsList: any[];
  selectedCity: any;
  streetFieldsList: any[];
  selectedStreet: any;
  howYouKnowFieldsList: any[];
  companyTypeList: any[];
  companySizeList: any[];
  currentSoftwareList: any[];
  salesRepList: any[];
  statusHistoryList: any[];
  subProspectiveList: any[];
  prospectiveCotact: ProspectiveCotact;
  prospectiveCotactId: ProspectiveCotactId;
  contacts: ProspectiveCotact[];
  hasSub: boolean = false;

  //contacts: any[];
  contactSource: LocalDataSource = new LocalDataSource();
  settings = {
    //mode: 'external',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      // recNo: {
      //   title: 'ID',
      //   type: 'number',
      // },
      name: {
        title: 'Name',
        type: 'string',
      },
      position: {
        title: 'Position',
        type: 'string',
      },
      telephone1: {
        title: 'Phone',
        type: 'string',
      },
      mobile1: {
        title: 'Mobile',
        type: 'string',
      },
      fax: {
        title: 'Fax',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      // note: {
      //   title: 'Note',
      //   type: 'string',
      // },
    },
    actions: {
      position: 'right',
      add: true,
      edit:true,
      editable:true,
      columnTitle: '',
    },
  };

  statusHistorySource: LocalDataSource = new LocalDataSource();
  statusSettings = {
    columns: {
      // recNo: {
      //   title: 'ID',
      //   type: 'number',
      // },
      actionDate: {
        title: 'Date',
        type: 'string',
      },
      statusDescription: {
        title: 'Status Description',
        type: 'string',
      },
      createdfrom: {
        title: 'Created From',
        type: 'string',
      },
    },
    actions: {
      position: 'right',
      add: false,
      edit:false,
      editable:false,
      delete:false,
      columnTitle: '',
    },
  };

  constructor(protected dialogRef: NbDialogRef<EditProspectiveComponent>,
              private apiAuth: ApiAuth,private wsTopic: WsTopic) {
  }


  ngOnInit() {
    //console.log(this.title);
    //console.log(this.prospective.countryRefKey);
    if(this.prospective==null){
      this.prospective=new ProspectiveModel();
      this.prospective.recNo=0;
      this.prospective.countryRefKey=0;
      this.prospective.cityRefKey=0;
      this.prospective.streeRefKey=0;
      this.prospective.howKnowRefKey=0;
      this.prospective.parentRefKey=0;
      this.prospective.sublevel=0;
      this.prospective.telephone1="";
      this.prospective.telephone2="";
      this.prospective.arName="";
      this.prospective.companyName="";
      this.prospective.poBox=""; //Address1
      this.prospective.zipCode=""; //Address2
      this.prospective.interestLevel="";

      this.contacts= [];
      this.prospective.lstProspectiveCotact=this.contacts;

    }

    if(this.prospective.recNo>0){
      this.loadContactsData(this.prospective.recNo);
      this.hasSub=this.prospective.parentRefKey>0;
      this.loadProspectiveStatusHistory();
    }
    if(this.prospective.countryRefKey>0){
      this.loadCityListFieldsData();
    }
    if(this.prospective.cityRefKey>0){
      this.loadStreetListFieldsData();
    }
    this.loadHowYouKnowtListFieldsData();
    this.loadCompnayTypeListFieldsData();
    this.loadCompnaySizeListFieldsData();
    this.loadCurrentSoftwareListFieldsData();
    this.loadSalesRepData();
    this.loadSubProspectiveData();


    //this.value = this.prospective.countryRefKey;
  }

  loadContactsData(recNo): void {
    try
    {
      // console.log("grade>> "+ this.apiParam.grade);
      this.apiAuth.getProspectiveContactsList(recNo).subscribe(data => {
        this.contacts=data.result;
        this.contactSource.load(data.result);
        //this.dataSource = new MatTableDataSource(data);
        //this.dataSource.paginator = this.paginator;
        // this.fileUploads =data;
        // this.student=data;
        //this.dataSource = new MatTableDataSource(data);
        // this.loadStudentData();
      });

    }
    catch (e) {
      console.log(e);
    }
  }

  loadCityListFieldsData(): void {
    try {
      this.apiAuth.getHRSubListValues(3,this.prospective.countryRefKey).subscribe(data => {
        this.cityFieldsList = data.result;
        //this.selectedCity=0;
      });
    }
    catch (e) {
      console.log(e);
    }
  }

  loadStreetListFieldsData(): void {
    try {
      this.apiAuth.getHRSubListValues(51,this.prospective.cityRefKey).subscribe(data => {
        this.streetFieldsList = data.result;
        //this.selectedStreet=0;
      });
    }
    catch (e) {
      console.log(e);
    }
  }

  loadHowYouKnowtListFieldsData(): void {
    try {
      this.apiAuth.getHRListValues(140).subscribe(data => {
        this.howYouKnowFieldsList = data.result;
        //this.selectedStreet=0;
      });
    }
    catch (e) {
      console.log(e);
    }
  }

  loadCompnayTypeListFieldsData(): void {
    try {
      this.apiAuth.getHRListValues(23).subscribe(data => {
        this.companyTypeList = data.result;
        //this.selectedStreet=0;
      });
    }
    catch (e) {
      console.log(e);
    }
  }
  loadCompnaySizeListFieldsData(): void {
    try {
      this.apiAuth.getHRListValues(145).subscribe(data => {
        this.companySizeList = data.result;
        //this.selectedStreet=0;
      });
    }
    catch (e) {
      console.log(e);
    }
  }

  loadCurrentSoftwareListFieldsData(): void {
  try {
    this.apiAuth.getHRListValues(146).subscribe(data => {
      this.currentSoftwareList = data.result;
      //this.selectedStreet=0;
    });
  }
  catch (e) {
    console.log(e);
  }
}

  loadSalesRepData(): void {
    try {
      this.apiAuth.getSalesRepList().subscribe(data => {
        this.salesRepList = data.result;
        //this.selectedStreet=0;
      });
    }
    catch (e) {
      console.log(e);
    }
  }


  loadProspectiveStatusHistory(): void {
    try {
      this.apiAuth.getProspectiveStatusHistory(this.prospective.recNo).subscribe(data => {
        //this.statusHistoryList = data.result;
        this.statusHistorySource.load(data.result);
      });
    }
    catch (e) {
      console.log(e);
    }
  }

  changeCity(value){
    this.loadStreetListFieldsData();
  }

  closeDialog(){
    this.dialogRef.close();
  }
  submit(){
    // this.mobileAttendance=new MobileAttendance();
    // this.mobileAttendance.userId=+localStorage.getItem('userid');
    // this.mobileAttendance.userName=localStorage.getItem('username');//"chadi";
    // this.mobileAttendance.customerType=this.type;
    // this.mobileAttendance.customerName= this.selectedStatus ;//"Customer1";
    // this.mobileAttendance.checkinNote=this.note;
    // this.mobileAttendance.checkinLatitude=this.lat;
    // this.mobileAttendance.checkinLongitude=this.lng;

   // this.value = 1101;
    //console.log(this.value);
    if(!this.prospective.name){
      alert('English Name must be filled !!');
      return;
    }
    let that=this;
    console.log('save');
    this.apiAuth.saveProspectives(this.prospective).subscribe(data => {
      console.log(data);
      that.wsTopic.sendMessage("Prospective "+this.prospective.name + " data changed..");

      this.dialogRef.close('Prospective data saved..');
    },(err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occured.");
        alert("Server-side error occured.");
      }
    });
    //);


  }

  displayCounter(count) {
    this.prospective.countryRefKey = count;
    console.log("parent = " + count);
    this.loadCityListFieldsData();
  }

  onCreateConfirm(event):void {
    if (window.confirm('Are you sure you want to create?')) {
      console.log(event.newData);
      event.confirm.resolve(event.newData);
      this.prospectiveCotactId=new  ProspectiveCotactId();

      this.prospectiveCotact=new ProspectiveCotact();
      this.prospectiveCotactId.recNo=this.prospective.recNo;
      this.prospectiveCotactId.lineNo=0;

      this.prospectiveCotact.prospectiveCotactId=this.prospectiveCotactId;
      this.prospectiveCotact.name=event.newData.name;
      this.prospectiveCotact.position=event.newData.position;
      this.prospectiveCotact.telephone1=event.newData.telephone1;
      this.prospectiveCotact.mobile1=event.newData.mobile1;
      this.prospectiveCotact.fax=event.newData.fax;
      this.prospectiveCotact.email=event.newData.email;


      if(this.prospective.recNo>0) {
        this.apiAuth.saveProspectiveContact(this.prospectiveCotact).subscribe(data => {
          console.log(data);
          if (data.status == 204)
            alert('Error !!');
          else
            alert('save');
        });
      }
      else {
        //put in array for now then save all together
        this.contacts.push(this.prospectiveCotact);
      }

    }else {
      event.confirm.reject();
    }
  }
  onSaveConfirm(event):void {
    console.log(event.newData);
    event.confirm.resolve(event.newData);
    this.apiAuth.saveProspectiveContact(event.newData).subscribe(data => {
      console.log(data);
      if(data.status == 204)
        alert('Error !!');
      else
        alert('save');
    });

  }

  onDeleteConfirm(event): void {
    console.log(event.data);
  }

  checkValue(event: any){
    this.prospective.parentRefKey=0;
    console.log(event);
  }

  loadSubProspectiveData(): void {
    try
    {
      this.apiAuth.getProspectiveList().subscribe(data => {
        this.subProspectiveList=data.result;
      });
    }
    catch (e) {
      console.log(e);
    }
  }
}
