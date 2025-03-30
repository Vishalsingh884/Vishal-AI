import { useState } from "react"; import { Card, CardContent } from "@/components/ui/card"; import { Input } from "@/components/ui/input"; import { Button } from "@/components/ui/button"; import { motion } from "framer-motion"; import { Send } from "lucide-react";

export default function VishalAI() { const [messages, setMessages] = useState([]); const [input, setInput] = useState(""); const [loading, setLoading] = useState(false);

const sendMessage = async () => { if (!input.trim()) return;

const userMessage = { role: "user", text: input };
setMessages([...messages, userMessage]);
setInput("");
setLoading(true);

try {
  const response = await fetch("https://your-backend-url.com/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input })
  });
  
  const data = await response.json();
  const botMessage = { role: "bot", text: data.reply };
  setMessages([...messages, userMessage, botMessage]);
} catch (error) {
  console.error("Error fetching response", error);
}

setLoading(false);

};

return ( <div className="flex flex-col h-screen bg-gray-900 text-white p-4"> <h1 className="text-2xl font-bold text-center mb-4">Vishal AI</h1> <div className="flex-1 overflow-y-auto space-y-3 p-2"> {messages.map((msg, index) => ( <motion.div key={index} className={p-3 rounded-lg max-w-xs ${msg.role === "user" ? "bg-blue-600 ml-auto" : "bg-gray-700"}} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}> {msg.text} </motion.div> ))} </div> <div className="flex items-center gap-2 mt-3"> <Input className="flex-1 bg-gray-800 text-white border border-gray-600 rounded-lg p-2" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask something..." disabled={loading} /> <Button onClick={sendMessage} disabled={loading} className="bg-blue-600 p-2 rounded-lg"> <Send size={20} /> </Button> </div> </div> ); }

