import { Injectable } from '@nestjs/common';

export interface TemplateData {
  [key: string]: string | number | boolean;
}

@Injectable()
export class EmailTemplatesService {
  /**
   * Base HTML template with header and footer
   */
  public getBaseTemplate(content: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Our Platform</h1>
          </div>
          <div class="content">
            ${content}
          </div>
          <div class="footer">
            <p>This email was sent from Our Platform</p>
            <p>
              <a href="#">Unsubscribe</a> | 
              <a href="#">Privacy Policy</a> | 
              <a href="#">Contact Support</a>
            </p>
            <p>&copy; 2024 Our Platform. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Welcome email template
   */
  getWelcomeEmailTemplate(): string {
    const content = `
      <h1>Welcome to Our Platform!</h1>
      <p>Thank you for joining us.</p>
    `;

    return this.getBaseTemplate(content);
  }
}
