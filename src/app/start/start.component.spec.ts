import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { StartComponent } from './start.component';
import { LifecycleService } from '../lifecycle.service';
import { Operation } from '../domain/operation';

describe('StartComponent', () => {
  let component: StartComponent;
  let fixture: ComponentFixture<StartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartComponent],
      imports: [FormsModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(StartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be startable with selected operations', () => {
    // get all checkboxes
    fixture.nativeElement.querySelectorAll("input[type='checkbox']")
      .forEach((c: any) => {
        const checkbox: HTMLInputElement = (c as HTMLInputElement);
        // select: the tester should click, if it is NOT checked
        if (!checkbox.checked) {
          checkbox.click();
        }
      })
    fixture.detectChanges();
    // now, the excercise should be startable
    expect(component.isStartable()).toBeTrue();
    // and the button should be enabled as well
    expect(getStartButton().disabled).toBeFalse();
  });

  function unselectAllCheckboxes(): void {
    // get all checkboxes
    fixture.nativeElement.querySelectorAll("input[type='checkbox']")
      .forEach((c: any) => {
        const checkbox: HTMLInputElement = (c as HTMLInputElement);
        // unselect: the tester should click, if it is checked
        if (checkbox.checked) {
          checkbox.click();
        }
      })
  }

  function getStartButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector("button") as HTMLButtonElement;
  }

  it('should NOT be startable with unselected operations', () => {
    unselectAllCheckboxes();
    fixture.detectChanges();
    // now, the excercise should NOT be startable
    expect(component.isStartable()).toBeFalse();
    // and the button should be disabled as well
    expect(getStartButton().disabled).toBeTrue();
  });

  it('should start accordingly', () => {
    unselectAllCheckboxes();
    // re-select the MULTIPLY checkbox
    fixture.nativeElement.querySelectorAll("input[type='checkbox']")
      .forEach((c: any) => {
        const checkbox: HTMLInputElement = (c as HTMLInputElement);
        if (checkbox.name.includes('Multiplikation')) {
          checkbox.click();
        }
      })

    // set the number input fields
    fixture.nativeElement.querySelectorAll("input[type='number']")
      .forEach((i: any) => {
        const input: HTMLInputElement = (i as HTMLInputElement);
        if (input.id == "taskCount") {
          input.value = "25";
          input.dispatchEvent(new Event('input'));
        }
        if (input.id == "operandMax") {
          input.value = "15";
          input.dispatchEvent(new Event('input'));
        }
      });
    fixture.detectChanges();

    // spy at LifecycleService.start(...)
    let serviceSpy = spyOn(TestBed.inject(LifecycleService), 'start');
    // click the button (which should not be disabled)
    const button: HTMLButtonElement = getStartButton();
    expect(button.disabled).toBeFalse();
    button.click();
    // and verify, that the service is called accordingly
    expect(serviceSpy).toHaveBeenCalledOnceWith(25, [Operation.MULTIPLICATION], 15);
  });

});
