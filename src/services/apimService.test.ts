import Serverless from 'serverless';
import { MockFactory } from '../test/mockFactory';
import { ApiManagementConfig } from '../models/apiManagement';
import { ApimService } from './apimService';
import { interpolateJson } from '../test/utils';
import axios from 'axios';

// tslint:disable-next-line:no-var-requires
const apimGetService404 = require('../test/responses/apim-get-service-404.json');
// tslint:disable-next-line:no-var-requires
const apimGetService200 = require('../test/responses/apim-get-service-200.json');
// tslint:disable-next-line:no-var-requires
const apimGetApi200 = require('../test/responses/apim-get-api-200.json');
// tslint:disable-next-line:no-var-requires
const apimGetApi404 = require('../test/responses/apim-get-api-404.json');

describe('APIM Service', () => {
  const apimConfig: ApiManagementConfig = {
    name: 'test-apim-resource',
    api: {
      name: 'test-apim-api1',
      subscriptionRequired: false,
      displayName: 'API 1',
      description: 'description of api 1',
      protocols: ['https'],
      path: 'test-api1',
    },
  };

  let serverless: Serverless;

  beforeEach(() => {
    serverless = MockFactory.createTestServerless();
    serverless.service.provider = {
      ...serverless.service.provider,
      name: 'azure',
    };

    serverless.service['service'] = 'test-sls';
    serverless.service.provider['resourceGroup'] = 'test-sls-rg';
    serverless.service.provider['location'] = 'West US';
    serverless.service.provider['apim'] = apimConfig;

    serverless.variables = {
      ...serverless.variables,
      azureCredentials: MockFactory.createTestAzureCredentials(),
      subscriptionId: 'ABC123',
    };
  });

  it('is defined', () => {
    expect(ApimService).toBeDefined();
  });

  it('can be instantiated', () => {
    const service = new ApimService(serverless);
    expect(service).not.toBeNull();
  });

  describe('Get service reference', () => {
    it('returns null when service doesn\'t exist', async () => {
      axios.request = jest.fn((requestConfig) => MockFactory.createTestAxiosResponse(requestConfig, apimGetService404, 404));

      const service = new ApimService(serverless);
      const resource = await service.get();

      expect(resource).toBeNull();
    });

    it('returns instance of service resource', async () => {
      const expectedResponse = interpolateJson(apimGetService200, {
        resourceGroup: {
          name: serverless.service.provider['resourceGroup'],
          location: serverless.service.provider['location'],
        },
        resource: {
          name: apimConfig.name,
        },
      });

      axios.request = jest.fn((requestConfig) => MockFactory.createTestAxiosResponse(requestConfig, expectedResponse));

      const service = new ApimService(serverless);
      const resource = await service.get();

      expect(resource).not.toBeNull();
      expect(resource).toMatchObject({
        name: apimConfig.name,
        location: serverless.service.provider['location'],
      });
    });
  });

  describe('Get API reference', () => {
    it('returns null when API doesn\'t exist', async () => {
      axios.request = jest.fn((requestConfig) => MockFactory.createTestAxiosResponse(requestConfig, apimGetApi404, 404));

      const service = new ApimService(serverless);
      const api = await service.getApi();
      expect(api).toBeNull();
    });

    it('returns the API reference', async () => {
      const expectedResponse = interpolateJson(apimGetApi200, {
        resourceGroup: {
          name: serverless.service.provider['resourceGroup'],
          location: serverless.service.provider['location'],
        },
        service: {
          name: apimConfig.name,
        },
        resource: {
          name: apimConfig.api.name,
          displayName: apimConfig.api.displayName,
          description: apimConfig.api.description,
          path: apimConfig.api.path,
        },
      });

      axios.request = jest.fn((requestConfig) => MockFactory.createTestAxiosResponse(requestConfig, expectedResponse));

      const service = new ApimService(serverless);
      const api = await service.getApi();

      expect(api).not.toBeNull();
      expect(api).toMatchObject({
        displayName: apimConfig.api.displayName,
        description: apimConfig.api.description,
        path: apimConfig.api.path,
      });
    });
  });

  describe('Deploying API', () => {
    it('ensures API, backend and keys have all been set', () => {
      fail();
    });
  });

  describe('Deploying Functions', () => {
    it('ensures all serverless functions have been deployed into specified API', () => {
      fail();
    });
  });
});