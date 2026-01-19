import { z } from 'zod';

export const CreateOrderItemSchema = z.object({
  productId: z.number(),
  quantity: z.number().refine((val) => val % 6 === 0, {
    message: "Množstvo musí byť celý kartón (násobok 6)!",
  }),
  price: z.number().optional(), // Snapshot of price at order time
});

export const CreateOrderSchema = z.object({
  userId: z.number(),
  items: z.array(CreateOrderItemSchema),
  deliveryDate: z.string().datetime(),
});

export type CreateOrderDto = z.infer<typeof CreateOrderSchema>;
