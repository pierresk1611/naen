import { z } from 'zod';
export declare const CreateOrderItemSchema: z.ZodObject<{
    productId: z.ZodNumber;
    quantity: z.ZodNumber;
    price: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const CreateOrderSchema: z.ZodObject<{
    userId: z.ZodNumber;
    items: z.ZodArray<z.ZodObject<{
        productId: z.ZodNumber;
        quantity: z.ZodNumber;
        price: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    deliveryDate: z.ZodString;
}, z.core.$strip>;
export type CreateOrderDto = z.infer<typeof CreateOrderSchema>;
