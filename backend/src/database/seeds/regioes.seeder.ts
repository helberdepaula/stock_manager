import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';


export default class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
    ): Promise<any> {
       /* const repository =  dataSource.getRepository(RegioesRepository);
        await repository.insert([
            {
                id:1,
                nome: 'Norte',
            },
              {
                id:2,
                nome: 'Nordeste',
            },
                          {
                id:3,
                nome: 'Sudeste',
            },
            {
                id:4,
                nome: 'Sul',
            },
             {
                id:5,
                nome: 'Centro-Oeste',
            },
        ]);*/
    }
}