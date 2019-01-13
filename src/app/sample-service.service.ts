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
        {"ID": 1, "question": "Hallo", "answer": "hello", "subject": "German as sample", "phase": 2, "due": "25.12.2018", "swappedTo": 2,},
        {"ID": 2, "question": "hello", "answer": "Hallo", "subject": "German as sample", "phase": 2, "due": "25.12.2018", "swappedTo": 1,},
        {"ID": 3, "question": "Tschüss", "answer": "bye", "subject": "German as sample", "phase": 4, "due": "24.12.2018", "swappedTo": 4,},
        {"ID": 4, "question": "bye", "answer": "Tschüss", "subject": "German as sample", "phase": 4, "due": "23.12.2018", "swappedTo": 3,},
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


  stringToDate(datestring: string) {
    var parts = datestring.split(".");
    var date = new Date(parts[2].concat("-", parts[1], "-", parts[0]));
    return date;
  }


  getSubjects() : Subject[]{
    this.initializeProject();

    let subjectList : Subject[] = [];
    let subjects = [];

    for (let k in this.globalItems) {
      if (!(subjects.includes(this.globalItems[k].subject))) { // Question: How could I check subjectList instead so I don't need subjects any longer?
        subjects.push(this.globalItems[k].subject);
        subjectList.push({subject: this.globalItems[k].subject, due: 0});
      }
      let today = new Date(Date.now());
      if (this.stringToDate(this.globalItems[k].due) <= today) {
        let index = subjectList.findIndex(x => x.subject==this.globalItems[k].subject);
        subjectList[index]["due"] ++;
      }
    }

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
    let index = this.globalItems.findIndex(x => x.subject == quizItem.subject);
    this.globalItems[index] = quizItem;
    this.saveProgress();
  }

  /* ------------- (3) For add-item-component -------------- */
  addItem(Item){
    console.log(Item);
    // TODO: Add item with incrementing ID, due date today and reserved if swapped to globalItems.
    this.saveProgress();
  }

  /* ------------- (4) For quiz component -------------- */
  getRandQuizItem(subject: string) : QuizItem {
    // TODO: Get a real quiz item
    this.CountInt ++;
    if (this.CountInt % 2 == 0) {
      return this.globalItems[0]
    } else {
      return this.globalItems[1]
    }
  }  

  getNumOfOpenItems(subject: string) {
    // TODO: Count real number of open questions
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
    let index = this.globalItems.findIndex(x => x.ID == id); // NEXT TODO: Throws an error.
    return this.globalItems[index];
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