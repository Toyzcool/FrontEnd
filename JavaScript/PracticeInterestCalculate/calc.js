function get(){
	// 获取输入框中的值
	var beginMoney = parseInt(document.getElementById('beginMoney').value);
	var interest = parseFloat(document.getElementById('interest').value);
	var years = parseInt(document.getElementById('years').value);
	var addMoney = parseInt(document.getElementById('addMoney').value);
	//新建需要赋值的变量
	var benjin = beginMoney ;
	var fuli = (interest/100);
	//计算本金和
	for (var i = 1; i < parseInt(years); i++) {
		benjin = parseInt(benjin) + parseInt(addMoney) ;
	}
	// 计算本息和
	var benxi = beginMoney*Math.pow((1+fuli),years);
	for (var i = years - 1; i >= 1; i--) {
		benxi += addMoney*Math.pow((1+fuli),i);
	}
	var lixi = benxi - benjin;
	//赋值
	document.getElementById('benjin').value = benjin;
	document.getElementById('lixi').value = lixi;
	document.getElementById('benxi').value = benxi;
}