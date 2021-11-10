
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import Fish from "./fish";
import User from "./user";

@Entity()
export default  class Owns {
    @PrimaryGeneratedColumn()
    owns_id: number

    @Column()
    quantity: number

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @OneToOne(() => Fish)
    @JoinColumn()
    fish: Fish
}