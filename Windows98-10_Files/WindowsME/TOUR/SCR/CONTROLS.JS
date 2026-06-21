var g_aTopicButtonsList;
var g_sAudioPath				= "../audio/wav/";
var g_sMediaPath 				= "video\\";
var g_sImg						= "img/";
var g_sImgBtnTopics				= g_sImg + "btnscene/";
var g_sImgTourControls			= g_sImg + "btnctrl/";
var g_sImgWatermarks			= g_sImg + "wmarks/";
var g_sLocalPath				= getLocalPath("wmptour.hta");
var g_ClockInterval					= 0;
var g_CurTime						= 0;
var g_CurTick						= 0;
function getHTML(sID)
{
	return eval("idContents." + sID + ".innerHTML");
}
function getText(sID)
{
	return eval("idContents." + sID + ".innerText");
}
function sizeFullScreen()
{
	window.moveTo(0, 0);
	window.resizeTo(screen.availWidth, screen.availHeight);
}
function sizeBody()
{		
	var nClientPlayerTop = ((screen.availHeight / 2) -(idMediaPlayer.height / 2) - 4);
	var nClientPlayerLeft = (screen.availWidth / 2) -(idMediaPlayer.width / 2);
	idMediaPlayer.style.top = nClientPlayerTop;
	idMediaPlayer.style.left = nClientPlayerLeft;
	var nClientButtonTop = parseInt(screen.availHeight) - 58;
	var nClientButtonLeft = parseInt(screen.availWidth) - 200;
	idBackToTour.style.top = nClientButtonTop ;
	idBackToTour.style.left = nClientButtonLeft ;
	
	var nClientBodyTrayTop = parseInt(screen.availHeight / 2) - 223;
	var nClientBodyTrayLeft = parseInt(screen.availWidth / 2) - 310;
	idBodyTray.style.top = nClientBodyTrayTop;
	idBodyTray.style.left = nClientBodyTrayLeft;
	
}
function getLocalPath(sProjRoot)
{
	var sLocation 		= unescape(window.location.href.toLowerCase());
	sProjRoot 			= sProjRoot.toLowerCase();
	var sRootLoc		= "file:///";
	var nAt 			= sLocation.indexOf(sRootLoc) + sRootLoc.length;
	var nTo 			= sLocation.indexOf(sProjRoot);
	var sPath 			= sLocation.substring(nAt, nTo);
	var s = ""; var ch= "";
	
	for(i = 0; i< sPath.length; i++)
	{
		ch = sPath.charAt(i);
		ch == "/" ? (s = s + "\\") : (s = s + ch);
	}
	return s;
}
function replaceChar(sStr, ch, sNew)
{
	var c = "";
	
	for(i = 0; i< sStr.length; i++)
	{
		c = sPath.charAt(i);
		c == ch ? (s = s + sNew) : (s = s + c);
	}
	return s;
}
function WriteTopicButtonsCaption()
{
	g_aTopicButtonsList = idTopicButtonsTray.childNodes;
	
		
	for(i=0; i < g_aTopicButtonsList.length; i++)
	{
		sID = "txtTopic" + (i +1) + "Title";
		g_aTopicButtonsList.item(i).firstChild.innerHTML = getHTML(sID);
	}
}
function ClickTopicButton(nIDX)
{	
	var nClicked = idTopicButtonsTray.CURCLICK;
	idTopicButtonsTray.CURCLICK = nIDX;
	if(nClicked > 0) {
		g_aTopicButtonsList.item(nClicked -1).firstChild.nextSibling.src = getTopicButtonNormalImg(nClicked);
		g_aTopicButtonsList.item(nClicked -1).firstChild.className = "clsTopicButtonCaption";
		
	}
	
	idTextAreaTray.style.backgroundImage = getTextAreaWMKImg(nIDX);
	g_aTopicButtonsList.item(nIDX -1).firstChild.nextSibling.src = getTopicButtonClickedImg(nIDX);
	g_aTopicButtonsList.item(nIDX-1).firstChild.className = "clsTopicButtonCaptionClicked";
	ShowTopic(nIDX);
	var sMedia = setShowMeHowButton();
	if (sMedia) loadMedia(sMedia);
	
	if (idAudioPlay.STAT == 0 && idTourPlay.STAT != 3) PlaySound();
	
	SndFadeOut();
	
	if (MyTour.curScene == (MyTour.length -1))
	{
		TourPlayEVENTonclick(2);
	}
	startClock();
}
function ShowTopic(nIDX)
{
	idTopTrayText.innerHTML 	= getText("txtTopic" + nIDX + "Title");
	idTextAreaTitle.innerHTML 	= getText("txtTopic" + nIDX + "Title");
	idTextAreaText.innerHTML 	= getHTML("txtTopic" + nIDX + "Text");
	fadeIn(idTopTrayText, 2);		
	fadeIn(idTextAreaTray, 1);					
}
function setShowMeHowButton()
{
	setShowMeHowButtonCaption(true);
	if (MyTour.scenes[idTopicButtonsTray.CURCLICK -1].showMe)
	{
		idShowMeHow.style.visibility = "visible";
		return MyTour.scenes[idTopicButtonsTray.CURCLICK -1].showMe;
		
	}
	else
	{
		idShowMeHow.style.visibility = "hidden";
		return "";
	}
}
function ShowMeHow()
{
	idAudioTrack.ClearTimedAction();
	playVideo();
	idShowMeHowTrayText.innerHTML = getText("txtTopic" + idTopicButtonsTray.CURCLICK + "Title");
}
function PlaySound()
{
	idAudioTrack.SndPlay(g_sAudioPath + MyTour.scenes[idTopicButtonsTray.CURCLICK - 1].sound);
	idAudioTrack.SndFadeIn(250);
	SndFadeOut();
}
function SndFadeOut()
{
	idAudioTrack.TimedAction("SndFadeOut(125)", (MyTour.scenes[idTopicButtonsTray.CURCLICK - 1].tremaining - 4000));
}
function MuteSound()
{
	idAudioTrack.sound.src = "";
}
function playVideo()
{
	idMediaPlayer.controls.play();
}
function stopVideo()
{
	idMediaPlayer.controls.stop();
}
function showBottomTray()
{
	idBottomTray.style.visibility = "visible";
	setShowMeHowButton();	
}
function hideBottomTray()
{
	idBottomTray.style.visibility = "hidden";
	idShowMeHow.style.visibility = "hidden";
}
function loadMedia(sMedia)
{
	var sFullPath = g_sLocalPath + g_sMediaPath + sMedia;
	idMediaPlayer.URL = sFullPath;
}
function getTopicButtonClickedImg(nIDX)
{
	return g_sImgBtnTopics + "btndwn" + nIDX + ".gif";
}
function getTopicButtonOverImg(nIDX)
{
	return g_sImgBtnTopics + "btnovr" + nIDX + ".gif";
}
function getTopicButtonNormalImg(nIDX)
{
	return g_sImgBtnTopics + "btn" + nIDX + ".gif";
}
function getTextAreaWMKImg(nIDX)
{
	return "url('" + g_sImgWatermarks + "/wm" + nIDX +".gif')";
}
function setShowMeHowButtonCaption(bDisp)
{
	if (bDisp) idShowMeHowText.innerHTML = getHTML("btnShowMeHowCaption"); else idShowMeHowText.innerHTML = "";
}
function fadeIn(oObj, tDur)
{
	if (tDur == 0)
	{
		oObj.style.visibility="visible";
	}
	else
	{
	    oObj.style.filter="blendTrans(duration=" + tDur + ")";
	    if (oObj.filters.blendTrans.status != 2)
	    {
	    	oObj.style.visibility="hidden";
	        oObj.filters.blendTrans.apply();
	        oObj.style.visibility="visible";
	        oObj.filters.blendTrans.play();
	    }
}
}
function fadeOut(oObj, tDur)
{
	if (tDur == 0)
	{
		oObj.style.visibility="hidden";
	}
	else
	{
	    oObj.style.filter="blendTrans(duration=" + tDur + ")";
	    if (oObj.filters.blendTrans.status != 2)
	    {
	    	oObj.style.visibility="visible";
	        oObj.filters.blendTrans.apply();
	        oObj.style.visibility="hidden";
	        oObj.filters.blendTrans.play();
	    }
}
}
function startClock()
{
	pauseClock();
	if(MyTour.scenes[MyTour.curScene])
	{
		g_CurTime = (MyTour.scenes[MyTour.curScene].tremaining /1000);
		g_ClockInterval = setInterval("getElapsedTime()", 1000);
		g_CurTick = 0;
		getElapsedTime();
	}
}
function stopClock()
{
	if (g_ClockInterval) clearInterval(g_ClockInterval);
	g_ClockInterval = 0;
	g_CurTick = 0;
	
}
function pauseClock()
{
	clearInterval(g_ClockInterval);
	g_ClockInterval = 0;
}
function resumeClock()
{
	pauseClock();
	
	g_ClockInterval = setInterval("getElapsedTime()", 1000);
}
function getElapsedTime()
{
	var time 	= Math.ceil(g_CurTime - (++g_CurTick));
	var s	= "";
	if (time > 9)
	{
		s = "00:";	/* LOCALIZATION, if required to localize numerals displayed this variable should also be localized */
	}
	else
	{
		s = "00:0";	/* LOCALIZATION, if required to localize numerals displayed this variable should also be localized */		
	}
	if(time >= 0)
	{
		idTimeElapsed.innerText = s + time;
	}
}
function clearClockDisplay()
{
	idTimeElapsed.innerText = "" ;
}
