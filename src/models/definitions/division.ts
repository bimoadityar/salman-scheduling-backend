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
        name: {
          type: 'string',
          minLength: 1,
          maxLength: 60,
          pattern: '^[ -~]+$',
        },
      },
      required: ['name'],
    };
  }

  $formatDatabaseJson(json: Record<string, unknown>): Record<string, unknown> {
    json = super.$formatDatabaseJson(json);
    delete json.id;
    return json;
  }
}

export default Division;
