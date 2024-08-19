import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { DataPerDepartementResponse } from "src/app/models/data-per-departement.model";
import { Departement } from "src/app/models/departement.model";
import { DataPerRegionService } from "../data-per-region/data-per-region.service";

@Component({
    selector: 'app-data-per-departement',
    templateUrl: './data-per-departement.component.html',
    styleUrls: ['./data-per-departement.component.scss']
})

export class DataPerDepartementComponent {

    public grandesVilles: string[] = [];


    public grandesVillesParDepartements: { [key: string]: string[] } = {
        "ain": ["bourg-en-bresse", "oyonnax", "amberieu-en-bugey", "gex"],
        "aisne": ["laon", "saint-quentin", "soissons"],
        "allier": ["moulins", "vichy", "cusset"],
        "alpes-de-haute-provence": ["digne-les-bains", "manosque", "sisteron",],
        "hautes-alpes": ["gap", "briancon", "embrun"],
        "alpes-maritimes": ["nice", "cannes", "antibes"],
        "ardeche": ["annonay", "aubenas", "guilherand-granges"],
        "ardennes": ["charleville-mezieres", "sedan", "rethel"],
        "ariege": ["foix", "pamiers", "saint-girons"],
        "aube": ["troyes", "romilly-sur-seine", "nogent-sur-seine", "bar-sur-aube", "saint-andre-les-vergers", "sainte-savine", "la-chapelle-saint-luc", "pont-sainte-marie"],
        "aude": ["carcassonne", "narbonne", "limoux", "castelnaudary", "port-la-nouvelle", "gruissan"],
        "aveyron": ["rodez", "millau", "villefranche-de-rouergue", "saint-affrique"],
        "bouches-du-rhone": ["marseille", "aix-en-provence", "arles", "martigues", "aubagne", "istres", "salon-de-provence", "la-ciotat"],
        "calvados": ["caen", "lisieux", "herouville-saint-clair", "bayeux", "mondeville", "ifs", "falaise"],
        "cantal": ["aurillac", "mauriac"],
        "charente": ["angouleme", "cognac", "soyaux", "lisle-despagnac"],
        "charente-maritime": ["la-rochelle", "saintes", "rochefort", "royan"],
        "cher": ["bourges", "vierzon", "saint-amand-montrond", "aubigny-sur-nere"],
        "correze": ["brive-la-gaillarde", "tulle", "ussel", "malemort", "egletons", "ussac", "donzenac", "argentat"],
        "corse-du-sud": ["ajaccio", "porto-vecchio", "sartene", "propriano", "bonifacio", "alata", "grosseto-prugna", "zonza"],
        "cote-dor": ["dijon", "beaune", "chenove", "talant", "quetigny", "chevigny-saint-sauveur", "auxonne", "nuits-saint-georges"],
        "cotes-darmor": ["saint-brieuc", "lannion", "dinan", "lamballe", "guingamp", "plerin", "ploufragan", "perros-guirec"],
        "creuse": ["gueret", "aubusson", "sainte-feyre", "bourganeuf", "saint-vaury", "evaux-les-bains", "ahun"],
        "dordogne": ["perigueux", "bergerac", "sarlat-la-caneda", "coulounieix-chamiers", "trelissac", "terrasson-lavilledieu", "montpon-menesterol", "le-bugue"],
        "doubs": ["montbeliard", "pontarlier", "audincourt", "valentigney", "sochaux", "bethoncourt", "maiche"],
        "drome": ["valence", "montelimar", "romans-sur-isere", "bourg-les-valence", "pierrelatte", "saint-vallier", "livron-sur-drome", "portes-les-valence"],
        "essonne": ["corbeil-essonnes", "massy", "sainte-genevieve-des-bois", "savigny-sur-orge", "draveil", "viry-chatillon", "palaiseau"],
        "eure": ["evreux", "vernon", "louviers", "val-de-reuil", "bernay", "les andelys", "gisors", "pont-audemer"],
        "eure-et-loir": ["chartres", "dreux", "luce", "chateaudun", "nogent-le-rotrou", "mainvilliers", "vernouillet", "luisant"],
        "finistere": ["brest", "quimper", "concarneau", "morlaix", "douarnenez", "landerneau", "plougastel-daoulas", "guipavas"],
        "gard": ["nimes", "ales", "bagnols-sur-ceze", "beaucaire", "saint-gilles", "villeneuve-les-avignon", "vauvert", "uzes"],
        "haute-garonne": ["toulouse", "muret", "blagnac", "colomiers", "tournefeuille", "cugnaux", "ramonville-saint-agne", "balma"],
        "gers": ["auch", "condom", "eauze", "gimont", "lectoure", "mirande"],
        "gironde": ["bordeaux", "merignac", "pessac", "talence", "villenave-dornon", "begles", "gradignan", "saint-medard-en-jalles"],
        "haut-rhin": ["strasbourg", "mulhouse", "colmar", "saint-louis", "illzach", "wittenheim", "rixheim", "guebwiller"],
        "haute-corse": ["bastia", "corte", "calvi", "lile-rousse", "biguglia", "furiani", "lucciana", "penta-di-casinca"],
        "haute-loire": ["le-puy-en-velay", "monistrol-sur-loire", "brioude", "yssingeaux", "langeac", "sainte-sigolene", "brives-charensac", "chaspuzac"],
        "haute-marne": ["chaumont", "langres", "saint-dizier", "joinville", "bourbonne-les-bains", "nogent", "chalindrey", "villegusien-le-lac"],
        "haute-saone": ["vesoul", "lure", "hericourt", "luxueil-les-bains", "ronchamp", "faverney", "gray", "port-sur-saone"],
        "haute-savoie": ["annecy", "thonon-les-bains", "annecy-le-vieux", "cluses", "bonneville", "rumilly", "sallanches", "scionzier"],
        "haute-vienne": ["limoges", "saint-junien", "panazol", "couzeix", "isle", "bellac", "saint-yrieix-la-perche", "ambazac"],
        "hautes-pyrenees": ["tarbes", "lourdes", "bagneres-de-bigorre", "vic-en-bigorre", "soues", "pierrefitte-nestalas", "maubourguet", "arlac"],
        "hauts-de-seine": ["nanterre", "boulogne-billancourt", "courbevoie", "asnieres-sur-seine", "rueil-malmaison", "levallois-perret", "meudon", "gennevilliers"],
        "herault": ["montpellier", "beziers", "sete", "lodeve", "agde", "frontignan", "mauguio", "castelnau-le-lez"],
        "ille-et-vilaine": ["rennes", "saint-malo", "fougeres", "vitre", "cesson-sevigne", "bruz", "betton", "redon"],
        "indre": ["chateauroux", "issoudun", "deols", "la-chatre", "le-blanc", "arthon", "levroux", "valencay"],
        "indre-et-loire": ["tours", "joue-les-tours", "saint-cyr-sur-loire", "saint-pierre-des-corps", "chinon", "amarante", "montlouis-sur-loire", "loches"],
        "isere": ["grenoble", "saint-martin-dheres", "echirolles", "voiron", "vienne", "fontaine", "bourgoin-jallieu", "seyssinet-pariset"],
        "jura": ["lons-le-saunier", "dole", "saint-claude", "champagnole", "morez", "arbois", "tavaux", "poligny"],
        "landes": ["mont-de-marsan", "dax", "biscarrosse", "saint-paul-les-dax", "tarnos", "parentis-en-born", "mimizan", "capbreton"],
        "loir-et-cher": ["blois", "romorantin-lanthenay", "vendome", "montrichard", "contres", "mer", "montoire-sur-le-loir", "selles-sur-cher"],
        "loire": ["saint-etienne", "roanne", "firminy", "montbrison", "rive-de-gier", "le-chambon-feugerolles", "feurs", "saint-just-saint-rambert"],
        "loire-atlantique": ["nantes", "saint-nazaire", "saint-herblain", "reze", "saint-sebastien-sur-loire", "orvault", "vertou", "coueron"],
        "loiret": ["orleans", "fleury-les-aubrais", "olivet", "saint-jean-de-braye", "pithiviers", "montargis", "malesherbes", "gien"],
        "lot": ["cahors", "figeac", "gourdon", "souillac", "prayssac", "gramat", "biars-sur-cere", "saint-cere"],
        "lot-et-garonne": ["agen", "villeneuve-sur-lot", "marmande", "nerac", "le-passage", "sainte-livrade-sur-lot", "tonneins", "bon-encontre"],
        "lozere": ["mende", "florac", "marvejols", "langogne", "saint-chely-d'apcher", "chanac", "grandrieu", "la-canourgue"],
        "maine-et-loire": ["angers", "cholet", "saumur", "segre", "chemille", "chalonnes-sur-loire", "beaupreau", "trelaze"],
        "manche": ["cherbourg", "saint-lo", "granville", "equeurdreville-hainneville", "tourlaville", "coutances", "valognes", "avranches"],
        "marne": ["reims", "chalons-en-champagne", "epernay", "vitry-le-francois", "tinqueux", "mourmelon-le-grand", "fismes", "ay"],
        "mayenne": ["laval", "chateau-gontier", "mayenne", "evron", "craon", "ernee", "gorron", "ambrieres-les-vallees"],
        "meurthe-et-moselle": ["nancy", "vandoeuvre-les-nancy", "luneville", "pont-a-mousson", "toul", "longwy", "maxeville", "jarville-la-malgrange"],
        "meuse": ["bar-le-duc", "verdun", "commercy", "revigny-sur-ornain", "st-mihiel", "ligny-en-barrois", "vaucouleurs", "sampigny"],
        "morbihan": ["vannes", "lorient", "lanester", "pontivy", "ploemeur", "auray", "hennebont", "guidel"],
        "moselle": ["metz", "thionville", "montigny-les-metz", "sarreguemines", "forbach", "saint-avold", "hagondange", "woippy"],
        "nievre": ["nevers", "cosne-cours-sur-loire", "varennes-vauzelles", "clamecy", "decize", "la-charite-sur-loire", "imphy", "coulanges-les-nevers"],
        "nord": ["lille", "roubaix", "tourcoing", "dunkerque", "villeneuve-d'ascq", "valenciennes", "maubeuge", "wattrelos"],
        "oise": ["beauvais", "compiegne", "creil", "nogent-sur-oise", "senlis", "chantilly", "clermont", "crepy-en-valois"],
        "orne": ["alencon", "flers", "argentan", "l'aigle", "mortagne-au-perche", "bagnoles-de-l'orne", "domfront", "la-ferte-mace"],
        "pas-de-calais": ["calais", "boulogne-sur-mer", "arras", "lens", "lievin", "bethune", "henin-beaumont", "bruyeres"],
        "puy-de-dome": ["clermont-ferrand", "issoire", "riom", "thiers", "cournon-d'auvergne", "chamalieres", "gerzat", "pont-du-chateau"],
        "pyrenees-atlantiques": ["pau", "bayonne", "biarritz", "anglet", "orthez", "hendaye", "oleron-sainte-marie", "ustaritz"],
        "pyrenees-orientales": ["perpignan", "ceret", "thuir", "rivesaltes", "elne", "canet-en-roussillon", "saint-laurent-de-la-salanque", "ille-sur-tet"],
        "bas-rhin": ["strasbourg", "selestat", "haguenau", "saverne", "ostwald", "bischwiller", "illkirch-graffenstaden"],
        "rhone": ["lyon", "villeurbanne", "venissieux", "caluire-et-cuire", "saint-priest", "vaulx-en-velin", "decines-charpieu", "bron"],
        "saone-et-loire": ["macon", "chalons-sur-saone", "le-creusot", "montceau-les-mines", "autun", "paray-le-monial", "cluny", "tournus"],
        "sarthe": ["le-mans", "la-fleche", "sable-sur-sarthe", "allonnes", "change", "la-chapelle-saint-aubin", "arnage", "coulaines"],
        "savoie": ["chambery", "aix-les-bains", "albertville", "saint-jean-de-maurienne", "moutiers", "la-motte-servolex", "bassens", "ugine"],
        "paris": ["paris"],
        "seine-maritime": ["rouen", "le-havre", "dieppe", "fecamp", "sotteville-les-rouen", "saint-etienne-du-rouvray", "barentin", "elbeuf"],
        "seine-et-marne": ["melun", "meaux", "fontainebleau", "provins", "montereau-fault-yonne", "torcy", "chessy", "coulommiers"],
        "yvelines": ["versailles", "mantes-la-jolie", "trappes", "maurepas", "les mureaux", "poissy", "sartrouville", "saint-germain-en-laye"],
        "deux-sevres": ["niort", "bressuire", "parthenay", "melle", "thouars", "cerizay", "airvault", "saint-maixent-l'ecole"],
        "somme": ["amiens", "abbeville", "peronne", "ham", "longueau", "montdidier", "doullens", "albert"],
        "tarn": ["albi", "castres", "gaillac", "graulhet", "carmaux", "mazamet", "lavaur", "saint-sulpice"],
        "tarn-et-garonne": ["montauban", "moissac", "castelsarrasin", "caussade", "valence", "lauzerte", "beaumont-de-lomagne", "molieres"],
        "territoire-de-belfort": ["belfort", "valdoie", "danjoutin", "bavilliers", "beaucourt", "delle", "offemont", "grandvillars"],
        "val-d'oise": ["pontoise", "argenteuil", "sarcelles", "cergy", "franconville", "garges-les-gonesse", "gonesse", "goussainville"],
        "val-de-marne": ["creteil", "vitry-sur-seine", "champigny-sur-marne", "maisons-alfort", "saint-maur-des-fosses", "ivry-sur-seine", "fontenay-sous-bois", "joinville-le-pont"],
        "vaucluse": ["avignon", "carpentras", "orange", "cavaillon", "pertuis", "le-pontet", "l'isle-sur-la-sorgue", "sorgues"],
        "vendee": ["la-roche-sur-yon", "les sables-d'olonne", "challans", "fontenay-le-comte", "herbiers", "lucon", "montaigu", "pouzauges"],
        "vienne": ["poitiers", "chatellerault", "buxerolles", "montmorillon", "loudun", "jaunay-marigny", "neuville-de-poitou", "migennes"],
        "vosges": ["epinal", "saint-die-des-vosges", "gerardmer", "remiremont", "thaon-les-vosges", "golbey", "raon-l'etape", "vittel"],
        "yonne": ["auxerre", "sens", "joigny", "migenne", "tonnerre", "villeneuve-sur-yonne", "brienon-sur-armançon", "paron"],
    };


