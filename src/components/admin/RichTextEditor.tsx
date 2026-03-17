import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExt from "@tiptap/extension-image";
import LinkExt from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold, Italic, Strikethrough, Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Code, Minus, Link, Image, Undo, Redo
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = "Start writing..." }: RichTextEditorProps) {
  const [mediaOpen, setMediaOpen] = useState(false);
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [mediaSearch, setMediaSearch] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExt,
      LinkExt.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  if (!editor) return null;

  const openMediaPicker = async () => {
    const { data } = await supabase.from("media").select("*").order("created_at", { ascending: false });
    setMediaItems((data || []).filter((m: any) => m.type?.startsWith("image/")));
    setMediaOpen(true);
  };

  const insertMediaImage = (item: any) => {
    editor.chain().focus().setImage({ src: item.url, alt: item.alt_text || item.name }).run();
    setMediaOpen(false);
  };

  const addImageByUrl = () => {
    const url = window.prompt("Image URL:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addLink = () => {
    const url = window.prompt("Link URL:");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const filteredMedia = mediaItems.filter((m) => m.name.toLowerCase().includes(mediaSearch.toLowerCase()));

  const ToolBtn = ({ onClick, active, children, title }: { onClick: () => void; active?: boolean; children: React.ReactNode; title?: string }) => (
    <Button type="button" variant="ghost" size="icon" title={title}
      className={`h-8 w-8 ${active ? "bg-primary/20 text-primary" : "text-muted-foreground"}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );

  return (
    <>
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <div className="flex flex-wrap gap-0.5 border-b border-border p-1 bg-muted/30">
          <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}><Bold className="h-4 w-4" /></ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}><Italic className="h-4 w-4" /></ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")}><Strikethrough className="h-4 w-4" /></ToolBtn>
          <div className="w-px bg-border mx-1" />
          <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })}><Heading1 className="h-4 w-4" /></ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}><Heading2 className="h-4 w-4" /></ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}><Heading3 className="h-4 w-4" /></ToolBtn>
          <div className="w-px bg-border mx-1" />
          <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}><List className="h-4 w-4" /></ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}><ListOrdered className="h-4 w-4" /></ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}><Quote className="h-4 w-4" /></ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")}><Code className="h-4 w-4" /></ToolBtn>
          <div className="w-px bg-border mx-1" />
          <ToolBtn onClick={addLink} title="Add link"><Link className="h-4 w-4" /></ToolBtn>
          <ToolBtn onClick={openMediaPicker} title="Insert image from media library"><Image className="h-4 w-4" /></ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()}><Minus className="h-4 w-4" /></ToolBtn>
          <div className="w-px bg-border mx-1" />
          <ToolBtn onClick={() => editor.chain().focus().undo().run()}><Undo className="h-4 w-4" /></ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().redo().run()}><Redo className="h-4 w-4" /></ToolBtn>
        </div>
        <EditorContent editor={editor} className="prose prose-invert max-w-none p-4 min-h-[300px] focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[300px] [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0 [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none" />
      </div>

      <Dialog open={mediaOpen} onOpenChange={setMediaOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden bg-card border-border">
          <DialogHeader>
            <DialogTitle>Insert Image from Media Library</DialogTitle>
          </DialogHeader>
          <Input placeholder="Search media..." value={mediaSearch} onChange={(e) => setMediaSearch(e.target.value)} className="mb-4" />
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 overflow-y-auto max-h-[50vh] pr-1">
            {filteredMedia.map((item) => (
              <button key={item.id} onClick={() => insertMediaImage(item)}
                className="aspect-square rounded-lg overflow-hidden border border-border hover:border-primary transition-colors">
                <img src={item.url} alt={item.alt_text || item.name} className="w-full h-full object-cover" />
              </button>
            ))}
            {filteredMedia.length === 0 && <p className="col-span-full text-center text-muted-foreground py-8">No images found. Upload images in Media Library first.</p>}
          </div>
          <div className="pt-3 border-t border-border">
            <Button variant="outline" size="sm" onClick={addImageByUrl}>Or paste image URL</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
