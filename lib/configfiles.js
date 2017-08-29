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
        "title": "Messanlage",
        "description": "Interner Name (verwendet für die Datenbank)",
        "type": "string"
      },
      "title": {
        "title": "Titel",
        "description": "Anzuzeigender Titel",
        "type": "string"
      },
      "paths": {
        "type": "array",
        "title": "Pfade",
        "description": "Konfigurationsdateien der Anbindungen und Einstellungen der eingehenden Messdaten",
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