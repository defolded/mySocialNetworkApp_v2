type FieldValidatorType = (value: string) => string | undefined

export const required:FieldValidatorType = (value) => {
  if (value) return undefined;

  return "Field is required.";
};
