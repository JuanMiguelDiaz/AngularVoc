import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SampleServiceService {

  public CountInt = 0;
  public ItemDict = [
    {"ID": 1, "question": "Mein Name", "answer": "my name", "subject": "German (Sample)", "phase": 4, "due": "24.12.2018", "swappedTo": 1,},
    {"ID": 1, "question": "Mein Name", "answer": "my name", "subject": "German (Sample)", "phase": 4, "due": "24.12.2018", "swappedTo": 8,},
  ];

  constructor() { }

  getSubjects() : Subject[]{
	return[
		{subject: "German", due: 30},
		{subject: "Spanish", due: 28},
		{subject: "Business English", due: 5},
		{subject: "Italian", due: 0},
	]}

  getQuizItem(subject: string) {
	  this.CountInt ++;
    console.log(this.CountInt);
    if (this.CountInt % 2 == 0) {
      return {"ID": 55, "question": "Dein Name", "answer": "your name", "subject": "Spanish", "phase": 2, "due": "25.12.2018", "swappedTo": 6,}
    } else {
      return {"ID": 54, "question": "Mein Name", "answer": "my name", "subject": "Spanish", "phase": 4, "due": "24.12.2018", "swappedTo": 4,}
    }
  }

  updateItem(quizItem: QuizItem){
    //Needed for edit + changing due date.
  }

  getItem(id : number) : QuizItem{
    return {"ID": 54, "question": "Mein Name", "answer": "my name", "subject": "Spanish", "phase": 4, "due": "24.12.2018", "swappedTo": 3,}
  }

  addItem(Item){
    <Subject>{subject: "English", due: 123}
    console.log(Item);
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