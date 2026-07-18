// Traducción de valores del dataset (vienen en inglés) para mostrar en español

const CATEGORIA_ES = {
  "back": "Espalda",
  "cardio": "Cardio",
  "chest": "Pecho",
  "lower arms": "Antebrazos",
  "lower legs": "Pantorrillas",
  "neck": "Cuello",
  "shoulders": "Hombros",
  "upper arms": "Brazos",
  "upper legs": "Piernas",
  "waist": "Abdomen",
};

const EQUIPO_ES = {
  "assisted": "Asistido",
  "band": "Banda elástica",
  "resistance band": "Banda elástica",
  "barbell": "Barra",
  "olympic barbell": "Barra olímpica",
  "ez barbell": "Barra Z",
  "trap bar": "Barra hexagonal",
  "body weight": "Peso corporal",
  "bosu ball": "Bosu",
  "cable": "Polea",
  "dumbbell": "Mancuerna",
  "elliptical machine": "Elíptica",
  "hammer": "Martillo",
  "kettlebell": "Kettlebell",
  "leverage machine": "Máquina de palanca",
  "medicine ball": "Balón medicinal",
  "roller": "Rodillo",
  "wheel roller": "Rueda abdominal",
  "skierg machine": "Máquina SkiErg",
  "sled machine": "Trineo",
  "smith machine": "Máquina Smith",
  "stability ball": "Balón suizo",
  "stationary bike": "Bici estática",
  "stepmill machine": "Escaladora",
  "tire": "Neumático",
  "upper body ergometer": "Ergómetro de brazos",
  "weighted": "Con peso adicional",
};

function tCategoria(v) { return CATEGORIA_ES[v] || v || ""; }
function tEquipo(v) { return EQUIPO_ES[v] || v || ""; }

// Orden y catálogo de días de la semana (claves usadas en localStorage)
const DIAS_SEMANA = [
  { key: "lunes", label: "Lunes" },
  { key: "martes", label: "Martes" },
  { key: "miercoles", label: "Miércoles" },
  { key: "jueves", label: "Jueves" },
  { key: "viernes", label: "Viernes" },
  { key: "sabado", label: "Sábado" },
  { key: "domingo", label: "Domingo" },
];

// JS: getDay() → 0=domingo...6=sábado
const DIA_KEY_POR_INDICE = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

function diaKeyHoy() {
  return DIA_KEY_POR_INDICE[new Date().getDay()];
}

function cargarRutina() {
  try {
    return JSON.parse(localStorage.getItem("rutina_semanal") || "{}");
  } catch {
    return {};
  }
}

function guardarRutina(rutina) {
  localStorage.setItem("rutina_semanal", JSON.stringify(rutina));
}
