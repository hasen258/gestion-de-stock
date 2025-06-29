import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="unique-card">
      <div class="unique-card-title">{{ title }}</div>
      <div class="unique-card-message">{{ message }}</div>
    </div>
  `,
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() title: string = '';
  @Input() message: string = '';
} 