import { Injectable, Logger } from '@nestjs/common';
import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@config/environments-config';

type TUploadFileResult = {
  success: boolean;
  filename: string;
  originalFileName: string;
  fileUrl?: string;
};

@Injectable()
export class CloudStorageFileService {
  protected readonly logger = new Logger(CloudStorageFileService.name);

  constructor(
    protected readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  private getClient(): S3Client {
    const endpoint =
      this.configService.getOrThrow('NODE_ENV') === 'development';
    return new S3Client({
      region: this.configService.getOrThrow('AWS_DEFAULT_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.getOrThrow('AWS_SECRET_KEY'),
      },
      endpoint: endpoint
        ? 'http://s3.localhost.localstack.cloud:4566'
        : undefined,
      forcePathStyle: true,
    });
  }

  private buildFileUrl(filename: string): string {
    const isInDev = this.configService.get('NODE_ENV') === 'development';
    const bucketName = this.configService.getOrThrow('AWS_S3_BUCKET_NAME');
    const region = this.configService.getOrThrow('AWS_DEFAULT_REGION');

    if (isInDev) {
      return `http://${bucketName}.s3.localhost.localstack.cloud:4566/${filename}`;
    }

    return `https://${bucketName}.s3.${region}.amazonaws.com/${filename}`;
  }

  public async upload(file: Express.Multer.File): Promise<TUploadFileResult> {
    const client = this.getClient();
    const filename = `${Date.now()}-${file.originalname}`;
    const uploadParams: PutObjectCommandInput = {
      Bucket: this.configService.getOrThrow('AWS_S3_BUCKET_NAME'),
      Key: filename,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
    };

    try {
      await client.send(new PutObjectCommand(uploadParams));
      return {
        filename,
        originalFileName: file.originalname,
        success: true,
        fileUrl: this.buildFileUrl(filename),
      };
    } catch (error) {
      this.logger.error(`Error uploading file: ${error}`);
      return {
        filename,
        originalFileName: file.originalname,
        success: false,
      };
    }
  }
}
