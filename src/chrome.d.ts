declare const chrome: {
  storage: {
    local: { get(keys?: string | string[]): Promise<Record<string, unknown>>; set(items: Record<string, unknown>): Promise<void> }
    onChanged: { addListener(callback: (changes: Record<string, { newValue?: unknown }>, area: string) => void): void }
  }
  runtime: { onInstalled: { addListener(callback: () => void): void } }
}
