const { test, expect } = require('@playwright/test');

test('Verify "All Books" link is visible', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});

test('Verify "Login" button is visible', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const loginButton = await page.$('a[href="/login"]');
    const isLoginButtonVisible = await loginButton.isVisible();
    expect(isLoginButtonVisible).toBe(true);
});

test('Verify "Register" button is visible', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const registerButton = await page.$('a[href="/register"]');
    const isRegisterButtonVisible = await registerButton.isVisible();
    expect(isRegisterButtonVisible).toBe(true);
});

test('Verify "All Books" link is visible after user login', async ({ page }) => {
    await page.goto('localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isAllBooksLinkVisible = await allBooksLink.isVisible();
    expect(isAllBooksLinkVisible).toBe(true);
});

test('Verify "My Books" link is visible after user login', async ({ page }) => {
    await page.goto('localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    const myBooksLink = await page.$('a[href="/profile"]');
    const isAllBooksLinkVisible = await myBooksLink.isVisible();
    expect(isAllBooksLinkVisible).toBe(true);
});

test('Verify "Add Book" link is visible after user login', async ({ page }) => {
    await page.goto('localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    const addBooksLink = await page.$('a[href="/create"]');
    const isAllBooksLinkVisible = await addBooksLink.isVisible();
    expect(isAllBooksLinkVisible).toBe(true);
});

test('Verify "User Email Address" span is visible after user login', async ({ page }) => {
    await page.goto('localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    const userEmailText = await page.$eval('div>span', el => el.innerText);
    expect(userEmailText).toContain('peter@abv.bg');
});

test('Login with valid credentials', async ({ page }) => {
    await page.goto('localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:3000/catalog');
});

test('Login with empty credentials', async ({ page }) => {
    await page.goto('localhost:3000/login');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
});

test('Login with empty email field and valid password field', async ({ page }) => {
    await page.goto('localhost:3000/login');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
});

test('Login with empty password field and valid email field', async ({ page }) => {
    await page.goto('localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
});

test('Register with valid credentials', async ({ page }) => {
    await page.goto('localhost:3000/register');
    await page.fill('input[name="email"]', 'miroslav@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:3000/catalog');
});


test('Register with empty credentials', async ({ page }) => {
    await page.goto('localhost:3000/register');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test('Register with empty email field and valid password fields', async ({ page }) => {
    await page.goto('localhost:3000/register');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test('Register with empty password field and valid email and rePassword fields', async ({ page }) => {
    await page.goto('localhost:3000/register');
    await page.fill('input[name="email"]', 'miroslav@abv.bg');
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test('Register with empty rePassword field and valid email and password fields', async ({ page }) => {
    await page.goto('localhost:3000/register');
    await page.fill('input[name="email"]', 'miroslav@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test('Register with empty not matching passwords', async ({ page }) => {
    await page.goto('localhost:3000/register');
    await page.fill('input[name="email"]', 'miroslav@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '12345678');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Passwords don\'t match!');
        await dialog.accept();
    });

    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test('Add book with correct data', async ({ page }) => {
    await page.goto('localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    await page.fill('#title', 'Test Title');
    await page.fill('#description', 'This is a test description');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');

    await page.waitForURL('http://localhost:3000/catalog');

    expect(page.url()).toBe('http://localhost:3000/catalog');
});

test('Add book with empty title field', async ({ page }) => {
    await page.goto('localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    await page.fill('#description', 'This is a test description');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/create"]');

    expect(page.url()).toBe('http://localhost:3000/create');
});

test('Add book with empty description field', async ({ page }) => {
    await page.goto('localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    await page.fill('#title', 'Test title');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/create"]');

    expect(page.url()).toBe('http://localhost:3000/create');
});


test('Add book with empty image URL field', async ({ page }) => {
    await page.goto('localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    await page.fill('#title', 'Test title');
    await page.fill('#description', 'This is a test description');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/create"]');

    expect(page.url()).toBe('http://localhost:3000/create');
});

test('Login and verify all books are displayed', async ({ page }) => {
    await page.goto('localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.waitForSelector('.dashboard');

    const bookElements = await page.$$('.other-books-list li');
    expect(bookElements.length).toBeGreaterThan(0);
});

test('Login and verify that no books are displayed when db is empty', async ({ page }) => {
    await page.goto('localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.waitForSelector('.dashboard');

    const noBooksMessage = await page.textContent('.no-books');
    expect(noBooksMessage).toBe('No books in database!');
});

test.only('Login and navigate to Details page', async ({ page }) => {
    await page.goto('localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/catalog"]');

    await page.waitForSelector('.otherBooks');

    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');

    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe('Test Title');
});