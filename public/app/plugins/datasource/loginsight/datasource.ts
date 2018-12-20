import angular from 'angular';

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

  // private post(url: string, data: any) {
  //   return this.request('POST', url, data)
  //     .then(results => {
  //       results.data.$$config = results.config;
  //       return results.data;
  //     })
  //     .catch(err => {
  //       if (err.data && err.data.error) {
  //         throw {
  //           message: 'Log Insight error: ' + err.data.error.reason,
  //           error: err.data.error,
  //         };
  //       }

  //       throw err;
  //     });
  // }

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
    throw new Error('Query Support not implemented yet.');
  }

  annotationQuery(options) {
    throw new Error('Annotation Support not implemented yet.');
  }

  metricFindQuery(query: string) {
    throw new Error('Template Variable Support not implemented yet.');
  }

  testDatasource() {
    // return this.$q.when({
    //   status: 'error',
    //   message: 'Data Source is just a template and has not been implemented yet.',
    //   title: 'Error'
    // });

    return this.get(this.url + '/loginsight/api/v1/sessions/current').then(
      response => {
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
