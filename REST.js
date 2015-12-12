var mysql   = require("mysql");

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes = function(router,connection,md5) {
    var self = this;
    router.get("/",function(req,res){
        res.json({"Message" : "Contract Tracker APIs"});
    });

    // Users
    router.get("/signin/:email/:password",function(req,res){
        var query = "SELECT user_id,email,user_type_id FROM ?? WHERE ?? = ? and ?? = ?";
        var table = ["user","email",req.params.email,"password",req.params.password];
        query = mysql.format(query,table);
          connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" :  rows});
            }
        });
    });
     router.get("/users",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["user"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "users" : rows});
            }
        });
    });
    router.get("/users/:user_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["user_login","user_id",req.params.user_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "users" : rows});
            }
        });
    });

    router.post("/users",function(req,res){
        var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
        var table = ["user","email","password","user_type_id",req.body.email,req.body.password,req.body.userTypeId];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "User Added !"});
            }
        });
    });

    router.put("/users",function(req,res){
        var query = "UPDATE ?? SET ?? = ?, ?? = ?  WHERE ?? = ?";
        var table = ["user","email","password",req.body.email,req.body.password,"user_id",req.body.user_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the password for email "+req.body.email});
            }
        });
    });

    router.delete("/users/:user_id",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["user","user_id",req.params.user_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "User deleted successfully"});
            }
        });
    });

    // Categories
    router.get("/categories",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["category_master"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Categories" : rows});
            }
        });
    });
    router.get("/categories/:user_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["category_master","user_id",req.params.user_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Categories" : rows});
            }
        });
    });
    router.get("/categories/:user_id/:category_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=? and ??=?";
        var table = ["category_master","user_id",req.params.user_id,"category_id",req.params.category_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Categories" : rows});
            }
        });
    });

    router.post("/categories",function(req,res){
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        var table = ["category_master","user_id","category_name",req.body.user_id,req.body.category_name];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Category added successfully"});
            }
        });
    });

    router.put("/categories",function(req,res){
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["category_master","category_name",req.body.category_name,"category_id",req.body.category_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Category updated successfully"});
            }
        });
    });

    router.delete("/categories/:category_id",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["category_master","category_id",req.params.category_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Category deleted successfully"});
            }
        });
    });

    // Companies
    router.get("/companies",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["company_master"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Companies" : rows});
            }
        });
    });
    router.get("/companies/:user_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["company_master","user_id",req.params.user_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Companies" : rows});
            }
        });
    });
    router.get("/companies/:user_id/:company_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=? and ??=?";
        var table = ["company_master","user_id",req.params.user_id,"company_id",req.params.company_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Companies" : rows});
            }
        });
    });

    router.post("/companies",function(req,res){
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        var table = ["company_master","user_id","company_name",req.body.user_id,req.body.company_name];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Company added successfully"});
            }
        });
    });

    router.put("/companies",function(req,res){
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["company_master","company_name",req.body.company_name,"company_id",req.body.company_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Company updated successfully"});
            }
        });
    });

    router.delete("/companies/:company_id",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["company_master","company_id",req.params.company_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Company deleted successfully"});
            }
        });
    });

    // Expenses
    router.get("/expenses",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["expense_master"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Expenses" : rows});
            }
        });
    });
    router.get("/expenses/:user_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["expense_master","user_id",req.params.user_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Expenses" : rows});
            }
        });
    });
    router.get("/expenses/:user_id/:expense_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=? and ??=?";
        var table = ["expense_master","user_id",req.params.user_id,"expense_id",req.params.expense_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Expenses" : rows});
            }
        });
    });

    router.post("/expenses",function(req,res){
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        var table = ["expense_master","user_id","expense_name",req.body.user_id,req.body.expense_name];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Expense added successfully"});
            }
        });
    });

    router.put("/expenses",function(req,res){
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["expense_master","expense_name",req.body.expense_name,"expense_id",req.body.expense_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Expense updated successfully"});
            }
        });
    });

    router.delete("/expenses/:expense_id",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["expense_master","expense_id",req.params.expense_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Expense deleted successfully"});
            }
        });
    });

    // POs

    router.post("/po",function(req,res){
        var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
        var table = ["po_master","user_id","company_id","state_id","po_number","po_amount","po_time_limit",req.body.user_id,req.body.company_id,req.body.state_id,req.body.po_number,req.body.po_number,req.body.po_amount];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "PO entry added successfully"});
            }
        });
    });

    // Incomes
    router.get("/incomes",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["income_master"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Incomes" : rows});
            }
        });
    });
    router.get("/incomes/:user_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["income_master","user_id",req.params.user_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Incomes" : rows});
            }
        });
    });
    router.get("/incomes/:user_id/:income_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=? and ??=?";
        var table = ["income_master","user_id",req.params.user_id,"income_id",req.params.income_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Incomes" : rows});
            }
        });
    });

    router.post("/incomes",function(req,res){
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        var table = ["income_master","user_id","income_name",req.body.user_id,req.body.income_name];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Income added successfully"});
            }
        });
    });

    router.put("/incomes",function(req,res){
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["income_master","income_name",req.body.income_name,"income_id",req.body.income_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Income updated successfully"});
            }
        });
    });

    router.delete("/incomes/:income_id",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["income_master","income_id",req.params.income_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Income deleted successfully"});
            }
        });
    });

    

    // States

     router.get("/states",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["state_master"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "States" : rows});
            }
        });
    });

      router.get("/states/:state_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["state_master","state_id",req.params.state_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "States" : rows});
            }
        });
    });

    router.post("/states",function(req,res){
        var query = "INSERT INTO ??(??) VALUES (?)";
        var table = ["state_master","state_name",req.body.state_name];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "State added successfully"});
            }
        });
    });

    router.put("/states",function(req,res){
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["state_master","state_name",req.body.state_name,"state_id",req.body.state_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "State updated successfully"});
            }
        });
    });

    router.delete("/states/:state_id",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["state_master","state_id",req.params.state_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "State deleted successfully"});
            }
        });
    });
}

module.exports = REST_ROUTER;
