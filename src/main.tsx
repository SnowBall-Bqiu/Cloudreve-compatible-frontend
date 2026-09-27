const objectWithHasOwn = Object as typeof Object & { hasOwn?: (object: object, key: PropertyKey) => boolean };

async function loadCompatibilityFallbacks() {
  const fallbacks: Promise<unknown>[] = [];

  if (typeof globalThis.structuredClone !== "function") {
    fallbacks.push(import("core-js/stable/structured-clone.js"));
  }

  if (typeof objectWithHasOwn.hasOwn !== "function") {
    fallbacks.push(import("core-js/stable/object/has-own.js"));
  }

  await Promise.all(fallbacks);
}

async function startApplication() {
  await loadCompatibilityFallbacks();
  await import("./bootstrap.tsx");
}

void startApplication();
