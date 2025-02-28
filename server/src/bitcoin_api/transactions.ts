import { RESTDataSource } from "@apollo/datasource-rest";

class TransactionsAPI extends RESTDataSource {
  override baseURL = "https://blockchain.info/";

  async getTransactions(address: string): Promise<any> {
    return this.get(`rawaddr/${encodeURIComponent(address)}`);
  }

  async getBalance(address: string): Promise<any> {
    return this.get(`balance?active=${encodeURIComponent(address)}`);
  }
}

export default new TransactionsAPI();
