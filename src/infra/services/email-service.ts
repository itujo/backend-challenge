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
    return await this.sendEmail(
      email,
      'Deposit notification',
      `<p>You have deposited <strong>R$${amount.toFixed(
        2,
      )}</strong> to your account!</p>`,
    );
  }

  async sendBitcoinPurchaseEmail(
    email: string,
    amountInBRL: number,
    amountInBTC: number,
  ): Promise<CreateEmailResponse> {
    return await this.sendEmail(
      email,
      'Purchase notification',
      `<p>You have purchased <strong>${amountInBTC.toFixed(
        8,
      )}BTC</strong> for <strong>R$${amountInBRL}</strong></p>`,
    );
  }

  async sendBitcoinSaleEmail(
    email: string,
    amountInBRL: number,
    amountInBTC: number,
  ): Promise<CreateEmailResponse> {
    return await this.sendEmail(
      email,
      'Sale notification',
      `<p>You have sold <strong>${amountInBTC.toFixed(
        8,
      )}BTC</strong> for <strong>R$${amountInBRL}</strong></p>`,
    );
  }

  private async sendEmail(
    email: string,
    subject: string,
    htmlContent: string,
  ): Promise<CreateEmailResponse> {
    const emailResponse = await this.resend.emails.send({
      from: 'info@itujo.tech',
      to: email,
      subject,
      html: htmlContent,
    });

    if (emailResponse.error) {
      throw new ApplicationError(emailResponse.error.message, 400);
    }

    return emailResponse;
  }
}
