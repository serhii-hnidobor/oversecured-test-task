# Visitor Management Service

This is a simple service that allows manual tracking of visitors. It consists of both a frontend and a backend, utilizing AWS services.

## Technologies Used

- JS/TypeScript
- Node.js
- Serverless framework/Express.js
- AWS SDK
- VueJS/Bootstrap
- AWS CLI

## Backend

The backend application is built using the Serverless framework, with an optional use of Express.js.
It consists of a set of Lambda functions that perform basic operations on visitors, such as create, update, delete, read all, and read one.
The DynamoDB table is defined in the Serverless YAML file.

## Deployment

To deploy the backend, used the Serverless framework to deploy the Lambda functions and the table.
Update the frontend environment variables with the API Gateway endpoint received after deployment.

## Frontend

The frontend consists of a single page with the following features:
- A list of existing visitors in the building.
- "Add New Visitor" button that opens a form for creating a new visitor, including their name and surname.
- "Delete Visitor" button that opens a confirmation dialog for deleting a visitor.
- "Edit Visitor" button that opens a window for modifying the visitor's details (name and surname).
- Upon deletion, modification, or creation, the table is updated.
- The table has sortable columns: name, surname, and creation time (entry time).
- The basic design is based on Bootstrap or a similar framework.

## Deployment

Deployed the frontend by hosting it in an S3 bucket and configuring distribution via CloudFront. Use the URL obtained from CloudFront to access the service.

