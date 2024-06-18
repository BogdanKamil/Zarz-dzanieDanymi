migrate((db) => {
  const collection = new Collection({
    "id": "749b4amg5ds44ns",
    "created": "2024-06-15 09:15:20.723Z",
    "updated": "2024-06-15 09:15:20.723Z",
    "name": "students",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ytzsdvwa",
        "name": "imie",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "h2pmxb76",
        "name": "nazwisko",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("749b4amg5ds44ns");

  return dao.deleteCollection(collection);
})
