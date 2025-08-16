// Example API call
export async function generateCode(prompt: string) {
  const response = await fetch("http://localhost:5000/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if(!response.ok){
    throw new Error(`API Error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.output as string;
}
