import { Component, OnInit } from '@angular/core';
import {NbLoginComponent} from "@nebular/auth";
import {ApiAuth} from "../@core/services/api.auth";
import {Router} from "@angular/router";
import {UserModel} from "../@core/domains/user.model";

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

  constructor(private authService: ApiAuth,private router: Router) {
  }

  ngOnInit() {
    this.user=new UserModel();
    this.user.email="";//"eng.chadi@gmail.com";
    this.user.password="";
    this.user.username="";
  }

  login()
  {
    console.log(this.user);
    try
    {
      this.user.username=this.user.email;
      this.authService.getIsAuthenticated(this.user).subscribe(data => {
        console.log(data);
        if(data==null) {//.message=='Invalid User'
          //console.log(data.message);
          alert('Connection problem at this time !!');
          //this.errors.push("Invalid User");
        }else if(data.success!=null && data.success===false){ //(data.success==false){
          alert(data.message);
        }
        else if(data.success===true) {
          let tokenStr= 'Bearer '+data.result.token;
          localStorage.setItem('token', tokenStr);
          //localStorage.setItem('username',this.user.username);

         // localStorage.setItem('token',data.result.userId);
          localStorage.setItem('userid',data.result.userId);
          localStorage.setItem('username',data.result.userName);
          this.router.navigate(['/dashboard']);
        }
        else {
          alert('Connection problem at this time !');
        }
      }),error => alert('Connection problem at this time'); // error path;
    }
    catch (e) {
      //console.log(e);
      alert('Connection problem at this time !!');
    }

  }

}
