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
  public numOfOpenItems : number; // TODO: When is 0, show done icon.
  public showNext = false;

  constructor(private route: ActivatedRoute, private router: Router, private _sampleServiceService: SampleServiceService, private renderer : Renderer2) { }

  ngOnInit() {
  	// Reset logic variables for each item
    this.showAnswer = false;
    this.showNext = false;
    this.answerCorrect = false;
    this.userAnswer = "";

    let id = this.route.snapshot.paramMap.get('id');
  	this.chosenSubject = id;
    this.numOfOpenItems = this._sampleServiceService.getNumOfOpenItems(this.chosenSubject);
    if (this.numOfOpenItems > 0){
      this.quizItem = this._sampleServiceService.getRandQuizItem(this.chosenSubject);
      this.question = this.quizItem.question;
      this.answer = this.quizItem.answer;
    }
  }

  ngAfterViewInit(){
    this.focusOnInput();
  }

  @ViewChild("userAnswerField") userAnswerField: ElementRef;
  focusOnInput(): void {
    this.userAnswerField.nativeElement.focus();
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
      this.showNext = true;
      this.updateAfterAnswer();

    }
  }

  userSaysRight(){
    this.answerCorrect = true;
    this.showNext = true;
    this.updateAfterAnswer();
  }

  userSaysWrong(){
    this.userAnswer = "";
    this.showNext = true;
    this.answerCorrect = false;
    this.updateAfterAnswer()
    this.focusOnInput();
  }

  updateAfterAnswer(){
    this._sampleServiceService.updateAfterQuiz(this.quizItem, this.answerCorrect);
    this.numOfOpenItems = this._sampleServiceService.getNumOfOpenItems(this.chosenSubject);
  }

  onNext(){
    this.ngOnInit();
    this.ngAfterViewInit();
  }

}
