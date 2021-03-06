import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SampleServiceService, QuizItem } from '../sample-service.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

	public subject = "";
	public itemId: number;
	public quizItem : QuizItem;
	public swapped = false;

  // TODO: Needs phase and due-date as property binding to allow editing.

  constructor(private route: ActivatedRoute, private _sampleServiceService: SampleServiceService, private location: Location,) { }

  ngOnInit() {
  	this.subject = this.route.snapshot.paramMap.get('subject');
  	this.itemId = parseInt(this.route.snapshot.paramMap.get('id'));
  	this.quizItem = this._sampleServiceService.getItem(this.itemId);
    console.log(this.quizItem.swappedTo);
  	if(this.quizItem.swappedTo){
  		this.swapped = true;
  	}
  }


  clickSave(){
  	this._sampleServiceService.updateItem(this.quizItem);
  	this.location.back();
  }

  clickDelete(){
    this._sampleServiceService.deleteItem(this.quizItem);
    this.location.back();
}

}
