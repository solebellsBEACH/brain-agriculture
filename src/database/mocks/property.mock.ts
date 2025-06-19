import { faker } from '@faker-js/faker';
import { Property } from '../../properties/entities/property.entity';
import { producersMock } from './producers.mock';

const states = ['SP', 'MG', 'PR', 'RS', 'SC', 'BA', 'MS', 'MT', 'GO'];
const cities = [
  'São Paulo',
  'Belo Horizonte',
  'Curitiba',
  'Porto Alegre',
  'Florianópolis',
  'Salvador',
  'Campo Grande',
  'Cuiabá',
  'Goiânia',
  'Ribeirão Preto',
  'Uberlândia',
  'Londrina',
  'Juiz de Fora',
  'São José do Rio Preto',
  'Pelotas',
  'Joinville',
  'Barreiras',
];

function getRandomProducer() {
  return (
    producersMock[Math.floor(Math.random() * producersMock.length)] || null
  );
}

function generateProperty(index: number): Property {
  const producer = getRandomProducer();
  return {
    id: faker.string.uuid(),
    name: `${faker.company.name()} Farm #${index + 1}`,
    city: cities[Math.floor(Math.random() * cities.length)],
    state: states[Math.floor(Math.random() * states.length)],
    total_area: faker.number.int({ min: 20, max: 200 }),
    arable_area: faker.number.int({ min: 10, max: 150 }),
    vegetation_area: faker.number.int({ min: 5, max: 50 }),
    has_irrigation: faker.datatype.boolean(),
    machinery_count: faker.number.int({ min: 0, max: 10 }),
    crops: [],
    producer,
  };
}

const propertyData: Property[] = Array.from({ length: 50 }, (_, i) =>
  generateProperty(i),
);

export const propertyMocks = {
  data: propertyData,
  findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const data = propertyData.slice(skip, skip + limit);
    const total = propertyData.length;

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  },
};
