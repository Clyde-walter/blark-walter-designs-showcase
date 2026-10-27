import { useRef, useState } from "react";
import { FileArchive, Loader2, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export function ZipUpload({ value, onChange, folder }: { value?: string; onChange: (path: string) => void; folder: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function upload(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    if (!/\.zip$/i.test(file.name)) return setErr("Please choose a .zip file.");
    setBusy(true);
    setErr("");
    const safe = file.name.replace(/[^a-z0-9._-]+/gi, "-");
    const path = `${folder.replace(/[^a-z0-9-]+/gi, "-")}/${Date.now()}-${safe}`;
    const { error } = await supabase.storage.from("template-files").upload(path, file, {
      contentType: "application/zip",
      upsert: false,
    });
    setBusy(false);
    if (error) return setErr(error.message);
    onChange(path);
  }

  return (
    <div className="mt-1 rounded-xl border border-dashed border-input p-3">
      {value ? (
        <div className="flex items-center justify-between gap-2 text-sm">
          <span className="flex min-w-0 items-center gap-2">
            <FileArchive className="h-4 w-4 shrink-0 text-primary" />
            <span className="truncate">{value.split("/").pop()}</span>
          </span>
          <button type="button" onClick={() => onChange("")} className="text-muted-foreground hover:text-destructive">
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">No ZIP uploaded yet.</p>
      )}
      <input ref={ref} type="file" accept=".zip,application/zip" hidden onChange={(e) => upload(e.target.files)} />
      <Button type="button" variant="outline" size="sm" className="mt-2" disabled={busy} onClick={() => ref.current?.click()}>
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        {value ? "Replace ZIP" : "Upload ZIP"}
      </Button>
      {err && <p className="mt-1 text-xs text-destructive">{err}</p>}
    </div>
  );
}
