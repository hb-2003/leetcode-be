import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import defaultLogger from 'src/utils/default-logger';

import { config } from '../../config/config';

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

@Injectable()
export class MailSendService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.initializeTransporter();
  }

  /**
   * Initialize email transporter
   */
  private initializeTransporter() {
    this.transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.secure,
      auth: {
        user: config.email.auth.user,
        pass: config.email.auth.pass,
      },
    } as nodemailer.TransportOptions);
  }

  /**
   * Send email with HTML content
   */
  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const { to, subject, html, text } = options;

      const mailOptions = {
        from: config.email.from,
        to: Array.isArray(to) ? to.join(',') : to,
        subject,
        html,
        text,
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error: unknown) {
      let errorMessage = 'Unknown error';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      defaultLogger.error(`Error From MailSendService: ${errorMessage}`);
      return false;
    }
  }
}
