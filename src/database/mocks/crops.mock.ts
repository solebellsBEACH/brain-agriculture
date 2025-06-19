import { propertyMocks } from './property.mock';
import { Crop } from '../../crop/entities/crop.entity';

const findPropertyByName = (name: string) =>
  propertyMocks.findAll().data.find((p) => p.name === name)!;

const cropData: Crop[] = [
  {
    id: '4f1a33f1-f4d9-40eb-8408-7c7627772f49',
    name: 'Milho',
    harvest_year: 2023,
    value_per_unit: 80.5,
    utilization_percentage: 90.2,
    expected_yield: 3.5,
    value_growth: 10.354,
    property: findPropertyByName('Fazenda São João'),
  },
  {
    id: '974a5cc7-4996-4596-879b-05c88dc42d0a',
    name: 'Soja',
    harvest_year: 2022,
    value_per_unit: 110.75,
    utilization_percentage: 85.6,
    expected_yield: 2.9,
    value_growth: -2.354,
    property: findPropertyByName('Sítio Boa Vista'),
  },
  {
    id: 'c2e1a587-d34e-4906-85dc-90f62a9d3f99',
    name: 'Algodão',
    harvest_year: 2024,
    value_per_unit: 95.3,
    utilization_percentage: 78.4,
    expected_yield: 2.4,
    value_growth: 10.354,
    property: findPropertyByName('Chácara Esperança'),
  },
  {
    id: 'bbd7cfab-35e2-45e1-a6a7-7f3c781bf9da',
    name: 'Feijão',
    harvest_year: 2023,
    value_per_unit: 60.2,
    utilization_percentage: 92.1,
    expected_yield: 1.8,
    value_growth: 10.354,
    property: findPropertyByName('Fazenda Santa Clara'),
  },
  {
    id: 'd72b6cfb-87aa-4e36-8d7c-6bd2a09871b7',
    name: 'Cana-de-açúcar',
    harvest_year: 2024,
    value_per_unit: 45.0,
    utilization_percentage: 88.0,
    expected_yield: 4.1,
    value_growth: 10.354,
    property: findPropertyByName('Sítio Recanto Verde'),
  },
  {
    id: '53cf1ebf-1ad1-4aa0-9837-e222d1b129c2',
    name: 'Café',
    harvest_year: 2022,
    value_per_unit: 150.0,
    utilization_percentage: 70.0,
    expected_yield: 1.3,
    value_growth: 10.354,
    property: findPropertyByName('Fazenda Morro Alto'),
  },
  {
    id: 'ed034f9f-fc8d-4e17-a14a-cf65cbfe1439',
    name: 'Trigo',
    harvest_year: 2023,
    value_per_unit: 72.9,
    utilization_percentage: 80.5,
    expected_yield: 2.7,
    value_growth: 10.354,
    property: findPropertyByName('Estância Bela Vista'),
  },
  {
    id: '99c3c3f5-b4e2-41be-8435-9ef6d255d5fb',
    name: 'Arroz',
    harvest_year: 2022,
    value_per_unit: 55.4,
    utilization_percentage: 86.3,
    expected_yield: 3.1,
    value_growth: 10.354,
    property: findPropertyByName('Sítio Vale Encantado'),
  },
  {
    id: 'd72e5c5a-4c34-4ff5-96ae-8b4e8a87d7b5',
    name: 'Girassol',
    harvest_year: 2024,
    value_per_unit: 97.0,
    utilization_percentage: 75.0,
    expected_yield: 2.2,
    value_growth: 10.354,
    property: findPropertyByName('Fazenda Água Limpa'),
  },
];

export const cropsMock = {
  data:cropData,
  findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const data = cropData.slice(skip, skip + limit);
    const total = cropData.length;

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  },
};
