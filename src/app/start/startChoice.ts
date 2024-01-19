import {Operation} from "../domain/operation";

export class StartChoice {

  operations = [
    {"checked": true, "value": Operation.ADDITION, "name": "plus"},
    {"checked": true, "value": Operation.SUBTRACTION, "name": "minus"},
    {"checked": false, "value": Operation.MULTIPLICATION, "name": "mal"},
    {"checked": false, "value": Operation.DIVISION, "name": "durch"},
  ]
  taskCount: number = 5;
  operandMax: number = 10;

  getSelectedOperations(): Operation[] {
    return this.operations.filter(item => item.checked).map(item => item.value);
  }

  isStartable(): boolean {
    return this.getSelectedOperations().length > 0;
  }

}
