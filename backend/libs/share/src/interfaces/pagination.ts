export interface PaginationI<T> {
  page: number;
  skip: number;
  take: number;
  data: T;
}

export interface PaginationSearchI<T> {
  page: number;
  skip: number;
  take: number;
  where: T;
}
