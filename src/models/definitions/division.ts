import { Model } from 'objection';

class Division extends Model {
  id: number;
  name: string;

  static get tableName(): string {
    return 'division';
  }

  static get jsonSchema(): Record<string, unknown> {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer', minimum: 0 },
        name: { type: 'string', minLength: 1, maxLength: 60 },
      },
      required: ['name'],
    };
  }
}

export default Division;
