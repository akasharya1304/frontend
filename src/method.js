const pxToEm = (givenPx, basefont) => {
  if (!basefont) basefont = 16;
  return `${givenPx / basefont}em`;
};

export {
  pxToEm
}