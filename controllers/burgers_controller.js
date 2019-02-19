var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
		db.Burger.findAll({}).then(function(dbBurger) {
			var dataOb = {
				burgers: dbBurger
			};
			console.log(dataOb);
			res.render("index", dataOb);
		});
	});
// router.get("/", function(req, res) {
//     burger.selectAll(function(data) {
//         var dataOb = {
//             burgers: data
//         };
//         console.log(dataOb);
//         res.render("index", dataOb);
//     });
// });
	app.post("/api/burgers", function(req,res) {
		db.Burger.create({
			burger_name: req.body.burger_name
		}).then(function(dbBurger) {
			res.json(dbBurger);
		});
	});

// router.post("/api/burgers", function(req, res) {
//     burger.insertOne("burger_name", req.body.burger_name, function(result) {
//         res.json({id: result.insertId});
//     });
// });
	app.put("/api/burgers/:id", function(req, res) {
		db.Burger.update({
			devoured: req.body.devoured
		},
		{
			where: {
				id: req.params.id
			}
		}).then(function(dbBurger) {
			res.json(dbBurger);
		});
	});

// router.put("/api/burgers/:id", function(req, res) {
//     var condition = "id = " + req.params.id;
//     console.log(condition);
//     burger.updateOne(
//         {
//             devoured: req.body.devoured
//         },
//         condition,
//         function(result) {
//             if (result.changedRows === 0) {
//                 return res.status(404).end();
//             }
//             res.status(200).end();
//         }
//     );
// });
};