export interface HttpResult {
  success: boolean;
  status: number;
  messages: string[];
  data?: any;
}
