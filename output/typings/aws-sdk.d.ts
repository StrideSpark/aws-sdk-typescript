/**
 * Type definitions for aws-sdk
 * Project: https://github.com/aws/aws-sdk-js
 * Definitions by: https://github.com/ingenieux/aws-sdk-typescript
 * GENERATED CODE - DO NOT EDIT
 */

declare module "aws-sdk" {

  export var config: ClientConfig;

  export function Config(json: any): void;

  export class Credentials {
    constructor(accessKeyId: string, secretAccessKey: string, sessionToken?: string);
    accessKeyId: string;
    expired: boolean;
    expireTime: Date;
    expiryWindow: number;
    secretAccessKey: string;
    sessionToken: string;
    get(callback: (err?: Error) => void): void;
    needsRefresh(): boolean;
    refresh(callback: (err?: Error) => void): void;
    params: CredentialParams;
    refresh(callback?: (err?: Error) => void): void;
  }

  export interface CredentialParams {
    Logins: { [index: string]: string };
  }

  export interface Logger {
    write?: (chunk: any, encoding?: string, callback?: () => void) => void;
    log?: (...messages: any[]) => void;
  }

  export interface HttpOptions {
    proxy?: string;
    agent?: any;
    timeout?: number;
    xhrAsync?: boolean;
    xhrWithCredentials?: boolean;
  }

  export interface ClientConfigPartial {
    credentials?: Credentials;
    region?: string;
    computeChecksums?: boolean;
    convertResponseTypes?: boolean;
    logger?: Logger;
    maxRedirects?: number;
    maxRetries?: number;
    paramValidation?: boolean;
    s3ForcePathStyle?: boolean;
    apiVersion?: any;
    signatureVersion?: string;
    sslEnabled?: boolean;
    systemClockOffset?: number;
  }

  export interface APIVersionsType {
    [api: string]: string;
  }

  export interface ClientConfig extends ClientConfigPartial {
    apiVersions?: APIVersionsType;
    update?: (options: ClientConfigPartial, allUnknownKeys?: boolean) => void;
    getCredentials?: (callback: (err?: any) => void) => void;
    loadFromPath?: (path: string) => void;
    credentials: Credentials;
    region: string;
  }

  export class Endpoint {
    constructor(endpoint: string);

    host: string;
    hostname: string;
    href: string;
    port: number;
    protocol: string;
  }

  export class Service {
    apiVersions: string[];
    services: { [version: string]: any };
    serviceIdentifier: string;

    makeRequest(operation: string, params: Object, callback: (error?: Error, data?: any) => void): void;
    makeUnauthenticatedRequest(operation: string, params: Object, callback: (error?: Error, data?: any) => void): void;
    setupRequestListeners(): void;
    waitFor(state: string, params: Object, callback?: (error?: Error, data?: any) => void): Request<any, any>;
  }

  export module CognitoIdentity {
    export interface CognitoIdentityCredentialsParams {
      IdentityPoolId?: string;
      AccountId?: string;
      Logins?: { [k: string]: any };

      RoleArn?: string;
      RoleSessionName?: string;
      WebIdentityToken?: string;
      ProviderId?: string;
      Policy?: string;
      DurationSeconds?: number;

      IdentityId?: string;
    }
  }

  export class CognitoIdentityCredentials extends Credentials {
    constructor(params: CognitoIdentity.CognitoIdentityCredentialsParams);
  }

  export class Request<R, E> extends EventEmitter {
    constructor(service: Service, operation: string, params: Object);

    on(event: string, listener: Function): Request<any, any>;
    httpRequest: HttpRequest;
    startTime: Date;
    abort(): Request<any, any>;
    promise(): Promise<R>;
    createReadStream(): ReadableStream;
    eachItem(callback: Function): void;
    eachPage(callback: (err: Error, data: any, done?: () => void) => boolean | void): void;
    isPageable(): boolean;
    send(callback?: (err: Error, data: any) => void): void;
  }

  export class HttpRequest {
    body: string;
    endpoint: Endpoint;
    headers: { [index: string]: string };
    method: string;
    path: string;
    pathName(): string;
    search(): string;
  }

  export type Buffer = any;

  /*
   * Node-compatible interfaces
   */
  export class EventEmitter {
    addListener(event: string, listener: Function): EventEmitter;
    on(event: string, listener: Function): EventEmitter;
    once(event: string, listener: Function): EventEmitter;
    removeListener(event: string, listener: Function): EventEmitter;
    removeAllListeners(event?: string): EventEmitter;
    setMaxListeners(n: number): void;
    listeners(event: string): Function[];
    emit(event: string, ...args: any[]): boolean;
  }

