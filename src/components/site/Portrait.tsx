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
        src="/portrait.png"
        alt="Clyde Walter, UI/UX and Brand Designer"
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-cover object-top"
      />
    </div>
  );
}
