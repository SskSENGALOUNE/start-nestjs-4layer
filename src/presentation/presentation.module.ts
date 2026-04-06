import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { CqrsModule } from '@nestjs/cqrs';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { TagModule } from './tag/tag.module';
import { ColorModule } from './color/color.module';

@Module({
  imports: [CqrsModule, ApplicationModule, UserModule, OrderModule, AuthModule, RoleModule, CategoryModule, ProductModule, TagModule, ColorModule],
  exports: [],
})
export class PresentationModule { }