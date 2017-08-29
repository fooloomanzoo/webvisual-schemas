module.exports = {
  "definitions": {
    "database": {
      "type": "object",
      "additionalItems": true,
      "required": ["type", "host", "port", "password"],
      "properties": {
        "type": {
          "title": "Typ",
          "description": "Art der Datenbank",
          "type": "string",
          "enum": ["redis"],
          "enumNames": ["Redis"]
        },
        "host": {
          "title": "Host",
          "description": "Hostadresse des Datenbankservers",
          "type": "string",
          "default": "localhost"
        },
        "port": {
          "title": "Port",
          "description": "Port des Datenbankservers",
          "type": "number",
          "minimum": 0,
          "maximum": 65535,
          "multipleOf": 1,
          "default": 6379
        },
        "db": {
          "title": "Nummer",
          "description": "Tabellennummer der Datenbank im Datenbankserver",
          "type": "number",
          "minimum": 0,
          "multipleOf": 1,
          "default": 0
        },
        "password": {
          "title": "Password",
          "description": "zur Zeit nicht implementiert",
          "type": "string",
          "default": ""
        }
      }
    }
  },
  "title": "Anbindungen",
  "description": "Einstellungen der eingehenden Messdaten, der Datensicherung und des Webclients",
  "type": "object",
  "properties": {
    "name": {
      "title": "Messsystem",
      "description": "Interner Name (verwendet für die Datenbank)",
      "type": "string"
    },
    "title": {
      "title": "Titel",
      "description": "Anzuzeigender Titel",
      "type": "string"
    },
    "in": {
      "title": "eingehende Daten",
      "type": "object",
      "properties": {
        "file": {
          "title": "aus Datei",
          "type": "array",
          "items": {
            "title": "Verbindungseinstellungen",
            "type": "object",
            "additionalItems": false,
            "required": ["mode", "localconfigfile", "path", "format", "encoding"],
            "properties": {
              "path": {
                "title": "Pfad",
                "description": "oder nach GLOB-Pattern definierter Pfad der Datei",
                "type": "string",
                "default": "./examples/datafile/*test.txt"
              },
              "configInData": {
                "title": "Konfigurationen in Messdatei",
                "type": "object",
                "properties": {
                  "included": {
                    "title": "ist vorhanden",
                    "description": "wenn angegeben, dann werden Teile der Messdatei dahingehend verwendet, dass sie die Konfiguarionsdatei erweitern",
                    "type": "boolean",
                    "default": false
                  },
                  "namesInLine": {
                    "title": "Bezeichnungen der Geräte",
                    "description": "Zeilennummer der Bezeichnungen der Messgeräte",
                    "type": "number",
                    "minimum": 0,
                    "multipleOf": 1
                  },
                  "unitsInLine": {
                    "title": "Bezeichnungen der Einheiten",
                    "description": "Zeilennummer der Einheitenbezeichnungen der Messdaten",
                    "type": "number",
                    "minimum": 0,
                    "multipleOf": 1
                  }
                }
              },
              "localconfigfile": {
                "title": "Pfad der Konfigurationsdatei",
                "description": "Pfad der Konfiguration der Eigenschaften der Daten",
                "type": "string",
                "default": "./examples/config/locals.json"
              },
              "mode": {
                "title": "Modus",
                "description": "Modus der Überwächung der Datei",
                "type": "string",
                "enum": ["once", "append", "prepend", "all", "json"],
                "enumNames": ["einmaliges Einlesen der Datei", "neue Daten am Ende angefügt", "neue Daten am Anfang angefügt", "gesamte Datei", "Datei im JSON-Format"],
                "default": "append"
              },
              "encoding": {
                "title": "Kodierung",
                "type": "string",
                "enum": ["binary", "text"],
                "enumNames": ["Binär", "Text"],
                "default": "text"
              },
              "format": {
                "title": "Eingabeformat der Daten",
                "type": "object",
                "properties": {
                  "ignoredFirstLines": {
                    "title": "Anzahl der Zeilen am Anfang, die ignoriert werden sollen",
                    "type": "number",
                    "minimum": 0,
                    "multipleOf": 1,
                    "default": 0
                  },
                  "ignoredLastLines": {
                    "title": "Anzahl der Zeilen am Ende, die ignoriert werden sollen",
                    "type": "number",
                    "minimum": 0,
                    "multipleOf": 1,
                    "default": 0
                  },
                  "dateFormat": {
                    "title": "Datumsformat",
                    "description": "YYYY: Jahr, MM: Monat, DD: Tag, hh: Stunde, mm: Minuten, ss: Sekunden, lll: Millisekunden",
                    "type": "string",
                    "default": "YYYY-MM-DD hh:mm:ss"
                  },
                  "decimalSeparator": {
                    "title": "Dezimaltrennzeichen",
                    "type": "string",
                    "enum": [".", ","],
                    "default": "."
                  },
                  "valueSeparator": {
                    "title": "Trennzeichen der Daten untereinander",
                    "type": "string",
                    "default": ";"
                  }
                }
              }
            }
          }
        },
        "database": {
          "title": "aus Datenbank",
          "type": "array",
          "items": {
            "title": "Verbindungseinstellungen",
            "type": "object",
            "additionalItems": false,
            "required": ["database", "encoding", "localconfigfile"],
            "properties": {
              "connection": {
                "title": "Verbindung",
                "description": "Anbindung der Datenbank",
                "$ref": "#/definitions/database"
              },
              "localconfigfile": {
                "title": "Pfad der Konfigurationsdatei",
                "description": "Pfad der Konfiguration der Eigenschaften der Daten",
                "type": "string",
                "default": "./examples/config/locals.json"
              },
              "mode": {
                "title": "Modus",
                "description": "Modus der Überwächung der Datenbank",
                "type": "string",
                "enum": ["once", "subscribe"],
                "enumNames": ["einmaliges Einlesen der Daten", "abonnieren neu hinzugefügter Daten"],
                "default": "subscribe"
              },
              "encoding": {
                "title": "Kodierung",
                "type": "string",
                "enum": ["binary", "text"],
                "enumNames": ["Binär", "Text"],
                "default": "binary"
              }
            }
          }
        },
        "udp": {
          "title": "über UDP",
          "type": "array",
          "items": {
            "title": "Verbindungseinstellungen",
            "type": "object",
            "additionalItems": false,
            "required": ["mode", "localconfigfile", "path", "format", "encoding"],
            "properties": {
              "path": {
                "title": "Netzwerkadresse",
                "type": "string"
              },
              "port": {
                "title": "Port",
                "type": "number",
                "minimum": 0,
                "maximum": 65535,
                "multipleOf": 1
              },
              "localconfigfile": {
                "title": "Pfad der Konfiguration",
                "description": "Pfad der Konfiguration der Eigenschaften der Daten",
                "type": "string",
                "default": "./examples/config/locals.json"
              },
              "mode": {
                "title": "Modus",
                "description": "Modus der Überwächung der Verbindung",
                "type": "string",
                "enum": ["once", "all"],
                "enumNames": ["einmaliges Einlesen der Daten", "gesamte Übertragungen"],
                "default": "all"
              },
              "encoding": {
                "title": "Kodierung",
                "type": "string",
                "enum": ["binary", "text"],
                "enumNames": ["Binär", "Text"],
                "default": "text"
              },
              "format": {
                "title": "Format",
                "description": "Eingabeformat der Daten",
                "type": "object",
                "properties": {
                  "dateFormat": {
                    "title": "Datumsformat",
                    "description": "YYYY: Jahr, MM: Monat, DD: Tag, hh: Stunde, mm: Minuten, ss: Sekunden, lll: Millisekunden",
                    "type": "string",
                    "default": "YYYY-MM-DD hh:mm:ss"
                  },
                  "decimalSeparator": {
                    "title": "Dezimaltrennzeichen",
                    "type": "string",
                    "enum": [".", ","],
                    "default": "."
                  },
                  "valueSeparator": {
                    "title": "Trennzeichen der Daten untereinander",
                    "type": "string",
                    "default": ";"
                  }
                }
              }
            }
          }
        }
      }
    },
    "out": {
      "title": "Datensicherung",
      "description": "Ein- und Auslese vorhandener Daten",
      "type": "object",
      "properties": {
        "database": {
          "title": "Datenbank",
          "description": "Messdaten an Datenbankserver",
          "$ref": "#/definitions/database"
        }
      }
    },
    "web": {
      "type": "object",
      "title": "Webclients",
      "properties": {
        "clientRequest": {
          "type": "object",
          "title": "Abfragen von Clients",
          "description": "Einstellungen der Clientabfragen",
          "required": ["initial"],
          "properties": {
            "initial": {
              "title": "Initiale Abfrage",
              "type": "object",
              "properties": {
                "view": {
                  "title": "Anfangsansicht",
                  "description": "Ansicht, die ein Benutzer nach der Auswahl initial sieht",
                  "type": "string",
                  "enum": ["list", "groups", "detail"],
                  "enumNames": ["Listenansicht aller Elemente", "Gruppierung nach Eigenschaften", "Detailansicht"],
                  "default": "list"
                },
                "count": {
                  "title": "Anfangsdaten",
                  "description": "Anzahl an neusten Messdaten, die an den Benutzer anfangs gesendet werden",
                  "type": "object",
                  "properties": {
                    "mobile": {
                      "title": "mobil",
                      "description": "Anzahl an initialen Daten auf einem mobilen Gerät",
                      "type": "number",
                      "minimum": 0,
                      "multipleOf": 1,
                      "default": 300
                    },
                    "desktop": {
                      "title": "stationär",
                      "description": "Anzahl an initialen Daten auf einem Destop-Gerät",
                      "type": "number",
                      "minimum": 0,
                      "multipleOf": 1,
                      "default": 1000
                    }
                  }
                }
              }
            }
          }
        }
      },
      "required": []
    }
  },
  "required": ["name"],
  "default": {
    "name": "",
    "title": "",
    "out": {
      "database": {
        "type": "redis",
        "port": 6379,
        "host": "localhost",
        "db": 1
      }
    },
    "web": {
      "initial": {
        "view": "list",
        "count": {
          "mobile": 300,
          "desktop": 1000
        }
      }
    }
  }
}
