import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SampleServiceService, QuizItem } from '../sample-service.service';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  public chosenSubject;
  public quizItem? : QuizItem;
  public userAnswer = "";
  public question = "";
  public answer = "";
  public showAnswer = false;
  public answerCorrect: boolean = false;
  public typeAgain: boolean = false;
  public numOfOpenItems;

  constructor(private route: ActivatedRoute, private router: Router, private _sampleServiceService: SampleServiceService, private renderer : Renderer2) { }

  ngOnInit() {
  	// Reset logic variables for each item
    this.showAnswer = false;
    this.answerCorrect = false;
    this.typeAgain = false;

    let id = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap.get('parent'));
  	this.chosenSubject = id;
    this.quizItem = this._sampleServiceService.getRandQuizItem(this.chosenSubject);
    this.numOfOpenItems = this._sampleServiceService.getNumOfOpenItems(this.chosenSubject);
    this.question = this.quizItem.question;
    this.answer = this.quizItem.answer;
  }

  toEdit(chosenSubject: string, ID: number) {
    this.router.navigate(['/editItem',chosenSubject, ID]);
  }


  ToOverview(){
	  this.router.navigate(['/']);
  }

  compare(){
    this.showAnswer = true;
    if (this.answer == this.userAnswer) {
      this.answerCorrect = true;
    }
  }

  userSaysRight(){
    this.answerCorrect = true;
    //this.focusOnNext();
    //this.renderer.selectRootElement('#nextButton').focus(); // Question: Console says element does not exist?
  }

  // This is the alternative that works below.
  // @ViewChild("nextButton") nextButton: ElementRef;
  // focusOnNext(): void {
  //   this.nextButton.nativeElement.focus();
  // }

  @ViewChild("userAnswerField") userAnswerField: ElementRef;
  focusBackOnInput(): void {
    this.userAnswerField.nativeElement.focus();
   }

  userSaysWrong(){
    this.typeAgain = true;
    this.userAnswer = "";
    this.focusBackOnInput();
  }

  onNext(){
    this._sampleServiceService.updateItem(this.quizItem) 
    this._sampleServiceService.getNumOfOpenItems(this.chosenSubject)
    // if open items = null, redirect to nice you did it!
    // else: loadNext item
    this.ngOnInit()
  }

}
