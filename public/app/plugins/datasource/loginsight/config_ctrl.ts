export class LogInsightConfigCtrl {
  static templateUrl = 'public/app/plugins/datasource/loginsight/partials/config.html';
  current: any;

  /** @ngInject */
  constructor($scope) {
    this.current.jsonData.authenticationType = 'session';
  }
}
