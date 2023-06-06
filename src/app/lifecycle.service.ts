import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from './domain/task';
import { Mission } from './domain/mission';
import { Operation } from './domain/operation';
import { Answer } from './domain/answer';
import { TaskProducerService } from './task-producer.service';

@Injectable({
  providedIn: 'root'
})
export class LifecycleService {

  mission?: Mission;

  constructor(
    private router: Router,
    private taskProducerService: TaskProducerService) { }

  restart(): void {
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

  getNextTask(): Task | undefined {
    // assure, that the mission is available
    if (!this.mission) {
      // perhaps, the user invoked "/task" directly...
      this.restart();
      return undefined;
    }
    return this.taskProducerService.createTask(this.mission.taskRange);
  }

  solveTask(task: Task, userAnswer: number): void {
    let duration = Math.round((Date.now() - task.startedAt) / 1000)
    let answer: Answer = {
      task: task,
      answer: userAnswer,
      duration: duration,
    }
    this.mission?.answers.push(answer);
    this.nextPage();
  }

  private nextPage(): void {
    if (this.mission) {
      if (this.mission.taskCount > this.mission.answers.length) {
        this.router.navigate(['/task']);
      } else {
        this.router.navigate(['/result']);
      }
    }
  }
}
