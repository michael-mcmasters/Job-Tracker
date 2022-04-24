export async function randomDelay(maxDelay: number = 2500) {
  await new Promise(resolve => setTimeout(resolve, Math.random() * maxDelay));
}
