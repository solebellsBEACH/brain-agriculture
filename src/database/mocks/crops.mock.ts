import { propertyMocks } from './property.mock';
import { Crop } from '../../crop/entities/crop.entity';

const findPropertyByName = (name: string) => propertyMocks.find(p => p.name === name)!;

export const cropsMock: Crop[] = [
    {
        id: '4f1a33f1-f4d9-40eb-8408-7c7627772f49',
        name: 'Milho',
        harvest_year: 2023,
        property: findPropertyByName("Fazenda São João"),
    },
    {
        id: '974a5cc7-4996-4596-879b-05c88dc42d0a',
        name: 'Soja',
        harvest_year: 2022,
        property: findPropertyByName("Sítio Boa Vista"),
    },
];
