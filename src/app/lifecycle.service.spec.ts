import { TestBed } from '@angular/core/testing';

import { LifecycleService } from './lifecycle.service';
import { Router } from '@angular/router';
import { Operation } from './domain/operation';
import { Answer } from './domain/answer';

describe('LifecycleService', () => {
  let service: LifecycleService;
  let router: Router;
  let routerSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LifecycleService);
    router = TestBed.inject(Router);
    routerSpy = spyOn(router, 'navigate');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be startable and navigate to the task page', () => {
    const myOperations = [Operation.MULTIPLICATION, Operation.DIVISION];
    service.start(3, myOperations, 5);

    // mission should be initialized
    expect(service.mission).toBeDefined();
    let actualMission = service.mission;
    expect(actualMission?.taskCount).toEqual(3);
    expect(actualMission?.answers).toEqual([]);
    expect(actualMission?.taskRange).toBeDefined();
    let actualTaskRange = actualMission?.taskRange;
    expect(actualTaskRange?.lowerBoundary).toEqual(0);
    expect(actualTaskRange?.higherBoundary).toEqual(5);
    expect(actualTaskRange?.operations).toBe(myOperations);

    // and we should be routed to the task page
    expect(routerSpy).toHaveBeenCalledWith(['/task']);
  });

  function mockAnswer(count: number) {
    return {
      task: { operand1: count, operand2: count, result: count * count, operation: Operation.MULTIPLICATION },
      // not always the correct answer!
      answer: 4,
      duration: 42,
    }
  }

  it('should solve a task', () => {
    const myOperations = [Operation.MULTIPLICATION, Operation.DIVISION];
    const myAnswer = mockAnswer(1);

    service.start(3, myOperations, 5);
    service.solved(myAnswer);

    // important: the answer should be recognized
    let actualMission = service.mission;
    expect(actualMission?.answers).toHaveSize(1);
    expect(actualMission?.answers[0]).toBe(myAnswer);

    // remaining stuff: same like the start test
    expect(actualMission?.taskCount).toEqual(3);
    expect(actualMission?.taskRange).toBeDefined();
    let actualTaskRange = actualMission?.taskRange;
    expect(actualTaskRange?.lowerBoundary).toEqual(0);
    expect(actualTaskRange?.higherBoundary).toEqual(5);
    expect(actualTaskRange?.operations).toBe(myOperations);
  });

  it('should solve two tasks', () => {
    const myOperations = [Operation.MULTIPLICATION, Operation.DIVISION];
    const myAnswer1 = mockAnswer(1);
    const myAnswer2 = mockAnswer(2);

    service.start(3, myOperations, 5);
    service.solved(myAnswer1);
    service.solved(myAnswer2);

    // both answers should be recognized
    let actualMission = service.mission;
    expect(actualMission?.answers).toHaveSize(2);
    expect(actualMission?.answers[0]).toBe(myAnswer1);
    expect(actualMission?.answers[1]).toBe(myAnswer2);
    // ignore the remaining stuff (the start and solve(once) test)
  });

  it('should solve three tasks', () => {
    const myOperations = [Operation.MULTIPLICATION, Operation.DIVISION];
    const myAnswer1 = mockAnswer(1);
    const myAnswer2 = mockAnswer(2);
    const myAnswer3 = mockAnswer(3);

    service.start(3, myOperations, 5);
    service.solved(myAnswer1);
    service.solved(myAnswer2);
    service.solved(myAnswer3);

    // both answers should be recognized
    let actualMission = service.mission;
    expect(actualMission?.answers).toHaveSize(3);
    expect(actualMission?.answers[0]).toBe(myAnswer1);
    expect(actualMission?.answers[1]).toBe(myAnswer2);
    expect(actualMission?.answers[2]).toBe(myAnswer3);
    // ignore the remaining stuff (the start and solve(once) test)
  });

  it('should navigate to the task page with a solved task', () => {
    const myOperations = [Operation.MULTIPLICATION, Operation.DIVISION];
    const myAnswer = mockAnswer(1);
    service.start(3, myOperations, 5);
    service.solved(myAnswer);

    service.nextPage();
    expect(routerSpy).toHaveBeenCalledWith(['/task']);
    expect(routerSpy).not.toHaveBeenCalledWith(['/result']);
  });

  it('should navigate to the task page with two solved tasks', () => {
    const myOperations = [Operation.MULTIPLICATION, Operation.DIVISION];
    const myAnswer1 = mockAnswer(1);
    const myAnswer2 = mockAnswer(2);
    service.start(3, myOperations, 5);
    service.solved(myAnswer1);
    service.solved(myAnswer2);

    service.nextPage();
    expect(routerSpy).toHaveBeenCalledWith(['/task']);
    expect(routerSpy).not.toHaveBeenCalledWith(['/result']);
  });

  it('should navigate to the RESULT page with three solved tasks', () => {
    const myOperations = [Operation.MULTIPLICATION, Operation.DIVISION];
    const myAnswer1 = mockAnswer(1);
    const myAnswer2 = mockAnswer(2);
    const myAnswer3 = mockAnswer(3);
    service.start(3, myOperations, 5);
    service.solved(myAnswer1);
    service.solved(myAnswer2);
    service.solved(myAnswer3);

    service.nextPage();
    expect(routerSpy).toHaveBeenCalledWith(['/result']);
  });

  it('should restart after solving two tasks', () => {
    service.start(3, [Operation.DIVISION], 5);
    service.solved(mockAnswer(1));
    service.solved(mockAnswer(2));
    service.restart();
    // mission should be undefined (therewith the solutions lost, ...)
    expect(service.mission).toBeUndefined();
  });

});