    public departements: Departement[] = [
        { id: 1, departement: 'ain' },
        { id: 2, departement: 'aisne' },
        { id: 3, departement: 'allier' },
        { id: 4, departement: 'alpes-de-haute-provence' },
        { id: 5, departement: 'alpes-maritimes' },
        { id: 6, departement: 'ardeche' },
        { id: 7, departement: 'ardennes' },
        { id: 8, departement: 'ariege' },
        { id: 9, departement: 'aube' },
        { id: 10, departement: 'aude' },
        { id: 11, departement: 'aveyron' },
        { id: 12, departement: 'bas-rhin' },
        { id: 13, departement: 'bouches-du-rhone' },
        { id: 14, departement: 'calvados' },
        { id: 15, departement: 'cantal' },
        { id: 16, departement: 'charente' },
        { id: 17, departement: 'charente-maritime' },
        { id: 18, departement: 'cher' },
        { id: 19, departement: 'correze' },
        { id: 20, departement: 'corse-du-sud' },
        { id: 21, departement: 'cote-dor' },
        { id: 22, departement: 'cotes-darmor' },
        { id: 23, departement: 'creuse' },
        { id: 24, departement: 'deux-sevres' },
        { id: 25, departement: 'dordogne' },
        { id: 26, departement: 'doubs' },
        { id: 27, departement: 'drome' },
        { id: 28, departement: 'essonne' },
        { id: 29, departement: 'eure' },
        { id: 30, departement: 'eure-et-loir' },
        { id: 31, departement: 'finistere' },
        { id: 32, departement: 'gard' },
        { id: 33, departement: 'gers' },
        { id: 34, departement: 'gironde' },
        { id: 35, departement: 'haut-rhin' },
        { id: 36, departement: 'haute-corse' },
        { id: 37, departement: 'haute-garonne' },
        { id: 38, departement: 'haute-loire' },
        { id: 39, departement: 'haute-marne' },
        { id: 40, departement: 'haute-saone' },
        { id: 41, departement: 'haute-savoie' },
        { id: 42, departement: 'haute-vienne' },
        { id: 43, departement: 'hautes-alpes' },
        { id: 44, departement: 'hautes-pyrenees' },
        { id: 45, departement: 'hauts-de-seine' },
        { id: 46, departement: 'herault' },
        { id: 47, departement: 'ile-et-vilaine' },
        { id: 48, departement: 'indre' },
        { id: 49, departement: 'indre-et-loire' },
        { id: 50, departement: 'isere' },
        { id: 51, departement: 'jura' },
        { id: 52, departement: 'landes' },
        { id: 53, departement: 'loir-et-cher' },
        { id: 54, departement: 'loire' },
        { id: 55, departement: 'loire-atlantique' },
        { id: 56, departement: 'loiret' },
        { id: 57, departement: 'lot' },
        { id: 58, departement: 'lot-et-garonne' },
        { id: 59, departement: 'lozere' },
        { id: 60, departement: 'maine-et-loire' },
        { id: 61, departement: 'manche' },
        { id: 62, departement: 'marne' },
        { id: 63, departement: 'mayenne' },
        { id: 64, departement: 'meurthe-et-moselle' },
        { id: 65, departement: 'meuse' },
        { id: 66, departement: 'morbihan' },
        { id: 67, departement: 'moselle' },
        { id: 68, departement: 'nievre' },
        { id: 69, departement: 'nord' },
        { id: 70, departement: 'oise' },
        { id: 71, departement: 'orne' },
        { id: 72, departement: 'pas-de-calais' },
        { id: 73, departement: 'puy-de-dome' },
        { id: 74, departement: 'pyrenees-atlantiques' },
        { id: 75, departement: 'pyrenees-orientales' },
        { id: 76, departement: 'rhone' },
        { id: 77, departement: 'saone-et-loire' },
        { id: 78, departement: 'sarthe' },
        { id: 79, departement: 'savoie' },
        { id: 80, departement: 'seine-et-marne' },
        { id: 81, departement: 'seine-maritime' },
        { id: 82, departement: 'seine-saint-denis' },
        { id: 83, departement: 'somme' },
        { id: 84, departement: 'tarn' },
        { id: 85, departement: 'tarn-et-garonne' },
        { id: 86, departement: 'territoire-de-belfort' },
        { id: 87, departement: 'val-doise' },
        { id: 88, departement: 'val-de-marne' },
        { id: 89, departement: 'var' },
        { id: 90, departement: 'vaucluse' },
        { id: 91, departement: 'vendee' },
        { id: 92, departement: 'vienne' },
        { id: 93, departement: 'vosges' },
        { id: 94, departement: 'yonne' },
        { id: 95, departement: 'yvelines' },];

