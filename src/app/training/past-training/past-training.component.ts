import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Exericse } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss'],
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedcolumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exericse>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private exChangedSubscriptio: Subscription;
  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exChangedSubscriptio = this.trainingService.finshedExercisesChanged.subscribe(
      (exercises: any) => {
        this.dataSource = exercises;
      }
    );
    this.trainingService.getCompletedorCancelledEcercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.exChangedSubscriptio.unsubscribe();
  }
}
