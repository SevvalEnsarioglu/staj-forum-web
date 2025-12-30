import React, { useRef, useCallback, useState } from 'react';
import {
    Bold,
    Italic,
    Underline,
    List,
    ListOrdered,
    Link as LinkIcon,
    Heading1,
    Heading2,
    Palette,
    Type
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
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showFontSizePicker, setShowFontSizePicker] = useState(false);

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

    const changeTextColor = (color: string) => {
        executeCommand('foreColor', color);
        setShowColorPicker(false);
    };

    const changeFontSize = (size: string) => {
        executeCommand('fontSize', size);
        setShowFontSizePicker(false);
    };

    const colors = [
        '#000000', // Siyah
        '#EF4444', // Kırmızı
        '#F97316', // Turuncu
        '#FBBF24', // Sarı
        '#22C55E', // Yeşil
        '#3B82F6', // Mavi
        '#8B5CF6', // Mor
        '#EC4899', // Pembe
    ];

    const fontSizes = [
        { label: 'Küçük', value: '1' },
        { label: 'Normal', value: '3' },
        { label: 'Büyük', value: '5' },
        { label: 'Çok Büyük', value: '7' },
    ];

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

                {/* Font Boyutu Dropdown */}
                <div className="toolbar-group dropdown-group">
                    <div className="dropdown-container">
                        <button
                            type="button"
                            className="toolbar-button dropdown-button"
                            onClick={() => setShowFontSizePicker(!showFontSizePicker)}
                            title="Font Boyutu"
                        >
                            <Type size={18} />
                            <span>Boyut</span>
                        </button>
                        {showFontSizePicker && (
                            <div className="dropdown-menu">
                                {fontSizes.map((size) => (
                                    <button
                                        key={size.value}
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() => changeFontSize(size.value)}
                                    >
                                        {size.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="toolbar-divider" />

                {/* Renk Picker */}
                <div className="toolbar-group dropdown-group">
                    <div className="dropdown-container">
                        <button
                            type="button"
                            className="toolbar-button dropdown-button"
                            onClick={() => setShowColorPicker(!showColorPicker)}
                            title="Metin Rengi"
                        >
                            <Palette size={18} />
                            <span>Renk</span>
                        </button>
                        {showColorPicker && (
                            <div className="color-picker">
                                {colors.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        className="color-button"
                                        style={{ backgroundColor: color }}
                                        onClick={() => changeTextColor(color)}
                                        title={color}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
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