export const removeAtId = <Type extends { id: string }>(
  array: Type[],
  id: string
) => {
  return array.splice(
    array.findIndex((item) => item.id === id),
    1
  );
};

export const findItem = <Type extends { id: string }>(
  array: Type[],
  id: string
): Type => {
  const index = array.findIndex((item) => item.id === id);
  return array[index];
};
