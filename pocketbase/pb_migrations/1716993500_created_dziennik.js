migrate((db) => {
  const collection = new Collection({
    "id": "eyk4c5fru7voh7h",
    "created": "2024-05-29 14:38:20.671Z",
    "updated": "2024-05-29 14:38:20.671Z",
    "name": "dziennik",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ntyyaxf8",
        "name": "imie",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 3,
          "max": 25,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "pjigr2nt",
        "name": "nazwisko",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 3,
          "max": 25,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ugcvniqq",
        "name": "przedmiot",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 3,
          "max": 25,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "uwnkev7r",
        "name": "ocena",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("eyk4c5fru7voh7h");

  return dao.deleteCollection(collection);
})
