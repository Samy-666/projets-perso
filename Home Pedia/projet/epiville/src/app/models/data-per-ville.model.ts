export interface DataPerVilleResponse {
    ville: string,
    securite: number | null,
    culture: number | null,
    animation: number | null,
    environnement: number | null,
    vie_pratique: number | null,
    nb_habitant: any
    superficie: any
    densite: any
    population_active: any
    taux_chomage: any
    revenu_moyen: any
    prix_m2: any
    age_population: any
}

export interface DataPerVilleNoSqlResponse  {
    Type_local: string,
    Commune: string,
    Prix_moyen_m2_commune: number,
    Valeur_fonciere_moyenne: number,
    Surface_reelle_bati_moyenne: number,
    Surface_terrain_moyenne: number,
    Prix_median_m2: number
    Valeur_fonciere_25e_percentile: number
    Valeur_fonciere_75e_percentile: number
    Nombre_transactions: number
    Date_mutation: string
    Nature_mutation: string
    Code_postal:string
    Surface_reelle_bati:number
    Nombre_pieces_principales: number
    Surface_terrain: number | null,
    Prix_m2: number
}