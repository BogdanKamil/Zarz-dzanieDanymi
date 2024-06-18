migrate((db) => {
  const collection = new Collection({
    "id": "5wqvt5ahm3u8r00",
    "created": "2024-06-15 09:19:03.464Z",
    "updated": "2024-06-15 09:19:03.464Z",
    "name": "grades",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "7vws5zbb",
        "name": "studentId",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "749b4amg5ds44ns",
          "cascadeDelete": true,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "ilalf349",
        "name": "przedmiot",
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
        "id": "iacvnbpc",
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
  const collection = dao.findCollectionByNameOrId("5wqvt5ahm3u8r00");

  return dao.deleteCollection(collection);
})
