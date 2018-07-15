import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exerciseList: Exercise[] = [];
  exerciseListChanged: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseList = this.trainingService.getAvailableExercises();
    this.exerciseListChanged = this.trainingService.availableExercisesChanged
      .subscribe(exercises => this.exerciseList = exercises);
  }

  onNewTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exerciseId);
  }

  ngOnDestroy() {
    this.exerciseListChanged.unsubscribe();
  }

}
