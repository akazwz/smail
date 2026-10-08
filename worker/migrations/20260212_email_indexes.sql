CREATE INDEX IF NOT EXISTS idx_emails_to_address_time ON emails (to_address, time DESC);
CREATE INDEX IF NOT EXISTS idx_emails_time ON emails (time);
