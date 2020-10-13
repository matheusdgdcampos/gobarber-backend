// import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUserRepository);
  });

  it('should be able to show profile', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      name: 'Jhon Trê',
      email: 'jhontre@example.com',
      password: '123456',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'Jhon Qua',
      email: 'jhonqua@example.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
