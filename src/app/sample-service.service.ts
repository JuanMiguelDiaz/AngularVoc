import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SampleServiceService {

  public CountInt = 0;
  public globalItems : QuizItem[];

  constructor() { }

  /* ------------- (1) General -------------- */

  loadItems() : QuizItem[] {
    if (JSON.parse(localStorage.getItem("quizItems")) == null) {
      return [
        {"ID": 1, "question": "Hallo", "answer": "hello", "subject": "German Sample", "phase": 2, "due": "25.12.2018", "swappedTo": 2,},
        {"ID": 2, "question": "hello", "answer": "Hallo", "subject": "German Sample", "phase": 2, "due": "25.12.2018", "swappedTo": 1,},
        {"ID": 3, "question": "Tschüss", "answer": "bye", "subject": "German Sample", "phase": 4, "due": "24.12.2018", "swappedTo": 4,},
        {"ID": 4, "question": "bye", "answer": "Tschüss", "subject": "German Sample", "phase": 4, "due": "24.12.2018", "swappedTo": 3,}
      ];
    } else {
      return JSON.parse(localStorage.getItem("quizItems"));
    }
  }

  initializeProject() {
    this.globalItems = this.loadItems();
  }

  saveProgress() {
    localStorage.setItem("quizItems", JSON.stringify(this.globalItems));
  }

  getSubjects() : Subject[]{
    this.initializeProject();
    // TODO: Iterate through globalItems and add new subjects to list and increase it's count for every due item.

    let subjectList = [
      {subject: "German", due: 30},
      {subject: "Spanish", due: 28},
      {subject: "Business English", due: 5},
      {subject: "Italian", due: 0},
    ];

    return subjectList;
  }

  updateDueDate(currentPhase : number) : any{
    let newDue = new Date();
    if (currentPhase == 1) {
      return newDue.setDate(newDue.getDate() + 1);
    } if (currentPhase == 2) {
      return newDue.setDate(newDue.getDate() + 3);
    } if (currentPhase == 3) {
      return newDue.setDate(newDue.getDate() + 10);
    } if (currentPhase == 4) {
      return newDue.setDate(newDue.getDate() + 30);
    } if (currentPhase == 5) {
      return newDue.setDate(newDue.getDate() + 90);
    }
  }

  /* ------------- (2) For edit-item-component -------------- */

  updateItem(quizItem: QuizItem){
    // TODO: Save update in globalItems.
    this.saveProgress();
  }

  /* ------------- (3) For add-item-component -------------- */
  addItem(Item){
    console.log(Item);
    // TODO: Add item with incrementing ID to globalItems.
    this.saveProgress();
  }

  /* ------------- (4) For quiz component -------------- */
  getRandQuizItem(subject: string) : QuizItem {
    this.CountInt ++;
    if (this.CountInt % 2 == 0) {
      return {"ID": 55, "question": "Dein Name", "answer": "your name", "subject": "Spanish", "phase": 2, "due": "25.12.2018", "swappedTo": 6,}
    } else {
      return {"ID": 54, "question": "Mein Name", "answer": "my name", "subject": "Spanish", "phase": 4, "due": "24.12.2018", "swappedTo": 4,}
    }
  }  

  getNumOfOpenItems(subject: string) {
    if (this.CountInt % 2 == 0) {
      return 5
    } else {
      return 4
    }
  }

  updateAfterQuiz(quizItem: QuizItem, answerCorrect: boolean) : QuizItem {
    if (answerCorrect == true) {
      if (quizItem.phase == 6) {
        quizItem.due == "";
        quizItem.phase ++;
      } else {
        let newDue = new Date(this.updateDueDate(quizItem.phase));
        quizItem.due = newDue.toLocaleString('de-DE',{year: 'numeric', month: 'numeric', day: 'numeric' });
        quizItem.phase ++;
      }
    } else {
      let today = new Date(Date.now());
      quizItem.due = today.toLocaleString('de-DE',{year: 'numeric', month: 'numeric', day: 'numeric' });
      quizItem.phase = 1;
    }
    return quizItem
    // TODO: Replace item in globalItems
    this.saveProgress();
  }

  getItem(id : number) : QuizItem{
    return {"ID": 54, "question": "Mein Name", "answer": "my name", "subject": "Spanish", "phase": 4, "due": "24.12.2018", "swappedTo": 3,}
  }

}

/* ------------- (5) Classes -------------- */

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