import { GoogleGenerativeAI } from '@google/generative-ai';
import { Chat } from '../models/chat.model.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const sendChat = async (request,response) => {
    
    try {
        const {userId,question} = request.body;
        if(!userId || !question || typeof question !== 'string') {
            return response.status(400).json({error:"invalid input"})
        }

        const prompt = `You are a professional Christian apologist with expertise in theology and apologetics.
      Answer the following question in a clear, respectful, and biblically grounded manner.
      Format your response in Markdown, using headings, lists, and emphasis where appropriate.
      Question: ${question}`;
    
        const results = await model.generateContent(prompt)
        const newresponse = await results.response.text();

        const chatResponse = new Chat({
            userId,
            question,
            newresponse,
            timestamp:new Date()
        })

        await chatResponse.save()

        return response.status(200).json({answer:newresponse})


    } catch (error) {
        console.error('Error:', error);
    if (error.message.includes('Quota exceeded')) {
      return response.status(429).json({ error: 'API quota exceeded, please try again later' });
    }
    response.status(500).json({ error: 'Internal server error' });
    }
}

export const getChatHistory = async (request,response) => {
    try {
        const {userId} = request.params;
        const chats = await Chat.find({userId}).sort({timestamp: -1})
        return response.status(200).json(chats)
    } catch (error) {
        console.error('Error fetching history:', error);
    response.status(500).json({ error: 'Internal server error' });
    }
}