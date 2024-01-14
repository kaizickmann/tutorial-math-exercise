import {Injectable} from "@angular/core";
import {StartChoice} from "./startChoice";

/**
 * Intention is to save the choice across the navigations.
 */
@Injectable()
export class SaveChoiceService {

  private _choice: StartChoice = new StartChoice();

  get choice(): StartChoice {
    return this._choice;
  }

  set choice(value: StartChoice) {
    this._choice = value;
  }
}
