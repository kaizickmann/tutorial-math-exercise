import { Component } from '@angular/core';
import { Task } from '../domain/task';
import { Operation } from '../domain/operation';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  task: Task = {
    operation: Operation.ADDITION,
    operand1: 40,
    operand2: 2,
    result: 42
  }

  userInput: string = "";

  public getOpSign(operation: Operation): string {
    switch (operation) {
      case Operation.ADDITION: return "+";
      case Operation.SUBTRACTION: return "-";
      case Operation.MULTIPLICATION: return "•";
      case Operation.DIVISION: return ":";
    }
  }
}
