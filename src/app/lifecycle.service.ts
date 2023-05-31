import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Mission } from './domain/mission';
import { Operation } from './domain/operation';
import { Answer } from './domain/answer';

@Injectable({
  providedIn: 'root'
})
export class LifecycleService {

  mission?: Mission;

  constructor(private router: Router) { }

  restart() {
    this.mission = undefined;
    this.router.navigate(['/start']);
  }

  start(taskCount: number, operations: Operation[], operandMax: number): void {
    this.mission = {
      taskCount: taskCount,
      taskRange: { higherBoundary: operandMax, lowerBoundary: 0, operations: operations },
      answers: []
    };
    this.nextPage();
  }

  solved(answer: Answer) {
    this.mission?.answers.push(answer);
  }

  nextPage(): void {
    if (this.mission) {
      if (this.mission.taskCount > this.mission.answers.length) {
        this.router.navigate(['/task']);
      } else {
        this.router.navigate(['/result']);
      }
    }
  }

}
