import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: 'GREETING_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.REDIS,
          options: {
            host: 'localhost',
            port: 6379,
          },
        });
      },
    },
    AppService,
  ],
})
export class AppModule {}
