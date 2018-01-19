// uShoulders - u = user
// iShoulders - i = item
export const top = (uShoulders, iShoulders, uBreast, iBreast, uWaist, iWaist, uHips, iHips) =>
  Math.floor(
    uShoulders / iShoulders * (uBreast / iBreast) * (uWaist / iWaist) * (uHips / iHips) * 100,
  );

export const bottom = (uWaist, iWaist, uHips, iHips) =>
  Math.floor(uWaist / iWaist * (uHips / iHips) * 100);

export const upperLength = (userHeight, itemLength) => {
  const x = userHeight;
  const y = x / 8;
  const z = y * 2;
  const g = itemLength;
  let text;

  if (x - (y + g) > z) {
    text = 'Выше колена';
  } else if (x - (y + g) < z) {
    text = 'Ниже колена';
  } else if (x - (y + g) === z) {
    text = 'На уровне колена';
  }
  return text;
};

export const bottomLength = (userHeight, itemLength) => {
  const x = userHeight;
  const y = itemLength;
  const z = x / 8 * 5;
  let text;

  if (x - y > z) {
    text = 'Выше колена';
  } else if (x - y < z) {
    text = 'Ниже колена';
  } else if (x - y === z) {
    text = 'На уровне колена';
  }
  return text;
};
