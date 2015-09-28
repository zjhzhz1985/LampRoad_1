var res = {
		gameui_plist : "res/gameui.plist",
		gameui_png : "res/gameui.png",
		snd_boom_mp3 : "res/sound/snd_boom.mp3",
		snd_btn_mp3 : "res/sound/snd_btn.mp3",
		snd_collide_mp3 : "res/sound/snd_collide.mp3",
		snd_die_mp3 : "res/sound/snd_die.mp3",
		snd_gamepass_mp3 : "res/sound/snd_gamepass.mp3"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}