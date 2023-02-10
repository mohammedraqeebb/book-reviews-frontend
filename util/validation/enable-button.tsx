export const isButtonDisabled = (
  initialState: object,
  currentState: object,
  errorState: object
) => {
  for (const [key, value] of Object.entries(initialState)) {
    //@ts-ignore
    if (value === currentState[key]) {
      return true;
    }
  }
  for (const [key, value] of Object.entries(errorState)) {
    if (value) {
      return true;
    }
  }
  return false;
};
