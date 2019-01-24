import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {YoutubeListComponent} from "./youtube-list/youtube-list.component";
import {HelpComponent} from "./help.component";

const routes: Routes = [{
  path: '',
  component: HelpComponent,
  children: [
    {
      path: 'youtube-list',
      component: YoutubeListComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpRoutingModule {
}
