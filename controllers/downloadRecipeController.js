const downloadRecipes = require('../models/downloadModel')

//add to downloadRecipes
exports.addToDownloadRecipeController = async(req,res)=>{
    console.log("Inside addToDownloadRecipeController");
    const {id} = req.params
    const userId = req.userId
    const {name,image,cuisine} = req.body
    console.log(id,name,image,cuisine);
    try{
        //check recipe already in download
        const exixtingRecipe = await downloadRecipes.findOne({recipeId:id})
        if(exixtingRecipe){
            //increment count of recipe by 1 - update
            exixtingRecipe.count +=1
            await exixtingRecipe.save()
            res.status(200).json(exixtingRecipe)

        }else{
            // add recipe to your model - insert
            const newRecipe = new downloadRecipes({
                recipeId:id,recipeName:name,recipeImage:image,recipeCuisine:cuisine,count:1,userId
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }

    }catch(err){
        res.status(401).json(err)
    }
    
    
}

// get user download recipes
exports.getUserDownloadListController = async (req,res)=>{
    console.log("Inside getUserDownloadListController");
    //get userId from jwtmiddleware
    const userId = req.userId
    // find documents with useris from model
    try {
        const allUserDownloads = await downloadRecipes.find({userId})
        res.status(200).json(allUserDownloads)
    } catch (err) {
        res.status(401).json(err)
    }
    
}

// get all download recipes
exports.getAllDownloadListController = async (req,res)=>{
    console.log("Inside getAllDownloadListController");
   
    // find documents from model
    try {
        const allDownloads = await downloadRecipes.find()
        res.status(200).json(allDownloads)
    } catch (err) {
        res.status(401).json(err)
    }
    
}