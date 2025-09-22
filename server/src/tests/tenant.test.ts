import { TenantService } from "../services/tenant.service";
import { TenantMessage } from "../utils/tenant.message";
import { prisma } from "./setup";

describe("Tenant Service", () => {
  beforeEach(async () => {
    // Limpia tabla antes de cada test
    await prisma.tenant.deleteMany();
  });

  it("debería crear un tenant", async () => {
    const tenant = await TenantService.create(prisma, "Gimnasio Alpha");
    expect(tenant.name).toBe("Gimnasio Alpha");
    expect(tenant.id).toBeDefined();
  });

  it("should not allow duplicate tenant names", async () => {
    await TenantService.create(prisma, "Gym B");
    await expect(TenantService.create(prisma, "Gym B"))
      .rejects
      .toThrow(TenantMessage.alreadyExist);
  });

  it("debería listar los tenants", async () => {
    await TenantService.create(prisma, "Gimnasio Beta");
    const tenants = await TenantService.list(prisma);
    expect(tenants.length).toBe(1);
  });

  it("should update a tenant", async () => {
    const tenant = await TenantService.create(prisma, "Gym D");
    const updated = await TenantService.update(prisma, tenant.id, "Gym D Updated");
    expect(updated.name).toBe("Gym D Updated");
  });

  it("should delete a tenant", async () => {
    const tenant = await TenantService.create(prisma, "Gym E");
    await TenantService.delete(prisma, tenant.id);
    const result = await TenantService.getById(prisma, tenant.id);
    expect(result).toBeNull();
  });
});
