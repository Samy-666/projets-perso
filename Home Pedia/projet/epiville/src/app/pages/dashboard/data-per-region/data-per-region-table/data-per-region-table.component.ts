import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { DataPerRegionResponse } from "src/app/models/data-per-region.model";

@Component({
    selector: 'app-data-per-region-table',
    templateUrl: './data-per-region-table.component.html',
    styleUrls: ['./data-per-region-table.component.scss']
})

export class DataPerRegionTableComponent implements OnInit {
    constructor() { }
   
    public isReady = false;
    @Input() displayedColumns: string[] = []
    @Input() regionData: MatTableDataSource<DataPerRegionResponse> = new MatTableDataSource<DataPerRegionResponse>();

    ngOnInit(): void {
    }
}
