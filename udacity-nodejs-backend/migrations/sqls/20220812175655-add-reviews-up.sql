CREATE TABLE "reviews" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "website_id" int,
  "created_at" date DEFAULT (now()),
  "comment" varchar,
  "rating" int
);

ALTER TABLE "reviews" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "reviews" ADD FOREIGN KEY ("website_id") REFERENCES "websites" ("id");

ALTER TABLE reviews ADD UNIQUE (user_id, website_id);