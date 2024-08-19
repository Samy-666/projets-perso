import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { DataPerRegionService } from "../data-per-region.service";
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

@Component({
  selector: 'app-departement-comparator',
  templateUrl: './departement-comparator.component.html',
  styleUrls: ['./departement-comparator.component.scss']
})
export class DepartementComparatorComponent implements OnChanges {
  @Input() public departementList: string[] = [];
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
  public transformToNumber(value: string): number {
    return parseFloat(value.replace(/\s/g, ''));
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['departementList'] || changes['selectedFormat']) {
      this.resetData();
      this.loadData();
    }
  }

  loadData() {
    try {
      const dataObservables = this.departementList.map((departement: string) => {
        return this.dataPerRegionService.getDataByDepartement(departement);
      });


      Promise.all(dataObservables.map(obs => obs.toPromise())).then((dataList) => {
        dataList.forEach((data) => {
          this.densite.push(data.densite);
          this.labels.push(data.departement);
          this.animation.push(data.animation);
          this.culture.push((data.culture));
          this.environment.push(data.environnement);
          this.nb_habitant.push(this.transformToNumber(data.nb_habitant));
          this.population_active.push(this.transformToNumber(data.population_active));
          this.prix.push(this.transformToNumber(data.prix_m2));
          this.revenu.push(this.transformToNumber(data.revenu_moyen));
          this.taux_chomage.push(this.transformToNumber(data.taux_chomage));
          this.superficie.push(this.transformToNumber(data.superficie));
          this.securite.push(data.securite);
          this.vie_pratique.push(data.vie_pratique);
        });
        this.destroyCharts();

        // Créer les graphiques après avoir rempli les données
        this.createBarChart('animationChart', 'Animation', this.animation);
        this.createBarChart('cultureChart', 'Culture', this.culture);
        this.createBarChart('environmentChart', 'Environnement', this.environment);
        this.createBarChart('densiteChart', 'Densité', this.densite);
        this.createBarChart('nbHabitantChart', 'Nombre d\'Habitants', this.nb_habitant);
        this.createBarChart('populationActiveChart', 'Population Active', this.population_active);
        this.createBarChart('prixChart', 'Prix m²', this.prix);
        this.createBarChart('revenuChart', 'Revenu Moyen', this.revenu);
        this.createBarChart('tauxChomageChart', 'Taux de Chômage', this.taux_chomage);
        this.createBarChart('superficieChart', 'Superficie', this.superficie);
        this.createBarChart('viePratiqueChart', 'Vie Pratique', this.vie_pratique);
      });
    }
    catch (error) {
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
