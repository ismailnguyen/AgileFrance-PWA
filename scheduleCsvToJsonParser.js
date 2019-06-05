<input type="file" id="file-input" >
<div id="file-content" style="background:black; color:white"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.0.0/papaparse.min.js" type="text/javascript"></script>

<script>
	function readSingleFile(e) {
	  var file = e.target.files[0];
	  if (!file) {
		return;
	  }
	  
	  Papa.parse(file, {
				header: true,
				delimiter: ';',
				//download: true,
				complete: function(results) {
					var parsedDatas = results.data;
					
					console.log(parsedDatas);
					
					displayContents(JSON.stringify(parsedDatas));
				}
			});
	}
	 
	function displayContents(contents) {
	  var element = document.getElementById('file-content');
	  element.innerHTML = contents;
	}
	 
	document.getElementById('file-input').addEventListener('change', readSingleFile, false);
</script>
