

import {Observable} from "rxjs";
import {RouterStateSnapshot, ActivatedRouteSnapshot, Router, CanActivate} from "@angular/router";
import {Injectable} from "@angular/core";
import {ApiAuth} from "./@core/services/api.auth";
@Injectable()
export class RoleGuard implements CanActivate {


  constructor(private myauthService: ApiAuth, private _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const expectedRole = route.data.roles;
    console.log("expectedRole >>" + expectedRole);


    const user = this.myauthService.getUserRole();
    console.log("user role>>" + user);

    if (user == expectedRole) {
      console.log("user role>>" + user);
      return true;
    }

    // navigate to not found page
    this._router.navigate(['/404']);
    return false;
  }

}
