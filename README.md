# Sample Hardhat Template

## Steps to run!

### Installing template 🏗️

```
git clone https://github.com/RizeLabs/Sample-Hardhat-Template.git
cd Sample-Hardhat-Template/
npm install
```
### Running scripts 🏃‍♂️

- Encrypted token transfer
```
npx hardhat run scripts/transferErc20.ts --network encifher
```

- Encrypting voting over proposal
```
npx hardhat run scripts/encryptedVoting.ts --network encifher
```

### Precautions ⚠️

- Make sure to use node version greater or equal to `20.0.0`
- In case if you are receiving error like this, Then make sure you are using `fhevm` version `0.5.1` i.e `fhevm@0.5.1`
<img width="464" alt="error" src="https://github.com/user-attachments/assets/6288745a-f60c-4214-a89e-a47dcaa51d63">