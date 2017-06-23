
$(document).ready(
	console.log("Ready!")	
);
// constructor for new food:
function Food_item(brand,name,cal,calfat,chol,fib,prot,satfat,serv_sz,serv_un,ser_per_con,sodi,sug,carb,fat) {
	this.brand = brand;
	this.name = name;
	this.cal = cal;
	this.calfat = calfat;
	this.chol = chol;
	this.fib = fib;
	this.prot = prot;
	this.satfat = satfat;
	this.serv_sz = serv_sz;
	this.serv_un = serv_un;
	this.ser_per_con = ser_per_con;
	this.sodi = sodi;
	this.sug = sug;
	this.carb = carb;
};
function printFacts(food){
	// alert("I am clicked");
	// var food = new Food_item(
	// 	array.fields.brand_name,
	// 	array.fields.item_name,
	// 	array.fields.nf_calories,
	// 	array.fields.nf_calories_from_fat,
	// 	array.fields.nf_cholesterol,
	// 	array.fields.nf_dietary_fiber,
	// 	array.fields.nf_protein,
	// 	array.fields.nf_saturated_fat,
	// 	array.fields.nf_serving_size_qty,
	// 	array.fields.nf_serving_size_unit,
	// 	array.fields.nf_servings_per_container,
	// 	array.fields.nf_sodium,
	// 	array.fields.nf_sugars,
	// 	array.fields.nf_total_carbohydrates,
	// 	array.fields.nf_total_fat
	// );
	$("#b").val("");
	$("#b").append("<ul> <li>Brand: " + food.brand +"</li> <li>Calories: " + food.cal +"</li> <li>calorie fat: " + food.calfat +"</li> <li>carbohydrates: " + food.carb +"</li> <li>cholesterol: " + food.chol +"</li> <li>fiber: " + food.fib +"</li> <li>name: " + food.name +"</li> <li>protein: " + food.prot +"</li> <li>saturated fat: " + food.satfat +" </li> <li>serving per container: " + food.ser_per_con +"</li> <li>serving size: " + food.serv_sz +"</li> <li>serving units: " + food.serv_un +"</li> <li>sodium: " + food.sodi +"</li> <li>sugar: " + food.sug + "</li> </ul>");
	// document.getElementsByClassName("ui basic segment")[1].innerHTML = 
	// "<ul> <li>Brand: " + food.brand +"</li> <li>Calories: " + food.cal +"</li> <li>calorie fat: " + food.calfat +"</li> <li>carbohydrates: " + food.carb +"</li> <li>cholesterol: " + food.chol +"</li> <li>fiber: " + food.fib +"</li> <li>name: " + food.name +"</li> <li>protein: " + food.prot +"</li> <li>saturated fat: " + food.satfat +" </li> <li>serving per container: " + food.ser_per_con +"</li> <li>serving size: " + food.serv_sz +"</li> <li>serving units: " + food.serv_un +"</li> <li>sodium: " + food.sodi +"</li> <li>sugar: " + food.sug + "</li> </ul>";
};

var food_number;
var ingredients;
var all_foods = [];

$("#input").keypress(
	function(event) {
		var food_item = $("#input").val();

		if(event.keyCode == '13') {
			console.log(food_item);

			$.ajax({
				type: "GET",
				url: `https://api.nutritionix.com/v1_1/search/${food_item}`,
				data: {
					results: "0:50",
					cal_min: 100,
					cal_max: 20000,
					appId: "cd32af31",
					appKey:"3fd2f2613c88381291c879641221093f" 
				},
				dataType: 'json',
				success: function(response) {
					console.log(response);
					var answer = response;
					var arr = answer.hits;
					//var item = [];
				
					$("#a").val("");
					$("#a").append("<ul id='list'></ul>");
					for(var i=0; i<arr.length;i++) {(function() {
						$("#list").append("<li id='a" + i +"'>"+arr[i].fields.brand_name+ "\n" + arr[i].fields.item_name +  "</li>");
						 var food = new Food_item(
							arr[i].fields.brand_name,
							arr[i].fields.item_name,
							arr[i].fields.nf_calories,
							arr[i].fields.nf_calories_from_fat,
							arr[i].fields.nf_cholesterol,
							arr[i].fields.nf_dietary_fiber,
							arr[i].fields.nf_protein,
							arr[i].fields.nf_saturated_fat,
							arr[i].fields.nf_serving_size_qty,
							arr[i].fields.nf_serving_size_unit,
							arr[i].fields.nf_servings_per_container,
							arr[i].fields.nf_sodium,
							arr[i].fields.nf_sugars,
							arr[i].fields.nf_total_carbohydrates,
							arr[i].fields.nf_total_fat)
						 console.log(arr[i].fields.brand_name);
						 console.log(arr[i].fields.nf_sugars);

						$(`#a${i}`).click(function(){
							printFacts(food);
						});
					} ());// for loop

				};
				}, // success
				error: function(err) {
					console.error( err );
				}
			}); // ajax
		 } // if
	} // function(event)
); // keypress

