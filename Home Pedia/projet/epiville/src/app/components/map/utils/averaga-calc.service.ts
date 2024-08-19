import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AverageCalcService {

  constructor() { }

  calculateCommuneRatings(communeGeoJSON: { features: any[]; } , ratingData: any[],) {
    
    communeGeoJSON.features.forEach(feature => {
      feature.properties.average_rating = parseFloat(this.generateRandomRating(2.5,5.0));
    });

    return communeGeoJSON;
  }

  generateRandomPrice(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  addMockData(communeGeoJSON: { features: any[]; }){
    communeGeoJSON.features.forEach(feature => {
      feature.properties.average_rating = parseFloat(this.generateRandomRating(2.5,5.0));
      feature.properties.prix_m2_max = this.generateRandomPrice(4000, 9000);
      feature.properties.prix_m2_min = this.generateRandomPrice(4000, feature.properties.prix_m2_max);
      feature.properties.nb_habitant = this.generateRandomPrice(4000, 800000);
      feature.properties.taux_chomage = this.generateRandomPrice(8, 20);
      feature.properties.population_active = this.generateRandomPrice(4000, feature.properties.nb_habitant);

      if (!feature.properties.theme_averages) {
        feature.properties.theme_averages = {};
      }
      feature.properties.theme_averages.culture =  this.generateRandomRating(2,5);
      feature.properties.theme_averages.animation = this.generateRandomRating(2,5);
      feature.properties.theme_averages.vie_pratique = this.generateRandomRating(2,5);
      feature.properties.theme_averages.environnement = this.generateRandomRating(2,5);
      feature.properties.theme_averages.security = this.generateRandomRating(2,5);
    });

    return communeGeoJSON;
  }

  generateRandomRating(min: number,max: number) {
    return (Math.random() * (max - min) + min).toFixed(1);
  }

  calculateDepartmentRatings(departmentGeoJSON: { features: any[]; } , ratingData: any[],) {
    if (!ratingData || ratingData.length === 0) {
      console.error('Rating data is not loaded.');
      return;
    }

    const ratingsList: { code_ville: any; average_rating: number; }[] = [];
    ratingData.forEach((field: { data: any[]; }) => {
      field.data.forEach(regionData => {
        regionData.villes.forEach((city: { code_ville: any; note: string; }) => {
          ratingsList.push({
            code_ville: city.code_ville,
            average_rating: parseFloat(city.note)
          });
        });
      });
    });

    departmentGeoJSON.features.forEach(feature => {
      const departmentCode = feature.properties.code;
      const departmentRatings = ratingsList.filter(rating => rating.code_ville === departmentCode);

      if (departmentRatings.length > 0) {
        const totalRating = departmentRatings.reduce((sum, rating) => sum + rating.average_rating, 0);
        const averageRating = totalRating / departmentRatings.length;
        feature.properties.average_rating = averageRating;
      } else {
        feature.properties.average_rating = null;
      }
    });

    

    return departmentGeoJSON;
  }

  
  calculateMinMaxPrices(features: any[]) {
    let minPrice = Infinity;
    let maxPrice = -Infinity;

    features.forEach(feature => {
      const min = feature.properties.prix_m2_min;
      const max = feature.properties.prix_m2_max;
      if (min < minPrice) {
        minPrice = min;
      }
      if (max > maxPrice) {
        maxPrice = max;
      }
    });

    return { minPrice, maxPrice };
  }

  addSimplifiedProperties(data: any) {
    data.features.forEach((feature: any) => {
      if (feature.properties && feature.properties.stats && feature.properties.stats['prix-m2']) {
        if (feature.properties.stats['prix-m2'].max !== undefined && feature.properties.stats['prix-m2'].min !== undefined) {
          feature.properties.prix_m2_max = feature.properties.stats['prix-m2'].max;
          feature.properties.prix_m2_min = feature.properties.stats['prix-m2'].min;
        } else {
          const randomMin = Math.random() * 1000;
          const randomMax = randomMin + Math.random() * 1000; // Assure que max est toujours supérieur à min
          feature.properties.prix_m2_max = randomMax;
          feature.properties.prix_m2_min = randomMin;
        }
      } else {
        const randomMin = Math.random() * 1000;
        const randomMax = randomMin + Math.random() * 1000; // Assure que max est toujours supérieur à min
        feature.properties.prix_m2_max = randomMax;
        feature.properties.prix_m2_min = randomMin;
      }
    });
    return data;
  }
}
