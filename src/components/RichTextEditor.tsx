import React, { useRef, useCallback } from 'react';
import {
    Bold,
    Italic,
    Underline,
    List,
    ListOrdered,
    Link as LinkIcon,
    Heading1,
    Heading2
} from 'lucide-react';
import '../styles/components/RichTextEditor.css';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
    value,
    onChange,
    placeholder = "İçeriğinizi buraya yazın..."
}) => {
    const editorRef = useRef<HTMLDivElement>(null);

    // İlk render'da value'yu set et
    React.useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value;
        }
    }, []);

    const handleInput = useCallback(() => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    }, [onChange]);

    const executeCommand = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
    };

    const insertLink = () => {
        const url = prompt('Link URL\'sini girin:');
        if (url) {
            executeCommand('createLink', url);
        }
    };

    const formatBlock = (tag: string) => {
        executeCommand('formatBlock', tag);
    };

    return (
        <div className="rich-text-editor">
            <div className="editor-toolbar">
                <div className="toolbar-group">
                    <button
                        type="button"
                        className="toolbar-button"
                        onClick={() => formatBlock('h1')}
                        title="Başlık 1"
                    >
                        <Heading1 size={18} />
                    </button>
                    <button
                        type="button"
                        className="toolbar-button"
                        onClick={() => formatBlock('h2')}
                        title="Başlık 2"
                    >
                        <Heading2 size={18} />
                    </button>
                </div>

                <div className="toolbar-divider" />

                <div className="toolbar-group">
                    <button
                        type="button"
                        className="toolbar-button"
                        onClick={() => executeCommand('bold')}
                        title="Kalın (Ctrl+B)"
                    >
                        <Bold size={18} />
                    </button>
                    <button
                        type="button"
                        className="toolbar-button"
                        onClick={() => executeCommand('italic')}
                        title="İtalik (Ctrl+I)"
                    >
                        <Italic size={18} />
                    </button>
                    <button
                        type="button"
                        className="toolbar-button"
                        onClick={() => executeCommand('underline')}
                        title="Altı Çizili (Ctrl+U)"
                    >
                        <Underline size={18} />
                    </button>
                </div>

                <div className="toolbar-divider" />

                <div className="toolbar-group">
                    <button
                        type="button"
                        className="toolbar-button"
                        onClick={() => executeCommand('insertUnorderedList')}
                        title="Madde İşaretli Liste"
                    >
                        <List size={18} />
                    </button>
                    <button
                        type="button"
                        className="toolbar-button"
                        onClick={() => executeCommand('insertOrderedList')}
                        title="Numaralı Liste"
                    >
                        <ListOrdered size={18} />
                    </button>
                </div>

                <div className="toolbar-divider" />

                <div className="toolbar-group">
                    <button
                        type="button"
                        className="toolbar-button"
                        onClick={insertLink}
                        title="Link Ekle"
                    >
                        <LinkIcon size={18} />
                    </button>
                </div>
            </div>

            <div
                ref={editorRef}
                className="editor-content"
                contentEditable
                onInput={handleInput}
                data-placeholder={placeholder}
                suppressContentEditableWarning
            />
        </div>
    );
};

export default RichTextEditor;
