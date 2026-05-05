CREATE TABLE newsletter_sends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT now(),
  recipient_count INT NOT NULL,
  failure_count INT DEFAULT 0,
  triggered_by TEXT DEFAULT 'admin'
);
