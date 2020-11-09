// import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProvidersAppointmentsService from './ListProviderAppointsmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointment: ListProvidersAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointment = new ListProvidersAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 10, 9, 8, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 10, 9, 9, 0, 0),
    });

    const appointments = await listProviderAppointment.execute({
      provider_id: 'provider',
      year: 2020,
      day: 9,
      month: 11,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
