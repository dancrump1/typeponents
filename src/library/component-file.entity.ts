import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ComponentEntity } from './component.entity';

@Entity('component_files')
export class ComponentFileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ComponentEntity, (component) => component.sources, {
    onDelete: 'CASCADE',
  })
  component: ComponentEntity;

  /** Path relative to the component folder, e.g. `component.tsx`. */
  @Column()
  filename: string;

  @Column({ type: 'text' })
  content: string;
}
