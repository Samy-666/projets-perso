import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GET_DATA_BY_DEPARTEMENT, GET_DATA_BY_REGION, GET_DATA_BY_VILLE } from 'src/app/config/app.config';
import { DataPerDepartementResponse } from 'src/app/models/data-per-departement.model';
import { DataPerRegionResponse } from 'src/app/models/data-per-region.model';
import { DataPerVilleResponse } from 'src/app/models/data-per-ville.model';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class DataPerRegionService {
    constructor(private http: HttpClient) { }

    public getDataByRegion(region: string): Observable<any> {
        return this.http.get<DataPerRegionResponse[]>(`${environment.apiUrl}` + GET_DATA_BY_REGION+ `${region}`);
    }

    public getDataByDepartement(departement: string): Observable<any> {
        return this.http.get<DataPerDepartementResponse[]>(`${environment.apiUrl}` + GET_DATA_BY_DEPARTEMENT+ `${departement}`);
    }

    public getDataByVille(ville: string): Observable<any> {
        return this.http.get<DataPerVilleResponse[]>(`${environment.apiUrl}` + GET_DATA_BY_VILLE+ `${ville}`);
    }
}