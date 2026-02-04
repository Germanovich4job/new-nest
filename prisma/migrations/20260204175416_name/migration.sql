-- AlterTable
ALTER TABLE "users" ADD COLUMN     "address" TEXT NOT NULL DEFAULT 'address',
ADD COLUMN     "age" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "avatar" TEXT NOT NULL DEFAULT 'no image';
