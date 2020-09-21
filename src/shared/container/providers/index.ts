import { container } from 'tsyringe';

import IStorageProvider from './Storageprovider/models/IStorageProvider';
import DiskStorageProvider from './Storageprovider/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
