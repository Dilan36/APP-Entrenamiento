// Capa de comunicación con Google Sheets (vía Apps Script Web App)

async function apiGet(action, params = {}) {
  const url = new URL(API_URL);
  url.searchParams.set("action", action);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Error de red al leer datos");
  return res.json();
}

async function apiPost(action, payload = {}) {
  // Apps Script Web Apps no soportan bien preflight CORS con JSON + headers custom,
  // por eso mandamos como text/plain y el propio script parsea el JSON.
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action, ...payload }),
  });
  if (!res.ok) throw new Error("Error de red al guardar datos");
  return res.json();
}

function apiConfigured() {
  return typeof API_URL === "string" && API_URL.startsWith("http");
}
