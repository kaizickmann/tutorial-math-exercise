import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Mission } from './domain/mission';
import { Operation } from './domain/operation';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

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

  nextPage(): void {
    // TODO: result page?
    this.router.navigate(['/task']);
  }

}
