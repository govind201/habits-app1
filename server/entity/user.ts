// import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
const { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } = require("typeorm");
// import Habit from "./habit";
const Habit = require("./habit.ts");


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

    @Column()
    has_unplaced_fish: Boolean
 
    @OneToMany(()=>Habit, habit=>habit.creator_id)
    habits: Habit[] 
    
 }