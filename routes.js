module.exports = function CategoryRoutes(greet) {

  function flashAdd(req, res) {
    req.flash('info', 'Flash Message Added');
    res.redirect('/');
  };
	
  async function show(req, res) {

  res.render('index', {
    
  });
};

	async function greeting(req, res) {
  let name = req.body.nameValue;
  if(name){
    await greet.storeName(name)

  }
  let language = req.body.languageType;
  if (name === '') {
    req.flash('info', 'please enter name')
  }
  else if (language === undefined && name != '') {
    req.flash('info', 'please select a language')
  }
 
  res.render('index', {
    message: await greet.greeted(req.body.languageType, req.body.nameValue),
    count: await greet.counter()

  })
};


    async function clear(req, res) {
 
    await greet.clearUsers()
  
  
  res.redirect('/')
};

async function get(req, res) {
  var greetedNames = await greet.getNames();
  for (const list in greetedNames) {

  }
  res.render('greeted', {
    names: greetedNames

  })

};

async function getCount(req, res) {
  const userName = req.params.userName;
  var count = await greet.getNameCounter(userName);


  //it redirect the default route
  res.render("greeted", {
    name: `Hello, ${userName} have been greeted ${count} times`
  });


};

 async function flash(req, res) {
  req.flash('info', 'please enter name');
  res.redirect('/');
};


    return{
        show,
        flash,
        getCount,
         get,
         clear,
         greeting,
         flashAdd



    }
}
