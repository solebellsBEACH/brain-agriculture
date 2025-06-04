import { DataSource } from 'typeorm';
import { AppDataSource } from './data-source';
import { runPropertySeed } from './seeds/property.seed';
import { runProducerSeed } from './seeds/producers.seed';
import { runCropSeed } from './seeds/crops.seed';

AppDataSource.initialize()
  .then(async (dataSource: DataSource) => {
    await dataSource.synchronize(true);

    await runProducerSeed(dataSource);
    await runPropertySeed(dataSource);
    await runCropSeed(dataSource);

    await dataSource.destroy();
  })
  .catch((err) => {
    console.error('Seed failed', err);
  });
