import { transformer } from './traverse/transformer';

export type traverser<D> = (data: D) => D;

export default async function traverseObject<T>(
  obj: T,
  functionMap: Record<string, traverser<unknown>>,
  // Disable no explicit any because this generic transformer should accept anything
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thisTransformer?: transformer<T>,
): Promise<T> {
  const newObject: Record<string, unknown> = {};
  await Promise.all(
    Object.keys(obj).map(async (key) => {
      if (!functionMap[key]) {
        newObject[key] = obj[key];
      } else if (Array.isArray(obj[key])) {
        const arr = obj[key] as Array<unknown>;
        newObject[key] = await Promise.all(arr.map(async (arrItem: unknown) => await functionMap[key](arrItem)));
      } else {
        newObject[key] = await functionMap[key](obj[key]);
      }
    }),
  );

  if (thisTransformer) {
    return await thisTransformer(newObject as T);
  }
  return newObject as T;
}
