import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {databaseOptions} from "./database-options";

@Module({
    imports: [
        TypeOrmModule.forRootAsync(databaseOptions),
        // TypeOrmModule.forFeature(databaseEntities),
    ],
    controllers: [],
    providers: [],
})
export class DatabaseModule {}
