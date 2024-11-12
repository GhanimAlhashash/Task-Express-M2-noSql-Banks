let accounts = require("../../accounts");
const Account = require("../../models/Account");

exports.accountsList = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.accountCreate = async (req, res) => {
  // const id = accounts[accounts.length - 1].id + 1;
  // const newAccount = { ...req.body, funds: 0, id };
  // accounts.push(newAccount);
  // res.status(201).json(newAccount);
  try {
    const newAccount = await Account.create(req.body);
    res.status(201).json(newAccount);
  } catch {
    res.status(500).json({ message: error.message });
  }
};

exports.accountDelete = async (req, res) => {
  // const { accountId } = req.params;
  // const foundAccount = accounts.find((account) => account.id === +accountId);
  // if (foundAccount) {
  //   accounts = accounts.filter((account) => account.id !== +accountId);
  //   res.status(204).end();
  // } else {
  //   res.status(404).json({ message: "Account not found" });
  // }
  const { accountId } = req.params;
  try {
    const foundAccount = await Account.findById(accountId);
    if (!foundAccount) res.status(404).json({ message: "account not found" });

    await foundAccount.deleteOne();

    res.status(200).json({ message: "account deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.accountUpdate = async (req, res) => {
  //   const {accountId} = req.params;
  //   try {
  // const foundAccount = await Account.findById(accountId);
  // if (!foundAccount) res.status(404).json({message: "account not found"});

  // const {username, funds} = req.body;

  // foundAccount.username = username;
  // foundAccount.funds = funds;
  // await foundAccount.save()
  //   } catch (error) {
  //     res.status(500).json(foundAccount);

  //   }
  //   res.status(200).json(foundAccount)
  try {
    const { accountId } = req.params;
    const foundAccount = await Account.findById(accountId);
    if (foundAccount) {
      await foundAccount.updateOne(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.accountsGet = (req, res) => {
  res.json(accounts);
};

exports.getAccountByUsername = (req, res) => {
  const { username } = req.params;
  const foundAccount = accounts.find(
    (account) => account.username === username
  );
  if (req.query.currency === "usd") {
    const accountInUsd = { ...foundAccount, funds: foundAccount.funds * 3.31 };
    res.status(201).json(accountInUsd);
  }
  res.status(201).json(foundAccount);
};
