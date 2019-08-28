import {Component, OnInit, forwardRef, Input, HostBinding, Output, EventEmitter} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, SelectControlValueAccessor} from "@angular/forms";
import {ApiAuth} from "../../../@core/services/api.auth";
import {Subscription} from "rxjs";

@Component({
  selector: 'country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountryListComponent),
      multi: true
    }
  ]

})
export class CountryListComponent implements ControlValueAccessor, OnInit {

  //https://github.com/mainawycliffe/angular-building-custom-form-control-demo/blob/master/src/app/email-address-input/email-address-input.component.ts
  //https://stackblitz.com/edit/angular-szsw3k

  hrFieldsList: any[];
  selectedField: any;
  //value :any;
  _inputValue: any;
  hasValue: any;
  selectValue:any;

  @Input()
  disabled = false;

  @Output() clickEvent = new EventEmitter(); // add this

  private valueChanges: Subscription;

  constructor(private apiAuth: ApiAuth) {}

  ngOnInit() {
    this.loadMainHRListFieldsData();
  }

  loadMainHRListFieldsData(): void {
    try {
      this.apiAuth.getHRListValues(2).subscribe(data => {
        this.hrFieldsList = data.result;
        //this.selectValue=0;
      });
    }
    catch (e) {
      console.log(e);
    }
  }

  @HostBinding('attr.id')
  externalId = '';

  @Input()
  set id(value: string) {
    console.log(value);
    this._ID = value;
    this.externalId = null;
  }

  get id() {
    return this._ID;
  }

  private _ID = '';

  @Input('value22') _value = false;
  onChange: any = () => {console.log('change')};
  onTouched: any = () => {console.log('touched')};

  registerOnChange(fn: (val: any) => void)
  {
    //this.valueChanges = this.selectedField.valueChanges.subscribe(fn);
  }

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  // registerOnChange(fn) {
  //   this.onChange = fn;
  // }

  writeValue(value) {
    //this.selectValue = value;
    console.log('writeValue = ' + value);
    if (value) {
      this.value = value;
      this.selectValue = value;
    }
    else{
      this.selectValue=0;
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  // switch() {
  //   this.value = !this.value;
  // }

  callType(value){
    console.log(this.selectValue);
    this.clickEvent.emit(this.selectValue); // emit the event on click event

  }
  //
  //
  // private _selectValue: any = '';
  // private _onTouchedCallback: () => {};
  // private _onChangeCallback: (_:any) => {};
  //
  // get selectValue(): any {
  //   //console.log("get ");
  //   return this._selectValue;
  // }
  // set selectValue(value: any) {
  //   console.log(value);
  //   if (value !== this._selectValue) {
  //     this._inputValue = value;
  //     //this._onChangeCallback(value);
  //   }
  //
  //   this.hasValue = (value != null && value.length > 0)
  //
  //   //this._onTouchedCallback();
  //
  // }
  //
  //
  //
  // //From ControlValueAccessor interface
  // writeValue(value: any) {
  //   this._selectValue = value;
  // }
  //
  // //From ControlValueAccessor interface
  // registerOnChange(fn: any) {
  //   this._onChangeCallback = fn;
  // }
  //
  // //From ControlValueAccessor interface
  // registerOnTouched(fn: any) {
  //   this._onTouchedCallback = fn;
  // }

}
