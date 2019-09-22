/* global tau */
(function () {
	var page = document.getElementById("page-snaplistview"),
		listHelper,
		elScroller;

	page.addEventListener("pagebeforeshow", function () {
		var list;

		elScroller = page.querySelector(".ui-scroller");
		if (elScroller) {
			list = elScroller.querySelector(".ui-listview");
		}

		if (elScroller && list) {
			listHelper = tau.helper.SnapListStyle.create(list, {animate: "scale"});
		}
		
		setTimeout(function() {
			var liNode = document.createElement("li");
			var aNode = document.createElement("a");
			aNode.setAttribute('href', '#');
			aNode.innerHTML = "List 0";
			liNode.append(aNode);
			list.prepend(liNode);
			listHelper.getSnapList().refresh();
		}, 5000);
	});

	page.addEventListener("pagebeforehide", function () {
		if (listHelper) {
			listHelper.destroy();

			listHelper = null;
		}
	});
}());