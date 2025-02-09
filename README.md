### `index.js` 실행시키는 `node` 명령어

```json
{
  "scripts": {
    "dev": "node index.js"
  },
}
```

<br>

### `babel` 적용

```json
{
  "scripts": {
    "dev": "babel-node index"
  },
}
```

<br>

### `nodemon` 적용

```json
{
  "scripts": {
    "dev": "nodemon --exec babel-node index"
  },
}
```