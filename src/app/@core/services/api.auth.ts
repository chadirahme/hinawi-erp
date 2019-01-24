import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {ApiResponse} from "../domains/api.response";
import {User} from "../domains/user.model";
import {WebDashboard} from "../domains/webdashboard.model";


@Injectable()
export class ApiAuth {

    constructor(private http: HttpClient) {
      //this.baseUrl = baseUrl;
    }
     // baseUrl: string ='http://localhost:8091/api/';
      baseUrl: string = 'http://hinawi2.dyndns.org:8091/api/';
    //baseUrl: string;

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
}
