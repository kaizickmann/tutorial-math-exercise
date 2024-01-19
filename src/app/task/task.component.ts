import { Component, OnInit } from '@angular/core';
import { Task } from '../domain/task';
import { LifecycleService } from '../lifecycle.service';
import {EMPTY} from "rxjs";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  private EMPTY = "";

  task?: Task;
  userInput: string = this.EMPTY;

  constructor(private lifecycleService: LifecycleService) { }

  ngOnInit(): void {
    this.resetComponent();
  }

  resetComponent(): void {
    this.userInput = "";
    this.task = this.lifecycleService.getNextTask();
  }

  solved(): void {
    if (this.userInput) {
      let userAnswer: number = Number(this.userInput);
      if (isNaN(userAnswer)) {
        alert("Das kann ich nicht als Zahl erkennen: " + this.userInput);
        return;
      }
      if (!this.task) {
        // this should never occure (just a theoretical option)
        this.resetComponent();
        throw Error("Missing the answered task!");
      }
      // here, we go...
      this.lifecycleService.solveTask(this.task, userAnswer);
      this.resetComponent();
    }
  }

  addKey(keyClicked: string) {
    if (isNaN(+Number(keyClicked))) {
      this.userInput = this.EMPTY;
    } else {
      this.userInput += keyClicked;
    }
  }
}
