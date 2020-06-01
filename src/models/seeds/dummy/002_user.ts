import Knex from 'knex';
import { Model } from 'objection';

import User from '../../definitions/user';

const seed = async (knex: Knex): Promise<void> => {
  Model.knex(knex);
  await User.query().delete();

  const userArray = [
    {
      id: 1,
      email: 'admin1@gmail.com',
      name: 'App Admin 1',
      password: 'passwordadmin1',
      role: 'admin',
      divisionId: undefined,
    },
    {
      id: 2,
      email: 'admin2@gmail.com',
      name: 'App Admin 2',
      password: 'passwordadmin2',
      role: 'admin',
      divisionId: undefined,
    },
  ];
  let id = 3;
  ['App', 'IE', 'IST', 'EE', 'BE', 'EPE', 'TE'].forEach((division, i) => {
    userArray.push({
      id,
      email: `manager${division}1@gmail.com`,
      name: `${division} Manager 1`,
      password: `passwordmanager${division}1`,
      role: 'manager',
      divisionId: i ? i : undefined,
    });
    userArray.push({
      id: id + 1,
      email: `manager${division}2@gmail.com`,
      name: `${division} Manager 2`,
      password: `passwordmanager${division}2`,
      role: 'manager',
      divisionId: i ? i : undefined,
    });
    id += 2;
  });
  userArray.push({
    id,
    email: 'guest1@gmail.com',
    name: 'Guest 1',
    password: 'passwordguest1',
    role: 'guest',
    divisionId: undefined,
  });
  userArray.push({
    id: id + 1,
    email: 'guest2@gmail.com',
    name: 'Guest 2',
    password: 'passwordguest2',
    role: 'guest',
    divisionId: undefined,
  });
  await User.query().insert(userArray);
};

export { seed };
