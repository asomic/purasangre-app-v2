// environment
import { environment } from '../../../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Output, EventEmitter } from '@angular/core';

import { Plugins } from '@capacitor/core';

@Component({
    selector: 'app-clases-today',
    templateUrl: './clases-today.page.html',
    styleUrls: [ './clases-today.page.scss' ],
})
export class ClasesTodayPage {
    @Output() urlOutput = new EventEmitter<string>();

    public today: any = '';

    constructor(private http: HttpClient) { }

    addNewItem(value: string) {
        this.urlOutput.emit(value);
    }

    // Refresh
    doRefresh(event) {
        console.log('Begin async operation');

        this.ionViewDidEnter();

        setTimeout(() => {
            console.log('Async operation has ended');

            event.target.complete();
        }, 2000);
    }

    ionViewDidEnter() {
        Plugins.Storage.get({ key: 'authData' }).then((authData) => {
            const parsedData = JSON.parse(authData.value) as {
                token: string
            };
            const httpOptions = {
                headers: new HttpHeaders({ Authorization: `Bearer ${parsedData.token}` })
            };

            this.http.get(`${ environment.SERVER_URL }/today`, httpOptions)
            .subscribe((result: any) => {
                this.today = result.data;
            });
        });
    }
}
