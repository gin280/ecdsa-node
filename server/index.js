const express = require("express")
const app = express()
const cors = require("cors")
const port = 3042

app.use(cors())
app.use(express.json())

const balances = {
  "04b6af15c493360472d14125906cae59474fe25ee7c128489edff2c46324c8e1d742caae643689f31e7dcdd3d399c546fbcfa2dc788ebe2cf1b0dc8c6c1f10a1fc": 100,
  "04d20a540204f34539c648fb5dad24fd81bbe30c2c405421b3b4672bd6b0504f034dadac489b29556b8583aaa726452ee8e06a0ef006b1081b4af7a37d56dbfc46": 50,
  "042e0b32788419eeeaa336decba340487dfe04e02f3543969142927dc077ea6c2287eb74da9e9882e056f985cb05d2d5c1c33d3d84a52f2f30da3e2115b418a98a": 75,
}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params
  const balance = balances[address] || 0
  res.send({ balance })
})

app.post("/send", (req, res) => {
  // TODO: get a signature from the client-side application
  // recover the public address from the signature
  const { sender, recipient, amount } = req.body

  setInitialBalance(sender)
  setInitialBalance(recipient)

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" })
  } else {
    balances[sender] -= amount
    balances[recipient] += amount
    res.send({ balance: balances[sender] })
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0
  }
}
