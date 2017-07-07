(function($) {
	if(typeof($) === 'undefined') {
		return;
	}

	$.fn.extend({

		caret: function(func) {

			function textLength(elem) {
				return $(elem).text().length;
			}

	        function getElementLocation(parent, child) {
	            let position = 0;
	            for(var i = 0; i < parent.childNodes.length; i++) {
	                var c = parent.childNodes[i];
	                if(c === child)		break;

	                position += textLength(c);
	            }
	            return position;
	        }
			
			var setCaret = function(index, root) {
				for(var i in root.childNodes) {
					var child = root.childNodes[i];
					var length = textLength(child);
					if(index > length) {
						index -= length;
					} else if(child.constructor.name === 'Text') {
						var sel = window.getSelection();
						var range = document.createRange();

						range.setStart(child, index);
						range.setEnd(child, index);
						
						sel.removeAllRanges();
						sel.addRange(range);
						
						return;
			        } else {
						setCaret(index, child)

						return;
			        }
			    }
			};

			var getCaret = function(elem) {
				let selection = document.getSelection();
	            let position = selection.anchorOffset;
	            let node = selection.anchorNode;
	            do{
	                if(node.constructor.name === 'HTMLBodyElement')
	                    throw new Error('Could not save caret: it was not in the specified element.');

	                let parent = node.parentNode;
	                position += getElementLocation(parent, node);
	                node = parent;

	            } while(node !== elem);
	            return position;
			};

			var save = function($elem) {
				$elem.data('caret', getCaret($elem[0]));
			};

			var load = function($elem) {
				setCaret(get($elem), $elem[0]);
			};

			var get = function($elem) {
				let attr = $elem.data('caret');
				if(typeof(attr) === 'undefined')
					return getCaret($elem[0]);
				else
					return attr;
			};

			switch(func) {
				case 'save': return this.each((i, e) =>  save($(e)));
				case 'load': return this.each((i, e) =>  load($(e)));
				case 'get': return get(this.first());
			}
		}

	});
})(jQuery);