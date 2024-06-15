import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string

    @Column()
    password: string

    @Column({default: 'user'})
    role: string


    // relation
}
