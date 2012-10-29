function clamp(n,min,max) {
    return Math.max(min,Math.min(max,n));
}

function checkOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
	var top1 = y1;
	var left1 = x1;
	var right1 = x1 + w1;
	var bottom1 = y1 + h1;
	
	var top2 = y2;
	var left2 = x2;
	var right2 = x2 + w2;
	var bottom2 = y2 + h2;
	
	if(bottom1 < top2) { return 0; }
	if(top1 > bottom2) { return 0; }
	if(right1 < left2) { return 0; }
	if(left1 > right2) { return 0; }

	return 1;
}
