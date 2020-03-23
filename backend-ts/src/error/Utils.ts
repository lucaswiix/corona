import { ValidationError } from 'class-validator/build/package/validation/ValidationError';

export const buildDescription = (fields: ValidationError[]) =>
  fields
    .reduce(
      (agg, curr) => [...agg, ...Object.values(curr.constraints)],
      [] as string[]
    )
    .join(', ');

export const buildDescriptionRecursively = (
  fields: ValidationError[]
): { description: string; fields: ValidationError[] } => {
  const recursiveFieldErrors = fields.reduce(
    (agg, curr) => agg.concat(deepFindErrors(curr)),
    []
  );

  return {
    description: buildDescription(recursiveFieldErrors),
    fields: recursiveFieldErrors,
  };
};

// find end level of errors and return the errors
function deepFindErrors(errorsNode: ValidationError) {
  const { constraints, children } = errorsNode;

  if (!children || children.length === 0) {
    return errorsNode;
  }

  return (constraints ? [errorsNode] : []).concat(
    children.reduce((acc, cur) => acc.concat(deepFindErrors(cur)), [])
  );
}
