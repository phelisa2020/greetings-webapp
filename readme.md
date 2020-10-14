[![Build Status](https://travis-ci.org/phelisa2020/greetings-webapp.svg?branch=master)](https://travis-ci.org/phelisa2020/greetings-webapp)



async function getNameCounter(userName) {
		// console.log({userName, namesGreeted});
		// console.log(namesGreeted[userName]);
		const checkingSQL = "select greeted_count from greetings where greeted_name = $1";
		const results = await pool.query(checkingSQL, [userName])
		return results.rows[0]
	}