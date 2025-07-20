import { JSX } from "react";

const content = [
  {
    title: "> mantle - [ mar 23` → present ]",
    description: (
      <>
        general-purpose L2 built for financial applications, we build and
        incubate many products like: meth, ftbc, and ur. here&apos;re some of my
        direct / indirect contributions:
      </>
    ),
    points: (
      <>
        devrel, devsuccess, product, engineering. mantle network: testnet →
        mainnet, $0 → $1.7B TVL. took part in building the developer community
        from scratch. working with projects and founders via: cookathon and
        lightning grants. contributing to infra decisions and supporting
        integrations. some products i built / contributed to: reward station
        [rainbow → privy auth], builder hub, documentation, faucet, and many
        more...
      </>
    ),
    links: [
      {
        title: "website",
        href: "https://group.mantle.xyz",
      },
      {
        title: "x",
        href: "https://x.com/mantle_official",
      },
    ],
  },
  {
    title: "> sozu haus - [ nov 22` → present ]",
    description: (
      <>
        builder / founder residency program supporting teams building from 1 →
        100.
      </>
    ),
    points: (
      <>
        joined in 2022 → now co-orgazing with frens. worked with and hosted some
        of the most amazing builders in this industry, who built: pump.fun,
        clave, exo labs, and many more....
      </>
    ),
    links: [
      {
        title: "X",
        href: "https://x.com/sozuhaus",
      },
    ],
  },
  {
    title: "> just a boy - [ tech lead ]",
    description: (
      <>
        fun lil experimental product co-built with one of the founding engineers
        of pump.fun.
      </>
    ),
    points: (
      <>
        art by Petravoice, arguably the most viral ct artist.... what began as
        an experiment, became the largest ever mint on Mantle. some numbers:
        652,155 mints, ~500k txs, ~10k unique holders. built as an
        experimentation of consumer-friendly UX in crypto using privy and a
        custom gas abstraction backend.
      </>
    ),
    links: [
      {
        title: "website",
        href: "https://justaboy.xyz",
      },
      {
        title: "post-mortem",
        href: "https://x.com/NevvDevv/status/1887558315225342216",
      },
      {
        title: "announcement",
        href: "https://x.com/petravoice/status/1885690500453110114",
      },
    ],
  },
  {
    title: "> boys - [ tech lead ]",
    description: (
      <>Boys NFT Collection launched by PetraVoice on Mantle Network.</>
    ),
    points: (
      <>
        fully-minted in 10 minutes [actually 5 minutes, had to fix a bug...].
        some numbers: ~110k MNT collected in total, ~250k MNT volume on
        exchanges. many reputable individuals on ct supported the project..
      </>
    ),
    links: [
      {
        title: "website",
        href: "https://boys.petravoice.art/",
      },
      {
        title: "announcement",
        href: "https://x.com/petravoice/status/1877067792857575532",
      },
    ],
  },
  {
    title: "> SIR Trading - [ FE Engeineer ] ",
    description: (
      <>
        a complex defi product, offering a new way to take leverage in DeFi:
        compounding exposure without the usual drag.
      </>
    ),
    points: (
      <>
        built the auth module and staking page. learnt a ton about
        smart-contracts in defi. met good people and frens.
      </>
    ),
    links: [
      {
        title: "website",
        href: "https://www.sir.trading/",
      },
      {
        title: "x",
        href: "https://x.com/leveragesir",
      },
    ],
  },
  {
    title: "> crystalize - [ SC Engineer intern ]",
    description: (
      <>
        my first position in this space, meeting dcbuilder changed my life and
        career, if you&apos;re reading this - thank you! 🙏
      </>
    ),
    points: null,
    links: [
      {
        title: "X",
        href: "https://x.com/0xjooohn",
      },
      {
        title: "LinkedIn",
        href: "https://www.linkedin.com/in/jooohneth/",
      },
    ],
  },
] as const;

// Helper function to render content with bullet points
const renderWithBullets = (content: JSX.Element) => {
  // Extract the text from JSX element to detect bullet pattern
  const textContent = content.props.children;

  // Check if content contains '. ' pattern (indicating bullet list)
  if (typeof textContent === "string" && textContent.includes(". ")) {
    const items = textContent
      .split(". ")
      .filter((item) => item.trim().length > 0);

    if (items.length > 1) {
      return (
        <div className="flex flex-col gap-1">
          {items.map((item, index) => (
            <div key={index} className="flex gap-2">
              <span>•</span>
              <span>
                {item.trim()}
                {index < items.length - 1 && !item.endsWith(".") ? "." : ""}
              </span>
            </div>
          ))}
        </div>
      );
    }
  }

  return content;
};

const Work = () => {
  return (
    <div className="flex flex-col gap-10">
      {content.map((item) => (
        <div
          key={item.title}
          className="flex flex-col gap-4 pb-8 border-b border-white/10 border-dotted"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between md:gap-4 gap-2 uppercase mb-4 md:mb-0">
            <h1 className="font-bold">{item.title}</h1>
            <div className="flex items-center gap-2">
              {"["}
              {item.links.map((link, index) => (
                <div key={index}>
                  <a
                    className="text-white/50 hover:text-white"
                    key={link.title}
                    href={link.href}
                  >
                    {link.title}
                  </a>
                  {index < item.links.length - 1 && ", "}
                </div>
              ))}
              {"]"}
            </div>
          </div>

          <div className="text-white/60">{item.description}</div>
          {item.points && (
            <div className="text-white/60">
              {renderWithBullets(item.points)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Work;
