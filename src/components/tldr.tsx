import { convertToBulletList } from "@/lib/utils";

const content = [
  {
    title: "me",
    description: `
        20 y/o. 
        born and raised in Ukraine 🇺🇦. 
        ethnically Vietnamese 🇻🇳. 
        fortunate to speak 4 languages fluently. 
        deeply in love with building, learning, and shipping in public. 
        f*cking love a good, well-planned and well-designed product. 
        bullish on both sides of the spectrum  [ memecoins -> stablecoins ]. 
        and ofc - AI, gotta add the buzzword here somewhere.
        `,
  },
] as const;

const Tldr = () => {
  return (
    <div className="flex flex-col gap-10">
      {content.map((item) => (
        <div key={item.title} className="flex flex-col gap-4">
          <h1 className="font-bold uppercase">{item.title}</h1>
          <div className="text-white/60">
            {convertToBulletList(item.description)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tldr;
