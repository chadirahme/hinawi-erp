import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {ApiResponse} from "../domains/api.response";
import {User} from "../domains/user.model";


@Injectable()
export class ApiAuth {

    constructor(private http: HttpClient) { }
    baseUrl: string ='http://localhost:8091/api/';
    baseUrl1: string = 'http://hinawi2.dyndns.org:8091/api/'

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
}
