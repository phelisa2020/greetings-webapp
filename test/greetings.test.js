const assert = require('assert');
const greetings = require('../greet');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greetings_test';

const pool = new Pool({
    connectionString
});

describe('The basic database web app', function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from greetings;");

    });

    it('should greet lisa once', async function () {

        let greet = greetings(pool);

        await greet.storeName('Lisa');
        let result = await greet.getNames();

        assert.deepStrictEqual(result, { "Lisa": 1 });
    })

    it('should greet lisa 3 times', async function () {

        let greet = greetings(pool);

        await greet.storeName('Lisa');
        await greet.storeName('Lisa');
        await greet.storeName('Lisa');
        let result = await greet.getNames();

        assert.deepStrictEqual(result, { "Lisa": 3 });
    })


    it('should keeps on counting how many users has been greeted ', async function () {

        let greet = greetings(pool);

        await greet.storeName('English', 'sino');
        await greet.storeName('IsiXhosa', 'lisa');
        await greet.storeName('Afrikaans', 'lisa');


        let resultCount = await greet.counter();

        assert.deepStrictEqual(resultCount, 3);
    })


    it('should keeps on counting how many users has been greeted and dont count a name more than once', async function () {

        let greet = greetings(pool);

        await greet.storeName('English', 'sino');
        await greet.storeName('IsiXhosa', 'lisa');
        await greet.storeName('Afrikaans', 'lisa');
        await greet.storeName('Afrikaans', 'lisa');
        await greet.storeName('Afrikaans', 'lisa');

        let resultCount = await greet.counter();

        assert.deepStrictEqual(resultCount, 3);
    })


    it('should be able to greet phelisa in IsiXhosa', async function () {

        let greet = greetings(pool);
        var theMessageElem = await greet.greeted('IsiXhosa', 'Lisa')

        assert.deepStrictEqual(theMessageElem, 'Molo, Lisa');


    })
    it('should be able to greet phelisa in English', async function () {

        let greet = greetings(pool);
        var theMessageElem = await greet.greeted('English', 'Lisa')

        assert.deepStrictEqual(theMessageElem, 'Hi, Lisa');


    })
    it('should be able to greet phelisa in Afrikaans', async function () {

        let greet = greetings(pool);
        var theMessageElem = await greet.greeted('Afrikaans', 'Lisa')

        assert.deepStrictEqual(theMessageElem, 'More, Lisa');


    })


    it('should throw an error when the name is not selected', async function () {

        let greet = greetings(pool);
        var theMessageElement = await greet.errorMessages('please select a name')

        assert.deepStrictEqual(theMessageElement, '');


    })

    after(function () {
        pool.end();
    })
});
