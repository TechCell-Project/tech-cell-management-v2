import { Editor } from '@tiptap/react';
import {
  Bold,
  Code,
  Italic,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo,
  Strikethrough,
  Undo,
} from 'lucide-react';
import { Toggle, ToggleGroup } from '@/components/ui';
import FormatType from './format-type';

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex items-center justify-between p-2 rounded-md border border-input bg-background mb-3">
      <ToggleGroup className="flex flex-row items-center" type="multiple">
        <Toggle
          size="icon"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          pressed={editor.isActive('bold')}
        >
          <Bold className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="icon"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          pressed={editor.isActive('italic')}
          value="italic"
        >
          <Italic className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="icon"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          pressed={editor.isActive('strike')}
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="icon"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
          pressed={editor.isActive('bulletList')}
        >
          <List className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="icon"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
          pressed={editor.isActive('orderedList')}
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="icon"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
          pressed={editor.isActive('codeBlock')}
        >
          <Code className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="icon"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
          pressed={editor.isActive('blockquote')}
        >
          <Quote className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="icon"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus className="h-4 w-4" />
        </Toggle>

        <FormatType editor={editor} />
      </ToggleGroup>

      <ToggleGroup className="flex flex-row items-center" type="multiple">
        <Toggle
          size="icon"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="icon"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo className="h-4 w-4" />
        </Toggle>
      </ToggleGroup>
    </div>
  );
};

export default MenuBar;
