import { TAllCountryObj } from "store/actions/general.actions";
import { TQuestion } from "trolly/modules";

// #region countries options
const countriesOptions = [
  {
    id: 2,
    iso: "AL",
    name: "ALBANIA",
    nicename: "Albania",
    iso3: "ALB",
    numcode: 8,
    phonecode: 355,
  },
  {
    id: 3,
    iso: "DZ",
    name: "ALGERIA",
    nicename: "Algeria",
    iso3: "DZA",
    numcode: 12,
    phonecode: 213,
  },
  {
    id: 4,
    iso: "AS",
    name: "AMERICAN SAMOA",
    nicename: "American Samoa",
    iso3: "ASM",
    numcode: 16,
    phonecode: 1684,
  },
  {
    id: 5,
    iso: "AD",
    name: "ANDORRA",
    nicename: "Andorra",
    iso3: "AND",
    numcode: 20,
    phonecode: 376,
  },
  {
    id: 6,
    iso: "AO",
    name: "ANGOLA",
    nicename: "Angola",
    iso3: "AGO",
    numcode: 24,
    phonecode: 244,
  },
  {
    id: 7,
    iso: "AI",
    name: "ANGUILLA",
    nicename: "Anguilla",
    iso3: "AIA",
    numcode: 660,
    phonecode: 1264,
  },
  {
    id: 9,
    iso: "AG",
    name: "ANTIGUA AND BARBUDA",
    nicename: "Antigua and Barbuda",
    iso3: "ATG",
    numcode: 28,
    phonecode: 1268,
  },
  {
    id: 10,
    iso: "AR",
    name: "ARGENTINA",
    nicename: "Argentina",
    iso3: "ARG",
    numcode: 32,
    phonecode: 54,
  },
  {
    id: 11,
    iso: "AM",
    name: "ARMENIA",
    nicename: "Armenia",
    iso3: "ARM",
    numcode: 51,
    phonecode: 374,
  },
  {
    id: 12,
    iso: "AW",
    name: "ARUBA",
    nicename: "Aruba",
    iso3: "ABW",
    numcode: 533,
    phonecode: 297,
  },
  {
    id: 13,
    iso: "AU",
    name: "AUSTRALIA",
    nicename: "Australia",
    iso3: "AUS",
    numcode: 36,
    phonecode: 61,
  },
  {
    id: 14,
    iso: "AT",
    name: "AUSTRIA",
    nicename: "Austria",
    iso3: "AUT",
    numcode: 40,
    phonecode: 43,
  },
  {
    id: 15,
    iso: "AZ",
    name: "AZERBAIJAN",
    nicename: "Azerbaijan",
    iso3: "AZE",
    numcode: 31,
    phonecode: 994,
  },
  {
    id: 16,
    iso: "BS",
    name: "BAHAMAS",
    nicename: "Bahamas",
    iso3: "BHS",
    numcode: 44,
    phonecode: 1242,
  },
  {
    id: 17,
    iso: "BH",
    name: "BAHRAIN",
    nicename: "Bahrain",
    iso3: "BHR",
    numcode: 48,
    phonecode: 973,
  },
  {
    id: 18,
    iso: "BD",
    name: "BANGLADESH",
    nicename: "Bangladesh",
    iso3: "BGD",
    numcode: 50,
    phonecode: 880,
  },
  {
    id: 19,
    iso: "BB",
    name: "BARBADOS",
    nicename: "Barbados",
    iso3: "BRB",
    numcode: 52,
    phonecode: 1246,
  },
  {
    id: 20,
    iso: "BY",
    name: "BELARUS",
    nicename: "Belarus",
    iso3: "BLR",
    numcode: 112,
    phonecode: 375,
  },
  {
    id: 21,
    iso: "BE",
    name: "BELGIUM",
    nicename: "Belgium",
    iso3: "BEL",
    numcode: 56,
    phonecode: 32,
  },
  {
    id: 22,
    iso: "BZ",
    name: "BELIZE",
    nicename: "Belize",
    iso3: "BLZ",
    numcode: 84,
    phonecode: 501,
  },
  {
    id: 23,
    iso: "BJ",
    name: "BENIN",
    nicename: "Benin",
    iso3: "BEN",
    numcode: 204,
    phonecode: 229,
  },
  {
    id: 24,
    iso: "BM",
    name: "BERMUDA",
    nicename: "Bermuda",
    iso3: "BMU",
    numcode: 60,
    phonecode: 1441,
  },
  {
    id: 25,
    iso: "BT",
    name: "BHUTAN",
    nicename: "Bhutan",
    iso3: "BTN",
    numcode: 64,
    phonecode: 975,
  },
  {
    id: 26,
    iso: "BO",
    name: "BOLIVIA",
    nicename: "Bolivia",
    iso3: "BOL",
    numcode: 68,
    phonecode: 591,
  },
  {
    id: 27,
    iso: "BA",
    name: "BOSNIA AND HERZEGOVINA",
    nicename: "Bosnia and Herzegovina",
    iso3: "BIH",
    numcode: 70,
    phonecode: 387,
  },
  {
    id: 28,
    iso: "BW",
    name: "BOTSWANA",
    nicename: "Botswana",
    iso3: "BWA",
    numcode: 72,
    phonecode: 267,
  },
  {
    id: 30,
    iso: "BR",
    name: "BRAZIL",
    nicename: "Brazil",
    iso3: "BRA",
    numcode: 76,
    phonecode: 55,
  },
  {
    id: 32,
    iso: "BN",
    name: "BRUNEI DARUSSALAM",
    nicename: "Brunei Darussalam",
    iso3: "BRN",
    numcode: 96,
    phonecode: 673,
  },
  {
    id: 33,
    iso: "BG",
    name: "BULGARIA",
    nicename: "Bulgaria",
    iso3: "BGR",
    numcode: 100,
    phonecode: 359,
  },
  {
    id: 34,
    iso: "BF",
    name: "BURKINA FASO",
    nicename: "Burkina Faso",
    iso3: "BFA",
    numcode: 854,
    phonecode: 226,
  },
  {
    id: 35,
    iso: "BI",
    name: "BURUNDI",
    nicename: "Burundi",
    iso3: "BDI",
    numcode: 108,
    phonecode: 257,
  },
  {
    id: 36,
    iso: "KH",
    name: "CAMBODIA",
    nicename: "Cambodia",
    iso3: "KHM",
    numcode: 116,
    phonecode: 855,
  },
  {
    id: 37,
    iso: "CM",
    name: "CAMEROON",
    nicename: "Cameroon",
    iso3: "CMR",
    numcode: 120,
    phonecode: 237,
  },
  {
    id: 242,
    iso: "CA",
    name: "Canada",
    nicename: "Canada",
    iso3: "CAN",
    numcode: null,
    phonecode: 1,
  },
  {
    id: 39,
    iso: "CV",
    name: "CAPE VERDE",
    nicename: "Cape Verde",
    iso3: "CPV",
    numcode: 132,
    phonecode: 238,
  },
  {
    id: 40,
    iso: "KY",
    name: "CAYMAN ISLANDS",
    nicename: "Cayman Islands",
    iso3: "CYM",
    numcode: 136,
    phonecode: 1345,
  },
  {
    id: 41,
    iso: "CF",
    name: "CENTRAL AFRICAN REPUBLIC",
    nicename: "Central African Republic",
    iso3: "CAF",
    numcode: 140,
    phonecode: 236,
  },
  {
    id: 42,
    iso: "TD",
    name: "CHAD",
    nicename: "Chad",
    iso3: "TCD",
    numcode: 148,
    phonecode: 235,
  },
  {
    id: 43,
    iso: "CL",
    name: "CHILE",
    nicename: "Chile",
    iso3: "CHL",
    numcode: 152,
    phonecode: 56,
  },
  {
    id: 44,
    iso: "CN",
    name: "CHINA",
    nicename: "China",
    iso3: "CHN",
    numcode: 156,
    phonecode: 86,
  },
  {
    id: 47,
    iso: "CO",
    name: "COLOMBIA",
    nicename: "Colombia",
    iso3: "COL",
    numcode: 170,
    phonecode: 57,
  },
  {
    id: 48,
    iso: "KM",
    name: "COMOROS",
    nicename: "Comoros",
    iso3: "COM",
    numcode: 174,
    phonecode: 269,
  },
  {
    id: 49,
    iso: "CG",
    name: "CONGO",
    nicename: "Congo",
    iso3: "COG",
    numcode: 178,
    phonecode: 242,
  },
  {
    id: 50,
    iso: "CD",
    name: "CONGO, THE DEMOCRATIC REPUBLIC OF THE",
    nicename: "Congo, the Democratic Republic of the",
    iso3: "COD",
    numcode: 180,
    phonecode: 242,
  },
  {
    id: 51,
    iso: "CK",
    name: "COOK ISLANDS",
    nicename: "Cook Islands",
    iso3: "COK",
    numcode: 184,
    phonecode: 682,
  },
  {
    id: 52,
    iso: "CR",
    name: "COSTA RICA",
    nicename: "Costa Rica",
    iso3: "CRI",
    numcode: 188,
    phonecode: 506,
  },
  {
    id: 53,
    iso: "CI",
    name: "COTE D'IVOIRE",
    nicename: "Cote D'Ivoire",
    iso3: "CIV",
    numcode: 384,
    phonecode: 225,
  },
  {
    id: 54,
    iso: "HR",
    name: "CROATIA",
    nicename: "Croatia",
    iso3: "HRV",
    numcode: 191,
    phonecode: 385,
  },
  {
    id: 55,
    iso: "CU",
    name: "CUBA",
    nicename: "Cuba",
    iso3: "CUB",
    numcode: 192,
    phonecode: 53,
  },
  {
    id: 56,
    iso: "CY",
    name: "CYPRUS",
    nicename: "Cyprus",
    iso3: "CYP",
    numcode: 196,
    phonecode: 357,
  },
  {
    id: 57,
    iso: "CZ",
    name: "CZECH REPUBLIC",
    nicename: "Czech Republic",
    iso3: "CZE",
    numcode: 203,
    phonecode: 420,
  },
  {
    id: 58,
    iso: "DK",
    name: "DENMARK",
    nicename: "Denmark",
    iso3: "DNK",
    numcode: 208,
    phonecode: 45,
  },
  {
    id: 59,
    iso: "DJ",
    name: "DJIBOUTI",
    nicename: "Djibouti",
    iso3: "DJI",
    numcode: 262,
    phonecode: 253,
  },
  {
    id: 60,
    iso: "DM",
    name: "DOMINICA",
    nicename: "Dominica",
    iso3: "DMA",
    numcode: 212,
    phonecode: 1767,
  },
  {
    id: 61,
    iso: "DO",
    name: "DOMINICAN REPUBLIC",
    nicename: "Dominican Republic",
    iso3: "DOM",
    numcode: 214,
    phonecode: 1809,
  },
  {
    id: 62,
    iso: "EC",
    name: "ECUADOR",
    nicename: "Ecuador",
    iso3: "ECU",
    numcode: 218,
    phonecode: 593,
  },
  {
    id: 63,
    iso: "EG",
    name: "EGYPT",
    nicename: "Egypt",
    iso3: "EGY",
    numcode: 818,
    phonecode: 20,
  },
  {
    id: 64,
    iso: "SV",
    name: "EL SALVADOR",
    nicename: "El Salvador",
    iso3: "SLV",
    numcode: 222,
    phonecode: 503,
  },
  {
    id: 65,
    iso: "GQ",
    name: "EQUATORIAL GUINEA",
    nicename: "Equatorial Guinea",
    iso3: "GNQ",
    numcode: 226,
    phonecode: 240,
  },
  {
    id: 66,
    iso: "ER",
    name: "ERITREA",
    nicename: "Eritrea",
    iso3: "ERI",
    numcode: 232,
    phonecode: 291,
  },
  {
    id: 67,
    iso: "EE",
    name: "ESTONIA",
    nicename: "Estonia",
    iso3: "EST",
    numcode: 233,
    phonecode: 372,
  },
  {
    id: 68,
    iso: "ET",
    name: "ETHIOPIA",
    nicename: "Ethiopia",
    iso3: "ETH",
    numcode: 231,
    phonecode: 251,
  },
  {
    id: 69,
    iso: "FK",
    name: "FALKLAND ISLANDS (MALVINAS)",
    nicename: "Falkland Islands (Malvinas)",
    iso3: "FLK",
    numcode: 238,
    phonecode: 500,
  },
  {
    id: 70,
    iso: "FO",
    name: "FAROE ISLANDS",
    nicename: "Faroe Islands",
    iso3: "FRO",
    numcode: 234,
    phonecode: 298,
  },
  {
    id: 71,
    iso: "FJ",
    name: "FIJI",
    nicename: "Fiji",
    iso3: "FJI",
    numcode: 242,
    phonecode: 679,
  },
  {
    id: 72,
    iso: "FI",
    name: "FINLAND",
    nicename: "Finland",
    iso3: "FIN",
    numcode: 246,
    phonecode: 358,
  },
  {
    id: 73,
    iso: "FR",
    name: "FRANCE",
    nicename: "France",
    iso3: "FRA",
    numcode: 250,
    phonecode: 33,
  },
  {
    id: 74,
    iso: "GF",
    name: "FRENCH GUIANA",
    nicename: "French Guiana",
    iso3: "GUF",
    numcode: 254,
    phonecode: 594,
  },
  {
    id: 75,
    iso: "PF",
    name: "FRENCH POLYNESIA",
    nicename: "French Polynesia",
    iso3: "PYF",
    numcode: 258,
    phonecode: 689,
  },
  {
    id: 77,
    iso: "GA",
    name: "GABON",
    nicename: "Gabon",
    iso3: "GAB",
    numcode: 266,
    phonecode: 241,
  },
  {
    id: 78,
    iso: "GM",
    name: "GAMBIA",
    nicename: "Gambia",
    iso3: "GMB",
    numcode: 270,
    phonecode: 220,
  },
  {
    id: 79,
    iso: "GE",
    name: "GEORGIA",
    nicename: "Georgia",
    iso3: "GEO",
    numcode: 268,
    phonecode: 995,
  },
  {
    id: 80,
    iso: "DE",
    name: "GERMANY",
    nicename: "Germany",
    iso3: "DEU",
    numcode: 276,
    phonecode: 49,
  },
  {
    id: 81,
    iso: "GH",
    name: "GHANA",
    nicename: "Ghana",
    iso3: "GHA",
    numcode: 288,
    phonecode: 233,
  },
  {
    id: 82,
    iso: "GI",
    name: "GIBRALTAR",
    nicename: "Gibraltar",
    iso3: "GIB",
    numcode: 292,
    phonecode: 350,
  },
  {
    id: 83,
    iso: "GR",
    name: "GREECE",
    nicename: "Greece",
    iso3: "GRC",
    numcode: 300,
    phonecode: 30,
  },
  {
    id: 84,
    iso: "GL",
    name: "GREENLAND",
    nicename: "Greenland",
    iso3: "GRL",
    numcode: 304,
    phonecode: 299,
  },
  {
    id: 85,
    iso: "GD",
    name: "GRENADA",
    nicename: "Grenada",
    iso3: "GRD",
    numcode: 308,
    phonecode: 1473,
  },
  {
    id: 86,
    iso: "GP",
    name: "GUADELOUPE",
    nicename: "Guadeloupe",
    iso3: "GLP",
    numcode: 312,
    phonecode: 590,
  },
  {
    id: 87,
    iso: "GU",
    name: "GUAM",
    nicename: "Guam",
    iso3: "GUM",
    numcode: 316,
    phonecode: 1671,
  },
  {
    id: 88,
    iso: "GT",
    name: "GUATEMALA",
    nicename: "Guatemala",
    iso3: "GTM",
    numcode: 320,
    phonecode: 502,
  },
  {
    id: 89,
    iso: "GN",
    name: "GUINEA",
    nicename: "Guinea",
    iso3: "GIN",
    numcode: 324,
    phonecode: 224,
  },
  {
    id: 90,
    iso: "GW",
    name: "GUINEA-BISSAU",
    nicename: "Guinea-Bissau",
    iso3: "GNB",
    numcode: 624,
    phonecode: 245,
  },
  {
    id: 91,
    iso: "GY",
    name: "GUYANA",
    nicename: "Guyana",
    iso3: "GUY",
    numcode: 328,
    phonecode: 592,
  },
  {
    id: 92,
    iso: "HT",
    name: "HAITI",
    nicename: "Haiti",
    iso3: "HTI",
    numcode: 332,
    phonecode: 509,
  },
  {
    id: 94,
    iso: "VA",
    name: "HOLY SEE (VATICAN CITY STATE)",
    nicename: "Holy See (Vatican City State)",
    iso3: "VAT",
    numcode: 336,
    phonecode: 39,
  },
  {
    id: 95,
    iso: "HN",
    name: "HONDURAS",
    nicename: "Honduras",
    iso3: "HND",
    numcode: 340,
    phonecode: 504,
  },
  {
    id: 96,
    iso: "HK",
    name: "HONG KONG",
    nicename: "Hong Kong",
    iso3: "HKG",
    numcode: 344,
    phonecode: 852,
  },
  {
    id: 97,
    iso: "HU",
    name: "HUNGARY",
    nicename: "Hungary",
    iso3: "HUN",
    numcode: 348,
    phonecode: 36,
  },
  {
    id: 98,
    iso: "IS",
    name: "ICELAND",
    nicename: "Iceland",
    iso3: "ISL",
    numcode: 352,
    phonecode: 354,
  },
  {
    id: 99,
    iso: "IN",
    name: "INDIA",
    nicename: "India",
    iso3: "IND",
    numcode: 356,
    phonecode: 91,
  },
  {
    id: 100,
    iso: "ID",
    name: "INDONESIA",
    nicename: "Indonesia",
    iso3: "IDN",
    numcode: 360,
    phonecode: 62,
  },
  {
    id: 101,
    iso: "IR",
    name: "IRAN, ISLAMIC REPUBLIC OF",
    nicename: "Iran, Islamic Republic of",
    iso3: "IRN",
    numcode: 364,
    phonecode: 98,
  },
  {
    id: 102,
    iso: "IQ",
    name: "IRAQ",
    nicename: "Iraq",
    iso3: "IRQ",
    numcode: 368,
    phonecode: 964,
  },
  {
    id: 103,
    iso: "IE",
    name: "IRELAND",
    nicename: "Ireland",
    iso3: "IRL",
    numcode: 372,
    phonecode: 353,
  },
  {
    id: 105,
    iso: "IT",
    name: "ITALY",
    nicename: "Italy",
    iso3: "ITA",
    numcode: 380,
    phonecode: 39,
  },
  {
    id: 106,
    iso: "JM",
    name: "JAMAICA",
    nicename: "Jamaica",
    iso3: "JAM",
    numcode: 388,
    phonecode: 1876,
  },
  {
    id: 107,
    iso: "JP",
    name: "JAPAN",
    nicename: "Japan",
    iso3: "JPN",
    numcode: 392,
    phonecode: 81,
  },
  {
    id: 108,
    iso: "JO",
    name: "JORDAN",
    nicename: "Jordan",
    iso3: "JOR",
    numcode: 400,
    phonecode: 962,
  },
  {
    id: 109,
    iso: "KZ",
    name: "KAZAKHSTAN",
    nicename: "Kazakhstan",
    iso3: "KAZ",
    numcode: 398,
    phonecode: 7,
  },
  {
    id: 110,
    iso: "KE",
    name: "KENYA",
    nicename: "Kenya",
    iso3: "KEN",
    numcode: 404,
    phonecode: 254,
  },
  {
    id: 111,
    iso: "KI",
    name: "KIRIBATI",
    nicename: "Kiribati",
    iso3: "KIR",
    numcode: 296,
    phonecode: 686,
  },
  {
    id: 112,
    iso: "KP",
    name: "KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF",
    nicename: "Korea, Democratic People's Republic of",
    iso3: "PRK",
    numcode: 408,
    phonecode: 850,
  },
  {
    id: 113,
    iso: "KR",
    name: "KOREA, REPUBLIC OF",
    nicename: "Korea, Republic of",
    iso3: "KOR",
    numcode: 410,
    phonecode: 82,
  },
  {
    id: 114,
    iso: "KW",
    name: "KUWAIT",
    nicename: "Kuwait",
    iso3: "KWT",
    numcode: 414,
    phonecode: 965,
  },
  {
    id: 115,
    iso: "KG",
    name: "KYRGYZSTAN",
    nicename: "Kyrgyzstan",
    iso3: "KGZ",
    numcode: 417,
    phonecode: 996,
  },
  {
    id: 116,
    iso: "LA",
    name: "LAO PEOPLE'S DEMOCRATIC REPUBLIC",
    nicename: "Lao People's Democratic Republic",
    iso3: "LAO",
    numcode: 418,
    phonecode: 856,
  },
  {
    id: 117,
    iso: "LV",
    name: "LATVIA",
    nicename: "Latvia",
    iso3: "LVA",
    numcode: 428,
    phonecode: 371,
  },
  {
    id: 240,
    iso: "LB",
    name: "Lebanon",
    nicename: "Lebanon",
    iso3: "LBN",
    numcode: null,
    phonecode: 961,
  },
  {
    id: 119,
    iso: "LS",
    name: "LESOTHO",
    nicename: "Lesotho",
    iso3: "LSO",
    numcode: 426,
    phonecode: 266,
  },
  {
    id: 120,
    iso: "LR",
    name: "LIBERIA",
    nicename: "Liberia",
    iso3: "LBR",
    numcode: 430,
    phonecode: 231,
  },
  {
    id: 121,
    iso: "LY",
    name: "LIBYAN ARAB JAMAHIRIYA",
    nicename: "Libyan Arab Jamahiriya",
    iso3: "LBY",
    numcode: 434,
    phonecode: 218,
  },
  {
    id: 122,
    iso: "LI",
    name: "LIECHTENSTEIN",
    nicename: "Liechtenstein",
    iso3: "LIE",
    numcode: 438,
    phonecode: 423,
  },
  {
    id: 123,
    iso: "LT",
    name: "LITHUANIA",
    nicename: "Lithuania",
    iso3: "LTU",
    numcode: 440,
    phonecode: 370,
  },
  {
    id: 124,
    iso: "LU",
    name: "LUXEMBOURG",
    nicename: "Luxembourg",
    iso3: "LUX",
    numcode: 442,
    phonecode: 352,
  },
  {
    id: 125,
    iso: "MO",
    name: "MACAO",
    nicename: "Macao",
    iso3: "MAC",
    numcode: 446,
    phonecode: 853,
  },
  {
    id: 126,
    iso: "MK",
    name: "MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF",
    nicename: "Macedonia, the Former Yugoslav Republic of",
    iso3: "MKD",
    numcode: 807,
    phonecode: 389,
  },
  {
    id: 127,
    iso: "MG",
    name: "MADAGASCAR",
    nicename: "Madagascar",
    iso3: "MDG",
    numcode: 450,
    phonecode: 261,
  },
  {
    id: 128,
    iso: "MW",
    name: "MALAWI",
    nicename: "Malawi",
    iso3: "MWI",
    numcode: 454,
    phonecode: 265,
  },
  {
    id: 129,
    iso: "MY",
    name: "MALAYSIA",
    nicename: "Malaysia",
    iso3: "MYS",
    numcode: 458,
    phonecode: 60,
  },
  {
    id: 130,
    iso: "MV",
    name: "MALDIVES",
    nicename: "Maldives",
    iso3: "MDV",
    numcode: 462,
    phonecode: 960,
  },
  {
    id: 131,
    iso: "ML",
    name: "MALI",
    nicename: "Mali",
    iso3: "MLI",
    numcode: 466,
    phonecode: 223,
  },
  {
    id: 132,
    iso: "MT",
    name: "MALTA",
    nicename: "Malta",
    iso3: "MLT",
    numcode: 470,
    phonecode: 356,
  },
  {
    id: 133,
    iso: "MH",
    name: "MARSHALL ISLANDS",
    nicename: "Marshall Islands",
    iso3: "MHL",
    numcode: 584,
    phonecode: 692,
  },
  {
    id: 134,
    iso: "MQ",
    name: "MARTINIQUE",
    nicename: "Martinique",
    iso3: "MTQ",
    numcode: 474,
    phonecode: 596,
  },
  {
    id: 135,
    iso: "MR",
    name: "MAURITANIA",
    nicename: "Mauritania",
    iso3: "MRT",
    numcode: 478,
    phonecode: 222,
  },
  {
    id: 136,
    iso: "MU",
    name: "MAURITIUS",
    nicename: "Mauritius",
    iso3: "MUS",
    numcode: 480,
    phonecode: 230,
  },
  {
    id: 138,
    iso: "MX",
    name: "MEXICO",
    nicename: "Mexico",
    iso3: "MEX",
    numcode: 484,
    phonecode: 52,
  },
  {
    id: 139,
    iso: "FM",
    name: "MICRONESIA, FEDERATED STATES OF",
    nicename: "Micronesia, Federated States of",
    iso3: "FSM",
    numcode: 583,
    phonecode: 691,
  },
  {
    id: 140,
    iso: "MD",
    name: "MOLDOVA, REPUBLIC OF",
    nicename: "Moldova, Republic of",
    iso3: "MDA",
    numcode: 498,
    phonecode: 373,
  },
  {
    id: 141,
    iso: "MC",
    name: "MONACO",
    nicename: "Monaco",
    iso3: "MCO",
    numcode: 492,
    phonecode: 377,
  },
  {
    id: 142,
    iso: "MN",
    name: "MONGOLIA",
    nicename: "Mongolia",
    iso3: "MNG",
    numcode: 496,
    phonecode: 976,
  },
  {
    id: 143,
    iso: "MS",
    name: "MONTSERRAT",
    nicename: "Montserrat",
    iso3: "MSR",
    numcode: 500,
    phonecode: 1664,
  },
  {
    id: 144,
    iso: "MA",
    name: "MOROCCO",
    nicename: "Morocco",
    iso3: "MAR",
    numcode: 504,
    phonecode: 212,
  },
  {
    id: 145,
    iso: "MZ",
    name: "MOZAMBIQUE",
    nicename: "Mozambique",
    iso3: "MOZ",
    numcode: 508,
    phonecode: 258,
  },
  {
    id: 146,
    iso: "MM",
    name: "MYANMAR",
    nicename: "Myanmar",
    iso3: "MMR",
    numcode: 104,
    phonecode: 95,
  },
  {
    id: 147,
    iso: "NA",
    name: "NAMIBIA",
    nicename: "Namibia",
    iso3: "NAM",
    numcode: 516,
    phonecode: 264,
  },
  {
    id: 148,
    iso: "NR",
    name: "NAURU",
    nicename: "Nauru",
    iso3: "NRU",
    numcode: 520,
    phonecode: 674,
  },
  {
    id: 149,
    iso: "NP",
    name: "NEPAL",
    nicename: "Nepal",
    iso3: "NPL",
    numcode: 524,
    phonecode: 977,
  },
  {
    id: 150,
    iso: "NL",
    name: "NETHERLANDS",
    nicename: "Netherlands",
    iso3: "NLD",
    numcode: 528,
    phonecode: 31,
  },
  {
    id: 151,
    iso: "AN",
    name: "NETHERLANDS ANTILLES",
    nicename: "Netherlands Antilles",
    iso3: "ANT",
    numcode: 530,
    phonecode: 599,
  },
  {
    id: 152,
    iso: "NC",
    name: "NEW CALEDONIA",
    nicename: "New Caledonia",
    iso3: "NCL",
    numcode: 540,
    phonecode: 687,
  },
  {
    id: 153,
    iso: "NZ",
    name: "NEW ZEALAND",
    nicename: "New Zealand",
    iso3: "NZL",
    numcode: 554,
    phonecode: 64,
  },
  {
    id: 154,
    iso: "NI",
    name: "NICARAGUA",
    nicename: "Nicaragua",
    iso3: "NIC",
    numcode: 558,
    phonecode: 505,
  },
  {
    id: 155,
    iso: "NE",
    name: "NIGER",
    nicename: "Niger",
    iso3: "NER",
    numcode: 562,
    phonecode: 227,
  },
  {
    id: 156,
    iso: "NG",
    name: "NIGERIA",
    nicename: "Nigeria",
    iso3: "NGA",
    numcode: 566,
    phonecode: 234,
  },
  {
    id: 157,
    iso: "NU",
    name: "NIUE",
    nicename: "Niue",
    iso3: "NIU",
    numcode: 570,
    phonecode: 683,
  },
  {
    id: 158,
    iso: "NF",
    name: "NORFOLK ISLAND",
    nicename: "Norfolk Island",
    iso3: "NFK",
    numcode: 574,
    phonecode: 672,
  },
  {
    id: 159,
    iso: "MP",
    name: "NORTHERN MARIANA ISLANDS",
    nicename: "Northern Mariana Islands",
    iso3: "MNP",
    numcode: 580,
    phonecode: 1670,
  },
  {
    id: 160,
    iso: "NO",
    name: "NORWAY",
    nicename: "Norway",
    iso3: "NOR",
    numcode: 578,
    phonecode: 47,
  },
  {
    id: 161,
    iso: "OM",
    name: "OMAN",
    nicename: "Oman",
    iso3: "OMN",
    numcode: 512,
    phonecode: 968,
  },
  {
    id: 162,
    iso: "PK",
    name: "PAKISTAN",
    nicename: "Pakistan",
    iso3: "PAK",
    numcode: 586,
    phonecode: 92,
  },
  {
    id: 163,
    iso: "PW",
    name: "PALAU",
    nicename: "Palau",
    iso3: "PLW",
    numcode: 585,
    phonecode: 680,
  },
  {
    id: 165,
    iso: "PA",
    name: "PANAMA",
    nicename: "Panama",
    iso3: "PAN",
    numcode: 591,
    phonecode: 507,
  },
  {
    id: 166,
    iso: "PG",
    name: "PAPUA NEW GUINEA",
    nicename: "Papua New Guinea",
    iso3: "PNG",
    numcode: 598,
    phonecode: 675,
  },
  {
    id: 167,
    iso: "PY",
    name: "PARAGUAY",
    nicename: "Paraguay",
    iso3: "PRY",
    numcode: 600,
    phonecode: 595,
  },
  {
    id: 168,
    iso: "PE",
    name: "PERU",
    nicename: "Peru",
    iso3: "PER",
    numcode: 604,
    phonecode: 51,
  },
  {
    id: 169,
    iso: "PH",
    name: "PHILIPPINES",
    nicename: "Philippines",
    iso3: "PHL",
    numcode: 608,
    phonecode: 63,
  },
  {
    id: 170,
    iso: "PN",
    name: "PITCAIRN",
    nicename: "Pitcairn",
    iso3: "PCN",
    numcode: 612,
    phonecode: 0,
  },
  {
    id: 171,
    iso: "PL",
    name: "POLAND",
    nicename: "Poland",
    iso3: "POL",
    numcode: 616,
    phonecode: 48,
  },
  {
    id: 172,
    iso: "PT",
    name: "PORTUGAL",
    nicename: "Portugal",
    iso3: "PRT",
    numcode: 620,
    phonecode: 351,
  },
  {
    id: 173,
    iso: "PR",
    name: "PUERTO RICO",
    nicename: "Puerto Rico",
    iso3: "PRI",
    numcode: 630,
    phonecode: 1787,
  },
  {
    id: 174,
    iso: "QA",
    name: "QATAR",
    nicename: "Qatar",
    iso3: "QAT",
    numcode: 634,
    phonecode: 974,
  },
  {
    id: 175,
    iso: "RE",
    name: "REUNION",
    nicename: "Reunion",
    iso3: "REU",
    numcode: 638,
    phonecode: 262,
  },
  {
    id: 176,
    iso: "RO",
    name: "ROMANIA",
    nicename: "Romania",
    iso3: "ROM",
    numcode: 642,
    phonecode: 40,
  },
  {
    id: 177,
    iso: "RU",
    name: "RUSSIAN FEDERATION",
    nicename: "Russian Federation",
    iso3: "RUS",
    numcode: 643,
    phonecode: 70,
  },
  {
    id: 178,
    iso: "RW",
    name: "RWANDA",
    nicename: "Rwanda",
    iso3: "RWA",
    numcode: 646,
    phonecode: 250,
  },
  {
    id: 179,
    iso: "SH",
    name: "SAINT HELENA",
    nicename: "Saint Helena",
    iso3: "SHN",
    numcode: 654,
    phonecode: 290,
  },
  {
    id: 180,
    iso: "KN",
    name: "SAINT KITTS AND NEVIS",
    nicename: "Saint Kitts and Nevis",
    iso3: "KNA",
    numcode: 659,
    phonecode: 1869,
  },
  {
    id: 181,
    iso: "LC",
    name: "SAINT LUCIA",
    nicename: "Saint Lucia",
    iso3: "LCA",
    numcode: 662,
    phonecode: 1758,
  },
  {
    id: 182,
    iso: "PM",
    name: "SAINT PIERRE AND MIQUELON",
    nicename: "Saint Pierre and Miquelon",
    iso3: "SPM",
    numcode: 666,
    phonecode: 508,
  },
  {
    id: 183,
    iso: "VC",
    name: "SAINT VINCENT AND THE GRENADINES",
    nicename: "Saint Vincent and the Grenadines",
    iso3: "VCT",
    numcode: 670,
    phonecode: 1784,
  },
  {
    id: 184,
    iso: "WS",
    name: "SAMOA",
    nicename: "Samoa",
    iso3: "WSM",
    numcode: 882,
    phonecode: 684,
  },
  {
    id: 185,
    iso: "SM",
    name: "SAN MARINO",
    nicename: "San Marino",
    iso3: "SMR",
    numcode: 674,
    phonecode: 378,
  },
  {
    id: 186,
    iso: "ST",
    name: "SAO TOME AND PRINCIPE",
    nicename: "Sao Tome and Principe",
    iso3: "STP",
    numcode: 678,
    phonecode: 239,
  },
  {
    id: 187,
    iso: "SA",
    name: "SAUDI ARABIA",
    nicename: "Saudi Arabia",
    iso3: "SAU",
    numcode: 682,
    phonecode: 966,
  },
  {
    id: 188,
    iso: "SN",
    name: "SENEGAL",
    nicename: "Senegal",
    iso3: "SEN",
    numcode: 686,
    phonecode: 221,
  },
  {
    id: 190,
    iso: "SC",
    name: "SEYCHELLES",
    nicename: "Seychelles",
    iso3: "SYC",
    numcode: 690,
    phonecode: 248,
  },
  {
    id: 191,
    iso: "SL",
    name: "SIERRA LEONE",
    nicename: "Sierra Leone",
    iso3: "SLE",
    numcode: 694,
    phonecode: 232,
  },
  {
    id: 192,
    iso: "SG",
    name: "SINGAPORE",
    nicename: "Singapore",
    iso3: "SGP",
    numcode: 702,
    phonecode: 65,
  },
  {
    id: 193,
    iso: "SK",
    name: "SLOVAKIA",
    nicename: "Slovakia",
    iso3: "SVK",
    numcode: 703,
    phonecode: 421,
  },
  {
    id: 194,
    iso: "SI",
    name: "SLOVENIA",
    nicename: "Slovenia",
    iso3: "SVN",
    numcode: 705,
    phonecode: 386,
  },
  {
    id: 195,
    iso: "SB",
    name: "SOLOMON ISLANDS",
    nicename: "Solomon Islands",
    iso3: "SLB",
    numcode: 90,
    phonecode: 677,
  },
  {
    id: 196,
    iso: "SO",
    name: "SOMALIA",
    nicename: "Somalia",
    iso3: "SOM",
    numcode: 706,
    phonecode: 252,
  },
  {
    id: 197,
    iso: "ZA",
    name: "SOUTH AFRICA",
    nicename: "South Africa",
    iso3: "ZAF",
    numcode: 710,
    phonecode: 27,
  },
  {
    id: 199,
    iso: "ES",
    name: "SPAIN",
    nicename: "Spain",
    iso3: "ESP",
    numcode: 724,
    phonecode: 34,
  },
  {
    id: 200,
    iso: "LK",
    name: "SRI LANKA",
    nicename: "Sri Lanka",
    iso3: "LKA",
    numcode: 144,
    phonecode: 94,
  },
  {
    id: 201,
    iso: "SD",
    name: "SUDAN",
    nicename: "Sudan",
    iso3: "SDN",
    numcode: 736,
    phonecode: 249,
  },
  {
    id: 202,
    iso: "SR",
    name: "SURINAME",
    nicename: "Suriname",
    iso3: "SUR",
    numcode: 740,
    phonecode: 597,
  },
  {
    id: 203,
    iso: "SJ",
    name: "SVALBARD AND JAN MAYEN",
    nicename: "Svalbard and Jan Mayen",
    iso3: "SJM",
    numcode: 744,
    phonecode: 47,
  },
  {
    id: 204,
    iso: "SZ",
    name: "SWAZILAND",
    nicename: "Swaziland",
    iso3: "SWZ",
    numcode: 748,
    phonecode: 268,
  },
  {
    id: 205,
    iso: "SE",
    name: "SWEDEN",
    nicename: "Sweden",
    iso3: "SWE",
    numcode: 752,
    phonecode: 46,
  },
  {
    id: 206,
    iso: "CH",
    name: "SWITZERLAND",
    nicename: "Switzerland",
    iso3: "CHE",
    numcode: 756,
    phonecode: 41,
  },
  {
    id: 207,
    iso: "SY",
    name: "SYRIAN ARAB REPUBLIC",
    nicename: "Syrian Arab Republic",
    iso3: "SYR",
    numcode: 760,
    phonecode: 963,
  },
  {
    id: 208,
    iso: "TW",
    name: "TAIWAN, PROVINCE OF CHINA",
    nicename: "Taiwan, Province of China",
    iso3: "TWN",
    numcode: 158,
    phonecode: 886,
  },
  {
    id: 209,
    iso: "TJ",
    name: "TAJIKISTAN",
    nicename: "Tajikistan",
    iso3: "TJK",
    numcode: 762,
    phonecode: 992,
  },
  {
    id: 210,
    iso: "TZ",
    name: "TANZANIA, UNITED REPUBLIC OF",
    nicename: "Tanzania, United Republic of",
    iso3: "TZA",
    numcode: 834,
    phonecode: 255,
  },
  {
    id: 211,
    iso: "TH",
    name: "THAILAND",
    nicename: "Thailand",
    iso3: "THA",
    numcode: 764,
    phonecode: 66,
  },
  {
    id: 213,
    iso: "TG",
    name: "TOGO",
    nicename: "Togo",
    iso3: "TGO",
    numcode: 768,
    phonecode: 228,
  },
  {
    id: 214,
    iso: "TK",
    name: "TOKELAU",
    nicename: "Tokelau",
    iso3: "TKL",
    numcode: 772,
    phonecode: 690,
  },
  {
    id: 215,
    iso: "TO",
    name: "TONGA",
    nicename: "Tonga",
    iso3: "TON",
    numcode: 776,
    phonecode: 676,
  },
  {
    id: 216,
    iso: "TT",
    name: "TRINIDAD AND TOBAGO",
    nicename: "Trinidad and Tobago",
    iso3: "TTO",
    numcode: 780,
    phonecode: 1868,
  },
  {
    id: 217,
    iso: "TN",
    name: "TUNISIA",
    nicename: "Tunisia",
    iso3: "TUN",
    numcode: 788,
    phonecode: 216,
  },
  {
    id: 218,
    iso: "TR",
    name: "TURKEY",
    nicename: "Turkey",
    iso3: "TUR",
    numcode: 792,
    phonecode: 90,
  },
  {
    id: 219,
    iso: "TM",
    name: "TURKMENISTAN",
    nicename: "Turkmenistan",
    iso3: "TKM",
    numcode: 795,
    phonecode: 7370,
  },
  {
    id: 220,
    iso: "TC",
    name: "TURKS AND CAICOS ISLANDS",
    nicename: "Turks and Caicos Islands",
    iso3: "TCA",
    numcode: 796,
    phonecode: 1649,
  },
  {
    id: 221,
    iso: "TV",
    name: "TUVALU",
    nicename: "Tuvalu",
    iso3: "TUV",
    numcode: 798,
    phonecode: 688,
  },
  {
    id: 222,
    iso: "UG",
    name: "UGANDA",
    nicename: "Uganda",
    iso3: "UGA",
    numcode: 800,
    phonecode: 256,
  },
  {
    id: 223,
    iso: "UA",
    name: "UKRAINE",
    nicename: "Ukraine",
    iso3: "UKR",
    numcode: 804,
    phonecode: 380,
  },
  {
    id: 224,
    iso: "AE",
    name: "UNITED ARAB EMIRATES",
    nicename: "United Arab Emirates",
    iso3: "ARE",
    numcode: 784,
    phonecode: 971,
  },
  {
    id: 225,
    iso: "GB",
    name: "UNITED KINGDOM",
    nicename: "United Kingdom",
    iso3: "GBR",
    numcode: 826,
    phonecode: 44,
  },
  {
    id: 226,
    iso: "US",
    name: "UNITED STATES",
    nicename: "United States",
    iso3: "USA",
    numcode: 840,
    phonecode: 1,
  },
  {
    id: 228,
    iso: "UY",
    name: "URUGUAY",
    nicename: "Uruguay",
    iso3: "URY",
    numcode: 858,
    phonecode: 598,
  },
  {
    id: 229,
    iso: "UZ",
    name: "UZBEKISTAN",
    nicename: "Uzbekistan",
    iso3: "UZB",
    numcode: 860,
    phonecode: 998,
  },
  {
    id: 230,
    iso: "VU",
    name: "VANUATU",
    nicename: "Vanuatu",
    iso3: "VUT",
    numcode: 548,
    phonecode: 678,
  },
  {
    id: 231,
    iso: "VE",
    name: "VENEZUELA",
    nicename: "Venezuela",
    iso3: "VEN",
    numcode: 862,
    phonecode: 58,
  },
  {
    id: 232,
    iso: "VN",
    name: "VIET NAM",
    nicename: "Viet Nam",
    iso3: "VNM",
    numcode: 704,
    phonecode: 84,
  },
  {
    id: 233,
    iso: "VG",
    name: "VIRGIN ISLANDS, BRITISH",
    nicename: "Virgin Islands, British",
    iso3: "VGB",
    numcode: 92,
    phonecode: 1284,
  },
  {
    id: 234,
    iso: "VI",
    name: "VIRGIN ISLANDS, U.S.",
    nicename: "Virgin Islands, U.s.",
    iso3: "VIR",
    numcode: 850,
    phonecode: 1340,
  },
  {
    id: 235,
    iso: "WF",
    name: "WALLIS AND FUTUNA",
    nicename: "Wallis and Futuna",
    iso3: "WLF",
    numcode: 876,
    phonecode: 681,
  },
  {
    id: 236,
    iso: "EH",
    name: "WESTERN SAHARA",
    nicename: "Western Sahara",
    iso3: "ESH",
    numcode: 732,
    phonecode: 212,
  },
  {
    id: 237,
    iso: "YE",
    name: "YEMEN",
    nicename: "Yemen",
    iso3: "YEM",
    numcode: 887,
    phonecode: 967,
  },
  {
    id: 238,
    iso: "ZM",
    name: "ZAMBIA",
    nicename: "Zambia",
    iso3: "ZMB",
    numcode: 894,
    phonecode: 260,
  },
  {
    id: 239,
    iso: "ZW",
    name: "ZIMBABWE",
    nicename: "Zimbabwe",
    iso3: "ZWE",
    numcode: 716,
    phonecode: 263,
  },
];
// #endregion

