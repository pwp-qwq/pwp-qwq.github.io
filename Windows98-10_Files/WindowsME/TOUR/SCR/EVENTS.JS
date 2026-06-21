function TopicButtonEVENTonmouseover(nIDX)
{
	if(idTopicButtonsTray.CURCLICK != nIDX)
	{
		g_aTopicButtonsList.item(nIDX-1).firstChild.className = "clsTopicButtonCaptionMouseOver"; 		
		g_aTopicButtonsList.item(nIDX-1).firstChild.nextSibling.src = getTopicButtonOverImg(nIDX);
	}
}
function TopicButtonEVENTonmouseout(nIDX)
{	
	if(idTopicButtonsTray.CURCLICK != nIDX)
	{
		g_aTopicButtonsList.item(nIDX-1).firstChild.className = "clsTopicButtonCaption";
		g_aTopicButtonsList.item(nIDX-1).firstChild.nextSibling.src = getTopicButtonNormalImg(nIDX);
	}
}
function TopicButtonEVENTonclick(nIDX)
{
	if (idTopicButtonsTray.CURCLICK == nIDX) return;
	
	if (idTourPlay.STAT == 0 || idTourPlay.STAT == 4 )
	{
		ClickTopicButton(nIDX);
		stopClock();
		clearClockDisplay();
	}
	else if (idTourPlay.STAT == 1)
	{
		MyTour.clearAllSetRemaining();
		MyTour.setScene(nIDX -1);
		MyTour.playScene();
	}
}
function ShowMeHowEVENTonmouseover()
{
	idShowMeHowText.innerText		= getText("btnShowMeHowCaption");
	idShowMeHowImg.src 				= g_sImgTourControls + "shwmeovr.gif";
}
function ShowMeHowEVENTonmouseout()
{
	idShowMeHowText.innerText		= getText("btnShowMeHowCaption");
	idShowMeHowImg.src 				= g_sImgTourControls + "wmpshwme.gif";
}
function ShowMeHowEVENTonclick()
{	
	hideBottomTray();
	
	if (idTourPlay.STAT == 1)
	{
	 	idTourPlay.STAT = 3;
	 	MyTour.pause();
	}	
	fadeIn(idShowMeHowTray, 0);
	ShowMeHow();
}
function AudioPlayEVENTonmouseover(nSTAT)
{	
	if (nSTAT == 0)													
	{
		idAudioPlayText.innerHTML = getHTML("btnAudioPauseCaption");
	 	idAudioPlayImg.src = g_sImgTourControls + "audioovr.gif";
	}
	else if (nSTAT == 1)
	{
		idAudioPlayText.innerHTML = getHTML("btnAudioPlayCaption");
	 	idAudioPlayImg.src = g_sImgTourControls + "wmpmute.gif";
	}
}
function AudioPlayEVENTonmouseout(nSTAT)
{	
	if (nSTAT == 0)
	{
		idAudioPlayText.innerHTML = getHTML("btnAudioPauseCaption");
		idAudioPlayImg.src = g_sImgTourControls + "wmpaudio.gif";
	}
	else if (nSTAT == 1)
	{
		idAudioPlayText.innerHTML = getHTML("btnAudioPlayCaption");
		idAudioPlayImg.src = g_sImgTourControls + "wmpmute.gif";
	}
}
function AudioPlayEVENTonclick(nSTAT)
{	
	if(nSTAT == 0)
	{
		idAudioPlay.STAT = 1;
		MuteSound();
		idAudioPlayText.innerHTML = getHTML("btnAudioPlayCaption");
		idAudioPlayImg.src = g_sImgTourControls + "wmpmute.gif";
	}
	else if(nSTAT == 1)
	{
		idAudioPlay.STAT = 0;
		PlaySound();
		idAudioPlayText.innerHTML = getHTML("btnAudioPauseCaption");
		idAudioPlayImg.src = g_sImgTourControls + "wmpaudio.gif";
	}
}
function TourPlayEVENTonmouseover(nSTAT)
{
	if (nSTAT == 0 || nSTAT == 4)
	{
		idTourPlayText.innerHTML = getHTML("btnTourPlayCaption");
		idTourPlayImg.src = g_sImgTourControls + "playovr.gif";
	}
	else if (nSTAT == 1)
	{
		idTourPlayText.innerHTML = getHTML("btnTourPauseCaption");
		idTourPlayImg.src = g_sImgTourControls + "pauseovr.gif";
	}
}
function TourPlayEVENTonmouseout(nSTAT)
{
	if (nSTAT == 0 || nSTAT == 4)
	{
		idTourPlayText.innerHTML = getHTML("btnTourPlayCaption");
		idTourPlayImg.src = g_sImgTourControls + "wmpplay.gif";
	}
	else if (nSTAT == 1)
	{
		idTourPlayText.innerHTML = getHTML("btnTourPauseCaption");
		idTourPlayImg.src = g_sImgTourControls + "wmppause.gif";
	}
}
function TourPlayEVENTonclick(nSTAT)
{
	if (nSTAT == 0)
	{
		MyTour.nextScene = true;
		MyTour.playScene();
		SndFadeOut();
		idTourPlayText.innerHTML = getHTML("btnTourPauseCaption");
		idTourPlayImg.src = g_sImgTourControls + "pauseovr.gif";
		idTourPlay.STAT = 1;
		resumeClock();
	}
	else if (nSTAT == 1)
	{
		idTourPlay.STAT = 0;
		MyTour.pause();
		idTourPlayText.innerHTML = getHTML("btnTourPlayCaption");
		idTourPlayImg.src = g_sImgTourControls + "playovr.gif";
		idAudioTrack.ClearTimedAction();
		pauseClock();
	}
	else if(nSTAT == 2)
	{
		idTourPlay.STAT = 4;
		idTourPlayText.innerHTML = getHTML("btnTourPlayCaption");
		idTourPlayImg.src = g_sImgTourControls + "wmpplay.gif";
	}
	else if(nSTAT == 4)
	{
		idTourPlay.STAT = 1;
		MyTour.start();
	}
}
function TourExitEVENTonmouseover()
{
	idTourExitImg.src = g_sImgTourControls + "exitovr.gif";
}
function TourExitEVENTonmouseout()
{
	idTourExitImg.src = g_sImgTourControls + "wmpexit.gif";
}
function TourExitEVENTonclick()
{	
	window.close();
}
function BackToTourEVENTonclick()
{
	stopVideo();
	idShowMeHowTray.style.visibility 	= "hidden";
	showBottomTray();
	
	if (idTourPlay.STAT == 3)
	{
		MyTour.playScene();
		idTourPlay.STAT = 1;
	}
	ShowTopic(idTopicButtonsTray.CURCLICK);
}
