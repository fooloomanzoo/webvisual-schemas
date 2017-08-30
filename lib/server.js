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
          "default": 1
        },
        "password": {
          "description": "Password",
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
      "description": "Einstellungen zur Authentifikation über eine Webschnittstelle",
      "type": "object",
      "additionalItems": false,
      "properties": {
        "required": {
          "description": "Client wird über die Schnittstelle authentifiziert",
          "type": "boolean",
          "default": false
        },
        "type": {
          "description": "Authentifizierungstyp",
          "required": [ "type", "baseDN", "url" ],
          "type": "object",
          "properties": {
            "type": {
              "description": "Typ der Schnittstelle",
              "type": "string",
              "enum": [ "ldap" ],
              "enumNames": [ "LDAP"]
            },
            "baseDN": {
              "description": "Organisationsstruktur über LDAP",
              "type": "string"
            },
            "url": {
              "description": "Adresse des Authentifizierungsservers",
              "type": "string"
            }
          }
        }
      }
    },
    "port": {
      "description": "Port des Webservers",
      "type": "number",
      "minimum": 0,
      "maximum": 65535,
      "multipleOf": 1,
      "default": 443
    },
    "ssl": {
      "description": "SSL-Einstellungen",
      "additionalItems": false,
      "required": [ "cert", "key", "passphrase" ],
      "type": "object",
      "properties": {
        "cert": {
          "description": "lokale Adresse der Zertifikatsdatei",
          "type": "string"
        },
        "key": {
          "description": "lokale Adresse der Schlüsseldatei",
          "type": "string"
        },
        "passphrase": {
          "description": "lokale Adresse der Passphrasendatei",
          "type": "string"
        },
        "ca": {
          "description": "lokale Adresse des Ordners der Zertifikatkette (cert_chain)",
          "type": "string"
        }
      }
    },
    "sessionStore": {
      "description": "Art der Speicherung der Sessioncookies der Clients",
      "$ref": "#/definitions/database"
    },
    "database": {
      "type": "object",
      "description": "Einstellungen der Datenbank der Messdaten",
      "properties": {
        "maxCount": {
          "description": "maximale Anzahl an Daten, die gespeichert werden sollen",
          "type": "number",
          "minimum": 0,
          "maximum": 1e7,
          "multipleOf": 1,
          "default": 86400
        },
        "cleanInterval": {
          "description": "Interval in dem die Datenbank bereinigt werden soll (in ms)",
          "type": "number",
          "minimum": 0,
          "multipleOf": 1000,
          "default": 36e5
        },
        "encoding": {
          "description": "Kodierung",
          "type": "string",
          "enum": ["binary", "text"],
          "enumNames": ["Binär (Messagepack)", "Text (JSON)"],
          "default": "binary"
        }
      }
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
