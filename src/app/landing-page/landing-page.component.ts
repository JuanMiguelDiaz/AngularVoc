import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {SampleServiceService} from '../sample-service.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  currentYear: Number;

  constructor(private route: ActivatedRoute, private router: Router, private _sampleServiceService: SampleServiceService) {
  }

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
  }

  ToOverview() {
    this.router.navigate(['/subjects']);
  }

}
