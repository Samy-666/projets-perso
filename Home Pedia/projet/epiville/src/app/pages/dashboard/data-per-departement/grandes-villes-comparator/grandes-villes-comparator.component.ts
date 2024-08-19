import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import {
  BarElement,
  registerables,
  BarController,
  CategoryScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  ChartTypeRegistry,
} from 'chart.js';
import { Chart } from 'chart.js';
import { DataPerRegionService } from "../../data-per-region/data-per-region.service";

@Component({
  selector: 'app-grandes-villes-comparator',
  templateUrl: './grandes-villes-comparator.component.html',
  styleUrls: ['./grandes-villes-comparator.component.scss']
})
export class GrandesVillesParDepartementsComparator implements OnChanges {
  @Input() public grandesVilles: string[] = [];
  @Input() selectedFormat: string = 'bar';

  public animation: any[] = [];
  public securite: any[] = [];
  public culture: any[] = [];
  public environment: any[] = [];
  public densite: any[] = [];
  public nb_habitant: any[] = [];
  public population_active: any[] = [];
  public prix: any[] = [];
  public revenu: any[] = [];
  public taux_chomage: any[] = [];
  public superficie: any[] = [];
  public vie_pratique: any[] = [];
  public labels: string[] = [];

  private charts: { [key: string]: Chart } = {};

  constructor(private dataPerRegionService: DataPerRegionService) {
    Chart.register(
      BarElement,
      BarController,
      CategoryScale,
      Decimation,
      Filler,
      Legend,
      Title,
      Tooltip,
    );
    Chart.register(...registerables);
  }

  public transformToNumber(value: string): number {
    return parseFloat(value.replace(/\s/g, ''));
  }

  resetData() {
    this.animation = [];
    this.securite = [];
    this.culture = [];
    this.environment = [];
    this.densite = [];
    this.nb_habitant = [];
    this.population_active = [];
    this.prix = [];
    this.revenu = [];
    this.taux_chomage = [];
    this.superficie = [];
    this.vie_pratique = [];
    this.labels = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['grandesVilles'] || changes['selectedFormat']) {
      this.resetData();
      this.loadData();
    }
  }

  loadData() {
    try {
      const dataObservables = this['grandesVilles'].map((ville: string) => {
        return this.dataPerRegionService.getDataByVille(ville);
      });

      Promise.all(dataObservables.map(obs => obs.toPromise())).then((dataList) => {
        dataList.forEach((data) => {
          this.densite.push(data.densite);
          this.labels.push(data.ville);
          this.animation.push(data.animation);
          this.culture.push(data.culture);
          this.securite.push(data.securite);
          this.environment.push(data.environnement);

          this.nb_habitant.push(data.nb_habitant !== null ? this.transformToNumber(data.nb_habitant) : null);
          this.population_active.push(data.population_active !== null ? this.transformToNumber(data.population_active) : null);
          this.prix.push(data.prix_m2 !== null ? this.transformToNumber(data.prix_m2) : null);
          this.revenu.push(data.revenu_moyen !== null ? this.transformToNumber(data.revenu_moyen) : null);
          this.taux_chomage.push(data.taux_chomage !== null ? this.transformToNumber(data.taux_chomage) : null);
          this.superficie.push(data.superficie !== null ? this.transformToNumber(data.superficie) : null);

          this.vie_pratique.push(data.vie_pratique);
        });

        this.destroyCharts();

        this.createBarChart('animationChart', 'Animation', this.animation);
        this.createBarChart('cultureChart', 'Culture', this.culture);
        this.createBarChart('environmentChart', 'Environnement', this.environment);
        this.createBarChart('nbHabitantChart', 'Nombre d\'Habitants', this.nb_habitant);
        this.createBarChart('viePratiqueChart', 'Vie Pratique', this.vie_pratique);
      });

    } catch (error) {
      console.error(error);
    }
  }

  destroyCharts() {
    for (const key in this.charts) {
      if (this.charts[key]) {
        this.charts[key].destroy();
      }
    }
    this.charts = {};
  }

  createBarChart(canvasId: string, label: string, data: any[]) {
    const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
    if (ctx) {
      if (this.charts[canvasId]) {
        this.charts[canvasId].destroy();
      }
      this.charts[canvasId] = new Chart(ctx, {
        type: this.selectedFormat as keyof ChartTypeRegistry,
        data: {
          labels: this.labels,
          datasets: [{
            label: label,
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
}
