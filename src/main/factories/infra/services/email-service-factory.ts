import { Resend } from 'resend';
import { EmailService } from '../../../../infra/services/email-service';
import env from '../../../config/environments/application';

export function createEmailService(): EmailService {
  const resend = new Resend(env.resendApiKey);
  return new EmailService(resend);
}
