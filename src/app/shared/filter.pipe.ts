import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    console.log('filter');
    searchText = searchText.toLowerCase();
    return items.filter((item) => item.toLowerCase().includes(searchText));
  }
}
