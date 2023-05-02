import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fetchData',
    pure: false
})
export class FetchDataPipe implements PipeTransform {

    constructor(private http: HttpClient) { }

    fetchedData: any = null
    fetchUrl = ''

    transform(url: string): any {
        if (url !== this.fetchUrl) {
            this.fetchUrl = url
            this.fetchedData = null
            this.http.get<any>(url).subscribe(data => {
                this.fetchedData = data
            })
        }

        return this.fetchedData
    }

}
