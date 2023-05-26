import { Component } from '@angular/core';
import { Operation } from '../domain/operation';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {

  operations = [
    { "checked": true, "value": Operation.ADDITION, "name": "plus - Addition" },
    { "checked": true, "value": Operation.SUBTRACTION, "name": "minus - Subtraktion" },
    { "checked": false, "value": Operation.MULTIPLICATION, "name": "mal - Multiplikation" },
    { "checked": false, "value": Operation.DIVISION, "name": "durch - Division" },
  ]
  taskCount: number = 10;
  operandMax: number = 20;

  changeOpItem(opItem: any, event: any): void {
    opItem.checked = event.target.checked;
  }

  getSelectedOperations(): Operation[] {
    return this.operations.filter(item => item.checked).map(item => item.value);
  }

  isStartable(): boolean {
    return this.getSelectedOperations().length > 0;
  }

  startTasks(): void {


    for (let selectedName of this.operations.filter(item => item.checked).map(item => item.name)) {
      alert(selectedName);
    }
    alert("Anzahl der Aufgaben: " + this.taskCount);
    alert("maxOperator: " + this.operandMax);



  }

}
