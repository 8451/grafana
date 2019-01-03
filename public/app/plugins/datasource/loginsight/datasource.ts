import angular from 'angular';
// import { Event } from './models';

export class LogInsightDatasource {
  host: string;
  username: string;
  url: string;

  /** @ngInject */
  constructor(instanceSettings, private $q, private backendSrv, private templateSrv, private timeSrv) {
    this.host = instanceSettings.jsonData.logInsightHost;
    this.username = instanceSettings.jsonData.logInsightUsername;
    instanceSettings.jsonData.authenticationType = 'session';
    this.url = instanceSettings.url;

    console.log(instanceSettings);
  }

  private request(method, url, data?) {
    const options: any = {
      url: url,
      method: method,
      data: data,
    };

    return this.backendSrv.datasourceRequest(options);
  }

  private get(url: string) {
    return this.request('GET', url).then(results => {
      results.data.$$config = results.config;
      return results.data;
    });
  }

  getQ(): any {
    return this.$q;
  }

  getTemplateSrv(): any {
    return this.templateSrv;
  }

  getTimeSrv(): any {
    return this.timeSrv;
  }

  query(options) {
    console.log(options);
    return this.get(this.url + '/loginsight/api/v1/events').then(
      response => {
        if (response.complete) {
          // const events: Event[] = response.events;
          const data = [];
          return { "target": "events", "data": data};
        } else {
          return { "target": "events", "data": [] };
        }
      },
      err => {
        console.log(err);
        if (err.data && err.data.error) {
          let message = angular.toJson(err.data.error);
          if (err.data.error.reason) {
            message = err.data.error.reason;
          }
          return { status: 'error', message: message };
        } else {
          return { status: 'error', message: err.status };
        }
      }
    );
  }

  static annotationQuery(options) {
    console.log(options);
    throw new Error('Annotation Support not implemented yet.');
  }

  static metricFindQuery(query: string) {
    console.log(query);
    throw new Error('Template Variable Support not implemented yet.');
  }

  testDatasource() {
    return this.get(this.url + '/loginsight/api/v1/sessions/current').then(
      () => {
        return { status: 'success', message: 'Successfully retrieve current session' };
      },
      err => {
        console.log(err);
        if (err.data && err.data.error) {
          let message = angular.toJson(err.data.error);
          if (err.data.error.reason) {
            message = err.data.error.reason;
          }
          return { status: 'error', message: message };
        } else {
          return { status: 'error', message: err.status };
        }
      }
    );
  }
}
