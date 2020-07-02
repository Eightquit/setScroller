function setScroll(scroller) {
	if (scroller.getAttribute("setted-scroll")) {
		return;
	}
	scroller.setAttribute("setted-scroll", "1");
	let st, startPosition, curpos, _isTouched, _temptouch, delta, sh, h;
	scroller.addEventListener("touchstart", function(e) {
		// e.stopPropagation();
		_isTouched = true;
		if (!!e.touches) {
			_temptouch = e.touches[0];
		} else if (typeof e.pageX != "undefined" && typeof e.pageY != "undefined") {
			_temptouch = { pageX: e.pageX, pageY: e.pageY };
		} else {
			return;
		}
		startPosition = { x: _temptouch.pageX, y: _temptouch.pageY };
	});
	scroller.addEventListener("touchmove", function(e) {
		e.stopPropagation();
		if (!_isTouched) {
			return;
		}
		if (!!e.changedTouches && typeof e.changedTouches != "undefined") {
			_temptouch = e.changedTouches[0];
		} else if (typeof e.pageX != "undefined" && typeof e.pageY != "undefined") {
			_temptouch = { pageX: e.pageX, pageY: e.pageY };
		} else {
			return;
		}
		delta = { x: _temptouch.pageX - startPosition.x, y: _temptouch.pageY - startPosition.y };
		st = scroller.scrollTop;
		sh = scroller.scrollHeight;
		h = scroller.clientHeight;
		console.log(sh - st - h);
		// console.log(st);
		if (st == 0 && delta.y > 0) {
			e.preventDefault();
			e.cancelable = true;
		} else if (sh - st - h <= 1 && delta.y < 0) {
			e.preventDefault();
			e.cancelable = true;
		}
	});
	scroller.addEventListener("touchend", function(e) {
		// e.stopPropagation();
		if (!_isTouched) {
			return;
		}
		_isTouched = false;
	});
	if (!window.documentDisable) {
		window.documentDisable = true;
		document.addEventListener(
			"touchmove",
			function(e) {
				e.preventDefault();
				e.cancelable = true;
			},
			{ passive: false }
		);
	}
}

export default setScroll;
