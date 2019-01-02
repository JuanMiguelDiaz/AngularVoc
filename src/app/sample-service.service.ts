import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SampleServiceService {

  public CountInt = 0;
  public ItemDict = [
    {"ID": 1, "question": "Mein Name", "answer": "my name", "subject": "German (Sample)", "phase": 4, "due": "24.12.2018", "swapped": "",},
    {"ID": 1, "question": "Mein Name", "answer": "my name", "subject": "German (Sample)", "phase": 4, "due": "24.12.2018", "swapped": "",},
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
      return {"ID": 55, "question": "Dein Name", "answer": "your name", "phase": 2, "due": "25.12.2018", "swapped": "",}
    } else {
      return {"ID": 54, "question": "Mein Name", "answer": "my name", "phase": 4, "due": "24.12.2018", "swapped": "",}
    }
  }

  updateItem(quizItem){
    //Needed for edit + changing due date.
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
  public swapped?: string;
}