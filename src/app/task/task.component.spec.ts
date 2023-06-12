import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TaskComponent } from './task.component';
import { Operation } from '../domain/operation';
import { LifecycleService } from '../lifecycle.service';
import { Task } from '../domain/task';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskComponent],
      imports: [FormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function createTask(op1: number, op2: number, operation: Operation) {
    return {
      operand1: op1,
      operand2: op2,
      result: op1 + op2,
      operation: operation,
      startedAt: Date.now(),
    };
  }

  function findElement(selector: string): HTMLElement {
    return fixture.nativeElement.querySelector(selector) as HTMLElement;
  }

  it('should display the task', () => {
    // check without and with two different tasks

    component.task = undefined;
    fixture.detectChanges();
    expect(findElement(".task")).toBeNull();

    component.task = createTask(22, 9, Operation.ADDITION);
    fixture.detectChanges();
    expect(findElement(".task")).not.toBeNull();
    expect(findElement(".operand.one").textContent).toEqual("22");
    expect(findElement(".opcode.operation").textContent).toEqual("+");
    expect(findElement(".operand.two").textContent).toEqual("9");

    component.task = createTask(15, 8, Operation.MULTIPLICATION);
    fixture.detectChanges();
    expect(findElement(".task")).not.toBeNull();
    expect(findElement(".operand.one").textContent).toEqual("15");
    expect(findElement(".opcode.operation").textContent).toEqual("•");
    expect(findElement(".operand.two").textContent).toEqual("8");
  });

  it('resetComponent() should work', () => {
    // firstly, prepare the lifecycle service (mock the method as it is tested separate)
    const nextTask = createTask(11, 6, Operation.ADDITION);
    spyOn(TestBed.inject(LifecycleService), 'getNextTask').and.returnValue(nextTask);

    // set some valid component values
    component.task = createTask(30, 1, Operation.DIVISION);
    component.userInput = "30?";

    // here, we go...
    component.resetComponent();

    expect(component.task).toBe(nextTask);
    expect(component.userInput).toEqual("");
  });

  interface SolveSetup {
    serviceSpy: jasmine.Spy,
    resetSpy: jasmine.Spy,
    alertSpy: jasmine.Spy,
    task: Task,
  }

  function setupSolveTest(): SolveSetup {
    let setup = {
      // mock the lifecycle service (as it is tested sepearte)
      serviceSpy: spyOn(TestBed.inject(LifecycleService), 'solveTask'),
      resetSpy: spyOn(component, 'resetComponent'),
      alertSpy: spyOn(window, "alert"),
      task: createTask(30, 1, Operation.MULTIPLICATION),
    };
    // finally, set up the task
    component.task = setup.task;
    fixture.detectChanges();
    return setup;
  }

  it('should do nothing without input', () => {
    // common test setup for all solve-tests
    let setup = setupSolveTest();

    // provide no input
    // TODO: simulate the enter keypress...
    component.solved();

    expect(setup.alertSpy).not.toHaveBeenCalled();
    expect(setup.serviceSpy).not.toHaveBeenCalled();
    expect(setup.resetSpy).not.toHaveBeenCalled();
  });

  it('should alert with unparsable input', () => {
    // common test setup for all solve-tests
    let setup = setupSolveTest();

    const input: HTMLInputElement = findElement("input") as HTMLInputElement;
    // input "Keine Ahnung"
    input.value = "Keine Ahnung";
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    // TODO: simulate the enter keypress...
    component.solved();

    expect(setup.alertSpy).toHaveBeenCalledOnceWith("Das kann ich nicht als Zahl erkennen: Keine Ahnung");
    expect(setup.serviceSpy).not.toHaveBeenCalled();
    expect(setup.resetSpy).not.toHaveBeenCalled();
  });

  it('should solve the task with a number input', () => {
    // common test setup for all solve-tests
    let setup = setupSolveTest();

    const input: HTMLInputElement = findElement("input") as HTMLInputElement;
    // input "42"
    input.value = "42";
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    // TODO: simulate the enter keypress...
    component.solved();

    expect(setup.alertSpy).not.toHaveBeenCalled();
    expect(setup.serviceSpy).toHaveBeenCalledOnceWith(setup.task, 42);
    expect(setup.resetSpy).toHaveBeenCalledOnceWith();
  });

});
