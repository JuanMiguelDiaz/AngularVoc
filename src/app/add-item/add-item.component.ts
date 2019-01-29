import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SampleServiceService } from '../sample-service.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  public chosenSubject : string;
  public question : string;
  public answer : string;
  public swapped : boolean = false;
  public itemsAdded : number = 0;

  constructor(private route: ActivatedRoute, private router: Router, private _sampleServiceService: SampleServiceService) { }

  ngOnInit() {
  	let id = this.route.snapshot.paramMap.get('id');
  	this.chosenSubject = id;
  }

  ngAfterViewInit(){
    this.focusOnInput();
  }
   
  ToOverview(){
	this.router.navigate(['/subjects']);
  }

  @ViewChild("QuestionInput") userAnswerField: ElementRef;
  focusOnInput(): void {
    this.userAnswerField.nativeElement.focus();
   }

  clickedSave(){
    this._sampleServiceService.addItem({"subject": this.chosenSubject, 
                                        "question": this.question, 
                                        "answer": this.answer, 
                                        "swapped": this.swapped 
                                      });
    this.question = "";
    this.answer = "";
    this.focusOnInput();
    this.itemsAdded ++;
  }

}
