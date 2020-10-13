import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUserRepository);
  });

  it('should be able to show profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Jhon Doe');
    expect(profile.email).toBe('jhondoe@example.com');
  });

  it('should not be able show profilefrom non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing user id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
