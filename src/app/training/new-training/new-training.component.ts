import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { firestore } from 'firebase';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exerciseList: Exercise[] = [];

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    this.db
      .collection('availableExercises')
      .valueChanges()
      .subscribe(result => {
        console.log(result);
      });
  }

  onNewTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exerciseId);
  }

}
