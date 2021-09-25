export const seperateStringToArr = (item: string, split?: string) => {
  return item.split(split ?? ',').map((item) => item.trim());
};
