import { DataSource } from 'typeorm';
import { mocks } from '../mocks';
import { Crop } from '../../crop/entities/crop.entity';

export const runCropSeed = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository(Crop);

  const count = await repo.count();
  if (count > 0) {
    console.log('Crop - Seed already executed, skipping...');
    return;
  }

  const result = await repo.save(mocks.cropsMock);

  console.log(
    `Crop - Seed executed successfully! - ${result.length} results`,
  );
};
