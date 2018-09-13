module.exports={
	waffle:(req,res,next) =>    
	{console.log('incoming get...');res.status(200).send("stuff retrieved!")},
	
	get:(req,res,next) =>    
	{console.log('incoming query...');res.status(200).send(`${req.params.query} retrieved!`)},
	
	post:(req,res,next) =>   
	{console.log('incoming post...');res.status(200).send("stuff created!")},
	
	put:(req,res,next) =>    
	{console.log('incoming put...');res.status(200).send(`stuff updated!`)},
	
	delete:(req,res,next) => 
	{console.log('incoming delete...');res.status(200).send(`stuff deleted!`)}
}