export function SvgDefs() {
  return (
    <svg style={{ display: "none" }} aria-hidden="true">
      <symbol id="i-billboard" viewBox="0 0 220 150">
        <rect x="14" y="12" width="192" height="88" rx="3" className="f1"/>
        <rect x="21" y="19" width="178" height="74" className="f2"/>
        <path d="M32 42h72M32 58h104M32 74h58" className="stw"/>
        <rect x="150" y="30" width="40" height="40" rx="3" className="f4"/>
        <path d="M70 100v42M150 100v42M70 118h80" className="stk"/>
        <path d="M40 12v-6M110 12v-6M180 12v-6" className="stk"/>
      </symbol>
      <symbol id="i-facade" viewBox="0 0 220 150">
        <rect x="10" y="8" width="200" height="136" className="f1"/>
        <g className="f5"><rect x="22" y="20" width="24" height="18"/><rect x="56" y="20" width="24" height="18"/>
          <rect x="22" y="48" width="24" height="18"/><rect x="56" y="48" width="24" height="18"/>
          <rect x="22" y="76" width="24" height="18"/><rect x="56" y="76" width="24" height="18"/>
          <rect x="22" y="104" width="24" height="18"/><rect x="56" y="104" width="24" height="18"/></g>
        <rect x="104" y="16" width="98" height="120" className="f2"/>
        <path d="M116 46h74M116 66h52M116 86h74" className="stw"/>
        <rect x="116" y="102" width="46" height="20" className="f4"/>
      </symbol>
      <symbol id="i-letters" viewBox="0 0 220 150">
        <rect x="10" y="18" width="200" height="114" className="f2"/>
        <rect x="10" y="118" width="200" height="14" className="f1"/>
        <text x="110" y="90" textAnchor="middle" fontFamily="Unbounded,sans-serif" fontWeight="800" fontSize="36" className="f1">TOGO</text>
        <circle cx="40" cy="44" r="7" className="f4"/><circle cx="180" cy="44" r="7" className="f4"/>
        <path d="M54 44h112" stroke="#FFD24A" strokeWidth="3" strokeDasharray="6 8" fill="none"/>
      </symbol>
      <symbol id="i-print" viewBox="0 0 220 150">
        <rect x="26" y="14" width="168" height="34" className="f5"/>
        <rect x="14" y="48" width="192" height="46" rx="4" className="f1"/>
        <rect x="30" y="62" width="60" height="8" className="f4"/>
        <circle cx="182" cy="66" r="7" className="f4"/>
        <rect x="40" y="94" width="140" height="48" className="f2"/>
        <path d="M54 112h112M54 126h74" className="stw"/>
      </symbol>
      <symbol id="i-stand" viewBox="0 0 220 150">
        <rect x="14" y="30" width="40" height="86" className="f5"/>
        <rect x="166" y="30" width="40" height="86" className="f5"/>
        <rect x="70" y="10" width="80" height="106" className="f2"/>
        <path d="M82 34h56M82 50h36M82 66h56" className="stw"/>
        <rect x="82" y="82" width="34" height="16" className="f4"/>
        <rect x="60" y="116" width="100" height="12" rx="5" className="f1"/>
        <path d="M110 128v12M92 140h36" className="stk"/>
      </symbol>
      <symbol id="i-cards" viewBox="0 0 220 150">
        <rect x="30" y="86" width="118" height="46" rx="4" className="f5" transform="rotate(-8 89 109)"/>
        <rect x="46" y="66" width="118" height="46" rx="4" className="f1" transform="rotate(-3 105 89)"/>
        <rect x="62" y="34" width="118" height="52" rx="4" className="f2" transform="rotate(4 121 60)"/>
        <g transform="rotate(4 121 60)"><path d="M78 58h50M78 70h30" className="stw"/><circle cx="160" cy="54" r="9" className="f4"/></g>
      </symbol>
      <symbol id="i-car" viewBox="0 0 220 150">
        <path d="M22 96V62l30-26h58l30 26h58v34z" className="f1"/>
        <path d="M60 44h44v18H44z" className="f5"/>
        <rect x="118" y="50" width="58" height="28" className="f2"/>
        <path d="M130 62h32M130 71h20" className="stw"/>
        <circle cx="62" cy="98" r="16" className="f1"/><circle cx="62" cy="98" r="6" className="f4"/>
        <circle cx="164" cy="98" r="16" className="f1"/><circle cx="164" cy="98" r="6" className="f4"/>
        <rect x="14" y="112" width="192" height="6" className="f3"/>
      </symbol>
      <symbol id="i-wall" viewBox="0 0 220 150">
        <rect x="18" y="16" width="184" height="102" className="f2"/>
        <g className="f1"><rect x="34" y="34" width="34" height="18"/><rect x="80" y="34" width="34" height="18"/>
          <rect x="126" y="34" width="34" height="18"/><rect x="34" y="62" width="34" height="18"/>
          <rect x="80" y="62" width="34" height="18"/><rect x="126" y="62" width="34" height="18"/></g>
        <rect x="164" y="34" width="22" height="46" className="f4"/>
        <path d="M40 118v22M180 118v22" className="stk"/>
      </symbol>
    </svg>
  );
}

export function SvgIcon({ id, className }: { id: string; className?: string }) {
  return (
    <svg className={className || "il"} viewBox="0 0 220 150">
      <use href={`#${id}`} />
    </svg>
  );
}
