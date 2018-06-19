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

  private currentExercise: Exercise;

  getAvailableExercises() {
    return [ ...this.availableExercises ];
  }

  startExercise(selectedId: string) {
    this.currentExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.execiseChanged.next({ ...this.currentExercise });
  }

}
