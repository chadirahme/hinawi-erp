import {Component, OnInit, Input} from '@angular/core';
import {ApiAuth} from "../../../@core/services/api.auth";
import {NbDialogRef} from "@nebular/theme";
import {ProspectiveModel, ProspectiveCotact, ProspectiveCotactId} from "../../../@core/domains/user.model";
import {LocalDataSource} from "ng2-smart-table";

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
  prospectiveCotact: ProspectiveCotact;
  prospectiveCotactId: ProspectiveCotactId;
  contacts: ProspectiveCotact[];

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

  constructor(protected dialogRef: NbDialogRef<EditProspectiveComponent>,
              private apiAuth: ApiAuth) {
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
      this.prospective.telephone2="";

      this.contacts= [];
      this.prospective.lstProspectiveCotact=this.contacts;

    }

    if(this.prospective.recNo>0){
      this.loadContactsData(this.prospective.recNo);
    }
    if(this.prospective.countryRefKey>0){
      this.loadCityListFieldsData();
    }
    if(this.prospective.cityRefKey>0){
      this.loadStreetListFieldsData();
    }
    this.loadHowYouKnowtListFieldsData();


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


  changeCity(value){
    this.loadStreetListFieldsData();
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
    console.log('save');
    this.apiAuth.saveProspectives(this.prospective).subscribe(data => {
      console.log(data);
      this.dialogRef.close('done');
    });


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

}