    public displayedColumns: string[] = ['departement', 'population', 'superficie', 'densite', 'population_active', 'prix_m2', 'revenu_moyen', 'securite', 'taux_chomage', 'vie_pratique'];
    public departementData: MatTableDataSource<DataPerDepartementResponse> = new MatTableDataSource<DataPerDepartementResponse>();
    public selectedDepartement: string = '';
    public selectedDepartementData: any = {
        departement: '',
        securite: null,
        culture: null,
        animation: null,
        environnement: null,
        vie_pratique: null,
        nb_habitant: null,
        superficie: null,
        densite: null,
        population_active: null,
        taux_chomage: null,
        revenu_moyen: null,
        prix_m2: null,
        age_population: null,
    }
    public selectedDepartementDataFields: string[] = [];
    public departementList: string[] = []
    public selectedFormat: string = 'bar'
    constructor(private dataPerRegionService: DataPerRegionService) {

    }
    ngOnInit(): void {
        this.getData()
    }

    public getData(): void {
        this.departements.forEach(departement => {
            this.dataPerRegionService.getDataByDepartement(departement.departement).subscribe((data: DataPerDepartementResponse) => {
                this.departementData.data.push(data);
                this.departementData._updateChangeSubscription();
            });
        });
    }




    public onSelectDepartement(departement: any) {
        this.selectedDepartement = departement.departement
        this.selectedDepartementData = this.departementData.data.find(data => data.departement === departement.departement)!
        this.selectedDepartementDataFields = Object.keys(this.selectedDepartementData)
        this.selectedDepartementDataFields.shift();
        const departementName = this.selectedDepartementData.departement;
        this.grandesVilles = this.grandesVillesParDepartements[departementName].slice(0, 3)
    }

    public onUpdateFormatChange(format: any) {
        this.selectedFormat = format;
    }

}

