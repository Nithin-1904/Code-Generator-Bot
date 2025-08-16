import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/shadcn/ui/form";
import { z } from "zod";
import { Textarea } from "~/shadcn/ui/textarea";
import { Button } from "~/shadcn/ui/button";
import { Loader2, SendHorizontalIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateCode } from "~/api";

const formSchema = z.object({
  prompt: z.string().min(1, { message: "Prompt is required" }),
});

const ChatArea = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | undefined>(
    undefined
  );
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleGenerate = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const result = await generateCode(data.prompt);
    setGeneratedCode(result);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center px-96 py-15 pb-0 w-full h-full">
      {isLoading ? (
        <div className="w-full h-full flex justify-start items-center gap-2">
          <Loader2 className="animate-spin text-primary" size={24} />
          <span className="animate-pulse text-2xl font-semibold text-primary">Generating your code...</span>
        </div>
      ) : generatedCode ? (
        <div className="w-full h-full m-20 flex justify-center items-center border rounded-md p-6 text-green-400 text-lg shadow-lg overflow-auto">
          <pre className="whitespace-pre-wrap animate-fade-in">
            {generatedCode}
          </pre>
        </div>
      ) : (
        <h3 className="text-6xl h-full w-full flex justify-center items-center font-bold text-primary tracking-tight">
          Welcome to Code-It...
        </h3>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleGenerate)}
          className="flex w-full justify-end items-end"
        >
          <div className="flex flex-row items-center gap-10 justify-center w-full h-full">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="w-full h-full">
                  <FormControl>
                    <Textarea
                      placeholder="Ask Anything...."
                      className="w-full placeholder:text-lg text-lg min-h-40"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size={"icon"}
              disabled={isLoading}
              className="rounded-full p-7 cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={30} />
              ) : (
                <SendHorizontalIcon size={30} />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChatArea;
