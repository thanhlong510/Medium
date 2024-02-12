import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { FaBold, FaUnderline } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import Placeholder from "@tiptap/extension-placeholder";
import { FaStrikethrough } from "react-icons/fa";
interface MenuBarProps {
  editor: ReturnType<typeof useEditor> | null;
}

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }
  return (
    <div className="mt-10 flex items-center space-x-1">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-slate-500 p-2 " : "p-2"}
      >
        <FaBold className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-slate-500 p-2  " : "p-2"}
      >
        <FaItalic className="h-4 w-4" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("underline") ? "bg-slate-500 p-2  " : "p-2"}
      >
        <FaStrikethrough className="h-4 w-4" />
      </button>
      
    </div>
  );
};

interface TipTapProps {
  content: string;
  setContent: (a: string) => void;
}

const TipTap: React.FC<TipTapProps> = ({ content, setContent }) => {
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something …",
      }),
    ],
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
    content: content,
    editorProps: {
      attributes: {
        class:
          "rounded-md border min-h-[200px] border-input px-2 py-2 text-justify",
      },
    },
  });

  return (
    <div>
      <div className="mb-3 ">
        <MenuBar editor={editor} />
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTap;
