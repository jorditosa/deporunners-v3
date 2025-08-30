// Define HTTP status codes for better code readability and consistency
export const STATUS_CODES = {
  BAD_REQUEST: 400, // Client sent an invalid request
  TOO_MANY_REQUESTS: 429, // Client has sent too many requests in a given amount of time
  MANY_REQUESTED: 410, // The requested resource is no longer available at the server
  SUCCESS_REQUESTED: 200, // The request was successful
  NO_CONTENT: 204, // The server successfully processed the request but there is no content to send
};


export const STATUS_LOGGED = {
  NO_LOGGED: 'no-logged',
  LOGGED: 'logged-in'
}