import { Test, TestingModule } from '@nestjs/testing';
import { ProducersController } from '../producers.controller';
import { ProducersService } from '../producers.service';
import { CreateProducerDto } from '../dto/create-producer.dto';
import { UpdateProducerDto } from '../dto/update-producer.dto';


describe('ProducersController', () => {
    let controller: ProducersController;
    let service: ProducersService;

    const mockService = {
        create: jest.fn(dto => ({ id: 'uuid', ...dto })),
        findAll: jest.fn(() => ['producer1', 'producer2']),
        findOne: jest.fn(id => ({ id, name: 'Test', document: '12345678900' })),
        update: jest.fn((id, dto) => ({ id, ...dto })),
        remove: jest.fn(id => ({ deleted: true, id })),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProducersController],
            providers: [
                { provide: ProducersService, useValue: mockService },
            ],
        }).compile();

        controller = module.get<ProducersController>(ProducersController);
        service = module.get<ProducersService>(ProducersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create a producer', async () => {
        const dto: CreateProducerDto = { name: 'Lucas', document: '12345678900' };
        expect(await controller.create(dto)).toEqual({ id: 'uuid', ...dto });
        expect(mockService.create).toHaveBeenCalledWith(dto);
    });

    it('should return all producers', async () => {
        expect(await controller.findAll()).toEqual(['producer1', 'producer2']);
    });

    it('should return one producer by id', async () => {
        expect(await controller.findOne('uuid')).toEqual({
            id: 'uuid',
            name: 'Test',
            document: '12345678900',
        });
    });

    it('should update a producer', async () => {
        const dto: UpdateProducerDto = { name: 'Updated', document: '99999999999' };
        expect(await controller.update('uuid', dto)).toEqual({ id: 'uuid', ...dto });
    });

    it('should delete a producer', async () => {
        expect(await controller.remove('uuid')).toEqual({ deleted: true, id: 'uuid' });
    });
});
