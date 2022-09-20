export const document = {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "Charging System",
    description: "Charging System API",
  },
  paths: {
    "/v1/station/": {
      get: {
        tags: ["Station CRUD operations"],
        description: "Get stations",
        operationId: "getStations",
        parameters: [],
        responses: {
          "200": {
            description: "Statios were obtained",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Station",
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Station CRUD operations"],
        description: "Create new station",
        operationId: "createStation",
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Station",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Statios created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Station",
                },
              },
            },
          },
          "500": {
            description: "Server error",
          },
        },
      },
    },
    "/v1/station/{id}/": {
      post: {
        tags: ["Station CRUD operations"],
        description: "Update station",
        operationId: "updateStation",
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              $ref: "#/components/schemas/_id",
            },
            required: true,
            description: "Id of station to be updated",
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Station",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Todo updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Station",
                },
              },
            },
          },
          "500": {
            description: "Server error",
          },
        },
      },
      delete: {
        tags: ["Station CRUD operations"],
        description: "Deleting a station",
        operationId: "deleteStation",
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              $ref: "#/components/schemas/_id",
            },
            required: true,
            description: "Deleting a station",
          },
        ],
        responses: {
          "200": {
            description: "Station deleted successfully",
          },
          "500": {
            description: "Server error",
          },
        },
      },
    },
    "/v1/message/": {
      post: {
        tags: ["Send mqtt message"],
        description: "Send messge",
        operationId: "sendMessage",
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Message",
              },
            },
          },
        },
        responses: {
          "200": {},
        },
      },
    },
  },
  components: {
    schemas: {
      _id: {
        type: "ObjectId",
        description: "An id of a station",
        example: "63006083e3ea63ff62224e88",
      },
      Station: {
        type: "object",
        properties: {
          _id: {
            type: "ObjectId",
            description: "Unique number of station",
            example: "63006083e3ea63ff62224e88",
          },
          stationName: {
            type: "string",
            description: "Station name",
            example: "Station 1",
          },
          stationCode: {
            type: "number",
            description: "Station code",
            example: 111,
          },
          channel: {
            type: "string",
            description: "The channel of station",
            example: "station1",
          },
          status: {
            type: "string",
            description: "The status of the station",
            example: "Idle",
          },
        },
      },
      Message: {
        type: "object",
        properties: {
          stationCode: {
            type: "number",
            description: "Station code",
            example: 111,
          },
          status: {
            type: "string",
            description: "The status of the station",
            example: "Charging",
          },
        },
      },
    },
  },
};
