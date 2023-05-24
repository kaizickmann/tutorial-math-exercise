import { Injectable } from '@angular/core';
import { Task } from './domain/task';
import { TaskCategory } from './domain/task-category';
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

  public createTask(definition: TaskCategory): Task {
    switch (definition.operation) {
      case Operation.ADDITION:
        return this.createAddTask(definition);
      case Operation.SUBTRACTION:
        return this.createSubTask(definition);
      default:
        throw "Unsupported operation: " + definition.operation;
    }
  }

  private createAddTask(definition: TaskCategory): Task {
    let ops: OrderedPair = this.getTwoRandoms(definition);
    return {
      operation: definition.operation,
      operand1: ops.lower,
      operand2: ops.higher - ops.lower,
      result: ops.higher,
    }
  }

  private createSubTask(definition: TaskCategory): Task {
    let ops: OrderedPair = this.getTwoRandoms(definition);
    return {
      operation: definition.operation,
      operand1: ops.higher,
      operand2: ops.higher - ops.lower,
      result: ops.lower,
    }
  }

  private getTwoRandoms(definition: TaskCategory): OrderedPair {
    let bounds: OrderedPair = {
      lower: definition.lowerBoundary,
      higher: definition.higherBoundary
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
    return boundary.lower + (range * Math.random());
  }

}
