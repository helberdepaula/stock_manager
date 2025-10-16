import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { databaseConfig } from './config/datasource';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { RegioesModule } from './modules/regioes/regioes.module';
import { UnidadesModule } from './modules/unidades/unidades.module';
import { EstadosModule } from './modules/estados/estados.module';
import { MunicipiosModule } from './modules/municipios/municipios.module';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { MarcasModule } from './modules/marcas/marcas.module';
import { FornecedoresModule } from './modules/fornecedores/fornecedores.module';
import { ProdutosModule } from './modules/produtos/produtos.module';
import { PedidosModule } from './modules/pedidos/pedidos.module';
import { EstoquesModule } from './modules/estoques/estoques.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('database')!,
      inject: [ConfigService],
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    AuthModule,
    UsersModule,
    RegioesModule,
    UnidadesModule,
    EstadosModule,
    MunicipiosModule,
    CategoriasModule,
    MarcasModule,
    FornecedoresModule,
    ProdutosModule,
    PedidosModule,
    EstoquesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
