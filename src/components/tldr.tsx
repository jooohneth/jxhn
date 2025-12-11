const content = [
  {
    title: "> me",
    description: (
      <div className="flex flex-col gap-1">
        {/* <div className="flex gap-2">
          <span>•</span>
          <span>20 y/o.</span>
        </div> */}
        <div className="flex gap-2">
          <span>•</span>
          <span>born and raised in Ukraine 🇺🇦</span>
        </div>
        <div className="flex gap-2">
          <span>•</span>
          <span>ethnically Vietnamese 🇻🇳</span>
        </div>
        <div className="flex gap-2">
          <span>•</span>
          <span>based in Canada 🇨🇦</span>
        </div>
        <div className="flex gap-2">
          <span>•</span>
          <span>speak 4 languages</span>
        </div>
        <div className="flex gap-2">
          <span>•</span>
          <span>
            I build, learn, and ship in public
          </span>
        </div>

        <div className="flex gap-2">
          <span>•</span>
          <span>
            i support builders and founders{" "}
            <a
              href="https://x.com/sozuhaus"
              className="text-hyper hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              @sozuhaus
            </a>
          </span>
        </div>

        <div className="flex gap-2">
          <span>•</span>
          <span>i'm addicted to well-built and well-designed products</span>
        </div>

        <div className="flex gap-2">
          <span>•</span>
          <span>
            bullish on these buzzwords: 
          </span>
        </div>
        <div className="flex gap-2 ml-8">
          <span>★</span>
          <span>
            ai
          </span> 
        </div>
        <div className="flex gap-2 ml-8">
          <span>★</span>
          <span>
            defi
          </span> 
        </div>
        <div className="flex gap-2 ml-8">
          <span>★</span>
          <span>
            prediction markets
          </span> 
        </div>
        <div className="flex gap-2 ml-8">
          <span>★</span>
          <span>
            interoperability
          </span> 
        </div>
        <div className="flex gap-2 ml-8">
          <span>★</span>
          <span>
            stablecoins
          </span> 
        </div>
       
      </div>
    ),
  },
] as const;

const Tldr = () => {
  return (
    <div className="flex flex-col gap-10">
      {content.map((item) => (
        <div
          key={item.title}
          className="flex flex-col gap-4 py-8 border-b border-foreground/10 border-dotted"
        >
          <h1 className="font-bold uppercase">{item.title}</h1>
          <div className="text-foreground/60">{item.description}</div>
        </div>
      ))}
    </div>
  );
};

export default Tldr;
