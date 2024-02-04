// App.tsx
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { api } from "~/utils/api";
import gfm from "remark-gfm";

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>("");
  const submit = api.profile.createBio.useMutation();
  const { data: b } = api.profile.getBio.useQuery({
    userId: "clrnpelmp00002i64tnml5r46",
  });

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setMarkdown(event.target.value);
  };

  const handleReply = () => {
    submit.mutate({
      userId: "clrnpelmp00002i64tnml5r46",
      bio: markdown,
    });
  };

  return (
    <div className="container mx-auto my-8 rounded bg-gray-100 p-8 shadow-lg">
      <h1 className="mb-4 text-2xl font-bold">Markdown Editor</h1>
      <div>
        <textarea
          className="h-40 w-full rounded-md border px-3 py-2"
          placeholder="Enter your markdown here..."
          value={markdown}
          onChange={handleTextareaChange}
        />
      </div>
      <button onClick={handleReply}>Reply</button>
      <div className="mt-4">
        <h2 className="mb-2 text-xl font-bold">Preview</h2>
        <ReactMarkdown remarkPlugins={[gfm]} className="prose">
          {b?.bio}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default App;
