> A router helps us divide URLs in small ‘mini-applications’

- [x] Yes.
- [ ] No.

<br>

> How can I make a router called `productsRouter`?

- [ ] const productsRouter = express.MakeRouter()
- [x] const productsRouter = express.Router()
- [ ] const productsRouter = express.StartRouter()
- [ ] const productsRouter = express.Router

<br>

> How can I use the `productsRouter` for the `/products` URL prefix?

- [ ] app.router("/products", productsRouter)
- [ ] app.use(productsRouter).for("/products")
- [ ] productsRouter.get("/")
- [x] app.use("/products", productsRouter)

<br>

> How can I create a `get` router inside of `productsRouter` for the `/products` URL?

- [x] productsRouter.get("/", fn)
- [ ] productsRouter.get("/products", fn)

<br>

> If I have `export default B` on `A.js` I can import `B` using

- [ ] import { B } from "./A.js"
- [x] import Z from "./A.js"

<br>

> If I have `export B` on `A.js` I can import `B` using

- [x] import { B } from "./A.js"
- [ ] import B from "./A.js"

<br>

> `A.js` file can have more than one `default` export.

- [ ] Yes.
- [x] No.

<br>

> `A.js` file can have many `export const ...`

- [x] Yes.
- [ ] No.

<br>

> On this URL: `/products/:category/:id` what are the parameters?

- [ ] id
- [ ] category
- [x] id, category
- [ ] products

<br>

> How can I make my URL have a ‘id’ parameter?

- [ ] /products/@id
- [ ] /products/#id
- [x] /products/:id
- [ ] /products/\*id

<br>

> On my controller, how can I access `id` on this URL `/products/:id`

- [ ] req.url.id
- [ ] req.id
- [x] req.params.id
- [ ] req.params[":id"]

<br>

> To return HTML to the user we need to use templates, it's the only option.

- [ ] Yes.
- [x] No.

<br>

> Pug is the only template engine we can use with Express.

- [ ] Yes.
- [x] No.

<br>

> A template engine takes sexy code and turns it into normal HTML.

- [x] Yes.
- [ ] No.

<br>

> What is the name of the folder where Express looks for the templates by default?

- [ ] '/templates'
- [ ] '/pug'
- [ ] '/html'
- [x] '/views'
