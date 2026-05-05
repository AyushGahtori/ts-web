
window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
  "swaggerDoc": {
    "swagger": "2.0",
    "info": {
      "title": "Callhippo Developer Api",
      "description": "Develoer api",
      "version": "1"
    },
    "host": "web.callhippo.com",
    "basePath": "/v1",
    "schemes": [
      "https"
    ],
    "consumes": [
      "application/json",
      "application/xml"
    ],
    "produces": [
      "application/json",
      "application/xml"
    ],
    "securityDefinitions": {
      "BasicAuth": {
        "type": "basic",
        "description": "HTTP Basic Authentication"
      }
    },
    "security": [
      {
        "BasicAuth": []
      }
    ],
    "paths": {
      "/user/details/{userid}": {
        "get": {
          "tags": [
            "Users"
          ],
          "description": "",
          "parameters": [
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "in": "path",
              "name": "userid",
              "type": "string",
              "required": true,
              "description": ""
            }
          ],
          "responses": {}
        }
      },
      "/user/list": {
        "get": {
          "tags": [
            "Users"
          ],
          "description": "Get all user list",
          "parameters": [
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            }
          ],
          "responses": {}
        }
      },
      "/user/add": {
        "post": {
          "tags": [
            "Users"
          ],
          "description": "",
          "parameters": [
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "name": "data",
              "in": "body",
              "description": "",
              "default": {
                "email": "test@example.com",
                "firstName": "John",
                "lastName": "Doe",
                "timezone": "Asia/Calcutta"
              },
              "required": true,
              "type": "object"
            }
          ],
          "responses": {}
        }
      },
      "/user/edit/{userId}": {
        "put": {
          "tags": [
            "Users"
          ],
          "description": "",
          "parameters": [
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "in": "path",
              "name": "userId",
              "type": "string",
              "required": true,
              "description": ""
            },
            {
              "name": "data",
              "in": "body",
              "description": "",
              "default": {
                "email": "test@example.com",
                "firstName": "John",
                "lastName": "Doe",
                "timezone": "Asia/Calcutta"
              },
              "example": {
                "email": "test@example.com",
                "firstName": "John",
                "lastName": "Doe",
                "timezone": "Asia/Calcutta"
              },
              "required": true,
              "type": "object"
            }
          ],
          "responses": {}
        }
      },
      "/user/{userId}": {
        "delete": {
          "tags": [
            "Users"
          ],
          "description": "",
          "parameters": [
            {
              "in": "path",
              "name": "userId",
              "type": "string",
              "required": true,
              "description": ""
            },
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            }
          ],
          "responses": {}
        }
      },
      "/activityfeed": {
        "post": {
          "tags": [
            "Activity Feed / Call Logs"
          ],
          "description": "Call log list",
          "parameters": [
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "in": "body",
              "name": "data",
              "description": "Call log list",
              "schema": {
                "type": "object",
                "required": [
                  "skip",
                  "limit",
                  "startDate",
                  "endDate",
                  "apiToken"
                ],
                "properties": {
                  "skip": {
                    "type": "string",
                    "default": 0,
                    "example": 0
                  },
                  "limit": {
                    "type": "string",
                    "default": 20,
                    "example": 20
                  },
                  "startDate": {
                    "type": "string",
                    "example": "2023/06/01",
                    "format": "date",
                    "pattern": "^\\d{4}/\\d{2}/\\d{2}$",
                    "default": "2023/06/01"
                  },
                  "endDate": {
                    "type": "string",
                    "example": "2023/06/31",
                    "format": "date",
                    "pattern": "^\\d{4}/\\d{2}/\\d{2}$",
                    "default": "2023/06/31"
                  },
                  "crmUniqueId": {
                    "type": "string",
                    "default": "",
                    "example": ""
                  },
                  "callSid": {
                    "type": "string",
                    "default": "",
                    "example": "CAac0be025885b451028d68aa624201d6f"
                  }
                }
              }
            }
          ],
          "responses": {}
        }
      },
      "/contact/{userId}": {
        "get": {
          "tags": [
            "Contact"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "userId",
              "type": "string",
              "required": true,
              "description": ""
            },
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "in": "query",
              "name": "current",
              "type": "integer",
              "required": true,
              "description": ""
            },
            {
              "in": "query",
              "name": "dataPerPage",
              "type": "integer",
              "required": true,
              "description": "Maximum dataPerPage : 500"
            },
            {
              "in": "query",
              "name": "updatedDate",
              "type": "date",
              "required": false,
              "description": "Date format should be YYYY/MM/DD. All contacts updated from the entered Updateddate up to the current date will be included in the filter."
            }
          ],
          "responses": {}
        }
      },
      "/contact/add": {
        "post": {
          "tags": [
            "Contact"
          ],
          "description": "Add Contact",
          "parameters": [
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "in": "body",
              "name": "data",
              "description": "Add contact",
              "schema": {
                "type": "object",
                "required": [
                  "number",
                  "firstName",
                  "lastName",
                  "email"
                ],
                "properties": {
                  "number": {
                    "type": "string",
                    "default": "+919999999999",
                    "example": "+919999999999"
                  },
                  "firstName": {
                    "type": "string",
                    "default": "John",
                    "example": "John"
                  },
                  "lastName": {
                    "type": "string",
                    "default": "Smith",
                    "example": "Smith"
                  },
                  "email": {
                    "type": "string",
                    "example": "abc@example.com",
                    "default": "abc@example.com"
                  }
                }
              }
            }
          ],
          "responses": {}
        }
      },
      "/contact/edit/{contactId}": {
        "put": {
          "tags": [
            "Contact"
          ],
          "description": "Update Contact",
          "parameters": [
            {
              "in": "path",
              "name": "contactId",
              "type": "string",
              "required": true,
              "description": ""
            },
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "in": "body",
              "name": "data",
              "description": "Edit contact",
              "schema": {
                "type": "object",
                "required": [
                  "number",
                  "firstName",
                  "lastName",
                  "email"
                ],
                "properties": {
                  "number": {
                    "type": "string",
                    "default": "+919999999999",
                    "example": "+919999999999"
                  },
                  "firstName": {
                    "type": "string",
                    "default": "John",
                    "example": "John"
                  },
                  "lastName": {
                    "type": "string",
                    "default": "Smith",
                    "example": "Smith"
                  },
                  "email": {
                    "type": "string",
                    "example": "abc@example.com",
                    "default": "abc@example.com"
                  }
                }
              }
            }
          ],
          "responses": {}
        }
      },
      "/contact/{contactId}": {
        "delete": {
          "tags": [
            "Contact"
          ],
          "description": "Delete Contact",
          "parameters": [
            {
              "in": "path",
              "name": "contactId",
              "type": "string",
              "required": true,
              "description": ""
            },
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            }
          ],
          "responses": {}
        }
      },
      "/dnc/addnumber": {
        "post": {
          "tags": [
            "Do Not Call (DNC)"
          ],
          "description": "Add number to dnc list",
          "parameters": [
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "in": "body",
              "name": "data",
              "description": "Example: {\"number\": \"+91XXXXXXXX99\", \"dncType\": \"both\" }. (Values for dncType: both, incoming, outgoing)",
              "schema": {
                "type": "object",
                "required": [
                  "number",
                  "dncType"
                ],
                "properties": {
                  "number": {
                    "type": "string",
                    "default": "+91XXXXXXXX99",
                    "example": "+91XXXXXXXX99"
                  },
                  "dncType": {
                    "type": "string",
                    "description": "Values: both, incoming, outgoing",
                    "default": "both",
                    "example": "both",
                    "enum": [
                      "both",
                      "incoming",
                      "outgoing"
                    ]
                  }
                }
              }
            }
          ],
          "responses": {}
        }
      },
      "/dnc/deletenumber": {
        "post": {
          "tags": [
            "Do Not Call (DNC)"
          ],
          "description": "Delete number from dnc list",
          "parameters": [
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "in": "body",
              "name": "data",
              "description": "Delete number from dnc list",
              "schema": {
                "type": "object",
                "required": [
                  "number"
                ],
                "properties": {
                  "number": {
                    "type": "string",
                    "default": "+91XXXXXXXX99",
                    "example": "+91XXXXXXXX99"
                  }
                }
              }
            }
          ],
          "responses": {}
        }
      },
      "/sms/send": {
        "post": {
          "tags": [
            "SMS"
          ],
          "description": "Send a message",
          "parameters": [
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "name": "data",
              "type": "object",
              "description": "",
              "example": {
                "from": "17XXXXXXX09",
                "to": "13XXXXXXX09",
                "userEmail": "abc@example.com",
                "smsBody": "This is test message for test API"
              },
              "in": "body",
              "from": {
                "type": "string",
                "default": "13XXXXXXX09",
                "example": "13XXXXXXX09"
              },
              "to": {
                "type": "string",
                "default": "17XXXXXXX09",
                "example": "17XXXXXXX09"
              },
              "userEmail": {
                "type": "string",
                "example": "abc@example.com",
                "default": "userEmail"
              },
              "smsBody": {
                "type": "string",
                "example": "This is test message for test API",
                "default": "numberId"
              }
            }
          ],
          "responses": {}
        }
      },
      "/sms/logs": {
        "post": {
          "tags": [
            "SMS"
          ],
          "description": "SMS logs list",
          "parameters": [
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "in": "body",
              "name": "data",
              "description": "SMS log list",
              "schema": {
                "type": "object",
                "required": [
                  "skip",
                  "limit",
                  "startDate",
                  "endDate",
                  "apiToken"
                ],
                "properties": {
                  "skip": {
                    "type": "string",
                    "default": 0,
                    "example": 0
                  },
                  "limit": {
                    "type": "string",
                    "default": 20,
                    "example": 20
                  },
                  "startDate": {
                    "type": "string",
                    "example": "2023/06/01",
                    "format": "date",
                    "pattern": "^\\d{4}/\\d{2}/\\d{2}$",
                    "default": "2023/06/01"
                  },
                  "endDate": {
                    "type": "string",
                    "example": "2023/06/31",
                    "format": "date",
                    "pattern": "^\\d{4}/\\d{2}/\\d{2}$",
                    "default": "2023/06/31"
                  },
                  "SMSID": {
                    "type": "string",
                    "default": "",
                    "example": "SM8f69a8eef5g49fb8d58zf9f6c9ied059"
                  },
                  "from": {
                    "type": "string",
                    "default": "",
                    "example": "+13XXXXXXX09"
                  },
                  "to": {
                    "type": "string",
                    "default": "",
                    "example": "+13XXXXXXX09"
                  }
                }
              }
            }
          ],
          "responses": {}
        }
      },
      "/callReminder/add": {
        "post": {
          "tags": [
            "Call Reminder"
          ],
          "description": "Create a call reminder",
          "parameters": [
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "name": "data",
              "type": "object",
              "description": "",
              "example": {
                "contactName": "John Doe",
                "phoneNumber": "13XXXXXXX09",
                "agentEmail": "agent37@example.com",
                "reminderTime": 30
              },
              "in": "body",
              "contactName": {
                "type": "string",
                "default": "John Doe",
                "example": "John Doe"
              },
              "phoneNumber": {
                "type": "string",
                "default": "17XXXXXXX09",
                "example": "17XXXXXXX09"
              },
              "agentEmail": {
                "type": "string",
                "default": "agent37@example.com",
                "example": "agent37@example.com"
              },
              "reminderTime": {
                "type": "number",
                "default": 30,
                "example": 15
              }
            }
          ],
          "responses": {}
        }
      },
      "/callReminder/delete/{id}": {
        "delete": {
          "tags": [
            "Call Reminder"
          ],
          "description": "Delete a call reminder",
          "parameters": [
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "in": "path",
              "name": "id",
              "type": "string",
              "required": true,
              "description": ""
            }
          ],
          "responses": {}
        }
      },
      "/campaign": {
        "post": {
          "tags": [
            "Power - Dialer"
          ],
          "description": "Add campaign",
          "parameters": [
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "name": "data",
              "type": "object",
              "description": "",
              "in": "body",
              "required": true,
              "schema": {
                "type": "object",
                "properties": {
                  "campaignName": {
                    "type": "string",
                    "required": true,
                    "description": "Camapign name",
                    "example": "campaign name"
                  },
                  "allocationType": {
                    "type": "string",
                    "description": "Allocation type user Or team",
                    "example": "users"
                  },
                  "userEmails": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    },
                    "example": [
                      "abc@test.com",
                      "xyz@test.com"
                    ]
                  },
                  "teamName": {
                    "type": "string",
                    "description": "Allocation type user Or team",
                    "example": "Team -1"
                  },
                  "autoSwitch": {
                    "type": "boolean",
                    "required": true,
                    "description": "Automatically switch your number based on the country you're calling"
                  },
                  "number": {
                    "type": "array",
                    "items": {
                      "types": "string"
                    },
                    "default": [
                      "+111111111111"
                    ],
                    "example": [
                      "+111111111111"
                    ]
                  },
                  "didGroupName": {
                    "type": "string",
                    "description": "Number group name",
                    "example": "Number group"
                  },
                  "minUserLength": {
                    "type": "number",
                    "example": "1",
                    "description": "Minimum available user to run campaign"
                  },
                  "campaignDescription": {
                    "type": "string",
                    "required": true,
                    "default": "campaign description",
                    "example": "campaign description"
                  },
                  "campaignMsgType": {
                    "type": "string",
                    "required": true,
                    "default": "greeting",
                    "example": "greeting"
                  },
                  "isAttempContact": {
                    "type": "boolean",
                    "required": true,
                    "description": "Define the number of attempts you want to make to contacts for which call did not connect. System will make calls to such contacts once the campaign is over."
                  },
                  "numberOfAttemps": {
                    "type": "number",
                    "example": 2,
                    "description": "Number of attemps tried"
                  },
                  "setBeforeMinAttemps": {
                    "type": "number",
                    "example": "2",
                    "description": "Define time in hours to take a pause before next attempt."
                  },
                  "predictive": {
                    "type": "boolean",
                    "required": true,
                    "default": true,
                    "example": true,
                    "description": "Predictive campaign enable"
                  },
                  "pacingRatioAuto": {
                    "type": "boolean",
                    "default": true,
                    "example": true,
                    "description": " true for Auto-Pacing Ratio and false for Fixed Pacing Ratio"
                  },
                  "maxPacingRatio": {
                    "type": "number",
                    "example": "10",
                    "description": "Define Max value to bulk call fire for the agent."
                  },
                  "dialRatio": {
                    "type": "number",
                    "default": 1,
                    "example": 1,
                    "description": "Dail ratio"
                  },
                  "isMachineDetect": {
                    "type": "boolean",
                    "required": true,
                    "example": true,
                    "description": "Machine detection enable, The call will be disconnected when the system detects the answering machine at the other end."
                  },
                  "machineDetectionExecutionMode": {
                    "type": "string",
                    "description": "To Play welcome message as parellel or after machine detection action, Synchronous || Asynchronous",
                    "example": "Synchronous"
                  },
                  "machineDetectionCallAction": {
                    "type": "string",
                    "description": "Run with campaign with agent or without agent (System), transferHumanDetectCallToAgent || onlyMachineDetect",
                    "example": "transferHumanDetectCallToAgent"
                  },
                  "machineDetectionSilentCall": {
                    "type": "string",
                    "description": "Call with silent treat as Machine or Human action, values Machine || Human",
                    "example": "Machine"
                  },
                  "machineDetectTimeLimit": {
                    "type": "number",
                    "example": 30,
                    "description": "Machine detection time limit to identify withing defined value, Value is second."
                  },
                  "voiceMail": {
                    "type": "object",
                    "properties": {
                      "msgType": {
                        "type": "boolean",
                        "example": true,
                        "default": true
                      },
                      "status": {
                        "type": "boolean",
                        "default": false,
                        "example": false
                      },
                      "text": {
                        "type": "string",
                        "default": "Hi , we were trying to reach you but could not connect please let us know your available time to connect.",
                        "example": "Hi , we were trying to reach you but could not connect please let us know your available time to connect."
                      },
                      "language": {
                        "type": "string",
                        "defualt": "en",
                        "example": "en"
                      },
                      "voice": {
                        "type": "string",
                        "default": "MAN",
                        "example": "MAN"
                      }
                    }
                  },
                  "welcomeMsg": {
                    "type": "object",
                    "properties": {
                      "msgType": {
                        "type": "boolean",
                        "default": true,
                        "example": true
                      },
                      "status": {
                        "type": "boolean",
                        "default": false,
                        "example": false
                      },
                      "text": {
                        "type": "string",
                        "default": "Welcome, we will take your call in a few minutes.",
                        "example": "Welcome, we will take your call in a few minutes."
                      },
                      "language": {
                        "type": "string",
                        "defualt": "en",
                        "example": "en"
                      },
                      "voice": {
                        "type": "string",
                        "default": "MAN",
                        "example": "MAN"
                      }
                    }
                  },
                  "queueCall": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "boolean",
                        "example": true
                      },
                      "msgType": {
                        "type": "boolean",
                        "example": true
                      },
                      "text": {
                        "type": "string",
                        "example": "We are facing high call volume, we will take your call in few minutes."
                      },
                      "language": {
                        "type": "string",
                        "example": "en"
                      },
                      "voice": {
                        "type": "string",
                        "description": " value WOMAN | MAN | ALICE ",
                        "example": "WOMAN"
                      },
                      "duration": {
                        "type": "number",
                        "example": 60
                      }
                    }
                  },
                  "timezoneDialing": {
                    "type": "boolean",
                    "example": true,
                    "defualt": false,
                    "description": "Call will be fired according to time zone."
                  },
                  "dailyStartTime": {
                    "type": "string",
                    "example": "00:00",
                    "defualt": "00:00",
                    "description": "Value must be valid time format: HH:MM"
                  },
                  "dailyStopTime": {
                    "type": "string",
                    "example": "23:59",
                    "defualt": "23:59",
                    "description": "Value must be valid time format: HH:MM"
                  }
                }
              }
            }
          ],
          "responses": {
            "200": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean"
                  },
                  "data": {
                    "type": "object",
                    "properties": {
                      "campaignId": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean",
                    "default": false
                  },
                  "error": {
                    "type": "object",
                    "properties": {
                      "error": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean",
                    "default": false
                  },
                  "error": {
                    "type": "object",
                    "properties": {
                      "error": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/campaign/list": {
        "get": {
          "tags": [
            "Power - Dialer"
          ],
          "description": "Retrieve a list of campaigns with specific details.",
          "parameters": [
            {
              "name": "apiToken",
              "in": "header",
              "description": "API token for authentication",
              "required": true,
              "type": "string"
            },
            {
              "name": "campaignType",
              "in": "query",
              "description": "Provide the type of campaign list you want details for.",
              "type": "string",
              "enum": [
                "powerDialer",
                "predictiveDialer",
                "speedToDial"
              ]
            },
            {
              "in": "query",
              "name": "current",
              "type": "integer",
              "required": true,
              "description": ""
            },
            {
              "in": "query",
              "name": "dataPerPage",
              "type": "integer",
              "required": true,
              "description": ""
            }
          ],
          "responses": {
            "200": {
              "description": "Successful response with campaign details",
              "schema": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "campaignName": {
                      "type": "string",
                      "description": "Name of the campaign",
                      "example": "Test Campaign"
                    },
                    "assigner": {
                      "type": "string",
                      "description": "Name of the person who assigned to the campaign",
                      "example": "John Doe"
                    },
                    "completedCallCount": {
                      "type": "integer",
                      "description": "Status of completed calls",
                      "example": 0
                    },
                    "failedCallCount": {
                      "type": "integer",
                      "description": "Status of completed calls",
                      "example": 0
                    },
                    "machineDetection": {
                      "type": "integer",
                      "description": "Status of completed calls",
                      "example": "0 out of 3"
                    },
                    "createdDate": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Date and time the campaign was created",
                      "example": "2024-09-26T07:20:09.369Z"
                    },
                    "campaignDescription": {
                      "type": "string",
                      "description": "Description of the campaign",
                      "example": ""
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request due to invalid parameters",
              "schema": {
                "type": "object",
                "properties": {
                  "success": {
                    "type": "boolean",
                    "example": false
                  },
                  "error": {
                    "type": "string",
                    "example": "Invalid API token"
                  }
                }
              }
            },
            "500": {
              "description": "Internal server error",
              "schema": {
                "type": "object",
                "properties": {
                  "success": {
                    "type": "boolean",
                    "example": false
                  },
                  "error": {
                    "type": "string",
                    "example": "An unexpected error occurred"
                  }
                }
              }
            }
          }
        }
      },
      "/campaign/{campaignId}": {
        "get": {
          "tags": [
            "Power - Dialer"
          ],
          "description": "Campaign details",
          "parameters": [
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "name": "campaignId",
              "in": "path",
              "description": "Campaign id",
              "default": "",
              "required": true,
              "type": "string"
            }
          ],
          "responses": {
            "200": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean"
                  },
                  "data": {
                    "type": "object"
                  }
                }
              }
            },
            "400": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean",
                    "default": false
                  },
                  "error": {
                    "type": "object",
                    "properties": {
                      "error": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean",
                    "default": false
                  },
                  "error": {
                    "type": "object",
                    "properties": {
                      "error": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "put": {
          "tags": [
            "Power - Dialer"
          ],
          "description": "Update campaign",
          "parameters": [
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "name": "campaignId",
              "in": "path",
              "description": "Campaign id",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "name": "data",
              "description": "",
              "in": "body",
              "required": true,
              "schema": {
                "type": "object",
                "properties": {
                  "campaignName": {
                    "type": "string",
                    "required": true,
                    "description": "Camapign name",
                    "example": "campaign name"
                  },
                  "allocationType": {
                    "type": "string",
                    "description": "Allocation type user Or team",
                    "example": "users"
                  },
                  "userEmails": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    },
                    "example": [
                      "abc@test.com",
                      "xyz@test.com"
                    ]
                  },
                  "teamName": {
                    "type": "string",
                    "description": "Allocation type user Or team",
                    "example": "Team -1"
                  },
                  "autoSwitch": {
                    "type": "boolean",
                    "required": true,
                    "description": "Automatically switch your number based on the country you're calling"
                  },
                  "number": {
                    "type": "array",
                    "items": {
                      "types": "string"
                    },
                    "default": [
                      "+111111111111"
                    ],
                    "example": [
                      "+111111111111"
                    ]
                  },
                  "didGroupName": {
                    "type": "string",
                    "description": "Number group name",
                    "example": "Number group"
                  },
                  "campaignDescription": {
                    "type": "string",
                    "required": true,
                    "default": "campaign description",
                    "example": "campaign description"
                  },
                  "campaignMsgType": {
                    "type": "string",
                    "required": true,
                    "default": "greeting",
                    "example": "greeting"
                  },
                  "isAttempContact": {
                    "type": "boolean",
                    "required": true,
                    "description": "Define the number of attempts you want to make to contacts for which call did not connect. System will make calls to such contacts once the campaign is over."
                  },
                  "numberOfAttemps": {
                    "type": "number",
                    "example": 2,
                    "description": "Number of attemps tried"
                  },
                  "setBeforeMinAttemps": {
                    "type": "number",
                    "example": 2,
                    "description": "Define time in hours to take a pause before next attempt."
                  },
                  "predictive": {
                    "type": "boolean",
                    "required": true,
                    "default": true,
                    "example": true,
                    "description": "Predictive campaign enable"
                  },
                  "pacingRatioAuto": {
                    "type": "boolean",
                    "default": true,
                    "example": true,
                    "description": " true for Auto-Pacing Ratio and false for Fixed Pacing Ratio"
                  },
                  "dialRatio": {
                    "type": "number",
                    "default": 1,
                    "example": 1,
                    "description": "Dail ratio"
                  },
                  "maxPacingRatio": {
                    "type": "number",
                    "example": "10",
                    "description": "Define Max value to bulk call fire for the agent."
                  },
                  "minUserLength": {
                    "type": "number",
                    "example": "1",
                    "description": "Minimum available user to run campaign"
                  },
                  "isMachineDetect": {
                    "type": "boolean",
                    "required": true,
                    "example": true,
                    "description": "Machine detection enable, The call will be disconnected when the system detects the answering machine at the other end."
                  },
                  "machineDetectionExecutionMode": {
                    "type": "string",
                    "description": "To Play welcome message as parellel or after machine detection action, Synchronous || Asynchronous",
                    "example": "Synchronous"
                  },
                  "machineDetectionCallAction": {
                    "type": "string",
                    "description": "Run with campaign with agent or without agent (System), transferHumanDetectCallToAgent || onlyMachineDetect",
                    "example": "transferHumanDetectCallToAgent"
                  },
                  "machineDetectionSilentCall": {
                    "type": "string",
                    "description": "Call with silent treat as Machine or Human action, values Machine || Human",
                    "example": "Machine"
                  },
                  "machineDetectTimeLimit": {
                    "type": "number",
                    "example": 30,
                    "description": "Machine detection time limit to identify withing defined value, Value is second."
                  },
                  "voiceMail": {
                    "type": "object",
                    "properties": {
                      "msgType": {
                        "type": "boolean",
                        "example": true,
                        "default": true
                      },
                      "status": {
                        "type": "boolean",
                        "default": false,
                        "example": false
                      },
                      "text": {
                        "type": "string",
                        "default": "Hi , we were trying to reach you but could not connect please let us know your available time to connect.",
                        "example": "Hi , we were trying to reach you but could not connect please let us know your available time to connect."
                      },
                      "language": {
                        "type": "string",
                        "defualt": "en",
                        "example": "en"
                      },
                      "voice": {
                        "type": "string",
                        "default": "MAN",
                        "example": "MAN"
                      }
                    }
                  },
                  "welcomeMsg": {
                    "type": "object",
                    "properties": {
                      "msgType": {
                        "type": "boolean",
                        "default": true,
                        "example": true
                      },
                      "status": {
                        "type": "boolean",
                        "default": false,
                        "example": false
                      },
                      "text": {
                        "type": "string",
                        "default": "Welcome, we will take your call in a few minutes.",
                        "example": "Welcome, we will take your call in a few minutes."
                      },
                      "language": {
                        "type": "string",
                        "defualt": "en",
                        "example": "en"
                      },
                      "voice": {
                        "type": "string",
                        "default": "MAN",
                        "example": "MAN"
                      }
                    }
                  },
                  "queueCall": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "boolean",
                        "example": true
                      },
                      "msgType": {
                        "type": "boolean",
                        "example": true
                      },
                      "text": {
                        "type": "string",
                        "example": "We are facing high call volume, we will take your call in few minutes."
                      },
                      "language": {
                        "type": "string",
                        "example": "en"
                      },
                      "voice": {
                        "type": "string",
                        "description": " value WOMAN | MAN | ALICE ",
                        "example": "WOMAN"
                      },
                      "duration": {
                        "type": "number",
                        "example": 60
                      }
                    }
                  },
                  "timezoneDialing": {
                    "type": "boolean",
                    "example": true,
                    "defualt": false,
                    "description": "Call will be fired according to time zone."
                  },
                  "dailyStartTime": {
                    "type": "string",
                    "example": "00:00",
                    "defualt": "00:00",
                    "description": "Value must be valid time format: HH:MM"
                  },
                  "dailyStopTime": {
                    "type": "string",
                    "example": "23:59",
                    "defualt": "23:59",
                    "description": "Value must be valid time format: HH:MM"
                  }
                }
              }
            }
          ],
          "responses": {
            "200": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean"
                  },
                  "data": {
                    "type": "object",
                    "properties": {
                      "campaignId": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean",
                    "default": false
                  },
                  "error": {
                    "type": "object",
                    "properties": {
                      "error": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean",
                    "default": false
                  },
                  "error": {
                    "type": "object",
                    "properties": {
                      "error": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "delete": {
          "tags": [
            "Power - Dialer"
          ],
          "description": "Campaign delete",
          "parameters": [
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "name": "campaignId",
              "in": "path",
              "description": "Campaign id",
              "default": "",
              "required": true,
              "type": "string"
            }
          ],
          "responses": {
            "200": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean"
                  }
                }
              }
            },
            "400": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean",
                    "default": false
                  },
                  "error": {
                    "type": "object",
                    "properties": {
                      "error": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean",
                    "default": false
                  },
                  "error": {
                    "type": "object",
                    "properties": {
                      "error": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/campaign/{campaignId}/{action}": {
        "patch": {
          "tags": [
            "Power - Dialer"
          ],
          "description": "Campaign run action",
          "parameters": [
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "name": "campaignId",
              "in": "path",
              "description": "Campaign id",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "name": "action",
              "in": "path",
              "description": "Campaign action like start or stop",
              "default": "",
              "required": true,
              "type": "string"
            }
          ],
          "responses": {
            "200": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean"
                  }
                }
              }
            },
            "400": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean",
                    "default": false
                  },
                  "error": {
                    "type": "object",
                    "properties": {
                      "error": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean",
                    "default": false
                  },
                  "error": {
                    "type": "object",
                    "properties": {
                      "error": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/campaign/{campaignId}/contact/bulk": {
        "post": {
          "tags": [
            "Power - Dialer"
          ],
          "description": "Bulk Contact Upload to Campaign",
          "parameters": [
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "name": "campaignId",
              "in": "path",
              "description": "Campaign id",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "name": "data",
              "in": "body",
              "description": "Add number",
              "required": true,
              "type": "object",
              "schema": {
                "properties": {
                  "contacts": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string",
                          "required": true
                        },
                        "phoneNumber": {
                          "type": "string",
                          "required": true
                        },
                        "leadId": {
                          "type": "string",
                          "required": false
                        }
                      }
                    }
                  }
                }
              }
            }
          ],
          "responses": {
            "200": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean"
                  }
                }
              }
            },
            "400": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean",
                    "default": false
                  },
                  "error": {
                    "type": "object",
                    "properties": {
                      "error": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean",
                    "default": false
                  },
                  "error": {
                    "type": "object",
                    "properties": {
                      "error": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/campaign/{campaignId}/contact/{phoneNumber}": {
        "put": {
          "tags": [
            "Power - Dialer"
          ],
          "description": "Campaign update number based on Old number",
          "parameters": [
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "name": "campaignId",
              "in": "path",
              "description": "Campaign id",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "name": "phoneNumber",
              "in": "path",
              "description": "old phone Number to update",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "name": "data",
              "in": "body",
              "required": true,
              "type": "object",
              "schema": {
                "properties": {
                  "newName": {
                    "type": "string"
                  },
                  "newPhoneNumber": {
                    "type": "string"
                  },
                  "newLeadId": {
                    "type": "string",
                    "required": false
                  }
                }
              }
            }
          ],
          "responses": {
            "200": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean"
                  }
                }
              }
            },
            "400": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean",
                    "default": false
                  },
                  "error": {
                    "type": "object",
                    "properties": {
                      "error": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean",
                    "default": false
                  },
                  "error": {
                    "type": "object",
                    "properties": {
                      "error": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/campaign/{campaignId}/contact": {
        "post": {
          "tags": [
            "Power - Dialer"
          ],
          "description": "Campaign contact number list and search contact based on leadId",
          "parameters": [
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "name": "campaignId",
              "in": "path",
              "description": "Campaign id",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "name": "page",
              "in": "query",
              "description": "Page number ",
              "default": 0,
              "required": true,
              "type": "number"
            },
            {
              "name": "size",
              "in": "query",
              "description": "Size is not allow for more then 100",
              "default": 0,
              "required": true,
              "type": "number"
            },
            {
              "name": "data",
              "in": "body",
              "required": false,
              "type": "object",
              "schema": {
                "properties": {
                  "leadId": {
                    "type": "array",
                    "example": [
                      "1",
                      "2"
                    ],
                    "items": {
                      "types": "string"
                    }
                  }
                }
              }
            }
          ],
          "responses": {
            "200": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean"
                  },
                  "data": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string",
                          "required": true
                        },
                        "phoneNumber": {
                          "type": "string",
                          "required": true
                        },
                        "leadId": {
                          "type": "string",
                          "required": false
                        },
                        "attemps": {
                          "type": "string",
                          "description": "Number of attemps tried"
                        },
                        "action": {
                          "type": "string",
                          "required": true,
                          "description": "Number call action"
                        }
                      }
                    }
                  },
                  "hasNext": {
                    "type": "boolean",
                    "description": "Has more data for next page"
                  }
                }
              }
            },
            "400": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean",
                    "default": false
                  },
                  "error": {
                    "type": "object",
                    "properties": {
                      "error": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean",
                    "default": false
                  },
                  "error": {
                    "type": "object",
                    "properties": {
                      "error": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "delete": {
          "tags": [
            "Power - Dialer"
          ],
          "description": "Campaign delete number based on leadId array",
          "parameters": [
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "name": "campaignId",
              "in": "path",
              "description": "Campaign id",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "name": "data",
              "in": "body",
              "required": true,
              "type": "object",
              "schema": {
                "properties": {
                  "leadId": {
                    "example": [
                      "1",
                      "2"
                    ],
                    "type": "array",
                    "items": {
                      "types": "string"
                    }
                  }
                }
              }
            }
          ],
          "responses": {
            "200": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean"
                  }
                }
              }
            },
            "400": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean",
                    "default": false
                  },
                  "error": {
                    "type": "object",
                    "properties": {
                      "error": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean",
                    "default": false
                  },
                  "error": {
                    "type": "object",
                    "properties": {
                      "error": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/user/status": {
        "patch": {
          "tags": [
            "Users"
          ],
          "description": "User - Status update",
          "parameters": [
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "name": "data",
              "in": "body",
              "required": false,
              "type": "object",
              "schema": {
                "properties": {
                  "email": {
                    "type": "string",
                    "example": "abc@example.com"
                  },
                  "status": {
                    "type": "string",
                    "example": "Available"
                  }
                }
              }
            }
          ],
          "responses": {
            "200": {
              "description": "success",
              "schema": {
                "type": "object",
                "properties": {
                  "success": {
                    "type": "boolean"
                  },
                  "message": {
                    "type": "string"
                  }
                }
              }
            },
            "400": {
              "description": "Possible error messages are listed below:\n- Please provide an email and status.\n- Invalid email address.\n- You cannot change the status, your current status is the same.\n- You cannot change the status, given status does not exist.",
              "schema": {
                "type": "object",
                "properties": {
                  "success": {
                    "type": "boolean",
                    "default": false
                  },
                  "error": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "406": {
              "description": "You are out of shift hours. Please ask your admin to change your availability.",
              "schema": {
                "type": "object",
                "properties": {
                  "success": {
                    "type": "boolean",
                    "default": false
                  },
                  "error": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/user/callsession": {
        "patch": {
          "tags": [
            "Users"
          ],
          "description": "User - campaign session status update",
          "parameters": [
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "name": "data",
              "in": "body",
              "required": false,
              "type": "object",
              "schema": {
                "properties": {
                  "email": {
                    "type": "string",
                    "example": "abc@example.com"
                  },
                  "action": {
                    "type": "string",
                    "example": "start",
                    "description": "Action for start or stop"
                  }
                }
              }
            }
          ],
          "responses": {
            "200": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean"
                  },
                  "message": {
                    "type": "string"
                  }
                }
              }
            },
            "400": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean",
                    "default": false
                  },
                  "error": {
                    "type": "object",
                    "properties": {
                      "error": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "success",
              "type": "object",
              "schema": {
                "properties": {
                  "success": {
                    "type": "boolean",
                    "default": false
                  },
                  "error": {
                    "type": "object",
                    "properties": {
                      "error": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/team/list": {
        "get": {
          "tags": [
            "Teams"
          ],
          "description": "Get all teams list",
          "parameters": [
            {
              "name": "apiToken",
              "in": "header",
              "description": "",
              "default": "",
              "required": true,
              "type": "string"
            },
            {
              "in": "query",
              "name": "current",
              "type": "integer",
              "required": true,
              "description": ""
            },
            {
              "in": "query",
              "name": "dataPerPage",
              "type": "integer",
              "required": true,
              "description": ""
            }
          ],
          "responses": {}
        }
      }
    }
  },
  "customOptions": {
    "CRYPTO_AES_KEY": "F8A2BB3F418FEBDD632535271FB50866"
  }
};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.preauthorizeApiKey) {
    const key = customOptions.preauthorizeApiKey.authDefinitionKey;
    const value = customOptions.preauthorizeApiKey.apiKeyValue;
    if (!!key && !!value) {
      const pid = setInterval(() => {
        const authorized = ui.preauthorizeApiKey(key, value);
        if(!!authorized) clearInterval(pid);
      }, 500)

    }
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}

