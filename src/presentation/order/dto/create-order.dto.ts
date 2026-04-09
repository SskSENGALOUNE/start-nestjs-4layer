import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export enum DeliveryProviderEnum {
  LAOS_POST = 'LAOS_POST',
  DHL = 'DHL',
  NINJA_VAN = 'NINJA_VAN',
}

export class OrderItemDto {
  @ApiProperty({ example: 'Pizza' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 9.99 })
  @IsNumber()
  price: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '020000000' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'Vientiane, Laos', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ enum: DeliveryProviderEnum, example: DeliveryProviderEnum.LAOS_POST })
  @IsEnum(DeliveryProviderEnum)
  deliveryProvider: DeliveryProviderEnum;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}