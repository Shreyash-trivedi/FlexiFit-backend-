import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config();

const client = new HfInference(process.env.HF_TOKEN);

export const chat = async (req, res) => {
  try {
    const { messages } = req.body; // Now expecting an array of messages
    let reply = "";

    // Format messages for the model
    const formattedMessages = messages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    }));

    const stream = client.chatCompletionStream({
      model: "meta-llama/Llama-3.2-3B-Instruct",
      messages: formattedMessages,
      max_tokens: 1000,
    });

    for await (const chunk of stream) {
      if (chunk.choices && chunk.choices.length > 0) {
        const newContent = chunk.choices[0].delta.content;
        reply += newContent;
      }
    }
    return res.status(200).json({ reply });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

export const struct = async (req, res, next) => {
  try {
    const message = req.body.data;
    let out = "";

    const format = `{
      workout: {
        monday: {
          tag: "type of exercise",
          exercise: [ name: "name of the exercise", sets: "number of sets", reps: "number of reps" ]
        },
        tuesday: {
          tag: "type of exercise",
          exercise: [ name: "name of the exercise", sets: "number of sets", reps: "number of reps" ]
        },
        wednesday: {
          tag: "type of exercise",
          exercise: [ name: "name of the exercise", sets: "number of sets", reps: "number of reps" ]
        },
        thursday: {
          tag: "type of exercise",
          exercise: [ name: "name of the exercise", sets: "number of sets", reps: "number of reps" ]
        },
        friday: {
          tag: "type of exercise",
          exercise: [ name: "name of the exercise", sets: "number of sets", reps: "number of reps" ]
        },
        saturday: {
          tag: "type of exercise",
          exercise: [ name: "name of the exercise", sets: "number of sets", reps: "number of reps" ]
        },
        sunday: {
          tag: "type of exercise",
          exercise: [ name: "name of the exercise", sets: "number of sets", reps: "number of reps" ]
        },
      },
    }`;

    const stream = client.chatCompletionStream({
      model: "meta-llama/Llama-3.2-3B-Instruct",
      messages: [
        {
          role: "user",
          content: `structure the given text in a json named workout with the syntax ${format},  don't use markdown formatting and return only JSON no other text, text: ${message}`,
        },
      ],
      max_tokens: 1500,
    });

    for await (const chunk of stream) {
      if (chunk.choices && chunk.choices.length > 0) {
        const newContent = chunk.choices[0].delta.content;
        out += newContent;
      }
    }
    return res.status(200).json({ out });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
