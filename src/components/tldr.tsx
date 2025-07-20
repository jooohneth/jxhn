const content = [
  {
    title: "me",
    description: (
      <div className="flex flex-col gap-1">
        <div className="flex gap-2">
          <span>•</span>
          <span>20 y/o.</span>
        </div>
        <div className="flex gap-2">
          <span>•</span>
          <span>born and raised in Ukraine 🇺🇦.</span>
        </div>
        <div className="flex gap-2">
          <span>•</span>
          <span>ethnically Vietnamese 🇻🇳.</span>
        </div>
        <div className="flex gap-2">
          <span>•</span>
          <span>fortunate to speak 4 languages fluently.</span>
        </div>
        <div className="flex gap-2">
          <span>•</span>
          <span>deeply into building, learning, and shipping in public.</span>
        </div>
        <div className="flex gap-2">
          <span>•</span>
          <span>
            f*cking love a good, well-planned and well-designed product.
          </span>
        </div>
        <div className="flex gap-2">
          <span>•</span>
          <span>
            my favorite thing to do is supporting builders{" "}
            <a
              href="https://x.com/sozuhaus"
              className="hover:text-hyper"
              target="_blank"
              rel="noopener noreferrer"
            >
              @sozuhaus
            </a>
            .
          </span>
        </div>
        <div className="flex gap-2">
          <span>•</span>
          <span>
            bullish on both sides of the spectrum [ memecoins → stablecoins ].
          </span>
        </div>
        <div className="flex gap-2">
          <span>•</span>
          <span>and ofc - AI, gotta add the buzzword here somewhere.</span>
        </div>
      </div>
    ),
  },
] as const;

const Tldr = () => {
  return (
    <div className="flex flex-col gap-10">
      {content.map((item) => (
        <div key={item.title} className="flex flex-col gap-4">
          <h1 className="font-bold uppercase">{item.title}</h1>
          <div className="text-white/60">{item.description}</div>
        </div>
      ))}
    </div>
  );
};

export default Tldr;
