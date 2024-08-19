import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Region } from "src/app/models/region.model";

@Component({
    selector: 'app-region-selector',
    templateUrl: './region-selector.component.html',
    styleUrls: ['./region-selector.component.scss']
})
export class AppRegionSelectorComponent {

    @Output() regionSelected = new EventEmitter<string>();
    @Input() regions: Region[] = [];

    selectedRegion: string = '';
    filteredRegions: Region[] = [];

    constructor() { }

    ngOnInit(): void {
        this.filteredRegions = this.regions;
    }



    onRegionSelected(region: string): void {
        this.regionSelected.emit(region);
    }
}
