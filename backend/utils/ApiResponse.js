class ApiResponse {
  constructor(statusCode, data, message = "Success", token) {
    (this.statusCode = statusCode),
      (this.data = data),
      (this.message = message),
      (this.success = statusCode < 400);
    if (token) {
      this.token = token;
    } else {
      return;
    }
  }
}

module.exports = { ApiResponse };
