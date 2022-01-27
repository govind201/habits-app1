// import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
const { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn }  = require("typeorm");
// import User from "./user";
const User = require("./user.ts");


@Entity()
export default  class Habit extends BaseEntity{
    @PrimaryGeneratedColumn()
    habit_id: number

    @Column()
    type: string

    @Column() 
    google_id: string

    @Column()
    content: string

    @Column({default: false})
    is_done: Boolean

    @CreateDateColumn()
    created_at: Date

    @ManyToOne(()=>User, user => user.habits)
    creator_id: User
}