import { router } from "./index";
import { tenantRouter } from "./routers/tenant.router";

export const appRouter = router({
  tenant: tenantRouter,
});

export type AppRouter = typeof appRouter;
