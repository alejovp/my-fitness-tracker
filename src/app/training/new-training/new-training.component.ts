import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  @Output() newTraining = new EventEmitter<any>();
  exerciseList: Exercise[] = [];

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseList = this.trainingService.getAvailableExercises();
  }

  onNewTraining() {
    this.newTraining.emit();
  }

}
