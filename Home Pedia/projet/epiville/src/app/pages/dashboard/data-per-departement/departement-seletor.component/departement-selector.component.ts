import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Departement } from "../../../../models/departement.model";
@Component({
    selector: 'app-departement-selector',
    templateUrl: './departement-selector.component.html',
    styleUrls: ['./departement-selector.component.scss']
})
export class AppDepartementSelectorComponent {

    @Output() departementSelected = new EventEmitter<string>();
    @Input() departements: Departement[] = [];

    selectedDepartement: string = '';
    filteredDepartements: Departement[] = [];

    constructor() { }

    ngOnInit(): void {
        this.filteredDepartements = this.departements;
    }

    onDepartementSelected(departement: string): void {
        this.departementSelected.emit(departement);
    }
}