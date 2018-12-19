import { LogInsightDatasource } from '../datasource';

import * as dateMath from 'app/core/utils/datemath';

describe('LogInsightDataSource', function(this: any) {
  const backendSrv = {
    datasourceRequest: jest.fn(),
  };

  const $rootScope = {
    $on: jest.fn(),
    appEvent: jest.fn(),
  };

  const templateSrv = {
    replace: jest.fn(text => text),
    getAdhocFilters: jest.fn(() => []),
  };

  const timeSrv = {
    time: { from: 'now-1h', to: 'now' },
    timeRange: jest.fn(() => {
      return {
        from: dateMath.parse(this.time.from, false),
        to: dateMath.parse(this.time.to, true),
      };
    }),
    setTime: jest.fn(time => {
      this.time = time;
    }),
  };

  const ctx = {
    $rootScope,
    backendSrv,
  } as any;

  function createDatasource(instanceSettings) {
    instanceSettings.jsonData = instanceSettings.jsonData || {};

    ctx.ds = new LogInsightDatasource(instanceSettings, {}, backendSrv, templateSrv, timeSrv);
  }

  describe('When testing datasource with api', () => {
    beforeEach(() => {
      createDatasource({
        logInsightHost: 'https://loginsight.example.com',
        logInsightUsername: 'username',
      });
    });

    it('Should construct properly', () => {
      expect(ctx.ds).toBeDefined();
    });
  });
});
