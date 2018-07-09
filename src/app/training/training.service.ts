import { Subject } from 'rxjs';

import { Exercise } from './exercise.model';

export class TrainingService {
  execiseChanged = new Subject<Exercise>();

  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];

  private pastExercises: Exercise[] = [];

  private currentExercise: Exercise;

  getAvailableExercises() {
    return [ ...this.availableExercises ];
  }

  startExercise(selectedId: string) {
    this.currentExercise = this.availableExercises.find(ex => ex.id === selectedId);
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
