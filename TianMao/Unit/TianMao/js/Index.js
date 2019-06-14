// 一.Index
	// 3.首页主体
	$(function(){
		$('div.rightMenu span').mouseenter(function(){
			var left = $(this).position().left;
			var top = $(this).position().top;
			var width1 = $(this).css('width');
			var width2 = $('#catear').css('width');
			var top2 = parseInt(top)-15;
			var destLeft = parseInt(left)+(parseInt(width1)-parseInt(width2)/2)/2;
			$('img#catear').css('left',destLeft);
			$('img#catear').css('top',top2);
			$('img#catear').fadeIn(500);
		});
		// 猫耳朵消失
		$('div.rightMenu span').mouseleave(function(){
			$('img#catear').hide();
		});

		// 菜单展开
		$('div.eachCategory').mouseenter(function(){
			var cid = $(this).attr('cid');
			$('div.productsAsideCategorys[cid='+cid+']').show();
			
		});
		$('div.eachCategory').mouseleave(function(){
			var cid = $(this).attr('cid');
			$('div.productsAsideCategorys[cid='+cid+']').hide();
		});
		$('div.productsAsideCategorys').mouseenter(function(){
			$(this).show();
		});
		$('div.productsAsideCategorys').mouseleave(function(){
			$(this).hide();
		});
	});

// 三.product
	// 3.产品主体
	// 1.1图片模块
	// 缩略图放大
	$(function(){
		$("img.smallImg").mouseenter(function(){
			var bigimgurl = $(this).attr("bigimgurl");
			$("img.bigImg").attr("src",bigimgurl);
		});
	});
	
	
	// 1.2信息模块
	// 1.2.3商品数量
	$(function(){
		// 增加按钮
		$(".increaseNumber").click(function(){
			var num = $(".productNumberSetting").val();
			var stock = parseInt($(".stock").text());
			num++;
			if(num > stock)
				num = stock;
			$(".productNumberSetting").val(num);
		});
		// 减少按钮
		$(".decreaseNumber").click(function(){
			var num = $(".productNumberSetting").val();
			var stock = parseInt($(".stock").text());
			num--;
			if(num < 1)
				num = 1;
			$(".productNumberSetting").val(num);
		});
		// 输入框
		$(".productNumberSetting").keyup(function(){
			var stock = parseInt($(".stock").text());
			var num = $(".productNumberSetting").val();
			if(isNaN(num))
				num = 1 ;
			if(num < 0)
				num = 1 ;
			if(num > stock)
				num = stock;
			$(".productNumberSetting").val(num);
		})
	});
	
	
	// 2.产品详情模块、3.产品评价模块
	$(function(){
		$(".productDetailTopPartSelectedLink").click(function(){
			$(".productDetailDiv").show();
			$(".productReviewContentPart").hide();
		});
		$(".productDetailTopPartReviewLink").click(function(){
			$(".productDetailDiv").hide();
			$(".productReviewContentPart").show();
		});
	});