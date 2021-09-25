/*  Copied form https://github.com/Hotell/rex-tils  */
/* export const AnswerResponse = Enum('No',"Yes') */
/* export type AnswerResponse = Enum(typeof AnswerResponse) */

export type UnionFromTuple<T> = T extends Array<infer U> ? U : never;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Enum = <T extends string[]>(...args: T) => {
  return Object.freeze(
    args.reduce((acc, next) => {
      return {
        ...acc,
        [next]: next,
      };
    }, Object.create(null)) as { [P in UnionFromTuple<typeof args>]: P }
  );
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Enum<T extends Object> = T[keyof T];
