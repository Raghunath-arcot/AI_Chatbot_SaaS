import { NextFunction, Request, Response} from "express";
import User from "../models/User.js";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";
import { configureOpenAI } from "../config/openai-config.js";

 
export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {message} = req.body; 
    try {
        const user = await User.findById(res.locals.jwtData.id);
    if(!user) return res.status(401).json({message: "User not registered or token malfunctioned"});

    //grab chats of the user
    const chats = user.chats.map(({role, content}) => ({role, content})) as ChatCompletionRequestMessage[];
    chats.push({content: message, role: "user"});
    user.chats.push({content: message, role: "user"});
    //send all chats with new one to OpenAI API
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);
    //get latest response
    const chatResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: chats,
    });
    user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({chats: user.chats});


    //get all response
    } catch (error) {
        console.log(error);
        //we don't know what the error actually is so 500
        return res.status(500).json({message: "Something Went Wrong"});
    }
    

};

export const sendChatsTouser = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{

    //Login
        const user = await User.findById(res.locals.jwtData.id);

        
        if(!user){
            return res.status(401).send("User not registered or token malfunctioned");
        }
        console.log(user._id.toString(), res.locals.jwtData.id);



        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't matched");
        }

       
       






        return res.status(200).json({message: "OK", chats: user.chats});
}



catch(error){
    console.log(error);
    return res.status(200).json({message: "ERROR", cause: error.message});
}
};


export const deleteChats = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{

    //Login
        const user = await User.findById(res.locals.jwtData.id);

        
        if(!user){
            return res.status(401).send("User not registered or token malfunctioned");
        }
        console.log(user._id.toString(), res.locals.jwtData.id);



        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't matched");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();



        return res.status(200).json({message: "OK"});
}



catch(error){
    console.log(error);
    return res.status(200).json({message: "ERROR", cause: error.message});
}
};
