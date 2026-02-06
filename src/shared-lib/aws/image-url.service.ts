import { Injectable } from '@nestjs/common';

import { config } from '../../config/config';

@Injectable()
export class ImageUrlService {
  /**
   * Get AWS S3 URL from key
   */
  private getImageUrl(key: string): string {
    return `${config.aws.s3.cloudfrontUrl}/${key}`;
    // return `https://${config.aws.s3.bucketName}.s3.${config.aws.s3.bucketRegion}.amazonaws.com/${key}`;
  }

  /**
   * Get public URL for image
   */
  getPublicUrl(key: string): string {
    return this.getImageUrl(key);
  }
}
