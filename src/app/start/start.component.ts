import {Component} from '@angular/core';
import {LifecycleService} from '../lifecycle.service';
import {StartChoice} from "./startChoice";
import {SaveChoiceService} from "./save-choice.service";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {

  choice: StartChoice = new StartChoice();

  constructor(private lifecycleService: LifecycleService, private saveChoiceService: SaveChoiceService) {
  };

  ngOnInit(): void {
    this.choice = this.saveChoiceService.choice;
  }

  changeOpItem(opItem: any, event: any): void {
    opItem.checked = !opItem.checked;
  }

  startTasks(): void {
    this.saveChoiceService.choice = this.choice;
    this.lifecycleService.start(
      this.choice.taskCount,
      this.choice.getSelectedOperations(),
      this.choice.operandMax);
  }

}
