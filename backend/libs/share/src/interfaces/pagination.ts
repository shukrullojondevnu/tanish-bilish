export interface PaginationI<T> {
  page: number;
  skip: number;
  take: number;
  data: T;
}

export type PaginationSearchI<T> = {
  page: number;
  skip: number;
  take: number;
  where: T;
};