// #region options used in account opening (countries , phones and other options)
export const options: any = {
  countries: countriesOptions.map(
    ({ iso, nicename, iso3 }: TAllCountryObj) =>
      ({
        value: iso3,
        iso2: iso,
        label: nicename,
      } as any)
  ),
  supportedDwCountries: countriesOptions.map(
    ({ iso, nicename, iso3 }: TAllCountryObj) =>
      ({
        value: iso3,
        iso2: iso,
        label: nicename,
      } as any)
  ),
  phoneCodesDw: countriesOptions.map(
    ({ iso, phonecode, iso3 }: TAllCountryObj) => ({
      value: iso3,
      iso2: iso,
      label: `+${phonecode}`,
      codeNumber: `+${phonecode}`,
    })
  ),
  gender: [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
  ],
  marital: [
    {
      value: "Married",
      label: "Married",
    },
    {
      value: "Single",
      label: "Single",
    },
    {
      value: "Divorced",
      label: "Divorced",
    },
    {
      value: "Separated",
      label: "Separated",
    },
  ],
  state: [
    {
      value: "AL",
      label: "Alabama",
    },
    {
      value: "AK",
      label: "Alaska",
    },
    {
      value: "AZ",
      label: "Arizona",
    },
    {
      value: "AR",
      label: "Arkansas",
    },
    {
      value: "CA",
      label: "California",
    },
    {
      value: "CO",
      label: "Colorado",
    },
    {
      value: "CT",
      label: "Connecticut",
    },
    {
      value: "DE",
      label: "Delaware",
    },
    {
      value: "DC",
      label: "District of Columbia",
    },
    {
      value: "FL",
      label: "Florida",
    },
    {
      value: "GA",
      label: "Georgia",
    },
    {
      value: "HI",
      label: "Hawaii",
    },
    {
      value: "ID",
      label: "Idaho",
    },
    {
      value: "IL",
      label: "Illinois",
    },
    {
      value: "IN",
      label: "Indiana",
    },
    {
      value: "IA",
      label: "Iowa",
    },
    {
      value: "KS",
      label: "Kansas",
    },
    {
      value: "KY",
      label: "Kentucky",
    },
    {
      value: "LA",
      label: "Louisiana",
    },
    {
      value: "ME",
      label: "Maine",
    },
    {
      value: "MD",
      label: "Maryland",
    },
    {
      value: "MA",
      label: "Massachusetts",
    },
    {
      value: "MI",
      label: "Michigan",
    },
    {
      value: "MN",
      label: "Minnesota",
    },
    {
      value: "MS",
      label: "Mississippi",
    },
    {
      value: "MO",
      label: "Missouri",
    },
    {
      value: "MT",
      label: "Montana",
    },
    {
      value: "NE",
      label: "Nebraska",
    },
    {
      value: "NV",
      label: "Nevada",
    },
    {
      value: "NH",
      label: "New Hampshire",
    },
    {
      value: "NJ",
      label: "New Jersey",
    },
    {
      value: "NM",
      label: "New Mexico",
    },
    {
      value: "NY",
      label: "New York",
    },
    {
      value: "NC",
      label: "North Carolina",
    },
    {
      value: "ND",
      label: " North Dakota",
    },
    {
      value: "OH",
      label: "Ohio",
    },
    {
      value: "OK",
      label: "Oklahoma",
    },
    {
      value: "OR",
      label: "Oregon",
    },
    {
      value: "PA",
      label: "Pennsylvania",
    },
    {
      value: "RI",
      label: "Rhode Island",
    },
    {
      value: "SC",
      label: "South Carolina",
    },
    {
      value: "SD",
      label: "South Dakota",
    },
    {
      value: "TN",
      label: "Tennessee",
    },
    {
      value: "TX",
      label: "Texas",
    },
    {
      value: "UT",
      label: "Utah",
    },
    {
      value: "VT",
      label: "Vermont",
    },
    {
      value: "VA",
      label: "Virginia",
    },
    {
      value: "WA",
      label: "Washington",
    },
    {
      value: "WV",
      label: "West Virginia",
    },
    {
      value: "WI",
      label: "Wisconsin",
    },
    {
      value: "WY",
      label: "Wyoming",
    },
    {
      value: "AS",
      label: "American Samoa",
    },
    {
      value: "GU",
      label: "Guam",
    },
    {
      value: "MP",
      label: "Northern Mariana Islands",
    },
    {
      value: "PR",
      label: "Puerto Rico",
    },
    {
      value: "VI",
      label: "U.S. Virgin Islands",
    },
    {
      value: "FM",
      label: "Micronesia",
    },
    {
      value: "MH",
      label: "Marshall Islands",
    },
    {
      value: "PW",
      label: "Palau",
    },
    {
      value: "AA",
      label: "U.S. Armed Forces – Americas[d]",
    },
    {
      value: "AE",
      label: "U.S. Armed Forces – Europe[e]",
    },
    {
      value: "AP",
      label: "U.S. Armed Forces – Pacific[f]",
    },
    {
      value: "CM",
      label: "Northern Mariana Islands",
    },
    {
      value: "CZ",
      label: "Panama Canal Zone",
    },
    {
      value: "NB",
      label: "Nebraska",
    },
    {
      value: "PI",
      label: "Philippine Islands",
    },
    {
      value: "TT",
      label: "Trust Territory of the Pacific Islands",
    },
  ],
  employment: [
    {
      value: "EMPLOYED",
      label: "Employed",
    },
    {
      value: "RETIRED",
      label: "Retired",
    },
    {
      value: "STUDENT",
      label: "Student",
    },
    {
      value: "UNEMPLOYED",
      label: "Not Employed",
    },
  ],
  position: [
    {
      value: "ACCOUNTANT",
      label: "Accountant/CPA/Bookkeeper/Controller",
    },
    {
      value: "ACTUARY",
      label: "Actuary",
    },
    {
      value: "ADJUSTER",
      label: "Adjuster",
    },
    {
      value: "ADMINISTRATOR",
      label: "Administrator",
    },
    {
      value: "ADVERTISER",
      label: "Advertiser/Marketer/PR Professional",
    },
    {
      value: "AGENT",
      label: "Agent",
    },
    {
      value: "ATC",
      label: "Air Traffic Controller",
    },
    {
      value: "AMBASSADOR",
      label: "Ambassador/Consulate Professional",
    },
    {
      value: "ANALYST",
      label: "Analyst",
    },
    {
      value: "APPRAISER",
      label: "Appraiser",
    },
    {
      value: "ARCHITECT",
      label: "Architect/Designer",
    },
    {
      value: "ARTIST",
      label: "Artist/Performer/Actor/Dancer",
    },
    {
      value: "ASSISTANT",
      label: "Assistant",
    },
    {
      value: "ATHLETE",
      label: "Athlete",
    },
    {
      value: "ATTENDANT",
      label: "Attendant",
    },
    {
      value: "ATTORNEY",
      label: "Attorney/Judge/Legal Professional",
    },
    {
      value: "AUCTIONEER",
      label: "Auctioneer",
    },
    {
      value: "AUDITOR",
      label: "Auditor",
    },
    {
      value: "BARBER",
      label: "Barber/Beautician/Hairstylist",
    },
    {
      value: "BROKER",
      label: "Broker",
    },
    {
      value: "BUSINESS_EXEC",
      label: "Business Executive (VP, Director, etc.)",
    },
    {
      value: "BUSINESS_OWNER",
      label: "Business Owner",
    },
    {
      value: "CAREGIVER",
      label: "Caregiver",
    },
    {
      value: "CARPENTER",
      label: "Carpenter/Construction Worker",
    },
    {
      value: "CASHIER",
      label: "Cashier",
    },
    {
      value: "CHEF",
      label: "Chef/Cook",
    },
    {
      value: "CHIROPRACTOR",
      label: "Chiropractor",
    },
    {
      value: "CIVIL",
      label: "Civil Servant",
    },
    {
      value: "CLERGY",
      label: "Clergy",
    },
    {
      value: "CLERK",
      label: "Clerk",
    },
    {
      value: "COMPLIANCE",
      label: "Compliance/Regulatory Professional",
    },
    {
      value: "CONSULTANT",
      label: "Consultant",
    },
    {
      value: "CONTRACTOR",
      label: "Contractor",
    },
    {
      value: "COUNSELOR",
      label: "Counselor/Therapist",
    },
    {
      value: "CUSTOMER_SERVICE",
      label: "Customer Service Representative",
    },
    {
      value: "DEALER",
      label: "Dealer",
    },
    {
      value: "DEVELOPER",
      label: "Developer",
    },
    {
      value: "DISTRIBUTOR",
      label: "Distributor",
    },
    {
      value: "DOCTOR",
      label: "Doctor/Dentist/Veterinarian/Surgeon",
    },
    {
      value: "DRIVER",
      label: "Driver",
    },
    {
      value: "ENGINEER",
      label: "Engineer",
    },
    {
      value: "EXAMINER",
      label: "Examiner",
    },
    {
      value: "EXTERMINATOR",
      label: "Exterminator",
    },
    {
      value: "FACTORY",
      label: "Factory/Warehouse Worker",
    },
    {
      value: "FARMER",
      label: "Farmer/Rancher",
    },
    {
      value: "FINANCIAL",
      label: "Financial Planner",
    },
    {
      value: "FISHERMAN",
      label: "Fisherman",
    },
    {
      value: "FLIGHT",
      label: "Flight Attendant",
    },
    {
      value: "HR",
      label: "Human Resources Professional",
    },
    {
      value: "IMPEX",
      label: "Importer/Exporter",
    },
    {
      value: "INSPECTOR",
      label: "Inspector/Investigator",
    },
    {
      value: "INTERN",
      label: "Intern",
    },
    {
      value: "INVESTMENT",
      label: "Investment Advisor/Investment Manager",
    },
    {
      value: "INVESTOR",
      label: "Investor",
    },
    {
      value: "IT",
      label: "IT Professional/IT Associate",
    },
    {
      value: "JANITOR",
      label: "Janitor",
    },
    {
      value: "JEWELER",
      label: "Jeweler",
    },
    {
      value: "LABORER",
      label: "Laborer",
    },
    {
      value: "LANDSCAPER",
      label: "Landscaper",
    },
    {
      value: "LENDING",
      label: "Lending Professional",
    },
    {
      value: "MANAGER",
      label: "Manager",
    },
    {
      value: "MECHANIC",
      label: "Mechanic",
    },
    {
      value: "MILITARY",
      label: "Military, Officer or Associated",
    },
    {
      value: "MORTICIAN",
      label: "Mortician/Funeral Director",
    },
    {
      value: "NURSE",
      label: "Nurse",
    },
    {
      value: "NUTRITIONIST",
      label: "Nutritionist",
    },
    {
      value: "OFFICE",
      label: "Office Associate",
    },
    {
      value: "PHARMACIST",
      label: "Pharmacist",
    },
    {
      value: "PHYSICAL",
      label: "Physical Therapist",
    },
    {
      value: "PILOT",
      label: "Pilot",
    },
    {
      value: "POLICE",
      label: "Police Officer/Firefighter/Law Enforcement Professional",
    },
    {
      value: "POLITICIAN",
      label: "Politician",
    },
    {
      value: "PM",
      label: "Project Manager",
    },
    {
      value: "REP",
      label: "Registered Rep",
    },
    {
      value: "RESEARCHER",
      label: "Researcher",
    },
    {
      value: "SAILOR",
      label: "Sailor/Seaman",
    },
    {
      value: "SALES",
      label: "Salesperson",
    },
    {
      value: "SCIENTIST",
      label: "Scientist",
    },
    {
      value: "SEAMSTRESS",
      label: "Seamstress/Tailor",
    },
    {
      value: "SECURITY",
      label: "Security Guard",
    },
    {
      value: "SOCIAL",
      label: "Social Worker",
    },
    {
      value: "TEACHER",
      label: "Teacher/Professor",
    },
    {
      value: "TECHNICIAN",
      label: "Technician",
    },
    {
      value: "TELLER",
      label: "Teller",
    },
    {
      value: "TRADESPERSON",
      label: "Tradesperson/Craftsperson",
    },
    {
      value: "TRAINER",
      label: "Trainer/Instructor",
    },
    {
      value: "TRANSPORTER",
      label: "Transporter",
    },
    {
      value: "UNDERWRITER",
      label: "Underwriter",
    },
    {
      value: "WRITER",
      label: "Writer/Journalist/Editor",
    },
  ],
  companyTypes: [
    {
      value: "AGRICULTURE",
      label: "Agriculture, Forestry, Fishing and Hunting",
    },
    {
      value: "MINING",
      label: "Mining, Quarrying, and Oil and Gas Extraction",
    },
    {
      value: "UTILITIES",
      label: "Utilities",
    },
    {
      value: "CONSTRUCTION",
      label: "Construction",
    },
    {
      value: "MANUFACTURING",
      label: "Manufacturing",
    },
    {
      value: "WHOLESALE",
      label: "Wholesale Trade",
    },
    {
      value: "RETAIL",
      label: "Retail Trade",
    },
    {
      value: "TRANSPORT",
      label: "Transportation and Warehousing",
    },
    {
      value: "FINANCE",
      label: "Finance and Insurance",
    },
    {
      value: "REAL_ESTATE",
      label: "Real Estate and Rental and Leasing",
    },
    {
      value: "PROFESSIONAL",
      label: "Professional, Scientific, and Technical Services",
    },
    {
      value: "MANAGEMENT",
      label: "Management of Companies and Enterprises",
    },
    {
      value: "EDUCATION",
      label: "Educational Services",
    },
    {
      value: "HEALTH",
      label: "Health Care and Social Assistance",
    },
    {
      value: "ART",
      label: "Arts, Entertainment, and Recreation",
    },
    {
      value: "FOOD",
      label: "Accommodation and Food Services",
    },
    {
      value: "PUBLIC",
      label: "Public Administration",
    },
    {
      value: "WASTE",
      label:
        "Administrative and Support and Waste Management and Remediation Services",
    },
  ],
  incomeExist: [
    {
      label: "Yes i do",
      value: "yes",
    },
    {
      label: "No i don't",
      value: "no",
    },
  ],
  sourceInncome: [
    {
      value: "selfEmployed",
      label: "Self employed",
    },
    {
      value: "jobSalary",
      label: "Job salary",
    },
    {
      value: "guaranteedRetiredIncome",
      label: "Retired income - guaranteed",
    },
    {
      value: "notGuaranteedRetiredIncome",
      label: "Retired income - not guaranteed",
    },
    {
      value: "familyIncome",
      label: "Family member income",
    },
  ],
  taxExist: [
    {
      label: "Yes",
      value: "yes",
    },
    {
      label: "No",
      value: "no",
    },
  ],
  idTypes: [
    {
      value: "ID",
      label: "Government ID",
    },
    {
      value: "driveLicense",
      label: "Driving License ID",
    },
    {
      value: "passport",
      label: "Passport",
    },
  ],
  proofOfAddressTypes: [
    {
      value: "utilityBill",
      label: "Utility bill",
    },
    {
      value: "mobileBill",
      label: "Mobile bill",
    },
    {
      value: "bankStatement",
      label: "Bank or credit card statement",
    },
    {
      value: "tenancyContract",
      label: "Tenancy contract",
    },
    {
      value: "titleDeed",
      label: "Title deed",
    },
    {
      value: "ejari",
      label: "Ejari",
    },
  ],
  USCitizen: [
    {
      label: "Yes",
      value: "USA",
    },
    {
      label: "No",
      value: "nonUSA",
    },
  ],
  USCitizenForced: [
    {
      label: "Yes",
      value: "USA",
    },
  ],
};
// #endregion

