# Property Broker API

This is a RESTful API for a property broker application, allowing users to manage property listings, user accounts, and messages.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
4. [API Documentation](#api-documentation)
5. [Environment Variables](#environment-variables)
6. [Contributing](#contributing)
7. [License](#license)

## Features

- User authentication (register, login)
- Property management (create, list, search, update, delete)
- User-specific property listings
- Messaging system
- Image upload for properties using Cloudinary

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Multer for file uploads
- Cloudinary for image storage
- Cors for cross-origin resource sharing

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see [Environment Variables](#environment-variables))
4. Start the server: `npm start`

## API Documentation
User Routes:
Base URL: https://broker-backend-9ksr.onrender.com/api/v1/user
a. Register User

Endpoint: POST /register
Description: Register a new user
Request Body:
{
"username": "string",
"password": "string"
}
Response: User details on successful registration

b. Login User

Endpoint: POST /login
Description: Authenticate a user and generate a token
Request Body:
{
"username": "string",
"password": "string"
}
Response: Authentication token and user details


Property Routes:
Base URL: /api/v1/property
a. Create Property

Endpoint: POST /create
Description: Create a new property listing
Authentication: Required
Request Body: Multipart form data

propertyName: string
address: string
description: string
type: string
price: number
furnished: boolean
parking: boolean
images: file (up to 10 images)


Response: Created property details

b. List All Properties

Endpoint: GET /list
Description: Retrieve all property listings
Authentication: Not required
Response: Array of all property listings

c. Get User's Properties

Endpoint: GET /myListing
Description: Retrieve properties owned by the authenticated user
Authentication: Required
Response: Array of user's property listings

d. Search Properties

Endpoint: GET /search/:id
Description: Search for properties by ID, name, description, or address
Authentication: Required
Parameters:

id: string (search query)


Response: Array of matching properties

e. Delete Property

Endpoint: DELETE /:id
Description: Delete a specific property
Authentication: Required
Parameters:

id: string (property ID)


Response: Success message

f. Update Property

Endpoint: PUT /:id
Description: Update a specific property
Authentication: Required
Parameters:

id: string (property ID)


Request Body: Multipart form data (same as Create Property)
Response: Updated property details


Message Routes:
Base URL: /api/v1/message
a. Send Message

Endpoint: POST /send
Description: Send a message
Authentication: Required
Request Body: (not specified in the provided code)
Response: (not specified in the provided code)

b. Get Messages

Endpoint: GET /get
Description: Retrieve messages for the logged-in user
Authentication: Required
Response: (not specified in the provided code)

c. Delete Message

Endpoint: DELETE /:messageId
Description: Delete a specific message
Authentication: Required
Parameters:

messageId: string (message ID)


Response: (not specified in the provided code)

## Environment Variables

Create a `config/config.env` file with the following variables:

- PORT: Server port number
- MONGO_URI: MongoDB connection string
- JWT_SECRET: Secret key for JWT
- CLOUDINARY_CLOUD_NAME: Cloudinary cloud name
- CLOUDINARY_API_KEY: Cloudinary API key
- CLOUDINARY_API_SECRET: Cloudinary API secret

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
