module.exports = {
  "definitions": {
    "database": {
      "type": "object",
      "additionalItems": true,
      "required": ["type", "host", "port", "password"],
      "properties": {
        "type": {
          "description": "Art der Datenbank",
          "type": "string",
          "enum": ["redis"],
          "enumNames": ["Redis"],
          "default": "redis"
        },
        "host": {
          "description": "Hostadresse des Datenbankservers",
          "type": "string",
          "default": "localhost"
        },
        "port": {
          "description": "Port des Datenbankservers",
          "type": "number",
          "minimum": 0,
          "maximum": 65535,
          "multipleOf": 1,
          "default": 6379
        },
        "db": {
          "description": "Tabellennummer der Datenbank im Datenbankserver",
          "type": "number",
          "minimum": 0,
          "multipleOf": 1,
          "default": 0
        },
        "password": {
          "description": "Password (zur Zeit nicht implementiert)",
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
      "description": "Interner Name (Messsystem, verwendet für die Datenbank)",
      "type": "string"
    },
    "title": {
      "description": "Anzuzeigender Titel",
      "type": "string"
    },
    "input": {
      "description": "eingehende Daten",
      "type": "object",
      "properties": {
        "file": {
          "description": "aus Datei",
          "type": "array",
          "items": {
            "description": "Verbindungseinstellungen",
            "type": "object",
            "additionalItems": false,
            "required": ["mode", "localconfigfile", "path", "format", "encoding"],
            "properties": {
              "path": {
                "description": "Pfad oder nach GLOB-Pattern definierter Pfad der Datei",
                "type": "string",
                "default": "./examples/datafile/*test.txt"
              },
              "configInData": {
                "description": "Konfigurationen in Messdatei",
                "type": "object",
                "properties": {
                  "included": {
                    "description": "Teile der Messdatei dahingehend verwendet, dass sie die Konfiguarionsdatei erweitern",
                    "type": "boolean",
                    "default": false
                  },
                  "namesInLine": {
                    "description": "Zeilennummer der Bezeichnungen der Messgeräte",
                    "type": "number",
                    "minimum": 0,
                    "multipleOf": 1
                  },
                  "unitsInLine": {
                    "description": "Zeilennummer der Einheitenbezeichnungen der Messdaten",
                    "type": "number",
                    "minimum": 0,
                    "multipleOf": 1
                  }
                }
              },
              "localconfigfile": {
                "description": "Pfad der Konfiguration der Eigenschaften der Daten",
                "type": "string",
                "default": "./examples/config/locals.json"
              },
              "mode": {
                "description": "Modus der Überwächung der Datei",
                "type": "string",
                "enum": ["once", "append", "prepend", "all", "json"],
                "enumNames": ["einmaliges Einlesen der Datei", "neue Daten am Ende angefügt", "neue Daten am Anfang angefügt", "gesamte Datei", "Datei im JSON-Format"],
                "default": "append"
              },
              "encoding": {
                "description": "Kodierung",
                "type": "string",
                "enum": ["binary", "text"],
                "enumNames": ["Binär", "Text"],
                "default": "text"
              },
              "format": {
                "description": "Eingabeformat der Daten",
                "type": "object",
                "properties": {
                  "ignoredFirstLines": {
                    "description": "Anzahl der Zeilen am Anfang, die ignoriert werden sollen",
                    "type": "number",
                    "minimum": 0,
                    "multipleOf": 1,
                    "default": 0
                  },
                  "ignoredLastLines": {
                    "description": "Anzahl der Zeilen am Ende, die ignoriert werden sollen",
                    "type": "number",
                    "minimum": 0,
                    "multipleOf": 1,
                    "default": 0
                  },
                  "dateFormat": {
                    "description": "Datumsformat (YYYY: Jahr, MM: Monat, DD: Tag, hh: Stunde, mm: Minuten, ss: Sekunden, lll: Millisekunden)",
                    "type": "string",
                    "default": "YYYY-MM-DD hh:mm:ss"
                  },
                  "decimalSeparator": {
                    "description": "Dezimaltrennzeichen",
                    "type": "string",
                    "enum": [".", ","],
                    "default": "."
                  },
                  "valueSeparator": {
                    "description": "Trennzeichen der Daten untereinander",
                    "type": "string",
                    "default": ";"
                  }
                }
              }
            }
          }
        },
        "database": {
          "description": "aus Datenbank",
          "type": "array",
          "items": {
            "description": "Verbindungseinstellungen",
            "type": "object",
            "additionalItems": false,
            "required": ["database", "encoding", "localconfigfile"],
            "properties": {
              "connection": {
                "description": "Anbindung der Datenbank",
                "$ref": "#/definitions/database"
              },
              "localconfigfile": {
                "description": "Pfad der Konfiguration der Eigenschaften der Daten",
                "type": "string",
                "default": "./examples/config/locals.json"
              },
              "mode": {
                "description": "Modus der Überwächung der Datenbank",
                "type": "string",
                "enum": ["once", "subscribe"],
                "enumNames": ["einmaliges Einlesen der Daten", "abonnieren neu hinzugefügter Daten"],
                "default": "subscribe"
              },
              "encoding": {
                "description": "Kodierung",
                "type": "string",
                "enum": ["binary", "text"],
                "enumNames": ["Binär", "Text"],
                "default": "binary"
              }
            }
          }
        },
        "udp": {
          "description": "über UDP",
          "type": "array",
          "items": {
            "description": "Verbindungseinstellungen",
            "type": "object",
            "additionalItems": false,
            "required": ["mode", "localconfigfile", "path", "format", "encoding"],
            "properties": {
              "path": {
                "description": "Netzwerkadresse",
                "type": "string"
              },
              "port": {
                "description": "Port",
                "type": "number",
                "minimum": 0,
                "maximum": 65535,
                "multipleOf": 1
              },
              "localconfigfile": {
                "description": "Pfad der Konfiguration der Eigenschaften der Daten",
                "type": "string",
                "default": "./examples/config/locals.json"
              },
              "mode": {
                "description": "Modus der Überwächung der Verbindung",
                "type": "string",
                "enum": ["once", "all"],
                "enumNames": ["einmaliges Einlesen der Daten", "gesamte Übertragungen"],
                "default": "all"
              },
              "encoding": {
                "description": "Kodierung",
                "type": "string",
                "enum": ["binary", "text"],
                "enumNames": ["Binär", "Text"],
                "default": "text"
              },
              "format": {
                "description": "Eingabeformat der Daten",
                "type": "object",
                "properties": {
                  "dateFormat": {
                    "description": "Datumsformat (YYYY: Jahr, MM: Monat, DD: Tag, hh: Stunde, mm: Minuten, ss: Sekunden, lll: Millisekunden)",
                    "type": "string",
                    "default": "YYYY-MM-DD hh:mm:ss"
                  },
                  "decimalSeparator": {
                    "description": "Dezimaltrennzeichen",
                    "type": "string",
                    "enum": [".", ","],
                    "default": "."
                  },
                  "valueSeparator": {
                    "description": "Trennzeichen der Daten untereinander",
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
    "output": {
      "description": "Datensicherung, Ein- und Auslesen vorhandener Daten",
      "type": "object",
      "properties": {
        "database": {
          "description": "Messdaten an Datenbankserver",
          "$ref": "#/definitions/database"
        }
      }
    },
    "web": {
      "type": "object",
      "description": "Webclients",
      "properties": {
        "clientRequest": {
          "type": "object",
          "description": "Einstellungen der Clientabfragen",
          "required": ["initial"],
          "properties": {
            "initial": {
              "description": "Initiale Abfrage",
              "type": "object",
              "properties": {
                "view": {
                  "description": "Ansicht, die ein Benutzer nach der Auswahl initial sieht",
                  "type": "string",
                  "enum": ["list", "groups", "detail"],
                  "enumNames": ["Listenansicht aller Elemente", "Gruppierung nach Eigenschaften", "Detailansicht"],
                  "default": "list"
                },
                "count": {
                  "description": "Anzahl an neusten Messdaten, die an den Benutzer anfangs gesendet werden",
                  "type": "object",
                  "properties": {
                    "mobile": {
                      "description": "Anzahl an initialen Daten auf einem mobilen Gerät",
                      "type": "number",
                      "minimum": 0,
                      "multipleOf": 1,
                      "default": 300
                    },
                    "desktop": {
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
      }
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
