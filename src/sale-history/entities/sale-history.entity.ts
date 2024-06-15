import { Forecast } from 'src/forecast/entities/forecast.entity';
import { Product } from 'src/product/entities/product.entity';
import { PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Entity } from 'typeorm';
@Entity('sale-history')
export class SaleHistory {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    date: Date

    @Column()
    sale_amount: number

    //relation
    @ManyToOne(() => Product, (product) => product.sale, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'product_id'})
    product: Product

    @OneToOne(() => Forecast, (forecast) => forecast.sale)
    forecast: Forecast
}
