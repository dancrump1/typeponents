import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import type { InspirationRecord, PropRecord, RiskRecord } from './catalog';
import { ComponentFileEntity } from './component-file.entity';

@Entity('components')
export class ComponentEntity {
  @PrimaryColumn()
  slug: string;

  @Column()
  title: string;

  @Column({ type: 'text', default: '' })
  description: string;

  @Column({ type: 'text', default: '' })
  interaction: string;

  /** First category. The library groups the index by this value. */
  @Column()
  primaryCategory: string;

  @Column({ type: 'simple-json' })
  categories: string[];

  @Column({ type: 'simple-json' })
  tags: string[];

  @Column({ type: 'simple-json', nullable: true })
  inspiration: InspirationRecord | null;

  @Column({ type: 'varchar', nullable: true })
  inspirationSource: string | null;

  @Column({ type: 'simple-json' })
  dependencies: string[];

  @Column({ type: 'simple-json' })
  registryDependencies: string[];

  @Column({ type: 'simple-json' })
  props: PropRecord[];

  @Column({ type: 'simple-json' })
  risk: RiskRecord;

  @Column({ type: 'integer', default: 5 })
  rating: number;

  @Column({ default: 'needs-review' })
  status: 'stable' | 'needs-review' | 'draft';

  @Column({ default: false })
  hidden: boolean;

  @Column({ default: false })
  gated: boolean;

  @Column()
  importPath: string;

  @Column()
  registryUrl: string;

  @Column({ type: 'simple-json' })
  files: string[];

  @OneToMany(() => ComponentFileEntity, (file) => file.component, {
    cascade: true,
  })
  sources: ComponentFileEntity[];
}
