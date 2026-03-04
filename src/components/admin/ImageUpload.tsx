import { useRef, useState } from 'react';
import { Upload, X, ImageIcon, Link } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Props {
    value: string | null;
    onChange: (url: string | null) => void;
    bucket?: string;
    label?: string;
    aspectRatio?: 'square' | 'video' | 'wide' | 'any';
}

export default function ImageUpload({ value, onChange, bucket = 'shop-assets', label, aspectRatio = 'any' }: Props) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [urlMode, setUrlMode] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            setError('Fichier invalide. Seules les images sont acceptées (JPG, PNG, WebP).');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setError('Fichier trop volumineux (max 5 Mo).');
            return;
        }

        setError(null);
        setIsUploading(true);
        setUploadProgress(10);

        const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
        const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        setUploadProgress(30);

        const { error: uploadError } = await supabase.storage
            .from(bucket)
            .upload(filename, file, { upsert: false });

        if (uploadError) {
            setError(`Erreur lors de l'upload : ${uploadError.message}`);
            setIsUploading(false);
            setUploadProgress(0);
            return;
        }

        setUploadProgress(90);

        const {
            data: { publicUrl },
        } = supabase.storage.from(bucket).getPublicUrl(filename);

        setUploadProgress(100);
        onChange(publicUrl);
        setIsUploading(false);
        setUploadProgress(0);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    const handleRemove = async () => {
        if (value) {
            try {
                const url = new URL(value);
                const pathParts = url.pathname.split(`/${bucket}/`);
                if (pathParts.length > 1) {
                    const filename = pathParts[1];
                    await supabase.storage.from(bucket).remove([filename]);
                }
            } catch (e) {
                // Not a valid URL or not in our bucket, just clear the value
            }
        }
        onChange(null);
    };

    const aspectClasses = {
        square: 'aspect-square',
        video: 'aspect-video',
        wide: 'aspect-[21/9]',
        any: '',
    };

    return (
        <div className="space-y-3">
            {label && (
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{label}</label>
            )}

            {/* Preview + remove */}
            {value && (
                <div className={`relative group w-full ${aspectRatio !== 'any' ? aspectClasses[aspectRatio] : 'min-h-[120px]'}`}>
                    <img
                        src={value}
                        alt="Aperçu"
                        className={`w-full h-full object-cover rounded-xl border border-zinc-700 ${aspectClasses[aspectRatio]}`}
                    />
                    {/* Overlay actions on hover */}
                    <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                            type="button"
                            onClick={() => inputRef.current?.click()}
                            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs px-2.5 py-1.5 rounded-lg border border-white/20 transition-colors"
                        >
                            <Upload className="w-3 h-3" />
                            Changer
                        </button>
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="flex items-center gap-1.5 bg-red-500/80 hover:bg-red-500 text-white text-xs px-2.5 py-1.5 rounded-lg transition-colors"
                        >
                            <X className="w-3 h-3" />
                            Retirer
                        </button>
                    </div>
                </div>
            )}

            {/* Drop zone (shown when no image or uploading) */}
            {!value && (
                <div
                    onDrop={handleDrop}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onClick={() => !isUploading && inputRef.current?.click()}
                    className={`relative flex flex-col items-center justify-center gap-3 w-full border-2 border-dashed rounded-xl transition-all ${aspectRatio !== 'any' ? aspectClasses[aspectRatio] : 'h-32'} ${isUploading
                        ? 'border-green-400/60 bg-green-400/5 cursor-wait'
                        : isDragging
                            ? 'border-green-400 bg-green-400/10 cursor-copy'
                            : 'border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/40 cursor-pointer'
                        }`}
                >
                    {isUploading ? (
                        <>
                            <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
                            <p className="text-sm text-zinc-400">Upload en cours…</p>
                            <div className="absolute bottom-3 left-4 right-4 h-1 bg-zinc-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-green-400 rounded-full transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isDragging ? 'bg-green-400/20' : 'bg-zinc-900'}`}>
                                <ImageIcon className={`w-5 h-5 ${isDragging ? 'text-green-400' : 'text-zinc-600'}`} />
                            </div>
                            <div className="text-center px-4">
                                <p className="text-xs text-zinc-400">
                                    Glissez ou{' '}
                                    <span className="text-green-400 font-bold">parcourez</span>
                                </p>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* URL fallback toggle */}
            <div>
                <button
                    type="button"
                    onClick={() => setUrlMode((v) => !v)}
                    className="flex items-center gap-1.5 text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors uppercase font-black tracking-widest"
                >
                    <Link className="w-2.5 h-2.5" />
                    {urlMode ? 'Upload Direct' : 'Lien URL externe'}
                </button>

                {urlMode && (
                    <input
                        type="url"
                        value={value ?? ''}
                        onChange={(e) => onChange(e.target.value || null)}
                        className="mt-2 w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-white/20 transition-colors"
                        placeholder="https://…"
                    />
                )}
            </div>

            {/* Error message */}
            {error && (
                <p className="flex items-center gap-1.5 text-xs text-red-400 bg-red-900/20 border border-red-900/40 px-3 py-2 rounded-lg">
                    <X className="w-3 h-3 shrink-0" />
                    {error}
                </p>
            )}

            {/* Hidden file input */}
            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/svg+xml"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                    e.target.value = '';
                }}
            />
        </div>
    );
}
