import { Component, OnInit } from '@angular/core';
import { Task } from '../domain/task';
import { Operation } from '../domain/operation';
import { Answer } from '../domain/answer';
import { TaskProducerService } from '../task-producer.service';

const ZERO_TASK : Task =  {operand1: -1, operand2: -1, operation: Operation.ADDITION, result: -2};

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  task?: Task;

  userInput: string = "";

  constructor(private taskProducerService: TaskProducerService) { }

  ngOnInit(): void {
    this.createTask();
  }

  createTask(): void {
    this.task = this.taskProducerService.createTask({
      operations: [ Operation.MULTIPLICATION ],
      lowerBoundary: 3,
      higherBoundary: 5
    });
  }

  getOpSign(operation: Operation): string {
    switch (operation) {
      case Operation.ADDITION: return "+";
      case Operation.SUBTRACTION: return "-";
      case Operation.MULTIPLICATION: return "•";
      case Operation.DIVISION: return ":";
    }
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
          // TODO: answer weitergeben
      }
    }
  }
}