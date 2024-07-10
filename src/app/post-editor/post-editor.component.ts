import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-editor',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './post-editor.component.html',
  styleUrl: './post-editor.component.scss',
})
export class  PostEditorComponent {}
