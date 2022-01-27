// import { PrimaryGeneratedColumn, Column, Entity, BaseEntity} from "typeorm"; 
const { PrimaryGeneratedColumn, Column, Entity, BaseEntity} = require("typeorm");


@Entity()
export default class Fish extends BaseEntity{
     @PrimaryGeneratedColumn()
     fish_id: number

    @Column() 
    google_id: string

    @Column() 
    type: string

    @Column() 
    price: string

    @Column() 
    is_placed: Boolean

    @Column() 
    placed_fish: number

    @Column({ type: "timestamp", default: () => "now()"})
    last_fed: Date
}
