import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exericse } from '../exercise.model';
import { TrainingService } from '../training.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exericse[];
  exerciseSubscription: Subscription;
  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) {}
  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exercisesChange.subscribe(
      (exercises) => (this.exercises = exercises)
    );
    this.trainingService.getAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
