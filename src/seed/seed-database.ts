import { initialData } from './seed';
import prisma from '../lib/prisma';
import { SeedCountry, countries } from './seed-countries';

async function main () {

    // Borrar registros previos
    await prisma.country.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
    
    //Paises
    await prisma.country.createMany({
        data: countries
    });
    
    // Categorias
    const {categories, products, users} = initialData;

    await prisma.user.createMany({
        data: users
    });

    const categoriesData = categories.map((category) => ({
        name: category
    }));

    await prisma.category.createMany({
        data: categoriesData
    });

    const categoriesDB = await prisma.category.findMany();
    const categoriesMap = categoriesDB.reduce((acum, category) => {

        acum[category.name.toLocaleLowerCase()] = category.id;

        return acum;
    }, {} as Record<string, string>);

    products.forEach( async (product) => {
        const {type, images, ...rest} = product;
        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        });

        const imagesData = images.map((image) => ({
            url: image,
            productId: dbProduct.id
        }));

        await prisma.productImage.createMany({
            data: imagesData
        });
    });


    console.log('Seed ejecutado correctamente');
}

(() => {
    if(process.env.NODE_ENV === 'production') return;
    main();
})();