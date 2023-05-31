import { Component } from '@angular/core';
import { Mission } from '../domain/mission';
import { LifecycleService } from '../lifecycle.service';
import { Answer } from '../domain/answer';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {

  constructor(private lifecycleService: LifecycleService) { }

  public content(): Mission | undefined {
    return this.lifecycleService.mission;
  }

  public answers(): Answer[] {
    return this.content()?.answers || [];
  }

  public styleFor(answer: Answer) : string{
    return this.isCorrect(answer) ? "correct" : "wrong";
  }

  public isCorrect(answer: Answer): boolean {
    return answer.answer == answer.task.result;
  }

}
