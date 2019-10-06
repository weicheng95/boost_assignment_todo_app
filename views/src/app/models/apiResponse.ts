export class ApiResponse {
  result: Boolean;
  message?: String;
  data?: any;

  constructor(result: Boolean, message?: String, data?: any) {
    this.result = result;
    this.message = message;
    this.data = data;
  }
}