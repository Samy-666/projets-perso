import { Component, EventEmitter, Output } from "@angular/core";
import { FormatLabel } from "src/app/models/chart-format.model";

@Component({
    selector:'app-chart-format-selector',
    templateUrl:'./chart-format-selector.component.html',
    styleUrls:['./chart-format-selector.component.scss']
})

export class ChartFormatSelectorComponent{

    @Output() formatChange = new EventEmitter();
    constructor() {

    }

    public FormatChart: FormatLabel[] = [
        { id: 0, type: 'bar', name: 'Barre' },
        { id: 1, type: 'line', name: 'Ligne' },
        { id: 2, type: 'pie', name: 'Camembert' },
      ];
      public selectedFormat = this.FormatChart[0].type;


      onFormatChange(event: any): void {
        this.selectedFormat = event.value;
        this.formatChange.emit(this.selectedFormat);
      }
}