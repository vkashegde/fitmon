import { Exericse } from './exercise.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
@Injectable()
export class TrainingService {
  exerciseChange = new Subject<Exericse>();
  exercisesChange = new Subject<Exericse[]>();
  finshedExercisesChanged = new Subject<Exericse[]>();
  availableExercise: Exericse[] = [];
  private runningExercise: Exericse;
  private finishedExercises: Exericse[] = [];

  constructor(private db: AngularFirestore) {}

  getAvailableExercises() {
    this.db
      .collection('availableExercises')
      .snapshotChanges()
      .map((docData) => {
        return docData.map((doc) => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data().name,
            duration: doc.payload.doc.data().duration,
            calories: doc.payload.doc.data().calories,
          };
        });
      })
      .subscribe((exercises: Exericse[]) => {
        this.availableExercise = exercises;
        this.exercisesChange.next([...this.availableExercise]);
      });
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercise.find(
      (ex) => ex.id === selectedId
    );
    this.exerciseChange.next({ ...this.runningExercise });
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'Completed',
    });
    this.runningExercise = null;
    this.exerciseChange.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercise = null;
    this.exerciseChange.next(null);
  }

  getCompletedorCancelledEcercises() {
    this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exericse[]) => {
        this.finshedExercisesChanged.next(exercises);
      });
  }

  addDataToDatabase(exercise: Exericse) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
