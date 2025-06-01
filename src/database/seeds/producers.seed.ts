import { DataSource } from 'typeorm';
import { Producer } from '../../producers/entities/producer.entity';
import { mocks } from '../mocks';

export const runProducerSeed = async (dataSource: DataSource) => {
    const repo = dataSource.getRepository(Producer);

    const count = await repo.count();
    if (count > 0) {
        console.log('Producer - Seed already executed, skipping...');
        return;
    }

    const result = await repo.save(mocks.producersMock);

    console.log(`Producer - Seed executed successfully! - ${result.length} results`,);
};
