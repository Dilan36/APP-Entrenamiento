/**
 * APPS SCRIPT — "Mi Entrenamiento"
 * ---------------------------------
 * Instrucciones:
 * 1. Abre tu Google Sheet (crea uno nuevo si no tienes).
 * 2. Menú Extensiones > Apps Script.
 * 3. Borra el contenido de Code.gs y pega TODO este archivo.
 * 4. Ajusta SHEET_NAME abajo si le pusiste otro nombre a la pestaña.
 * 5. Guarda, luego Implementar > Nueva implementación:
 *      - Tipo: Aplicación web
 *      - Ejecutar como: Yo (tu cuenta)
 *      - Quién tiene acceso: Cualquier usuario
 * 6. Copia la URL que te da (".../exec") y pégala en js/config.js del sitio.
 * 7. La primera vez que la abras en el navegador, Google pedirá autorizar el script (es tuyo, dale permiso).
 */

const SHEET_NAME = "Registros"; // nombre de la pestaña dentro del Sheet
const HEADERS = ["Fecha", "Ejercicio", "Serie", "Reps", "Peso"];

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  return sheet;
}

function doGet(e) {
  const action = e.parameter.action;

  if (action === "historial") {
    return jsonResponse_({ filas: leerHistorial_() });
  }

  return jsonResponse_({ error: "Acción GET no reconocida: " + action });
}

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonResponse_({ error: "JSON inválido" });
  }

  if (body.action === "guardarSesion") {
    guardarFilas_(body.filas || []);
    return jsonResponse_({ ok: true, guardadas: (body.filas || []).length });
  }

  return jsonResponse_({ error: "Acción POST no reconocida: " + body.action });
}

function guardarFilas_(filas) {
  const sheet = getSheet_();
  filas.forEach(f => {
    sheet.appendRow([f.fecha, f.ejercicio, f.serie, f.reps, f.peso]);
  });
}

function leerHistorial_() {
  const sheet = getSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  const data = sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues();
  return data.map(row => ({
    fecha: formatearFecha_(row[0]),
    ejercicio: row[1],
    serie: row[2],
    reps: row[3],
    peso: row[4],
  })).filter(f => f.ejercicio); // ignora filas vacías
}

function formatearFecha_(valor) {
  if (valor instanceof Date) {
    return Utilities.formatDate(valor, Session.getScriptTimeZone(), "yyyy-MM-dd");
  }
  return valor;
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
