import { TestBed } from '@angular/core/testing';

import { TaskProducerService } from './task-producer.service';
import { Operation } from './domain/operation';

describe('TaskProducerService', () => {
  let service: TaskProducerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskProducerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate random: (0,0)', () => {
    expect(service.getRandomInInterval({ lower: 0, higher: 0 })).toEqual(0);
  });

  it('should generate random: (1,1)', () => {
    expect(service.getRandomInInterval({ lower: 1, higher: 1 })).toEqual(1);
  });

  it('should generate random: (42,42)', () => {
    expect(service.getRandomInInterval({ lower: 42, higher: 42 })).toEqual(42);
  });

  it('should fail by generate random: (42,23)', () => {
    try {
      expect(service.getRandomInInterval({ lower: 42, higher: 23 }));
      fail("Expected config error!");
    } catch (error) {
      // expected
    }
  });

  it('should create add task 5+0', () => {
    expect(service.createTask({
      operation: Operation.ADDITION,
      lowerBoundary: 5,
      higherBoundary: 5
    })).toEqual({
      operation: Operation.ADDITION,
      operand1: 5,
      operand2: 0,
      result: 5
    });
  });

  it('should create sub task 5-0', () => {
    expect(service.createTask({
      operation: Operation.SUBTRACTION,
      lowerBoundary: 5,
      higherBoundary: 5
    })).toEqual({
      operation: Operation.SUBTRACTION,
      operand1: 5,
      operand2: 0,
      result: 5
    });
  });
});
