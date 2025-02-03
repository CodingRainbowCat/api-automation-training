export interface Order {
  id?: number | string | undefined;
  petId?: number | undefined;
  quantity?: number | undefined;
  shipDate?: Date | undefined;
  status?: string | undefined;
  complete?: boolean | undefined;
}
