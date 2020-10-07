
module.exports = function greet(){
const namesGreeted = {}

function storeName(userName){
    let results = await pool.query('select greeted_name from greetings where greeted_name = $1', [userName]);
	if (results.rowCount === 0){
		await pool.query('insert into greetings (greeted_name, greeted_counter) value($1, $2)' , [userName ,1]);
  
}

await pool.query('update greetings set greeted_counter = greeted_counter +1  where greeted_name = $1',[userName]) 
}

function counter (){
	return Object.keys(namesGreeted).length

}


function greeted(languagePicked, userName){
	if (languagePicked && userName) {
		// req.flash('info', 'please enter name!!!!!')
		if(languagePicked === 'English'){

			return ('Hi, '+ userName);
}
 	else if(languagePicked === 'Afrikaans'){
 		return ('More, '+ userName);
 	}

 	else if(languagePicked === 'IsiXhosa'){
 		return ('Molo, '+ userName);
 	}
	}
 	
	}

	function errorMessages(languagePicked, userName){
		var message = '';
		if(userName === ""){
 message = "Please enter a name"; 
  	}

  	else if(!languagePicked){
 message =  "Please select language";
 
 
  	}
  	return message;
	}
function getNames(){
	return namesGreeted
}
function getNameCounter(userName){
	// console.log({userName, namesGreeted});
	// console.log(namesGreeted[userName]);

	return  namesGreeted[userName] ;
}

return {
	storeName,
	counter,
	greeted,
	getNames,
	errorMessages,
	getNameCounter

	

}
}