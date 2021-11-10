import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "./user";

@Entity()
export default  class Habit extends BaseEntity{
    @PrimaryGeneratedColumn()
    habit_id: number

    @Column()
    type: string

    @Column()
    text: string

    @CreateDateColumn()
    created_at: Date

    @ManyToOne(()=>User, user => user.habits)
    user: User
}