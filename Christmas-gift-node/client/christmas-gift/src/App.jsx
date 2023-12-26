import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import santa from './assets/1087528.svg'

const GeminiGiftGenerator = () => {
  const [interests, setInterests] = useState("");
  const [foodsTheyLove, setFoodsTheyLove] = useState("");
  const [itemsTheyLove, setItemsTheyLove] = useState("");
  const [age, setAge] = useState("");
  const [budget, setBudget] = useState("");
  const [relation, setRelation] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

  const geminiText = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt =
      `I'm having a hard time deciding a holiday gift for my ${relation}. ` +
      `You're great at coming up with unique ideas about what one should present others at Christmas!! ` +
      `Their main interests are ${interests} and they love to eat ${foodsTheyLove}. ` +
      `Items they use a lot are ${itemsTheyLove}. ` +
      `They are ${age} years old and my budget for them is ${budget} dollars. ` +
      `Could you suggest some good holiday gift ideas that I could buy for them? ` +
      `Try to be as creative and delightful as possible. ` +
      `Please make the person happy with your gift ideas!!` +
      `just provide the name of the gift and no description`;

    const res = model.generateContent(prompt);
    toast.promise(res, {
      loading: "Generating your gift ideas...",
      success: <b>Successfully Generated</b>,
      error: <b>Failed to generate</b>,
    });
    const result = await res;

    const response = await result.response;

    const text = response.text();


    const generate = text.split("\n");
    console.log(generate);

    setGeneratedContent(generate);
  };

  const handleGenerateContent = async (e) => {
    e.preventDefault();
    geminiText(interests, foodsTheyLove, itemsTheyLove, age, budget, relation);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <form className="gemini-gift-form  z-0 " onSubmit={handleGenerateContent}>
        <div className="gemini-gift-generator text-white p-8 max-w-xl mx-auto  rounded shadow-lg backdrop-blur-[2px] z-10">
          <h1 className="text-3xl font-bold mb-4 text-center bject-cover transition-shadow hover:shadow-lg">
            New Year Gift Ideas Generator
          </h1>
          <div className="mb-3">
          <img src={santa} className="w-2/3 mx-auto bject-cover transition-shadow hover:shadow-lg" />
            
          </div>
          <label className="block mb-4">
            Interests:
            <input
              type="text"
              className="border rounded w-full py-2 px-3 bg-transparent"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              required
            />
          </label>
          <label className="block mb-4">
            Foods They Love:
            <input
              type="text"
              className="border rounded w-full py-2 px-3 bg-transparent"
              value={foodsTheyLove}
              onChange={(e) => setFoodsTheyLove(e.target.value)}
              required
            />
          </label>
          <label className="block mb-4">
            Items They Currently Love:
            <input
              type="text"
              className="border rounded w-full py-2 px-3 bg-transparent"
              value={itemsTheyLove}
              onChange={(e) => setItemsTheyLove(e.target.value)}
              required
            />
          </label>
          <label className="block mb-4">
            Age:
            <input
              type="number"
              className="border rounded w-full py-2 px-3 bg-transparent"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </label>
          <label className="block mb-4">
            Budget:
            <input
              type="number"
              className="border rounded w-full py-2 px-3 bg-transparent"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            />
          </label>
          <label className="block mb-4">
            Relation:
            <input
              type="text"
              className="border rounded w-full py-2 px-3 bg-transparent"
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Generate Gift Ideas
          </button>
          {generatedContent && (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2">Generated Gift Ideas:</h2>
              <div className="bg-transparent p-4 text-white rounded">
                <div />
                {/* {generatedContent} */}
                {generatedContent.map((gift) => {
                  return <li className="font-medium list-none">{gift}</li>;
                })}
              </div>
            </div>
          )}

          <div className="footer">
            <p className="text-center font-semibold text-xl mt-2 shadow-md">
              Made with ❤️ by{" "}
              <a
                className="text-blue-400"
                href="https://www.linkedin.com/in/arion-das/"
              >
                Arion
              </a>{" "}
              and{" "}
              <a
                className="text-blue-400"
                href="https://www.linkedin.com/in/aialok/"
              >
                Alok
              </a>{" "}
              : ) <br />
              🎄 Happy New Year🎄
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default GeminiGiftGenerator;
