import _ from 'lodash';
import { QueryCtrl } from 'app/plugins/sdk';

export class LogInsightQueryCtrl extends QueryCtrl {
  static templateUrl = 'partials/query.editor.html';

  // tslint:disable-next-line:jsdoc-format
  /** @ngInject **/
  constructor($scope, $injector) {
    super($scope, $injector);
  }
}
