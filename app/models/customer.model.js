const sql = require("./db.js");

const Customer = function (customer) {
  this.email = customer.email;
  this.name = customer.name;
  this.active = customer.active;
};

// Create New Customer
Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Created Customer: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

// Get Customer By ID
Customer.findById = (customerId, result) => {
  sql.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found Customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // ID Not Found
    result({ kind: "Not_Found" }, null);
  });
};

// Get All Customer
Customer.getAll = (result) => {
  sql.query("SELECT * FROM customers", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log("Customers: ", res);
    result(null, res);
  });
};

// Update Customer
Customer.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
    [customer.email, customer.name, customer.active, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "Not_Found" }, null);
        return;
      }

      console.log("Updated Customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

// Delete Customer
Customer.remove = (id, result) => {
  sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "Not_Found" }, null);
      return;
    }

    console.log("Deleted Customer ID: ", id);
    result(null, res);
  });
};

// Delete All Customer
Customer.removeAll = (result) => {
  sql.query("DELETE FROM customers", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log(`Deleted ${res.affectedRows} Customers`);
    result(null, res);
  });
};

module.exports = Customer;
