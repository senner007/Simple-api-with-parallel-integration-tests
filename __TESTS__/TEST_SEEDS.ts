import { dbManager } from '../knex-manager';

export async function TEST_SEEDS(thread: number) {
  // TODO : could require all and run sequentially
  await require('../src/seeds/development/01.roles').seed(
    dbManager(thread).knexInstance(),
  );
  await require('../src/seeds/development/02.users').seed(
    dbManager(thread).knexInstance(),
  );
  await require('../src/seeds/development/03.user-roles').seed(
    dbManager(thread).knexInstance(),
  );
  await require('../src/seeds/development/04.lists').seed(
    dbManager(thread).knexInstance(),
  );
  await require('../src/seeds/development/05.items').seed(
    dbManager(thread).knexInstance(),
  );
  await require('../src/seeds/development/06.list-items').seed(
    dbManager(thread).knexInstance(),
  );
}
