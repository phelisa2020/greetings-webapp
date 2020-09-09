const assert = require('assert');

const names = require('../greet');

describe('The Greet function', function(){
 it('should be able to greet phelisa in English',function(){
 	
     var greetings = names()
    
    var theMessage = greetings.greeted('English', 'lisa')

    assert.equal(theMessage, 'Hi, lisa');


 })
 it('should be able to greet phelisa in Afrikaans',function(){
     var greetings = names()
    
    var theMessageElem = greetings.greeted('Afrikaans', 'lisa')

    assert.equal(theMessageElem, 'More, lisa');


 })
 it('should be able to greet phelisa in IsiXhosa',function(){
     var greetings = names()
    
    var theMessageElem = greetings.greeted('IsiXhosa', 'lisa')

    assert.equal(theMessageElem, 'Molo, lisa');


 })
  
 it('should keeps on counting how many users has been greeted',function(){
 	var greetings = names()
    
    greetings. storeName('English', 'some')
    greetings. storeName('IsiXhosa', 'lisa')
    greetings. storeName('Afrikaans', 'kunga')
 	  assert.equal(3, greetings.counter());


 })
 it('should keeps on counting how many users has been greeted and dont count a name more than once',function(){
 	var greetings = names()
    
    greetings. storeName('English', 'some')
    greetings. storeName('IsiXhosa', 'lisa')
    greetings. storeName('Afrikaans', 'kunga')
     greetings. storeName('English', 'some')
    greetings. storeName('IsiXhosa', 'lisa')
 	  assert.equal(3, greetings.counter());


 })
 // it('should return an error message when user name is not entered',function(){
 //     var greetings = names()
    
 //    var message = greetings.errorMessage('')

 //    assert.equal(message, 'Please enter a name!');


 // })
 
 })
