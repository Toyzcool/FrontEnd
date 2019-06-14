/* 一.product */
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