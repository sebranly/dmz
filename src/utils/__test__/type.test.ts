import { isValidOptionalStringEnum, isValidOptionalType, isValidOptionalBoolean, isValidOptionalString, isValidRequiredNumber, isValidRequiredStringEnum, isValidRequiredString, isValidRequiredObject, isValidRequiredArray } from '../type';

test('isValidOptionalBoolean', () => {
  expect(isValidOptionalBoolean('')).toBe(false)
  expect(isValidOptionalBoolean('test')).toBe(false)
  expect(isValidOptionalBoolean(null)).toBe(false)
  expect(isValidOptionalBoolean([])).toBe(false)
  expect(isValidOptionalBoolean({})).toBe(false)
  expect(isValidOptionalBoolean(0)).toBe(false)
  expect(isValidOptionalBoolean(1)).toBe(false)

  expect(isValidOptionalBoolean(undefined)).toBe(true)
  expect(isValidOptionalBoolean(false)).toBe(true)
  expect(isValidOptionalBoolean(true)).toBe(true)
});

test('isValidOptionalString', () => {
  expect(isValidOptionalString(null)).toBe(false)
  expect(isValidOptionalString([])).toBe(false)
  expect(isValidOptionalString({})).toBe(false)
  expect(isValidOptionalString(0)).toBe(false)
  expect(isValidOptionalString(1)).toBe(false)
  expect(isValidOptionalString(false)).toBe(false)
  expect(isValidOptionalString(true)).toBe(false)

  expect(isValidOptionalString(undefined)).toBe(true)
  expect(isValidOptionalString('')).toBe(true)
  expect(isValidOptionalString('test')).toBe(true)
});

test('isValidOptionalType', () => {
  expect(isValidOptionalType(null, 'string')).toBe(false)
  expect(isValidOptionalType([], 'string')).toBe(false)
  expect(isValidOptionalType({}, 'string')).toBe(false)
  expect(isValidOptionalType(0, 'string')).toBe(false)
  expect(isValidOptionalType(1, 'string')).toBe(false)
  expect(isValidOptionalType(false, 'string')).toBe(false)
  expect(isValidOptionalType(true, 'string')).toBe(false)

  expect(isValidOptionalType(undefined, 'string')).toBe(true)
  expect(isValidOptionalType('', 'string')).toBe(true)
  expect(isValidOptionalType('test', 'string')).toBe(true)

  expect(isValidOptionalType('', 'boolean')).toBe(false)
  expect(isValidOptionalType('test', 'boolean')).toBe(false)
  expect(isValidOptionalType(null, 'boolean')).toBe(false)
  expect(isValidOptionalType([], 'boolean')).toBe(false)
  expect(isValidOptionalType({}, 'boolean')).toBe(false)
  expect(isValidOptionalType(0, 'boolean')).toBe(false)
  expect(isValidOptionalType(1, 'boolean')).toBe(false)

  expect(isValidOptionalType(undefined, 'boolean')).toBe(true)
  expect(isValidOptionalType(false, 'boolean')).toBe(true)
  expect(isValidOptionalType(true, 'boolean')).toBe(true)
});

test('isValidRequiredNumber', () => {
  expect(isValidRequiredNumber('')).toBe(false)
  expect(isValidRequiredNumber('test')).toBe(false)
  expect(isValidRequiredNumber('1')).toBe(false)
  expect(isValidRequiredNumber(null)).toBe(false)
  expect(isValidRequiredNumber([])).toBe(false)
  expect(isValidRequiredNumber({})).toBe(false)
  expect(isValidRequiredNumber(undefined)).toBe(false)
  expect(isValidRequiredNumber(false)).toBe(false)
  expect(isValidRequiredNumber(true)).toBe(false)

  expect(isValidRequiredNumber(0)).toBe(true)
  expect(isValidRequiredNumber(1)).toBe(true)
  expect(isValidRequiredNumber(1.5)).toBe(true)

  expect(isValidRequiredNumber(0, 0)).toBe(true);
  expect(isValidRequiredNumber(0, 0, 20)).toBe(true);
  expect(isValidRequiredNumber(0, 1)).toBe(false);
  expect(isValidRequiredNumber(0, 1, 20)).toBe(false);
  expect(isValidRequiredNumber(1, 1, 20)).toBe(true);
  expect(isValidRequiredNumber(20, 1, 20)).toBe(true);
  expect(isValidRequiredNumber(21, 1, 20)).toBe(false);
});

