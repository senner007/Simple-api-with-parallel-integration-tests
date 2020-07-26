import { dbManager } from '../knex-manager';

export async function TEST_SEEDS(thread: number) {
  // TODO : could require all and run sequentially
  const knexInstance = dbManager(thread).knexInstance();

  await require('../src/seeds/development/01.roles').seed(knexInstance);
  await require('../src/seeds/development/02.users').seed(knexInstance);
  await require('../src/seeds/development/03.user-roles').seed(knexInstance);
  await require('../src/seeds/development/04.lists').seed(knexInstance);
  await require('../src/seeds/development/05.items').seed(knexInstance);
  await require('../src/seeds/development/06.list-items').seed(knexInstance);
  knexInstance.destroy();
}
