export interface Order {
  id?: number | undefined;
  petId?: number | undefined;
  quantity?: number | undefined;
  shipDate?: Date | undefined;
  status?: string | undefined;
  complete?: boolean | undefined;
}
