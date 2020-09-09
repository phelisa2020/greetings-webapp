
module.exports = function greet(){
const namesGreeted = {}

function storeName(userName){
	// if(userName){
	if (namesGreeted[userName] === undefined){
     namesGreeted[userName] = 0;
  
}

 namesGreeted[userName]++
}

function counter (){
	return Object.keys(namesGreeted).length

}


function greeted(languagePicked, userName){
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
	console.log({userName, namesGreeted});
	console.log(namesGreeted[userName]);

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