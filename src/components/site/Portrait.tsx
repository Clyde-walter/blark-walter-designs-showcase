import portraitAsset from "@/assets/clyde-walter-portrait.png.asset.json";

export function Portrait({
  eager = false,
  className = "",
}: {
  eager?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto aspect-[2/3] w-full max-w-md overflow-hidden rounded-t-[999px] ${className}`}>
      <img
        src={portraitAsset.url}
        alt="Clyde Walter, UI/UX and Brand Designer"
        loading={eager ? "eager" : "lazy"}
        className="h-full w-full object-cover object-top"
      />
    </div>
  );
}
