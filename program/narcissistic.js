function narcissistic(value) {
  const length = value.toString().length;
  let total = 0;

  for (let i = 0; i < length; i++) {
    const v = value.toString()[i];
    const pow = Math.pow(v, length);
    total = total + pow;
  }

  if (Number(total) === Number(value)) {
    return true;
  } else {
    return false;
  }
}

narcissistic(371);
