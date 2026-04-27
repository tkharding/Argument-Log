import { useState, useEffect } from "react";

const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];
const MONTHS = ["January","February","March","April","May","June",
  "July","August","September","October","November","December"];
const TOPICS = ["Money","Parenting","Chores","Work","In-Laws","Intimacy","Communication","Religion","Politics"];
const INTENSITIES = [
  { label:"Mild",     color:"#2a7ab5", desc:"Minor friction" },
  { label:"Moderate", color:"#2e8b57", desc:"Raised voices"  },
  { label:"Severe",   color:"#c0392b", desc:"Major conflict"  },
];

const SAMPLE = {};

function toKey(y,m,d){ return `${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`; }
function getDaysInMonth(y,m){ return new Date(y,m+1,0).getDate(); }
function getFirstDay(y,m){ return new Date(y,m,1).getDay(); }
function newId(){ return Date.now()+Math.random(); }

function solidBtn(bg){
  return { background:bg, border:"none", borderRadius:8, color:"#ffffff",
    fontSize:14, fontWeight:700, padding:"8px 14px", cursor:"pointer", letterSpacing:"0.03em" };
}
const ghostBtn = {
  background:"none", border:"1px solid #b8d4c4", borderRadius:8,
  color:"#2a4a5a", fontSize:14, padding:"8px 14px", cursor:"pointer", flex:1,
};
function Label({ children }){
  return <div style={{ fontSize:12, color:"#2a4a5a", letterSpacing:"0.15em", textTransform:"uppercase" }}>{children}</div>;
}
function SectionLabel({ children }){
  return <div style={{ fontSize:11, color:"#2a4a5a", letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:4 }}>{children}</div>;
}

function IntensityBar({ value, onChange }){
  return (
    <div style={{ display:"flex", gap:8 }}>
      {INTENSITIES.map((it,i) => (
        <button key={i} onClick={() => onChange(i)} style={{
          flex:1, padding:"8px 4px", borderRadius:8,
          border:`2px solid ${value===i ? it.color : "#b8d4c4"}`,
          background: value===i ? it.color+"22" : "transparent",
          cursor:"pointer", transition:"all 0.15s",
        }}>
          <div style={{ fontSize:13, fontWeight:700, color:value===i ? it.color : "#2a4a5a" }}>{it.label}</div>
          <div style={{ fontSize:11, color:value===i ? it.color+"cc" : "#3a5a6a", marginTop:2 }}>{it.desc}</div>
        </button>
      ))}
    </div>
  );
}

function EntryForm({ initial, onSave, onCancel, customTopics, onAddCustomTopic }){
  const [topic,       setTopic]       = useState(initial?.topic     || TOPICS[0]);
  const [intensity,   setIntensity]   = useState(initial?.intensity ?? 0);
  const [note,        setNote]        = useState(initial?.note      || "");
  const [addingTopic, setAddingTopic] = useState(false);
  const [customTopic, setCustomTopic] = useState("");

  function handleAddCustomTopic(){
    const t = customTopic.trim();
    if(!t) return;
    onAddCustomTopic(t);
    setTopic(t);
    setAddingTopic(false);
    setCustomTopic("");
  }

  const allTopics = [...TOPICS, ...customTopics];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <div>
        <Label>Topic</Label>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:6 }}>
          {allTopics.map(t => (
            <button key={t} onClick={() => setTopic(t)} style={{
              padding:"5px 12px", borderRadius:20,
              border:`1.5px solid ${topic===t ? "#1a6b3a" : "#b8d4c4"}`,
              background: topic===t ? "#1a237e18" : "transparent",
              color: topic===t ? "#1a6b3a" : "#2a4a5a",
              fontSize:14, cursor:"pointer", transition:"all 0.12s",
            }}>{t}</button>
          ))}
          {!addingTopic && (
            <button onClick={() => setAddingTopic(true)} style={{
              padding:"5px 12px", borderRadius:20,
              border:"1.5px dashed #b8d4c4",
              background:"transparent",
              color:"#3a5a6a", fontSize:14, cursor:"pointer",
            }}>+ Custom</button>
          )}
        </div>
        {addingTopic && (
          <div style={{ display:"flex", gap:6, marginTop:8, alignItems:"center" }}>
            <input autoFocus value={customTopic}
              onChange={e => setCustomTopic(e.target.value)}
              onKeyDown={e => { if(e.key==="Enter") handleAddCustomTopic(); if(e.key==="Escape") setAddingTopic(false); }}
              placeholder="Topic name..."
              style={{ flex:1, background:"#e8f0ec", border:"1.5px solid #b8d4c4",
                borderRadius:8, color:"#1a3040", fontSize:15, padding:"6px 10px",
                outline:"none", fontFamily:"inherit" }} />
            <button onClick={handleAddCustomTopic} style={{
              background:"#1a6b3a", border:"none", borderRadius:8,
              color:"#fff", fontSize:14, fontWeight:700, padding:"6px 12px", cursor:"pointer",
            }}>Add</button>
            <button onClick={() => { setAddingTopic(false); setCustomTopic(""); }} style={{
              background:"none", border:"1px solid #b8d4c4", borderRadius:8,
              color:"#3a5a6a", fontSize:14, padding:"6px 10px", cursor:"pointer",
            }}>✕</button>
          </div>
        )}
      </div>
      <div>
        <Label>Intensity</Label>
        <div style={{ marginTop:6 }}><IntensityBar value={intensity} onChange={setIntensity} /></div>
      </div>
      <div>
        <Label>Notes <span style={{ color:"#3a5a6a", fontWeight:600 }}>(optional)</span></Label>
        <textarea value={note} onChange={e => setNote(e.target.value)}
          placeholder="Brief description..." rows={3}
          style={{ width:"100%", marginTop:6, background:"#e8f0ec",
            border:"1.5px solid #b8d4c4", borderRadius:8, color:"#1a3040",
            fontSize:15, padding:"8px 10px", resize:"none", outline:"none",
            boxSizing:"border-box", fontFamily:"inherit" }} />
      </div>
      <div style={{ display:"flex", gap:8, marginTop:4 }}>
        <button onClick={onCancel} style={ghostBtn}>Cancel</button>
        <button onClick={() => onSave({ topic, intensity, note, id: initial?.id || newId() })}
          style={{ ...solidBtn("#1a6b3a"), flex:2 }}>
          {initial ? "Update" : "Log Argument"}
        </button>
      </div>
    </div>
  );
}

