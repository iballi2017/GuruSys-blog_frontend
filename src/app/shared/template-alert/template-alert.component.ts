import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TemplateAlertType } from './template-alert-type';

@Component({
  selector: 'app-template-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './template-alert.component.html',
  styleUrl: './template-alert.component.scss',
})
export class TemplateAlertComponent {
  @Input() message: string = '';
  @Input() isClearBtn: boolean = false;
  @Input() type: number = TemplateAlertType.ERROR;
  @Output() onClearError: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    if (this.message) {
      setTimeout(() => {
        this.clearError();
      }, 3000);
    }
  }

  clearError() {
    this.onClearError.emit(true);
  }
}
