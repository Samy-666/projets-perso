import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Ville } from "src/app/models/ville.model";

@Component({
    selector: 'app-ville-selector',
    templateUrl: './ville-selector.component.html',
    styleUrls: ['./ville-selector.component.scss']
})
export class AppVilleSelectorComponent {

    @Input() villes: Ville[] = [];
    @Output() villeSelected = new EventEmitter<string>();
   
    selectedVille: string = '';
    filteredVilles: Ville[] = [];

    constructor() { }

    ngOnInit(): void {
        this.filteredVilles = this.villes;
    }

    onVilleSelected(ville: string): void {
        this.villeSelected.emit(ville);
    }
}