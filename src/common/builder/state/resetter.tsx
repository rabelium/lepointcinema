export default (context: string) => () => ({
  type: `${context.toUpperCase()}_RESET`,
});
