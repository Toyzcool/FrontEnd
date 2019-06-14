
// 全局变量,用于存储输入框中的初始值
var originalNumber = 0;

// 一.事件模块
$(function(){
	// 0.初始化各个item金额 数量 总金额
	calcPrice();
	calcNum();
	calcSumPrice();
	
	// 1.单个item的动作事件
	$("img.cartProductItemIfSelected").click(function(){
		var pid = $(this).attr("pid");
		// 选中item
		selectedItem(pid);
		// 判断是否全选
		whetherSelectedAll();
		// 刷新数量和总价
		calcNum();
		calcSumPrice();
		//结算按钮活跃判断
		whetherSettle();
	});
	
	// 2.全选的动作事件
	$("img.selectAllItem").click(function(){
		// 全选事件
		selectedAll();
		// 刷新数量和总价
		calcNum();
		calcSumPrice();
		//结算按钮活跃判断
		whetherSettle();
	});
	
	// 3.增加数量的动作事件
	$("a.numberPlus").click(function(){
		var pid = $(this).attr("pid");
		// 增加
		addNum(pid);
		// 刷新数量和总价
		calcNum();
		calcSumPrice();
	});
	
	// 4.减少数量的动作事件
	$("a.numberMinus").click(function(){
		var pid = $(this).attr("pid");
		// 减少
		minusNum(pid);
		// 刷新数量和总价
		calcNum();
		calcSumPrice();
	});
	
	// 5.修改输入框中数量
	$("input.orderItemNumberSetting").focus(function(){
		var pid = $(this).attr("pid");
		originalNumber = $("input.orderItemNumberSetting[pid = "+pid+"]").val();
	});
	$("input.orderItemNumberSetting").keyup(function(){
		var pid = $(this).attr("pid");
		// 判断输入内容
		inputNum(pid);
		// 刷新单个item金额
		calcPrice();
		// 刷新数量和总价
		calcNum();
		calcSumPrice();
	})

});


// 二.函数模块
// 1.价格 计算函数模块
	// 1.1单个item的金额计算
	function calcPrice(){
		$("tr.cartProductItemTR").each(function(){
	var pid = $(this).attr("pid");
	var simglePrice = parseFloat($("span.cartProductItemPromotionPrice[pid = "+pid+"]").text());
	var num = parseInt($("input.orderItemNumberSetting[pid = "+pid+"]").val());
	var price = (simglePrice*num).toFixed(2);
	$("div.cartProductItemSmallSumPrice[pid = "+pid+"]").text(price);
		});
	}

	// 1.2单个item的数量修改
		// 1.2.1增加
		function addNum(pid){
	var number = parseInt($("input.orderItemNumberSetting[pid = "+pid+"]").val()) ;
	number++;
	$("input.orderItemNumberSetting[pid = "+pid+"]").val(number);
	calcPrice();
		}
		// 1.2.2减少
		function minusNum(pid){
	var number = parseInt($("input.orderItemNumberSetting[pid = "+pid+"]").val()) ;
	if(number <= 1){
		number = 1;
	}else{
		number--;
	}
	$("input.orderItemNumberSetting[pid = "+pid+"]").val(number);
	calcPrice();
		}
		// 1.2.3填写
		function inputNum(pid){
	var number = $("input.orderItemNumberSetting[pid = "+pid+"]").val();
	// 非数字则还原为初始值
	if(isNaN(number)){
		number = originalNumber;
	}else{
		number = parseInt($("input.orderItemNumberSetting[pid = "+pid+"]").val());
	}
	$("input.orderItemNumberSetting[pid = "+pid+"]").val(number);
		}
		
		
// 2.数量和总价 计算函数模块
	// 2.1数量计算
	function calcNum(){
		var sumNum = 0;
		$("img.cartProductItemIfSelected").each(function(){
	var pid = $(this).attr("pid");
	var action = $(this).attr("action");
	if(action == 1){
		var num = parseInt($("input.orderItemNumberSetting[pid = "+pid+"]").val()) ;
		sumNum = sumNum + num ;
	}
		});
		$("span.cartSumNumber").text(sumNum);
	}
	
	// 2.2总价计算
	function calcSumPrice(){
		var sumPrice = 0;
		$("img.cartProductItemIfSelected").each(function(){
			var pid = $(this).attr("pid");
	var action = $(this).attr("action");
	if(action == 1){
		var price = parseFloat($("div.cartProductItemSmallSumPrice[pid = "+pid+"]").text()) ;
		sumPrice = sumPrice + price;
	}
		});
		sumPrice = sumPrice.toFixed(2);
		$("span.cartSumPrice").text(sumPrice);
	}



// 3.选中 事件函数模块
	//3.1 单个item选中效果事件
	function selectedItem(pid){
		var action = $("img.cartProductItemIfSelected[pid = "+pid+"]").attr("action");
		if(action == 0){
	$("img.cartProductItemIfSelected[pid = "+pid+"]").attr("action","1");
	$("img.cartProductItemIfSelected[pid = "+pid+"]").prop("src","img/site/cartSelected.png");
	$("tr.cartProductItemTR[pid = "+pid+"]").css("background-color","#FFF8E1");
		}else{
	$("img.cartProductItemIfSelected[pid = "+pid+"]").attr("action","0");
	$("img.cartProductItemIfSelected[pid = "+pid+"]").prop("src","img/site/cartNotSelected.png");
	$("tr.cartProductItemTR[pid = "+pid+"]").css("background-color","white");
		};
	};
	
	// 3.2全选效果事件
	function selectedAll(){
		var action = $("img.selectAllItem").attr("action");
		if(action == 0){
	$("img.selectAllItem").attr("action","1");
	$("img.selectAllItem").prop("src","img/site/cartSelected.png");
	//单个item选中
	$("img[class='cartProductItemIfSelected']").each(function(){
		var pid = $(this).attr("pid");
		$("img.cartProductItemIfSelected[pid = "+pid+"]").attr("action","0");
		selectedItem(pid);
	});
		}else{
	$("img.selectAllItem").attr("action","0");
	$("img.selectAllItem").prop("src","img/site/cartNotSelected.png");
	//单个item选中
	$("img[class='cartProductItemIfSelected']").each(function(){
		var pid = $(this).attr("pid");
		$("img.cartProductItemIfSelected[pid = "+pid+"]").attr("action","1");
		selectedItem(pid);
	});
		}
	}
	
	// 3.3 全选条件判断
	function whetherSelectedAll(){
		$("img[class='cartProductItemIfSelected']").each(function(){
	var eachAction = $(this).attr("action");
	if(eachAction == 0){
		$("img.selectAllItem").attr("action","0");
		$("img.selectAllItem").prop("src","img/site/cartNotSelected.png");
		return false;
	}
	$("img.selectAllItem").attr("action","1");
	$("img.selectAllItem").prop("src","img/site/cartSelected.png");
		})
	};
	
	// 3.4结算按钮条件判断
	function whetherSettle(){
		$("img.cartProductItemIfSelected").each(function(){
	var action = $(this).attr("action");
	if(action == 1){
		$("button.createOrderButton").css("background-color","#C30000");
		$("button.createOrderButton").prop("disabled",false);
		return false;
	}
	$("button.createOrderButton").css("background-color","#CCCCCC");
	$("button.createOrderButton").prop("disabled",true);
	});
}