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
  "type": "object",
  "title": "Servereinstellungen",
  "description": "Einstellungen des Webservers",
  "required": [ "auth", "port", "ssl", "sessionStore" ],
  "additionalItems": false,
  "properties": {
    "auth": {
      "title": "Authentifikation",
      "description": "Einstellungen zur Authentifikation über die Webschnittstelle",
      "type": "object",
      "additionalItems": false,
      "properties": {
        "required": {
          "title": "Ist Erforderlich",
          "description": "Client wird über die Schnittstelle authentifiziert",
          "type": "boolean",
          "default": false
        },
        "type": {
          "title": "Typ",
          "description": "Authentifizierungstyp",
          "required": [ "type", "baseDN", "url" ],
          "type": "object",
          "properties": {
            "type": {
              "title": "Art",
              "description": "Name der Schnittstelle",
              "type": "string",
              "enum": [ "ldap", "_" ],
              "enumNames": [ "LDAP", " " ]
            },
            "baseDN": {
              "title": "baseDN",
              "description": "Organisationsstruktur über LDAP",
              "type": "string"
            },
            "url": {
              "title": "URL",
              "description": "Adresse des Authentifizierungsservers",
              "type": "string"
            }
          }
        }
      }
    },
    "port": {
      "title": "Port",
      "description": "Port des Webservers",
      "type": "number",
      "minimum": 0,
      "maximum": 65535,
      "multipleOf": 1,
      "default": 443
    },
    "ssl": {
      "title": "SSL-Einstellungen",
      "description": "Dateien die zur Verschlüsselung der Verbindung benötigt werden",
      "additionalItems": false,
      "required": [ "cert", "key", "passphrase" ],
      "type": "object",
      "properties": {
        "cert": {
          "title": "Zertifikat",
          "description": "lokale Adresse der Zertifikatsdatei",
          "type": "string"
        },
        "key": {
          "title": "Schlüssel",
          "description": "lokale Adresse der Schlüsseldatei",
          "type": "string"
        },
        "passphrase": {
          "title": "Passphrase",
          "description": "lokale Adresse der Passphrasendatei",
          "type": "string"
        },
        "ca": {
          "title": "Zertifikatskette",
          "description": "lokale Adresse des Ordners der Zertifikatkette (cert_chain)",
          "type": "string"
        }
      }
    },
    "sessionStore": {
      "title": "Sessiondatenbank",
      "description": "Art der Speicherung der Sessioncookies der Clients",
      "$ref": "#/definitions/database"
    },
    "database": {
      "type": "object",
      "title": "Datenbank",
      "description": "Einstellungen der Datenbank der Messdaten",
      "properties": {
        "maxCount": {
          "title": "maximale Anzahl an Daten",
          "description": "Zielwert an Daten, die gespeichert werden sollen",
          "type": "number",
          "minimum": 0,
          "maximum": 1e7,
          "multipleOf": 1,
          "default": 86400
        },
        "cleanInterval": {
          "title": "Aufräumintervall",
          "description": "Interval in dem die Datenbank bereinigt werden soll (in ms)",
          "type": "number",
          "minimum": 0,
          "multipleOf": 1000,
          "default": 36e5
        },
        "encoding": {
          "title": "Kodierung",
          "type": "string",
          "enum": ["binary", "text"],
          "enumNames": ["Binär (Messagepack)", "Text (JSON)"],
          "default": "binary"
        }
      },
      "required": []
    },
    "_tmpDir": {
      "type": "string"
    }
  },
  "default": {
    "auth": {
      "required": false,
      "type": {
        "type": "ldap",
        "baseDN": "dc=ibn-net,dc=kfa-juelich,dc=de",
        "url": "ldap://ibn-net.kfa-juelich.de"
      }
    },
    "port": 443,
    "ssl": {
      "cert": "./defaults/ssl/ca.crt",
      "key": "./defaults/ssl/ca.key",
      "passphrase": "./defaults/ssl/ca.pw.json",
      "ca": "./defaults/ssl/ca"
    },
    "sessionStore": {
      "type": "redis",
      "port": 6379,
      "host": "localhost",
      "db": 1
    },
    "database": {
      "encoding": "binary",
      "maxCount": 86400,
      "cleanInterval": 36e5
    }
  }
}
