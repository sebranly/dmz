/**
 * @name isValidOptionalStringEnum
 * @description Returns whether an optional field expected to be a string enum is valid
 */
const isValidOptionalStringEnum = (field: any, enumValues: string[]) => {
  if (typeof field === 'undefined') return true;
  return isValidRequiredStringEnum(field, enumValues);
};

/**
 * @name isValidOptionalType
 * @description Returns whether an optional field expected to be of a specific type is valid
 */
const isValidOptionalType = (field: any, type: string) => {
  return [type, 'undefined'].includes(typeof field);
};

/**
 * @name isValidOptionalBoolean
 * @description Returns whether an optional field expected to be boolean is valid
 */
const isValidOptionalBoolean = (field: any) => {
  return isValidOptionalType(field, 'boolean');
};

/**
 * @name isValidOptionalString
 * @description Returns whether an optional field expected to be string is valid
 */
const isValidOptionalString = (field: any) => {
  return isValidOptionalType(field, 'string');
};

/**
 * @name isValidRequiredNumber
 * @description Returns whether a required field expected to be number is valid
 * It can also check for bounds (inclusive)
 */
const isValidRequiredNumber = (field: any, min = -Infinity, max = Infinity) => {
  return typeof field === 'number' && min <= field && field <= max;
};

/**
 * @name isValidRequiredStringEnum
 * @description Returns whether a required field expected to be a string enum is valid
 */
const isValidRequiredStringEnum = (field: any, enumValues: string[]) => {
  return enumValues.includes(field);
};

/**
 * @name isValidRequiredString
 * @description Returns whether a required field expected to be string is valid
 * A non-empty value is expected
 */
const isValidRequiredString = (field: any) => {
  return typeof field === 'string' && field !== '';
};

/**
 * @name isValidRequiredObject
 * @description Returns whether a required field expected to be object is valid
 */
const isValidRequiredObject = (field: any) => {
  return !!field && typeof field === 'object' && !Array.isArray(field);
};

/**
 * @name isValidRequiredArray
 * @description Returns whether a required field expected to be array is valid
 * A minimum length of 1 is expected
 */
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
