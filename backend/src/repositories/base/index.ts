import { v4 as uuidV4 } from 'uuid';
import { dynamoDb } from '@config';
import { updateParamsFromObject } from '@helpers';

class BaseRepository {
  private readonly collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  generateId() {
    return uuidV4();
  }

  throwError(status: number, message: string) {
    throw { status, message };
  }

  async getAll<T extends object>() {
    const params = {
      TableName: this.collectionName,
    };

    const { $response, Items } = await dynamoDb.scan(params).promise();

    if (Items) {
      return Items as T;
    }

    const { error } = $response;

    this.throwError(error?.statusCode ? error.statusCode : 400, error ? error.message : 'get all error');
  }

  async getById<T extends object>(id: string) {
    const params = {
      TableName: this.collectionName,
      Key: {
        id,
      },
    };

    const { Item, $response } = await dynamoDb.get(params).promise();

    const { error } = $response;

    if (Item) {
      return Item as T;
    }

    this.throwError(error?.statusCode ? error.statusCode : 404, error ? error.message : `${id} not found`);
  }

  async create(inputData: Record<string, string>) {
    const id = this.generateId();
    const createdAt = new Date().toISOString();

    const createData = {
      ...inputData,
      id,
      createdAt,
    };

    const params = {
      TableName: this.collectionName,
      Item: createData,
      ReturnValue: 'ALL_OLD',
    };

    try {
      await dynamoDb.put(params).promise();

      return {
        ...inputData,
        id,
        createdAt,
      };
    } catch (error: any) {
      this.throwError(error?.statusCode ? error.statusCode : 400, error ? error.message : 'unknown error while create');
    }
  }

  async update<T extends object>(inputData: Record<string, string>, id: string) {
    const { updateExpression, expressionAttributeValues } = updateParamsFromObject(inputData);

    const params = {
      TableName: this.collectionName,
      Key: { id: id },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValue: 'ALL_NEW',
    };

    try {
      const dynamoDbResponse = await dynamoDb.update(params).promise();

      const updatedElement = dynamoDbResponse.Attributes as T;

      // if (updatedElement) {
      //   return updatedElement;
      // }
      //
      // this.throwError(400, "unknown error while update");

      return updatedElement;
    } catch (error: any) {
      this.throwError(error?.statusCode ? error.statusCode : 400, error ? error.message : 'unknown error while update');
    }
  }

  async delete(id: string) {
    const params = {
      TableName: this.collectionName,
      Key: { id },
      ReturnValue: 'UPDATED_NEW',
    };

    const { $response: dynamoDbResponse } = await dynamoDb.delete(params).promise();

    const { data: deletedElement, error } = dynamoDbResponse;

    if (deletedElement) {
      return deletedElement;
    }

    this.throwError(error?.statusCode ? error.statusCode : 400, error ? error.message : 'unknown error while delete');
  }
}

export default BaseRepository;
