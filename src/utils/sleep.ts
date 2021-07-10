export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms * 1000 * 60);
  });
}
