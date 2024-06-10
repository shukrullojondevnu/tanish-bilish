export type PaginationSearchI<T> = {
  page: number;
  take: number;
  where?: T;
};
