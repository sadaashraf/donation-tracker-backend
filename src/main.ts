import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      const allowed = [
        process.env.FRONTEND_URL,
        'http://localhost:5173',
        'http://localhost:3000',
      ].filter(Boolean);

      // allow requests with no origin (like Postman, mobile apps)
      if (!origin) return callback(null, true);

      // allow exact match
      if (allowed.includes(origin)) {
        return callback(null, true);
      }

      // allow all vercel domains (preview + production)
      if (/\.vercel\.app$/.test(origin)) {
        return callback(null, true);
      }

      console.log('❌ CORS blocked:', origin);
      return callback(new Error(`CORS blocked: ${origin}`));
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.setGlobalPrefix('api', { exclude: ['/uploads/(.*)'] });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Backend running on port ${process.env.PORT}`);
}
bootstrap();
