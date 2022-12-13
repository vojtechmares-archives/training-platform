.PHONY: dev
dev:
	pnpm run dev

.PHONY: db-push
db-push:
	npx prisma db push

.PHONY: db-seed
db-seed:
	npx prisma db seed
