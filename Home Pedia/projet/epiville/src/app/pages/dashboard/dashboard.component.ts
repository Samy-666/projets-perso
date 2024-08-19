import { Component, OnInit } from "@angular/core";
import { dataPerCommuneResponse } from "src/app/models/data-per-commune.model";
import { ImmoDataService } from "src/app/services/immo-data.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit{
    private dataPerCommune: dataPerCommuneResponse[] = [];
    constructor(private immoDataService: ImmoDataService ) { 

    }
    ngOnInit(): void {
        console.log("it works")
    }


}
