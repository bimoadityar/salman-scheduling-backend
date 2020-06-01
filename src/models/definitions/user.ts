import { Model } from 'objection';
import { compare, hashSync } from 'bcrypt';

import config from '../../config';
import Division from './division';

class User extends Model {
  id: number;
  email: string;
  name: string;
  password: string;
  role: string;
  phone: string;
  avatar: string;
  divisionId: number;

  async matchPassword(password: string): Promise<boolean> {
    return await compare(password, this.password);
  }

  static get tableName(): string {
    return 'user';
  }

  static get jsonSchema(): Record<string, unknown> {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer', minimum: 1 },
        email: { type: 'email' },
        name: {
          type: 'string',
          minLength: 1,
          maxLength: 60,
          pattern: '^[ -~]+$',
        },
        password: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
          pattern: '^[ -~]+$',
        },
        role: {
          enum: ['admin', 'manager', 'guest'],
        },
        phone: {
          type: 'string',
          minLength: 1,
          maxLength: 15,
          pattern: '^[\\d ()+-]+$',
        },
        avatar: {
          type: 'string',
          pattern: '^[ -~]+$',
        },
        divisionId: { type: 'integer', minimum: 1 },
      },
      required: ['email', 'name', 'password', 'role'],
    };
  }

  $parseJson(
    json: Record<string, unknown>,
    opt: Record<string, unknown>,
  ): Record<string, unknown> {
    json = super.$parseJson(json, opt);
    if (json.password && typeof json.password === 'string') {
      json.password = hashSync(json.password, config.password.saltRounds);
    }
    return json;
  }

  static relationMappings = {
    division: {
      relation: Model.BelongsToOneRelation,
      modelClass: Division,
      join: {
        from: 'user.divisionId',
        to: 'division.id',
      },
    },
  };
}

export default User;
