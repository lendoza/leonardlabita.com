$(document).ready(function(){

	var Calculator = (function(){

		// Settings
		var num1 = [],
			num2 = [],
			operand = null,
			solved = false,
			$screen = $(".screen");

		// Cache DOM
		var $al = $(".keypad");
		var $numpad = $al.find(".numpad");
		var $operator = $al.find(".operator");
		var $clear = $al.find(".clear");
		var $equal = $al.find(".equal");

		// Bind Events
		$numpad.on("click", numpad);
		$operator.on("click", operator);
		$clear.on("click", clear);
		$equal.on("click", equal);

		function setOperand(symbol){
			if(!operand){
				operand = symbol.replace("x", "*").replace("%", "/");
				$(screen).html(num1.join("") + operand);
			}
		}

		function formatNum(num){
			return (num % 1 === 0) ? num : num.toFixed(4);
		}

		function clear(){
			num1 = [];
			num2 = [];
			operand = null;
			solved = false;
			$screen.html(0);
		}

		function numpad(){
			var input = $(this).html();

			if(solved){
				clear();
			}
			if(!operand){
				num1.push(input);
				$screen.html(num1.join(""));
			}
			else{
				num2.push(input);
				$screen.html(num1.join("") + operand + num2.join(" "));
			}
			// $(this).fadeOut(100).fadeIn(100);
		}

		function operator(){
			var input = $(this).html();

			if(solved){
				num2 = [];
				operand = null;
				solved = false;
			}
			setOperand(input);
			// $(this).fadeOut(100).fadeIn(100);
		}

		function equal(){
			if (num1 && num2 && operand){
				var n1 =+ num1.join(""),
					n2 =+ num2.join(""),
					result = null;

				switch(operand){
					case "+":
						result = n1 + n2;
						break;
					case "-":
						result = n1 - n2;
						break;
					case "*":
						result = n1 * n2;
						break;
					case "÷":
						result = n1 / n2;
						break;
				}

				$screen.html(formatNum(result));
				num1 = [result]; // User can keep pressing "Enter" to continue calculations
				num2 = [n2];
				solved = true;
			}
			// $(this).fadeOut(100).fadeIn(100);
		}

	})();
	
});