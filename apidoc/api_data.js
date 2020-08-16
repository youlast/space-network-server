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
    "filename": "src/controllers/auth/AuthController.ts",
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
    "filename": "src/controllers/auth/AuthController.ts",
    "groupTitle": "auth",
    "name": "PostApiAuthSignup"
  },
  {
    "type": "get",
    "url": "/api/blog/posts",
    "title": "/api/blog/posts",
    "group": "blog",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n [\n  {id:string,content:string,title:string,imageUrl:string}\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "1) Posts not found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/blog/BlogController.ts",
    "groupTitle": "blog",
    "name": "GetApiBlogPosts"
  },
  {
    "type": "post",
    "url": "/api/blog/signup",
    "title": "/api/blog/create_post",
    "group": "blog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "content",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "imagePost",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "1) Title has not been specified\n2) Content has not been specified",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/blog/BlogController.ts",
    "groupTitle": "blog",
    "name": "PostApiBlogSignup"
  },
  {
    "type": "put",
    "url": "/api/blog/delete_post",
    "title": "/api/blog/delete_post",
    "group": "blog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "idPost",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "1) Title has not been specified\n2) Content has not been specified\n3) IdPost has not been specified",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/blog/BlogController.ts",
    "groupTitle": "blog",
    "name": "PutApiBlogDelete_post"
  },
  {
    "type": "put",
    "url": "/api/blog/update_post",
    "title": "/api/blog/update_post",
    "group": "blog",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "content",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "imagePost",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "idPost",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "1) Title has not been specified\n2) Content has not been specified\n3) IdPost has not been specified",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/blog/BlogController.ts",
    "groupTitle": "blog",
    "name": "PutApiBlogUpdate_post"
  }
] });
