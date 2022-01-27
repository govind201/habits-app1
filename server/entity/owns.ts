
// import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

const { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn }  = require("typeorm");
// import Fish from "./fish";
// import Fish from "./fish";
const User = require("./user")
const Fish = require("./fish")

@Entity()
export default  class Owns  extends BaseEntity{
    @PrimaryGeneratedColumn()
    owns_id: number

    @Column()
    count: number

    @Column() 
    google_id: string

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @OneToOne(() => Fish)
    @JoinColumn()
    fish: Fish
}