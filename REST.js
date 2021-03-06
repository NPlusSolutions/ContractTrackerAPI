var mysql   = require("mysql");
var mailer  = require("./Mailer.js");


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
          	connection.release();
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                if(rows.length>0)
                {
                    res.json({"Error" : false, "Message" : "Success", "Users" :  rows});
                }else{
                    res.json({"Error" : true, "Message" : "Invalid Credentials"});
                }
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
        var table = ["user","user_id",req.params.user_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });

    router.post("/users",function(req,res){
        var query = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
        var table = ["user","email","password","user_type_id",req.body.email,req.body.password,req.body.user_type_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "User added successfully"});
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
                res.json({"Error" : false, "Message" : "User updated successfully"});
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
        	connection.release();
            if(err) {
                res.json({"Error" : true, "Message" : err});
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
    router.get("/moneyexpense/:user_id/:money_id",function(req,res){
            var query = "SELECT * FROM ?? WHERE ??=? and ??=?";
            var table = ["expense_master","user_id",req.params.user_id,"money_id",req.params.money_id];
            query = mysql.format(query,table);
            connection.query(query,function(err,rows){
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    res.json({"Error" : false, "Message" : "Success", "Incomes" : rows});
                }
            });
    });
    router.post("/expenses",function(req,res){
        var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
        var table = ["expense_master","user_id","description","money_id","date",req.body.user_id,req.body.description,req.body.money_id,req.body.date];
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
        var query = "UPDATE ?? SET ?? = ?,?? = ?,?? = ? WHERE ?? = ?";
        var table = ["expense_master","description",req.body.description,"money_id",req.body.money_id,"date",req.body.date,"expense_id",req.body.expense_id];
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
    // Money
     router.get("/money",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["money_master"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Money" : rows});
            }
        });
    });
    router.get("/money/:user_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["money_master","user_id",req.params.user_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Money" : rows});
            }
        });
    });
    router.get("/money/:user_id/:money_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=? and ??=?";
        var table = ["money_master","user_id",req.params.user_id,"money_id",req.params.money_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Money" : rows});
            }
        });
    });

    router.post("/money",function(req,res){
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        var table = ["money_master","user_id","money_name",req.body.user_id,req.body.money_name];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Money added successfully"});
            }
        });
    });

    router.put("/money",function(req,res){
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["money_master","money_name",req.body.money_name,"money_id",req.body.money_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Money updated successfully"});
            }
        });
    });

    router.delete("/money/:money_id",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["money_master","money_id",req.params.money_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Money deleted successfully"});
            }
        });
    });
    // POs

    router.post("/po",function(req,res){
        var query = "INSERT INTO ??(??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)";
        var table = ["po_master","user_id","company_id","state_id","po_number","po_amount","po_time_limit","category_id",req.body.user_id,req.body.company_id,req.body.state_id,req.body.po_number,req.body.po_amount,req.body.po_time_limit,req.body.category_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "PO entry added successfully"});
            }
        });
    });

    // PO Report Company wise
    router.get("/pocompany/:user_id",function(req,res){
        var query = "SELECT cm.company_name,sum( pm.po_amount) as po_total , 0 as po_quantity FROM po_master pm join company_master cm on pm.company_id = cm.company_id where pm.user_id =  "+req.params.user_id+" group by cm.company_id";
        
        console.log(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "CompanyReport" : rows});
            }
        });
    });
    // PO Report Category wise
    router.get("/pocategory/:user_id",function(req,res){
        var query = "SELECT cm.category_name,sum( pm.po_amount) as po_total , 0 as po_quantity FROM po_master pm join category_master cm on pm.category_id = cm.category_id where pm.user_id =  "+req.params.user_id+" group by cm.category_id";
        
        console.log(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "CategoryReport" : rows});
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
    router.get("/moneyincome/:user_id/:money_id",function(req,res){
            var query = "SELECT * FROM ?? WHERE ??=? and ??=?";
            var table = ["income_master","user_id",req.params.user_id,"money_id",req.params.money_id];
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
        var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
        var table = ["income_master","user_id","money_id","description","date",req.body.user_id,req.body.money_id,req.body.description,req.body.date];
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
        var query = "UPDATE ?? SET ?? = ?,??=?,??=? WHERE ?? = ?";
        var table = ["income_master","description",req.body.description,"money_id",req.body.money_id,"date",req.body.date,"income_id",req.body.income_id];
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

    // Items
    router.get("/items",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["item_master"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Items" : rows});
            }
        });
    });
    router.get("/items/:user_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["item_master","user_id",req.params.user_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Items" : rows});
            }
        });
    });
    router.get("/items/:user_id/:item_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=? and ??=?";
        var table = ["item_master","user_id",req.params.user_id,"item_id",req.params.item_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Items" : rows});
            }
        });
    });

     router.post("/items",function(req,res){
        var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
        var table = ["item_master","user_id","item_code","item_rate","description","po_number",req.body.user_id,req.body.item_code,req.body.item_rate,req.body.description,req.body.po_number];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Item added successfully"});
            }
        });
    });

    router.put("/items",function(req,res){
        var query = "UPDATE ?? SET ?? = ?, ??=? , ??=?, ??=?" WHERE ?? = ?";
        var table = ["item_master","item_code",req.body.item_code,"item_rate",req.body.item_rate,"description",req.body.description","po_number",req.body.po_number",item_id",req.body.item_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Item updated successfully"});
            }
        });
    });

    router.delete("/items/:item_id",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["item_master","item_id",req.params.item_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Item deleted successfully"});
            }
        });
    });

    // Submit bill

 	router.post("/submitbill",function(req,res){
       // params : po_number , user_id
       var mailOptions = {
		    from: 'Ravi Tuvar<ravituwar@gmail.com>', // sender address
		    to: 'ravituvar@yahoo.com,ravituwar@gmail.com', // list of receivers
		    subject: 'My Bill', // Subject line
		    text: 'This is my Bill', // plaintext body
		    html: '<b>This is my bill</b>' // html body
		};
		mailer.sendMail(mailOptions);
        res.json({"Error" : false, "Message" : "Bill submitted successfully"});
           
    });
}

module.exports = REST_ROUTER;
