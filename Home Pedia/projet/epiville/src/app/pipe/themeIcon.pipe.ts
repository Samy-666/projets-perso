import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'themeIcon'
})
export class ThemeIconPipe implements PipeTransform {
  private themeIcons: { [key: string]: string } = {
    'animation': 'fa-solid fa-guitar',
    'culture': 'fa-solid fa-book-bookmark',
    'environnement': 'fa-solid fa-seedling',
    'security': 'fa-solid fa-lock',
    'vie-pratique': 'fa-solid fa-street-view',
  };

  transform(value: any): string {
    return this.themeIcons[value] || 'fa-question-circle';
  }
}
