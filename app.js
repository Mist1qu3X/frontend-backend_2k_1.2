const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let products = [
    {id: 1, name: 'Футболка', price: 1500},
    {id: 2, name: 'Джинсы', price: 3500},
    {id: 3, name: 'Кроссовки', price: 5500}
];

app.get('/', (req, res) => {
    res.send('Сервер запущен!');
});

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if(product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Товар не найден' });
    }
});

app.post('/products', (req, res) => {
    const { name, price } = req.body;

    if(!name || !price) {
        return res.status(400).json({ message: 'Название и цена обязательны' });
    }

    const newProduct = {
        id: Date.now(),
        name: name,
        price: price
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.patch('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, price } = req.body;
    const product = products.find(p => p.id === id);

    if(!product) {
        return res.status(404).json({ message: 'Товар не найден' });
    }

    if(name !== undefined) product.name = name;
    if(price !== undefined) product.price = price;

    res.json(product);
});

app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);

    if(productIndex === -1) {
        return res.status(404).json({ message: 'Товар не найден' });
    }

    products.splice(productIndex, 1);
    res.json({ message: 'Товар удалён' });
});

app.listen(port, () => {
    console.log(`Сервер успешно запущен на http://loclahost:${port}`);
});