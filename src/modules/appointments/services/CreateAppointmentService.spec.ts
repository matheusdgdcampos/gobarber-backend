import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '123123123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123123');
  });

  it('should not be able to create two appointment on the same date', async () => {
    const appointmentDate = new Date(2020, 8, 20, 12);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '123123123123',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '123123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});