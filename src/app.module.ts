import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseType } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { PresentationModule } from './presentation/presentation.module';
import { ApplicationModule } from './application/application.module';
import { SharedModule } from './shared/shared.module';
import { HealthService } from './utilities/health-check/health.service';
import { DatabaseHealthService } from './utilities/health-check/database-health.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CourseController } from './course.controller';
import { CreateCourseHandler } from './create-course.handler';
import { ConfigModule } from '@nestjs/config';
import type { StringValue } from 'ms';
import { JwtModule } from '@nestjs/jwt';
import { ArticleModule } from './presentation/article/article.module';
import { SizeModule } from './presentation/size/size.module';
import { LeaveRequestModule } from './presentation/leave-request/leave-request.module';
import { TransferModule } from './presentation/transfer/transfer.module';

function detectDatabaseType(url: string): DatabaseType {
  if (url.startsWith('postgresql://') || url.startsWith('postgres://')) {
    return 'postgres';
  }
  if (url.startsWith('mysql://')) {
    return 'mysql';
  }
  if (url.startsWith('mongodb://')) {
    return 'mongodb';
  }
  if (url.startsWith('mssql://') || url.startsWith('sqlserver://')) {
    return 'mssql';
  }

  throw new Error('Unsupported database type in DATABASE_URL');
}

function getTypeOrmImports() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.warn(
      'DATABASE_URL not found. Skipping TypeOrmModule configuration.',
    );
    return [];
  }

  return [
    TypeOrmModule.forRoot({
      type: detectDatabaseType(databaseUrl),
      url: databaseUrl,
      synchronize: false,
      logging: false,
    }),
  ];
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: (process.env.JWT_EXPIRES_IN ?? '7d') as StringValue },
    }), ...getTypeOrmImports(), PresentationModule, InfrastructureModule, ApplicationModule, SharedModule, CqrsModule, ArticleModule, SizeModule, LeaveRequestModule, TransferModule],
  controllers: [AppController, CourseController],
  providers: [AppService, HealthService, DatabaseHealthService, CreateCourseHandler],
})
export class AppModule { }
