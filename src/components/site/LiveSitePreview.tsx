import { useState } from "react";
import { ExternalLink, Globe2, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

type LiveSitePreviewProps = {
  title: string;
  url: string;
};

export function LiveSitePreview({ title, url }: LiveSitePreviewProps) {
  const [frameKey, setFrameKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const hostname = (() => {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch {
      return url;
    }
  })();

  const reload = () => {
    setIsLoading(true);
    setFrameKey((value) => value + 1);
  };

  return (
    <section className="border-y border-border bg-surface py-12 sm:py-16" aria-labelledby="live-preview-heading">
      <div className="container-x">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="section-label">Interactive Preview</span>
            <h2 id="live-preview-heading" className="mt-3 text-2xl font-bold sm:text-3xl">
              Explore the live website
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Browse {title} here without leaving the case study.
            </p>
          </div>
          <Button asChild>
            <a href={url} target="_blank" rel="noreferrer noopener">
              Open live site <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <div className="flex h-12 items-center gap-3 border-b border-border bg-muted px-3 sm:px-4">
            <div className="hidden items-center gap-1.5 sm:flex" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive" />
              <span className="h-2.5 w-2.5 rounded-full bg-primary/50" />
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/25" />
            </div>
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground">
              <Globe2 className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{hostname}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={reload} title="Reload preview" aria-label="Reload preview">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" asChild title="Open live site">
              <a href={url} target="_blank" rel="noreferrer noopener" aria-label={`Open ${title} in a new tab`}>
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="relative h-[32rem] bg-background sm:h-[38rem] lg:h-[44rem]">
            {isLoading && (
              <div className="absolute inset-0 z-10 grid place-items-center bg-background">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" /> Loading live website…
                </div>
              </div>
            )}
            <iframe
              key={frameKey}
              src={url}
              title={`${title} live website preview`}
              className="h-full w-full border-0 bg-background"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          If the website blocks embedded viewing, use “Open live site” to view it in a new tab.
        </p>
      </div>
    </section>
  );
}