import { Injectable } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

import { Exercise } from './exercise.model';

@Injectable()
export class TrainingService {
  execiseChanged = new Subject<Exercise>();
  availableExercisesChanged = new Subject<Exercise[]>();
  availableExercisesSubscription: Subscription;
  private availableExercises: Exercise[] = [];

  private pastExercises: Exercise[] = [];

  private currentExercise: Exercise;

  constructor(private db: AngularFirestore) {
    this.fetchAvailableExercises();
  }

  fetchAvailableExercises() {
    this.availableExercisesSubscription = this.db
      .collection('availableExercises')
      .snapshotChanges()
      // mapping the snapshot response to the Exercice model (we need the db document id)
      .pipe(
        map(docsArray => {
          return docsArray.map(document => {
            return {
              id: document.payload.doc.id,
              ...document.payload.doc.data()
            } as Exercise;
          });
        })
      )
      .subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.availableExercisesChanged.next(this.getAvailableExercises());
      });
  }

  getAvailableExercises() {
    return [...this.availableExercises];
  }

  startExercise(selectedId: string) {
    this.currentExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.execiseChanged.next({ ...this.currentExercise });
  }

  endExercise() {
    this.pastExercises.push({
      ...this.currentExercise,
      date: new Date(),
      status: 'completed'
    });
    this.currentExercise = null;
    this.execiseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.pastExercises.push({
      ...this.currentExercise,
      duration: this.currentExercise.duration * (progress / 100),
      calories: this.currentExercise.calories * (progress / 100),
      date: new Date(),
      status: 'cancelled'
    });
    this.currentExercise = null;
    this.execiseChanged.next(null);
  }

  getCurrentExercise() {
    return { ...this.currentExercise };
  }

  getCompletedOrCancelledExercises() {
    return this.pastExercises.slice();
  }
}
