import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created with ♥ by <b><a href="http://hinawi.com" target="_blank">Chadi</a></b> 2019</span>
    <div class="socials">
      <!--<a href="#" target="_blank" class="ion ion-social-github"></a>-->
      <a href="https://www.facebook.com/hinawisoftware/" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://twitter.com/hinawisoftware" target="_blank" class="ion ion-social-twitter"></a>
      <a href="https://www.linkedin.com/in/hatemsaeedhinawi/" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
