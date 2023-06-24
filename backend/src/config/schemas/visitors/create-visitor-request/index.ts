const CreateVisitorRequestSchema = {
  'type': 'object',
  'properties': {
    'firstName': { 'type': 'string' },
    'lastName': { 'type': 'string' },
  },
  'required': ['firstName', 'lastName'],
  'additionalProperties': false,
};

export { CreateVisitorRequestSchema as default };
