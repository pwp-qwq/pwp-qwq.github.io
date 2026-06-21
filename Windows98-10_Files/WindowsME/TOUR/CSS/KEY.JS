/*
** Copyright (c) 2000 Microsoft Corporation
*/

function HandleKeys (Key,K_Shift,K_Alt,K_Ctrl)
{
	bigstr = Key
	bigstr = bigstr + "\nShift: " + K_Shift 
	bigstr = bigstr + "\n Alt: " + K_Alt
	bigstr = bigstr + "\n Ctrl: " + K_Ctrl
		
	
	if(K_Shift==true)  
	{  
   		
		if (Key==88)
   		{
   			window.top.close();      
   		}
		
		if (Key==87)
   		{
   			window.document.frames("menu").location="wh_menu.htm"; 
			window.document.frames("content").location="wh_infra.htm";	      
   		}
   
   		if (Key==71)
   		{
   			window.document.frames("menu").location="ge_menu.htm"; 
			window.document.frames("content").location="ge_infra.htm";		       
   		}   
      
   		if (Key==69)
   		{
   			window.document.frames("menu").location="en_menu.htm"; 
			window.document.frames("content").location="en_infra.htm";		       
		}
   
   		if (Key==72)
   		{
   			window.document.frames("menu").location="in_menu.htm"; 
			window.document.frames("content").location="in_infra.htm";		       
		}	 	  				 
	   	
	}
	
} //end of Handlekeys


