import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from '../../../../services/shared-data.service';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrls: ['./classement.component.scss']
})
export class ClassementComponent implements OnInit {
  regions: any[] = [];
  departments: any[] = [];
  communes: any[] = [];
  currentView: 'regions' | 'departments' | 'communes' | 'communesDetails' = 'regions';
  selectedRegion: any = null;
  selectedDepartment: any = null;
  selectedCommune: any = null;
  loadingDepartments = false;
  loadingCommunes = false;
  breadcrumb: string[] = [];

  constructor(private http: HttpClient, private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.http.get('/assets/updatedRegions.geojson').subscribe((data: any) => {
      this.breadcrumb = [];
      this.regions = data.features;
      this.addUniqueIds(this.regions);
      this.sharedDataService.setGeoJsonData(data);
      this.sharedDataService.setColorStops([2, '#ff0000', 3, '#ff8000', 4, '#ffff00', 5, '#00ff00']);
      this.sharedDataService.setPropertyName('average_rating');
      this.sharedDataService.setModeName('classement');
      this.currentView = 'regions';
    });

    this.sharedDataService.departments$.subscribe(departments => {
      console.log('departments', departments)
      this.departments = departments;
      this.currentView = 'departments';
    });

    this.sharedDataService.communes$.subscribe(communes => {
      this.communes = communes;
      this.currentView = 'communes';

    });

    this.sharedDataService.regionHighlight$.subscribe(regionId => {
      if (regionId !== null) {
        this.currentView = 'departments';
      }
    });

    this.sharedDataService.loadingDepartments$.subscribe(isLoading => {
      this.loadingDepartments = isLoading;
    });

    this.sharedDataService.loadingCommunes$.subscribe(isLoading => {
      this.loadingCommunes = isLoading;
    });

    this.sharedDataService.selectedRegion$.subscribe(region => {
      if (region) {
        console.log("Selected Region: ", region);
        if (typeof region.theme_averages === 'string') {
          region.theme_averages = JSON.parse(region.theme_averages);
        }
        if (typeof region.stats === 'string') {
          region.stats = JSON.parse(region.stats);
        }
        this.selectedRegion = region;
      }
    });

    this.sharedDataService.selectedDepartement$.subscribe(department => {
      if (department) {
        console.log("Selected Department: ", department);
        if (typeof department.theme_averages === 'string') {
          department.theme_averages = JSON.parse(department.theme_averages);
        }
        if (typeof department.stats === 'string') {
          department.stats = JSON.parse(department.stats);
        }
        this.selectedDepartment = department;
      }
    });

    this.sharedDataService.breadcrumb$.subscribe(breadcrumb => {
      console.log(breadcrumb)
      this.breadcrumb = breadcrumb;
    });
  }

  addUniqueIds(features: any[]) {
    features.forEach((feature, index) => {
      feature.id = index;
    });
  }

  highlightRegion(regionId: number): void {
    const selectedRegionData = this.regions.find(region => region.id === regionId);
    if (selectedRegionData) {
      this.selectedRegion = selectedRegionData.properties;
      if (typeof this.selectedRegion.theme_averages === 'string') {
        this.selectedRegion.theme_averages = JSON.parse(this.selectedRegion.theme_averages);
      }
      this.breadcrumb = [this.selectedRegion.nom];
      this.sharedDataService.highlightRegion(regionId);
      this.currentView = 'departments';
    }
  }

  highlightDepartment(departmentId: number): void {
    const selectedDepartmentData = this.departments.find(department => department.id === departmentId);
    if (selectedDepartmentData) {
      this.selectedDepartment = selectedDepartmentData.properties;
      if (typeof this.selectedDepartment.theme_averages === 'string') {
        this.selectedDepartment.theme_averages = JSON.parse(this.selectedDepartment.theme_averages);
      }
      this.breadcrumb = [this.selectedRegion.nom, this.selectedDepartment.nom];
      this.sharedDataService.highlightDepartment(departmentId);
      this.currentView = 'communes';
    }
  }

  highlightCommune(communeId: number): void {
    const selectedCommuneData = this.communes.find(commune => commune.id === communeId);
    if (selectedCommuneData) {
      this.selectedCommune = selectedCommuneData.properties;
      this.breadcrumb = [this.selectedRegion.nom, this.selectedDepartment.nom, this.selectedCommune.nom];
      this.currentView = 'communesDetails';
    }
  }

  goBack(): void {
    if (this.currentView === 'communes') {
      this.currentView = 'departments';
      this.sharedDataService.setGeoJsonData({ type: 'FeatureCollection', features: this.departments });
      this.breadcrumb.pop();
    } else if (this.currentView === 'departments') {
      this.currentView = 'regions';
      this.sharedDataService.setGeoJsonData({ type: 'FeatureCollection', features: this.regions });
      this.breadcrumb.pop();
    }
    this.sharedDataService.setModeName('classement');
  }

  navigateTo(index: number): void {
    if (index === 0) {
      this.goBackToRegions();
    } else if (index === 1) {
      this.goBackToDepartments();
    }
  }

  goBackToRegions(): void {
    this.currentView = 'regions';
    this.sharedDataService.setGeoJsonData({ type: 'FeatureCollection', features: this.regions });
    this.breadcrumb = [];
    this.sharedDataService.setModeName('classement');
  }

  goBackToDepartments(): void {
    this.currentView = 'departments';
    this.sharedDataService.setGeoJsonData({ type: 'FeatureCollection', features: this.departments });
    this.breadcrumb = [this.selectedRegion.nom];
    this.sharedDataService.setModeName('classement');
  }

  getThemeValue(value: unknown): number {
    return typeof value === 'number' ? value : parseFloat(value as string);
  }

  formatRegionName(name: string) {
    return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, '-').replace(/'/g, '-');
  }
}
