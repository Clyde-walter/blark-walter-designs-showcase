import { useRef, useState } from "react";
import { Loader2, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

async function uploadOne(file: File, folder: string): Promise<string> {
  const ext = file.name.split(".").pop() || "bin";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
    contentType: file.type,
  });
  if (error) throw error;
  const { data, error: signErr } = await supabase.storage.from("media").createSignedUrl(path, TEN_YEARS);
  if (signErr || !data) throw signErr ?? new Error("Failed to sign URL");
  return data.signedUrl;
}

export function ImageUpload({ value, onChange, folder = "uploads", label = "Image" }: {
  value?: string; onChange: (url: string) => void; folder?: string; label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string>("");

  async function handleFiles(files: FileList | null) {
    if (!files || !files[0]) return;
    setBusy(true); setErr("");
    try { onChange(await uploadOne(files[0], folder)); }
    catch (e: any) { setErr(e.message ?? "Upload failed"); }
    finally { setBusy(false); if (inputRef.current) inputRef.current.value = ""; }
  }

  return (
    <div className="mt-1">
      <div className="flex items-center gap-3">
        {value ? (
          <div className="relative">
            <img src={value} alt={label} className="h-20 w-20 rounded-xl object-cover" />
            <button type="button" onClick={() => onChange("")} className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-destructive text-white"><X className="h-3 w-3" /></button>
          </div>
        ) : (
          <div className="grid h-20 w-20 place-items-center rounded-xl border border-dashed border-border bg-muted text-muted-foreground"><Upload className="h-5 w-5" /></div>
        )}
        <button type="button" onClick={() => inputRef.current?.click()} disabled={busy} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold disabled:opacity-60">
          {busy ? <Loader2 className="h-3 w-3 animate-spin" /> : <Upload className="h-3 w-3" />} {value ? "Replace" : "Upload"}
        </button>
        <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => handleFiles(e.target.files)} />
      </div>
      {err && <p className="mt-1 text-xs text-destructive">{err}</p>}
    </div>
  );
}

export function GalleryUpload({ value, onChange, folder = "gallery" }: {
  value: string[]; onChange: (urls: string[]) => void; folder?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string>("");

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true); setErr("");
    try {
      const urls: string[] = [];
      for (const f of Array.from(files)) urls.push(await uploadOne(f, folder));
      onChange([...(value ?? []), ...urls]);
    } catch (e: any) { setErr(e.message ?? "Upload failed"); }
    finally { setBusy(false); if (inputRef.current) inputRef.current.value = ""; }
  }

  return (
    <div className="mt-1 space-y-3">
      <div className="flex flex-wrap gap-2">
        {(value ?? []).map((url, i) => (
          <div key={url + i} className="relative">
            <img src={url} alt="" className="h-20 w-20 rounded-xl object-cover" />
            <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-destructive text-white"><X className="h-3 w-3" /></button>
          </div>
        ))}
        <button type="button" onClick={() => inputRef.current?.click()} disabled={busy} className="grid h-20 w-20 place-items-center rounded-xl border border-dashed border-border bg-muted text-muted-foreground hover:border-primary">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        </button>
        <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={(e) => handleFiles(e.target.files)} />
      </div>
      {err && <p className="text-xs text-destructive">{err}</p>}
      <p className="text-xs text-muted-foreground">You can upload multiple images. Drag them onto the button.</p>
    </div>
  );
}
