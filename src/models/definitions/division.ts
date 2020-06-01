import { Model } from 'objection';

import User from './user';
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
        id: { type: 'integer', minimum: 1 },
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

  static relationMappings = {
    user: {
      relation: Model.HasManyRelation,
      modelClass: User,
      join: {
        from: 'division.id',
        to: 'user.divisionId',
      },
    },
  };
}

export default Division;
