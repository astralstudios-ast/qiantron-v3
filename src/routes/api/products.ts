import { createFileRoute } from "@tanstack/react-router";
import { CATALOG } from "@/lib/catalog";

export const Route = createFileRoute("/api/products")({
  server: {
    handlers: {
      GET: async () => {
        return Response.json(
          { products: CATALOG, count: CATALOG.length, updatedAt: new Date().toISOString() },
          { headers: { "cache-control": "public, max-age=60, s-maxage=300" } },
        );
      },
    },
  },
});
