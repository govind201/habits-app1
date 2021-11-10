import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Habit from "./habit";


@Entity()
 export default  class User extends BaseEntity {
     @PrimaryGeneratedColumn()
     user_id: number

     @Column()
     googleId: string

     @Column()
     is_tutorial_done: boolean
     
    @Column()
    money: number
 
    @OneToMany(()=>Habit, habit=>habit.user)
    habits: Habit[] 
    
 }