import { NgModule } from '@angular/core';
import {ThemeModule} from "../../@theme/theme.module";
import {HelpComponent} from "./help.component";
import {HelpRoutingModule} from "./help-routing.module";
import {YoutubeListComponent} from "./youtube-list/youtube-list.component";
import {DragDropModule} from "@angular/cdk/drag-drop";

const COMPONENTS = [
  HelpComponent,
  YoutubeListComponent
];

const MODULES = [
  ThemeModule,
  HelpRoutingModule,
  DragDropModule
];

@NgModule({
  imports: [
    ...MODULES,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  providers: [
    //...SERVICES,
  ],
})
export class HelpModule { }
