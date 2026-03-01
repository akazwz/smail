CREATE TABLE IF NOT EXISTS emails (
    id TEXT PRIMARY KEY,
    to_address TEXT,
    from_name TEXT,
    from_address TEXT,
    subject TEXT,
    time INTEGER NOT NULL
);
