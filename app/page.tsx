import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: inputText }),
    });
    const data = await response.json();
    setGeneratedText(data.output);
    setLoading(false);
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">EgoOS Prototype</h1>
      <Textarea
        placeholder="Paste your writing style (e.g., tweets, blog text) here"
        className="mb-4"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <Button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate in My Style"}
      </Button>
      {generatedText && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h2 className="font-semibold mb-2">Generated Output:</h2>
          <p>{generatedText}</p>
        </div>
      )}
    </main>
  );
}
