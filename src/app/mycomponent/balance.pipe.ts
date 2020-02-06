import { Pipe, PipeTransform } from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
 */
@Pipe({name: 'balance'})
export class balance implements PipeTransform {
  transform(value: number, exponent?: number): SafeHtml {
    let val=this.decimalPipe.transform(value);
    let termsApply ='<span style="color:#b30000;">'+val+'</span>';
    if(value<0)
    return this.decimalPipe.transform(value);
    else
      return this._sanitizer.bypassSecurityTrustHtml(termsApply);
    //return Math.pow(value, isNaN(exponent) ? 1 : exponent);
  }

  constructor(private decimalPipe: DecimalPipe,private _sanitizer: DomSanitizer) { }
}
