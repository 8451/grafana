import { LogInsightQueryCtrl } from './query_ctrl';
import { LogInsightConfigCtrl } from './config_ctrl';
import { LogInsightDatasource } from './datasource';

class LogInsightAnnotationsQueryCtrl {
  static templateUrl = 'partials/annotations.editor.html';
}

export {
  LogInsightDatasource as Datasource,
  LogInsightQueryCtrl as QueryCtrl,
  LogInsightConfigCtrl as ConfigCtrl,
  LogInsightAnnotationsQueryCtrl as AnnotationsQueryCtrl,
};
