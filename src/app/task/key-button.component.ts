import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-key-button',
  templateUrl: './key-button.component.html',
  styleUrls: ['./key-button.component.css']
})
export class KeyButtonComponent {
  @Input() digit: string = '';
  @Output() clickEvent = new EventEmitter<string>();

  onClick() {
    this.clickEvent.emit(this.digit);
  }
}
