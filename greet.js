
module.exports = function greet(pool) {
	const namesGreeted = {}

	async function storeName(userName) {

		const SQLcheck = "select greeted_name from greetings where greeted_name = $1";
		 const results = await pool.query(SQLcheck, [userName]);
		 console.log(results.rowCount);

  if(results.rowCount === 0 ){
			const SQLinsert = "insert into greetings(greeted_name, greeted_count) values ($1, $2)"
			await pool.query(SQLinsert, [userName, 1])
		}
		 else {
			const updateSQL = "update greetings set greeted_count = greeted_count + 1 where greeted_name = $1";
			await pool.query(updateSQL, [userName])
		 }
			
		 }
		
	

	async function counter() {
		let names = await pool.query ("select * from greetings");
     return names.rowCount
	}
	
	

	async function greeted(languagePicked, userName) {
		if (languagePicked && userName) {
			// req.flash('info', 'please enter name!!!!!')
			if (languagePicked === 'English') {

				return ('Hi, ' + userName);
			}
			else if (languagePicked === 'Afrikaans') {
				return ('More, ' + userName);
			}

			else if (languagePicked === 'IsiXhosa') {
				return ('Molo, ' + userName);
			}

		}
	}

		async function errorMessages(languagePicked, userName) {
			var message = '';
			if (userName === "") {
				message = "Please enter a name";
			}

			else if (!languagePicked) {
				message = "Please select language"
			}
			return message;
		}

		async function getNames() {
			//namesGreeted[userName] = 0;
			const sql = "select * from greetings";
			const results = await pool.query(sql);

			const objectUser = {};
			results.rows.forEach(function (user) {
				objectUser[user.greeted_name] = user.greeted_count
			})
        	return objectUser
		}
	
	async function getNameCounter(userName) {
		// console.log({userName, namesGreeted});
		// console.log(namesGreeted[userName]);
const checkingSQL = "select * from greetings where greeted_name = $1";
const results = await pool.query(checkingSQL, [userName])
return results.rows[0]["greeted_count"]
		return namesGreeted[userName];
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