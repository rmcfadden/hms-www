$( document ).ready(function() {
	
	new SimpleMDE({
		element: document.getElementById("description-textarea")
	});

	$('#categories-textarea').tagEditor({ initialTags: ['test1', 'test2', 'tag3'] });

	$('#tags-textarea').tagEditor({ initialTags: ['test1', 'test2', 'tag3'] });

});
