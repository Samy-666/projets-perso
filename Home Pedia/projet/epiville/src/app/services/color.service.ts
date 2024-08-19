import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private colorMappingSource = new BehaviorSubject<{ [key: string]: string }>({});
  colorMapping$ = this.colorMappingSource.asObservable();

  setColorMapping(mapping: { [key: string]: string }) {
    this.colorMappingSource.next(mapping);
  }

  generateColorMapping(regionAverages: { [key: string]: number }, minColor: string, maxColor: string) {
    const colorMapping: { [key: string]: string } = {};

    const notes = Object.values(regionAverages);
    const minNote = Math.min(...notes);
    const maxNote = Math.max(...notes);

    Object.keys(regionAverages).forEach(region => {
      const ratio = (regionAverages[region] - minNote) / (maxNote - minNote);
      colorMapping[region] = this.interpolateColor(minColor, maxColor, ratio);
    });

    this.setColorMapping(colorMapping);
  }

  private interpolateColor(color1: string, color2: string, factor: number): string {
    const hex = (color: string) => {
      color = color.slice(1);
      return [parseInt(color.slice(0, 2), 16), parseInt(color.slice(2, 4), 16), parseInt(color.slice(4, 6), 16)];
    };
    const [r1, g1, b1] = hex(color1);
    const [r2, g2, b2] = hex(color2);
    const r = Math.round(r1 + factor * (r2 - r1));
    const g = Math.round(g1 + factor * (g2 - g1));
    const b = Math.round(b1 + factor * (b2 - b1));
    return `rgb(${r},${g},${b})`;
  }

  generateColorStops(minPrice: number, maxPrice: number) {
    return [
      minPrice, '#00ff00', // Vert pour le prix minimum
      (minPrice + maxPrice) / 2, '#ffff00', // Jaune pour le prix moyen
      maxPrice, '#ff0000' // Rouge pour le prix maximum
    ];
  }

  generateColorStopsHabitant(communeGeoJSON: { features: any[] }) {
    const nbHabitants = communeGeoJSON.features.map(feature => feature.properties.nb_habitant);
    const minHabitant = Math.min(...nbHabitants);
    const maxHabitant = Math.max(...nbHabitants);

    return [
      minHabitant, '#00ff00', // Vert pour le nombre d'habitants minimum
      (minHabitant + maxHabitant) / 2, '#ffff00', // Jaune pour le nombre d'habitants moyen
      maxHabitant, '#ff0000' // Rouge pour le nombre d'habitants maximum
    ];
  }
}
