const assert = require('assert');
const greetings = require('../greet');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greetings_test';

const pool = new Pool({
    connectionString
});

describe('The basic database web app', function(){

    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("delete from greetings;");
        
    });

    it('should pass the db test', async function(){
        
        // the Factory Function is called CategoryService
        let greet = greetings(pool);
       
    });

	 
		it('should greet lisa once',async function(){
		 
		  let greet = greetings(pool);
	
		  await greet.storeName('Lisa');
		  let result = await greet.getNames();
	   
		 assert.deepStrictEqual(result, {"Lisa":1});
	  })

      it('should greet lisa twice',async function(){
		 
        let greet = greetings(pool);
  
        await greet.storeName('Lisa');
        await greet.storeName('Lisa');
        await greet.storeName('Lisa');
        let result = await greet.getNames();
     
       assert.deepStrictEqual(result, {"Lisa":3});
    })

    it('should keeps on counting how many users has been greeted',async function(){
		 
        let greet = greetings(pool);
  
        await greet.storeName('sino');
        await greet.storeName('azi');
        await greet.storeName('busi');
       
        let resultCount = await greet.counter();
     
       assert.deepStrictEqual(resultCount, 3);
    })

    it('should keeps on counting how many users has been greeted and dont count a name more than once',async function(){
		 
        let greet = greetings(pool);
  
        await greet.storeName('sino');
        await greet.storeName('azi');
        await greet.storeName('busi');
        await greet.storeName('sino');
        await greet.storeName('sino');

       
        let resultCount = await greet.counter();
     
       assert.deepStrictEqual(resultCount, 3);
    })




//     it('should keeps on counting how many users has been greeted',function(){
//         let greet = greetings(pool);
  
//   await greet. storeName('English', 'some');
//   await greet. storeName('IsiXhosa', 'lisa');
//   await greet. storeName('Afrikaans', 'kunga');
//     assert.deepStrictEqual(3, greet.counter());

//   it('should be able to greet phelisa in Afrikaans',function(){
//    var greetings = names()
  
//   var theMessageElem = greetings.greeted('Afrikaans', 'lisa')

//   assert.equal(theMessageElem, 'More, lisa');


// })
// it('should be able to greet phelisa in IsiXhosa',function(){
//    var greetings = names()
  
//   var theMessageElem = greetings.greeted('IsiXhosa', 'lisa')

//   assert.equal(theMessageElem, 'Molo, lisa');


// })



// })
// it('should keeps on counting how many users has been greeted and dont count a name more than once',function(){
//   var greetings = names()
  
//   greetings. storeName('English', 'some')
//   greetings. storeName('IsiXhosa', 'lisa')
//   greetings. storeName('Afrikaans', 'kunga')
//    greetings. storeName('English', 'some')
//   greetings. storeName('IsiXhosa', 'lisa')
//     assert.equal(3, greetings.counter());


// })


    after(function(){
        pool.end();
    })
});