test('isValidOptionalStringEnum', () => {
  const values = ['value1', 'value2'];

  expect(isValidOptionalStringEnum('', values)).toBe(false)
  expect(isValidOptionalStringEnum('test', values)).toBe(false)
  expect(isValidOptionalStringEnum(null, values)).toBe(false)
  expect(isValidOptionalStringEnum([], values)).toBe(false)
  expect(isValidOptionalStringEnum({}, values)).toBe(false)
  expect(isValidOptionalStringEnum(0, values)).toBe(false)
  expect(isValidOptionalStringEnum(1, values)).toBe(false)
  expect(isValidOptionalStringEnum(false, values)).toBe(false)
  expect(isValidOptionalStringEnum(true, values)).toBe(false)

  expect(isValidOptionalStringEnum(undefined, values)).toBe(true)
  expect(isValidOptionalStringEnum('value1', values)).toBe(true)
});

test('isValidRequiredStringEnum', () => {
  const values = ['value1', 'value2'];

  expect(isValidRequiredStringEnum('', values)).toBe(false)
  expect(isValidRequiredStringEnum('test', values)).toBe(false)
  expect(isValidRequiredStringEnum(null, values)).toBe(false)
  expect(isValidRequiredStringEnum([], values)).toBe(false)
  expect(isValidRequiredStringEnum({}, values)).toBe(false)
  expect(isValidRequiredStringEnum(0, values)).toBe(false)
  expect(isValidRequiredStringEnum(1, values)).toBe(false)
  expect(isValidRequiredStringEnum(false, values)).toBe(false)
  expect(isValidRequiredStringEnum(true, values)).toBe(false)
  expect(isValidRequiredStringEnum(undefined, values)).toBe(false)

  expect(isValidRequiredStringEnum('value1', values)).toBe(true)
});

test('isValidRequiredString', () => {
  expect(isValidRequiredString(null)).toBe(false)
  expect(isValidRequiredString([])).toBe(false)
  expect(isValidRequiredString({})).toBe(false)
  expect(isValidRequiredString(0)).toBe(false)
  expect(isValidRequiredString(1)).toBe(false)
  expect(isValidRequiredString(false)).toBe(false)
  expect(isValidRequiredString(true)).toBe(false)
  expect(isValidRequiredString(undefined)).toBe(false)
  expect(isValidRequiredString('')).toBe(false)

  expect(isValidRequiredString('test')).toBe(true)
});

test('isValidRequiredObject', () => {
  expect(isValidRequiredObject(null)).toBe(false)
  expect(isValidRequiredObject([])).toBe(false)
  expect(isValidRequiredObject(0)).toBe(false)
  expect(isValidRequiredObject(1)).toBe(false)
  expect(isValidRequiredObject(false)).toBe(false)
  expect(isValidRequiredObject(true)).toBe(false)
  expect(isValidRequiredObject(undefined)).toBe(false)
  expect(isValidRequiredObject('')).toBe(false)
  expect(isValidRequiredObject('test')).toBe(false)

  expect(isValidRequiredObject({})).toBe(true)
  expect(isValidRequiredObject({ something: true })).toBe(true)
});

test('isValidRequiredArray', () => {
  expect(isValidRequiredArray(null)).toBe(false)
  expect(isValidRequiredArray({})).toBe(false)
  expect(isValidRequiredArray(0)).toBe(false)
  expect(isValidRequiredArray(1)).toBe(false)
  expect(isValidRequiredArray(false)).toBe(false)
  expect(isValidRequiredArray(true)).toBe(false)
  expect(isValidRequiredArray(undefined)).toBe(false)
  expect(isValidRequiredArray('')).toBe(false)
  expect(isValidRequiredArray('test')).toBe(false)
  expect(isValidRequiredArray([])).toBe(false)

  expect(isValidRequiredArray([1])).toBe(true)
  expect(isValidRequiredArray([{ something: true }])).toBe(true)
});