import { TestBed } from '@angular/core/testing';

import { TaskProducerService } from './task-producer.service';
import { Operation } from './domain/operation';

describe('TaskProducerService', () => {
  let service: TaskProducerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskProducerService);
  });

  const ALL_OPS = [Operation.ADDITION, Operation.SUBTRACTION, Operation.MULTIPLICATION, Operation.DIVISION];

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getRandomInInterval(...) with only one possibility', () => {
    // with min=max-range: random does not care, result has to be absolutly predictable
    for (let i = 0; i < 5; i++) {
      expect(service.getRandomInInterval({ lower: 0, higher: 0 })).toEqual(0);
      expect(service.getRandomInInterval({ lower: 1, higher: 1 })).toEqual(1);
      expect(service.getRandomInInterval({ lower: 42, higher: 42 })).toEqual(42);
    }
  });

  it('getRandomInInterval(42,23) should fail (min>max)', () => {
    expect(() => service.getRandomInInterval({ lower: 42, higher: 23 }))
      .toThrow("lower boundary is greater than higher boundary");
  });

  it('getRandomInInterval(...) with real range', () => {
    let b0100 = { lower: 0, higher: 100 };
    spyOn(Math, 'random').and.returnValues(0.01, 0.42, 0.99, 0, 1);
    expect(service.getRandomInInterval(b0100)).toEqual(1);
    expect(service.getRandomInInterval(b0100)).toEqual(42);
    expect(service.getRandomInInterval(b0100)).toEqual(99);
    expect(service.getRandomInInterval(b0100)).toEqual(0);
    expect(service.getRandomInInterval(b0100)).toEqual(100);
  });

  it('getRandomOperationFrom(...) with only one possibility', () => {
    // with min=max-range: random does not care, result has to be absolutly predictable
    for (let i = 0; i < 5; i++) {
      expect(service.getRandomOperationFrom([Operation.ADDITION]))
        .toEqual(Operation.ADDITION);
      expect(service.getRandomOperationFrom([Operation.SUBTRACTION]))
        .toEqual(Operation.SUBTRACTION);
      expect(service.getRandomOperationFrom([Operation.MULTIPLICATION]))
        .toEqual(Operation.MULTIPLICATION);
      expect(service.getRandomOperationFrom([Operation.DIVISION]))
        .toEqual(Operation.DIVISION);
    }
  });

  it('getRandomOperationFrom(...) with real range', () => {
    let operations = [Operation.ADDITION, Operation.MULTIPLICATION, Operation.DIVISION];

    // mock random to return elements ...
    spyOn(Math, 'random').and.returnValues(
      // ...from left to right
      0.1, 0.5, 0.9,
      // ... and then from right to left
      0.8, 0.6, 0.3);

    // firstly, from left to right:
    expect(service.getRandomOperationFrom(operations))
      .toEqual(Operation.ADDITION);
    expect(service.getRandomOperationFrom(operations))
      .toEqual(Operation.MULTIPLICATION);
    expect(service.getRandomOperationFrom(operations))
      .toEqual(Operation.DIVISION);

    // secondly, from right to left
    expect(service.getRandomOperationFrom(operations))
      .toEqual(Operation.DIVISION);
    expect(service.getRandomOperationFrom(operations))
      .toEqual(Operation.MULTIPLICATION);
    expect(service.getRandomOperationFrom(operations))
      .toEqual(Operation.ADDITION);
  });

  function callServiceToCreateAllOperationTaskBetween0And100() {
    return service.createTask({
      operations: ALL_OPS,
      lowerBoundary: 0,
      higherBoundary: 100
    });
  }

  it('should create task 40+2', () => {
    // mock the random: first operation, 42 (=result), 40
    spyOn(Math, 'random').and.returnValues(0.1, 0.42, 0.4);
    let actual = callServiceToCreateAllOperationTaskBetween0And100();
    expect(actual.operation).toEqual(Operation.ADDITION);
    expect(actual.operand1).toEqual(40);
    expect(actual.operand2).toEqual(2);
    expect(actual.result).toEqual(42);
  });

  it('should create task 22-9', () => {
    // mock the random: second operation, 22, 13 (=result)
    spyOn(Math, 'random').and.returnValues(0.4, 0.22, 0.13);
    let actual = callServiceToCreateAllOperationTaskBetween0And100();
    expect(actual.operation).toEqual(Operation.SUBTRACTION);
    expect(actual.operand1).toEqual(22);
    expect(actual.operand2).toEqual(9);
    expect(actual.result).toEqual(13);
  });

  it('should create task 15*8', () => {
    // mock the random: third operation, 15, 8
    spyOn(Math, 'random').and.returnValues(0.7, 0.15, 0.08);
    let actual = callServiceToCreateAllOperationTaskBetween0And100();
    expect(actual.operation).toEqual(Operation.MULTIPLICATION);
    expect(actual.operand1).toEqual(15);
    expect(actual.operand2).toEqual(8);
    expect(actual.result).toEqual(120);
  });

  it('should create task 666:9', () => {
    // mock the random: fourth operation, 74 (=result),  9
    spyOn(Math, 'random').and.returnValues(0.9, 0.74, 0.09);
    let actual = callServiceToCreateAllOperationTaskBetween0And100();
    expect(actual.operation).toEqual(Operation.DIVISION);
    expect(actual.operand1).toEqual(666);
    expect(actual.operand2).toEqual(9);
    expect(actual.result).toEqual(74);
  });

});
