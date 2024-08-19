import { Component, OnInit } from "@angular/core";
import { Region } from "src/app/models/region.model";
import { DataPerRegionService } from "./data-per-region.service";
import { DataPerRegionResponse } from "../../../models/data-per-region.model"
import { MatTableDataSource } from "@angular/material/table";

@Component({
    selector: 'app-data-per-region',
    templateUrl: './data-per-region.component.html',
    styleUrls: ['./data-per-region.component.scss']
})

export class DataPerRegionComponent implements OnInit {

    public regions: Region[] = [
        { id: 1, region: 'auvergne-rhone-alpes' },
        { id: 2, region: 'bourgogne-franche-comte' },
        { id: 3, region: 'bretagne' },
        { id: 4, region: 'centre-val-de-loire' },
        { id: 5, region: 'corse' },
        { id: 6, region: 'grand-est' },
        { id: 7, region: 'hauts-de-france' },
        { id: 8, region: 'ile-de-france' },
        { id: 9, region: 'normandie' },
        { id: 10, region: 'nouvelle-aquitaine' },
        { id: 11, region: 'occitanie' },
        { id: 12, region: 'pays-de-la-loire' },
        { id: 13, region: 'provence-alpes-cote-dazur' }
    ];

    public selectedFormat : string = 'bar';

    public displayedColumns: string[] = ['region', 'population', 'superficie', 'densite', 'population_active', 'prix_m2', 'revenu_moyen', 'securite', 'taux_chomage', 'vie_pratique'];
    public regionData: MatTableDataSource<DataPerRegionResponse> = new MatTableDataSource<DataPerRegionResponse>();
    public selectedRegion: string = '';
    public selectedRegionData : any = {
        region: '',
        securite: null,
        culture: null,
        animation: null,
        environnement:  null,
        vie_pratique: null,
        nb_habitant: null,
        superficie: null,
        densite: null,
        population_active: null,
        taux_chomage: null,
        revenu_moyen: null,
        prix_m2: null,
        age_population: null,
    }
    public selectedRegionDataFields : string[] = [];
    public departementList : string[]= []
    constructor(private dataPerRegionService: DataPerRegionService) {

    }
    ngOnInit(): void {
        this.getData()
    }

    public getData(): void {
        this.regions.forEach(region => {
            this.dataPerRegionService.getDataByRegion(region.region).subscribe((data: DataPerRegionResponse) => {
                this.regionData.data.push(data);
                this.regionData._updateChangeSubscription();
            });
        });
    }

    public onUpdateFormatChange(format:any){
        this.selectedFormat = format;
    }

    public departementPerRegion: { [key: string]: string[] } = {
        "auvergne-rhone-alpes": [
            "ain",
            "allier",
            "ardeche",
            "cantal",
            "drome",
            "isere",
            "loire",
            "haute-loire",
            "rhone",
            "savoie",
            "haute-savoie"
        ],
        "bourgogne-franche-comte": [
            "cote-dor",
            "doubs",
            "jura",
            "nievre",
            "haute-saone",
            "saone-et-loire",
            "territoire-de-belfort",
            "yonne"
        ],
        "bretagne": [
            "cotes-darmor",
            "finistere",
            "ille-et-vilaine",
            "morbihan"
        ],
        "centre-val-de-loire": [
            "cher",
            "eure-et-loir",
            "indre",
            "indre-et-loire",
            "loir-et-cher",
            "loiret"
        ],
        "corse": [
            "corse-du-sud",
            "haute-corse"
        ],
        "grand-est": [
            "ardennes",
            "aube",
            "bas-rhin",
            "haut-rhin",
            "haute-marne",
            "meurthe-et-moselle",
            "meuse",
            "moselle",
            "marne",
            "vosges"
        ],
        "hauts-de-france": [
            "aisne",
            "nord",
            "oise",
            "pas-de-calais",
            "somme"
        ],
        "ile-de-france": [
            "paris",
            "seine-et-marne",
            "yvelines",
            "essonne",
            "hauts-de-seine",
            "seine-saint-denis",
            "val-de-marne",
            "val-doise"
        ],
        "normandie": [
            "calvados",
            "eure",
            "manche",
            "orne",
            "seine-maritime"
        ],
        "nouvelle-aquitaine": [
            "charente",
            "charente-maritime",
            "correze",
            "creuse",
            "deux-sevres",
            "dordogne",
            "gironde",
            "landes",
            "lot-et-garonne",
            "pyrenees-atlantiques",
            "vienne",
            "haute-vienne"
        ],
        "occitanie": [
            "ariege",
            "aude",
            "aveyron",
            "gard",
            "haute-garonne",
            "gers",
            "herault",
            "lot",
            "lozere",
            "hautes-pyrenees",
            "tarn",
            "tarn-et-garonne"
        ],
        "pays-de-la-loire": [
            "loire-atlantique",
            "maine-et-loire",
            "mayenne",
            "sarthe",
            "vendee"
        ],
        "provence-alpes-cote-dazur": [
            "alpes-de-haute-provence",
            "alpes-maritimes",
            "bouches-du-rhone",
            "var",
            "vaucluse",
            "hautes-alpes"
        ]
    }


    public onSelectRegion(region: any) {
        this.selectedRegion = region.region
        this.selectedRegionData = this.regionData.data.find(data => data.region === region.region)!
        this.selectedRegionDataFields = Object.keys(this.selectedRegionData)
        this.selectedRegionDataFields.shift();
        this.departementList =this.departementPerRegion[region.region];
    }

}
