import { Component, OnInit } from '@angular/core';
import { Task } from '../domain/task';
import { Operation } from '../domain/operation';
import { TaskRange } from '../domain/task-range';
import { Answer } from '../domain/answer';
import { TaskProducerService } from '../task-producer.service';
import { LifecycleService } from '../lifecycle.service';

const ZERO_TASK: Task = { operand1: -1, operand2: -1, operation: Operation.ADDITION, result: -2 };

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  task?: Task;

  userInput: string = "";

  constructor(
    private lifecycleService: LifecycleService,
    private taskProducerService: TaskProducerService) { }

  ngOnInit(): void {
    this.resetComponent();
  }

  resetComponent(): void {
    this.userInput = "";
    this.task = this.createTask();
  }

  createTask(): Task {
    // assure, that the mission is available
    if (!this.lifecycleService.mission) {
      // perhaps, the user invoked "/task" directly...
      this.lifecycleService.restart();
      return ZERO_TASK;
    }

    let taskRange: TaskRange = this.lifecycleService.mission?.taskRange;
    return this.taskProducerService.createTask({
      operations: taskRange.operations,
      lowerBoundary: taskRange.lowerBoundary,
      higherBoundary: taskRange.higherBoundary
    });
  }

  solved(): void {
    if (this.userInput) {
      let userAnswer: number = Number(this.userInput);
      if (isNaN(userAnswer)) {
        alert("Das kann ich nicht als Zahl erkennen: " + this.userInput);
      } else {
        // eigentlich Logik
        let answer: Answer = {
          task: this.task || ZERO_TASK,
          answer: userAnswer,
          durationMilli: 0
        }
        this.lifecycleService.solved(answer);
        this.resetComponent();
        this.lifecycleService.nextPage();
      }
    }
  }
}