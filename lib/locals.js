module.exports = {
  "definitions": {
    "item": {
      "type": "object",
      "required": ["id"],
      "properties": {
        "id": {
          "title": "ID",
          "description": "Identifizierer des Elements ",
          "type": "string"
        },
        "isSignal": {
          "type": "boolean",
          "title": "das Element zeigt nur Alarmzustände an",
          "default": false
        },
        "keys": {
          "type": "object",
          "title": "Eigenschaften",
          "description": "Eigenschaften, die angezeigt werden und gegebenenfalls zur Gruppierung verwendet werden",
          "properties": {
            "title": {
              "type": "string",
              "title": "Titel"
            }
          },
          "required": ["title"]
        },
        "threshold": {
          "type": "object",
          "title": "Grenzbereich",
          "description": "gibt an in welchem Bereich die Werte liegen, in denen kein Alarm angezeigt werden soll",
          "properties": {
            "from": {
              "type": "number",
              "title": "von"
            },
            "to": {
              "type": "number",
              "title": "bis"
            }
          }
        },
        "unit": {
          "type": "string",
          "title": "Einheit",
          "description": "Einheit der Messwerte"
        },
        "color": {
          "type": "string",
          "title": "Farbe",
          "description": "Farbe des Anzeigeelements",
          "default": ""
        },
        "svg": {
          "type": "object",
          "title": "SVG",
          "description": "Eigenschaften der SVG-Anzeige",
          "properties": {
            "path": {
              "type": "string",
              "title": "Pfad",
              "description": "Pfad der SVG-Datei"
            },
            "selector": {
              "type": "string",
              "title": "Selector",
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
      "title": "Elemente der Messdatei",
      "description": "die Reihenfolge entspricht der Position in einer Zeile der Messdatei",
      "additionalItems": true,
      "items": {
        "$ref": "#/definitions/item"
      }
    },
    "ignore": {
      "type": "array",
      "title": "Positionen, die ignoriert werden sollen",
      "description": "die Zahl entspricht der Position der angegebenen Elemente",
      "additionalItems": true,
      "items": {
        "type": "number"
      }
    },
    "defaultItem": {
      "type": "object",
      "title": "Defaultwerte eines Elements",
      "description": "Rückfallwerte der Eigenschaften der Elemente",
      "properties": {
        "title": {
          "type": "string",
          "title": "Titel"
        }
      },
      "required": []
    },
    "groupingKeys": {
      "type": "array",
      "title": "Gruppierierungseigenschaften",
      "description": "Werte die zum Gruppieren verwendet werden sollen",
      "additionalItems": true,
      "items": {
        "type": "string"
      }
    },
    "preferedGroupingKey": {
      "type": "string",
      "title": "bevorzugte Gruppierungseigenschaft",
      "description": "Wert nach der initial gruppiert wird"
    },
    "svg": {
      "type": "array",
      "title": "SVG",
      "description": "Konfiguration der SVG-Anzeige",
      "additionalItems": true,
      "items": {
        "type": "object",
        "properties": {
          "path": {
            "type": "string",
            "title": "Pfad",
            "description": "Pfad zur SVG-Datei"
          },
          "minZoom": {
            "type": "number",
            "title": "minimaler Zoom",
            "minimum": 0,
            "multipleOf": 0.1,
            "default": 0.9
          },
          "maxZoom": {
            "type": "number",
            "title": "maximaler Zoom",
            "description": "",
            "minimum": 0,
            "multipleOf": 0.1,
            "default": 5
          },
          "zoomPartition": {
            "type": "number",
            "title": "Partitionierung",
            "description": "Einpassung des fokussierten Objekts in den darstellenden Container entsprechend der Größe des Objekts",
            "minimum": 0,
            "multipleOf": 0.1,
            "default": 3
          },
          "items": {
            "type": "array",
            "title": "Elemente",
            "description": "Elemente, die in der SVG-Anzeige selektierbar sein sollen (vorhandene werden automatisch hinzugefügt)",
            "additionalItems": true,
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string",
                  "title": "ID",
                  "description": "ID des Elements"
                },
                "title": {
                  "type": "string",
                  "title": "Titel",
                  "description": "Titel in der Anzeige"
                },
                "selector": {
                  "type": "string",
                  "title": "Selector",
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
      "title": "Gruppierung",
      "description": "vorbelegte Eigenschaften, nach denen die Gruppierung erfolgen soll",
      "additionalItems": true,
      "items": {
        "type": "object",
        "required": ["key", "title"],
        "properties": {
          "key": {
            "type": "string",
            "title": "Gruppierungseigenschaft",
            "description": "Name des Schlüssels in den 'keys'"
          },
          "title": {
            "type": "string",
            "title": "Titel",
            "description": "Titel der Gruppe"
          },
          "items": {
            "type": "array",
            "title": "Elemente",
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
