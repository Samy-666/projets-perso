import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private geoJsonDataSource = new BehaviorSubject<any>(null);
  geoJsonData$ = this.geoJsonDataSource.asObservable();

  private colorStopsSource = new BehaviorSubject<any>(null);
  colorStops$ = this.colorStopsSource.asObservable();

  private propertyNameSource = new BehaviorSubject<string | undefined>(undefined);
  propertyName$ = this.propertyNameSource.asObservable();

  
  private modeNameSource = new BehaviorSubject<string | undefined>(undefined);
  modeName$ = this.modeNameSource.asObservable();

  private regionHighlightSource = new BehaviorSubject<number | null>(null);
  regionHighlight$ = this.regionHighlightSource.asObservable();

  private departmentsSource = new BehaviorSubject<any[]>([]);
  departments$ = this.departmentsSource.asObservable();

  private loadingDepartmentsSource = new BehaviorSubject<boolean>(false);
  loadingDepartments$ = this.loadingDepartmentsSource.asObservable();

  private selectedRegionSource = new BehaviorSubject<any>(null);
  selectedRegion$ = this.selectedRegionSource.asObservable();

  private selectedDepartementSource = new BehaviorSubject<any>(null);
  selectedDepartement$ = this.selectedDepartementSource.asObservable();

  private selectedCommunesSource = new BehaviorSubject<any>(null);
  selectedCommunes$ = this.selectedCommunesSource.asObservable();

  private communesSource = new BehaviorSubject<any[]>([]);
  communes$ = this.communesSource.asObservable();

  private loadingCommunesSource = new BehaviorSubject<boolean>(false);
  loadingCommunes$ = this.loadingCommunesSource.asObservable();

  
  private departmentHighlightSource = new BehaviorSubject<number | null>(null);
  departmentHighlight$ = this.departmentHighlightSource.asObservable();

  private breadcrumbSource = new BehaviorSubject<string[]>([]);
  breadcrumb$ = this.breadcrumbSource.asObservable();

  getSelectedRegion() {
    return this.selectedRegionSource.getValue();
  }

  getSelectedDepartment() {
    return this.selectedDepartementSource.getValue();
  }

  getSelectedCommunes() {
    return this.selectedCommunesSource.getValue();
  }

  setGeoJsonData(data: any) {
    this.geoJsonDataSource.next(data);
  }

  setColorStops(stops: any) {
    this.colorStopsSource.next(stops);
  }

  setPropertyName(name: string) {
    this.propertyNameSource.next(name);
  }

  setModeName(modeName: string) {
    this.modeNameSource.next(modeName);
  }

  highlightRegion(regionId: number) {
    this.regionHighlightSource.next(regionId);
  }

  setDepartments(departments: any[]) {
    this.departmentsSource.next(departments);
    this.setLoadingDepartments(false);
  }

  highlightDepartment(departmentId: number) {
    this.departmentHighlightSource.next(departmentId);
  }

  setLoadingDepartments(isLoading: boolean) {
    this.loadingDepartmentsSource.next(isLoading);
  }

  setSelectedRegion(region: any) {
    console.log("Selected Region")
    console.log(region)
    this.selectedRegionSource.next(region);
  }

  setSelectedDepartement(region: any) {
    console.log(region)
    this.selectedDepartementSource.next(region);
  }

  setSelectedCommunes(region: any) {
    console.log("Selected Region")
    console.log(region)
    this.selectedRegionSource.next(region);
  }

  setCommunes(communes: any[]) {
    this.communesSource.next(communes);
    this.setLoadingCommunes(false);
  }

  setLoadingCommunes(isLoading: boolean) {
    this.loadingCommunesSource.next(isLoading);
  }
  updateBreadcrumb(breadcrumb: string[]) {
    this.breadcrumbSource.next(breadcrumb);
  }

  private zoomToDepartmentSource = new BehaviorSubject<any>(null);
zoomToDepartment$ = this.zoomToDepartmentSource.asObservable();

zoomToDepartment(department: any) {
  this.zoomToDepartmentSource.next(department);
}
}
