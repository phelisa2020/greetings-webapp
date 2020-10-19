module.exports = function CategoryRoutes(greet) {

  function flashAdd(req, res) {
    req.flash('info', 'Flash Message Added');
    res.redirect('/');
  };

  async function show(req, res, next) {
try {
res.render('index');
} catch (err){
  next(err)
}
};




	async function greeting(req, res) {
  let name = req.body.nameValue;
  let language = req.body.languageType;
  let errors = ""
 
  
  
     if (!name && !language) {
          errors =  "please enter a name and select a language "
     }
  else if (!language) {
    errors = 'please select a language'
    
  }
  else if(!name) {
  errors =  'please select a name'
    
  }

  else{
    await greet.storeName(userName),
    await greet.getNameCounter(userName)


  }
  if(errors ){
    req.flash("info", errors),
    res.render("index")
  }
 else{
  res.render('index', {
    message: await greet.greeted(req.body.languageType, req.body.nameValue),
    count: await greet.counter()

  })
} 

  }
  

    async function clear(req, res) {
 try{
    await greet.clearUsers()
 }catch(err)
{}  
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
