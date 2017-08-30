module.exports = {
  "definitions": {
    "item": {
      "type": "object",
      "required": ["id"],
      "properties": {
        "id": {
          "description": "Identifizierer des Elements ",
          "type": "string",
          "default": ""
        },
        "isSignal": {
          "type": "boolean",
          "description": "das Element zeigt nur Alarmzustände an",
          "default": false
        },
        "keys": {
          "type": "object",
          "description": "Eigenschaften, die angezeigt werden und gegebenenfalls zur Gruppierung verwendet werden",
          "properties": {
            "title": {
              "type": "string",
              "description": "Anzeigetitel",
              "default": ""
            }
          },
          "required": ["title"]
        },
        "threshold": {
          "type": "object",
          "description": "der Grenzbereich gibt an, in welchem Bereich die Werte liegen, in denen kein Alarm angezeigt werden soll",
          "properties": {
            "from": {
              "type": "number",
              "description": "von"
            },
            "to": {
              "type": "number",
              "description": "bis"
            }
          }
        },
        "unit": {
          "type": "string",
          "description": "Einheit der Messwerte"
        },
        "color": {
          "type": "string",
          "description": "Farbe des Anzeigeelements",
          "default": ""
        },
        "svg": {
          "type": "object",
          "description": "Eigenschaften der SVG-Anzeige",
          "properties": {
            "path": {
              "type": "string",
              "description": "Pfad der SVG-Datei"
            },
            "selector": {
              "type": "string",
              "description": "CSS-Selector des grafischen Elements, dass das Element in der SVG-Datei repräsentiert"
            }
          }
        }
      }
    }
  },
  "type": "object",
  "title": "Konfiguration",
  "properties": {
    "items": {
      "type": "array",
      "description": "Elemente der Messdatei (die Reihenfolge entspricht der Position innerhalb einer Zeile der Datei)",
      "additionalItems": true,
      "items": {
        "$ref": "#/definitions/item"
      }
    },
    "ignore": {
      "type": "array",
      "description": "Positionen, die ignoriert werden sollen (entspricht der Position der angegebenen Elemente)",
      "additionalItems": true,
      "items": {
        "type": "number"
      }
    },
    "defaultItem": {
      "type": "object",
      "description": "Rückfallwerte der Eigenschaften der Elemente",
      "properties": {
        "title": {
          "type": "string",
          "description": "Anzeigetitel"
        }
      },
      "required": []
    },
    "groupingKeys": {
      "type": "array",
      "description": "Eigenschaften die zum Gruppieren verwendet werden sollen",
      "additionalItems": true,
      "items": {
        "type": "string"
      }
    },
    "preferedGroupingKey": {
      "type": "string",
      "description": "bevorzugte Gruppierungseigenschaft und nach der initial gruppiert wird"
    },
    "svg": {
      "type": "array",
      "description": "Konfiguration der SVG-Anzeige",
      "additionalItems": true,
      "items": {
        "type": "object",
        "properties": {
          "path": {
            "type": "string",
            "description": "Pfad zur SVG-Datei"
          },
          "minZoom": {
            "type": "number",
            "description": "minimaler Zoom",
            "minimum": 0,
            "multipleOf": 0.1,
            "default": 0.9
          },
          "maxZoom": {
            "type": "number",
            "description": "maximaler Zoom",
            "description": "",
            "minimum": 0,
            "multipleOf": 0.1,
            "default": 5
          },
          "zoomPartition": {
            "type": "number",
            "description": "Einpassung des fokussierten Objekts in den darstellenden Container entsprechend der Größe des Objekts",
            "minimum": 0,
            "multipleOf": 0.1,
            "default": 3
          },
          "items": {
            "type": "array",
            "description": "Elemente, die in der SVG-Anzeige selektierbar sein sollen (vorhandene werden automatisch hinzugefügt)",
            "additionalItems": true,
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string",
                  "description": "ID des Elements"
                },
                "title": {
                  "type": "string",
                  "description": "Titel in der Anzeige"
                },
                "selector": {
                  "type": "string",
                  "description": "CSS-Selector des grafischen Elements, dass das Element in der SVG-Datei repräsentiert"
                }
              }
            }
          }
        }
      }
    },
    "exclusiveGroups": {
      "type": "array",
      "description": "vorbelegte Gruppierungen",
      "additionalItems": true,
      "items": {
        "type": "object",
        "required": ["key", "title"],
        "properties": {
          "key": {
            "type": "string",
            "description": "Gruppierungseigenschaft",
          },
          "title": {
            "type": "string",
            "description": "Titel der Gruppe"
          },
          "items": {
            "type": "array",
            "description": "Ids der Geräte, die dieser Gruppe angehören sollen",
            "items": {
              "type": "string"
            }
          }
        }
      }
    }
  },
  "default": [{
    "item": [],
    "ignore": [],
    "defaultItem": {},
    "groupingKeys": [],
    "preferedGroupingKey": "",
    "svg": [],
    "exclusiveGroups": []
  }]
}
