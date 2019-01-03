import {Moment} from "moment";

class Field {
  name: string;
  content: string;
}

class Event {
  text: string;
  timestamp: number;
  fields: Field[];
}

class Target {
  refId: string;
  target: string;
}

class RangeRaw {
  from: string;
  to: string;
}

class Range {
  from: Moment;
  to: Moment;
  raw: RangeRaw;
}

class Options {
  cacheTimeout: number;
  dashboardId: number;
  interval: string;
  intervalMs: number;
  maxDataPoints: number;
  panelId: number;
  range: Range;
  rangeRaw: RangeRaw;
  targets: Target[];
  timezone: string;
}

export {
  Event as Event,
  Field as Field,
  Target as Target,
  RangeRaw as RangeRaw,
  Range as Range,
  Options as Options
};
