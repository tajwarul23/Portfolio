// Stylised product "screens" shown on the project cards (recreated from the design, not screenshots).

function Frame({ path, right, children }) {
  return (
    <div className="shot flex h-[360px] w-full flex-col rounded-tl-xl border-t border-l border-[#2a2a33] bg-[#0f0f13] transition-transform duration-300 ease-out group-hover:-translate-y-1 sm:h-[440px]">
      <div className="flex items-center justify-between gap-3 border-b border-[#22222a] px-4 py-3">
        <span className="truncate font-mono text-[11px] text-dim">{path}</span>
        {right}
      </div>
      {children}
    </div>
  );
}

export function ScamScannerPreview() {
  const evidence = [
    ["offer-letter.png", "extracted", "text-ok"],
    ["whatsapp-chat.txt", "extracted", "text-ok"],
    ["payment-link", "checking domain…", "text-violet-soft"],
  ];
  return (
    <Frame
      path="scam-scanner / cases / 0412"
      right={
        <span className="shrink-0 rounded-[5px] bg-[rgba(240,120,110,0.14)] px-2 py-[3px] font-mono text-[11px] text-risk">
          HIGH RISK
        </span>
      }
    >
      <div className="grid grow grid-cols-[150px_minmax(0,1fr)] sm:grid-cols-[180px_minmax(0,1fr)]">
        <div className="flex flex-col gap-2 border-r border-[#22222a] p-3.5">
          <span className="font-mono text-[10px] text-dim">EVIDENCE · 3</span>
          {evidence.map(([file, state, color]) => (
            <div key={file} className="flex flex-col gap-1 rounded-lg bg-chip p-2.5 text-xs">
              <span className="truncate">{file}</span>
              <span className={`font-mono text-[10px] ${color}`}>{state}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 p-4">
          <span className="text-sm font-semibold">Investigation summary</span>
          <span className="text-xs leading-relaxed text-muted-1">
            A job offer asks for an upfront registration fee. The domain in the payment link doesn&apos;t
            match the company, and the salary differs between the letter and the chat.
          </span>
          <span className="pt-1.5 font-mono text-[10px] text-dim">SIGNALS</span>
          <div className="flex flex-col gap-1.5 text-xs">
            <div className="flex gap-2"><span className="text-risk">●</span>Upfront fee before interview</div>
            <div className="flex gap-2"><span className="text-risk">●</span>Domain / company mismatch</div>
            <div className="flex gap-2"><span className="text-warn">●</span>Contradicting salary figures</div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function HireFlowPreview() {
  const rows = [
    ["Candidate A", "strong", "text-ok", "Report ready", true],
    ["Candidate B", "partial", "text-warn", "Report ready", true],
    ["Candidate C", "—", "text-dim", "Processing resume…", false],
  ];
  const cols = "grid grid-cols-[minmax(0,1.4fr)_70px_minmax(0,1.3fr)_56px] gap-2.5 sm:grid-cols-[minmax(0,1.4fr)_90px_110px_80px]";
  return (
    <Frame
      path="hireflow / recruiter / jobs / frontend-intern"
      right={<span className="shrink-0 font-mono text-[11px] text-muted-1">24 applicants</span>}
    >
      <div className="flex flex-col gap-2.5 p-4">
        <div className={`${cols} px-2.5 font-mono text-[10px] text-dim`}>
          <span>CANDIDATE</span><span>MATCH</span><span>STATUS</span><span />
        </div>
        {rows.map(([name, match, color, status, ready]) => (
          <div key={name} className={`${cols} items-center rounded-lg bg-chip p-2.5 text-xs`}>
            <span>{name}</span>
            <span className={`font-mono ${color}`}>{match}</span>
            <span className={ready ? "text-muted-1" : "text-violet-soft"}>{status}</span>
            <span className={ready ? "text-violet-soft" : "text-dim"}>{ready ? "Open →" : "—"}</span>
          </div>
        ))}
        <div className="mt-2 flex flex-col gap-2 rounded-[10px] border border-[#2a2a33] p-3.5">
          <span className="text-[13px] font-semibold">AI candidate report · Candidate A</span>
          <span className="text-xs leading-relaxed text-muted-1">
            Strong match on React and REST API work. Resume lists no testing experience; worth asking about
            in the interview.
          </span>
          <div className="flex gap-1.5">
            <span className="tag h-[22px] text-[10px]">Shortlist</span>
            <span className="tag h-[22px] text-[10px]">Email candidate</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function SecLibraryPreview() {
  const results = [
    ["Introduction to Algorithms", "Graphs · shortest paths", "2 available", "text-ok"],
    ["Algorithm Design", "Network flow · greedy", "Waitlist · 3", "text-warn"],
    ["Discrete Mathematics", "Graph theory basics", "1 available", "text-ok"],
  ];
  return (
    <Frame
      path="sec-library / student / smart-search"
      right={<span className="shrink-0 font-mono text-[11px] text-muted-1">Fine due ৳40 · Pay</span>}
    >
      <div className="flex flex-col gap-2.5 p-4">
        <div className="self-end rounded-lg bg-violet/15 px-3 py-2 text-xs">
          Any books that explain graph algorithms?
        </div>
        <div className="flex flex-col gap-2 rounded-[10px] border border-[#2a2a33] p-3.5">
          <span className="text-xs leading-relaxed text-muted-1">
            3 books in the catalog cover graph algorithms, most relevant first:
          </span>
          {results.map(([title, topics, status, color]) => (
            <div key={title} className="flex items-center justify-between gap-3 rounded-lg bg-chip p-2.5 text-xs">
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="truncate">{title}</span>
                <span className="truncate text-[11px] text-dim">{topics}</span>
              </div>
              <span className={`shrink-0 font-mono text-[10px] ${color}`}>{status}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-1.5">
          <span className="tag h-[22px] text-[10px]">Reserve</span>
          <span className="tag h-[22px] text-[10px]">Join waitlist</span>
        </div>
      </div>
    </Frame>
  );
}

export const previews = {
  "scam-scanner": ScamScannerPreview,
  hireflow: HireFlowPreview,
  "sec-library": SecLibraryPreview,
};
