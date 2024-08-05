import {Test, TestingModule} from '@nestjs/testing';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {INestApplication} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {databaseOptions} from "./database-options";
import {DataSource} from 'typeorm';
import * as dotenv from 'dotenv';
import * as process from "node:process";

dotenv.config({path: '.env.test.local'});

describe('Database Options', () => {
    let app: INestApplication;
    let configService: ConfigService;
    let connection: DataSource;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({isGlobal: true}),
                TypeOrmModule.forRootAsync(databaseOptions),
            ],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        configService = module.get<ConfigService>(ConfigService);
    });

    afterAll(async () => {
        await app.close();
        await connection.destroy();
    });

    it('config service', () => {
        expect(configService).toBeDefined();
    });

    it('should connect to the database successfully', async () => {
        connection = new DataSource({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [],
            synchronize: true,
        });
        console.log('connection.options', connection.options);

        await connection.initialize();
        expect(connection.isInitialized).toBe(true);
    });

    it('database config check', () => {
        const config = {
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        }
        console.log('database config', config)
    });
});
