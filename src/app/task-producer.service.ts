import { Injectable } from '@angular/core';
import { Task } from './domain/task';
import { TaskRange } from './domain/task-range';
import { Operation } from './domain/operation';

type Pair = { n1: number, n2: number };
type OrderedPair = { lower: number, higher: number };

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
      case Operation.MULTIPLICATION:
        return this.createMultTask(taskRange);
      case Operation.DIVISION:
        return this.createDivTask(taskRange);
    }
  }

  getRandomOperationFrom(operations: Operation[]): Operation {
    return operations[Math.floor(Math.random() * operations.length)];
  }

  private createAddTask(taskRange: TaskRange): Task {
    let ops: OrderedPair = this.getTwoOrderedRandoms(taskRange);
    return {
      operation: Operation.ADDITION,
      operand1: ops.lower,
      operand2: ops.higher - ops.lower,
      result: ops.higher,
      startedAt: Date.now(),
    }
  }

  private createSubTask(taskRange: TaskRange): Task {
    let ops: OrderedPair = this.getTwoOrderedRandoms(taskRange);
    return {
      operation: Operation.SUBTRACTION,
      operand1: ops.higher,
      operand2: ops.higher - ops.lower,
      result: ops.lower,
      startedAt: Date.now(),
    }
  }

  private createMultTask(taskRange: TaskRange): Task {
    let ops: Pair = this.getTwoRandoms(taskRange);
    return {
      operation: Operation.MULTIPLICATION,
      operand1: ops.n1,
      operand2: ops.n2,
      result: ops.n1 * ops.n2,
      startedAt: Date.now(),
    }
  }

  private createDivTask(taskRange: TaskRange): Task {
    let ops: Pair = this.getTwoRandoms(taskRange);
    while (ops.n2 == 0) {
      ops = this.getTwoRandoms(taskRange);
    }
    return {
      operation: Operation.DIVISION,
      operand1: ops.n1 * ops.n2,
      operand2: ops.n2,
      result: ops.n1,
      startedAt: Date.now(),
    }
  }

  private getTwoOrderedRandoms(taskRange: TaskRange): OrderedPair {
    // generate two random numbers
    let op: Pair = this.getTwoRandoms(taskRange);
    // determine higher and lower one
    return {
      lower: Math.min(op.n1, op.n2),
      higher: Math.max(op.n1, op.n2)
    }
  }

  private getTwoRandoms(taskRange: TaskRange): Pair {
    let bounds: OrderedPair = {
      lower: taskRange.lowerBoundary,
      higher: taskRange.higherBoundary
    };
    // generate two random numbers within this range
    return {
      n1: this.getRandomInInterval(bounds),
      n2: this.getRandomInInterval(bounds)
    }
  }

  getRandomInInterval(boundary: OrderedPair): number {
    if (boundary.higher < boundary.lower) throw "lower boundary is greater than higher boundary";
    let range: number = boundary.higher - boundary.lower;
    return Math.round(boundary.lower + (range * Math.random()));
  }

}