// #region KYC Options
export const KYCConfig: any = {
  amountToInvest: [
    {
      id: "1",
      label: "<10K",
      value: "10000",
    },
    {
      id: "2",
      label: "10K to 50K",
      value: "50000",
    },
    {
      id: "3",
      label: "50K to 100K",
      value: "100000",
    },
    {
      id: "4",
      label: "100K to 250K",
      value: "250000",
    },
    {
      id: "5",
      label: ">250K",
      value: "500000",
    },
  ],
  age: [
    {
      id: "1",
      label: "Under 25",
      value: "Under_25",
      rank: 5,
    },
    {
      id: "2",
      label: "25 to 40",
      value: "25_40",
      rank: 4,
    },
    {
      id: "3",
      label: "41 to 55",
      value: "41_55",
      rank: 3,
    },
    {
      id: "4",
      label: "56 to 70",
      value: "56_70",
      rank: 2,
    },
    {
      id: "5",
      label: "70 and over",
      value: "70+",
      rank: 1,
    },
  ],
  income: [
    {
      id: "1",
      label: "Less than $50K",
      value: "Under_50K",
      amount: 30000,
    },
    {
      id: "2",
      label: "$50K to $100K",
      value: "50K_100K",
      amount: 75000,
    },
    {
      id: "3",
      label: "$100k to $250k",
      value: "100k_250k",
      amount: 150000,
    },
    {
      id: "4",
      label: "$250k to $1M",
      value: "250k_1M",
      amount: 600000,
    },
    {
      id: "5",
      label: "More than $1M",
      value: "1M+",
      amount: 1000000,
    },
  ],
  netWorth: [
    {
      id: "1",
      label: "Less than $50K",
      value: "Under_50K",
      amount: 50000,
    },
    {
      id: "2",
      label: "$50K to $100K",
      value: "50K_100K",
      amount: 100000,
    },
    {
      id: "3",
      label: "$100k to $250k",
      value: "100k_250k",
      amount: 250000,
    },
    {
      id: "4",
      label: "$250k to $500k",
      value: "250k_500k",
      amount: 500000,
    },
    {
      id: "5",
      label: "More than $500k",
      value: "500k+",
      amount: 1000000,
    },
  ],
  objectives: [
    {
      id: "1",
      label: "Build wealth",
      value: "build_wealth",
      rank: [3, 3, 3, 3, 3],
    },
    {
      id: "2",
      label: "Save for retirement",
      value: "retirement",
      rank: [5, 4, 3, 2, 1],
    },
    {
      id: "3",
      label: "Maximize income",
      value: "maximize_income",
      rank: [4, 3, 3, 3, 3],
    },
    {
      id: "4",
      label: "Save for education or buying property",
      value: "child_education",
      rank: [3, 3, 3, 2, 2],
    },
    {
      id: "5",
      label: "Save for Short-term",
      value: "shot-term",
      rank: [2, 2, 2, 1, 1],
    },
  ],
  investmentHorizon: [
    {
      id: "1",
      label: "Less than 1 year",
      value: "less_1yr",
      rank: 1,
    },
    {
      id: "2",
      label: "1 to 3 years",
      value: "1_3yrs",
      rank: 2,
    },
    {
      id: "3",
      label: "3 to 5 years",
      value: "3_5yrs",
      rank: 3,
    },
    {
      id: "4",
      label: "5 to 10 years",
      value: "5_10yrs",
      rank: 4,
    },
    {
      id: "5",
      label: "More than 10 years",
      value: "over_10yrs",
      rank: 5,
    },
  ],
  haveDept: [
    {
      id: "1",
      label: "Yes I do",
      value: "Yes",
      rank: 0,
    },
    {
      id: "2",
      label: "No I don’t",
      value: "No",
      rank: 10,
    },
  ],
  deptKind: [
    {
      id: "1",
      label: "Credit card",
      value: "credit_card",
      rank: 1,
    },
    {
      id: "2",
      label: "Line of credit",
      value: "line_of_credit",
      rank: 2,
    },
    {
      id: "3",
      label: "Auto loan",
      value: "auto_loan",
      rank: 3,
    },
    {
      id: "4",
      label: "Student loan",
      value: "student_loan",
      rank: 4,
    },
    {
      id: "5",
      label: "Mortgage",
      value: "mortgage",
      rank: 5,
    },
  ],
  marketDownDecision: [
    {
      id: "1",
      label: "Sell everything",
      value: "sell_everything",
      rank: 2,
    },
    {
      id: "2",
      label: "Sell some",
      value: "sell_some",
      rank: 5,
    },
    {
      id: "3",
      label: "Buy more",
      value: "buy_more",
      rank: 11,
    },
    {
      id: "4",
      label: "Hold steady (do nothing)",
      value: "hold_steady",
      rank: 8,
    },
  ],
  certainIncome: [
    {
      id: "1",
      label: "Very certain",
      value: "very_certain",
      rank: 5,
    },
    {
      id: "2",
      label: "Certain",
      value: "certain",
      rank: 4,
    },
    {
      id: "3",
      label: "Somewhat certain",
      value: "somewhat_certain",
      rank: 3,
    },
    {
      id: "4",
      label: "Uncertain",
      value: "uncertain",
      rank: 2,
    },
    {
      id: "5",
      label: "Very uncertain",
      value: "very_uncertain",
      rank: 1,
    },
  ],
  previousExperience: [
    {
      id: "1",
      label: "I don't have any experience",
      value: "NONE",
      rank: 2,
    },
    {
      id: "2",
      label: "1 to 5 years of experience",
      value: "YRS_3_5",
      rank: 4,
    },
    {
      id: "3",
      label: "6 to 10 years of experience",
      value: "YRS_5_10",
      rank: 6,
    },
    {
      id: "4",
      label: "More than 10 years of experience",
      value: "YRS_10+",
      rank: 8,
    },
  ],
  investmentDesicion: [
    {
      id: "1",
      label: "Invest in multiple stocks",
      value: "multiple_stocks",
      rank: 3,
    },
    {
      id: "2",
      label: "Invest in different type of bonds",
      value: "different_type_bonds",
      rank: 1,
    },
    {
      id: "3",
      label: "Invest only in one stock or bond",
      value: "one_stock",
      rank: 4,
    },
    {
      id: "4",
      label: "Invest in multiple stocks or bonds",
      value: "multiple_stocks_bonds",
      rank: 2,
    },
  ],
};
// #endregion

