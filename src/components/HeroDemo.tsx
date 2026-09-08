'use client';
import {useEffect,useState} from 'react';

type DemoCopy = {
  workspaceLabel:string;
  steps:readonly string[];
  uploadHint:string;
  scanCaption:string;
  fields:readonly (readonly [string,string,string])[];
  badgeOk:string;
  badgeCheck:string;
  exportDone:string;
};

export function HeroDemo({copy}:{copy:DemoCopy}) {
  const [active,setActive]=useState(0);
  const total=copy.steps.length;

  useEffect(()=>{
    const id=setInterval(()=>setActive(a=>(a+1)%total),3400);
    return ()=>clearInterval(id);
  },[total]);

  return <div className="heroDemo" aria-label={copy.workspaceLabel}>
    <div className="demoChrome"><span/><span/><span/></div>
    <div className="demoProgress">
      {copy.steps.map((_,i)=><div className="barTrack" key={i}>
        <div className="barFill" style={active===i?{width:'100%',transition:'width 3400ms linear'}:{width:i<active?'100%':'0%',transition:'none'}}/>
      </div>)}
    </div>
    <div className="demoStage">
      <div className={`demoScene${active===0?' active':''}`}>
        <div className="upDrop">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path d="M12 16V4M12 4l-4 4M12 4l4 4"/><path d="M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3"/></svg>
          <span>{copy.uploadHint}</span>
        </div>
      </div>
      <div className={`demoScene${active===1?' active':''}`}>
        <div className="scanWrap">
          {[70,90,60,80,50].map((w,i)=><div className="sLine" style={{width:`${w}%`}} key={i}/>)}
          <div className="scanSweep"/>
          <div className="scanCaption">{copy.scanCaption}</div>
        </div>
      </div>
      <div className={`demoScene${active===2?' active':''}`}>
        <div className="fieldsDemo">
          {copy.fields.map(([label,value,status],i)=><div className="fRow" key={label} style={{animationDelay:`${0.15+i*0.35}s`}}>
            <div><span className="fl">{label}</span><span className="fv">{value}</span></div>
            <span className={`badge ${status==='ok'?'badgeOk':'badgeWarn'}`}>{status==='ok'?copy.badgeOk:copy.badgeCheck}</span>
          </div>)}
        </div>
      </div>
      <div className={`demoScene${active===3?' active':''}`}>
        <div className="exportDemo">
          <div className="exportIcons">
            {['XLSX','PDF','CSV','JSON'].map((x,i)=><div className="chip" style={{animationDelay:`${0.1+i*0.2}s`}} key={x}>{x}</div>)}
          </div>
          <div className="exportDone">{copy.exportDone}</div>
        </div>
      </div>
    </div>
    <div className="demoCaptionRow">
      {copy.steps.map((label,i)=><span className={`stepLabel${active===i?' active':''}`} key={label}>{label}</span>)}
    </div>
  </div>;
}
