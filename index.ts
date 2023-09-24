import express from "express";
import * as AI from './ai';
import * as DB from './db';
import { CharacterTextSplitter } from "langchain/text_splitter";
import multer from "multer";
import { Document } from "langchain/document";
import { RunnablePassthrough, RunnableSequence } from "langchain/schema/runnable";
import { PromptTemplate } from "langchain/prompts";
import { StringOutputParser } from "langchain/schema/output_parser";

const app = express();
const port = 8080;
const f = multer();

app.get("/", async (req, res) =>  {
  res.send("Hello");
});

app.post("/add_to_store", f.fields([]) , async (req, res) => {
  try {
    const embedding = await AI.getVendorEmbeddings(req.body.vendor as string)
    const store = await DB.getStore(embedding)

    const text = req.body.text as string;
    const splitter = new CharacterTextSplitter({
      separator: " ",
      chunkSize: 100,
      chunkOverlap: 25,
    });

    const output = await splitter.createDocuments([text]);

    for(const doc of output) {
      store.addDocuments([
        {
          pageContent: doc.pageContent, metadata: doc.metadata
        }
      ])
    }

    res.send({message: 'Success'})
  } catch (error) {
    res.send({message: "Error saving"})
  }
});

app.post("/sim_search", f.fields([]), async (req, res) => {
  try {
    const embedding = await AI.getVendorEmbeddings(req.body.vendor as string)
    const store = await DB.getStore(embedding)
    const result = await store.similaritySearchWithScore(req.body.text)

    res.send({message: "Success", result: result})
  } catch (error) {
    res.send({message: "Error saving"})
  }
});

app.post("/prompt", f.fields([]), async (req, res) => {
  let promptText;
  let result;
  
  const llm = await AI.getVendor(req.body.vendor, req.body.model)
  if(req.body.with_context === 'true' ) {
    promptText = 'With the given context, answer the question. If you do not know the answer, say "I do not know". Do not make up answers\n\nContext:{context}\n\nQuestion:{question}'
    const embedding = await AI.getVendorEmbeddings(req.body.vendor as string)
    const retriever = (await DB.getStore(embedding)).asRetriever()
    const serializeDocs = (docs: Document[]) => docs.map((doc) => doc.pageContent).join("\n");
    const prompt = PromptTemplate.fromTemplate(promptText)

    const chain = RunnableSequence.from([
      {
        context: retriever.pipe(serializeDocs),
        question: new RunnablePassthrough(),
      },
      prompt,
      llm,
      new StringOutputParser(),
    ]);

    result = await chain.invoke(req.body.text)
  } else {
    promptText = 'Answer the question. If you do not know the answer, say "I do not know". Do not make up answers\n\nQuestion:{question}'
    const prompt = PromptTemplate.fromTemplate(promptText).pipe(llm);
    result = await prompt.invoke({question: req.body.text})
  }

  res.send({
    prompt: prompt,
    result: result
  })
});
  

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});