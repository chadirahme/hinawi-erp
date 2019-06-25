import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {ApiResponse} from "../domains/api.response";
import {User} from "../domains/user.model";
import {WebDashboard, MobileAttendance, ChequeModel} from "../domains/webdashboard.model";


@Injectable()
export class ApiAuth {

    baseUrl: string ='http://localhost:8091/api/';
   //baseUrl: string = 'http://hinawi2.dyndns.org:8091/api/';
  //baseUrl: string;

    constructor(private http: HttpClient) {
      //this.baseUrl = baseUrl;
    }
     isAuthenticated(): boolean {
    return localStorage.getItem('token') != null && !this.isTokenExpired();
  }

  isTokenExpired(): boolean {
    return false;
  }
     getIsAuthenticated(user: any):Observable<any>{
       return this.http.post<ApiResponse>(this.baseUrl+'loginUser', user);
      //return this.http.post<ApiResponse>(this.baseUrl+'rest-employees/getLoginUser',user);
  }

    loginUser(user: User): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.baseUrl+'loginUser', user);
    }

    getCustomersList(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.baseUrl+'customersList');
    }

    getProspectiveList(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.baseUrl+'prospectiveList');
    }

  getVendorsList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+'vendorsList');
  }

  getCustomersBalance(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+'customersBalance');
  }

  getVendorsBalance(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+'vendorsBalance');
  }

  getmessagesList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+'messagesList');
  }

  getstudentsList(): Observable<ApiResponse>{
      return this.http.get<ApiResponse>(this.baseUrl+'studentsList');
  }


  getUserDashboards(userId): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.baseUrl+'getUserDashboards?userId='+userId);
  }

  addWebDashboard(webDashboard: WebDashboard): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl+'addWebDashBoard',webDashboard);
  }

  deleteWebDashBoard(webDashboard: WebDashboard): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl+'deleteWebDashBoard',webDashboard);
  }

   getMobileAttendanceList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+'mobileAttendance');
  }

  addMobileAttendance(mobileAttendance: MobileAttendance): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl+'addMobileAttendance',mobileAttendance);
  }

  getCUCList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+'accounting/cuc?name=s');
  }

  getPOList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+'accounting/po');
  }

  approvePO(chequeModel: ChequeModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl+'accounting/approvepo',chequeModel);
  }

  getPettyCashList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl+'accounting/pettycash');
  }

  getPettyCashChart(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl+'accounting/pettycashchart');
  }
}
