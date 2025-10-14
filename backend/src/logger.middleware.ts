import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis do .env

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');
  private readonly logLevel = process.env.LOG_LEVEL || 'log'; // Padrão: 'log'

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body, headers } = req;

    if (this.logLevel !== 'none') {
      this.logger.log(`📥 Requisição recebida: ${method} ${originalUrl}`);
    }

    if (this.logLevel === 'debug' || this.logLevel === 'verbose') {
      this.logger.debug(`📝 Body: ${JSON.stringify(body, null, 2)}`);
    }

    if (this.logLevel === 'verbose') {
      this.logger.verbose(`📌 Headers: ${JSON.stringify(headers, null, 2)}`);
    }

    next();
  }
}
