

const  testServer = async(req,res)=>{
    res.status(200).json({
      message: "Test route hit successfully"
    })
  }


module.exports ={testServer}