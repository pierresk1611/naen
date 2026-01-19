"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderSchema = exports.CreateOrderItemSchema = void 0;
const zod_1 = require("zod");
exports.CreateOrderItemSchema = zod_1.z.object({
    productId: zod_1.z.number(),
    quantity: zod_1.z.number().refine((val) => val % 6 === 0, {
        message: "Množstvo musí byť celý kartón (násobok 6)!",
    }),
    price: zod_1.z.number().optional(),
});
exports.CreateOrderSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    items: zod_1.z.array(exports.CreateOrderItemSchema),
    deliveryDate: zod_1.z.string().datetime(),
});
//# sourceMappingURL=create-order.dto.js.map