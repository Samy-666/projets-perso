import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { DataPerDepartementResponse } from "src/app/models/data-per-departement.model";


@Component({
    selector: 'app-data-per-departement-table',
    templateUrl: './data-per-departement-table.component.html',
    styleUrls: ['./data-per-departement-table.component.scss']
})

export class DataPerDepartementTableComponent implements OnInit {
    constructor() { }
   
    @Input() displayedColumns: string[] = []
    @Input() departementData: MatTableDataSource<DataPerDepartementResponse> = new MatTableDataSource<DataPerDepartementResponse>();

    ngOnInit(): void {
    }
}
