import {Component, OnInit, ViewChild} from '@angular/core';
import {NbLoginComponent} from "@nebular/auth";
import {ApiAuth} from "../@core/services/api.auth";
import {Router} from "@angular/router";
import {UserModel} from "../@core/domains/user.model";
import {BehaviorSubject} from "rxjs";
import {FormGroup, Validators, FormBuilder, NgForm} from "@angular/forms";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  showMessages: any;
  strategy: string;
  errors: string[];
  messages: string[];
  user: UserModel;
  submitted: boolean;
  //form: FormGroup;

  @ViewChild(NgForm) form;

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private authService: ApiAuth,private router: Router) {
    // this.form = this.formBuilder.group({
    //   email: [null, [Validators.required, Validators.email]],
    //   password: [null, Validators.required],
    // });
  }

  ngOnInit() {
    this.user=new UserModel();
    this.user.email="";//"eng.chadi@gmail.com";
    this.user.password="";
    this.user.username="";
    this.errors= [];
    this.messages= [];
    // this.ngForm  =  this.formBuilder.group({
    //   email: ['', Validators.required],
    //   password: ['', Validators.required]
    // });


  }

  login()
  {
    this.errors= [];
    if(this.form.invalid){
      this.errors.push("Email and Password required!!");
      return;
    }

    localStorage.setItem('role','');
    localStorage.setItem('token','');
    this.errors= [];
    this.messages.push("conecting.....");
    console.log(this.user);
    try
    {
      this.user.username=this.user.email;
      this.authService.getIsAuthenticated(this.user).subscribe(data => {
        console.log(data);
        this.messages= [];
        this.errors= [];
        if(data==null) {//.message=='Invalid User'
          //console.log(data.message);
          alert('Connection problem at this time !!');
          //this.errors.push("Invalid User");
        }else if(data.success!=null && data.success===false){ //(data.success==false){
          //alert(data.message);
          this.errors.push(data.message);
        }
        else if(data.success===true) {
          let tokenStr= 'Bearer '+data.result.token;
          localStorage.setItem('token', tokenStr);
          //localStorage.setItem('username',this.user.username);
          this.loggedIn.next(true);
         // localStorage.setItem('token',data.result.userId);
          localStorage.setItem('userid',data.result.userId);
          localStorage.setItem('username',data.result.userName);
          localStorage.setItem('role',data.result.role);
          this.router.navigate(['/dashboard']);
        }
        else {
          //alert('Connection problem at this time !');
          this.errors.push("Invalid User");
        }
      },error => this.handleEror(error)
      )
    }
    catch (e) {
      //console.log(e);
      alert('Connection problem at this time !!');
    }

  }

  handleEror(error){
    this.messages= [];
    this.errors.push('Connection problem at this time !');
    //alert(error.message); // error path;
  }

}
