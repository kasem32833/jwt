
const findItemById = async(Model, id ,options)=>{
    const item = await Model.findById(id, options);
    if(!item){
        console.log(`${Model.modelName} does not exist`);
    }else{
        return item;
    }
}

module.exports=  {findItemById}