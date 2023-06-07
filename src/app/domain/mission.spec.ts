import { TestBed } from '@angular/core/testing';
import { Operation } from './operation';
import { Answer } from './answer';
import { Mission } from './mission';
import { TaskRange } from './task-range';
import { Summary } from './summary';
import { Task } from './task';

describe('Mission', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  function createTaskRange() {
    return {
      operations: [Operation.DIVISION],
      lowerBoundary: 0,
      higherBoundary: 100,
    }
  }

  function createDivTask(op: number): Task {
    return {
      operand1: op,
      operand2: 1,
      result: op,
      operation: Operation.DIVISION,
      startedAt: 666,
    };
  }

  function createAnswer(task: Task, user: number): Answer {
    return new Answer(task, user, 7);
  }

  it('should be created', () => {
    const myTaskRange: TaskRange = createTaskRange();

    let actual = new Mission(3, myTaskRange);

    expect(actual.taskCount).toBe(3);
    expect(actual.taskRange).toBe(myTaskRange);
    expect(actual.answers).toHaveSize(0);
  });

  it('should deliver summary also without answers', () => {
    let mission = new Mission(3, createTaskRange());

    let summary: Summary = mission.getSummary();

    expect(summary.count).toBe(0);
    expect(summary.percentage).toBeNaN();
    expect(summary.totalDuration).toBe(0);
  });

  it('should deliver summary for one answer', () => {
    let mission = new Mission(3, createTaskRange());
    mission.answers.push(createAnswer(createDivTask(1), 1));

    let summary: Summary = mission.getSummary();

    expect(summary.count).toBe(1);
    expect(summary.percentage).toBe(100);
    // we mock each answer with 7 seconds
    expect(summary.totalDuration).toBe(7);
  });

  it('should deliver summary for all answers being correct', () => {
    let mission = new Mission(3, createTaskRange());
    mission.answers.push(createAnswer(createDivTask(1), 1));
    mission.answers.push(createAnswer(createDivTask(2), 2));
    mission.answers.push(createAnswer(createDivTask(3), 3));

    let summary: Summary = mission.getSummary();

    expect(summary.count).toBe(3);
    expect(summary.percentage).toBe(100);
    // we mock each answer with 7 seconds
    expect(summary.totalDuration).toBe(21);
  });

  it('should deliver summary for all answers being wrong', () => {
    let mission = new Mission(3, createTaskRange());
    mission.answers.push(createAnswer(createDivTask(1), 7));
    mission.answers.push(createAnswer(createDivTask(2), 11));
    mission.answers.push(createAnswer(createDivTask(3), 13));

    let summary: Summary = mission.getSummary();

    expect(summary.count).toBe(3);
    expect(summary.percentage).toBe(0);
    // we mock each answer with 7 seconds
    expect(summary.totalDuration).toBe(21);
  });

  it('should deliver summary for to much answers', () => {
    let mission = new Mission(3, createTaskRange());
    // 5x correct
    mission.answers.push(createAnswer(createDivTask(1), 1));
    mission.answers.push(createAnswer(createDivTask(2), 2));
    mission.answers.push(createAnswer(createDivTask(3), 3));
    mission.answers.push(createAnswer(createDivTask(4), 4));
    mission.answers.push(createAnswer(createDivTask(5), 5));
    // 1x wrong
    mission.answers.push(createAnswer(createDivTask(6), 13));

    let summary: Summary = mission.getSummary();

    expect(summary.count).toBe(6);
    // percentage should be rounded (not 83.33333...)
    expect(summary.percentage).toBe(83);
  });

});
