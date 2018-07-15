import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exerciseList: Observable<Exercise[]>;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    this.exerciseList = this.db
      .collection('availableExercises')
      .snapshotChanges()
      // mapping the snapshot response to the Exercice model (we need the db document id)
      .pipe(map(docsArray => {
          return docsArray.map(document => {
            return { id: document.payload.doc.id, ...document.payload.doc.data() } as Exercise;
          });
        })
      );
      // .subscribe(result => {
      //   console.log(result);
      // });
  }

  onNewTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exerciseId);
  }

}
