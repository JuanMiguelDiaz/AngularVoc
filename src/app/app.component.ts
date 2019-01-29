import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularVoc';

  constructor(private router: Router) { }

  goToLandingpage(subject){
    this.router.navigate(['/']);
  }

}
