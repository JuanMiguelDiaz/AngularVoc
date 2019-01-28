import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser';

import { SampleServiceService } from '../sample-service.service';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  
  public subjects = [];
  public newSubject : string = "";
  public disableNewSubject = true;
  public downloadJsonHref = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(JSON.stringify(this._sampleServiceService.globalItems)));

  constructor(private _sampleServiceService: SampleServiceService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  	this.subjects = this._sampleServiceService.getSubjects();
  }

  goToQuiz(subject){
	  this.router.navigate(['/quiz', subject]);
  }

  goToAddItem(subject){
    this.router.navigate(['/addItem', subject]);
  }

  goToItems(subject) {
    this.router.navigate(['/items', subject]);
  }

}
