export default function updateParamsFromObject(object: Record<string, string>) {
  const updateExpressionParts = [];
  const expressionAttributeValues: Record<string, unknown> = {};

  for (const property in object) {
    const value = object[property];

    updateExpressionParts.push(`${property} = :${property}`);
    expressionAttributeValues[`:${property}`] = value;
  }

  const updateExpression = `SET ${updateExpressionParts.join(', ')}`;

  return {
    updateExpression,
    expressionAttributeValues,
  };
}
