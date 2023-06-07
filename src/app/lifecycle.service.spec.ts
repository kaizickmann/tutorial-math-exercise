import { TestBed } from '@angular/core/testing';

import { LifecycleService } from './lifecycle.service';
import { Router } from '@angular/router';
import { Operation } from './domain/operation';
import { TaskProducerService } from './task-producer.service';

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

  function startServiceWithTestFixture() {
    const operations = [Operation.MULTIPLICATION, Operation.DIVISION];
    service.start(3, operations, 5);
    return operations;
  }

  function mockMultTask(count: number) {
    return {
      operand1: count,
      operand2: count,
      result: count * count,
      operation: Operation.MULTIPLICATION,
      startedAt: Date.now(),
    };
  }

  it('should generate the next task', () => {
    // suitable setup
    startServiceWithTestFixture();

    // mock the task producer service (which is tested separate)
    let expectedTask = mockMultTask(42);
    let producerSpy = spyOn(TestBed.inject(TaskProducerService), 'createTask')
      .and.returnValue(expectedTask);
    // according task should be generated
    let actualTask = service.getNextTask();
    expect(actualTask).toBeDefined();
    expect(actualTask).toBe(expectedTask);

    // also, expect the TaskRange parameter (which requires a little bit preparation)
    let currentMission = service.mission;
    if (!currentMission) throw "Where is the mission?";
    expect(producerSpy).toHaveBeenCalledOnceWith(currentMission.taskRange);
  });

  it('should NOT generate a task without being started', () => {
    service.mission = undefined;
    let producerSpy = spyOn(TestBed.inject(TaskProducerService), 'createTask').and.callThrough();

    // this should not work
    let actualTask = service.getNextTask();
    expect(routerSpy).toHaveBeenCalledOnceWith(['/start']);
    expect(service.mission).toBeUndefined();
    expect(actualTask).toBeUndefined();
    expect(producerSpy).not.toHaveBeenCalled();
  });

  it('should solve a task', () => {
    const myOperations = startServiceWithTestFixture();
    const myTask = mockMultTask(1);

    service.solveTask(myTask, 3001);

    // important: the answer should be recognized
    let actualMission = service.mission;
    expect(actualMission?.answers).toHaveSize(1);
    let actualAnswer = actualMission?.answers[0];
    expect(actualAnswer?.task).toBe(myTask);
    expect(actualAnswer?.answer).toBe(3001);

    // remaining stuff: same like the start test
    expect(actualMission?.taskCount).toEqual(3);
    expect(actualMission?.taskRange).toBeDefined();
    let actualTaskRange = actualMission?.taskRange;
    expect(actualTaskRange?.lowerBoundary).toEqual(0);
    expect(actualTaskRange?.higherBoundary).toEqual(5);
    expect(actualTaskRange?.operations).toBe(myOperations);
  });

  it('should calculate the duration', () => {
    let timeSpy = spyOn(Date, 'now');

    // test with exactly 42 seconds
    timeSpy.and.returnValues(500, 42500);
    startServiceWithTestFixture();
    service.solveTask(mockMultTask(1), 1);
    expect(service.mission?.answers[0]?.duration).toEqual(42);

    // test rounding down
    timeSpy.and.returnValues(500, 7999);
    startServiceWithTestFixture();
    service.solveTask(mockMultTask(1), 1);
    expect(service.mission?.answers[0]?.duration).toEqual(7);

    // test rounding up
    timeSpy.and.returnValues(500, 7001);
    startServiceWithTestFixture();
    service.solveTask(mockMultTask(1), 1);
    expect(service.mission?.answers[0]?.duration).toEqual(7);
  });

  it('should solve two tasks', () => {
    startServiceWithTestFixture();

    const my1stTask = mockMultTask(1);
    service.solveTask(my1stTask, 11);
    const my2ndTask = mockMultTask(2);
    service.solveTask(my2ndTask, 22);

    // both answers should be recognized
    let actualMission = service.mission;
    expect(actualMission?.answers).toHaveSize(2);

    let actual1stAnswer = actualMission?.answers[0];
    expect(actual1stAnswer?.task).toBe(my1stTask);
    expect(actual1stAnswer?.answer).toBe(11);

    let actual2ndAnswer = actualMission?.answers[1];
    expect(actual2ndAnswer?.task).toBe(my2ndTask);
    expect(actual2ndAnswer?.answer).toBe(22);

    // ignore the remaining stuff (the start and solve(once) test)
  });

  it('should solve two tasks', () => {
    startServiceWithTestFixture();

    const my1stTask = mockMultTask(1);
    service.solveTask(my1stTask, 11);
    const my2ndTask = mockMultTask(2);
    service.solveTask(my2ndTask, 22);
    const my3rdTask = mockMultTask(3);
    service.solveTask(my3rdTask, 33);

    // We do NOT assert the navigation here,
    // thus nothing special is expected here...

    // all three answers should be recognized
    let actualMission = service.mission;
    expect(actualMission?.answers).toHaveSize(3);

    let actual1stAnswer = actualMission?.answers[0];
    expect(actual1stAnswer?.task).toBe(my1stTask);
    expect(actual1stAnswer?.answer).toBe(11);

    let actual2ndAnswer = actualMission?.answers[1];
    expect(actual2ndAnswer?.task).toBe(my2ndTask);
    expect(actual2ndAnswer?.answer).toBe(22);

    let actual3rdAnswer = actualMission?.answers[2];
    expect(actual3rdAnswer?.task).toBe(my3rdTask);
    expect(actual3rdAnswer?.answer).toBe(33);

    // ignore the remaining stuff (the start and solve(once) test)
  });

  it('should navigate to the task page with a solved task', () => {
    startServiceWithTestFixture();

    service.solveTask(mockMultTask(1), 1);

    expect(routerSpy).toHaveBeenCalledWith(['/task']);
    expect(routerSpy).not.toHaveBeenCalledWith(['/result']);
  });

  it('should navigate to the task page with two solved tasks', () => {
    startServiceWithTestFixture();

    service.solveTask(mockMultTask(1), 1);
    service.solveTask(mockMultTask(2), 4);

    expect(routerSpy).toHaveBeenCalledWith(['/task']);
    expect(routerSpy).not.toHaveBeenCalledWith(['/result']);
  });

  it('should navigate to the RESULT page with three solved tasks', () => {
    startServiceWithTestFixture();

    service.solveTask(mockMultTask(1), 1);
    service.solveTask(mockMultTask(2), 4);
    service.solveTask(mockMultTask(3), 9);

    expect(routerSpy).toHaveBeenCalledWith(['/result']);
  });

  it('should restart (with two solved tasks)', () => {
    startServiceWithTestFixture();
    service.solveTask(mockMultTask(1), 1);
    service.solveTask(mockMultTask(2), 4);

    service.restart();
    // mission should be undefined (therewith the solutions lost, ...)
    expect(service.mission).toBeUndefined();
  });

});
