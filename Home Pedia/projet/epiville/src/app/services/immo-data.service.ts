import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GET_DATA_BY_COMMUNE } from '../config/app.config';
import { dataPerCommuneResponse } from '../models/data-per-commune.model';

@Injectable({
    providedIn: 'root'
})
export class ImmoDataService {
    constructor(private http: HttpClient) { }

    public getDataByCommune(commune: string): Observable<any> {
        return this.http.get<dataPerCommuneResponse[]>(`${environment.apiUrl}` + GET_DATA_BY_COMMUNE+ `${commune}`);
    }
}