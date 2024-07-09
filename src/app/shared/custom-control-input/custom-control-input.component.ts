import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-control-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-control-input.component.html',
  styleUrl: './custom-control-input.component.scss',
})
export class CustomControlInputComponent {
  @Input() label!: string;
  @Input() type: 'text' | 'number' | 'email' | 'password' | 'date' | 'tel' =
    'text';
  @Input() id!: string;
  @Input() name!: string;
  @Input() ref!: string;
  @Input() showAsterik: boolean = true;
  @Input() errorMsg: string = 'This field is required';
  @Input() validationAttribute!: string[];
  @Input() required: boolean = false;
  @Input() email: boolean = false;
  @Input() value!: string;
}
