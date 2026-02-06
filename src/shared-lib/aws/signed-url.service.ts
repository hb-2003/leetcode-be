import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';

import { config } from '../../config/config';

@Injectable()
export class SignedUrlService {
  private s3Client: S3Client;

  constructor() {
    if (!config.aws.accessKeyId || !config.aws.secretAccessKey) {
      throw new Error('AWS credentials not configured');
    }

    this.s3Client = new S3Client({
      region: config.aws.region,
      credentials: {
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey,
      },
    });
  }

  /**
   * Get key and signed URL for image upload
   */
  async getUploadUrl(
    imageName: string,
    userId?: string,
  ): Promise<{ key: string; signedUrl: string }> {
    // Generate unique key
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = imageName.split('.').pop() || 'jpg';
    const baseName = imageName.split('.')[0].replace(/[^a-zA-Z0-9]/g, '_');

    const prefix = userId ? `users/${userId}/images` : 'images';
    const key = `${prefix}/${baseName}_${timestamp}_${randomString}.${extension}`;

    // Generate signed URL
    const command = new PutObjectCommand({
      Bucket: config.aws.s3.bucketName,
      Key: key,
      ContentType: this.getContentType(extension),
    });

    const signedUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: Number(config.aws.s3.signedUrlExpiration),
    });

    return { key, signedUrl };
  }

  /**
   * Get content type from file extension
   */
  private getContentType(extension: string): string {
    const typeMap: { [key: string]: string } = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
      svg: 'image/svg+xml',
    };
    return typeMap[extension.toLowerCase()] || 'image/jpeg';
  }
}
