> A server is a computer listening for requests.

- [x] Yes.
- [ ] No.

<br>

> When we go to `google.com` is the same as going to `google.com/`.

- [x] Yes.
- [ ] No.

<br>

> When we go to `google.com` with our browser what kind of request are we making?

- [x] GET request
- [ ] POST request

<br>

> A GET request happens when the user wants to sends data to the server.

- [ ] Yes.
- [x] No.

<br>

> What is a route handler?

- [ ] The function called when the server starts listening.
- [x] The function called when th user goes to a URL.

<br>

> What is the first argument given to our route handlers?

- [x] The request object
- [ ] The response object

<br>

> What is the second argument given to our route handlers?

- [ ] The request object
- [x] The response object

<br>

> What can we find inside the `request` object?

- [x] Information about the request the user is making.
- [ ] Function to respond to the user.

<br>

> What can we find inside the `response` object?

- [ ] Information about the request the user is making.
- [x] Function to respond to the user.

<br>

> What is a middleware?

- [ ] A function that is used to respond to the user.
- [x] A function that runs between the request and the response to th user.

<br>

> What is the third argument given to our handlers?

- [ ] The request object
- [ ] The response object
- [x] The next() function

<br>

> How can a middleware move on to the next handler?

- [ ] Call the res.end() function
- [ ] Call the res.send() function
- [x] Call the next() function

<br>

> How can I make a middleware run for **every** route?

- [x] app.use(middleware)
- [ ] app.get("/", middleware, handler)

<br>

> How can I make a middleware run **only** for one route.

- [ ] app.use(middleware)
- [x] app.get("/", middleware, handler)

<br>

> Middlewares will always call the function `next()`

- [ ] Yes.
- [x] No.
