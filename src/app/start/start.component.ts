import { Component } from '@angular/core';
import { Operation } from '../domain/operation';
import { LifecycleService } from '../lifecycle.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {

  operations = [
    { "checked": true, "value": Operation.ADDITION, "name": "plus" },
    { "checked": true, "value": Operation.SUBTRACTION, "name": "minus" },
    { "checked": false, "value": Operation.MULTIPLICATION, "name": "mal" },
    { "checked": false, "value": Operation.DIVISION, "name": "durch" },
  ]
  taskCount: number = 5;
  operandMax: number = 10;

  constructor(private lifecycleService: LifecycleService) { };

  changeOpItem(opItem: any, event: any): void {
    opItem.checked = !opItem.checked;
  }

  getSelectedOperations(): Operation[] {
    return this.operations.filter(item => item.checked).map(item => item.value);
  }

  isStartable(): boolean {
    return this.getSelectedOperations().length > 0;
  }

  startTasks(): void {
    this.lifecycleService.start(
      this.taskCount,
      this.getSelectedOperations(),
      this.operandMax);
  }

}
