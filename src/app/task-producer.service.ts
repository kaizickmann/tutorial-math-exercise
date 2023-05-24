import { Injectable } from '@angular/core';
import { Task } from './domain/task';
import { TaskCategory } from './domain/task-category';
import { Operation } from './domain/operation';

@Injectable({
  providedIn: 'root'
})
export class TaskProducerService {

  constructor() { }

  public createTask(definition: TaskCategory): Task {
    return this.createAddSubTask(definition);
  }

  createAddSubTask(definition: TaskCategory): Task {
    // generate two random numbers within this range
    let op1: number = this.getRandomInInterval(definition.lowerBoundary, definition.higherBoundary);
    let op2: number = this.getRandomInInterval(definition.lowerBoundary, definition.higherBoundary);
    // determine higher and lower one
    let opLower: number = Math.min(op1, op2);
    let opHigher: number = Math.max(op1, op2);
    // finally, generate the resulting task
    if (definition.operation == Operation.ADDITION) {
      return {
        operation: definition.operation,
        operand1: opLower,
        operand2: opHigher - opLower,
        result: opHigher,
      }
    }
    if (definition.operation == Operation.SUBTRACTION) {
      return {
        operation: definition.operation,
        operand1: opHigher,
        operand2: opHigher - opLower,
        result: opLower,
      }
    }
    throw "Unsupported operation: " + definition.operation;
  }

  getRandomInInterval(lower: number, higher: number): number {
    if (higher < lower) throw "config error: lower boundary is greater than the higher boundary";
    let range: number = higher - lower;
    return lower + (range * Math.random());
  }

}
