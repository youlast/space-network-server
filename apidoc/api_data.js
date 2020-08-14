define({ "api": [
  {
    "type": "post",
    "url": "/api/auth/signin",
    "title": "/api/auth/signin",
    "group": "auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"userId\": 12345,\n  \"token\": \"token\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "1) Email has not been specified\n2) Password has not been specified\n3) Email has not been found\n4) Email and password do not match",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/AuthController.ts",
    "groupTitle": "auth",
    "name": "PostApiAuthSignin"
  },
  {
    "type": "post",
    "url": "/api/auth/signup",
    "title": "/api/auth/signup",
    "group": "auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "confirmPassword",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Please check your email to confirm it by link (also check junk folder)\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "1) Email has not been specified\n2) Password has not been specified\n3) Confirm password has not been specified\n4) Passwords do not match\n5) Password should be longer than 7 characters\n6) Email already exists",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/AuthController.ts",
    "groupTitle": "auth",
    "name": "PostApiAuthSignup"
  }
] });
