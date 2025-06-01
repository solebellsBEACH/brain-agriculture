import { DataSource } from 'typeorm';
import { AppDataSource } from './data-source';
import { runPropertySeed } from './seeds/property.seed';
import { runProducerSeed } from './seeds/producers.seed';

AppDataSource.initialize()
    .then(async (dataSource: DataSource) => {
        // await runPropertySeed(dataSource);
        // await runProducerSeed(dataSource);
        await dataSource.destroy();
    })
    .catch((err) => {
        console.error('Seed failed', err);
    });
