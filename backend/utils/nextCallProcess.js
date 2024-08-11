import { transactionQueue } from "../constants.js";

let isProcessing = false;

const nextCallProcess = () => {
  if (transactionQueue.length == 0 || isProcessing) {
    return;
  }

  isProcessing = true;
  const currentTransaction = transactionQueue.shift();

  currentTransaction().then(() => {
    isProcessing = false;
    nextCallProcess();
  });
};

export { nextCallProcess };
