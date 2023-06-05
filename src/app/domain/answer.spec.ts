import { TestBed } from '@angular/core/testing';
import { Operation } from './operation';
import { Answer } from './answer';

describe('Answer', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  function createAddTask(op1: number, op2: number) {
    return {
      operand1: op1,
      operand2: op1,
      result: op1+op2,
      operation: Operation.ADDITION,
      startedAt: Date.now(),
    };
  }

  it('should be created', () => {
    const myTask = createAddTask(1,1);
    let actual = new Answer(myTask, 2, 42);

    expect(actual.task).toBe(myTask);
    expect(actual.answer).toBe(2);
    expect(actual.duration).toBe(42);
  });

  it('should check correctness', () => {
    const myTask1 = createAddTask(1,0);
    const myTask2 = createAddTask(1,1);
    const myTask37 = createAddTask(22,15);

    expect(new Answer(myTask1, 0, 100).isCorrect()).toBeFalse();
    expect(new Answer(myTask1, 1, 100).isCorrect()).toBeTrue();
    expect(new Answer(myTask1, 2, 100).isCorrect()).toBeFalse();
    expect(new Answer(myTask1, 3, 100).isCorrect()).toBeFalse();
    expect(new Answer(myTask1, 15, 100).isCorrect()).toBeFalse();
    expect(new Answer(myTask1, 22, 100).isCorrect()).toBeFalse();
    expect(new Answer(myTask1, 37, 100).isCorrect()).toBeFalse();
    expect(new Answer(myTask1, 100, 100).isCorrect()).toBeFalse();

    expect(new Answer(myTask2, 0, 100).isCorrect()).toBeFalse();
    expect(new Answer(myTask2, 1, 100).isCorrect()).toBeFalse();
    expect(new Answer(myTask2, 2, 100).isCorrect()).toBeTrue();
    expect(new Answer(myTask2, 3, 100).isCorrect()).toBeFalse();
    expect(new Answer(myTask2, 15, 100).isCorrect()).toBeFalse();
    expect(new Answer(myTask2, 22, 100).isCorrect()).toBeFalse();
    expect(new Answer(myTask2, 37, 100).isCorrect()).toBeFalse();
    expect(new Answer(myTask2, 100, 100).isCorrect()).toBeFalse();

    expect(new Answer(myTask37, 0, 100).isCorrect()).toBeFalse();
    expect(new Answer(myTask37, 1, 100).isCorrect()).toBeFalse();
    expect(new Answer(myTask37, 2, 100).isCorrect()).toBeFalse();
    expect(new Answer(myTask37, 3, 100).isCorrect()).toBeFalse();
    expect(new Answer(myTask37, 15, 100).isCorrect()).toBeFalse();
    expect(new Answer(myTask37, 22, 100).isCorrect()).toBeFalse();
    expect(new Answer(myTask37, 37, 100).isCorrect()).toBeTrue();
    expect(new Answer(myTask37, 100, 100).isCorrect()).toBeFalse();
  });

});
