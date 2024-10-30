CREATE TABLE "Users" (
    "Id" UUID PRIMARY KEY,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Hash" BYTEA NOT NULL
);
