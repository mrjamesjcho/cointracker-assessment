-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "txid" TEXT NOT NULL,
    "txIndex" BIGINT NOT NULL,
    "blockHeight" INTEGER NOT NULL,
    "blockIndex" BIGINT,
    "time" TIMESTAMP(3) NOT NULL,
    "fee" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "lockTime" INTEGER NOT NULL,
    "doubleSpend" BOOLEAN NOT NULL,
    "addressId" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Input" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "value" BIGINT NOT NULL,
    "prevTxIndex" BIGINT NOT NULL,
    "n" INTEGER NOT NULL,
    "transactionId" TEXT NOT NULL,

    CONSTRAINT "Input_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Output" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "value" BIGINT NOT NULL,
    "spent" BOOLEAN NOT NULL,
    "n" INTEGER NOT NULL,
    "transactionId" TEXT NOT NULL,

    CONSTRAINT "Output_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_txid_key" ON "Transaction"("txid");

-- CreateIndex
CREATE UNIQUE INDEX "Address_address_key" ON "Address"("address");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Input" ADD CONSTRAINT "Input_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Output" ADD CONSTRAINT "Output_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
