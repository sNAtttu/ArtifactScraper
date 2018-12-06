import * as requestPromise from "request-promise";

export default class DataService {
  public async getRawHtmlFromSite(url: string): Promise<string> {
    return requestPromise(url);
  }
}
