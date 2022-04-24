// All .env properties come in as strings, so this converts to a boolean value
export function parseEnvBoolean(envProperty: string | undefined) {
  return envProperty === "true" ? true : false
}

export async function randomDelay(maxDelay: number = 2500) {
  await new Promise(resolve => setTimeout(resolve, Math.random() * maxDelay));
}
