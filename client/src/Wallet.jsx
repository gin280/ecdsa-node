import server from "./server"
import * as secp from "ethereum-cryptography/secp256k1"
import { toHex } from "ethereum-cryptography/utils"

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
}) {
  async function onChange(evt) {
    const privateKey = evt.target.value
    if (privateKey) {
      setPrivateKey(privateKey)
      const address = toHex(secp.getPublicKey(privateKey))
      const {
        data: { balance },
      } = await server.get(`balance/${address}`)
      setAddress(address)
      setBalance(balance)
    } else {
      setPrivateKey("")
      setAddress("")
      setBalance(0)
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input
          placeholder="Type an privateKey, for example: 0x1"
          value={privateKey}
          onChange={onChange}
        ></input>
      </label>
      {address?.slice(0, 20)}
      <div className="balance">Balance: {balance}</div>
    </div>
  )
}

export default Wallet
