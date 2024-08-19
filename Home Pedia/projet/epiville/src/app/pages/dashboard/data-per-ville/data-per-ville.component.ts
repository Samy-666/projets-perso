import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { DataPerVilleNoSqlResponse, DataPerVilleResponse } from "src/app/models/data-per-ville.model";
import { Ville } from "src/app/models/ville.model";
import { DataPerRegionService } from "../data-per-region/data-per-region.service";
import { ImmoDataService } from "src/app/services/immo-data.service";

@Component({
    selector: 'app-data-per-ville',
    templateUrl: './data-per-ville.component.html',
    styleUrls: ['./data-per-ville.component.scss']
})

export class DataPerVilleComponent {
    public villesConnues = [
        "LYON 5EME",
        "LYON 2EME",
        "MARSEILLE 2EME",
        "MARSEILLE 4EME",
        "NANTES",
        "NICE",
        "PARIS 16",
        "PARIS 20",
        "MONTPELLIER",
        "BORDEAUX",
        "LILLE"
    ]

    villes: Ville[] = [
        {
            id: "1",
            nom_ville: "gradignan",
            code_ville: "33"
        },
        {
            id: "2",
            nom_ville: "saint-prix",
            code_ville: "95"
        },
        {
            id: "3",
            nom_ville: "roscoff",
            code_ville: "29"
        },
        {
            id: "4",
            nom_ville: "gemenos",
            code_ville: "13"
        },
        {
            id: "5",
            nom_ville: "montevrain",
            code_ville: "77"
        },
        {
            id: "6",
            nom_ville: "beaucouze",
            code_ville: "49"
        },
        {
            id: "7",
            nom_ville: "paray-le-monial",
            code_ville: "71"
        },
        {
            id: "8",
            nom_ville: "magny-le-hongre",
            code_ville: "77"
        },
        {
            id: "9",
            nom_ville: "pacy-sur-eure",
            code_ville: "27"
        },
        {
            id: "10",
            nom_ville: "plan-de-cuques",
            code_ville: "13"
        },
        {
            id: "11",
            nom_ville: "entraigues-sur-la-sorgue",
            code_ville: "84"
        },
        {
            id: "12",
            nom_ville: "montaigu-vendee",
            code_ville: "85"
        },
        {
            id: "13",
            nom_ville: "saint-gilles-croix-de-vie",
            code_ville: "85"
        },
        {
            id: "14",
            nom_ville: "la-bourboule",
            code_ville: "63"
        },
        {
            id: "15",
            nom_ville: "gournay-sur-marne",
            code_ville: "93"
        },
        {
            id: "16",
            nom_ville: "velizy-villacoublay",
            code_ville: "78"
        },
        {
            id: "17",
            nom_ville: "blanquefort",
            code_ville: "33"
        },
        {
            id: "18",
            nom_ville: "carrieres-sur-seine",
            code_ville: "78"
        },
        {
            id: "19",
            nom_ville: "la-londe-les-maures",
            code_ville: "83"
        },
        {
            id: "20",
            nom_ville: "saint-gely-du-fesc",
            code_ville: "34"
        },
        {
            id: "21",
            nom_ville: "le-plessis-robinson",
            code_ville: "92"
        },
        {
            id: "22",
            nom_ville: "landerneau",
            code_ville: "29"
        },
        {
            id: "23",
            nom_ville: "baud",
            code_ville: "56"
        },
        {
            id: "24",
            nom_ville: "nogent-sur-seine",
            code_ville: "10"
        },
        {
            id: "25",
            nom_ville: "ifs",
            code_ville: "14"
        },
        {
            id: "26",
            nom_ville: "cesson",
            code_ville: "77"
        },
        {
            id: "27",
            nom_ville: "lieusaint",
            code_ville: "77"
        },
        {
            id: "28",
            nom_ville: "saint-loubes",
            code_ville: "33"
        },
        {
            id: "29",
            nom_ville: "saint-cheron",
            code_ville: "91"
        },
        {
            id: "30",
            nom_ville: "blere",
            code_ville: "37"
        },
        {
            id: "31",
            nom_ville: "saint-etienne-de-montluc",
            code_ville: "44"
        },
        {
            id: "32",
            nom_ville: "houdan",
            code_ville: "78"
        },
        {
            id: "33",
            nom_ville: "illkirch-graffenstaden",
            code_ville: "67"
        },
        {
            id: "34",
            nom_ville: "servian",
            code_ville: "34"
        },
        {
            id: "35",
            nom_ville: "pont-labbe",
            code_ville: "29"
        },
        {
            id: "36",
            nom_ville: "aizenay",
            code_ville: "85"
        },
        {
            id: "37",
            nom_ville: "bondues",
            code_ville: "59"
        },
        {
            id: "38",
            nom_ville: "la-grande-motte",
            code_ville: "34"
        },
        {
            id: "39",
            nom_ville: "viroflay",
            code_ville: "78"
        },
        {
            id: "40",
            nom_ville: "joinville-le-pont",
            code_ville: "94"
        },
        {
            id: "41",
            nom_ville: "culoz-beon",
            code_ville: "01"
        },
        {
            id: "42",
            nom_ville: "poisy",
            code_ville: "74"
        },
        {
            id: "43",
            nom_ville: "maule",
            code_ville: "78"
        },
        {
            id: "44",
            nom_ville: "saint-germain-en-laye",
            code_ville: "78"
        },
        {
            id: "45",
            nom_ville: "châteaubriant",
            code_ville: "44"
        },
        {
            id: "46",
            nom_ville: "fontainebleau",
            code_ville: "77"
        },
        {
            id: "47",
            nom_ville: "vincennes",
            code_ville: "94"
        },
        {
            id: "48",
            nom_ville: "tournefeuille",
            code_ville: "31"
        },
        {
            id: "49",
            nom_ville: "yerres",
            code_ville: "91"
        },
        {
            id: "50",
            nom_ville: "le-raincy",
            code_ville: "93"
        },
        {
            id: "51",
            nom_ville: "lisle-adam",
            code_ville: "95"
        },
        {
            id: "52",
            nom_ville: "lannilis",
            code_ville: "29"
        },
        {
            id: "53",
            nom_ville: "saint-renan",
            code_ville: "29"
        },
        {
            id: "54",
            nom_ville: "auriol",
            code_ville: "13"
        },
        {
            id: "55",
            nom_ville: "noisy-le-roi",
            code_ville: "78"
        },
        {
            id: "56",
            nom_ville: "voisins-le-bretonneux",
            code_ville: "78"
        },
        {
            id: "57",
            nom_ville: "cournon-dauvergne",
            code_ville: "63"
        },
        {
            id: "58",
            nom_ville: "le-relecq-kerhuon",
            code_ville: "29"
        },
        {
            id: "59",
            nom_ville: "bry-sur-marne",
            code_ville: "94"
        },
        {
            id: "60",
            nom_ville: "beauchamp",
            code_ville: "95"
        },
        {
            id: "61",
            nom_ville: "oye-plage",
            code_ville: "62"
        },
        {
            id: "62",
            nom_ville: "sevres",
            code_ville: "92"
        },
        {
            id: "63",
            nom_ville: "marcq-en-baroeul",
            code_ville: "59"
        },
        {
            id: "64",
            nom_ville: "courthezon",
            code_ville: "84"
        },
        {
            id: "65",
            nom_ville: "vaires-sur-marne",
            code_ville: "77"
        },
        {
            id: "66",
            nom_ville: "mennecy",
            code_ville: "91"
        },
        {
            id: "67",
            nom_ville: "chauny",
            code_ville: "02"
        },
        {
            id: "68",
            nom_ville: "bailly-romainvilliers",
            code_ville: "77"
        },
        {
            id: "69",
            nom_ville: "othis",
            code_ville: "77"
        },
        {
            id: "70",
            nom_ville: "saint-gratien",
            code_ville: "95"
        },
        {
            id: "71",
            nom_ville: "avion",
            code_ville: "62"
        },
        {
            id: "72",
            nom_ville: "nogent-sur-marne",
            code_ville: "94"
        },
        {
            id: "73",
            nom_ville: "montrouge",
            code_ville: "92"
        },
        {
            id: "74",
            nom_ville: "olivet",
            code_ville: "45"
        },
        {
            id: "75",
            nom_ville: "le-vesinet",
            code_ville: "78"
        },
        {
            id: "76",
            nom_ville: "bolbec",
            code_ville: "76"
        },
        {
            id: "77",
            nom_ville: "rocbaron",
            code_ville: "83"
        },
        {
            id: "78",
            nom_ville: "compiegne",
            code_ville: "60"
        },
        {
            id: "79",
            nom_ville: "neuilly-sur-seine",
            code_ville: "92"
        },
        {
            id: "80",
            nom_ville: "frelinghien",
            code_ville: "59"
        },
        {
            id: "81",
            nom_ville: "vitre",
            code_ville: "35"
        },
        {
            id: "82",
            nom_ville: "la-baule-escoublac",
            code_ville: "44"
        },
        {
            id: "83",
            nom_ville: "orsay",
            code_ville: "91"
        },
        {
            id: "84",
            nom_ville: "ploemeur",
            code_ville: "56"
        },
        {
            id: "85",
            nom_ville: "andresy",
            code_ville: "78"
        },
        {
            id: "86",
            nom_ville: "le-plessis-trevise",
            code_ville: "94"
        },
        {
            id: "87",
            nom_ville: "saint-maur-des-fosses",
            code_ville: "94"
        },
        {
            id: "88",
            nom_ville: "chambly",
            code_ville: "60"
        },
        {
            id: "89",
            nom_ville: "puteaux",
            code_ville: "92"
        },
        {
            id: "90",
            nom_ville: "tournan-en-brie",
            code_ville: "77"
        },
        {
            id: "91",
            nom_ville: "montbrison",
            code_ville: "42"
        },
        {
            id: "92",
            nom_ville: "carquefou",
            code_ville: "44"
        },
        {
            id: "93",
            nom_ville: "antony",
            code_ville: "92"
        },
        {
            id: "94",
            nom_ville: "la-gaude",
            code_ville: "06"
        },
        {
            id: "95",
            nom_ville: "draveil",
            code_ville: "91"
        },
        {
            id: "96",
            nom_ville: "lamorlaye",
            code_ville: "60"
        },
        {
            id: "97",
            nom_ville: "lanester",
            code_ville: "56"
        },
        {
            id: "98",
            nom_ville: "le-lavandou",
            code_ville: "83"
        },
        {
            id: "99",
            nom_ville: "vertou",
            code_ville: "44"
        },
        {
            id: "100",
            nom_ville: "le-plessis-bouchard",
            code_ville: "95"
        },
        {
            id: "101",
            nom_ville: "uzes",
            code_ville: "30"
        },
        {
            id: "102",
            nom_ville: "saint-cyprien",
            code_ville: "66"
        },
        {
            id: "103",
            nom_ville: "beaugency",
            code_ville: "45"
        },
        {
            id: "104",
            nom_ville: "saint-maurice",
            code_ville: "94"
        },
        {
            id: "105",
            nom_ville: "avranches",
            code_ville: "50"
        },
        {
            id: "106",
            nom_ville: "levallois-perret",
            code_ville: "92"
        },
        {
            id: "107",
            nom_ville: "eaubonne",
            code_ville: "95"
        },
        {
            id: "108",
            nom_ville: "villers-les-nancy",
            code_ville: "54"
        },
        {
            id: "109",
            nom_ville: "triel-sur-seine",
            code_ville: "78"
        },
        {
            id: "110",
            nom_ville: "sceaux",
            code_ville: "92"
        },
        {
            id: "111",
            nom_ville: "luçon",
            code_ville: "85"
        },
        {
            id: "112",
            nom_ville: "maizieres-les-metz",
            code_ville: "57"
        },
        {
            id: "113",
            nom_ville: "thouare-sur-loire",
            code_ville: "44"
        },
        {
            id: "114",
            nom_ville: "plouay",
            code_ville: "56"
        },
        {
            id: "115",
            nom_ville: "soisy-sous-montmorency",
            code_ville: "95"
        },
        {
            id: "116",
            nom_ville: "val-de-briey",
            code_ville: "54"
        },
        {
            id: "117",
            nom_ville: "thiais",
            code_ville: "94"
        },
        {
            id: "118",
            nom_ville: "meaux",
            code_ville: "77"
        },
        {
            id: "119",
            nom_ville: "granville",
            code_ville: "50"
        },
        {
            id: "120",
            nom_ville: "saint-amand-montrond",
            code_ville: "18"
        },
        {
            id: "121",
            nom_ville: "chassieu",
            code_ville: "69"
        },
        {
            id: "122",
            nom_ville: "charenton-le-pont",
            code_ville: "94"
        },
        {
            id: "123",
            nom_ville: "saint-mande",
            code_ville: "94"
        },
        {
            id: "124",
            nom_ville: "henin-beaumont",
            code_ville: "62"
        },
        {
            id: "125",
            nom_ville: "saint-sebastien-sur-loire",
            code_ville: "44"
        },
        {
            id: "126",
            nom_ville: "maisons-alfort",
            code_ville: "94"
        },
        {
            id: "127",
            nom_ville: "marseillan",
            code_ville: "34"
        },
        {
            id: "128",
            nom_ville: "saint-cyr-sur-loire",
            code_ville: "37"
        },
        {
            id: "129",
            nom_ville: "montlouis-sur-loire",
            code_ville: "37"
        },
        {
            id: "130",
            nom_ville: "lagny-sur-marne",
            code_ville: "77"
        },
        {
            id: "131",
            nom_ville: "chamalieres",
            code_ville: "63"
        },
        {
            id: "132",
            nom_ville: "beaune",
            code_ville: "21"
        },
        {
            id: "133",
            nom_ville: "saint-esteve",
            code_ville: "66"
        },
        {
            id: "134",
            nom_ville: "ceret",
            code_ville: "66"
        },
        {
            id: "135",
            nom_ville: "versailles",
            code_ville: "78"
        },
        {
            id: "136",
            nom_ville: "la-garde",
            code_ville: "83"
        },
        {
            id: "137",
            nom_ville: "vesoul",
            code_ville: "70"
        },
        {
            id: "138",
            nom_ville: "betton",
            code_ville: "35"
        },
        {
            id: "139",
            nom_ville: "wittenheim",
            code_ville: "68"
        },
        {
            id: "140",
            nom_ville: "mende",
            code_ville: "48"
        },
        {
            id: "141",
            nom_ville: "le-coudray-montceaux",
            code_ville: "91"
        },
        {
            id: "142",
            nom_ville: "sainte-luce-sur-loire",
            code_ville: "44"
        },
        {
            id: "143",
            nom_ville: "vannes",
            code_ville: "56"
        },
        {
            id: "144",
            nom_ville: "saint-jean-de-monts",
            code_ville: "85"
        },
        {
            id: "145",
            nom_ville: "collioure",
            code_ville: "66"
        },
        {
            id: "146",
            nom_ville: "clisson",
            code_ville: "44"
        },
        {
            id: "147",
            nom_ville: "erstein",
            code_ville: "67"
        },
        {
            id: "148",
            nom_ville: "vaison-la-romaine",
            code_ville: "84"
        },
        {
            id: "149",
            nom_ville: "trouville-sur-mer",
            code_ville: "14"
        },
        {
            id: "150",
            nom_ville: "pernes-les-fontaines",
            code_ville: "84"
        },
        {
            id: "151",
            nom_ville: "selestat",
            code_ville: "67"
        },
        {
            id: "152",
            nom_ville: "clamart",
            code_ville: "92"
        },
        {
            id: "153",
            nom_ville: "vittel",
            code_ville: "88"
        },
        {
            id: "154",
            nom_ville: "la-fleche",
            code_ville: "72"
        },
        {
            id: "155",
            nom_ville: "roche-la-moliere",
            code_ville: "42"
        },
        {
            id: "156",
            nom_ville: "digoin",
            code_ville: "71"
        },
        {
            id: "157",
            nom_ville: "anglet",
            code_ville: "64"
        },
        {
            id: "158",
            nom_ville: "les-herbiers",
            code_ville: "85"
        },
        {
            id: "159",
            nom_ville: "garches",
            code_ville: "92"
        },
        {
            id: "160",
            nom_ville: "le-barcares",
            code_ville: "66"
        },
        {
            id: "161",
            nom_ville: "pontchâteau",
            code_ville: "44"
        },
        {
            id: "162",
            nom_ville: "wambrechies",
            code_ville: "59"
        },
        {
            id: "163",
            nom_ville: "arras",
            code_ville: "62"
        },
        {
            id: "164",
            nom_ville: "toul",
            code_ville: "54"
        },
        {
            id: "165",
            nom_ville: "mandelieu-la-napoule",
            code_ville: "06"
        },
        {
            id: "166",
            nom_ville: "castelsarrasin",
            code_ville: "82"
        },
        {
            id: "167",
            nom_ville: "gif-sur-yvette",
            code_ville: "91"
        },
        {
            id: "168",
            nom_ville: "serignan",
            code_ville: "34"
        },
        {
            id: "169",
            nom_ville: "mornant",
            code_ville: "69"
        },
        {
            id: "170",
            nom_ville: "beynes",
            code_ville: "78"
        },
        {
            id: "171",
            nom_ville: "figeac",
            code_ville: "46"
        },
        {
            id: "172",
            nom_ville: "issoire",
            code_ville: "63"
        },
        {
            id: "173",
            nom_ville: "cambrai",
            code_ville: "59"
        },
        {
            id: "174",
            nom_ville: "marly-le-roi",
            code_ville: "78"
        },
        {
            id: "175",
            nom_ville: "blagnac",
            code_ville: "31"
        },
        {
            id: "176",
            nom_ville: "aix-les-bains",
            code_ville: "73"
        },
        {
            id: "177",
            nom_ville: "herouville-saint-clair",
            code_ville: "14"
        },
        {
            id: "178",
            nom_ville: "coutances",
            code_ville: "50"
        },
        {
            id: "179",
            nom_ville: "eragny",
            code_ville: "95"
        },
        {
            id: "180",
            nom_ville: "gaillac",
            code_ville: "81"
        },
        {
            id: "181",
            nom_ville: "mers-les-bains",
            code_ville: "80"
        },
        {
            id: "182",
            nom_ville: "gex",
            code_ville: "01"
        },
        {
            id: "183",
            nom_ville: "bois-le-roi",
            code_ville: "77"
        },
        {
            id: "184",
            nom_ville: "elancourt",
            code_ville: "78"
        },
        {
            id: "185",
            nom_ville: "noisy-le-grand",
            code_ville: "93"
        },
        {
            id: "186",
            nom_ville: "saint-laurent-de-la-salanque",
            code_ville: "66"
        },
        {
            id: "187",
            nom_ville: "feucherolles",
            code_ville: "78"
        },
        {
            id: "188",
            nom_ville: "montoir-de-bretagne",
            code_ville: "44"
        },
        {
            id: "189",
            nom_ville: "yutz",
            code_ville: "57"
        },
        {
            id: "190",
            nom_ville: "ablon-sur-seine",
            code_ville: "94"
        },
        {
            id: "191",
            nom_ville: "saint-leu-la-foret",
            code_ville: "95"
        },
        {
            id: "192",
            nom_ville: "nerac",
            code_ville: "47"
        },
        {
            id: "193",
            nom_ville: "dinan",
            code_ville: "22"
        },
        {
            id: "194",
            nom_ville: "poissy",
            code_ville: "78"
        },
        {
            id: "195",
            nom_ville: "ramonville-saint-agne",
            code_ville: "31"
        },
        {
            id: "196",
            nom_ville: "cestas",
            code_ville: "33"
        },
        {
            id: "197",
            nom_ville: "bruz",
            code_ville: "35"
        },
        {
            id: "198",
            nom_ville: "lambersart",
            code_ville: "59"
        },
        {
            id: "199",
            nom_ville: "pessac",
            code_ville: "33"
        },
        {
            id: "200",
            nom_ville: "le-perreux-sur-marne",
            code_ville: "94"
        },
        {
            id: "201",
            nom_ville: "sollies-pont",
            code_ville: "83"
        },
        {
            id: "202",
            nom_ville: "saint-medard-en-jalles",
            code_ville: "33"
        },
        {
            id: "203",
            nom_ville: "gruissan",
            code_ville: "11"
        },
        {
            id: "204",
            nom_ville: "decines-charpieu",
            code_ville: "69"
        },
        {
            id: "205",
            nom_ville: "le-cannet",
            code_ville: "06"
        },
        {
            id: "206",
            nom_ville: "palaiseau",
            code_ville: "91"
        },
        {
            id: "207",
            nom_ville: "la-garenne-colombes",
            code_ville: "92"
        },
        {
            id: "208",
            nom_ville: "brie-comte-robert",
            code_ville: "77"
        },
        {
            id: "209",
            nom_ville: "ollioules",
            code_ville: "83"
        },
        {
            id: "210",
            nom_ville: "dole",
            code_ville: "39"
        },
        {
            id: "211",
            nom_ville: "le-pecq",
            code_ville: "78"
        },
        {
            id: "212",
            nom_ville: "genas",
            code_ville: "69"
        },
        {
            id: "213",
            nom_ville: "lattes",
            code_ville: "34"
        },
        {
            id: "214",
            nom_ville: "rambouillet",
            code_ville: "78"
        },
        {
            id: "215",
            nom_ville: "honfleur",
            code_ville: "14"
        },
        {
            id: "216",
            nom_ville: "torcy",
            code_ville: "77"
        },
        {
            id: "217",
            nom_ville: "brunoy",
            code_ville: "91"
        },
        {
            id: "218",
            nom_ville: "cormeilles-en-parisis",
            code_ville: "95"
        },
        {
            id: "219",
            nom_ville: "fontenay-aux-roses",
            code_ville: "92"
        },
        {
            id: "220",
            nom_ville: "le-pradet",
            code_ville: "83"
        },
        {
            id: "221",
            nom_ville: "caen",
            code_ville: "14"
        },
        {
            id: "222",
            nom_ville: "yvetot",
            code_ville: "76"
        },
        {
            id: "223",
            nom_ville: "saint-jean-de-vedas",
            code_ville: "34"
        },
        {
            id: "224",
            nom_ville: "avon",
            code_ville: "77"
        },
        {
            id: "225",
            nom_ville: "châtillon",
            code_ville: "92"
        },
        {
            id: "226",
            nom_ville: "vaureal",
            code_ville: "95"
        },
        {
            id: "227",
            nom_ville: "pornic",
            code_ville: "44"
        },
        {
            id: "228",
            nom_ville: "châteaulin",
            code_ville: "29"
        },
        {
            id: "229",
            nom_ville: "savenay",
            code_ville: "44"
        },
        {
            id: "230",
            nom_ville: "meru",
            code_ville: "60"
        },
        {
            id: "231",
            nom_ville: "challans",
            code_ville: "85"
        },
        {
            id: "232",
            nom_ville: "meudon",
            code_ville: "92"
        },
        {
            id: "233",
            nom_ville: "monteux",
            code_ville: "84"
        },
        {
            id: "234",
            nom_ville: "chatou",
            code_ville: "78"
        },
        {
            id: "235",
            nom_ville: "wavrin",
            code_ville: "59"
        },
        {
            id: "236",
            nom_ville: "mouvaux",
            code_ville: "59"
        },
        {
            id: "237",
            nom_ville: "pontivy",
            code_ville: "56"
        },
        {
            id: "238",
            nom_ville: "claye-souilly",
            code_ville: "77"
        },
        {
            id: "239",
            nom_ville: "les-sables-dolonne",
            code_ville: "85"
        },
        {
            id: "240",
            nom_ville: "quimperle",
            code_ville: "29"
        },
        {
            id: "241",
            nom_ville: "brive-la-gaillarde",
            code_ville: "19"
        },
        {
            id: "242",
            nom_ville: "sallanches",
            code_ville: "74"
        },
        {
            id: "243",
            nom_ville: "mayenne",
            code_ville: "53"
        },
        {
            id: "244",
            nom_ville: "crest",
            code_ville: "26"
        },
        {
            id: "245",
            nom_ville: "montigny-le-bretonneux",
            code_ville: "78"
        },
        {
            id: "246",
            nom_ville: "frejus",
            code_ville: "83"
        },
        {
            id: "247",
            nom_ville: "douarnenez",
            code_ville: "29"
        },
        {
            id: "248",
            nom_ville: "saint-mandrier-sur-mer",
            code_ville: "83"
        },
        {
            id: "249",
            nom_ville: "bayeux",
            code_ville: "14"
        },
        {
            id: "250",
            nom_ville: "ville-davray",
            code_ville: "92"
        },
        {
            id: "251",
            nom_ville: "mauguio",
            code_ville: "34"
        },
        {
            id: "252",
            nom_ville: "saint-julien-en-genevois",
            code_ville: "74"
        },
        {
            id: "253",
            nom_ville: "pontarlier",
            code_ville: "25"
        },
        {
            id: "254",
            nom_ville: "le-puy-en-velay",
            code_ville: "43"
        },
        {
            id: "255",
            nom_ville: "loches",
            code_ville: "37"
        },
        {
            id: "256",
            nom_ville: "provins",
            code_ville: "77"
        },
        {
            id: "257",
            nom_ville: "montesson",
            code_ville: "78"
        },
        {
            id: "258",
            nom_ville: "le-taillan-medoc",
            code_ville: "33"
        },
        {
            id: "259",
            nom_ville: "kingersheim",
            code_ville: "68"
        },
        {
            id: "260",
            nom_ville: "château-thierry",
            code_ville: "02"
        },
        {
            id: "261",
            nom_ville: "boulogne-billancourt",
            code_ville: "92"
        },
        {
            id: "262",
            nom_ville: "moissy-cramayel",
            code_ville: "77"
        },
        {
            id: "263",
            nom_ville: "bethune",
            code_ville: "62"
        },
        {
            id: "264",
            nom_ville: "biganos",
            code_ville: "33"
        },
        {
            id: "265",
            nom_ville: "noisiel",
            code_ville: "77"
        },
        {
            id: "266",
            nom_ville: "mazamet",
            code_ville: "81"
        },
        {
            id: "267",
            nom_ville: "chantilly",
            code_ville: "60"
        },
        {
            id: "268",
            nom_ville: "avrille",
            code_ville: "49"
        },
        {
            id: "269",
            nom_ville: "arcachon",
            code_ville: "33"
        },
        {
            id: "270",
            nom_ville: "leers",
            code_ville: "59"
        },
        {
            id: "271",
            nom_ville: "saint-maximin-la-sainte-baume",
            code_ville: "83"
        },
        {
            id: "272",
            nom_ville: "amberieu-en-bugey",
            code_ville: "01"
        },
        {
            id: "273",
            nom_ville: "serris",
            code_ville: "77"
        },
        {
            id: "274",
            nom_ville: "la-ferte-bernard",
            code_ville: "72"
        },
        {
            id: "275",
            nom_ville: "villeneuve-loubet",
            code_ville: "06"
        },
        {
            id: "276",
            nom_ville: "redon",
            code_ville: "35"
        },
        {
            id: "277",
            nom_ville: "maisons-laffitte",
            code_ville: "78"
        },
        {
            id: "278",
            nom_ville: "jassans-riottier",
            code_ville: "01"
        },
        {
            id: "279",
            nom_ville: "auterive",
            code_ville: "31"
        },
        {
            id: "280",
            nom_ville: "lunel",
            code_ville: "34"
        },
        {
            id: "281",
            nom_ville: "riom",
            code_ville: "63"
        },
        {
            id: "282",
            nom_ville: "deuil-la-barre",
            code_ville: "95"
        },
        {
            id: "283",
            nom_ville: "sarlat-la-caneda",
            code_ville: "24"
        },
        {
            id: "284",
            nom_ville: "vaucresson",
            code_ville: "92"
        },
        {
            id: "285",
            nom_ville: "bedarrides",
            code_ville: "84"
        },
        {
            id: "286",
            nom_ville: "eysines",
            code_ville: "33"
        },
        {
            id: "287",
            nom_ville: "pontoise",
            code_ville: "95"
        },
        {
            id: "288",
            nom_ville: "tours",
            code_ville: "37"
        },
        {
            id: "289",
            nom_ville: "ozoir-la-ferriere",
            code_ville: "77"
        },
        {
            id: "290",
            nom_ville: "saint-malo",
            code_ville: "35"
        },
        {
            id: "291",
            nom_ville: "saint-amand-les-eaux",
            code_ville: "59"
        },
        {
            id: "292",
            nom_ville: "sarrebourg",
            code_ville: "57"
        },
        {
            id: "293",
            nom_ville: "bouffemont",
            code_ville: "95"
        },
        {
            id: "294",
            nom_ville: "roquebrune-sur-argens",
            code_ville: "83"
        },
        {
            id: "295",
            nom_ville: "biarritz",
            code_ville: "64"
        },
        {
            id: "296",
            nom_ville: "parthenay",
            code_ville: "79"
        },
        {
            id: "297",
            nom_ville: "gerzat",
            code_ville: "63"
        },
        {
            id: "298",
            nom_ville: "montgeron",
            code_ville: "91"
        },
        {
            id: "299",
            nom_ville: "bagneres-de-bigorre",
            code_ville: "65"
        },
        {
            id: "300",
            nom_ville: "guerande",
            code_ville: "44"
        },
        {
            id: "301",
            nom_ville: "bastia",
            code_ville: "2B"
        },
        {
            id: "302",
            nom_ville: "angers",
            code_ville: "49"
        },
        {
            id: "303",
            nom_ville: "chalon-sur-saone",
            code_ville: "71"
        },
        {
            id: "304",
            nom_ville: "louviers",
            code_ville: "27"
        },
        {
            id: "305",
            nom_ville: "saint-hilaire-de-riez",
            code_ville: "85"
        },
        {
            id: "306",
            nom_ville: "crolles",
            code_ville: "38"
        },
        {
            id: "307",
            nom_ville: "villenave-dornon",
            code_ville: "33"
        },
        {
            id: "308",
            nom_ville: "amboise",
            code_ville: "37"
        },
        {
            id: "309",
            nom_ville: "saint-germain-au-mont-dor",
            code_ville: "69"
        },
        {
            id: "310",
            nom_ville: "saint-jean-de-luz",
            code_ville: "64"
        },
        {
            id: "311",
            nom_ville: "mougins",
            code_ville: "06"
        },
        {
            id: "312",
            nom_ville: "les-pennes-mirabeau",
            code_ville: "13"
        },
        {
            id: "313",
            nom_ville: "auxerre",
            code_ville: "89"
        },
        {
            id: "314",
            nom_ville: "fontenay-le-comte",
            code_ville: "85"
        },
        {
            id: "315",
            nom_ville: "franconville",
            code_ville: "95"
        },
        {
            id: "316",
            nom_ville: "lannion",
            code_ville: "22"
        },
        {
            id: "317",
            nom_ville: "fouesnant",
            code_ville: "29"
        },
        {
            id: "318",
            nom_ville: "cholet",
            code_ville: "49"
        },
        {
            id: "319",
            nom_ville: "lorgues",
            code_ville: "83"
        },
        {
            id: "320",
            nom_ville: "chambery",
            code_ville: "73"
        },
        {
            id: "321",
            nom_ville: "fontaine",
            code_ville: "38"
        },
        {
            id: "322",
            nom_ville: "penmarch",
            code_ville: "29"
        },
        {
            id: "323",
            nom_ville: "rennes",
            code_ville: "35"
        },
        {
            id: "324",
            nom_ville: "coudekerque-branche",
            code_ville: "59"
        },
        {
            id: "325",
            nom_ville: "epernay",
            code_ville: "51"
        },
        {
            id: "326",
            nom_ville: "la-tranche-sur-mer",
            code_ville: "85"
        },
        {
            id: "327",
            nom_ville: "carrieres-sous-poissy",
            code_ville: "78"
        },
        {
            id: "328",
            nom_ville: "carqueiranne",
            code_ville: "83"
        },
        {
            id: "329",
            nom_ville: "villeneuve-tolosane",
            code_ville: "31"
        },
        {
            id: "330",
            nom_ville: "metz",
            code_ville: "57"
        },
        {
            id: "331",
            nom_ville: "verneuil-sur-seine",
            code_ville: "78"
        },
        {
            id: "332",
            nom_ville: "taverny",
            code_ville: "95"
        },
        {
            id: "333",
            nom_ville: "montigny-les-metz",
            code_ville: "57"
        },
        {
            id: "334",
            nom_ville: "montfermeil",
            code_ville: "93"
        },
        {
            id: "335",
            nom_ville: "le-chesnay-rocquencourt",
            code_ville: "78"
        },
        {
            id: "336",
            nom_ville: "montigny-les-cormeilles",
            code_ville: "95"
        },
        {
            id: "337",
            nom_ville: "pelissanne",
            code_ville: "13"
        },
        {
            id: "338",
            nom_ville: "mandres-les-roses",
            code_ville: "94"
        },
        {
            id: "339",
            nom_ville: "allauch",
            code_ville: "13"
        },
        {
            id: "340",
            nom_ville: "saint-gilles",
            code_ville: "30"
        },
        {
            id: "341",
            nom_ville: "cognac",
            code_ville: "16"
        },
        {
            id: "342",
            nom_ville: "santeny",
            code_ville: "94"
        },
        {
            id: "343",
            nom_ville: "sainte-genevieve-des-bois",
            code_ville: "91"
        },
        {
            id: "344",
            nom_ville: "quimper",
            code_ville: "29"
        },
        {
            id: "345",
            nom_ville: "neuilly-plaisance",
            code_ville: "93"
        },
        {
            id: "346",
            nom_ville: "saint-brevin-les-pins",
            code_ville: "44"
        },
        {
            id: "347",
            nom_ville: "sucy-en-brie",
            code_ville: "94"
        },
        {
            id: "348",
            nom_ville: "osny",
            code_ville: "95"
        },
        {
            id: "349",
            nom_ville: "fougeres",
            code_ville: "35"
        },
        {
            id: "350",
            nom_ville: "saint-omer",
            code_ville: "62"
        },
        {
            id: "351",
            nom_ville: "la-madeleine",
            code_ville: "59"
        },
        {
            id: "352",
            nom_ville: "ajaccio",
            code_ville: "2A"
        },
        {
            id: "353",
            nom_ville: "saintes",
            code_ville: "17"
        },
        {
            id: "354",
            nom_ville: "issy-les-moulineaux",
            code_ville: "92"
        },
        {
            id: "355",
            nom_ville: "croissy-sur-seine",
            code_ville: "78"
        },
        {
            id: "356",
            nom_ville: "saumur",
            code_ville: "49"
        },
        {
            id: "357",
            nom_ville: "enghien-les-bains",
            code_ville: "95"
        },
        {
            id: "358",
            nom_ville: "tournon-sur-rhone",
            code_ville: "07"
        },
        {
            id: "359",
            nom_ville: "neuilly-plaisance",
            code_ville: "93"
        },
        {
            id: "360",
            nom_ville: "voiron",
            code_ville: "38"
        },
        {
            id: "361",
            nom_ville: "dijon",
            code_ville: "21"
        },
        {
            id: "362",
            nom_ville: "ludres",
            code_ville: "54"
        },
        {
            id: "363",
            nom_ville: "limoges",
            code_ville: "87"
        },
        {
            id: "364",
            nom_ville: "obernai",
            code_ville: "67"
        },
        {
            id: "365",
            nom_ville: "concarneau",
            code_ville: "29"
        },
        {
            id: "366",
            nom_ville: "dieppe",
            code_ville: "76"
        },
        {
            id: "367",
            nom_ville: "albi",
            code_ville: "81"
        },
        {
            id: "368",
            nom_ville: "gujan-mestras",
            code_ville: "33"
        },
        {
            id: "369",
            nom_ville: "bois-colombes",
            code_ville: "92"
        },
        {
            id: "370",
            nom_ville: "saint-raphaël",
            code_ville: "83"
        },
        {
            id: "371",
            nom_ville: "banyuls-sur-mer",
            code_ville: "66"
        },
        {
            id: "372",
            nom_ville: "vichy",
            code_ville: "03"
        },
        {
            id: "373",
            nom_ville: "rueil-malmaison",
            code_ville: "92"
        },
        {
            id: "374",
            nom_ville: "sotteville-les-rouen",
            code_ville: "76"
        },
        {
            id: "375",
            nom_ville: "suresnes",
            code_ville: "92"
        },
        {
            id: "376",
            nom_ville: "hazebrouck",
            code_ville: "59"
        },
        {
            id: "377",
            nom_ville: "saint-ouen-laumone",
            code_ville: "95"
        },
        {
            id: "378",
            nom_ville: "oullins",
            code_ville: "69"
        },
        {
            id: "379",
            nom_ville: "plombieres-les-bains",
            code_ville: "88"
        },
        {
            id: "380",
            nom_ville: "agen",
            code_ville: "47"
        },
        {
            id: "381",
            nom_ville: "vendome",
            code_ville: "41"
        },
        {
            id: "382",
            nom_ville: "deauville",
            code_ville: "14"
        },
        {
            id: "383",
            nom_ville: "lyon",
            code_ville: "69"
        },
        {
            id: "384",
            nom_ville: "rethel",
            code_ville: "08"
        },
        {
            id: "385",
            nom_ville: "talence",
            code_ville: "33"
        },
        {
            id: "386",
            nom_ville: "millau",
            code_ville: "12"
        },
        {
            id: "387",
            nom_ville: "aix-en-provence",
            code_ville: "13"
        },
        {
            id: "388",
            nom_ville: "caudry",
            code_ville: "59"
        },
        {
            id: "389",
            nom_ville: "saint-orens-de-gameville",
            code_ville: "31"
        },
        {
            id: "390",
            nom_ville: "ploërmel",
            code_ville: "56"
        },
        {
            id: "391",
            nom_ville: "digne-les-bains",
            code_ville: "04"
        },
        {
            id: "392",
            nom_ville: "les-pavillons-sous-bois",
            code_ville: "93"
        },
        {
            id: "393",
            nom_ville: "lormont",
            code_ville: "33"
        },
        {
            id: "394",
            nom_ville: "thuir",
            code_ville: "66"
        },
        {
            id: "395",
            nom_ville: "brest",
            code_ville: "29"
        },
        {
            id: "396",
            nom_ville: "rosporden",
            code_ville: "29"
        },
        {
            id: "397",
            nom_ville: "nieppe",
            code_ville: "59"
        },
        {
            id: "398",
            nom_ville: "saint-paul-les-dax",
            code_ville: "40"
        },
        {
            id: "399",
            nom_ville: "hendaye",
            code_ville: "64"
        },
        {
            id: "400",
            nom_ville: "salon-de-provence",
            code_ville: "13"
        },
        {
            id: "401",
            nom_ville: "colmar",
            code_ville: "68"
        },
        {
            id: "402",
            nom_ville: "jouy-le-moutier",
            code_ville: "95"
        },
        {
            id: "403",
            nom_ville: "orvault",
            code_ville: "44"
        },
        {
            id: "404",
            nom_ville: "la-roche-sur-yon",
            code_ville: "85"
        },
        {
            id: "405",
            nom_ville: "chelles",
            code_ville: "77"
        },
        {
            id: "406",
            nom_ville: "nogent-le-rotrou",
            code_ville: "28"
        },
        {
            id: "407",
            nom_ville: "lisle-sur-la-sorgue",
            code_ville: "84"
        },
        {
            id: "408",
            nom_ville: "bailleul",
            code_ville: "59"
        },
        {
            id: "409",
            nom_ville: "villemomble",
            code_ville: "93"
        },
        {
            id: "410",
            nom_ville: "bussy-saint-georges",
            code_ville: "77"
        },
        {
            id: "411",
            nom_ville: "binic-etables-sur-mer",
            code_ville: "22"
        },
        {
            id: "412",
            nom_ville: "le-blanc",
            code_ville: "36"
        },
        {
            id: "413",
            nom_ville: "les-mureaux",
            code_ville: "78"
        },
        {
            id: "414",
            nom_ville: "cherbourg-en-cotentin",
            code_ville: "50"
        },
        {
            id: "415",
            nom_ville: "la-chapelle-sur-erdre",
            code_ville: "44"
        },
        {
            id: "416",
            nom_ville: "antibes",
            code_ville: "06"
        },
        {
            id: "417",
            nom_ville: "viry-châtillon",
            code_ville: "91"
        },
        {
            id: "418",
            nom_ville: "bretigny-sur-orge",
            code_ville: "91"
        },
        {
            id: "419",
            nom_ville: "lys-lez-lannoy",
            code_ville: "59"
        },
        {
            id: "420",
            nom_ville: "ostricourt",
            code_ville: "59"
        },
        {
            id: "421",
            nom_ville: "deville-les-rouen",
            code_ville: "76"
        },
        {
            id: "422",
            nom_ville: "caluire-et-cuire",
            code_ville: "69"
        },
        {
            id: "423",
            nom_ville: "bourg-la-reine",
            code_ville: "92"
        },
        {
            id: "424",
            nom_ville: "castelnau-le-lez",
            code_ville: "34"
        },
        {
            id: "425",
            nom_ville: "villeneuve-dascq",
            code_ville: "59"
        },
        {
            id: "426",
            nom_ville: "saint-martin-de-crau",
            code_ville: "13"
        },
        {
            id: "427",
            nom_ville: "montmorency",
            code_ville: "95"
        },
        {
            id: "428",
            nom_ville: "herblay-sur-seine",
            code_ville: "95"
        },
        {
            id: "429",
            nom_ville: "cosne-cours-sur-loire",
            code_ville: "58"
        },
        {
            id: "430",
            nom_ville: "le-croisic",
            code_ville: "44"
        },
        {
            id: "431",
            nom_ville: "amiens",
            code_ville: "80"
        },
        {
            id: "432",
            nom_ville: "sarreguemines",
            code_ville: "57"
        },
        {
            id: "433",
            nom_ville: "athis-mons",
            code_ville: "91"
        },
        {
            id: "434",
            nom_ville: "saint-claude",
            code_ville: "39"
        },
        {
            id: "435",
            nom_ville: "lamballe-armor",
            code_ville: "22"
        },
        {
            id: "436",
            nom_ville: "malakoff",
            code_ville: "92"
        },
        {
            id: "437",
            nom_ville: "muret",
            code_ville: "31"
        },
        {
            id: "438",
            nom_ville: "crozon",
            code_ville: "29"
        },
        {
            id: "439",
            nom_ville: "cabestany",
            code_ville: "66"
        },
        {
            id: "440",
            nom_ville: "guidel",
            code_ville: "56"
        },
        {
            id: "441",
            nom_ville: "marignane",
            code_ville: "13"
        },
        {
            id: "442",
            nom_ville: "le-blanc-mesnil",
            code_ville: "93"
        },
        {
            id: "443",
            nom_ville: "saint-mammes",
            code_ville: "77"
        },
        {
            id: "444",
            nom_ville: "reze",
            code_ville: "44"
        },
        {
            id: "445",
            nom_ville: "ballancourt-sur-essonne",
            code_ville: "91"
        },
        {
            id: "446",
            nom_ville: "ermont",
            code_ville: "95"
        },
        {
            id: "447",
            nom_ville: "sanary-sur-mer",
            code_ville: "83"
        },
        {
            id: "448",
            nom_ville: "chaville",
            code_ville: "92"
        },
        {
            id: "449",
            nom_ville: "creteil",
            code_ville: "94"
        },
        {
            id: "450",
            nom_ville: "louvres",
            code_ville: "95"
        },
        {
            id: "451",
            nom_ville: "bordeaux",
            code_ville: "33"
        },
        {
            id: "452",
            nom_ville: "belfort",
            code_ville: "90"
        },
        {
            id: "453",
            nom_ville: "pau",
            code_ville: "64"
        },
        {
            id: "454",
            nom_ville: "dax",
            code_ville: "40"
        },
        {
            id: "455",
            nom_ville: "annecy",
            code_ville: "74"
        },
        {
            id: "456",
            nom_ville: "fontenay-sous-bois",
            code_ville: "94"
        },
        {
            id: "457",
            nom_ville: "puget-sur-argens",
            code_ville: "83"
        },
        {
            id: "458",
            nom_ville: "cadaujac",
            code_ville: "33"
        },
        {
            id: "459",
            nom_ville: "pantin",
            code_ville: "93"
        },
        {
            id: "460",
            nom_ville: "rumilly",
            code_ville: "74"
        },
        {
            id: "461",
            nom_ville: "bron",
            code_ville: "69"
        },
        {
            id: "462",
            nom_ville: "saint-mandrier-sur-mer",
            code_ville: "83"
        },
        {
            id: "463",
            nom_ville: "lille",
            code_ville: "59"
        },
        {
            id: "464",
            nom_ville: "halluin",
            code_ville: "59"
        },
        {
            id: "465",
            nom_ville: "neuilly-sur-marne",
            code_ville: "93"
        },
        {
            id: "466",
            nom_ville: "limeil-brevannes",
            code_ville: "94"
        },
        {
            id: "467",
            nom_ville: "morlaix",
            code_ville: "29"
        },
        {
            id: "468",
            nom_ville: "aulnoye-aymeries",
            code_ville: "59"
        },
        {
            id: "469",
            nom_ville: "maringues",
            code_ville: "63"
        },
        {
            id: "470",
            nom_ville: "besançon",
            code_ville: "25"
        },
        {
            id: "471",
            nom_ville: "la-teste-de-buch",
            code_ville: "33"
        },
        {
            id: "472",
            nom_ville: "poitiers",
            code_ville: "86"
        },
        {
            id: "473",
            nom_ville: "domont",
            code_ville: "95"
        },
        {
            id: "474",
            nom_ville: "cachan",
            code_ville: "94"
        },
        {
            id: "475",
            nom_ville: "lisle-dabeau",
            code_ville: "38"
        },
        {
            id: "476",
            nom_ville: "les-lilas",
            code_ville: "93"
        },
        {
            id: "477",
            nom_ville: "bourg-en-bresse",
            code_ville: "01"
        },
        {
            id: "478",
            nom_ville: "cannes",
            code_ville: "06"
        },
        {
            id: "479",
            nom_ville: "marquette-lez-lille",
            code_ville: "59"
        },
        {
            id: "480",
            nom_ville: "asnieres-sur-seine",
            code_ville: "92"
        },
        {
            id: "481",
            nom_ville: "chevilly-larue",
            code_ville: "94"
        },
        {
            id: "482",
            nom_ville: "nancy",
            code_ville: "54"
        },
        {
            id: "483",
            nom_ville: "pierrelaye",
            code_ville: "95"
        },
        {
            id: "484",
            nom_ville: "maurepas",
            code_ville: "78"
        },
        {
            id: "485",
            nom_ville: "bernay",
            code_ville: "27"
        },
        {
            id: "486",
            nom_ville: "epinay-sur-orge",
            code_ville: "91"
        },
        {
            id: "487",
            nom_ville: "lorient",
            code_ville: "56"
        },
        {
            id: "488",
            nom_ville: "tarare",
            code_ville: "69"
        },
        {
            id: "489",
            nom_ville: "la-loupe",
            code_ville: "28"
        },
        {
            id: "490",
            nom_ville: "marmande",
            code_ville: "47"
        },
        {
            id: "491",
            nom_ville: "saint-die-des-vosges",
            code_ville: "88"
        },
        {
            id: "492",
            nom_ville: "pignans",
            code_ville: "83"
        },
        {
            id: "493",
            nom_ville: "sainte-marie-la-mer",
            code_ville: "66"
        },
        {
            id: "494",
            nom_ville: "bandol",
            code_ville: "83"
        },
        {
            id: "495",
            nom_ville: "draguignan",
            code_ville: "83"
        },
        {
            id: "496",
            nom_ville: "plaisance-du-touch",
            code_ville: "31"
        },
        {
            id: "497",
            nom_ville: "sannois",
            code_ville: "95"
        },
        {
            id: "498",
            nom_ville: "rosny-sous-bois",
            code_ville: "93"
        },
        {
            id: "499",
            nom_ville: "roissy-en-brie",
            code_ville: "77"
        },
        {
            id: "500",
            nom_ville: "courbevoie",
            code_ville: "92"
        },
        {
            id: "501",
            nom_ville: "villiers-sur-marne",
            code_ville: "94"
        },
        {
            id: "502",
            nom_ville: "castres",
            code_ville: "81"
        },
        {
            id: "503",
            nom_ville: "joue-les-tours",
            code_ville: "37"
        },
        {
            id: "504",
            nom_ville: "bray-dunes",
            code_ville: "59"
        },
        {
            id: "505",
            nom_ville: "trets",
            code_ville: "13"
        },
        {
            id: "506",
            nom_ville: "nangis",
            code_ville: "77"
        },
        {
            id: "507",
            nom_ville: "orange",
            code_ville: "84"
        },
        {
            id: "508",
            nom_ville: "quincy-sous-senart",
            code_ville: "91"
        },
        {
            id: "509",
            nom_ville: "royan",
            code_ville: "17"
        },
        {
            id: "510",
            nom_ville: "haubourdin",
            code_ville: "59"
        },
        {
            id: "511",
            nom_ville: "les-ulis",
            code_ville: "91"
        },
        {
            id: "512",
            nom_ville: "limoux",
            code_ville: "11"
        },
        {
            id: "513",
            nom_ville: "chartres",
            code_ville: "28"
        },
        {
            id: "514",
            nom_ville: "verdun",
            code_ville: "55"
        },
        {
            id: "515",
            nom_ville: "andernos-les-bains",
            code_ville: "33"
        },
        {
            id: "516",
            nom_ville: "beziers",
            code_ville: "34"
        },
        {
            id: "517",
            nom_ville: "foix",
            code_ville: "09"
        },
        {
            id: "518",
            nom_ville: "saverne",
            code_ville: "67"
        },
        {
            id: "519",
            nom_ville: "montauban",
            code_ville: "82"
        },
        {
            id: "520",
            nom_ville: "bonneville",
            code_ville: "74"
        },
        {
            id: "521",
            nom_ville: "soisy-sur-seine",
            code_ville: "91"
        },
        {
            id: "522",
            nom_ville: "gisors",
            code_ville: "27"
        },
        {
            id: "523",
            nom_ville: "six-fours-les-plages",
            code_ville: "83"
        },
        {
            id: "524",
            nom_ville: "bayonne",
            code_ville: "64"
        },
        {
            id: "525",
            nom_ville: "saint-laurent-du-var",
            code_ville: "06"
        },
        {
            id: "526",
            nom_ville: "tinqueux",
            code_ville: "51"
        },
        {
            id: "527",
            nom_ville: "ormesson-sur-marne",
            code_ville: "94"
        },
        {
            id: "528",
            nom_ville: "autun",
            code_ville: "71"
        },
        {
            id: "529",
            nom_ville: "dunkerque",
            code_ville: "59"
        },
        {
            id: "530",
            nom_ville: "villeparisis",
            code_ville: "77"
        },
        {
            id: "531",
            nom_ville: "begles",
            code_ville: "33"
        },
        {
            id: "532",
            nom_ville: "guyancourt",
            code_ville: "78"
        },
        {
            id: "533",
            nom_ville: "meze",
            code_ville: "34"
        },
        {
            id: "534",
            nom_ville: "le-mans",
            code_ville: "72"
        },
        {
            id: "535",
            nom_ville: "laval",
            code_ville: "53"
        },
        {
            id: "536",
            nom_ville: "lognes",
            code_ville: "77"
        },
        {
            id: "537",
            nom_ville: "etampes",
            code_ville: "91"
        },
        {
            id: "538",
            nom_ville: "auray",
            code_ville: "56"
        },
        {
            id: "539",
            nom_ville: "eu",
            code_ville: "76"
        },
        {
            id: "540",
            nom_ville: "bischheim",
            code_ville: "67"
        },
        {
            id: "541",
            nom_ville: "saint-gaudens",
            code_ville: "31"
        },
        {
            id: "542",
            nom_ville: "bruay-la-buissiere",
            code_ville: "62"
        },
        {
            id: "543",
            nom_ville: "evreux",
            code_ville: "27"
        },
        {
            id: "544",
            nom_ville: "reims",
            code_ville: "51"
        },
        {
            id: "545",
            nom_ville: "saint-bonnet-de-mure",
            code_ville: "69"
        },
        {
            id: "546",
            nom_ville: "nans-les-pins",
            code_ville: "83"
        },
        {
            id: "547",
            nom_ville: "trans-en-provence",
            code_ville: "83"
        },
        {
            id: "548",
            nom_ville: "maromme",
            code_ville: "76"
        },
        {
            id: "549",
            nom_ville: "le-havre",
            code_ville: "76"
        },
        {
            id: "550",
            nom_ville: "aurillac",
            code_ville: "15"
        },
        {
            id: "551",
            nom_ville: "sainte-maxime",
            code_ville: "83"
        },
        {
            id: "552",
            nom_ville: "port-vendres",
            code_ville: "66"
        },
        {
            id: "553",
            nom_ville: "biscarrosse",
            code_ville: "40"
        },
        {
            id: "554",
            nom_ville: "marignane",
            code_ville: "13"
        },
        {
            id: "555",
            nom_ville: "breuillet",
            code_ville: "91"
        },
        {
            id: "556",
            nom_ville: "caudebec-les-elbeuf",
            code_ville: "76"
        },
        {
            id: "557",
            nom_ville: "arcueil",
            code_ville: "94"
        },
        {
            id: "558",
            nom_ville: "armentieres",
            code_ville: "59"
        },
        {
            id: "559",
            nom_ville: "bruges",
            code_ville: "33"
        },
        {
            id: "560",
            nom_ville: "lens",
            code_ville: "62"
        },
        {
            id: "561",
            nom_ville: "la-crau",
            code_ville: "83"
        },
        {
            id: "562",
            nom_ville: "issou",
            code_ville: "78"
        },
        {
            id: "563",
            nom_ville: "cagnes-sur-mer",
            code_ville: "06"
        },
        {
            id: "564",
            nom_ville: "mantes-la-ville",
            code_ville: "78"
        },
        {
            id: "565",
            nom_ville: "villefontaine",
            code_ville: "38"
        },
        {
            id: "566",
            nom_ville: "orgeval",
            code_ville: "78"
        },
        {
            id: "567",
            nom_ville: "montsoult",
            code_ville: "95"
        },
        {
            id: "568",
            nom_ville: "istres",
            code_ville: "13"
        },
        {
            id: "569",
            nom_ville: "perols",
            code_ville: "34"
        },
        {
            id: "570",
            nom_ville: "chanteloup-les-vignes",
            code_ville: "78"
        },
        {
            id: "571",
            nom_ville: "saint-maixent-lecole",
            code_ville: "79"
        },
        {
            id: "572",
            nom_ville: "bourges",
            code_ville: "18"
        },
        {
            id: "573",
            nom_ville: "bully-les-mines",
            code_ville: "62"
        },
        {
            id: "574",
            nom_ville: "nice",
            code_ville: "06"
        },
        {
            id: "575",
            nom_ville: "alençon",
            code_ville: "61"
        },
        {
            id: "576",
            nom_ville: "wattrelos",
            code_ville: "59"
        },
        {
            id: "577",
            nom_ville: "la-rochelle",
            code_ville: "17"
        },
        {
            id: "578",
            nom_ville: "gap",
            code_ville: "05"
        },
        {
            id: "579",
            nom_ville: "le-creusot",
            code_ville: "71"
        },
        {
            id: "580",
            nom_ville: "luneville",
            code_ville: "54"
        },
        {
            id: "581",
            nom_ville: "gagny",
            code_ville: "93"
        },
        {
            id: "582",
            nom_ville: "quiberon",
            code_ville: "56"
        },
        {
            id: "583",
            nom_ville: "châtellerault",
            code_ville: "86"
        },
        {
            id: "584",
            nom_ville: "carvin",
            code_ville: "62"
        },
        {
            id: "585",
            nom_ville: "parempuyre",
            code_ville: "33"
        },
        {
            id: "586",
            nom_ville: "louhans",
            code_ville: "71"
        },
        {
            id: "587",
            nom_ville: "merignac",
            code_ville: "33"
        },
        {
            id: "588",
            nom_ville: "clichy",
            code_ville: "92"
        },
        {
            id: "589",
            nom_ville: "saint-martin-dheres",
            code_ville: "38"
        },
        {
            id: "590",
            nom_ville: "boissy-saint-leger",
            code_ville: "94"
        },
        {
            id: "591",
            nom_ville: "bonneuil-sur-marne",
            code_ville: "94"
        },
        {
            id: "592",
            nom_ville: "valence",
            code_ville: "26"
        },
        {
            id: "593",
            nom_ville: "troyes",
            code_ville: "10"
        },
        {
            id: "594",
            nom_ville: "saint-michel-sur-orge",
            code_ville: "91"
        },
        {
            id: "595",
            nom_ville: "saint-jean-dangely",
            code_ville: "17"
        },
        {
            id: "596",
            nom_ville: "villebon-sur-yvette",
            code_ville: "91"
        },
        {
            id: "597",
            nom_ville: "plaisir",
            code_ville: "78"
        },
        {
            id: "598",
            nom_ville: "bois-darcy",
            code_ville: "78"
        },
        {
            id: "599",
            nom_ville: "meyzieu",
            code_ville: "69"
        },
        {
            id: "600",
            nom_ville: "clermont-ferrand",
            code_ville: "63"
        },
        {
            id: "601",
            nom_ville: "sartrouville",
            code_ville: "78"
        },
        {
            id: "602",
            nom_ville: "ambares-et-lagrave",
            code_ville: "33"
        },
        {
            id: "603",
            nom_ville: "thionville",
            code_ville: "57"
        },
        {
            id: "604",
            nom_ville: "carros",
            code_ville: "06"
        },
        {
            id: "605",
            nom_ville: "paris",
            code_ville: "75"
        },
        {
            id: "606",
            nom_ville: "le-grau-du-roi",
            code_ville: "30"
        },
        {
            id: "607",
            nom_ville: "niort",
            code_ville: "79"
        },
        {
            id: "608",
            nom_ville: "montluçon",
            code_ville: "03"
        },
        {
            id: "609",
            nom_ville: "saint-etienne",
            code_ville: "42"
        },
        {
            id: "610",
            nom_ville: "angouleme",
            code_ville: "16"
        },
        {
            id: "611",
            nom_ville: "rodez",
            code_ville: "12"
        },
        {
            id: "612",
            nom_ville: "charleville-mezieres",
            code_ville: "08"
        },
        {
            id: "613",
            nom_ville: "vaux-le-penil",
            code_ville: "77"
        },
        {
            id: "614",
            nom_ville: "aucamville",
            code_ville: "31"
        },
        {
            id: "615",
            nom_ville: "bar-le-duc",
            code_ville: "55"
        },
        {
            id: "616",
            nom_ville: "houilles",
            code_ville: "78"
        },
        {
            id: "617",
            nom_ville: "besseges",
            code_ville: "30"
        },
        {
            id: "618",
            nom_ville: "epinal",
            code_ville: "88"
        },
        {
            id: "619",
            nom_ville: "wasquehal",
            code_ville: "59"
        },
        {
            id: "620",
            nom_ville: "sisteron",
            code_ville: "04"
        },
        {
            id: "621",
            nom_ville: "la-queue-en-brie",
            code_ville: "94"
        },
        {
            id: "622",
            nom_ville: "ales",
            code_ville: "30"
        },
        {
            id: "623",
            nom_ville: "rouen",
            code_ville: "76"
        },
        {
            id: "624",
            nom_ville: "guingamp",
            code_ville: "22"
        },
        {
            id: "625",
            nom_ville: "châteauroux",
            code_ville: "36"
        },
        {
            id: "626",
            nom_ville: "gardanne",
            code_ville: "13"
        },
        {
            id: "627",
            nom_ville: "lodeve",
            code_ville: "34"
        },
        {
            id: "628",
            nom_ville: "aigues-mortes",
            code_ville: "30"
        },
        {
            id: "629",
            nom_ville: "soufflenheim",
            code_ville: "67"
        },
        {
            id: "630",
            nom_ville: "montpellier",
            code_ville: "34"
        },
        {
            id: "631",
            nom_ville: "nantes",
            code_ville: "44"
        },
        {
            id: "632",
            nom_ville: "rochefort",
            code_ville: "17"
        },
        {
            id: "633",
            nom_ville: "blain",
            code_ville: "44"
        },
        {
            id: "634",
            nom_ville: "miramas",
            code_ville: "13"
        },
        {
            id: "635",
            nom_ville: "larmor-plage",
            code_ville: "56"
        },
        {
            id: "636",
            nom_ville: "chaumont",
            code_ville: "52"
        },
        {
            id: "637",
            nom_ville: "pezenas",
            code_ville: "34"
        },
        {
            id: "638",
            nom_ville: "bessancourt",
            code_ville: "95"
        },
        {
            id: "639",
            nom_ville: "persan",
            code_ville: "95"
        },
        {
            id: "640",
            nom_ville: "commercy",
            code_ville: "55"
        },
        {
            id: "641",
            nom_ville: "lezignan-corbieres",
            code_ville: "11"
        },
        {
            id: "642",
            nom_ville: "ecouen",
            code_ville: "95"
        },
        {
            id: "643",
            nom_ville: "gravelines",
            code_ville: "59"
        },
        {
            id: "644",
            nom_ville: "boussy-saint-antoine",
            code_ville: "91"
        },
        {
            id: "645",
            nom_ville: "hennebont",
            code_ville: "56"
        },
        {
            id: "646",
            nom_ville: "champs-sur-marne",
            code_ville: "77"
        },
        {
            id: "647",
            nom_ville: "orly",
            code_ville: "94"
        },
        {
            id: "648",
            nom_ville: "roanne",
            code_ville: "42"
        },
        {
            id: "649",
            nom_ville: "tonneins",
            code_ville: "47"
        },
        {
            id: "650",
            nom_ville: "haguenau",
            code_ville: "67"
        },
        {
            id: "651",
            nom_ville: "tremblay-en-france",
            code_ville: "93"
        },
        {
            id: "652",
            nom_ville: "tarbes",
            code_ville: "65"
        },
        {
            id: "653",
            nom_ville: "saint-jean-de-braye",
            code_ville: "45"
        },
        {
            id: "654",
            nom_ville: "saint-fargeau-ponthierry",
            code_ville: "77"
        },
        {
            id: "655",
            nom_ville: "vernon",
            code_ville: "27"
        },
        {
            id: "656",
            nom_ville: "aubenas",
            code_ville: "07"
        },
        {
            id: "657",
            nom_ville: "saint-chamond",
            code_ville: "42"
        },
        {
            id: "658",
            nom_ville: "villeurbanne",
            code_ville: "69"
        },
        {
            id: "659",
            nom_ville: "moulins",
            code_ville: "03"
        },
        {
            id: "660",
            nom_ville: "mulhouse",
            code_ville: "68"
        },
        {
            id: "661",
            nom_ville: "golbey",
            code_ville: "88"
        },
        {
            id: "662",
            nom_ville: "castelnaudary",
            code_ville: "11"
        },
        {
            id: "663",
            nom_ville: "sens",
            code_ville: "89"
        },
        {
            id: "664",
            nom_ville: "montbeliard",
            code_ville: "25"
        },
        {
            id: "665",
            nom_ville: "cassis",
            code_ville: "13"
        },
        {
            id: "666",
            nom_ville: "canet-en-roussillon",
            code_ville: "66"
        },
        {
            id: "667",
            nom_ville: "carhaix-plouguer",
            code_ville: "29"
        },
        {
            id: "668",
            nom_ville: "lacanau",
            code_ville: "33"
        },
        {
            id: "669",
            nom_ville: "douai",
            code_ville: "59"
        },
        {
            id: "670",
            nom_ville: "mantes-la-jolie",
            code_ville: "78"
        },
        {
            id: "671",
            nom_ville: "sete",
            code_ville: "34"
        },
        {
            id: "672",
            nom_ville: "combs-la-ville",
            code_ville: "77"
        },
        {
            id: "673",
            nom_ville: "couëron",
            code_ville: "44"
        },
        {
            id: "674",
            nom_ville: "villepinte",
            code_ville: "93"
        },
        {
            id: "675",
            nom_ville: "rixheim",
            code_ville: "68"
        },
        {
            id: "676",
            nom_ville: "cergy",
            code_ville: "95"
        },
        {
            id: "677",
            nom_ville: "berck",
            code_ville: "62"
        },
        {
            id: "678",
            nom_ville: "toulouse",
            code_ville: "31"
        },
        {
            id: "679",
            nom_ville: "les-clayes-sous-bois",
            code_ville: "78"
        },
        {
            id: "680",
            nom_ville: "toulon",
            code_ville: "83"
        },
        {
            id: "681",
            nom_ville: "mont-de-marsan",
            code_ville: "40"
        },
        {
            id: "682",
            nom_ville: "abbeville",
            code_ville: "80"
        },
        {
            id: "683",
            nom_ville: "balaruc-les-bains",
            code_ville: "34"
        },
        {
            id: "684",
            nom_ville: "nevers",
            code_ville: "58"
        },
        {
            id: "685",
            nom_ville: "harnes",
            code_ville: "62"
        },
        {
            id: "686",
            nom_ville: "leforest",
            code_ville: "62"
        },
        {
            id: "687",
            nom_ville: "jouy-en-josas",
            code_ville: "78"
        },
        {
            id: "688",
            nom_ville: "bondoufle",
            code_ville: "91"
        },
        {
            id: "689",
            nom_ville: "rillieux-la-pape",
            code_ville: "69"
        },
        {
            id: "690",
            nom_ville: "hyeres",
            code_ville: "83"
        },
        {
            id: "691",
            nom_ville: "graulhet",
            code_ville: "81"
        },
        {
            id: "692",
            nom_ville: "arpajon",
            code_ville: "91"
        },
        {
            id: "693",
            nom_ville: "tourcoing",
            code_ville: "59"
        },
        {
            id: "694",
            nom_ville: "pierrelatte",
            code_ville: "26"
        },
        {
            id: "695",
            nom_ville: "la-ciotat",
            code_ville: "13"
        },
        {
            id: "696",
            nom_ville: "martigues",
            code_ville: "13"
        },
        {
            id: "697",
            nom_ville: "pontault-combault",
            code_ville: "77"
        },
        {
            id: "698",
            nom_ville: "villeneuve-le-roi",
            code_ville: "94"
        },
        {
            id: "699",
            nom_ville: "saint-jory",
            code_ville: "31"
        },
        {
            id: "700",
            nom_ville: "colomiers",
            code_ville: "31"
        },
        {
            id: "701",
            nom_ville: "albertville",
            code_ville: "73"
        },
        {
            id: "702",
            nom_ville: "colombes",
            code_ville: "92"
        },
        {
            id: "703",
            nom_ville: "evian-les-bains",
            code_ville: "74"
        },
        {
            id: "704",
            nom_ville: "beauvais",
            code_ville: "60"
        },
        {
            id: "705",
            nom_ville: "villefranche-de-rouergue",
            code_ville: "12"
        },
        {
            id: "706",
            nom_ville: "perpignan",
            code_ville: "66"
        },
        {
            id: "707",
            nom_ville: "limay",
            code_ville: "78"
        },
        {
            id: "708",
            nom_ville: "wattignies",
            code_ville: "59"
        },
        {
            id: "709",
            nom_ville: "boulogne-sur-mer",
            code_ville: "62"
        },
        {
            id: "710",
            nom_ville: "groslay",
            code_ville: "95"
        },
        {
            id: "711",
            nom_ville: "saint-lo",
            code_ville: "50"
        },
        {
            id: "712",
            nom_ville: "verberie",
            code_ville: "60"
        },
        {
            id: "713",
            nom_ville: "massy",
            code_ville: "91"
        },
        {
            id: "714",
            nom_ville: "saint-brice-sous-foret",
            code_ville: "95"
        },
        {
            id: "715",
            nom_ville: "cenon",
            code_ville: "33"
        },
        {
            id: "716",
            nom_ville: "mons-en-baroeul",
            code_ville: "59"
        },
        {
            id: "717",
            nom_ville: "soissons",
            code_ville: "02"
        },
        {
            id: "718",
            nom_ville: "saint-herblain",
            code_ville: "44"
        },
        {
            id: "719",
            nom_ville: "lhaÿ-les-roses",
            code_ville: "94"
        },
        {
            id: "720",
            nom_ville: "evry-courcouronnes",
            code_ville: "91"
        },
        {
            id: "721",
            nom_ville: "thonon-les-bains",
            code_ville: "74"
        },
        {
            id: "722",
            nom_ville: "châtenay-malabry",
            code_ville: "92"
        },
        {
            id: "723",
            nom_ville: "lisieux",
            code_ville: "14"
        },
        {
            id: "724",
            nom_ville: "champigny-sur-marne",
            code_ville: "94"
        },
        {
            id: "725",
            nom_ville: "châlons-en-champagne",
            code_ville: "51"
        },
        {
            id: "726",
            nom_ville: "fos-sur-mer",
            code_ville: "13"
        },
        {
            id: "727",
            nom_ville: "carpentras",
            code_ville: "84"
        },
        {
            id: "728",
            nom_ville: "feyzin",
            code_ville: "69"
        },
        {
            id: "729",
            nom_ville: "bressuire",
            code_ville: "79"
        },
        {
            id: "730",
            nom_ville: "langon",
            code_ville: "33"
        },
        {
            id: "731",
            nom_ville: "cavaillon",
            code_ville: "84"
        },
        {
            id: "732",
            nom_ville: "saint-nazaire",
            code_ville: "44"
        },
        {
            id: "733",
            nom_ville: "vigneux-sur-seine",
            code_ville: "91"
        },
        {
            id: "734",
            nom_ville: "saint-ouen-sur-seine",
            code_ville: "93"
        },
        {
            id: "735",
            nom_ville: "pertuis",
            code_ville: "84"
        },
        {
            id: "736",
            nom_ville: "courcelles-les-lens",
            code_ville: "62"
        },
        {
            id: "737",
            nom_ville: "menton",
            code_ville: "06"
        },
        {
            id: "738",
            nom_ville: "calais",
            code_ville: "62"
        },
        {
            id: "739",
            nom_ville: "sedan",
            code_ville: "08"
        },
        {
            id: "740",
            nom_ville: "aubagne",
            code_ville: "13"
        },
        {
            id: "741",
            nom_ville: "fecamp",
            code_ville: "76"
        },
        {
            id: "742",
            nom_ville: "narbonne",
            code_ville: "11"
        },
        {
            id: "743",
            nom_ville: "chinon",
            code_ville: "37"
        },
        {
            id: "744",
            nom_ville: "montlhery",
            code_ville: "91"
        },
        {
            id: "745",
            nom_ville: "les-martres-de-veyre",
            code_ville: "63"
        },
        {
            id: "746",
            nom_ville: "bourgoin-jallieu",
            code_ville: "38"
        },
        {
            id: "747",
            nom_ville: "juvignac",
            code_ville: "34"
        },
        {
            id: "748",
            nom_ville: "pia",
            code_ville: "66"
        },
        {
            id: "749",
            nom_ville: "faches-thumesnil",
            code_ville: "59"
        },
        {
            id: "750",
            nom_ville: "grande-synthe",
            code_ville: "59"
        },
        {
            id: "751",
            nom_ville: "aubusson",
            code_ville: "23"
        },
        {
            id: "752",
            nom_ville: "juvisy-sur-orge",
            code_ville: "91"
        },
        {
            id: "753",
            nom_ville: "le-pre-saint-gervais",
            code_ville: "93"
        },
        {
            id: "754",
            nom_ville: "port-la-nouvelle",
            code_ville: "11"
        },
        {
            id: "755",
            nom_ville: "corbas",
            code_ville: "69"
        },
        {
            id: "756",
            nom_ville: "elne",
            code_ville: "66"
        },
        {
            id: "757",
            nom_ville: "echirolles",
            code_ville: "38"
        },
        {
            id: "758",
            nom_ville: "champagne-sur-seine",
            code_ville: "77"
        },
        {
            id: "759",
            nom_ville: "sin-le-noble",
            code_ville: "59"
        },
        {
            id: "760",
            nom_ville: "saint-quentin",
            code_ville: "02"
        },
        {
            id: "761",
            nom_ville: "vitrolles",
            code_ville: "13"
        },
        {
            id: "762",
            nom_ville: "blois",
            code_ville: "41"
        },
        {
            id: "763",
            nom_ville: "le-bourget",
            code_ville: "93"
        },
        {
            id: "764",
            nom_ville: "perigueux",
            code_ville: "24"
        },
        {
            id: "765",
            nom_ville: "sains-en-gohelle",
            code_ville: "62"
        },
        {
            id: "766",
            nom_ville: "revel",
            code_ville: "31"
        },
        {
            id: "767",
            nom_ville: "nemours",
            code_ville: "77"
        },
        {
            id: "768",
            nom_ville: "saint-tropez",
            code_ville: "83"
        },
        {
            id: "769",
            nom_ville: "dammartin-en-goële",
            code_ville: "77"
        },
        {
            id: "770",
            nom_ville: "tulle",
            code_ville: "19"
        },
        {
            id: "771",
            nom_ville: "libourne",
            code_ville: "33"
        },
        {
            id: "772",
            nom_ville: "thouars",
            code_ville: "79"
        },
        {
            id: "773",
            nom_ville: "châtelaillon-plage",
            code_ville: "17"
        },
        {
            id: "774",
            nom_ville: "auch",
            code_ville: "32"
        },
        {
            id: "775",
            nom_ville: "saint-martin-boulogne",
            code_ville: "62"
        },
        {
            id: "776",
            nom_ville: "ezanville",
            code_ville: "95"
        },
        {
            id: "777",
            nom_ville: "darnetal",
            code_ville: "76"
        },
        {
            id: "778",
            nom_ville: "romainville",
            code_ville: "93"
        },
        {
            id: "779",
            nom_ville: "laon",
            code_ville: "02"
        },
        {
            id: "780",
            nom_ville: "brignoles",
            code_ville: "83"
        },
        {
            id: "781",
            nom_ville: "cuers",
            code_ville: "83"
        },
        {
            id: "782",
            nom_ville: "argeles-sur-mer",
            code_ville: "66"
        },
        {
            id: "783",
            nom_ville: "nimes",
            code_ville: "30"
        },
        {
            id: "784",
            nom_ville: "villefranche-sur-saone",
            code_ville: "69"
        },
        {
            id: "785",
            nom_ville: "la-reole",
            code_ville: "33"
        },
        {
            id: "786",
            nom_ville: "belleville-en-beaujolais",
            code_ville: "69"
        },
        {
            id: "787",
            nom_ville: "agde",
            code_ville: "34"
        },
        {
            id: "788",
            nom_ville: "montmagny",
            code_ville: "95"
        },
        {
            id: "789",
            nom_ville: "cournonterral",
            code_ville: "34"
        },
        {
            id: "790",
            nom_ville: "choisy-le-roi",
            code_ville: "94"
        },
        {
            id: "791",
            nom_ville: "epinay-sur-seine",
            code_ville: "93"
        },
        {
            id: "792",
            nom_ville: "baume-les-dames",
            code_ville: "25"
        },
        {
            id: "793",
            nom_ville: "gennevilliers",
            code_ville: "92"
        },
        {
            id: "794",
            nom_ville: "carcassonne",
            code_ville: "11"
        },
        {
            id: "795",
            nom_ville: "mitry-mory",
            code_ville: "77"
        },
        {
            id: "796",
            nom_ville: "savigny-le-temple",
            code_ville: "77"
        },
        {
            id: "797",
            nom_ville: "saint-brieuc",
            code_ville: "22"
        },
        {
            id: "798",
            nom_ville: "montreuil",
            code_ville: "93"
        },
        {
            id: "799",
            nom_ville: "roubaix",
            code_ville: "59"
        },
        {
            id: "800",
            nom_ville: "migennes",
            code_ville: "89"
        },
        {
            id: "801",
            nom_ville: "acheres",
            code_ville: "78"
        },
        {
            id: "802",
            nom_ville: "la-valette-du-var",
            code_ville: "83"
        },
        {
            id: "803",
            nom_ville: "cahors",
            code_ville: "46"
        },
        {
            id: "804",
            nom_ville: "la-tour-du-pin",
            code_ville: "38"
        },
        {
            id: "805",
            nom_ville: "manosque",
            code_ville: "04"
        },
        {
            id: "806",
            nom_ville: "wizernes",
            code_ville: "62"
        },
        {
            id: "807",
            nom_ville: "vallauris",
            code_ville: "06"
        },
        {
            id: "808",
            nom_ville: "billy-montigny",
            code_ville: "62"
        },
        {
            id: "809",
            nom_ville: "orleans",
            code_ville: "45"
        },
        {
            id: "810",
            nom_ville: "maubeuge",
            code_ville: "59"
        },
        {
            id: "811",
            nom_ville: "firminy",
            code_ville: "42"
        },
        {
            id: "812",
            nom_ville: "forcalqueiret",
            code_ville: "83"
        },
        {
            id: "813",
            nom_ville: "emerainville",
            code_ville: "77"
        },
        {
            id: "814",
            nom_ville: "raismes",
            code_ville: "59"
        },
        {
            id: "815",
            nom_ville: "sorgues",
            code_ville: "84"
        },
        {
            id: "816",
            nom_ville: "saint-cloud",
            code_ville: "92"
        },
        {
            id: "817",
            nom_ville: "saint-genis-pouilly",
            code_ville: "01"
        },
        {
            id: "818",
            nom_ville: "chilly-mazarin",
            code_ville: "91"
        },
        {
            id: "819",
            nom_ville: "grasse",
            code_ville: "06"
        },
        {
            id: "820",
            nom_ville: "longjumeau",
            code_ville: "91"
        },
        {
            id: "821",
            nom_ville: "montelimar",
            code_ville: "26"
        },
        {
            id: "822",
            nom_ville: "villeneuve-sur-lot",
            code_ville: "47"
        },
        {
            id: "823",
            nom_ville: "coulommiers",
            code_ville: "77"
        },
        {
            id: "824",
            nom_ville: "denain",
            code_ville: "59"
        },
        {
            id: "825",
            nom_ville: "thorigny-sur-marne",
            code_ville: "77"
        },
        {
            id: "826",
            nom_ville: "wissous",
            code_ville: "91"
        },
        {
            id: "827",
            nom_ville: "lons-le-saunier",
            code_ville: "39"
        },
        {
            id: "828",
            nom_ville: "nanterre",
            code_ville: "92"
        },
        {
            id: "829",
            nom_ville: "lingolsheim",
            code_ville: "67"
        },
        {
            id: "830",
            nom_ville: "mâcon",
            code_ville: "71"
        },
        {
            id: "831",
            nom_ville: "ris-orangis",
            code_ville: "91"
        },
        {
            id: "832",
            nom_ville: "sarrians",
            code_ville: "84"
        },
        {
            id: "833",
            nom_ville: "alfortville",
            code_ville: "94"
        },
        {
            id: "834",
            nom_ville: "vanves",
            code_ville: "92"
        },
        {
            id: "835",
            nom_ville: "savigny-sur-orge",
            code_ville: "91"
        },
        {
            id: "836",
            nom_ville: "valenciennes",
            code_ville: "59"
        },
        {
            id: "837",
            nom_ville: "thiers",
            code_ville: "63"
        },
        {
            id: "838",
            nom_ville: "saint-junien",
            code_ville: "87"
        },
        {
            id: "839",
            nom_ville: "gonesse",
            code_ville: "95"
        },
        {
            id: "840",
            nom_ville: "vienne",
            code_ville: "38"
        },
        {
            id: "841",
            nom_ville: "saint-louis",
            code_ville: "68"
        },
        {
            id: "842",
            nom_ville: "bormes-les-mimosas",
            code_ville: "83"
        },
        {
            id: "843",
            nom_ville: "morsang-sur-orge",
            code_ville: "91"
        },
        {
            id: "844",
            nom_ville: "auchel",
            code_ville: "62"
        },
        {
            id: "845",
            nom_ville: "arles",
            code_ville: "13"
        },
        {
            id: "846",
            nom_ville: "vaulx-en-velin",
            code_ville: "69"
        },
        {
            id: "847",
            nom_ville: "fresnes",
            code_ville: "94"
        },
        {
            id: "848",
            nom_ville: "châteauneuf-les-martigues",
            code_ville: "13"
        },
        {
            id: "849",
            nom_ville: "chennevieres-sur-marne",
            code_ville: "94"
        },
        {
            id: "850",
            nom_ville: "saulx-les-chartreux",
            code_ville: "91"
        },
        {
            id: "851",
            nom_ville: "saulx-les-chartreux",
            code_ville: "91"
        },
        {
            id: "852",
            nom_ville: "le-boulou",
            code_ville: "66"
        },
        {
            id: "853",
            nom_ville: "montereau-fault-yonne",
            code_ville: "77"
        },
        {
            id: "854",
            nom_ville: "venissieux",
            code_ville: "69"
        },
        {
            id: "855",
            nom_ville: "vaujours",
            code_ville: "93"
        },
        {
            id: "856",
            nom_ville: "saint-marcellin",
            code_ville: "38"
        },
        {
            id: "857",
            nom_ville: "pamiers",
            code_ville: "09"
        },
        {
            id: "858",
            nom_ville: "rognac",
            code_ville: "13"
        },
        {
            id: "859",
            nom_ville: "saint-ambroix",
            code_ville: "30"
        },
        {
            id: "860",
            nom_ville: "dreux",
            code_ville: "28"
        },
        {
            id: "861",
            nom_ville: "hayange",
            code_ville: "57"
        },
        {
            id: "862",
            nom_ville: "cugnaux",
            code_ville: "31"
        },
        {
            id: "863",
            nom_ville: "saint-girons",
            code_ville: "09"
        },
        {
            id: "864",
            nom_ville: "illzach",
            code_ville: "68"
        },
        {
            id: "865",
            nom_ville: "bezons",
            code_ville: "95"
        },
        {
            id: "866",
            nom_ville: "loos",
            code_ville: "59"
        },
        {
            id: "867",
            nom_ville: "lourdes",
            code_ville: "65"
        },
        {
            id: "868",
            nom_ville: "villiers-le-bel",
            code_ville: "95"
        },
        {
            id: "869",
            nom_ville: "grenoble",
            code_ville: "38"
        },
        {
            id: "870",
            nom_ville: "le-petit-quevilly",
            code_ville: "76"
        },
        {
            id: "871",
            nom_ville: "villejuif",
            code_ville: "94"
        },
        {
            id: "872",
            nom_ville: "la-seyne-sur-mer",
            code_ville: "83"
        },
        {
            id: "873",
            nom_ville: "oyonnax",
            code_ville: "01"
        },
        {
            id: "874",
            nom_ville: "trappes",
            code_ville: "78"
        },
        {
            id: "875",
            nom_ville: "saint-cyr-lecole",
            code_ville: "78"
        },
        {
            id: "876",
            nom_ville: "livry-gargan",
            code_ville: "93"
        },
        {
            id: "877",
            nom_ville: "goussainville",
            code_ville: "95"
        },
        {
            id: "878",
            nom_ville: "talant",
            code_ville: "21"
        },
        {
            id: "879",
            nom_ville: "anzin",
            code_ville: "59"
        },
        {
            id: "880",
            nom_ville: "croix",
            code_ville: "59"
        },
        {
            id: "881",
            nom_ville: "drancy",
            code_ville: "93"
        },
        {
            id: "882",
            nom_ville: "sevran",
            code_ville: "93"
        },
        {
            id: "883",
            nom_ville: "montargis",
            code_ville: "45"
        },
        {
            id: "884",
            nom_ville: "isbergues",
            code_ville: "62"
        },
        {
            id: "885",
            nom_ville: "saint-fons",
            code_ville: "69"
        },
        {
            id: "886",
            nom_ville: "moyenmoutier",
            code_ville: "88"
        },
        {
            id: "887",
            nom_ville: "gonfaron",
            code_ville: "83"
        },
        {
            id: "888",
            nom_ville: "clamecy",
            code_ville: "58"
        },
        {
            id: "889",
            nom_ville: "bergerac",
            code_ville: "24"
        },
        {
            id: "890",
            nom_ville: "palavas-les-flots",
            code_ville: "34"
        },
        {
            id: "891",
            nom_ville: "fontenay-le-fleury",
            code_ville: "78"
        },
        {
            id: "892",
            nom_ville: "magny-en-vexin",
            code_ville: "95"
        },
        {
            id: "893",
            nom_ville: "bagneux",
            code_ville: "92"
        },
        {
            id: "894",
            nom_ville: "beaumont-sur-oise",
            code_ville: "95"
        },
        {
            id: "895",
            nom_ville: "la-ferte-sous-jouarre",
            code_ville: "77"
        },
        {
            id: "896",
            nom_ville: "saint-dizier",
            code_ville: "52"
        },
        {
            id: "897",
            nom_ville: "saint-priest",
            code_ville: "69"
        },
        {
            id: "898",
            nom_ville: "marseille",
            code_ville: "13"
        },
        {
            id: "899",
            nom_ville: "bougival",
            code_ville: "78"
        },
        {
            id: "900",
            nom_ville: "le-kremlin-bicetre",
            code_ville: "94"
        },
        {
            id: "901",
            nom_ville: "schiltigheim",
            code_ville: "67"
        },
        {
            id: "902",
            nom_ville: "vernouillet",
            code_ville: "78"
        },
        {
            id: "903",
            nom_ville: "montpon-menesterol",
            code_ville: "24"
        },
        {
            id: "904",
            nom_ville: "hericourt",
            code_ville: "70"
        },
        {
            id: "905",
            nom_ville: "beaucaire",
            code_ville: "30"
        },
        {
            id: "906",
            nom_ville: "annonay",
            code_ville: "07"
        },
        {
            id: "907",
            nom_ville: "melun",
            code_ville: "77"
        },
        {
            id: "908",
            nom_ville: "frontignan",
            code_ville: "34"
        },
        {
            id: "909",
            nom_ville: "egly",
            code_ville: "91"
        },
        {
            id: "910",
            nom_ville: "esperaza",
            code_ville: "11"
        },
        {
            id: "911",
            nom_ville: "les-essarts-le-roi",
            code_ville: "78"
        },
        {
            id: "912",
            nom_ville: "bagnolet",
            code_ville: "93"
        },
        {
            id: "913",
            nom_ville: "elbeuf",
            code_ville: "76"
        },
        {
            id: "914",
            nom_ville: "vif",
            code_ville: "38"
        },
        {
            id: "915",
            nom_ville: "la-courneuve",
            code_ville: "93"
        },
        {
            id: "916",
            nom_ville: "forbach",
            code_ville: "57"
        },
        {
            id: "917",
            nom_ville: "carmaux",
            code_ville: "81"
        },
        {
            id: "918",
            nom_ville: "noyon",
            code_ville: "60"
        },
        {
            id: "919",
            nom_ville: "avignon",
            code_ville: "84"
        },
        {
            id: "920",
            nom_ville: "pirou",
            code_ville: "50"
        },
        {
            id: "921",
            nom_ville: "stains",
            code_ville: "93"
        },
        {
            id: "922",
            nom_ville: "ivry-sur-seine",
            code_ville: "94"
        },
        {
            id: "923",
            nom_ville: "bagnols-sur-ceze",
            code_ville: "30"
        },
        {
            id: "924",
            nom_ville: "fontaines-sur-saone",
            code_ville: "69"
        },
        {
            id: "925",
            nom_ville: "sarcelles",
            code_ville: "95"
        },
        {
            id: "926",
            nom_ville: "aulnay-sous-bois",
            code_ville: "93"
        },
        {
            id: "927",
            nom_ville: "woippy",
            code_ville: "57"
        },
        {
            id: "928",
            nom_ville: "romans-sur-isere",
            code_ville: "26"
        },
        {
            id: "929",
            nom_ville: "gentilly",
            code_ville: "94"
        },
        {
            id: "930",
            nom_ville: "montbard",
            code_ville: "21"
        },
        {
            id: "931",
            nom_ville: "noisy-le-sec",
            code_ville: "93"
        },
        {
            id: "932",
            nom_ville: "flers",
            code_ville: "61"
        },
        {
            id: "933",
            nom_ville: "amelie-les-bains-palalda",
            code_ville: "66"
        },
        {
            id: "934",
            nom_ville: "longwy",
            code_ville: "54"
        },
        {
            id: "935",
            nom_ville: "vitry-sur-seine",
            code_ville: "94"
        },
        {
            id: "936",
            nom_ville: "la-celle-saint-cloud",
            code_ville: "78"
        },
        {
            id: "937",
            nom_ville: "montceau-les-mines",
            code_ville: "71"
        },
        {
            id: "938",
            nom_ville: "mussidan",
            code_ville: "24"
        },
        {
            id: "939",
            nom_ville: "gaillan-en-medoc",
            code_ville: "33"
        },
        {
            id: "940",
            nom_ville: "saint-denis",
            code_ville: "93"
        },
        {
            id: "941",
            nom_ville: "creil",
            code_ville: "60"
        },
        {
            id: "942",
            nom_ville: "aubervilliers",
            code_ville: "93"
        },
        {
            id: "943",
            nom_ville: "bondy",
            code_ville: "93"
        },
        {
            id: "944",
            nom_ville: "port-de-bouc",
            code_ville: "13"
        },
        {
            id: "945",
            nom_ville: "bobigny",
            code_ville: "93"
        },
        {
            id: "946",
            nom_ville: "annemasse",
            code_ville: "74"
        },
        {
            id: "947",
            nom_ville: "pont-saint-esprit",
            code_ville: "30"
        },
        {
            id: "948",
            nom_ville: "pierrefitte-sur-seine",
            code_ville: "93"
        },
        {
            id: "949",
            nom_ville: "lillers",
            code_ville: "62"
        },
        {
            id: "950",
            nom_ville: "villeneuve-saint-georges",
            code_ville: "94"
        },
        {
            id: "951",
            nom_ville: "fleury-merogis",
            code_ville: "91"
        },
        {
            id: "952",
            nom_ville: "argenteuil",
            code_ville: "95"
        },
        {
            id: "953",
            nom_ville: "corbeil-essonnes",
            code_ville: "91"
        },
        {
            id: "954",
            nom_ville: "coursan",
            code_ville: "11"
        },
        {
            id: "955",
            nom_ville: "apt",
            code_ville: "84"
        },
        {
            id: "956",
            nom_ville: "sainte-foy-la-grande",
            code_ville: "33"
        },
        {
            id: "957",
            nom_ville: "castillon-la-bataille",
            code_ville: "33"
        },
        {
            id: "958",
            nom_ville: "tarascon",
            code_ville: "13"
        },
        {
            id: "959",
            nom_ville: "garges-les-gonesse",
            code_ville: "95"
        },
        {
            id: "960",
            nom_ville: "grigny",
            code_ville: "91"
        }
    ]
    public displayedColumns: string[] = ['Commune', 'Prix Moyen m2', 'Valeur fonciere moyenne', 'Prix median m2'];
    public villeData: MatTableDataSource<DataPerVilleNoSqlResponse> = new MatTableDataSource<DataPerVilleNoSqlResponse>();
    public selectedVille: string = '';
    public selectedVilleData: any = {
        ville: '',
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
    public selectedVilleDataFields: string[] = [];
    public villeList: string[] = []
    constructor(private dataPerRegionService: DataPerRegionService, private immoDataService: ImmoDataService) {

    }
    ngOnInit(): void {
        this.getData()
    }

    public getData(): void {
        this.villesConnues.forEach(ville => {
            this.immoDataService.getDataByCommune(ville).subscribe((data: DataPerVilleNoSqlResponse[]) => {
                this.villeData.data.push(data[0]);
                this.villeData._updateChangeSubscription();
            });
        });
    }


    public onSelectVille(ville: any) {
        this.selectedVille = ville.nom_ville
        console.log(this.selectedVille)
        // this.selectedVilleData = this.villeData.data.find(data => data.ville === ville.ville)!
        this.selectedVilleDataFields = Object.keys(this.selectedVilleData)
        this.selectedVilleDataFields.shift();
    }

}


