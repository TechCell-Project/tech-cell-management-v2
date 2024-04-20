'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { ChangeEventHandler } from 'react';
import MenuBar from './menu-bar';

type TiptapProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const Tiptap = ({ value, onChange }: TiptapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
        alignments: ['left', 'center', 'right'],
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          'rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background min-h-[150px]',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML() as any);
    },
  });

  return (
    <div className="flex flex-col justify-stretch min-h-[250px]">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
