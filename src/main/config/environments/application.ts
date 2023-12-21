import env from 'env-var';

export default {
  mode: env.get('NODE_ENV').default('development').asString(),
  port: env.get('PORT').default('3000').asPortNumber(),
  jwtSecret: env.get('JWT_SECRET').required().asString(),
  resendApiKey: env.get('RESEND_API_KEY').required().asString(),
} as const;
