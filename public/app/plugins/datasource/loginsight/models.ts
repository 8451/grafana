
class Field {
  name: string;
  content: string;
}

class Event {
  text: string;
  timestamp: number;
  fields: Field[];
}

export {
  Event as Event,
  Field as Field
};
