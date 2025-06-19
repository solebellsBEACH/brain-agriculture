import { DataSource } from 'typeorm';
import { Property } from '../../properties/entities/property.entity';
import { mocks } from '../mocks';

export const runPropertySeed = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository(Property);

  const count = await repo.count();
  if (count > 0) {
    console.log('Property - Seed already executed, skipping...');
    return;
  }

  const result = await repo.save(mocks.propertyMocks.data);

  console.log(
    `Property - Seed executed successfully! - ${result.length} results`,
  );
};
