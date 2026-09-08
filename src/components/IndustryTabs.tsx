'use client';
import {useState} from 'react';

export function IndustryTabs({copy}:{copy:any}) {
  const entries=Object.entries(copy.items) as [string,[string,string]][];
  const [active,setActive]=useState(entries[0][0]);
  const current=entries.find(([k])=>k===active) ?? entries[0];
  return <div className="industryWrap">
    <div className="tabRow">{entries.map(([key,[title]])=>
      <button key={key} onClick={()=>setActive(key)} className={active===key?'activeTab':''}>{title}</button>)}
    </div>
    <div className="industryCard"><h3>{current[1][0]}</h3><p>{current[1][1]}</p>
      <div className="industryFlow">{copy.flow.map((x:string)=><span key={x}>{x}</span>)}</div>
    </div>
  </div>;
}
