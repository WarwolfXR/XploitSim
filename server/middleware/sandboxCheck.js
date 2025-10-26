/**
 * sandboxCheck
 * Ensures the app is running only in a sandbox environment.
 * - Requires SANDBOX=1
 * - Ensures NODE_ENV !== 'production'
 *
 * If checks fail, this function logs a clear error and exits the process.
 */

module.exports = function sandboxCheck() {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const sandboxFlag = process.env.SANDBOX;

  if (nodeEnv === 'production') {
    console.error('Refusing to run: NODE_ENV is "production". This sandbox is for development use only.');
    process.exit(1);
  }
  if (!sandboxFlag || sandboxFlag.toString() !== '1') {
    console.error('Refusing to run: SANDBOX is not enabled. Set SANDBOX=1 in your environment (local dev only).');
    process.exit(1);
  }

  // Warn
  console.warn('*** RUNNING IN SANDBOX MODE (SANDBOX=1). THIS SERVER IS INTENTIONALLY VULNERABLE. ***');
};
