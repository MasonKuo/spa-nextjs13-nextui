const logger = require('@lib/logger');

export const apiLogger = (params, message) =>
  logger.error(`\nApi Error Params【${JSON.stringify(params)}】\n${message}`);
