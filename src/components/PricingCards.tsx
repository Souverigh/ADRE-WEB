export type PricingPlan = {
  name: string;
  price: string;
  volume: string;
  perPage: string;
  description: string;
  badge: string;
};

export function PricingCards({plans}:{plans: readonly PricingPlan[]}) {
  return <div className="plans pricing5">
    {plans.map(p => <article className={`plan${p.badge ? ' planPopular' : ''}`} key={p.name}>
      {p.badge && <div className="planBadge">{p.badge}</div>}
      <h3>{p.name}</h3>
      <div className="planPrice">{p.price}</div>
      <div className="planVolume">{p.volume}</div>
      {p.perPage && <div className="small">{p.perPage}</div>}
      <p>{p.description}</p>
    </article>)}
  </div>;
}
