'use client';

import {FormEvent, useState} from 'react';

type DemoFormProps = {
  fields: {name:string;company:string;phone:string;email:string;industry:string;volume:string;workflow:string};
  options: readonly (readonly [string, string])[];
  submit: string;
  sending: string;
  success: string;
  error: string;
};

export function DemoForm({fields, options, submit, sending, success, error}: DemoFormProps) {
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('/api/demo', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('Delivery failed');
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return <>
    <form className="demoForm" onSubmit={handleSubmit}>
      <label>{fields.name}<input name="name" required /></label>
      <label>{fields.company}<input name="company" /></label>
      <label>{fields.phone}<input name="phone" /></label>
      <label>{fields.email}<input name="email" type="email" required /></label>
      <label>{fields.industry}<select name="industry">{options.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label>
      <label>{fields.volume}<input name="volume" /></label>
      <label className="fullField">{fields.workflow}<textarea name="workflow" rows={5} required /></label>
      <button className="btn primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? sending : submit}</button>
    </form>
    {status === 'success' && <p className="small" role="status">{success}</p>}
    {status === 'error' && <p className="small" role="alert">{error}</p>}
  </>;
}