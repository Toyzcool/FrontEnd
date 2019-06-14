// A.Order
// 一.事件模块
		$(function(){
			// 0.获取实付款
			calcOrderListItemProductRealPrice()
			// 1.切换订单类型
			$("a.selectedOrderTypeA").click(function(){
				var outstatus = parseInt($(this).attr("outstatus")) ;
				shiftOrderType(outstatus);
			});
			// 2.删除item
			$("a.deleteItem").click(function(){
				var oid = $(this).attr("oid");
				deleteItem(oid);
			});
			
		});
		
		// 二.函数模块
			// 1.切换订单模块方法
			function shiftOrderType(outstatus){
					switch (outstatus){
						case 0:
							$("table.orderListItem").show();
							afterShiftOrderType(outstatus);
							break;
						case 1:
							$("table.orderListItem").hide();
							$("table.waitPay").show();
							afterShiftOrderType(outstatus);
							break;
						case 2:
							$("table.orderListItem").hide();
							$("table.waitDelivery").show();
							afterShiftOrderType(outstatus);
							break;
						case 3:
							$("table.orderListItem").hide();
							$("table.waitComfirm").show();
							afterShiftOrderType(outstatus);
							break;
						case 4:
							$("table.orderListItem").hide();
							$("table.waitReview").show();
							afterShiftOrderType(outstatus);
							break;
					}
			}
			// 2.切换订单模块效果函数
			function afterShiftOrderType(outstatus){
				$("div.orderType div").removeClass("selectedOrderType");
				$("a.selectedOrderTypeA[outstatus = "+outstatus+"]").parent("div").addClass("selectedOrderType");
				$("a.selectedOrderTypeA").css("color","black");
				$("a.selectedOrderTypeA[outstatus = "+outstatus+"]").css({"color":"#C30000","text-decoration":"none"});
			}
			// 3.切换订单类型方法
			// default
			// 4.计算实付款函数
			function calcOrderListItemProductRealPrice(){
				$("span.orderListItemProductPrice").each(function(){
					var oid = $(this).attr("oid");
					var price = parseFloat($(this).text()) ;
					var num = parseInt($("span.orderListItemNumber[oid = "+oid+"]").text()) ;
					var realPrice = (price*num).toFixed(2);
					$("div.orderListItemProductRealPrice[oid = "+oid+"]").text("¥"+realPrice);
				});
			}
			// 5.删除函数
			function deleteItem(oid){
				$("table[oid = "+oid+"]").hide();
			}

// D.submitOrder
		// 一.事件模块
		$(function(){
			// 0.计算item金额
			calcItemProductPrice ();
			
			// 1.留言框变形事件
				// 1.1获取焦点
				$("textarea.leaveMessageTextarea").focus(function(){
					textareaFocus();
				});
				// 1.2失去焦点
				$("textarea.leaveMessageTextarea").focusout(function(){
					textareaFocusout();
				});
			
		});
			
		// 二.函数模块
			// 1.计算item金额和合计金额
			function calcItemProductPrice () {
				var itemSumPrice = 0;
				$("tr.orderItemTR").each(function(){
					var pid = $(this).attr("pid");
					var price = parseFloat($("span.orderItemProductPrice[pid = "+pid+"]").text()) ;
					var num = parseInt($("span.orderItemProductNumber[pid = "+pid+"]").text());
					var sumPrice = price * num;
					itemSumPrice = itemSumPrice + sumPrice;
					$("span.orderItemUnitSum[pid = "+pid+"]").text("¥"+sumPrice.toFixed(2));
				})
				$("span.sumPrice").text(itemSumPrice.toFixed(2));
				$("span.orderItemTotalSumSpan").text("¥ "+itemSumPrice.toFixed(2));
			}
			
			// 2.留言框变形方法
				// 2.1获取焦点
				function textareaFocus(){
					$("div.leaveMessageDiv").addClass("addClassLeaveMessageDiv");
					$("textarea.leaveMessageTextarea").addClass("addClassLeaveMessageTextarea");
				}
				// 2.2失去焦点
				function textareaFocusout(){
					$("div.leaveMessageDiv").removeClass("addClassLeaveMessageDiv");
					$("textarea.leaveMessageTextarea").removeClass("addClassLeaveMessageTextarea");
				}