import { Component, OnInit, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';
import * as turf from '@turf/turf';
import { Feature, GeoJsonProperties, Point, Polygon } from 'geojson';
import { ColorService } from '../../services/color.service';
import { SharedDataService } from '../../services/shared-data.service';
import { Subscription } from 'rxjs';
import { AverageCalcService } from './utils/averaga-calc.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  map!: mapboxgl.Map;
  hoveredStateId: string | number | undefined = undefined;
  geoJsonData: any;
  colorStops: any;
  propertyName: string | undefined;
  regionHighlightSubscription: Subscription | undefined;
  ratingData: any;
  mode: string | undefined;
  departmentHighlightSubscription: Subscription | undefined;


  constructor(
    private http: HttpClient,
    private colorService: ColorService,
    private sharedDataService: SharedDataService,
    private averageCalc: AverageCalcService
  ) { }

  ngOnInit() {
    this.sharedDataService.geoJsonData$.subscribe(data => {
      this.geoJsonData = data;
      if (this.geoJsonData) {
        this.initializeMap();
      }
    });

    this.sharedDataService.colorStops$.subscribe(stops => {
      this.colorStops = stops;
      this.updateColors(this.colorStops);
    });

    this.sharedDataService.propertyName$.subscribe(name => {
      this.propertyName = name;

    });

    this.sharedDataService.modeName$.subscribe(modeName => {
      this.mode = modeName;
    });

    this.regionHighlightSubscription = this.sharedDataService.regionHighlight$.subscribe(regionId => {
      if (regionId !== null) {
        this.highlightRegionOnMap(regionId);
      }
    });

    this.sharedDataService.zoomToDepartment$.subscribe(department => {
      if (department !== null) {
        this.fitBoundsToDepartment(department);
      }
    });

    this.departmentHighlightSubscription = this.sharedDataService.departmentHighlight$.subscribe(departmentId => {
      if (departmentId !== null) {
        this.highlightDepartmentOnMap(departmentId);
      }
    });

    


    if(this.mode = "classement") this.loadRatingData();

  }

  ngOnDestroy(): void {
    if (this.regionHighlightSubscription) {
      this.regionHighlightSubscription.unsubscribe();
    }
    this.removeMapInteractions('regions');
    this.removeMapInteractions('departments');
    this.removeMapInteractions('communes');
  }

  initializeMap() {
    (mapboxgl as any).accessToken = 'pk.eyJ1Ijoic2hpbm90b3JpOTU0IiwiYSI6ImNseTByODh1ZjBobDMyanBkdDI1c3Ixc2QifQ.mgDLFPrUmkpBirsCHt1Q3Q';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [2.2137, 46.2276],
      zoom: -10,
      minZoom: 0, // Zoom minimum
      maxZoom: 10, // Zoom maximum
      maxBounds: [
        [-6.0, 41.0],
        [13.5, 52.5]
      ]
    });

    this.map.on('load', () => {
      this.removeDefaultLabels();
      if (this.geoJsonData) {
        this.addMapSourceAndLayer(this.geoJsonData, 'regions');
        this.addLabelsLayer('regions-labels', 'nom', 'regions');
        this.map.resize();
        this.addMapInteractions('regions');
      } else {
        console.error('GeoJSON data not available');
      }
    });
  }

  loadRatingData() {
    this.http.get('/assets/mock-data/ratingDataset.json').subscribe((data: any) => {
      this.ratingData = data;
    });
  }

  fitBoundsToDepartment(department: any) {
    const bounds = new mapboxgl.LngLatBounds();
    this.extendBounds(bounds, department.geometry.coordinates, department.geometry.type);
    this.map.fitBounds(bounds, { padding: 20 });
    this.map.scrollZoom.disable(); // Lock the zoom
  }

  highlightRegionOnMap(regionId: number) {
    const sourceId = 'regions';
    if (this.map.getSource(sourceId)) {
      this.map.setFeatureState(
        { source: sourceId, id: regionId },
        { hover: true }
      );
      const feature = this.geoJsonData.features.find((f: any) => f.id === regionId);
      if (feature) {
        const bounds = new mapboxgl.LngLatBounds();
        this.extendBounds(bounds, feature.geometry.coordinates, feature.geometry.type);
        this.map.fitBounds(bounds, { padding: 20 });
  
        feature.layer = { id: `${sourceId}-layer` };
  
        this.onLayerClick({ features: [feature] } as any, sourceId);
        console.log(feature.properties);
        this.sharedDataService.setSelectedRegion(feature.properties);
        this.sharedDataService.setLoadingDepartments(true);
        this.sharedDataService.updateBreadcrumb([feature.properties.nom]);
  
        const regionName = this.formatRegionName(feature.properties.nom);
        const departmentsURL = `https://france-geojson.gregoiredavid.fr/repo/regions/${regionName}/departements-${regionName}.geojson`;
        this.loadGeoJSON(departmentsURL, 'departments', 'nom');
      } else {
        console.error(`Feature with ID: ${regionId} not found`);
      }
    } else {
      console.error(`Source ${sourceId} not found`);
    }
  }

  highlightDepartmentOnMap(departmentId: number) {
    const sourceId = 'departments';
    if (this.map.getSource(sourceId)) {
      this.map.setFeatureState(
        { source: sourceId, id: departmentId },
        { hover: true }
      );
      const feature = this.geoJsonData.features.find((f: any) => f.id === departmentId);
      if (feature) {
        const bounds = new mapboxgl.LngLatBounds();
        this.extendBounds(bounds, feature.geometry.coordinates, feature.geometry.type);
        this.map.fitBounds(bounds, { padding: 20 });
  
        feature.layer = { id: `${sourceId}-layer` };
  
        this.onLayerClick({ features: [feature] } as any, sourceId);
        console.log("Selected Department:", feature.properties);
  
        this.sharedDataService.setSelectedDepartement(feature.properties);
        this.sharedDataService.setLoadingCommunes(true);
        const selectedRegion = this.sharedDataService.getSelectedRegion();
        if (selectedRegion) {
          this.sharedDataService.updateBreadcrumb([selectedRegion.nom, feature.properties.nom]);
        }
  
        const departmentCode = feature.properties.code;
        const departmentName = this.formatRegionName(feature.properties.nom);
        const communesURL = `https://france-geojson.gregoiredavid.fr/repo/departements/${departmentCode}-${departmentName}/communes-${departmentCode}-${departmentName}.geojson`;
        this.loadGeoJSON(communesURL, 'communes', 'nom');
      } else {
        console.error(`Feature with ID: ${departmentId} not found`);
      }
    } else {
      console.error(`Source ${sourceId} not found`);
    }
  }


  removeDefaultLabels() {
    this.map.getStyle().layers?.forEach((layer) => {
      if (layer.type === 'symbol' && layer.source === 'composite' && layer.layout?.['text-field']) {
        this.map.removeLayer(layer.id);
      }
    });
  }

  addMapSourceAndLayer(data: any, sourceId: string) {
    try {
      this.map.addSource(sourceId, {
        type: 'geojson',
        data: data
      });
    } catch (error) {
      console.error(`Failed to add source ${sourceId}:`, error);
    }

    try {
      
      this.map.addLayer({
        id: `${sourceId}-layer`,
        type: 'fill',
        source: sourceId,
        layout: {},
        paint: {
          'fill-color': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            '#ffffff',
            [
              'interpolate',
              ['linear'],
              ['get', this.propertyName],
              ...this.colorStops
            ]
          ],
          'fill-opacity': 0.8
        }
      });

      this.map.addLayer({
        id: `${sourceId}-borders`,
        type: 'line',
        source: sourceId,
        layout: {},
        paint: {
          'line-color': '#000',
          'line-width': 0.8
        }
      });
    } catch (error) {
      console.error(`Failed to add layer for source ${sourceId}:`, error);
    }
  }


  addLabelsLayer(layerId: string, textField: string, sourceId: string) {
    const data = this.geoJsonData;
    const features = data.features as Feature<Point>[];

    const labels = features.map((feature: Feature) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: turf.center(feature).geometry.coordinates
      },
      properties: {
        [textField]: feature.properties![textField]
      }
    })) as Feature<Point, GeoJsonProperties>[];

    this.addGeoJSONSource(layerId, { type: 'FeatureCollection', features: labels });
    this.addSymbolLayer(layerId, textField, layerId);
  }

  addGeoJSONSource(sourceId: string, data: GeoJSON.FeatureCollection<GeoJSON.Geometry>) {
    this.removeLayerIfExists(sourceId);
    this.removeSourceIfExists(sourceId);

    this.map.addSource(sourceId, { type: 'geojson', data });
  }

  addSymbolLayer(layerId: string, textField: string, sourceId: string) {
    this.map.addLayer({
      id: layerId,
      type: 'symbol',
      source: sourceId,
      layout: {
        'text-field': ['get', textField],
        'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
        'text-size': 10,
        'text-anchor': 'center'
      },
      paint: {
        'text-color': '#000'
      }
    });
  }

  addMapInteractions(sourceId: string) {
    const clickHandler = (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
      if (e['features'] && e['features'].length > 0) {
        this.onLayerClick(e, sourceId);
      } else {
        console.error('No features found on click');
      }
    };
  
    const mouseMoveHandler = (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => this.onMapMouseMove(e, sourceId);
  
    if (this.map.getSource(sourceId)) {
      this.map.on('click', `${sourceId}-layer`, clickHandler);
      this.map.on('mousemove', `${sourceId}-layer`, mouseMoveHandler);
    } else {
      console.error(`Source ${sourceId} does not exist when trying to add interactions.`);
    }
  }


  onLayerClick(e: mapboxgl.MapMouseEvent & mapboxgl.EventData, sourceId: string) {
    if (e['features'] && e['features'].length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      e['features'].forEach((feature: Feature<Polygon, GeoJsonProperties>) => {
        const coordinates = feature.geometry.coordinates;
        this.extendBounds(bounds, coordinates, feature.geometry.type);
      });
  
      this.map.fitBounds(bounds, { padding: 20 });
      // this.map.scrollZoom.disable();
  
      const feature = e['features'][0];
      const layerId = feature.layer.id;
  
      this.removeLayersAndSources();
  
      if (layerId === 'regions-layer') {
        const regionName = this.formatRegionName(feature.properties.nom);
        this.sharedDataService.setSelectedRegion(feature.properties);
        this.sharedDataService.updateBreadcrumb([feature.properties.nom]);
  
        const departmentsURL = `https://france-geojson.gregoiredavid.fr/repo/regions/${regionName}/departements-${regionName}.geojson`;
        this.loadGeoJSON(departmentsURL, 'departments', 'nom');
      } else if (layerId === 'departments-layer') {
        const departmentCode = feature.properties.code;
        const departmentName = this.formatRegionName(feature.properties.nom);
        this.sharedDataService.setSelectedDepartement(feature.properties);
  
        const selectedRegion = this.sharedDataService.getSelectedRegion();
        if (selectedRegion) {
          this.sharedDataService.updateBreadcrumb([selectedRegion.nom, feature.properties.nom]);
        }

        const communesURL = `https://france-geojson.gregoiredavid.fr/repo/departements/${departmentCode}-${departmentName}/communes-${departmentCode}-${departmentName}.geojson`;
        this.loadGeoJSON(communesURL, 'communes', 'nom');
      }
      else if(layerId === 'communes-layer') {
        this.sharedDataService.setSelectedCommunes(feature.properties)
        const selectedRegion = this.sharedDataService.getSelectedRegion();
        const selectedDepartement = this.sharedDataService.getSelectedDepartment();
        if (selectedRegion && selectedDepartement) {
          this.sharedDataService.updateBreadcrumb([selectedRegion.nom, selectedDepartement.nom,feature.properties.nom]);
        }
      }
    } else {
      console.error('No features found');
    }
  }
  


  extendBounds(bounds: mapboxgl.LngLatBounds, coordinates: any[], type: string) {
    if (type === 'Polygon') {
      coordinates.forEach((ring: any) => ring.forEach((coord: any) => bounds.extend(coord)));
    } else if (type === 'MultiPolygon') {
      coordinates.forEach((polygon: any) => polygon.forEach((ring: any) => ring.forEach((coord: any) => bounds.extend(coord))));
    }
  }

  formatRegionName(name: string) {
    return this.removeAccents(name).toLowerCase().replace(/\s+/g, '-').replace(/'/g, '-');
  }

  onMapMouseMove(e: mapboxgl.MapMouseEvent & mapboxgl.EventData, sourceId: string) {
    if (this.map.getSource(sourceId)) {
      this.map.getCanvas().style.cursor = 'pointer';
      if (e['features'] && e['features'].length > 0) {
        const featureId = e['features'][0].id;
        if (this.hoveredStateId !== undefined && this.hoveredStateId !== featureId) {
          this.map.setFeatureState(
            { source: sourceId, id: this.hoveredStateId },
            { hover: false }
          );
        }
        if (featureId !== undefined && featureId !== null && this.hoveredStateId !== featureId) {
          this.hoveredStateId = featureId;
          this.map.setFeatureState(
            { source: sourceId, id: this.hoveredStateId },
            { hover: true }
          );
        }
      }
    } else {
      console.error(`Source ${sourceId} not found during mouse move.`);
    }
  }



  updateColors(colorStops: any) {
    if (this.map && this.map.getLayer('regions-layer')) {
      this.map.setPaintProperty('regions-layer', 'fill-color', [
        'interpolate',
        ['linear'],
        ['get', this.propertyName],
        ...colorStops
      ]);
    }
  }


  loadGeoJSON(url: string, sourceId: string, labelField: string) {
    this.http.get(url).subscribe((data: any) => {
      console.log('sourceId LOAD GEO',sourceId)
    
      let cleanedData = this.cleanGeoJSON(data);
      let mockedGeojson = this.averageCalc.addMockData(cleanedData)
      if(sourceId == 'departments') this.sharedDataService.setDepartments(mockedGeojson.features);
      if(sourceId == 'communes') this.sharedDataService.setCommunes(mockedGeojson.features);
      this.geoJsonData = mockedGeojson;
      this.addMapSourceAndLayer(mockedGeojson, sourceId);
      this.addLabelsLayer(`${sourceId}-labels`, labelField, sourceId);
      this.addMapInteractions(sourceId);
    });
  }

  updateColorsForCommunes(communeGeoJSON: any) {
    if (this.map && this.map.getLayer('communes-layer')) {
      this.map.setPaintProperty('communes-layer', 'fill-color', [
        'interpolate',
        ['linear'],
        ['get', this.propertyName],
        ...this.colorStops
      ]);
    }
  }
  

  updateColorsForDepartments(departmentGeoJSON: any) {
    if (this.map && this.map.getLayer('departments-layer')) {
      this.map.setPaintProperty('departments-layer', 'fill-color', [
        'interpolate',
        ['linear'],
        ['get', this.propertyName],
        ...this.colorStops
      ]);
    }
  }

  cleanGeoJSON(data: any) {
    const uniqueFeatures: { [key: string]: any } = {};
    data.features.forEach((feature: any, index: number) => {
      const departmentCode = feature.properties.code;
      if (!uniqueFeatures[departmentCode]) {
        uniqueFeatures[departmentCode] = feature;
      } else {
        uniqueFeatures[departmentCode] = turf.union(uniqueFeatures[departmentCode], feature);
      }
      uniqueFeatures[departmentCode].id = index;
    });

    return {
      ...data,
      features: Object.values(uniqueFeatures)
    };
  }

  /// REMOVE ///
  removeLayersAndSources() {
    const mapStyle = this.map.getStyle();
    if (mapStyle) {
      const layersToRemove = mapStyle.layers?.filter(layer => layer.id.startsWith('regions') || layer.id.startsWith('departments')) || [];
      layersToRemove.forEach(layer => this.map.removeLayer(layer.id));

      const sourcesToRemove = Object.keys(mapStyle.sources).filter(sourceId => sourceId.startsWith('regions') || sourceId.startsWith('departments'));
      sourcesToRemove.forEach(sourceId => this.map.removeSource(sourceId));
    }
  }

  removeLayerIfExists(layerId: string) {
    if (this.map.getLayer(layerId)) {
      this.map.removeLayer(layerId);
    }
  }

  removeSourceIfExists(sourceId: string) {
    if (this.map.getSource(sourceId)) {
      this.map.removeSource(sourceId);
    }
  }

  removeAccents(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  
  removeMapInteractions(sourceId: string) {
    const clickHandler = (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => this.onLayerClick(e, sourceId);
    const mouseMoveHandler = (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => this.onMapMouseMove(e, sourceId);


    if (this.map.getSource(sourceId)) {
      this.map.off('click', `${sourceId}-layer`, clickHandler);
      this.map.off('mousemove', `${sourceId}-layer`, mouseMoveHandler);
    }
  }

}
