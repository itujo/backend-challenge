import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsPositive } from 'class-validator';

@InputType()
export class PaginationInput {
  @Field({ nullable: true })
  @IsPositive()
  @IsOptional()
  page?: number;

  @Field({ nullable: true })
  @IsPositive()
  @IsOptional()
  perPage?: number;
}
