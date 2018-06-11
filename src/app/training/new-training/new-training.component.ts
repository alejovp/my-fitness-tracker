import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  @Output() newTraining = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onNewTraining() {
    this.newTraining.emit();
  }

}
