import {
  MoreThan,
  LessThan,
  MoreThanOrEqual,
  LessThanOrEqual,
  Equal,
  Not,
  In,
  Like,
  ILike,
  Between,
  IsNull,
  And,
  FindOperator,
} from 'typeorm';

export async function findAllItems(
  repository: any,
  where: any,
  take: number,
  page: number,
) {
  //Pagination values
  const t = take || 10;
  const p = page || 1;
  const s = (p - 1) * t;

  const findConditions = {};

  // * Filter for get by find operators
  if (where) {
    for (const [k1, v1] of Object.entries(JSON.parse(String(where)))) {
      let operArr: FindOperator<any>[] = [];
      for (const [k2, v2] of Object.entries(v1)) {
        operArr.push(await convertOperator(k2, v2));
      }
      findConditions[String(k1)] = And(...operArr);
    }
  }

  const result = await repository.findAndCount({
    where: findConditions,
    take: t,
    skip: s,
  });
  return result;
}

async function convertOperator(oper: string, value: any) {
  switch (oper) {
    case 'eq':
      return Equal(value);
    case 'neq':
      return Not(Equal(value));
    case 'lt':
      return LessThan(value);
    case 'lte':
      return LessThanOrEqual(value);
    case 'gt':
      return MoreThan(value);
    case 'gte':
      return MoreThanOrEqual(value);
    case 'in':
      return In(JSON.parse(value));
    case 'nin':
      return Not(In(JSON.parse(value)));
    case 'null':
      return IsNull();
    case 'nnull':
      return Not(IsNull());
    case 'contains':
      return Like(`%${value}%`);
    case 'icontains':
      return ILike(`%${value}%`);
    case 'ncontains':
      return Not(Like(`%${value}%`));
    case 'starts_with':
      return Like(`${value}%`);
    case 'istarts_with':
      return ILike(`${value}%`);
    case 'nstarts_with':
      return Not(Like(`${value}%`));
    case 'nistarts_with':
      return Not(ILike(`${value}%`));
    case 'ends_with':
      return Like(`%${value}`);
    case 'iends_with':
      return ILike(`%${value}`);
    case 'nends_with':
      return Not(Like(`%${value}`));
    case 'niends_with':
      return Not(ILike(`%${value}`));
    case 'between': {
      const arr = value.split(',');
      return Between(arr[0].trim(), arr[1].trim());
    }
    case 'nbetween': {
      const arr = value.split(',');
      return Not(Between(arr[0].trim(), arr[1].trim()));
    }
    case 'empty':
      return Equal('');
    case 'nempty':
      return Not(Equal(''));
    default:
      break;
  }
}
