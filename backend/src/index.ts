import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body as { prompt: string };
    const formatted_prompt = `<|begin_of_text|><|start_header_id|>user<|end_header_id|>
    ${prompt}
    <|eot_id|>
    <|start_header_id|>assistant<|end_header_id|>`;

    const command = new InvokeModelCommand({
      modelId: "meta.llama3-70b-instruct-v1:0",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        prompt: formatted_prompt,
        max_gen_len: 500,
        temperature: 0.7,
      }),
    });

    const response = await client.send(command);
    const raw = new TextDecoder().decode(response.body);
    const responseBody = JSON.parse(raw);

    // LLaMA outputs under `generation`
    res.json({ output: responseBody.generation || raw });
  } catch (error) {
    console.error(error);
  }
});

app.listen(5000, () => {
  console.log("🚀 Backend running on http://localhost:5000");
});
