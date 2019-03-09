import { Injectable, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';

@Injectable({
  providedIn: 'root'
})
export class SampleServiceService{

  public globalItems;

  constructor(private papa: Papa) { 
    this.initializeProject();
  }

  /* ------------- (1) General -------------- */

  loadItems() {
    if (JSON.parse(localStorage.getItem("quizItems")) == null) {
      return {
        1 : {"question": "Hallo", "answer": "hello", "subject": "German as sample", "phase": 2, "due": "25.12.2018", "swappedTo": 2,},
        2 : {"question": "hello", "answer": "Hallo", "subject": "German as sample", "phase": 2, "due": "25.12.2018", "swappedTo": 1,},
        3 : {"question": "Tschüss", "answer": "bye", "subject": "German as sample", "phase": 4, "due": "14.1.2019", "swappedTo": 4,},
        4 : {"question": "bye", "answer": "Tschüss", "subject": "German as sample", "phase": 4, "due": "1.12.2018", "swappedTo": 3,},
      };
    } else {
      return JSON.parse(localStorage.getItem("quizItems"));
    }
  }

  importFromFile(file) {
    if(file.type == 'text/csv') {
        this.papa.parse(file, {
          complete: function(results) {
            localStorage.setItem("ImportedCSV", JSON.stringify(results.data));
          }
        })
         // TODO: Logic for phase 6 data import comes here (taking result from localstorage as input)
      } else {
        var reader :any = new FileReader();
        reader.onload = (e) =>  {
            this.globalItems = JSON.parse(e.target.result);
          localStorage.setItem("quizItems", JSON.stringify(this.globalItems));
        }
        reader.readAsText(file);
      }
    this.loadItems();
  }


  initializeProject() {
    this.globalItems = this.loadItems();
  }


  saveProgress() {
    localStorage.setItem("quizItems", JSON.stringify(this.globalItems));
  }


  stringToDate(datestring: string) {
    var parts = datestring.split(".");
    if(parts[0].length == 1) {
      parts[0] = "0" + parts[0];
    }
    if(parts[1].length == 1) {
      parts[1] = "0" + parts[1];
    }
    var date = new Date(parts[2].concat("-", parts[1], "-", parts[0]));
    return date;
  }

  getMax(obj) : number {
    let max : number = 0;
    for (var property in obj) {
      if (parseInt(property) > max) {
        max = parseInt(property);
      }
    }
    return max;
  }


  getSubjects() : Subject[]{

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

  getItemsForSubject(subject:string) : QuizItem[] {
    let Items : QuizItem[] = [];
    for (let k in this.globalItems) {
      if (this.globalItems[k].subject == subject) {
        Items.push({ "ID": parseInt(k), "question": this.globalItems[k].question, "answer": this.globalItems[k].answer, "subject": this.globalItems[k].subject, "phase": this.globalItems[k].phase, "due": this.globalItems[k].due, "swappedTo": this.globalItems[k].swappedTo,});
      }
    }
    console.log(Items);
    return Items;
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
    if (typeof quizItem.swappedTo !== 'undefined') {
      this.globalItems[quizItem.swappedTo].question = quizItem.answer;
      this.globalItems[quizItem.swappedTo].answer = quizItem.question;
    }
    this.globalItems[quizItem.ID] = {"question": quizItem.question, "answer": quizItem.answer, "subject": quizItem.subject, "phase": quizItem.phase, "due": quizItem.due, "swappedTo": quizItem.swappedTo,};
    this.saveProgress();
  }

  deleteItem(quizItem: QuizItem){
    if (typeof quizItem.swappedTo !== 'undefined') {
      delete this.globalItems[quizItem.swappedTo];
    }
    delete this.globalItems[quizItem.ID];
    this.saveProgress();
  }

  /* ------------- (3) For add-item-component -------------- */
  addItem(Item){

    let today = new Date(Date.now());
    if (Item.swapped == false) {
      let currentMax : number = this.getMax(this.globalItems)
      this.globalItems[(currentMax + 1)] = {"question": Item.question, "answer": Item.answer, "subject": Item.subject, "phase": 1, "due": today.toLocaleString('de-DE',{year: 'numeric', month: 'numeric', day: 'numeric' }),}; //TODO: Fix bug in here.
    } else {
      let currentMax : number = this.getMax(this.globalItems);
      this.globalItems[(currentMax + 1)] = {"question": Item.question, "answer": Item.answer, "subject": Item.subject, "phase": 1, "due": today.toLocaleString('de-DE',{year: 'numeric', month: 'numeric', day: 'numeric' }), "swappedTo": currentMax+2 };
      this.globalItems[(currentMax + 2)] = {"question": Item.answer, "answer": Item.question, "subject": Item.subject, "phase": 1, "due": today.toLocaleString('de-DE',{year: 'numeric', month: 'numeric', day: 'numeric' }), "swappedTo": currentMax+1 };
    }
    this.saveProgress();
  }

  /* ------------- (4) For quiz component -------------- */
  getRandQuizItem(subject: string) : QuizItem {
    
    let today = new Date(Date.now());
    var listOfDue : number[] = [];
    for (let k in this.globalItems) {
      if (this.globalItems[k].subject == subject && this.stringToDate(this.globalItems[k].due) <= today) { // Question: How could I check subjectList instead so I don't need subjects any longer?
        listOfDue.push(parseInt(k));
      }
    }
    let random : number = listOfDue[this.getRandom(listOfDue.length)];
    return { "ID": random, "question": this.globalItems[random].question, "answer": this.globalItems[random].answer, "subject": this.globalItems[random].subject, "phase": this.globalItems[random].phase, "due": this.globalItems[random].due, "swappedTo": this.globalItems[random].swappedTo,};
  }

  getRandom(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getNumOfOpenItems(subject: string) {
    var number : number = 0;
    let today = new Date(Date.now());
    for (let k in this.globalItems) {
      if (this.globalItems[k].subject == subject && this.stringToDate(this.globalItems[k].due) <= today) {
        number ++;
      }
    }
    return number
  }

  updateAfterQuiz(quizItem: QuizItem, answerCorrect: boolean) : QuizItem {
    if (answerCorrect == true) {
      if (quizItem.phase == 6) {
        quizItem.due == "";
      } else {
        let newDue = new Date(this.updateDueDate(quizItem.phase));
        quizItem.due = newDue.toLocaleString('de-DE',{year: 'numeric', month: 'numeric', day: 'numeric' });
        quizItem.phase ++;
      }
    } else {
      let today = new Date(Date.now());
      quizItem.phase = 1;
    }
    this.globalItems[quizItem.ID] = {"question": quizItem.question, "answer": quizItem.answer, "subject": quizItem.subject, "phase": quizItem.phase, "due": quizItem.due, "swappedTo": quizItem.swappedTo,};
    this.saveProgress();

    return quizItem;
  }

  getItem(id : number) : QuizItem{
    return { "ID": id, "question": this.globalItems[id].question, "answer": this.globalItems[id].answer, "subject": this.globalItems[id].subject, "phase": this.globalItems[id].phase, "due": this.globalItems[id].due, "swappedTo": this.globalItems[id].swappedTo,};
  }

}

/* ------------- (5) Classes -------------- */

export class Subject {
  subject: string;
  due: number;
}

export class QuizItem {
  public ID : number;
  public question : string;
  public answer : string;
  public subject : string;
  public phase : number;
  public due : string;
  public swappedTo?: number;
}