const ENCOURAGEMENT = [
  "Everyone has arguments with those they love, it's part of growing stronger together. Keep your chin up!",
  "Consider doing something nice for the person you had an argument with to let them know you still love them.",
  "I'm sorry that happened. Consider getting several nights of sleep before discussing the topic again.",
];

function DayPanel({ dateKey, dateLabel, entries, onAdd, onUpdate, onDelete, customTopics, onAddCustomTopic }){
  const [adding,  setAdding]  = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast,   setToast]   = useState(null);

  function handleSaveNew(entry){
    onAdd(dateKey, entry);
    setAdding(false);
    setToast({ message: ENCOURAGEMENT[entry.intensity], color: INTENSITIES[entry.intensity].color });
    setTimeout(() => setToast(null), 10000);
  }

  return (
    <div style={{ marginTop:14, background:"#ffffff", border:"1px solid #b8d4c4",
      borderRadius:16, width:"100%", maxWidth:400, padding:"20px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <div>
          <div style={{ fontSize:12, color:"#2a4a5a", letterSpacing:"0.15em", textTransform:"uppercase" }}>Selected Day</div>
          <div style={{ fontSize:22, fontWeight:700, color:"#1a3040", marginTop:2 }}>{dateLabel}</div>
        </div>
        {!adding && editing===null && (
          <button onClick={() => setAdding(true)} style={solidBtn("#1a6b3a")}>+ Log</button>
        )}
      </div>

      {toast && (
        <div style={{ marginBottom:16, animation:"fadeInOut 10s ease forwards" }}>
          <style>{`
            @keyframes fadeInOut {
              0%   { opacity:0; transform:scale(0.93); }
              10%  { opacity:1; transform:scale(1); }
              75%  { opacity:1; }
              100% { opacity:0; }
            }
            .thought-cloud {
              position: relative;
              background: var(--cloud-bg);
              border: 2.5px solid var(--cloud-border);
              border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
              padding: 32px 36px;
              margin: 8px 8px 48px 8px;
              box-shadow: 0 4px 16px var(--cloud-shadow);
            }
            .thought-cloud::before,
            .thought-cloud::after {
              content: '';
              position: absolute;
              background: var(--cloud-bg);
              border: 2.5px solid var(--cloud-border);
              border-radius: 50%;
            }
            .thought-cloud::before {
              width: 36px; height: 36px;
              bottom: -28px; left: 36px;
            }
            .thought-cloud::after {
              width: 22px; height: 22px;
              bottom: -50px; left: 22px;
            }
          `}</style>
          <div className="thought-cloud" style={{
            '--cloud-bg': toast.color + '22',
            '--cloud-border': toast.color + '88',
            '--cloud-shadow': toast.color + '33',
            fontSize:16, color:"#1a3040", lineHeight:1.7,
            fontStyle:"italic", textAlign:"center", fontWeight:700,
          }}>
            {toast.message}
            <div style={{
              position:"absolute", bottom:"-68px", left:"12px",
              width:14, height:14, borderRadius:"50%",
              background: toast.color+"22",
              border: `2px solid ${toast.color}88`,
            }}/>
          </div>
        </div>
      )}

      {adding && (
        <div style={{ borderTop:"1px solid #b8d4c4", paddingTop:16, marginBottom:16 }}>
          <div style={{ fontSize:13, color:"#1a237e", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12 }}>New Entry</div>
          <EntryForm onSave={handleSaveNew} onCancel={() => setAdding(false)}
            customTopics={customTopics} onAddCustomTopic={onAddCustomTopic} />
        </div>
      )}

      {entries.length===0 && !adding ? (
        <div style={{ fontSize:15, color:"#3a5a6a", textAlign:"center", padding:"16px 0" }}>
          No arguments logged — peaceful day 🕊️
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {entries.map(e => {
            const it = INTENSITIES[e.intensity];
            if(editing===e.id){
              return (
                <div key={e.id} style={{ background:"#e8f0ec", borderRadius:10, padding:14 }}>
                  <EntryForm initial={e}
                    onSave={entry => { onUpdate(dateKey,entry); setEditing(null); }}
                    onCancel={() => setEditing(null)}
                    customTopics={customTopics} onAddCustomTopic={onAddCustomTopic} />
                </div>
              );
            }
            return (
              <div key={e.id} style={{ background:"#e8f0ec", borderRadius:10,
                padding:"12px 14px", borderLeft:`3px solid ${it.color}` }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:4, alignItems:"center" }}>
                    <span style={{ fontSize:13, fontWeight:700, color:it.color,
                      background:it.color+"18", padding:"2px 8px", borderRadius:10 }}>{it.label}</span>
                    <span style={{ fontSize:15, color:"#1a237e", fontWeight:700 }}>{e.topic}</span>
                  </div>
                  <div style={{ display:"flex", gap:4, marginLeft:8, flexShrink:0 }}>
                    <button onClick={() => setEditing(e.id)}
                      style={{ background:"none",border:"none",color:"#3a5a6a",fontSize:15,cursor:"pointer",padding:"2px 5px",borderRadius:4 }}>✎</button>
                    <button onClick={() => onDelete(dateKey,e.id)}
                      style={{ background:"none",border:"none",color:"#3a5a6a",fontSize:15,cursor:"pointer",padding:"2px 5px",borderRadius:4 }}>✕</button>
                  </div>
                </div>
                {e.note && <div style={{ fontSize:14,color:"#2a4a5a",marginTop:6,lineHeight:1.5 }}>{e.note}</div>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SummaryStats({ data, year, month }){
  const [scope, setScope] = useState("month");

  const allEntries = Object.entries(data).flatMap(([k,entries]) =>
    entries.map(e => ({ ...e, dateKey:k }))
  );
  const monthPrefix = `${year}-${String(month+1).padStart(2,"0")}`;
  const scoped = scope==="month"
    ? allEntries.filter(e => e.dateKey.startsWith(monthPrefix))
    : allEntries;

  const total = scoped.length;
  const topicMap = {};
  scoped.forEach(e => { topicMap[e.topic]=(topicMap[e.topic]||0)+1; });
  const topTopics = Object.entries(topicMap).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const maxTopic = topTopics[0]?.[1] || 1;
  const intCounts = [0,0,0];
  scoped.forEach(e => { intCounts[e.intensity]++; });

  const monthlyByInt = {};
  allEntries.forEach(e => {
    const pfx = e.dateKey.slice(0,7);
    if(!monthlyByInt[pfx]) monthlyByInt[pfx] = [0,0,0];
    monthlyByInt[pfx][e.intensity]++;
  });
  const monthKeys = Object.keys(monthlyByInt).sort();
  const useYearly = monthKeys.length > 12;
  const yearlyByInt = {};
  if(useYearly){
    allEntries.forEach(e => {
      const yr = e.dateKey.slice(0,4);
      if(!yearlyByInt[yr]) yearlyByInt[yr] = [0,0,0];
      yearlyByInt[yr][e.intensity]++;
    });
  }
  const trendKeys = useYearly ? Object.keys(yearlyByInt).sort() : monthKeys;
  const trendSource = useYearly ? yearlyByInt : monthlyByInt;
  const trendSeries = [0,1,2].map(i => trendKeys.map(k => trendSource[k][i]));
  const maxTrendVal = Math.max(...trendKeys.flatMap(k => trendSource[k]), 1);

  if(total===0) return (
    <div style={{ textAlign:"center", padding:"24px 0", color:"#3a5a6a", fontSize:15 }}>
      No data for {scope==="month" ? MONTHS[month] : "any period"} yet.
    </div>
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <div style={{ display:"flex", background:"#e8f0ec", borderRadius:8, padding:3 }}>
        {[["month", MONTHS[month]], ["all","All Time"]].map(([s,lbl]) => (
          <button key={s} onClick={() => setScope(s)} style={{
            flex:1, padding:"7px 0", border:"none", borderRadius:6,
            background: scope===s ? "#c8e6d4" : "transparent",
            color: scope===s ? "#1a6b3a" : "#2a4a5a",
            fontSize:13, fontWeight:700, letterSpacing:"0.08em",
            textTransform:"uppercase", cursor:"pointer", transition:"all 0.15s",
          }}>{lbl}</button>
        ))}
      </div>

      <div style={{ background:"#e8f0ec", borderRadius:10, padding:"12px 8px", textAlign:"center" }}>
        <div style={{ fontSize:24, fontWeight:700, color:"#1a237e" }}>{total}</div>
        <div style={{ fontSize:11, color:"#2a4a5a", letterSpacing:"0.08em", textTransform:"uppercase", marginTop:3 }}>Total Arguments</div>
      </div>

      <div>
        <SectionLabel>By Intensity</SectionLabel>
        <div style={{ display:"flex", gap:6 }}>
          {INTENSITIES.map((it,i) => {
            const c = intCounts[i];
            const pct = total>0 ? Math.round((c/total)*100) : 0;
            return (
              <div key={i} style={{ flex:1, background:"#e8f0ec", borderRadius:10, padding:"10px 8px", textAlign:"center" }}>
                <div style={{ fontSize:22, fontWeight:700, color:it.color }}>{c}</div>
                <div style={{ fontSize:11, color:it.color+"99", marginTop:1 }}>{it.label}</div>
                <div style={{ marginTop:6, height:3, borderRadius:2, background:"#b8d4c4" }}>
                  <div style={{ height:"100%", borderRadius:2, background:it.color, width:pct+"%" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {topTopics.length>0 && (
        <div>
          <SectionLabel>Top Topics</SectionLabel>
          <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
            {topTopics.map(([topic,count]) => (
              <div key={topic} style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:90, fontSize:13, color:"#2a4a5a", textAlign:"right", flexShrink:0 }}>{topic}</div>
                <div style={{ flex:1, height:8, background:"#e8f0ec", borderRadius:4, overflow:"hidden" }}>
                  <div style={{ height:"100%", borderRadius:4, background:"#1a6b3a", width:`${(count/maxTopic)*100}%` }} />
                </div>
                <div style={{ width:16, fontSize:13, color:"#1a237e", fontWeight:700 }}>{count}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {scope==="all" && trendKeys.length >= 2 && (
        <div>
          <SectionLabel>All-Time Trend</SectionLabel>
          <div style={{ display:"flex", gap:12, marginTop:6, marginBottom:4 }}>
            {INTENSITIES.map((it,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:5 }}>
                <div style={{ width:16, height:2.5, borderRadius:2, background:it.color }} />
                <span style={{ fontSize:11, color:it.color, letterSpacing:"0.06em", textTransform:"uppercase" }}>{it.label}</span>
              </div>
            ))}
          </div>
          <div style={{ background:"#e8f0ec", borderRadius:12, padding:"16px 8px 8px" }}>
            {(() => {
              const W = 320, H = 130, padL = 24, padR = 12, padT = 10, padB = 28;
              const innerW = W - padL - padR;
              const innerH = H - padT - padB;
              const n = trendKeys.length;
              const xOf = i => padL + (n===1 ? innerW/2 : (i/(n-1))*innerW);
              const yOf = v => padT + innerH - (v/maxTrendVal)*innerH;
              const gridVals = [0, Math.round(maxTrendVal/2), maxTrendVal];
              const currentPfx = `${year}-${String(month+1).padStart(2,"0")}`;
              return (
                <svg viewBox={`0 0 ${W} ${H}`} style={{ width:"100%", height:"auto", overflow:"visible" }}>
                  {gridVals.map(v => (
                    <g key={v}>
                      <line x1={padL} y1={yOf(v)} x2={W-padR} y2={yOf(v)} stroke="#b8d4c4" strokeWidth="1" />
                      <text x={padL-4} y={yOf(v)+4} textAnchor="end" fill="#1a3040" fontSize="11" fontWeight="700">{v}</text>
                    </g>
                  ))}
                  {trendSeries.map((vals, si) => {
                    const color = INTENSITIES[si].color;
                    const points = vals.map((v,i) => `${xOf(i)},${yOf(v)}`).join(" ");
                    return <polyline key={si} points={points} fill="none"
                      stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />;
                  })}
                  {trendSeries.map((vals, si) => {
                    const color = INTENSITIES[si].color;
                    return vals.map((v, i) => {
                      const cx = xOf(i), cy = yOf(v);
                      const isCur = trendKeys[i]===currentPfx;
                      return <circle key={`${si}-${i}`} cx={cx} cy={cy} r={isCur?4.5:3}
                        fill={isCur ? color : "#e8f0ec"} stroke={color} strokeWidth="1.8" />;
                    });
                  })}
                  {trendKeys.map((k,i) => {
                    const lbl = useYearly ? k : MONTHS[parseInt(k.split("-")[1])-1].slice(0,3);
                    const isCur = useYearly ? k===String(year) : k===`${year}-${String(month+1).padStart(2,"0")}`;
                    return <text key={i} x={xOf(i)} y={H-4} textAnchor="middle"
                      fill={isCur?"#1a6b3a":"#1a3040"} fontSize="11" fontWeight={isCur?"700":"600"}>{lbl}</text>;
                  })}
                </svg>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

function LoginScreen({ onLogin }){
  const [mode,     setMode]     = useState("login");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [name,     setName]     = useState("");
  const [error,    setError]    = useState("");

  function handleSubmit(){
    if(!email || !password){ setError("Please fill in all fields."); return; }
    if(mode==="signup" && !name){ setError("Please enter your name."); return; }
    if(password.length < 6){ setError("Password must be at least 6 characters."); return; }
    const user = { email, name: name||email.split("@")[0] };
    try { localStorage.setItem("conflict_log_user", JSON.stringify(user)); } catch{}
    onLogin(user, mode==="signup");
  }

  const inputStyle = {
    width:"100%", boxSizing:"border-box",
    background:"#e8f0ec", border:"1.5px solid #b8d4c4", borderRadius:10,
    color:"#1a3040", fontSize:16, padding:"12px 14px",
    outline:"none", fontFamily:"inherit", marginTop:6,
  };

  return (
    <div style={{ minHeight:"100vh", background:"#f0f4f8",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      padding:"28px 16px", fontFamily:"'Palatino Linotype','Book Antiqua',Palatino,serif" }}>

      <div style={{ textAlign:"center", marginBottom:32 }}>
        <div style={{ position:"relative", display:"inline-block", marginBottom:12 }}>
          <style>{`
            .logo-cloud {
              background: #1a237e18;
              border: 2.5px solid #1a237e99;
              border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
              padding: 14px 32px;
              position: relative;
              display: inline-block;
            }
            .logo-cloud::before {
              content: '';
              position: absolute;
              width: 22px; height: 22px;
              background: #1a237e18;
              border: 2.5px solid #1a237e99;
              border-radius: 50%;
              bottom: -18px; left: 28px;
            }
            .logo-cloud::after {
              content: '';
              position: absolute;
              width: 13px; height: 13px;
              background: #1a237e18;
              border: 2px solid #1a237e99;
              border-radius: 50%;
              bottom: -30px; left: 18px;
            }
          `}</style>
          <div className="logo-cloud">
            <span style={{ fontSize:18, fontWeight:700, color:"#1a237e",
              letterSpacing:"0.3em", textTransform:"uppercase", fontFamily:"inherit" }}>
              Between Us
            </span>
          </div>
          <div style={{ position:"absolute", width:8, height:8, borderRadius:"50%",
            background:"#1a237e18", border:"1.8px solid #1a237e99", bottom:-40, left:12 }} />
        </div>
        <div style={{ fontSize:30, fontWeight:700, color:"#1a3040", marginTop:18 }}>Argument Log</div>
        <div style={{ fontSize:14, color:"#3a5a6a", marginTop:6 }}>Track, reflect, and grow together</div>
      </div>

      <div style={{ background:"#ffffff", border:"1px solid #b8d4c4", borderRadius:18,
        width:"100%", maxWidth:380, padding:"28px 24px",
        boxShadow:"0 8px 32px rgba(26,96,58,0.1)" }}>

        <div style={{ display:"flex", background:"#e8f0ec", borderRadius:10, padding:3, marginBottom:24 }}>
          {[["login","Sign In"],["signup","Create Account"]].map(([m,lbl]) => (
            <button key={m} onClick={() => { setMode(m); setError(""); }} style={{
              flex:1, padding:"9px 0", border:"none", borderRadius:8,
              background: mode===m ? "#ffffff" : "transparent",
              color: mode===m ? "#1a6b3a" : "#3a5a6a",
              fontSize:14, fontWeight:700, cursor:"pointer", transition:"all 0.15s",
              boxShadow: mode===m ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
            }}>{lbl}</button>
          ))}
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {mode==="signup" && (
            <div>
              <label style={{ fontSize:12, color:"#2a4a5a", letterSpacing:"0.1em", textTransform:"uppercase" }}>Your Name</label>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Alex" style={inputStyle} />
            </div>
          )}
          <div>
            <label style={{ fontSize:12, color:"#2a4a5a", letterSpacing:"0.1em", textTransform:"uppercase" }}>Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" type="email" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize:12, color:"#2a4a5a", letterSpacing:"0.1em", textTransform:"uppercase" }}>Password</label>
            <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" type="password" style={inputStyle}
              onKeyDown={e=>{ if(e.key==="Enter") handleSubmit(); }} />
          </div>
          {error && (
            <div style={{ fontSize:13, color:"#b04a4a", background:"#b04a4a18",
              border:"1px solid #b04a4a44", borderRadius:8, padding:"8px 12px" }}>
              {error}
            </div>
          )}
          <button onClick={handleSubmit} style={{
            ...solidBtn("#1a6b3a"), width:"100%", padding:"13px", fontSize:16, marginTop:4,
          }}>
            {mode==="login" ? "Sign In" : "Create Account"}
          </button>
        </div>

        <div style={{ textAlign:"center", marginTop:18, fontSize:13, color:"#3a5a6a" }}>
          {mode==="login" ? "New here? " : "Already have an account? "}
          <button onClick={() => { setMode(mode==="login"?"signup":"login"); setError(""); }}
            style={{ background:"none", border:"none", color:"#1a237e", fontWeight:700,
              cursor:"pointer", fontSize:13, fontFamily:"inherit" }}>
            {mode==="login" ? "Create an account" : "Sign in"}
          </button>
        </div>
      </div>

      <div style={{ marginTop:20, fontSize:12, color:"#7a9aaa", textAlign:"center", maxWidth:300 }}>
        Your data is stored privately on this device. Cloud sync coming soon.
      </div>
    </div>
  );
}

function FolderSetupScreen({ onSave, existingFolder, onCancel }){
  const [name1,      setName1]      = useState(existingFolder?.name1      || "");
  const [name2,      setName2]      = useState(existingFolder?.name2      || "");
  const [folderName, setFolderName] = useState(existingFolder?.folderName || "");
  const [error,      setError]      = useState("");

  function handleSave(){
    if(!name1 || !name2){ setError("Please enter both names."); return; }
    onSave({
      id: existingFolder?.id || newId(),
      folderName: folderName || `${name1} & ${name2}`,
      name1, name2,
    });
  }

  const inputStyle = {
    width:"100%", boxSizing:"border-box",
    background:"#e8f0ec", border:"1.5px solid #b8d4c4", borderRadius:10,
    color:"#1a3040", fontSize:16, padding:"12px 14px",
    outline:"none", fontFamily:"inherit", marginTop:6,
  };

  return (
    <div style={{ minHeight:"100vh", background:"#f0f4f8",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      padding:"28px 16px", fontFamily:"'Palatino Linotype','Book Antiqua',Palatino,serif" }}>

      <div style={{ background:"#ffffff", border:"1px solid #b8d4c4", borderRadius:18,
        width:"100%", maxWidth:380, padding:"28px 24px",
        boxShadow:"0 8px 32px rgba(26,96,58,0.1)" }}>

        <div style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ fontSize:24, fontWeight:700, color:"#1a3040" }}>
            {existingFolder ? "Edit Folder" : "Set Up Your Folder"}
          </div>
          <div style={{ fontSize:14, color:"#3a5a6a", marginTop:6 }}>
            {existingFolder
              ? "Update the names for this folder."
              : "Enter the two people you want to track arguments between."}
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div>
            <label style={{ fontSize:12, color:"#2a4a5a", letterSpacing:"0.1em", textTransform:"uppercase" }}>First Person's Name</label>
            <input value={name1} onChange={e=>setName1(e.target.value)} placeholder="e.g. Alex" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize:12, color:"#2a4a5a", letterSpacing:"0.1em", textTransform:"uppercase" }}>Second Person's Name</label>
            <input value={name2} onChange={e=>setName2(e.target.value)} placeholder="e.g. Jordan" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize:12, color:"#2a4a5a", letterSpacing:"0.1em", textTransform:"uppercase" }}>
              Folder Name <span style={{ color:"#3a5a6a", fontWeight:400 }}>(optional)</span>
            </label>
            <input value={folderName} onChange={e=>setFolderName(e.target.value)}
              placeholder={name1 && name2 ? `${name1} & ${name2}` : "e.g. Home Life"}
              style={inputStyle} />
          </div>
          {error && (
            <div style={{ fontSize:13, color:"#b04a4a", background:"#b04a4a18",
              border:"1px solid #b04a4a44", borderRadius:8, padding:"8px 12px" }}>
              {error}
            </div>
          )}
          <button onClick={handleSave} style={{
            ...solidBtn("#1a6b3a"), width:"100%", padding:"13px", fontSize:16, marginTop:4,
          }}>
            {existingFolder ? "Save Changes" : "Get Started"}
          </button>
          {onCancel && (
            <button onClick={onCancel} style={{ ...ghostBtn, width:"100%", textAlign:"center" }}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function SettingsPage({ user, folder, onEditFolder, onDeleteData, onLogout, onClose }){
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div style={{ minHeight:"100vh", background:"#f0f4f8",
      display:"flex", flexDirection:"column", alignItems:"center",
      padding:"28px 16px 48px", fontFamily:"'Palatino Linotype','Book Antiqua',Palatino,serif" }}>

      <div style={{ width:"100%", maxWidth:400 }}>
        <div style={{ display:"flex", alignItems:"center", marginBottom:24 }}>
          <button onClick={onClose} style={{ background:"none", border:"none",
            color:"#2a4a5a", fontSize:22, cursor:"pointer", marginRight:12 }}>←</button>
          <div style={{ fontSize:24, fontWeight:700, color:"#1a3040" }}>Settings</div>
        </div>

        <div style={{ background:"#ffffff", border:"1px solid #b8d4c4", borderRadius:16, padding:"20px", marginBottom:16 }}>
          <SectionLabel>Account</SectionLabel>
          <div style={{ fontSize:16, color:"#1a3040", fontWeight:600, marginTop:8 }}>{user.name}</div>
          <div style={{ fontSize:13, color:"#3a5a6a", marginTop:2 }}>{user.email}</div>
        </div>

        <div style={{ background:"#ffffff", border:"1px solid #b8d4c4", borderRadius:16, padding:"20px", marginBottom:16 }}>
          <SectionLabel>Current Folder</SectionLabel>
          <div style={{ fontSize:16, color:"#1a3040", fontWeight:600, marginTop:8 }}>
            {folder ? folder.folderName : "No folder set up yet"}
          </div>
          {folder && (
            <div style={{ fontSize:13, color:"#3a5a6a", marginTop:2 }}>
              {folder.name1} & {folder.name2}
            </div>
          )}
          <button onClick={onEditFolder} style={{
            ...solidBtn("#1a237e"), marginTop:14, width:"100%", padding:"11px",
          }}>Edit Names / Folder</button>
        </div>

        <div style={{ background:"#ffffff", border:"1px solid #f5c0c0", borderRadius:16, padding:"20px", marginBottom:16 }}>
          <SectionLabel>Danger Zone</SectionLabel>
          {!confirmDelete ? (
            <button onClick={() => setConfirmDelete(true)} style={{
              ...solidBtn("#c0392b"), marginTop:14, width:"100%", padding:"11px",
            }}>Delete All Data</button>
          ) : (
            <div style={{ marginTop:14 }}>
              <div style={{ fontSize:14, color:"#b04a4a", marginBottom:12, lineHeight:1.5 }}>
                Are you sure? This will permanently delete all logged arguments and cannot be undone.
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={() => setConfirmDelete(false)} style={{ ...ghostBtn, flex:1 }}>Cancel</button>
                <button onClick={onDeleteData} style={{ ...solidBtn("#c0392b"), flex:1, padding:"11px" }}>
                  Yes, Delete All
                </button>
              </div>
            </div>
          )}
        </div>

        <button onClick={onLogout} style={{
          background:"none", border:"1px solid #b8d4c4", borderRadius:12,
          color:"#3a5a6a", fontSize:14, fontWeight:600, padding:"13px",
          cursor:"pointer", width:"100%",
        }}>Sign Out</button>
      </div>
    </div>
  );
}

export default function App(){
  const today = new Date();
  const [year,     setYear]     = useState(today.getFullYear());
  const [month,    setMonth]    = useState(today.getMonth());
  const [selected, setSelected] = useState(null);
  const [tab,      setTab]      = useState("calendar");
  const [screen,   setScreen]   = useState("app");

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("conflict_log_user");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const [folder, setFolder] = useState(() => {
    try {
      const saved = localStorage.getItem("conflict_log_folder");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem("conflict_log_data");
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  const [customTopics, setCustomTopics] = useState(() => {
    try {
      const saved = localStorage.getItem("conflict_log_topics");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [exportText, setExportText] = useState(null);

  useEffect(() => {
    try { localStorage.setItem("conflict_log_data", JSON.stringify(data)); } catch {}
  }, [data]);

  useEffect(() => {
    try { localStorage.setItem("conflict_log_topics", JSON.stringify(customTopics)); } catch {}
  }, [customTopics]);

  useEffect(() => {
    if(folder) try { localStorage.setItem("conflict_log_folder", JSON.stringify(folder)); } catch {}
  }, [folder]);

  useEffect(() => {
    if(!user) return;
    if("Notification" in window && Notification.permission === "default"){
      Notification.requestPermission();
    }
  }, [user]);

  function addCustomTopic(t){
    setCustomTopics(prev => prev.includes(t) ? prev : [...prev, t]);
  }

  function handleLogin(user, isNewUser){
    setUser(user);
    if(isNewUser) setScreen("folderSetup");
  }

  function handleLogout(){
    try { localStorage.removeItem("conflict_log_user"); } catch{}
    setUser(null);
    setScreen("app");
  }

  function handleSaveFolder(f){
    setFolder(f);
    setScreen("app");
  }

  function handleDeleteData(){
    setData({});
    setCustomTopics([]);
    try {
      localStorage.removeItem("conflict_log_data");
      localStorage.removeItem("conflict_log_topics");
    } catch{}
    setScreen("app");
  }

  function handleExport(){
    const allEntries = Object.entries(data).flatMap(([k,entries]) =>
      entries.map(e => ({ ...e, dateKey:k }))
    ).sort((a,b) => a.dateKey.localeCompare(b.dateKey));
    const lines = ["ARGUMENT LOG EXPORT", "===================", ""];
    let lastMonth = "";
    allEntries.forEach(e => {
      const mo = e.dateKey.slice(0,7);
      if(mo !== lastMonth){
        lines.push(`\n--- ${MONTHS[parseInt(mo.split("-")[1])-1]} ${mo.split("-")[0]} ---`);
        lastMonth = mo;
      }
      lines.push(`${e.dateKey}  [${INTENSITIES[e.intensity].label}]  ${e.topic}`);
      if(e.note) lines.push(`  Note: ${e.note}`);
    });
    setExportText(lines.join("\n"));
  }

  if(!user) return <LoginScreen onLogin={handleLogin} />;

  if(screen==="folderSetup") return (
    <FolderSetupScreen
      existingFolder={folder}
      onSave={handleSaveFolder}
      onCancel={folder ? () => setScreen("app") : null}
    />
  );

  if(screen==="settings") return (
    <SettingsPage
      user={user}
      folder={folder}
      onEditFolder={() => setScreen("folderSetup")}
      onDeleteData={handleDeleteData}
      onLogout={handleLogout}
      onClose={() => setScreen("app")}
    />
  );

  const daysInMonth = getDaysInMonth(year,month);
  const firstDay    = getFirstDay(year,month);

  function prevMonth(){ if(month===0){setMonth(11);setYear(y=>y-1);}else setMonth(m=>m-1); setSelected(null); }
  function nextMonth(){ if(month===11){setMonth(0);setYear(y=>y+1);}else setMonth(m=>m+1); setSelected(null); }

  function addEntry(dateKey,entry)    { setData(d=>({...d,[dateKey]:[...(d[dateKey]||[]),entry]})); }
  function updateEntry(dateKey,entry) { setData(d=>({...d,[dateKey]:d[dateKey].map(e=>e.id===entry.id?entry:e)})); }
  function deleteEntry(dateKey,id){
    setData(d=>{
      const upd=(d[dateKey]||[]).filter(e=>e.id!==id);
      const n={...d};
      if(upd.length===0) delete n[dateKey]; else n[dateKey]=upd;
      return n;
    });
  }

  const cells=[];
  for(let i=0;i<firstDay;i++) cells.push(null);
  for(let d=1;d<=daysInMonth;d++) cells.push(d);

  const isToday = d => d===today.getDate() && month===today.getMonth() && year===today.getFullYear();

  function dotColor(key){
    const entries=data[key]||[];
    if(!entries.length) return null;
    return INTENSITIES[Math.max(...entries.map(e=>e.intensity))].color;
  }

  const selectedKey     = selected ? toKey(year,month,selected) : null;
  const selectedEntries = selectedKey ? (data[selectedKey]||[]) : [];
  const selectedLabel   = selected ? `${MONTHS[month]} ${selected}, ${year}` : "";

  return (
    <div style={{ minHeight:"100vh", background:"#f0f4f8",
      display:"flex", flexDirection:"column", alignItems:"center",
      padding:"28px 16px 48px",
      fontFamily:"'Palatino Linotype','Book Antiqua',Palatino,serif" }}>

      {exportText && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)",
          display:"flex", alignItems:"center", justifyContent:"center",
          zIndex:1000, padding:16 }}>
          <div style={{ background:"#ffffff", borderRadius:16, width:"100%", maxWidth:400,
            padding:"22px", boxShadow:"0 20px 60px rgba(0,0,0,0.3)", maxHeight:"80vh",
            display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ fontSize:16, fontWeight:700, color:"#1a3040" }}>Export Data</div>
              <button onClick={() => setExportText(null)} style={{
                background:"none", border:"none", fontSize:20, color:"#3a5a6a", cursor:"pointer" }}>✕</button>
            </div>
            <div style={{ fontSize:13, color:"#3a5a6a" }}>Select all and copy to save your data.</div>
            <textarea readOnly value={exportText} onClick={e => e.target.select()}
              style={{ flex:1, minHeight:280, background:"#e8f0ec",
                border:"1.5px solid #b8d4c4", borderRadius:8,
                color:"#1a3040", fontSize:12, padding:"10px",
                fontFamily:"monospace", resize:"none", outline:"none" }} />
            <button onClick={() => {
              navigator.clipboard?.writeText(exportText)
                .then(() => alert("Copied to clipboard!"))
                .catch(() => alert("Please manually select and copy the text above."));
            }} style={{ ...solidBtn("#1a6b3a"), padding:"11px" }}>Copy to Clipboard</button>
          </div>
        </div>
      )}

      <div style={{ textAlign:"center", marginBottom:24, width:"100%", maxWidth:400 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
          <button onClick={handleExport} style={{
            background:"none", border:"1px solid #b8d4c4", borderRadius:8,
            color:"#3a5a6a", fontSize:12, padding:"5px 10px", cursor:"pointer",
          }}>Export</button>
          <div style={{ textAlign:"center" }}>
            <div style={{ position:"relative", display:"inline-block", marginBottom:2 }}>
              <div style={{ background:"#1a237e18", border:"2px solid #1a237e99",
                borderRadius:"50% 50% 50% 50% / 40% 40% 60% 60%",
                padding:"6px 18px", display:"inline-block", position:"relative" }}>
                <span style={{ fontSize:11, fontWeight:700, color:"#1a237e",
                  letterSpacing:"0.25em", textTransform:"uppercase" }}>Between Us</span>
                <div style={{ position:"absolute", width:10, height:10, borderRadius:"50%",
                  background:"#1a237e18", border:"1.5px solid #1a237e99", bottom:-9, left:14 }}/>
                <div style={{ position:"absolute", width:6, height:6, borderRadius:"50%",
                  background:"#1a237e18", border:"1.5px solid #1a237e99", bottom:-16, left:8 }}/>
              </div>
            </div>
            <div style={{ fontSize:22, fontWeight:700, color:"#1a3040", letterSpacing:"-0.02em", marginTop:6 }}>Argument Log</div>
          </div>
          <button onClick={() => setScreen("settings")} style={{
            background:"none", border:"1px solid #b8d4c4", borderRadius:8,
            color:"#3a5a6a", fontSize:18, padding:"5px 10px", cursor:"pointer",
          }}>⚙️</button>
        </div>
        {folder && (
          <div style={{ fontSize:14, color:"#3a5a6a", fontWeight:600 }}>
            {folder.name1} & {folder.name2}
          </div>
        )}
      </div>

      <div style={{ display:"flex", marginBottom:18, background:"#ffffff",
        border:"1px solid #b8d4c4", borderRadius:12, overflow:"hidden",
        width:"100%", maxWidth:400, padding:4, gap:4 }}>
        {[["calendar","📅  Calendar"],["stats","📊  Summary"]].map(([t,lbl]) => (
          <button key={t} onClick={() => { setTab(t); if(t==="stats") setSelected(null); }} style={{
            flex:1, padding:"9px 0", border:"none", borderRadius:8,
            background: tab===t ? "#c8e6d4" : "transparent",
            color: tab===t ? "#1a6b3a" : "#2a4a5a",
            fontSize:14, fontWeight:700, letterSpacing:"0.06em",
            cursor:"pointer", transition:"all 0.15s",
          }}>{lbl}</button>
        ))}
      </div>

      {tab==="stats" && (
        <div style={{ background:"#ffffff", border:"1px solid #b8d4c4", borderRadius:16,
          width:"100%", maxWidth:400, padding:"22px 18px",
          boxShadow:"0 8px 24px rgba(0,0,0,0.08)" }}>
          <SummaryStats data={data} year={year} month={month} />
        </div>
      )}

      {tab==="calendar" && (
        <>
          <div style={{ background:"#ffffff", border:"1px solid #b8d4c4", borderRadius:16,
            width:"100%", maxWidth:400, padding:"22px 18px",
            boxShadow:"0 8px 24px rgba(0,0,0,0.08)" }}>

            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
              <button onClick={prevMonth} style={{ background:"none",border:"none",color:"#2a4a5a",fontSize:26,cursor:"pointer",padding:"0 10px",lineHeight:1 }}>‹</button>
              <div style={{ color:"#1a3040", fontWeight:700, fontSize:20 }}>{MONTHS[month]} {year}</div>
              <button onClick={nextMonth} style={{ background:"none",border:"none",color:"#2a4a5a",fontSize:26,cursor:"pointer",padding:"0 10px",lineHeight:1 }}>›</button>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", marginBottom:6 }}>
              {DAYS.map(d => (
                <div key={d} style={{ textAlign:"center",fontSize:11,letterSpacing:"0.12em",
                  color:"#3a5a6a",textTransform:"uppercase",paddingBottom:6 }}>{d}</div>
              ))}
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:3 }}>
              {cells.map((day,i) => {
                if(!day) return <div key={`e${i}`} />;
                const key   = toKey(year,month,day);
                const color = dotColor(key);
                const isSel = selected===day;
                const tod   = isToday(day);
                return (
                  <button key={day} onClick={() => setSelected(isSel ? null : day)} style={{
                    background: isSel ? "#1a6b3a" : tod ? "#ddeae3" : "transparent",
                    border: tod&&!isSel ? "1.5px solid #3a5a6a" : "1.5px solid transparent",
                    borderRadius:9, padding:"7px 2px",
                    display:"flex", flexDirection:"column", alignItems:"center",
                    cursor:"pointer", transition:"background 0.13s",
                  }}>
                    <span style={{ fontSize:14, lineHeight:1,
                      color: isSel?"#ffffff":tod?"#1a3040":"#2a4a5a",
                      fontWeight: tod||isSel?700:400 }}>{day}</span>
                    {color && (
                      <span style={{ display:"block", width:5, height:5, borderRadius:"50%",
                        background: isSel?"rgba(255,255,255,0.7)":color, marginTop:3 }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {selected && (
            <DayPanel
              dateKey={selectedKey}
              dateLabel={selectedLabel}
              entries={selectedEntries}
              onAdd={addEntry}
              onUpdate={updateEntry}
              onDelete={deleteEntry}
              customTopics={customTopics}
              onAddCustomTopic={addCustomTopic}
            />
          )}
        </>
      )}
    </div>
  );
}
