export interface Protocol {
  createdAt: Date;
  type: string;

  entityType: string;
  entityId: number;

  data: string;
}
