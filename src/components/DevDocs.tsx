export type DevDocsCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  authTitle: string;
  authBody: string;
  recognizeTitle: string;
  recognizeBody: string;
  recognizeRequestLabel: string;
  recognizeResponseLabel: string;
  recognizeNote: string;
  batchTitle: string;
  batchBody: string;
  batchOpenLabel: string;
  batchCloseLabel: string;
  webhookTitle: string;
  webhookBody: string;
  webhookSignatureNote: string;
  errorsTitle: string;
  errorsBody: string;
  errors: readonly (readonly [string, string])[];
  limitsTitle: string;
  limitsBody: string;
  typesTitle: string;
  typesBody: string;
};

const RECOGNIZE_REQUEST = `POST /api/v1/recognize
x-api-key: YOUR_API_KEY
Content-Type: application/json

{
  "image": "<base64>",
  "mimeType": "image/jpeg",
  "docType": "Справка"
}`;

const RECOGNIZE_RESPONSE = `{
  "documentType": "Справка",
  "text": "...",
  "fields": [
    { "label": "ФИО", "value": "Асанов Азамат", "confidence": 97 },
    { "label": "Дата выдачи", "value": "01.03.2026", "confidence": 92 }
  ],
  "items": [],
  "confidence": 94
}`;

const BATCH_OPEN = `POST /api/v1/batch
x-api-key: YOUR_API_KEY

{}

→ { "batchId": "batch_abc123", "createdAt": "2026-09-08T10:00:00Z" }`;

const BATCH_CLOSE = `POST /api/v1/batch
x-api-key: YOUR_API_KEY

{ "batchId": "batch_abc123", "finish": true }

→ {
  "batchId": "batch_abc123",
  "documentCount": 24,
  "errorCount": 0,
  "docTypeCounts": { "Справка": 24 },
  "webhookAttempted": true,
  "webhookDelivered": true
}`;

const WEBHOOK_PAYLOAD = `POST <ваш webhookUrl>
X-Tamga-Event: batch.completed
X-Tamga-Signature: sha256=<HMAC-SHA256 тела запроса>

{
  "event": "batch.completed",
  "batchId": "batch_abc123",
  "documentCount": 24,
  "errorCount": 0,
  "docTypeCounts": { "Справка": 24 },
  "createdAt": "2026-09-08T10:00:00Z",
  "closedAt": "2026-09-08T10:04:12Z",
  "deliveredAt": "2026-09-08T10:04:12Z"
}`;

export function DevDocs({ copy }: { copy: DevDocsCopy }) {
  const c = copy;
  return (
    <main>
      <section className="section">
        <div className="container narrow">
          <div className="eyebrow">{c.eyebrow}</div>
          <h1 className="display smallDisplay">{c.title}</h1>
          <p className="lead">{c.lead}</p>

          <div className="docsSection">
            <h2 className="h3">{c.authTitle}</h2>
            <p>{c.authBody}</p>
          </div>

          <div className="docsSection">
            <h2 className="h3">{c.recognizeTitle}</h2>
            <p>{c.recognizeBody}</p>
            <p className="small" style={{ marginTop: 16 }}>{c.recognizeRequestLabel}</p>
            <div className="codebox"><pre>{RECOGNIZE_REQUEST}</pre></div>
            <p className="small" style={{ marginTop: 16 }}>{c.recognizeResponseLabel}</p>
            <div className="codebox"><pre>{RECOGNIZE_RESPONSE}</pre></div>
            <p className="small" style={{ marginTop: 12 }}>{c.recognizeNote}</p>
          </div>

          <div className="docsSection">
            <h2 className="h3">{c.batchTitle}</h2>
            <p>{c.batchBody}</p>
            <p className="small" style={{ marginTop: 16 }}>{c.batchOpenLabel}</p>
            <div className="codebox"><pre>{BATCH_OPEN}</pre></div>
            <p className="small" style={{ marginTop: 16 }}>{c.batchCloseLabel}</p>
            <div className="codebox"><pre>{BATCH_CLOSE}</pre></div>
          </div>

          <div className="docsSection">
            <h2 className="h3">{c.webhookTitle}</h2>
            <p>{c.webhookBody}</p>
            <div className="codebox"><pre>{WEBHOOK_PAYLOAD}</pre></div>
            <p className="small" style={{ marginTop: 12 }}>{c.webhookSignatureNote}</p>
          </div>

          <div className="docsSection">
            <h2 className="h3">{c.errorsTitle}</h2>
            <p>{c.errorsBody}</p>
            <div className="security-list" style={{ marginTop: 16 }}>
              {c.errors.map(([code, desc]) => (
                <div key={code}>
                  <span className="errorCode">{code}</span>
                  <span>{desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="docsSection">
            <h2 className="h3">{c.limitsTitle}</h2>
            <p>{c.limitsBody}</p>
          </div>

          <div className="docsSection">
            <h2 className="h3">{c.typesTitle}</h2>
            <p>{c.typesBody}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
