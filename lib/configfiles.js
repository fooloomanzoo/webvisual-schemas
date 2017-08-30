module.exports = {
  "title": "Visualisierungskonfigurationen",
  "description": "Messdaten und Konfigurationen",
  "type": "array",
  "items": {
    "type": "object",
    "additionalItems": false,
    "required": ["name"],
    "properties": {
      "name": {
        "description": "Messanlage (Interner Name, verwendet für die Datenbank)",
        "type": "string",
        "default": ""
      },
      "title": {
        "description": "Anzuzeigender Titel",
        "type": "string",
        "default": ""
      },
      "paths": {
        "type": "array",
        "description": "Konfigurationsdateipfade der Anbindungen und Einstellungen der eingehenden Messdaten",
        "additionalItems": true,
        "items": {
          "type": "string"
        }
      }
    }
  },
  "default": [{
    "name": "",
    "title": ""
  }]
}
