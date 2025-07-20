interface StorageMock {
  store: Record<string, string>;
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  clear(): void;
}

export const localStorageMock: StorageMock = {
  store: {},

  getItem(key) {
    return this.store[key] || null;
  },

  setItem(key, value) {
    this.store[key] = value.toString();
  },

  clear() {
    this.store = {};
  },
};