// #region UAE Regulation Questions
export const UAEQuestions: TQuestion[] = [
  {
    index: 1,
    id: "biographicalInfo",
    header: {
      text: "Biographical information",
    },
    title: {
      text: "We need a few personal details so we can Officially open your new account.",
    },
    data: [
      {
        content: [
          {
            fields: [
              {
                id: "text_1_1",
                type: "text",
                withAnimation: true,
                animationTimeOut: 400,
                inputProps: {
                  label: "Legal first (given) name",
                  errorMessage: "This field is text only",
                },
                validation: {
                  isRequired: true,
                  validator: "text",
                },
                keys: ["dw", "BASIC_INFO", "firstName"],
                otherValues: {
                  conditions: [
                    {
                      keys: ["auth", "data", "user", "regulation"],
                      isRoot: true,
                      values: ["UAE"],
                      operator: "equal",
                    },
                  ],
                  values: [
                    {
                      keys: ["dw", "IDENTIFICATION_INFO", "TIN"],
                      value: "0000",
                    },
                  ],
                  onFailure: {
                    clearOnChange: false,
                    clearOnRender: false,
                  },
                },
              },
              {
                id: "text_1_2",
                type: "text",
                withAnimation: true,
                animationTimeOut: 400,
                inputProps: {
                  label: "Legal last name (surname)",
                  errorMessage: "This field is text only",
                },
                validation: {
                  isRequired: true,
                  validator: "text",
                },
                keys: ["dw", "BASIC_INFO", "lastName"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 2,
    id: "phoneNumber",
    header: {
      text: "What’s your phone number?",
    },
    data: [
      {
        content: [
          {
            fields: [
              {
                id: "phone_2_1",
                type: "phone",
                withAnimation: true,
                animationTimeOut: 400,
                validation: {
                  isRequired: true,
                },
                inputProps: {
                  codeLabel: "Code",
                  phoneLabel: "Phone number",
                  withCountryFlagLabel: true,
                  withCountryFlagList: true,
                  errorMessage: "Please enter correct phone number",
                  disableCode: true,
                },
                phoneCodeKeys: ["dw", "BASIC_INFO", "country"],
                phoneNumberKeys: ["dw", "BASIC_INFO", "phone"],
                defaultValue: {
                  phoneCodeKeys: ["auth", "data", "user", "address_country"],
                  isRoot: true,
                },
                optionsKey: "phoneCodesDw",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 3,
    id: "personalInfo",
    header: {
      text: "Tell us a bit about yourself",
    },
    title: {
      text: "We need a few personal details so we can officially open your new account.",
    },
    data: [
      {
        content: [
          {
            fields: [
              {
                id: "select_3_1",
                type: "select",
                withAnimation: true,
                animationTimeOut: 400,
                optionsKey: "gender",
                validation: {
                  isRequired: true,
                },
                inputProps: {
                  label: "Gender",
                },
                keys: ["dw", "PERSONAL_INFO", "gender"],
              },
              {
                id: "select_3_2",
                type: "select",
                withAnimation: true,
                animationTimeOut: 400,
                optionsKey: "marital",
                validation: {
                  isRequired: true,
                },
                inputProps: {
                  label: "Marital status",
                },
                keys: ["dw", "PERSONAL_INFO", "marital"],
              },
              {
                id: "date_3_3",
                type: "date",
                withAnimation: true,
                animationTimeOut: 400,
                changeHandlerType: "custom",
                validation: {
                  isRequired: true,
                  minDate: 18,
                  maxDate: 75,
                  validator: "date",
                },
                inputProps: {
                  label: "Date of birth",
                  dateFormat: "dd/MM/yyyy",
                  errorMessage:
                    "Only valid date, older than 18 years and younger than 75 years will be accepted",
                  variant: "dialog",
                },
                keys: ["dw", "PERSONAL_INFO"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 4,
    id: "citizenship",
    header: {
      text: "What’s your citizenship",
    },
    data: [
      {
        content: [
          {
            fields: [
              {
                id: "select_4_1",
                type: "searchableList",
                withAnimation: true,
                animationTimeOut: 400,
                inputProps: {
                  errorMessage: "Please select your citizenship",
                  label: "Citizenship",
                  withCountryFlagLabel: true,
                  withCountryFlagList: true,
                },
                validation: {
                  isRequired: true,
                },
                optionsKey: "supportedDwCountries",
                keys: ["dw", "IDENTIFICATION_INFO", "citizenship"],
                optionsFilterOut: {
                  values: ["USA"],
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 5,
    id: "address",
    header: {
      text: "What’s your address?",
    },
    data: [
      {
        content: [
          {
            fields: [
              {
                id: "text_5_1",
                type: "text",
                withAnimation: true,
                animationTimeOut: 400,
                inputProps: {
                  label: "Enter your street address",
                  errorMessage: "Street address",
                },
                validation: {
                  isRequired: true,
                },
                keys: ["dw", "ADDRESS_INFO", "street1"],
              },
              {
                id: "text_5_2",
                type: "text",
                withAnimation: true,
                animationTimeOut: 400,
                inputProps: {
                  label: "Apt, Suite. (optional)",
                },
                keys: ["other", "ADDRESS_INFO", "aptNumber"],
              },
              {
                id: "text_5_3",
                type: "text",
                withAnimation: true,
                animationTimeOut: 400,
                inputProps: {
                  label: "City",
                  errorMessage: "Please enter your city",
                },
                validation: {
                  isRequired: true,
                },
                keys: ["dw", "ADDRESS_INFO", "city"],
              },
              {
                id: "text_5_4",
                type: "text",
                withAnimation: true,
                animationTimeOut: 400,
                defaultValue: {
                  isRoot: true,
                  keys: ["auth", "data", "user", "address_country"],
                },
                inputProps: {
                  label: "Address country",
                  disabled: true,
                },
                keys: ["other", "ADDRESS_INFO", "addressCountry"],
              },
              {
                id: "text_5_5",
                type: "text",
                withAnimation: true,
                animationTimeOut: 400,
                inputProps: {
                  label: "Postal code",
                  errorMessage: "Your postal code should be numeral",
                },
                validation: {
                  isRequired: true,
                  validator: "number",
                },
                keys: ["dw", "ADDRESS_INFO", "postalCode"],
              },
              {
                id: "select_5_6",
                type: "searchableList",
                withAnimation: true,
                animationTimeOut: 400,
                optionsKey: "state",
                conditions: [
                  {
                    keys: ["other", "ADDRESS_INFO", "addressCountry"],
                    operator: "equal",
                    values: ["USA"],
                  },
                ],
                inputProps: {
                  label: "Province",
                  errorMessage: "Please enter state / city / Province",
                },
                validation: {
                  isRequired: true,
                },
                keys: ["dw", "ADDRESS_INFO", "province"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 6,
    id: "employment",
    header: {
      text: "Tell us about your employment",
    },
    title: {
      text: "What’s your current employment status?",
    },
    data: [
      {
        style: {
          padding: "0px",
        },
        content: [
          {
            fields: [
              {
                id: "radioGroup_6_1",
                type: "radioGroup",
                keys: ["dw", "EMPLOYMENT_INFO", "status"],
                optionsKey: "employment",
                validation: {
                  isRequired: true,
                },
                inputProps: {
                  withAnimation: true,
                  animationTimeOut: 400,
                  size: "large",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 7,
    id: "companyInfo",
    header: {
      text: "Company information",
    },
    title: {
      text: "Please fill information needed",
    },
    conditions: [
      {
        keys: ["dw", "EMPLOYMENT_INFO", "status"],
        operator: "equal",
        values: ["EMPLOYED"],
      },
    ],
    data: [
      {
        content: [
          {
            fields: [
              {
                id: "text_7_1",
                type: "text",
                withAnimation: true,
                animationTimeOut: 400,
                inputProps: {
                  label: "Work address",
                  errorMessage: "Please enter your work address",
                },
                keys: ["dw", "EMPLOYMENT_INFO", "address"],
                validation: {
                  isRequired: true,
                },
              },
            ],
          },
          {
            style: {
              display: "grid",
              gridTemplateColumns: [
                "1fr",
                "1fr",
                "repeat(2, 1fr)",
                "repeat(2, 1fr)",
              ],
              mt: "15px",
              gridGap: "15px",
            },
            fields: [
              {
                id: "select_7_2",
                type: "select",
                withAnimation: true,
                animationTimeOut: 400,
                optionsKey: "position",
                inputProps: {
                  label: "Position",
                  errorMessage: "Please select your position",
                },
                keys: ["dw", "EMPLOYMENT_INFO", "position"],
                validation: {
                  isRequired: true,
                },
              },
              {
                id: "select_7_3",
                type: "select",
                withAnimation: true,
                animationTimeOut: 400,
                optionsKey: "companyTypes",
                keys: ["dw", "EMPLOYMENT_INFO", "type"],
                inputProps: {
                  label: "Company type",
                  errorMessage: "Please select your company type",
                },
                validation: {
                  isRequired: true,
                },
              },
            ],
          },
          {
            style: {
              mt: "15px",
            },
            fields: [
              {
                id: "text_7_4",
                type: "text",
                withAnimation: true,
                animationTimeOut: 400,
                inputProps: {
                  label: "Company name",
                  errorMessage: "Please enter your company name",
                },
                validation: {
                  isRequired: true,
                },
                keys: ["dw", "EMPLOYMENT_INFO", "company"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 8,
    id: "fundsSource",
    header: {
      text: "Source of income and funds",
    },
    title: {
      text: "Do you have any another source of income?",
    },
    data: [
      {
        style: {
          padding: "0px",
        },
        content: [
          {
            fields: [
              {
                id: "radioGroup_8_1",
                type: "radioGroup",
                keys: ["other", "INCOME_SOURCE", "anotherIncome"],
                inputProps: {
                  withAnimation: true,
                  animationTimeOut: 400,
                  size: "large",
                },
                validation: {
                  isRequired: true,
                },
                optionsKey: "incomeExist",
              },
            ],
          },
        ],
      },
      {
        conditions: [
          {
            keys: ["other", "INCOME_SOURCE", "anotherIncome"],
            operator: "equal",
            values: ["yes"],
          },
        ],
        content: [
          {
            fields: [
              {
                id: "text_8_2",
                type: "title",
                animationTimeOut: 400,
                withAnimation: true,
                inputProps: {
                  label: "Please list the out",
                  fontColor: "text.primary",
                  fontSize: "20px",
                  fontWeight: 600,
                },
              },
              {
                id: "text_8_3",
                type: "title",
                animationTimeOut: 400,
                withAnimation: true,
                inputProps: {
                  label:
                    "Give percentages to show how important each source is (including any employment income). You have to give a rough estimate, this is just to give us an idea of how each contributed to your wealth.",
                  fontColor: "text.secondary",
                },
              },
              {
                id: "text_8_4",
                type: "title",
                animationTimeOut: 400,
                withAnimation: true,
                inputProps: {
                  label: "Make sure they add up to 100.",
                },
              },
              {
                id: "fieldGoup_8_5",
                type: "fieldGroup",
                validation: {
                  isRequired: true,
                },
                animationTimeOut: 400,
                withAnimation: true,
                keys: ["other", "INCOME_SOURCE", "listOfIncome"],
                optionsKey: "sourceInncome",
                inputProps: {
                  fieldGroupAddButtonLabel: "+ Add a source of wealth",
                  fieldGroupRemoveButtonLabel: "Delete",
                  fieldGroupInputLabel: "Precentage of income (%)",
                  fieldGroupInputTitle: "What is the percentage of income?",
                  fieldGroupSelectLabel: "Select",
                  fieldGroupSelectTitle: "Source of wealth",
                  fieldGroupOptionKey: "value",
                  fieldGroupValueKey: "per",
                  spacing: "15px",
                  fieldGroupConditions: {
                    isPercentage: true,
                  },
                  fontWeight: 500,
                  fontSize: "16px",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 9,
    id: "extraInfo",
    header: {
      text: "You must let us know if any of these statements apply to you",
    },
    title: {
      text: "These don't apply to most people but if they apply to you, please let us know.",
    },
    data: [
      {
        style: {
          p: "30px",
        },
        content: [
          {
            fields: [
              {
                style: {
                  marginBottom: "10px",
                },
                id: "checkbox_9_1",
                type: "checkbox",
                withAnimation: true,
                animationTimeOut: 400,
                inputProps: {
                  alignItems: "flex-start",
                  label:
                    "Are you, or an immediate family member, a control person, senior executive or a 10% shareholder of a publicly traded corporation?",
                  size: "large",
                },
                keys: ["dw", "EMPLOYMENT_INFO", "directorOf"],
                defaultValue: {
                  value: false,
                },
              },
              {
                id: "text_9_2",
                type: "text",
                withAnimation: true,
                animationTimeOut: 400,
                style: {
                  marginBottom: "10px",
                },
                validation: {
                  isRequired: true,
                },
                title: {
                  text: "Please list the comapnt name and its ticker symbol",
                },
                inputProps: {
                  label: "Company name and ticker symbol",
                  errorMessage: "This field cannot be empty",
                },
                keys: ["dw", "EMPLOYMENT_INFO", "directorOfValue"],
                conditions: [
                  {
                    keys: ["dw", "EMPLOYMENT_INFO", "directorOf"],
                    values: [true],
                    operator: "equal",
                  },
                ],
              },
              {
                id: "checkbox_9_3",
                type: "checkbox",
                withAnimation: true,
                animationTimeOut: 400,
                style: {
                  marginBottom: "10px",
                },
                inputProps: {
                  alignItems: "flex-start",
                  label:
                    "Are you or a family member that lives with you, employed by a brokerage firm, securities exchange or FINRA?",
                  size: "large",
                },
                keys: ["dw", "EMPLOYMENT_INFO", "broker"],
                defaultValue: {
                  value: false,
                },
              },
              {
                id: "checkbox_9_4",
                type: "checkbox",
                withAnimation: true,
                animationTimeOut: 400,
                style: {
                  marginBottom: "10px",
                },
                inputProps: {
                  alignItems: "flex-start",
                  label:
                    "My account is maintained for a current or doemed Politically Exposed Person or Public Official 9 includes U.S. and Foreign",
                  size: "large",
                },
                keys: ["dw", "EMPLOYMENT_INFO", "maintained"],
                defaultValue: {
                  value: false,
                },
              },
              {
                id: "text_9_5",
                type: "text",
                withAnimation: true,
                animationTimeOut: 400,
                style: {
                  marginBottom: "10px",
                },
                title: {
                  text: "Please provide the names of that official and official’s immediate family members (including former spouses).",
                },
                inputProps: {
                  label: "Please enter the names",
                  errorMessage: "This field cannot be empty",
                },
                validation: {
                  isRequired: true,
                },
                keys: ["dw", "EMPLOYMENT_INFO", "officialNames"],
                conditions: [
                  {
                    keys: ["dw", "EMPLOYMENT_INFO", "maintained"],
                    values: [true],
                    operator: "equal",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 10,
    id: "terms",
    header: {
      text: "Terms and Agreements",
    },
    data: [
      {
        content: [
          {
            fields: [
              {
                id: "checkbox_10_1",
                type: "checkbox",
                withAnimation: true,
                animationTimeOut: 400,
                keys: ["dw", "DISCLOSURES"],
                style: {
                  marginBottom: "40px",
                },
                validation: {
                  isRequired: true,
                },
                inputProps: {
                  alignItems: "flex-start",
                  html: '<p>I certify that I have read and agree to the <a target="_blank" href="https://wealthface.com/clientAgreements/wf.UAE.pdf">Wealthface</a> and <a target="_blank" href="https://wealthface.com/clientAgreements/dw.pdf">DriveWealth</a> terms, conditions and client agreements.</p>',
                  size: "large",
                },
                checkedValue: {
                  customerAgreement: true,
                  marketDataAgreement: true,
                  rule14b: true,
                  findersFee: true,
                  privacyPolicy: true,
                  dataSharing: true,
                  termsOfUse: true,
                },
                unCheckedValue: {
                  customerAgreement: false,
                  marketDataAgreement: false,
                  rule14b: false,
                  findersFee: false,
                  privacyPolicy: false,
                  dataSharing: false,
                  termsOfUse: false,
                },
              },
              {
                id: "checkbox_10_2",
                type: "checkbox",
                withAnimation: true,
                animationTimeOut: 400,
                keys: ["dw", "DISCLOSURES"],
                inputProps: {
                  alignItems: "flex-start",
                  html: '<p>I confirm that the information I have entered is correct and can be used to fill the <a target="_blank" href="https://www.irs.gov/forms-pubs/about-form-w-8-ben">W8BEN</a> form, confirming I am not a US citizen or tax resident in a country with a US Tax Treaty.</p>',
                  size: "large",
                },
                validation: {
                  isRequired: true,
                },
                checkedValue: {
                  w8bin: true,
                },
                unCheckedValue: {
                  w8bin: false,
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
// #endregion

// #region USA Regulation Questions
export const USAQuestions: TQuestion[] = [
  {
    index: 1,
    id: "usCitizen",
    header: {
      text: "Are you a U.S. Citizen/Resident Alien?",
    },
    data: [
      {
        style: {
          p: "0px",
        },
        content: [
          {
            fields: [
              {
                id: "radioGroup_1_1",
                type: "radioGroup",
                inputProps: {
                  withAnimation: true,
                  animationTimeOut: 400,
                  size: "large",
                },
                keys: ["other", "IDENTIFICATION_INFO", "resident"],
                optionsKey: "USCitizen",
                validation: {
                  isRequired: true,
                },
                shouldNotClearOnConditions: true,
                conditions: [
                  {
                    keys: ["auth", "data", "user", "address_country"],
                    operator: "notEqual",
                    values: ["United States"],
                    isRoot: true,
                  },
                ],
                otherValues: {
                  conditions: [
                    {
                      keys: ["other", "IDENTIFICATION_INFO", "resident"],
                      operator: "equal",
                      values: ["USA"],
                    },
                  ],
                  values: [
                    {
                      keys: ["dw", "IDENTIFICATION_INFO", "citizenship"],
                      value: "USA",
                    },
                  ],
                  onFailure: {
                    clearOnChange: true,
                  },
                },
              },
              {
                id: "radioGroup_1_2",
                type: "radioGroup",
                inputProps: {
                  withAnimation: true,
                  animationTimeOut: 400,
                  size: "large",
                },
                keys: ["other", "IDENTIFICATION_INFO", "resident"],
                optionsKey: "USCitizenForced",
                validation: {
                  isRequired: true,
                },
                shouldNotClearOnConditions: true,
                conditions: [
                  {
                    keys: ["auth", "data", "user", "address_country"],
                    operator: "equal",
                    values: ["United States"],
                    isRoot: true,
                  },
                ],
                defaultValue: {
                  conditions: [
                    {
                      keys: ["auth", "data", "user", "address_country"],
                      operator: "equal",
                      values: ["United States"],
                      isRoot: true,
                    },
                  ],
                  value: "USA",
                },
                otherValues: {
                  conditions: [
                    {
                      keys: ["auth", "data", "user", "address_country"],
                      operator: "equal",
                      values: ["United States"],
                      isRoot: true,
                    },
                  ],
                  values: [
                    {
                      keys: ["dw", "IDENTIFICATION_INFO", "citizenship"],
                      value: "USA",
                    },
                  ],
                  onFailure: {
                    clearOnChange: true,
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 2,
    id: "biographicalInfo",
    header: {
      text: "Biographical information",
    },
    title: {
      text: "We need a few personal details so we can Officially open your new account.",
    },
    data: [
      {
        content: [
          {
            fields: [
              {
                id: "text_2_1",
                type: "text",
                withAnimation: true,
                animationTimeOut: 400,
                inputProps: {
                  label: "Legal first (given) name",
                  errorMessage: "This field is text only",
                },
                validation: {
                  isRequired: true,
                  validator: "text",
                },
                keys: ["dw", "BASIC_INFO", "firstName"],
              },
              {
                id: "text_2_2",
                type: "text",
                withAnimation: true,
                animationTimeOut: 400,
                inputProps: {
                  label: "Legal last name (surname)",
                  errorMessage: "This field is text only",
                },
                validation: {
                  isRequired: true,
                  validator: "text",
                },
                keys: ["dw", "BASIC_INFO", "lastName"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 3,
    id: "phoneNumber",
    header: {
      text: "What’s your phone number?",
    },
    data: [
      {
        content: [
          {
            fields: [
              {
                id: "phone_3_1",
                type: "phone",
                withAnimation: true,
                animationTimeOut: 400,
                validation: {
                  isRequired: true,
                },
                inputProps: {
                  codeLabel: "Code",
                  phoneLabel: "Phone number",
                  withCountryFlagLabel: true,
                  withCountryFlagList: true,
                  errorMessage: "Please enter correct phone number",
                  disableCode: true,
                },
                phoneCodeKeys: ["dw", "BASIC_INFO", "country"],
                phoneNumberKeys: ["dw", "BASIC_INFO", "phone"],
                optionsKey: "phoneCodesDw",
                defaultValue: {
                  phoneCodeKeys: ["auth", "data", "user", "address_country"],
                  isRoot: true,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 4,
    id: "personalInfo",
    header: {
      text: "Tell us a bit about yourself",
    },
    title: {
      text: "We need a few personal details so we can officially open your new account.",
    },
    data: [
      {
        content: [
          {
            fields: [
              {
                id: "select_4_1",
                type: "select",
                withAnimation: true,
                animationTimeOut: 400,
                optionsKey: "gender",
                validation: {
                  isRequired: true,
                },
                inputProps: {
                  label: "Gender",
                },
                keys: ["dw", "PERSONAL_INFO", "gender"],
              },
              {
                id: "select_4_2",
                type: "select",
                withAnimation: true,
                animationTimeOut: 400,
                optionsKey: "marital",
                validation: {
                  isRequired: true,
                },
                inputProps: {
                  label: "Marital status",
                },
                keys: ["dw", "PERSONAL_INFO", "marital"],
              },
              {
                id: "date_4_3",
                type: "date",
                withAnimation: true,
                animationTimeOut: 400,
                changeHandlerType: "custom",
                validation: {
                  isRequired: true,
                  minDate: 18,
                  maxDate: 75,
                  validator: "date",
                },
                inputProps: {
                  label: "Date of birth",
                  dateFormat: "dd/MM/yyyy",
                  errorMessage:
                    "Only valid date, older than 18 years and younger than 75 years will be accepted",
                  variant: "dialog",
                },
                keys: ["dw", "PERSONAL_INFO"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 5,
    id: "citizenship",
    header: {
      text: "What’s your citizenship",
    },
    conditions: [
      {
        keys: ["other", "IDENTIFICATION_INFO", "resident"],
        values: ["nonUSA"],
        operator: "equal",
      },
    ],
    data: [
      {
        content: [
          {
            fields: [
              {
                id: "select_5_1",
                type: "searchableList",
                withAnimation: true,
                animationTimeOut: 400,
                shouldNotClearOnConditions: true,
                inputProps: {
                  errorMessage: "Please select your citizenship",
                  label: "Citizenship",
                  withCountryFlagLabel: true,
                  withCountryFlagList: true,
                },
                validation: {
                  isRequired: true,
                },
                optionsKey: "supportedDwCountries",
                keys: ["dw", "IDENTIFICATION_INFO", "citizenship"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 6,
    id: "address",
    header: {
      text: "What’s your address?",
    },
    data: [
      {
        content: [
          {
            fields: [
              {
                id: "text_6_1",
                type: "text",
                withAnimation: true,
                animationTimeOut: 400,
                inputProps: {
                  label: "Street address",
                  errorMessage: "Please enter your street address",
                },
                validation: {
                  isRequired: true,
                },
                keys: ["dw", "ADDRESS_INFO", "street1"],
              },
              {
                id: "text_6_2",
                type: "text",
                withAnimation: true,
                animationTimeOut: 400,
                inputProps: {
                  label: "Apt, Suite. (optional)",
                },
                keys: ["other", "ADDRESS_INFO", "aptNumber"],
              },
              {
                id: "text_6_3",
                type: "text",
                withAnimation: true,
                animationTimeOut: 400,
                inputProps: {
                  label: "City",
                  errorMessage: "Please enter your city",
                },
                validation: {
                  isRequired: true,
                },
                keys: ["dw", "ADDRESS_INFO", "city"],
              },
              {
                id: "text_6_4",
                type: "text",
                withAnimation: true,
                animationTimeOut: 400,
                defaultValue: {
                  isRoot: true,
                  keys: ["auth", "data", "user", "address_country"],
                },
                inputProps: {
                  label: "Address country",
                  disabled: true,
                },
                keys: ["other", "ADDRESS_INFO", "addressCountry"],
              },
              {
                id: "text_6_5",
                type: "text",
                withAnimation: true,
                animationTimeOut: 400,
                inputProps: {
                  label: "Postal code",
                  errorMessage: "Your postal code should be numeral",
                },
                validation: {
                  isRequired: true,
                  validator: "number",
                },
                keys: ["dw", "ADDRESS_INFO", "postalCode"],
              },
              {
                id: "select_6_6",
                type: "searchableList",
                withAnimation: true,
                animationTimeOut: 400,
                optionsKey: "state",
                conditions: [
                  {
                    keys: ["other", "ADDRESS_INFO", "addressCountry"],
                    operator: "equal",
                    values: ["United States"],
                  },
                ],
                inputProps: {
                  label: "Province",
                  errorMessage: "Please enter state / city / Province",
                },
                validation: {
                  isRequired: true,
                },
                keys: ["dw", "ADDRESS_INFO", "province"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 7,
    id: "ssn",
    conditions: [
      {
        keys: ["other", "IDENTIFICATION_INFO", "resident"],
        values: ["USA"],
        operator: "equal",
      },
    ],
    header: {
      text: "Social security number",
    },
    hint: {
      header: {
        text: "Why we ask",
      },
      title: {
        text: "We are required by law to ask for your Social Security Number in order to confirm your identity. We use state of the art security to protect your data.",
      },
      withAnimation: true,
    },
    data: [
      {
        content: [
          {
            fields: [
              {
                id: "text_7_1",
                withAnimation: true,
                animationTimeOut: 400,
                type: "text",
                inputProps: {
                  label: "SSN",
                  errorMessage: "Please enter your 9 digits SSN number",
                },
                validation: {
                  isRequired: true,
                  validator: "number",
                  minChars: 9,
                  maxChars: 9,
                },
                keys: ["dw", "IDENTIFICATION_INFO", "SSN"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 8,
    id: "employment",
    header: {
      text: "Tell us about your employment",
    },
    title: {
      text: "What’s your current employment status?",
    },
    data: [
      {
        style: {
          padding: "0px",
        },
        content: [
          {
            fields: [
              {
                id: "radioGroup_8_1",
                type: "radioGroup",
                keys: ["dw", "EMPLOYMENT_INFO", "status"],
                optionsKey: "employment",
                validation: {
                  isRequired: true,
                },
                inputProps: {
                  withAnimation: true,
                  animationTimeOut: 400,
                  size: "large",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 9,
    id: "companyInfo",
    header: {
      text: "Company information",
    },
    title: {
      text: "Please fill information needed",
    },
    conditions: [
      {
        keys: ["dw", "EMPLOYMENT_INFO", "status"],
        operator: "equal",
        values: ["EMPLOYED"],
      },
    ],
    data: [
      {
        content: [
          {
            fields: [
              {
                id: "text_9_1",
                type: "text",
                withAnimation: true,
                animationTimeOut: 400,
                inputProps: {
                  label: "Work address",
                  errorMessage: "Please enter your work address",
                },
                keys: ["other", "EMPLOYMENT_INFO", "address"],
                validation: {
                  isRequired: true,
                },
              },
            ],
          },
          {
            style: {
              display: "grid",
              gridTemplateColumns: [
                "1fr",
                "1fr",
                "repeat(2, 1fr)",
                "repeat(2, 1fr)",
              ],
              mt: "15px",
              gridGap: "15px",
            },
            fields: [
              {
                id: "select_9_2",
                type: "select",
                withAnimation: true,
                animationTimeOut: 400,
                optionsKey: "position",
                inputProps: {
                  label: "Position",
                  errorMessage: "Please select your position",
                },
                keys: ["dw", "EMPLOYMENT_INFO", "position"],
                validation: {
                  isRequired: true,
                },
              },
              {
                id: "select_9_3",
                type: "select",
                withAnimation: true,
                animationTimeOut: 400,
                optionsKey: "companyTypes",
                keys: ["dw", "EMPLOYMENT_INFO", "type"],
                inputProps: {
                  label: "Company type",
                  errorMessage: "Please select your company type",
                },
                validation: {
                  isRequired: true,
                },
              },
            ],
          },
          {
            style: {
              mt: "15px",
            },
            fields: [
              {
                id: "text_9_4",
                type: "text",
                withAnimation: true,
                animationTimeOut: 400,
                inputProps: {
                  label: "Company name",
                  errorMessage: "Please enter your company name",
                },
                validation: {
                  isRequired: true,
                },
                keys: ["dw", "EMPLOYMENT_INFO", "company"],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 10,
    id: "taxResidency",
    header: {
      text: "Tax residency",
    },
    conditions: [
      {
        keys: ["other", "IDENTIFICATION_INFO", "resident"],
        values: ["nonUSA"],
        operator: "equal",
      },
    ],
    data: [
      {
        content: [
          {
            fields: [
              {
                id: "text_10_1",
                type: "text",
                animationTimeOut: 400,
                withAnimation: true,
                title: {
                  text: "This usually doesn’t apply to GCC residents. If you are a tax resident of other countries please let us know to get a full understanding of your financial picture",
                },
                inputProps: {
                  disabled: true,
                },
                keys: ["other", "IDENTIFICATION_INFO", "taxResidency"],
                defaultValue: {
                  isRoot: true,
                  keys: ["auth", "data", "user", "address_country"],
                },
              },
            ],
          },
        ],
      },
      {
        isBlock: true,
        content: [
          {
            fields: [
              {
                id: "link_10_2",
                type: "link",
                animationTimeOut: 400,
                withAnimation: true,
                linkValue: true,
                shouldNotClearOnConditions: true,
                conditions: [
                  {
                    keys: ["other", "IDENTIFICATION_INFO", "haveTaxId"],
                    operator: "notEqual",
                    values: [true],
                  },
                ],
                keys: ["other", "IDENTIFICATION_INFO", "haveTaxId"],
                inputProps: {
                  label: "+ Add Tax Residency",
                  fontWeight: 600,
                },
                otherValues: {
                  conditions: [
                    {
                      keys: ["other", "IDENTIFICATION_INFO", "haveTaxId"],
                      operator: "notEqual",
                      values: [true],
                    },
                  ],
                  values: [
                    {
                      keys: ["dw", "IDENTIFICATION_INFO", "TIN"],
                      value: "0000",
                    },
                  ],
                  onFailure: {
                    clearOnChange: true,
                    clearOnRender: true,
                  },
                },
              },
            ],
          },
        ],
      },
      {
        conditions: [
          {
            keys: ["other", "IDENTIFICATION_INFO", "haveTaxId"],
            operator: "equal",
            values: [true],
          },
        ],
        content: [
          {
            fields: [
              {
                id: "searchable_10_3",
                type: "searchableList",
                keys: ["dw", "IDENTIFICATION_INFO", "country"],
                withAnimation: true,
                animationTimeOut: 400,
                optionsKey: "supportedDwCountries",
                inputProps: {
                  label: "Country",
                  withCountryFlagLabel: true,
                  withCountryFlagList: true,
                },
                validation: {
                  isRequired: true,
                },
                title: {
                  text: "List out countries where you are considered a ‘’tax resident’’",
                },
              },
              {
                id: "title_10_4",
                type: "title",
                withAnimation: true,
                animationTimeOut: 400,
                inputProps: {
                  label: "Does this country issue a tax ID?",
                  fontColor: "text.primary",
                  fontSize: "14px",
                  fontWeight: 500,
                },
              },
              {
                id: "radioGroup_10_5",
                type: "radioGroup",
                keys: ["other", "IDENTIFICATION_INFO", "taxPayee"],
                optionsKey: "taxExist",
                style: {
                  width: "50%",
                },
                inputProps: {
                  withAnimation: true,
                  animationTimeOut: 400,
                  groupLayout: "layout_2",
                  size: "large",
                },
                validation: {
                  isRequired: true,
                },
              },
              {
                id: "text_10_6",
                type: "text",
                keys: ["dw", "IDENTIFICATION_INFO", "TIN"],
                withAnimation: true,
                animationTimeOut: 400,
                shouldNotClearOnConditions: true,
                inputProps: {
                  errorMessage: "Please enter you tax id",
                  label: "Tax ID",
                },
                validation: {
                  isRequired: true,
                },
                conditions: [
                  {
                    keys: ["other", "IDENTIFICATION_INFO", "taxPayee"],
                    operator: "equal",
                    values: ["yes"],
                  },
                ],
              },
              {
                id: "select_10_7",
                type: "select",
                keys: ["dw", "IDENTIFICATION_INFO", "type"],
                withAnimation: true,
                animationTimeOut: 400,
                optionsKey: "idTypes",
                inputProps: {
                  errorMessage: "Please select your ID type",
                  label: "Please select an ID type",
                },
                validation: {
                  isRequired: true,
                },
                conditions: [
                  {
                    keys: ["other", "IDENTIFICATION_INFO", "taxPayee"],
                    operator: "equal",
                    values: ["no"],
                  },
                ],
                optionsFilterOut: {
                  values: ["ID", "driveLicense"],
                },
              },
              {
                id: "text_10_8",
                type: "text",
                keys: ["dw", "IDENTIFICATION_INFO", "value"],
                withAnimation: true,
                animationTimeOut: 400,
                inputProps: {
                  errorMessage: "Please enter your document number",
                  label: "Document number",
                },
                validation: {
                  isRequired: true,
                },
                conditions: [
                  {
                    keys: ["other", "IDENTIFICATION_INFO", "taxPayee"],
                    operator: "equal",
                    values: ["no"],
                  },
                ],
              },
              {
                id: "likn_10_9",
                type: "link",
                keys: ["other", "IDENTIFICATION_INFO", "haveTaxId"],
                withAnimation: true,
                animationTimeOut: 400,
                inputProps: {
                  label: "Cancel",
                  linkColor: "danger",
                  fontWeight: 600,
                },
                linkValue: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 11,
    id: "extraInfo",
    header: {
      text: "You must let us know if any of these statements apply to you",
    },
    title: {
      text: "These don't apply to most people but if they apply to you, please let us know.",
    },
    data: [
      {
        style: {
          p: "30px",
        },
        content: [
          {
            fields: [
              {
                style: {
                  marginBottom: "10px",
                },
                id: "checkbox_11_1",
                type: "checkbox",
                withAnimation: true,
                animationTimeOut: 400,
                inputProps: {
                  label:
                    "Are you, or an immediate family member, a control person, senior executive or a 10% shareholder of a publicly traded corporation?",
                  size: "large",
                },
                keys: ["dw", "EMPLOYMENT_INFO", "directorOf"],
                defaultValue: {
                  value: false,
                },
              },
              {
                id: "text_11_2",
                type: "text",
                withAnimation: true,
                animationTimeOut: 400,
                style: {
                  marginBottom: "10px",
                },
                validation: {
                  isRequired: true,
                },
                title: {
                  text: "Please list the comapnt name and its ticker symbol",
                },
                inputProps: {
                  label: "Company name and ticker symbol",
                  errorMessage: "This field cannot be empty",
                },
                keys: ["dw", "EMPLOYMENT_INFO", "directorOfValue"],
                conditions: [
                  {
                    keys: ["dw", "EMPLOYMENT_INFO", "directorOf"],
                    values: [true],
                    operator: "equal",
                  },
                ],
              },
              {
                id: "checkbox_11_3",
                type: "checkbox",
                withAnimation: true,
                animationTimeOut: 400,
                style: {
                  marginBottom: "10px",
                },
                inputProps: {
                  label:
                    "Are you or a family member that lives with you, employed by a brokerage firm, securities exchange or FINRA?",
                  size: "large",
                },
                keys: ["dw", "EMPLOYMENT_INFO", "broker"],
                defaultValue: {
                  value: false,
                },
              },
              {
                id: "checkbox_11_4",
                type: "checkbox",
                withAnimation: true,
                animationTimeOut: 400,
                style: {
                  marginBottom: "10px",
                },
                inputProps: {
                  label:
                    "My account is maintained for a current or doemed Politically Exposed Person or Public Official 9 includes U.S. and Foreign",
                  size: "large",
                },
                keys: ["dw", "EMPLOYMENT_INFO", "maintained"],
                defaultValue: {
                  value: false,
                },
              },
              {
                id: "text_11_5",
                type: "text",
                withAnimation: true,
                animationTimeOut: 400,
                style: {
                  marginBottom: "10px",
                },
                title: {
                  text: "Please provide the names of that official and official’s immediate family members (including former spouses).",
                },
                inputProps: {
                  label: "Please enter the names",
                  errorMessage: "This field cannot be empty",
                },
                validation: {
                  isRequired: true,
                },
                keys: ["dw", "EMPLOYMENT_INFO", "officialNames"],
                conditions: [
                  {
                    keys: ["dw", "EMPLOYMENT_INFO", "maintained"],
                    values: [true],
                    operator: "equal",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 12,
    id: "terms",
    header: {
      text: "Terms and Agreements",
    },
    data: [
      {
        content: [
          {
            fields: [
              {
                id: "checkbox_12_1",
                type: "checkbox",
                withAnimation: true,
                animationTimeOut: 400,
                keys: ["dw", "DISCLOSURES"],
                inputProps: {
                  alignItems: "flex-start",
                  html: '<p>I certify that I have read and agree to the <a target="_blank" href="https://wealthface.com/clientAgreements/wf.USA.pdf">Wealthface</a> and <a target="_blank" href="https://wealthface.com/clientAgreements/dw.pdf">DriveWealth</a> terms, conditions and client agreements.</p>',
                  size: "large",
                },
                validation: {
                  isRequired: true,
                },
                checkedValue: {
                  customerAgreement: true,
                  marketDataAgreement: true,
                  rule14b: true,
                  findersFee: true,
                  privacyPolicy: true,
                  dataSharing: true,
                  termsOfUse: true,
                },
                unCheckedValue: {
                  customerAgreement: false,
                  marketDataAgreement: false,
                  rule14b: false,
                  findersFee: false,
                  privacyPolicy: false,
                  dataSharing: false,
                  termsOfUse: false,
                },
              },
              {
                id: "checkbox_12_2",
                type: "checkbox",
                withAnimation: true,
                animationTimeOut: 400,
                keys: ["dw", "DISCLOSURES"],
                conditions: [
                  {
                    keys: ["other", "IDENTIFICATION_INFO", "resident"],
                    values: ["nonUSA"],
                    operator: "equal",
                  },
                ],
                style: {
                  marginTop: "40px",
                },
                inputProps: {
                  alignItems: "flex-start",
                  html: '<p>I confirm that the information I have entered is correct and can be used to fill the <a target="_blank" href="https://www.irs.gov/forms-pubs/about-form-w-8-ben">W8BEN</a> form, confirming I am not a US citizen or tax resident in a country with a US Tax Treaty.</p>',
                  size: "large",
                },
                validation: {
                  isRequired: true,
                },
                checkedValue: {
                  w8bin: true,
                },
                unCheckedValue: {
                  w8bin: false,
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
// #endregion

// #region Tax Residency Question
export const taxResidency: TQuestion[] = [
  {
    index: 1,
    header: {
      text: "Tax residency",
    },
    data: [
      {
        content: [
          {
            fields: [
              {
                id: "text_10_1",
                type: "text",
                animationTimeOut: 400,
                withAnimation: true,
                title: {
                  text: "This usually doesn’t apply to GCC residents. If you are a tax resident of other countries please let us know to get a full understanding of your financial picture",
                },
                inputProps: {
                  disabled: true,
                },
                keys: ["other", "IDENTIFICATION_INFO", "taxResidency"],
                defaultValue: {
                  isRoot: true,
                  keys: ["auth", "data", "user", "address_country"],
                },
              },
            ],
          },
        ],
      },
      {
        isBlock: true,
        content: [
          {
            fields: [
              {
                id: "link_10_1",
                type: "link",
                animationTimeOut: 400,
                withAnimation: true,
                linkValue: true,
                shouldNotClearOnConditions: true,
                conditions: [
                  {
                    keys: ["other", "IDENTIFICATION_INFO", "haveTaxId"],
                    operator: "notEqual",
                    values: [true],
                  },
                ],
                keys: ["other", "IDENTIFICATION_INFO", "haveTaxId"],
                inputProps: {
                  label: "+ Add Tax Residency",
                  fontWeight: 600,
                },
                validation: {
                  isRequired: true,
                },
                otherValues: {
                  conditions: [
                    {
                      keys: ["other", "IDENTIFICATION_INFO", "haveTaxId"],
                      operator: "notEqual",
                      values: [true],
                    },
                  ],
                  values: [
                    {
                      keys: ["dw", "IDENTIFICATION_INFO", "TIN"],
                      value: "000",
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        conditions: [
          {
            keys: ["other", "IDENTIFICATION_INFO", "haveTaxId"],
            operator: "equal",
            values: [true],
          },
        ],
        content: [
          {
            fields: [
              {
                id: "searchable_10_1",
                type: "searchableList",
                keys: ["dw", "IDENTIFICATION_INFO", "taxCountry"],
                withAnimation: true,
                animationTimeOut: 400,
                optionsKey: "supportedDwCountries",
                inputProps: {
                  label: "Country",
                  withCountryFlagLabel: true,
                  withCountryFlagList: true,
                },
                validation: {
                  isRequired: true,
                },
                title: {
                  text: "List out countries where you are considered a ‘’tax resident’’",
                },
                optionsFilterOut: {
                  values: ["USA"],
                },
              },
              {
                id: "title_10_1",
                type: "title",
                withAnimation: true,
                animationTimeOut: 400,
                inputProps: {
                  label: "Does this country issue a tax ID?",
                  fontColor: "text.primary",
                  fontSize: "14px",
                  fontWeight: 500,
                },
              },
              {
                id: "radioGroup_10_1",
                type: "radioGroup",
                keys: ["other", "IDENTIFICATION_INFO", "taxPayee"],
                optionsKey: "taxExist",
                style: {
                  width: "50%",
                },
                inputProps: {
                  withAnimation: true,
                  animationTimeOut: 400,
                  groupLayout: "layout_2",
                  size: "large",
                },
                validation: {
                  isRequired: true,
                },
              },
              {
                id: "text_10_2",
                type: "text",
                keys: ["dw", "IDENTIFICATION_INFO", "TIN"],
                withAnimation: true,
                animationTimeOut: 400,
                shouldNotClearOnConditions: true,
                inputProps: {
                  errorMessage: "Please enter you tax id",
                  label: "Tax ID",
                },
                validation: {
                  isRequired: true,
                },
                conditions: [
                  {
                    keys: ["other", "IDENTIFICATION_INFO", "taxPayee"],
                    operator: "equal",
                    values: ["yes"],
                  },
                ],
              },
              {
                id: "select_10_1",
                type: "select",
                keys: ["dw", "IDENTIFICATION_INFO", "type"],
                withAnimation: true,
                animationTimeOut: 400,
                optionsKey: "idTypes",
                inputProps: {
                  errorMessage: "Please select your ID type",
                  label: "Please select an ID type",
                },
                validation: {
                  isRequired: true,
                },
                conditions: [
                  {
                    keys: ["other", "IDENTIFICATION_INFO", "taxPayee"],
                    operator: "equal",
                    values: ["no"],
                  },
                ],
              },
              {
                id: "text_10_3",
                type: "text",
                keys: ["dw", "IDENTIFICATION_INFO", "value"],
                withAnimation: true,
                animationTimeOut: 400,
                inputProps: {
                  errorMessage: "Please enter your document number",
                  label: "Document number",
                },
                validation: {
                  isRequired: true,
                },
                conditions: [
                  {
                    keys: ["other", "IDENTIFICATION_INFO", "taxPayee"],
                    operator: "equal",
                    values: ["no"],
                  },
                ],
              },
              {
                id: "likn_10_2",
                type: "link",
                keys: ["other", "IDENTIFICATION_INFO", "haveTaxId"],
                withAnimation: true,
                animationTimeOut: 400,
                inputProps: {
                  label: "Cancel",
                  linkColor: "danger",
                  fontWeight: 600,
                },
                linkValue: false,
              },
            ],
          },
        ],
      },
    ],
  },
];
// #endregion

// #region KYC Questions
export const KYCQuestions: TQuestion[] = [
  {
    index: 1,
    header: {
      text: "What is your age?",
    },
    title: {
      text: "Please tell us about your age",
    },
    hint: {
      header: {
        style: {
          fontSize: "22px",
        },
        text: "Why we ask?",
      },
      title: {
        style: {
          fontSize: "16px",
        },
        text: "In order to open accounts for you, we're required to gather some basic information about your employment.We always keep this, and any other personal information, private.",
      },
      withAnimation: true,
    },
    data: [
      {
        style: {
          padding: "0px",
        },
        content: [
          {
            fields: [
              {
                id: "radio_Group_1",
                type: "radioGroup",
                optionsKey: "age",
                keys: ["KYCAnswersNew", "WHAT_IS_YOUR_AGE"],
                validation: {
                  isRequired: true,
                },
                inputProps: {
                  withAnimation: true,
                  animationTimeOut: 400,
                  size: "large",
                  spacing: "15px",
                  padding: "20px",
                  fontSize: "18px",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 2,
    header: {
      text: "Amount to invest",
    },
    title: {
      text: "How much are you willing to invest?",
    },
    data: [
      {
        style: {
          padding: "0px",
        },
        content: [
          {
            fields: [
              {
                id: "radio_Group_2",
                type: "radioGroup",
                optionsKey: "amountToInvest",
                withAnimation: true,
                animationTimeOut: 500,
                keys: ["KYCAnswersNew", "AMOUNT_TO_INVEST"],
                validation: {
                  isRequired: true,
                },
                inputProps: {
                  withAnimation: true,
                  animationTimeOut: 400,
                  size: "large",
                  spacing: "15px",
                  padding: "20px",
                  fontSize: "18px",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 3,
    header: {
      text: "Annual income",
    },
    title: {
      text: "What's your annual income?",
    },
    data: [
      {
        style: {
          padding: "0px",
        },
        content: [
          {
            fields: [
              {
                optionsKey: "income",
                id: "radio_group_3",
                type: "radioGroup",
                keys: ["KYCAnswersNew", "ANNUAL_INCOME"],
                validation: {
                  isRequired: true,
                },
                inputProps: {
                  withAnimation: true,
                  animationTimeOut: 400,
                  size: "large",
                  spacing: "15px",
                  padding: "20px",
                  fontSize: "18px",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 4,
    header: {
      text: "What’s your liquid net worth?",
    },
    title: {
      text: "Liquid net worth includes investments such as stocks and mutual funds, but does not include assets that are difficult to readily convert, such as real estate or cars.",
    },
    data: [
      {
        style: {
          padding: "0px",
        },
        content: [
          {
            fields: [
              {
                id: "radio_group_4",
                type: "radioGroup",
                optionsKey: "netWorth",
                keys: ["KYCAnswersNew", "LIQUID_NET_WORTH"],
                validation: {
                  isRequired: true,
                },
                inputProps: {
                  withAnimation: true,
                  animationTimeOut: 400,
                  size: "large",
                  spacing: "15px",
                  padding: "20px",
                  fontSize: "18px",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 5,
    header: {
      text: "What’s your net worth?",
    },
    title: {
      text: "Add up everything you own (house, cash, car, investments, etc.) minus everything you owe (i.e. mortgage, cards, student loans, lines of credit, business loans, etc.)Enter an approximate dollar amount",
    },
    data: [
      {
        style: {
          padding: "0px",
        },
        content: [
          {
            fields: [
              {
                id: "radio_group_5",
                type: "radioGroup",
                optionsKey: "netWorth",
                keys: ["KYCAnswersNew", "NET_WORTH"],
                validation: {
                  isRequired: true,
                },
                inputProps: {
                  withAnimation: true,
                  animationTimeOut: 400,
                  size: "large",
                  spacing: "15px",
                  padding: "20px",
                  fontSize: "18px",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 6,
    header: {
      text: "What's your investment objective?",
    },
    data: [
      {
        style: {
          padding: "0px",
        },
        content: [
          {
            fields: [
              {
                id: "radio_group_6",
                type: "radioGroup",
                optionsKey: "objectives",
                keys: ["KYCAnswersNew", "INVESTMENT_OBJECTIVES"],
                validation: {
                  isRequired: true,
                },
                inputProps: {
                  withAnimation: true,
                  animationTimeOut: 400,
                  size: "large",
                  spacing: "15px",
                  padding: "20px",
                  fontSize: "18px",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 7,
    header: {
      text: "What's your investment horizon?",
    },
    data: [
      {
        style: {
          padding: "0px",
        },
        content: [
          {
            fields: [
              {
                id: "radio_group_7",
                type: "radioGroup",
                optionsKey: "investmentHorizon",
                keys: ["KYCAnswersNew", "INVESTMENT_HORIZON"],
                validation: {
                  isRequired: true,
                },
                inputProps: {
                  withAnimation: true,
                  animationTimeOut: 400,
                  size: "large",
                  spacing: "15px",
                  padding: "20px",
                  fontSize: "18px",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 8,
    header: {
      text: "Do you have any debt that you need to pay off?",
    },
    data: [
      {
        style: {
          padding: "0px",
        },
        content: [
          {
            fields: [
              {
                id: "radio_group_8",
                type: "radioGroup",
                optionsKey: "haveDept",
                keys: ["KYCAnswersNew", "HAVE_DEPT"],
                validation: {
                  isRequired: true,
                },
                inputProps: {
                  withAnimation: true,
                  animationTimeOut: 400,
                  size: "large",
                  spacing: "15px",
                  padding: "20px",
                  fontSize: "18px",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 9,
    header: {
      text: "What kind of debt?",
    },
    conditions: [
      {
        keys: ["KYCAnswersNew", "HAVE_DEPT"],
        values: ["Yes"],
        operator: "equal",
      },
    ],
    data: [
      {
        style: {
          padding: "0px",
        },
        content: [
          {
            fields: [
              {
                id: "radio_group_9",
                type: "radioGroup",
                optionsKey: "deptKind",
                keys: ["KYCAnswersNew", "DEPT"],
                validation: {
                  isRequired: true,
                },
                inputProps: {
                  withAnimation: true,
                  animationTimeOut: 400,
                  size: "large",
                  spacing: "15px",
                  padding: "20px",
                  fontSize: "18px",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 10,
    header: {
      text: "If you invest $50,000 and the value of your portfolio goes down by 10%, what would you do?",
    },
    data: [
      {
        style: {
          padding: "0px",
        },
        content: [
          {
            fields: [
              {
                id: "radio_group_10",
                type: "radioGroup",
                optionsKey: "marketDownDecision",
                keys: ["KYCAnswersNew", "MARKET_DOWN_DECISION"],
                validation: {
                  isRequired: true,
                },
                inputProps: {
                  withAnimation: true,
                  animationTimeOut: 400,
                  size: "large",
                  spacing: "15px",
                  padding: "20px",
                  fontSize: "18px",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 11,
    header: {
      text: "How certain is your income?",
    },
    data: [
      {
        style: {
          padding: "0px",
        },
        content: [
          {
            fields: [
              {
                id: "radio_group_11",
                type: "radioGroup",
                optionsKey: "certainIncome",
                keys: ["KYCAnswersNew", "HOW_CERTAIN_YOUR_INCOME"],
                validation: {
                  isRequired: true,
                },
                inputProps: {
                  withAnimation: true,
                  animationTimeOut: 400,
                  size: "large",
                  spacing: "15px",
                  padding: "20px",
                  fontSize: "18px",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 12,
    header: {
      text: "Do you have any previous experience investing in mutual funds, stocks, bonds or different types of securities?",
    },
    data: [
      {
        style: {
          padding: "0px",
        },
        content: [
          {
            fields: [
              {
                id: "radio_group_12",
                type: "radioGroup",
                optionsKey: "previousExperience",
                keys: ["KYCAnswersNew", "PREVIOUS_INVESTMENT_EXPERIENCE"],
                validation: {
                  isRequired: true,
                },
                inputProps: {
                  withAnimation: true,
                  animationTimeOut: 400,
                  size: "large",
                  spacing: "15px",
                  padding: "20px",
                  fontSize: "18px",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: 13,
    header: {
      text: "If you decided to invest on your own and manage your portfolio, how do you think you’d do it?",
    },
    title: {
      text: "This helps us better understand your performance and experiences",
      style: {
        fontSize: "20px",
        fontWeight: 500,
      },
    },
    data: [
      {
        style: {
          padding: "0px",
        },
        content: [
          {
            fields: [
              {
                id: "radio_group_14",
                type: "radioGroup",
                optionsKey: "investmentDesicion",
                keys: ["KYCAnswersNew", "INVESTMENT_DECISION"],
                validation: {
                  isRequired: true,
                },
                inputProps: {
                  withAnimation: true,
                  animationTimeOut: 400,
                  size: "large",
                  spacing: "15px",
                  padding: "20px",
                  fontSize: "18px",
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
// #endregion

// #region Data to be stored in the onboarding answers
export const preStoredData = {
  dw: {
    BASIC_INFO: {
      firstName: "Noubar",
      lastName: "Hanno",
      phone: "526448438",
      country: "+971",
    },
    PERSONAL_INFO: {
      gender: "Male",
      marital: "Married",
      birthDay: 25,
      birthMonth: 9,
      birthYear: 1987,
    },
    IDENTIFICATION_INFO: {
      citizenship: "+971",
    },
    ADDRESS_INFO: {
      street1: "dubai",
      city: "dubai",
      postalCode: "0000",
    },
    EMPLOYMENT_INFO: {
      status: "UNEMPLOYED",
    },
    DISCLOSURES: {
      customerAgreement: true,
      marketDataAgreement: true,
      rule14b: true,
      findersFee: true,
      privacyPolicy: true,
      dataSharing: true,
      termsOfUse: true,
      w8bin: true,
    },
  },
  other: {
    PERSONAL_INFO: {
      birthCountry: "+971",
    },
    ADDRESS_INFO: {
      addressCountry: "+968",
      mailingProof: false,
    },
    MAILING_ADDRESS: {
      street1: "dubai",
      city: "dubai",
      addressCountry: "+968",
      postalCode: "0000",
    },
    INCOME_SOURCE: {
      anotherIncome: "yes",
      listOfIncome: [
        {
          per: "100",
          value: "selfEmployed",
        },
      ],
    },
  },
  status: {
    pageIndex: 13,
    submit: true,
  },
  docs: [],
};
//#endregion

// #region Risk Levels config array
export const riskLevels = [
  {
    min: 0,
    max: 22,
    name: "Low Risk",
    id: 1,
    description:
      "Based on your risk profile, you are not comfortable with risk. You seek out lower-return investments with the risk of limited losses that come as a result.",
  },
  {
    min: 22,
    max: 27,
    name: "Very Conservative",
    id: 2,
    description:
      "Based on your risk profile, you are not comfortable with risk. You seek out lower-return investments with the risk of limited losses that come as a result.",
  },
  {
    min: 27,
    max: 32,
    name: "Conservative",
    id: 3,
    description:
      "Based on your risk profile, you are moderately comfortable with risk. You seek out moderate-return investments with the risk of moderate losses that come as a result.",
  },
  {
    min: 32,
    max: 37,
    name: "Balanced",
    id: 4,
    description:
      "Based on your risk profile, you are moderately comfortable with risk. You seek out moderate-return investments with the risk of moderate losses that come as a result.",
  },
  {
    min: 37,
    max: 43,
    name: "Semi Aggressive",
    id: 5,
    description:
      "Based on your risk profile, you are moderately comfortable with risk. You seek out moderate-return investments with the risk of moderate losses that come as a result.",
  },
  {
    min: 43,
    max: 49,
    name: "Aggressive",
    id: 6,
    description:
      "Based on your risk profile, you are highly comfortable with risk. You seek out high-return investments with the risk of higher losses that come as a result.",
  },
  {
    min: 49,
    max: 66,
    name: "Very Aggressive",
    id: 7,
    description:
      "Based on your risk profile, you are highly comfortable with risk. You seek out high-return investments with the risk of higher losses that come as a result.",
  },
];
// #endregion

// #region KYC Risk Level calculation config file
export const KYCQuestionCategories = [
  {
    min: 0,
    max: 20,
    mark: 5,
  },
  {
    min: 20,
    max: 40,
    mark: 4,
  },
  {
    min: 40,
    max: 60,
    mark: 3,
  },
  {
    min: 60,
    max: 80,
    mark: 2,
  },
  {
    min: 80,
    max: 100,
    mark: 1,
  },
];
// #endregion
