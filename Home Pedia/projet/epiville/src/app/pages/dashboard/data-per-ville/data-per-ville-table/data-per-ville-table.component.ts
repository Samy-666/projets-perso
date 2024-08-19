import { Component, Input, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { DataPerVilleNoSqlResponse, DataPerVilleResponse } from "src/app/models/data-per-ville.model";


@Component({
    selector: 'app-data-per-ville-table',
    templateUrl: './data-per-ville-table.component.html',
    styleUrls: ['./data-per-ville-table.component.scss']
})

export class DataPerVilletTableComponent implements OnInit {
    constructor() { }
   
    @Input() displayedColumns: string[] = []
    @Input() villeData: MatTableDataSource<DataPerVilleNoSqlResponse> = new MatTableDataSource<DataPerVilleNoSqlResponse>();

    ngOnInit(): void {
    }
}
