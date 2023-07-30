/**
 * @name isValidOptionalStringEnum
 * @description Returns whether an optional field expected to be a string enum is valid
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidOptionalStringEnum = (field: any, enumValues: string[]) => {
  if (typeof field === 'undefined') return true;
  return isValidRequiredStringEnum(field, enumValues);
};

/**
 * @name isValidOptionalType
 * @description Returns whether an optional field expected to be of a specific type is valid
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidOptionalType = (field: any, type: 'boolean' | 'string') => {
  return [type, 'undefined'].includes(typeof field);
};

/**
 * @name isValidOptionalBoolean
 * @description Returns whether an optional field expected to be boolean is valid
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidOptionalBoolean = (field: any) => {
  return isValidOptionalType(field, 'boolean');
};

/**
 * @name isValidOptionalString
 * @description Returns whether an optional field expected to be string is valid
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidOptionalString = (field: any) => {
  return isValidOptionalType(field, 'string');
};

/**
 * @name isValidRequiredNumber
 * @description Returns whether a required field expected to be number is valid
 * It can also check for bounds (inclusive)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidRequiredNumber = (field: any, min = -Infinity, max = Infinity) => {
  return typeof field === 'number' && min <= field && field <= max;
};

/**
 * @name isValidRequiredStringEnum
 * @description Returns whether a required field expected to be a string enum is valid
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidRequiredStringEnum = (field: any, enumValues: string[]) => {
  return enumValues.includes(field);
};

/**
 * @name isValidRequiredString
 * @description Returns whether a required field expected to be string is valid
 * A non-empty value is expected
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidRequiredString = (field: any) => {
  return typeof field === 'string' && field !== '';
};

/**
 * @name isValidRequiredObject
 * @description Returns whether a required field expected to be object is valid
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidRequiredObject = (field: any) => {
  return !!field && typeof field === 'object' && !Array.isArray(field);
};

/**
 * @name isValidRequiredArray
 * @description Returns whether a required field expected to be array is valid
 * A minimum length of 1 is expected
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidRequiredArray = (field: any) => {
  return Array.isArray(field) && field.length > 0;
};

export {
  isValidOptionalStringEnum,
  isValidOptionalType,
  isValidOptionalBoolean,
  isValidOptionalString,
  isValidRequiredNumber,
  isValidRequiredStringEnum,
  isValidRequiredString,
  isValidRequiredObject,
  isValidRequiredArray
};
