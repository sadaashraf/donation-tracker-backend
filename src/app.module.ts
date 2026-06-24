import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { MembersModule } from './members/members.module';
import { PaymentsModule } from './payments/payments.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProfileModule } from './profile/profile.module';
import { YearPlansModule } from './year-plans/year-plans.module';
import { AuthModule } from './auth/auth.module';

const uploadsDir = join(process.cwd(), 'uploads');
if (!existsSync(uploadsDir)) mkdirSync(uploadsDir);

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isProduction = process.env.NODE_ENV === 'production';
        const enableSsl = process.env.DB_SSL === 'true';
        const dbConfig: any = {
          type: 'postgres',
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true,
          ssl: enableSsl ? { rejectUnauthorized: false } : false,
        };

        if (process.env.DATABASE_URL) {
          dbConfig.url = process.env.DATABASE_URL;
        } else {
          dbConfig.host = config.get('DB_HOST', isProduction ? 'database' : 'localhost');
          dbConfig.port = config.get<number>('DB_PORT', 5432);
          dbConfig.username = config.get('DB_USERNAME', 'postgres');
          dbConfig.password = config.get('DB_PASSWORD', 'root');
          dbConfig.database = config.get('DB_NAME', 'MMS_db');
        }

        return dbConfig;
      },
    }),

    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),

    AuthModule,
    MembersModule,
    PaymentsModule,
    DashboardModule,
    ProfileModule,
    YearPlansModule,
  ],
})
export class AppModule { }
