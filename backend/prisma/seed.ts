import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // 1. Create Users
    const user1 = await prisma.user.upsert({
        where: { email: 'gastro@client.sk' },
        update: {},
        create: {
            email: 'gastro@client.sk',
            password: 'hashed_password', // In production use bcrypt
            companyName: 'Gastro Palace s.r.o.',
            ico: '12345678',
            priceLevelId: 1,
            city: 'Bratislava',
            street: 'Hlavná 1',
        },
    });

    const admin = await prisma.user.upsert({
        where: { email: 'admin@naen.sk' },
        update: {},
        create: {
            email: 'admin@naen.sk',
            password: 'admin_password',
            companyName: 'NAEN HQ',
            priceLevelId: 0, // 0 for internal/admin
        },
    });

    // 2. Create Products
    const products = [
        {
            sku: 'NAEN-001',
            name: 'Prosecco Spumante - Extray Dry',
            prices: [
                { priceLevelId: 1, price: 12.50 },
                { priceLevelId: 2, price: 10.90 },
            ],
            stockKros: 120,
        },
        {
            sku: 'NAEN-002',
            name: 'Pinot Grigio Delle Venezie',
            prices: [
                { priceLevelId: 1, price: 8.90 },
            ],
            stockKros: 48,
        },
        {
            sku: 'NAEN-003',
            name: 'Anarchy Cuvée - Red Blend',
            prices: [
                { priceLevelId: 1, price: 15.00 },
            ],
            stockKros: 4, // Critical stock
        },
    ];

    for (const p of products) {
        await prisma.product.upsert({
            where: { sku: p.sku },
            update: {
                stockKros: p.stockKros,
            },
            create: {
                sku: p.sku,
                name: p.name,
                stockKros: p.stockKros,
                prices: {
                    create: p.prices,
                },
            },
        });
    }

    // 3. Create Sample Orders
    await prisma.order.create({
        data: {
            userId: user1.id,
            totalPrice: 150.00,
            status: 'COMPLETED',
            items: {
                create: [
                    { productId: 1, quantity: 12, price: 12.50 },
                ],
            },
        },
    });

    console.log('Seeding complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
