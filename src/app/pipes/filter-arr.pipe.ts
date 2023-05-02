import { Pipe, PipeTransform } from '@angular/core';


interface Item {
    [key: string]: any
}

@Pipe({
    name: 'filterArr'
})
export class FilterArrPipe implements PipeTransform {

    transform<T extends Item>(items: T[], itemProps: keyof T, term: string): T[] {
        console.log('Filter Arr');
        const regExp = new RegExp(term, 'i')
        return items.filter(item => regExp.test(item[itemProps]))
    }

}
// keyof {name:string,balance:number} ====>   'name' | 'balance'