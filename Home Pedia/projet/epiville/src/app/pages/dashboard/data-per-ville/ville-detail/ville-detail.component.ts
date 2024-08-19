import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { DataPerRegionService } from "../../data-per-region/data-per-region.service";
import { DataPerVilleResponse } from "src/app/models/data-per-ville.model";

@Component({
    selector: 'app-ville-detail',
    templateUrl: './ville-detail.component.html',
    styleUrls: ['./ville-detail.component.scss']
})
export class VilleDetailComponent implements OnChanges{
    @Input() selectedVille: string = '';
    public villeData: DataPerVilleResponse | undefined;
    constructor(private dataPerRegionService: DataPerRegionService ){}
    ngOnChanges(changes: SimpleChanges): void {
        if(changes['selectedVille']){
            this.dataPerRegionService.getDataByVille(this.selectedVille).subscribe((data) => {
                this.villeData = data;
                console.log(1, this.villeData)
            })
       
        }
    }
 

}