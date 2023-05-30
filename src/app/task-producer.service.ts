import { Injectable } from '@angular/core';
import { Task } from './domain/task';
import { TaskRange } from './domain/task-range';
import { Operation } from './domain/operation';

interface OrderedPair {
  lower: number;
  higher: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaskProducerService {

  constructor() { }

  public createTask(taskRange: TaskRange): Task {
    let op: Operation = this.getRandomOperationFrom(taskRange.operations);
    switch (op) {
      case Operation.ADDITION:
        return this.createAddTask(taskRange);
      case Operation.SUBTRACTION:
        return this.createSubTask(taskRange);
      default:
        throw "Unsupported operation: " + op;
    }
  }

  private getRandomOperationFrom(operations: Operation[]) {
    return operations[Math.floor(Math.random() * operations.length)];
  }

  private createAddTask(taskRange: TaskRange): Task {
    let ops: OrderedPair = this.getTwoRandoms(taskRange);
    return {
      operation: Operation.ADDITION,
      operand1: ops.lower,
      operand2: ops.higher - ops.lower,
      result: ops.higher,
    }
  }

  private createSubTask(taskRange: TaskRange): Task {
    let ops: OrderedPair = this.getTwoRandoms(taskRange);
    return {
      operation: Operation.SUBTRACTION,
      operand1: ops.higher,
      operand2: ops.higher - ops.lower,
      result: ops.lower,
    }
  }

  private getTwoRandoms(taskRange: TaskRange): OrderedPair {
    let bounds: OrderedPair = {
      lower: taskRange.lowerBoundary,
      higher: taskRange.higherBoundary
    };
    // generate two random numbers within this range
    let op1: number = this.getRandomInInterval(bounds);
    let op2: number = this.getRandomInInterval(bounds);
    // determine higher and lower one
    return {
      lower: Math.min(op1, op2),
      higher: Math.max(op1, op2)
    }
  }

  getRandomInInterval(boundary: OrderedPair): number {
    if (boundary.higher < boundary.lower) throw "config error: lower boundary is greater than the higher boundary";
    let range: number = boundary.higher - boundary.lower;
    return Math.round(boundary.lower + (range * Math.random()));
  }

}
