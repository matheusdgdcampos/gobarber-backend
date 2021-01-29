import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import User from '../../users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers_list:${user_id}`,
    );

    if (!users) {
      users = await this.userRepository.findAllProviders({
        exception_user_id: user_id,
      });

      console.log('a query no banco foi realizada');

      await this.cacheProvider.save(`providers_list:${user_id}`, users);
    }

    return users;
  }
}

export default ListProvidersService;
