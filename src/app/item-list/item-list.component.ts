import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SampleServiceService, QuizItem } from '../sample-service.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

	public subject :string;
	public itemList :QuizItem[];
	public noOfItems :number;
	public columns = [];

  	constructor(private router: Router, private route: ActivatedRoute, private _sampleServiceService: SampleServiceService, private location: Location,) { }

	ngOnInit() {
	  this.subject = this.route.snapshot.paramMap.get('subject');
	  this.itemList = this._sampleServiceService.getItemsForSubject(this.subject);
	  this.columns = Object.keys(this.itemList[0]);
	  this.noOfItems = this.itemList.length;
	}

  ToOverview(){
	  this.router.navigate(['/']);
  }

  toEdit(chosenSubject: string, ID: number) {
    this.router.navigate(['/editItem',chosenSubject, ID]);
  }

}
