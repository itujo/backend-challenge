import { type Resend, type ErrorResponse } from 'resend';
import { ApplicationError } from '../../shared/errors';

export interface CreateEmailResponseSuccess {
  id: string;
}

export interface CreateEmailResponse {
  data: CreateEmailResponseSuccess | null;
  error: ErrorResponse | null;
}

export class EmailService {
  constructor(private readonly resend: Resend) {}

  async sendDepositEmail(
    email: string,
    amount: number,
  ): Promise<CreateEmailResponse> {
    console.log(`sending email to ${email} with amount ${amount}`);

    const emailResponse = await this.resend.emails.send({
      from: 'info@itujo.tech',
      to: email,
      subject: 'Deposit notification',
      html: `<p>You have deposited <strong>R${amount}</strong> to your account!</p>`,
    });

    if (emailResponse.error) {
      throw new ApplicationError(emailResponse.error.message, 400);
    }

    return emailResponse;
  }
}
