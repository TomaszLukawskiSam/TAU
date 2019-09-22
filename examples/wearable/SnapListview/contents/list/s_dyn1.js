/* global tau */
(function () {
	var page = document.getElementById("page-snaplistview-d"),
		i = 0,
		listHelper,
		elScroller;

	page.addEventListener("pagebeforeshow", function () {
		var list,
			add = function() {
				var liNode = document.createElement("li");
				var aNode = document.createElement("a");
				aNode.setAttribute('href', '#');
				aNode.innerHTML = "dyn list " + i++ ;
				liNode.append(aNode);
				if (i % 2) {
					list.prepend(liNode);
				} else {
					list.appendChild(liNode);
				}
				if (listHelper) {
					listHelper.getSnapList().refresh();					
				}
			};

		elScroller = page.querySelector(".ui-scroller");
		if (elScroller) {
			list = elScroller.querySelector(".ui-listview");
		}

		if (elScroller && list) {
			listHelper = tau.helper.SnapListStyle.create(list, {animate: "scale"});
		}
		window._add = add;
		
		setInterval(window._add, 1000);
	});

	page.addEventListener("pagebeforehide", function () {
		if (listHelper) {
			listHelper.destroy();

			clearInterval(window._add);
			listHelper = null;
		}
	});
}());