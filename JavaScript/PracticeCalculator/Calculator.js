// 计算函数
function calc(){
	var num1 = document.getElementById("num1").value;
	var num2 = document.getElementById("num2").value;
	var res = parseInt(num1) + parseInt(num2);
	document.getElementById("res").value = res;
}