  export interface ReadableStream extends EventEmitter {
    readable: boolean;
    read(size?: number): any;
    setEncoding(encoding: string): void;
    pause(): void;
    resume(): void;
    pipe<T extends WritableStream>(destination: T, options?: { end?: boolean; }): T;
    unpipe<T extends WritableStream>(destination?: T): void;
    unshift(chunk: string): void;
    unshift(chunk: Buffer): void;
    wrap(oldStream: ReadableStream): ReadableStream;
  }

  export interface WritableStream extends EventEmitter {
    writable: boolean;
    write: Function;
    end: Function;
  }

  export module DynamoDB {
    export class DocumentClient {
      /**
      * Creates a DynamoDB document client with a set of configuration options.
      *
      * @option options params [map] An optional map of parameters to bind to every
      *   request sent by this service object.
      * @option options service [AWS.DynamoDB] An optional pre-configured instance
      *  of the AWS.DynamoDB service object to use for requests. The object may
      *  bound parameters used by the document client.
      * @see AWS.DynamoDB.constructor
      *
      */
      constructor(options?: any);

      /**
      * Returns the attributes of one or more items from one or more tables
      * by delegating to `AWS.DynamoDB.batchGetItem()`.
      *
      * Supply the same parameters as {AWS.DynamoDB.batchGetItem} with
      * `AttributeValue`s substituted by native JavaScript types.
      *
      * @see AWS.DynamoDB.batchGetItem
      * @example Get items from multiple tables
      *  var params = {
      *    RequestItems: {
      *      'Table-1': {
      *        Keys: [
      *          {
      *             HashKey: 'haskey',
      *             NumberRangeKey: 1
      *          }
      *        ]
      *      },
      *      'Table-2': {
      *        Keys: [
      *          { foo: 'bar' },
      *        ]
      *      }
      *    }
      *  };
      *
      *  var docClient = new AWS.DynamoDB.DocumentClient();
      *
      *  docClient.batchGet(params, function(err, data) {
      *    if (err) console.log(err);
      *    else console.log(data);
      *  });
      *
      */
      batchGet(params: any, callback?: (err: any, data: any) => void): Request<any, any>;

      /**
      * Puts or deletes multiple items in one or more tables by delegating
      * to `AWS.DynamoDB.batchWriteItem()`.
      *
      * Supply the same parameters as {AWS.DynamoDB.batchWriteItem} with
      * `AttributeValue`s substituted by native JavaScript types.
      *
      * @see AWS.DynamoDB.batchWriteItem
      * @example Write to and delete from a table
      *  var params = {
      *    RequestItems: {
      *      'Table-1': [
      *        {
      *          DeleteRequest: {
      *            Key: { HashKey: 'someKey' }
      *          }
      *        },
      *        {
      *          PutRequest: {
      *            Item: {
      *              HashKey: 'anotherKey',
      *              NumAttribute: 1,
      *              BoolAttribute: true,
      *              ListAttribute: [1, 'two', false],
      *              MapAttribute: { foo: 'bar' }
      *            }
      *          }
      *        }
      *      ]
      *    }
      *  };
      *
      *  var docClient = new AWS.DynamoDB.DocumentClient();
      *
      *  docClient.batchWrite(params, function(err, data) {
      *    if (err) console.log(err);
      *    else console.log(data);
      *  });
      *
      */
      batchWrite(params: any, callback?: (err: any, data: any) => void): Request<any, any>;

      /**
      * Deletes a single item in a table by primary key by delegating to
      * `AWS.DynamoDB.deleteItem()`
      *
      * Supply the same parameters as {AWS.DynamoDB.deleteItem} with
      * `AttributeValue`s substituted by native JavaScript types.
      *
      * @see AWS.DynamoDB.deleteItem
      * @example Delete an item from a table
      *  var params = {
      *    TableName : 'Table',
      *    Key: {
      *      HashKey: 'hashkey',
      *      NumberRangeKey: 1
      *    }
      *  };
      *
      *  var docClient = new AWS.DynamoDB.DocumentClient();
      *
      *  docClient.delete(params, function(err, data) {
      *    if (err) console.log(err);
      *    else console.log(data);
      *  });
      *
      */
      delete(params: any, callback?: (err: any, data: any) => void): Request<any, any>;

      /**
      * Returns a set of attributes for the item with the given primary key
      * by delegating to `AWS.DynamoDB.getItem()`.
      *
      * Supply the same parameters as {AWS.DynamoDB.getItem} with
      * `AttributeValue`s substituted by native JavaScript types.
      *
      * @see AWS.DynamoDB.getItem
      * @example Get an item from a table
      *  var params = {
      *    TableName : 'Table',
      *    Key: {
      *      HashKey: 'hashkey'
      *    }
      *  };
      *
      *  var docClient = new AWS.DynamoDB.DocumentClient();
      *
      *  docClient.get(params, function(err, data) {
      *    if (err) console.log(err);
      *    else console.log(data);
      *  });
      *
      */
      get(params: any, callback?: (err: any, data: any) => void): Request<any, any>;

