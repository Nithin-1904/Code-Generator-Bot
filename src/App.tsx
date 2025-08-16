"use client";
import ChatArea from "./components/ChatArea";
import { TooltipProvider } from "./shadcn/ui/tooltip";

function App() {
  return (
    <TooltipProvider>
      <div className={"relative flex min-h-screen flex-col bg-foreground text-accent"}>
        <div className={"flex flex-1 max-h-[calc(100vh-4.2rem)] bg-foreground"}>
          <div className={"flex-1 overflow-auto"}>
            <ChatArea />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default App;
