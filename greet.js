module.exports = function greet(pool) {
	const namesGreeted = {}


	async function storeName(userName) {
		var regex = /[^A-Za-z]/g
		let numbers = userName.replace(regex, "")

		var name = numbers.charAt(0).toUpperCase() + numbers.slice(1).toLowerCase()
		const SQLcheck = "select greeted_name from greetings where greeted_name = $1";
		const results = await pool.query(SQLcheck, [name]);

		if (results.rowCount === 0) {
			const SQLinsert = "insert into greetings(greeted_name, greeted_count) values ($1, $2)"
			await pool.query(SQLinsert, [name, 1])
		}
		else {
			const updateSQL = "update greetings set greeted_count = greeted_count + 1 where greeted_name = $1";
			await pool.query(updateSQL, [name])
		}

	}
	// 



	async function counter() {
		let names = await pool.query("select * from greetings");
		return names.rowCount
	}



	async function greeted(languagePicked, userName) {


		var regex = /[^A-Za-z]/g
		let numbers = userName.replace(regex, "")
		var name = numbers.charAt(0).toUpperCase() + numbers.slice(1).toLowerCase()
		if (languagePicked && name) {
			// req.flash('info', 'please enter name!!!!!')
			if (languagePicked === 'English') {

				return ('Hi, ' + name);
			}
			else if (languagePicked === 'Afrikaans') {
				return ('More, ' + name);
			}

			else if (languagePicked === 'IsiXhosa') {
				return ('Molo, ' + name);
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
		const sql = "select * from greetings";
		const results = await pool.query(sql);

		const objectUser = {};
		results.rows.forEach(function (user) {
			objectUser[user.greeted_name] = user.greeted_count
		})
		return objectUser
	}

	async function getNameCounter(userName) {
		const checkingSQL = "select greeted_count from greetings where greeted_name = $1";
		const results = await pool.query(checkingSQL, [userName])
		return results.rows[0]
	}

	async function clearUsers() {
		var reset = await pool.query("delete from greetings");

		return reset
	}
	return {
		storeName,
		counter,
		greeted,
		getNames,
		errorMessages,
		getNameCounter,
		clearUsers
	}
}