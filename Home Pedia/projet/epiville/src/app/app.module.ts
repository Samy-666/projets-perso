// MODULE CORE
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';


// COMPONENTS 
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavMapComponent } from './components/navmap/navmap.component';
import { MapComponent } from './components/map/map.component';
import { ClassementComponent } from './pages/app-map/components/classement/classement.component';
import { AppMapComponent } from './pages/app-map/app-map.component';
import { ImmobilierComponants } from './pages/app-map/components/immobilier/immobilier.component';
import { DemoEcoComponent } from './pages/app-map/components/demo-eco/demo-eco.component';
import { AppRegionSelectorComponent } from './pages/dashboard/data-per-region/region-selector.component/region-selector.component';
import { AppVilleSelectorComponent } from './pages/dashboard/data-per-ville/ville-selector.component/ville-selector.component';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { DataPerRegionComponent } from './pages/dashboard/data-per-region/data-per-region.component';
import { DataPerVilleComponent } from './pages/dashboard/data-per-ville/data-per-ville.component';
import { DataPerDepartementComponent } from './pages/dashboard/data-per-departement/data-per-departement.component';
import { AppDepartementSelectorComponent } from './pages/dashboard/data-per-departement/departement-seletor.component/departement-selector.component';
import { DepartementComparatorComponent } from './pages/dashboard/data-per-region/departement-comparator/departement-comparator.component';
import { DataPerDepartementTableComponent } from './pages/dashboard/data-per-departement/data-per-departement-table/data-per-departement-table.component';
import { DataPerRegionTableComponent } from './pages/dashboard/data-per-region/data-per-region-table/data-per-region-table.component';
import { GrandesVillesParDepartementsComparator } from './pages/dashboard/data-per-departement/grandes-villes-comparator/grandes-villes-comparator.component';
import { DataPerVilletTableComponent } from './pages/dashboard/data-per-ville/data-per-ville-table/data-per-ville-table.component';
import { VilleDetailComponent } from './pages/dashboard/data-per-ville/ville-detail/ville-detail.component';
import { ChartFormatSelectorComponent } from './pages/dashboard/utils/chart-format-selector/chart-format-selector.component';


// MODULE ANGULAR MATERIAL
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { ThemeIconPipe } from './pipe/themeIcon.pipe';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'carte/classement', pathMatch: 'full' },
      {
        path: 'carte',
        component: AppMapComponent,
        children: [
          { path: 'classement', component: ClassementComponent },
          { path: 'prix', component: ImmobilierComponants }, // Ajoutez le bon composant ici
          { path: 'demo-eco', component: DemoEcoComponent } 
        ]
      },
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full'  },
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    NavMapComponent,
    MapComponent,
    ClassementComponent,
    AppMapComponent,
    ThemeIconPipe,
    ImmobilierComponants,
    DemoEcoComponent,
    AppRegionSelectorComponent,
    AppVilleSelectorComponent,
    DashboardComponent,
    DataPerRegionComponent,
    DataPerVilleComponent,
    DataPerDepartementComponent,
    AppDepartementSelectorComponent,
    DepartementComparatorComponent,
    DataPerDepartementTableComponent,
    DataPerRegionTableComponent,
    GrandesVillesParDepartementsComparator,
    DataPerVilletTableComponent,
    VilleDetailComponent,
    ChartFormatSelectorComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatGridListModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

//     (mapboxgl as any).accessToken = 'pk.eyJ1Ijoic2hpbm90b3JpOTU0IiwiYSI6ImNseTByODh1ZjBobDMyanBkdDI1c3Ixc2QifQ.mgDLFPrUmkpBirsCHt1Q3Q';