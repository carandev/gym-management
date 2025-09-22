import {router, protectedProcedure} from "../index";
import { TenantService } from "../../services/tenant.service";
import { createTenantRequest, deleteTenantRequest, getTenantByIdRequest, updateTenantRequest } from "../../requests";

export const tenantRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return TenantService.list(ctx.prisma)
  }),

  create: protectedProcedure
    .input(createTenantRequest)
    .mutation(async ({ input, ctx }) => {
      return TenantService.create(ctx.prisma, input.name)
    }),

  getById: protectedProcedure
    .input(getTenantByIdRequest)
    .query(async ({ ctx, input }) => {
      return TenantService.getById(ctx.prisma, input.id)
    }),

  update: protectedProcedure
    .input(updateTenantRequest)
    .mutation(({ ctx, input }) => {
      return TenantService.update(ctx.prisma, input.id, input.name);
    }),

  delete: protectedProcedure
    .input(deleteTenantRequest)
    .mutation(({ ctx, input }) => {
      return TenantService.delete(ctx.prisma, input.id);
    }),
});
