# Robot Embed system
An embed for loading models of the robots used on the website. We're putting the code here for easier access (for Lex - or whoever wants access to it) and to host on our website.

A live version of this is online on [our website](https://wireclippers.org/robots).

## How to Use
When adding models to the website, place this html into the website and set the "src" property to the id of the model on [lumalabs](https://lumalabs.ai/featured). <br>
Ex: `2c2f462b-be1a-4d0d-bf74-0975dba73d49` (SS Craig)

```html
<div class="is-style-srctangulat wp-block-jetpack-tiled-gallary alighcenter" style="height: 400px; background: black; border-radius: 15px;">
  <model3 src="PlaceRobotLinkHere" \>
</div>
```

If you preview the html snip, it will appear as a black rectangle with rounded corners. This is because in preview mode, the script that sets up these elements doesn't run. 
You will need to save the page in production to see the embed.

## Embedding the model3 system
Due to WordPress limitations (and a few good practices for general web security), robot embeds need to be made in a strange way. <br>
In order to get model3 tags to load on the page, you must include the following script at the end of the page. 
If the script isn't included at the end of the page, some model3 elements will not load.

<!-- Based on github.com/pooiod/ScratchExtensions/blob/main/docs/index.html#L308 -->
```html
<script> // Include this at the end of the page for all model3 elements to load
  document.querySelectorAll('model3').forEach(function(player) {
  	var modeliframe = document.createElement('iframe');
  	modeliframe.src = `https://phswireclippers5902.github.io/robotembed?source=${player.getAttribute('src')}`;
  	modeliframe.style.margin = "auto";
  	modeliframe.style.border = "none";
  	modeliframe.style.width = "100%";
  	modeliframe.style.height = "100%";
  	modeliframe.style.borderRadius = "15px";
  	player.replaceWith(modeliframe);
  });
</script>
```

Thanks to [@pooiod](https://github.com/pooiod) for getting this up and running!
