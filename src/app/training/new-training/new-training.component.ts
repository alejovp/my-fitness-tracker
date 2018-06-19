import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exerciseList: Exercise[] = [];

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseList = this.trainingService.getAvailableExercises();
  }

  onNewTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exerciseId);
  }

}
