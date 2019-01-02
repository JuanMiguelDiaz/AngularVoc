import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SampleServiceService {

  public CountInt = 0;
  public AllItems = JSON.parse(localStorage.getItem("quizItems")); // TODO: logic to check if json is there. Like function "getItems"

  constructor() { }

  saveItems(items : QuizItem[]) : void{
    localStorage.setItem("quizItems", JSON.stringify(items));
  }

  getSubjects() : Subject[]{
    this.saveItems(this.getTwoItems()); // TODO
    return[
  		{subject: "German", due: 30},
  		{subject: "Spanish", due: 28},
  		{subject: "Business English", due: 5},
  		{subject: "Italian", due: 0},
	]}

  getRandQuizItem(subject: string) : QuizItem {
	  this.CountInt ++;
    if (this.CountInt % 2 == 0) {
      return {"ID": 55, "question": "Dein Name", "answer": "your name", "subject": "Spanish", "phase": 2, "due": "25.12.2018", "swappedTo": 6,}
    } else {
      return {"ID": 54, "question": "Mein Name", "answer": "my name", "subject": "Spanish", "phase": 4, "due": "24.12.2018", "swappedTo": 4,}
    }
  }

  getTwoItems() : QuizItem[] {
      return [{"ID": 55, "question": "Dein Name", "answer": "your name", "subject": "Spanish", "phase": 2, "due": "25.12.2018", "swappedTo": 6,},{"ID": 54, "question": "Mein Name", "answer": "my name", "subject": "Spanish", "phase": 4, "due": "24.12.2018", "swappedTo": 4,}]
  } // Delete, when get all items work.

  updateItem(quizItem: QuizItem){
    //Needed for edit + changing phase due date.
  }

  updateAfterQuiz(quizItem: QuizItem, answerCorrect: boolean) : QuizItem {
    if (answerCorrect == true){
      quizItem.due = "30.30.3000"
      return quizItem
    } else {
      quizItem.due = "01.01.0001"
      return quizItem
    }
  }

  getItem(id : number) : QuizItem{
    return {"ID": 54, "question": "Mein Name", "answer": "my name", "subject": "Spanish", "phase": 4, "due": "24.12.2018", "swappedTo": 3,}
  }

  addItem(Item){
    console.log(Item);
    // Add item with incrementing ID.
  }


  getNumOfOpenItems(subject: string) {
    if (this.CountInt % 2 == 0) {
      return 5
    } else {
      return 4
    }
  }

}

export class Subject {
  subject: string;
  due: number;
}

export class QuizItem {
  public ID: number;
  public question : string;
  public answer : string;
  public subject : string;
  public phase : number;
  public due : string;
  public swappedTo?: number;
}