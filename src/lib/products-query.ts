import { queryOptions } from "@tanstack/react-query";
import type { Category } from "./catalog";
import { CATALOG } from "./catalog";

export type ProductsResponse = {
  products: Category[];
  count: number;
  updatedAt: string;
};

export const productsQueryOptions = queryOptions({
  queryKey: ["products"],
  queryFn: async ({ signal }): Promise<ProductsResponse> => {
    // During SSR the fetch origin isn't set — fall back to the static catalog.
    if (typeof window === "undefined") {
      return { products: CATALOG, count: CATALOG.length, updatedAt: new Date().toISOString() };
    }
    const res = await fetch("/api/products", { signal });
    if (!res.ok) throw new Error(`Failed to load products (${res.status})`);
    return (await res.json()) as ProductsResponse;
  },
  staleTime: 5 * 60_000,
});