      /**
      * Creates a new item, or replaces an old item with a new item by
      * delegating to `AWS.DynamoDB.putItem()`.
      *
      * Supply the same parameters as {AWS.DynamoDB.putItem} with
      * `AttributeValue`s substituted by native JavaScript types.
      *
      * @see AWS.DynamoDB.putItem
      * @example Create a new item in a table
      *  var params = {
      *    TableName : 'Table',
      *    Item: {
      *       HashKey: 'haskey',
      *       NumAttribute: 1,
      *       BoolAttribute: true,
      *       ListAttribute: [1, 'two', false],
      *       MapAttribute: { foo: 'bar'},
      *       NullAttribute: null
      *    }
      *  };
      *
      *  var docClient = new AWS.DynamoDB.DocumentClient();
      *
      *  docClient.put(params, function(err, data) {
      *    if (err) console.log(err);
      *    else console.log(data);
      *  });
      *
      */
      put(params: any, callback?: (err: any, data: any) => void): Request<any, any>;

      /**
      * Edits an existing item's attributes, or adds a new item to the table if
      * it does not already exist by delegating to `AWS.DynamoDB.updateItem()`.
      *
      * Supply the same parameters as {AWS.DynamoDB.updateItem} with
      * `AttributeValue`s substituted by native JavaScript types.
      *
      * @see AWS.DynamoDB.updateItem
      * @example Update an item with expressions
      *  var params = {
      *    TableName: 'Table',
      *    Key: { HashKey : 'hashkey' },
      *    UpdateExpression: 'set #a = :x + :y',
      *    ConditionExpression: '#a < :MAX',
      *    ExpressionAttributeNames: {'#a' : 'Sum'},
      *    ExpressionAttributeValues: {
      *      ':x' : 20,
      *      ':y' : 45,
      *      ':MAX' : 100,
      *    }
      *  };
      *
      *  var docClient = new AWS.DynamoDB.DocumentClient();
      *
      *  docClient.update(params, function(err, data) {
      *     if (err) console.log(err);
      *     else console.log(data);
      *  });
      *
      */
      update(params: any, callback?: (err: any, data: any) => void): Request<any, any>;

      /**
      * Returns one or more items and item attributes by accessing every item
      * in a table or a secondary index.
      *
      * Supply the same parameters as {AWS.DynamoDB.scan} with
      * `AttributeValue`s substituted by native JavaScript types.
      *
      * @see AWS.DynamoDB.scan
      * @example Scan the table with a filter expression
      *  var params = {
      *    TableName : 'Table',
      *    FilterExpression : 'Year = :this_year',
      *    ExpressionAttributeValues : {':this_year' : 2015}
      *  };
      *
      *  var docClient = new AWS.DynamoDB.DocumentClient();
      *
      *  docClient.scan(params, function(err, data) {
      *     if (err) console.log(err);
      *     else console.log(data);
      *  });
      *
      */
      scan(params: any, callback?: (err: any, data: any) => void): Request<any, any>;

      /**
      * Directly access items from a table by primary key or a secondary index.
      *
      * Supply the same parameters as {AWS.DynamoDB.query} with
      * `AttributeValue`s substituted by native JavaScript types.
      *
      * @see AWS.DynamoDB.query
      * @example Query an index
      *  var params = {
      *    TableName: 'Table',
      *    IndexName: 'Index',
      *    KeyConditionExpression: 'HashKey = :hkey and RangeKey > :rkey',
      *    ExpressionAttributeValues: {
      *      ':hkey': 'key',
      *      ':rkey': 2015
      *    }
      *  };
      *
      *  var docClient = new AWS.DynamoDB.DocumentClient();
      *
      *  docClient.query(params, function(err, data) {
      *     if (err) console.log(err);
      *     else console.log(data);
      *  });
      *
      */
      query(params: any, callback?: (err: any, data: any) => void): Request<any, any>;

      /**
      * Creates a set of elements inferring the type of set from
      * the type of the first element. Amazon DynamoDB currently supports
      * the number sets, string sets, and binary sets. For more information
      * about DynamoDB data types see the documentation on the
      * [Amazon DynamoDB Data Model](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DataModel.html#DataModel.DataTypes).
      *
      * @param list [Array] Collection to represent your DynamoDB Set
      * @param options [map]
      *  * **validate** [Boolean] set to true if you want to validate the type
      *    of each element in the set. Defaults to `false`.
      * @example Creating a number set
      *  var docClient = new AWS.DynamoDB.DocumentClient();
      *
      *  var params = {
      *    Item: {
      *      hashkey: 'hashkey'
      *      numbers: docClient.createSet([1, 2, 3]);
      *    }
      *  };
      *
      *  docClient.put(params, function(err, data) {
      *    if (err) console.log(err);
      *    else console.log(data);
      *  });
      *
      */
      createSet(params: any, callback?: (err: any, data: any) => void): Request<any, any>;
    }
  }
}
