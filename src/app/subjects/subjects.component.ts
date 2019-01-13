import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private _sampleServiceService: SampleServiceService, private router: Router) { }

  ngOnInit() {
  	this.subjects = this._sampleServiceService.getSubjects();
  }

  goToQuiz(subject){
	  this.router.navigate(['/quiz', subject]);
  }

  goToAddItem(subject){
    this.router.navigate(['/addItem', subject]);
  }

}
