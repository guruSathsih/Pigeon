function getBaseURL() {
    var url = location.href;  // entire url including querystring - also: window.location.href; 
	if(url.indexOf("http://localhost") != -1){
		return "http://localhost:8090/pigeon/rest/api.php";
	}else{
		return "http://creatustent.com/pigeon/rest/api.php";
	}
}
 

function hideFormMessages()
{
    $('.error').fadeOut('fast');
}

function showMessage(message)
{
	$('.error').html(message);
	$('.error').fadeIn('fast');
	clearTimeout(top.timerId);
    top.timerId = setTimeout(hideFormMessages, 5000);
}

function doSignUp()
{	
	if(($.trim($('#name').val()) == '' ||  $.trim($('#name').val()) == '')){ 
		showMessage('Please Enter Your Name');
		$('#name').select();
		return false;
	}else if( ($.trim($('#mob-num').val()) == '' ||  $.trim($('#mob-num').val()) == '') )
	{ 
		showMessage('Please Enter Mobile Num');
		$('#mob-num').select();
		return false;	
	}
	else if( ($.trim($('#email').val()) != '' &&  $.trim($('#email').val()) == '')&&(!IsEmail($.trim($('#email').val()))) )
	{
		showMessage('Email Address Invalid');
		$('#email').select();
		return false;
	}
	else if( ($.trim($('#pword').val()) == '' ||  $.trim($('#pword').val()) == 'Password') )
	{ 
		showMessage('Please Enter Password');
		$('#pword').select();
		return false;	
	}
	else if( ($.trim($('#re-pword').val()) == '' ||  $.trim($('#re-pword').val()) == 'Password') )
	{
		//$("#divMessage").html('Email ID is required');
		showMessage('Please Re-Type password');
		$('#re-pword').select();
		return false;
	}
	else if( ($.trim($('#pword').val()).length <5 ) )
	{ 
		showMessage('Password needs to be atleast 5 characters long');
		$('#pword').select();
		return false;
	}
	else if( $.trim($('#pword').val()) != $.trim($('#re-pword').val()) )
	{
		//$("#divMessage").html('Email ID is required');
		showMessage('Passwords Do not match');
		$('#re-pword').select();
		return false;
	}
	else 
	{ 
		startPageLoad();
		$.ajax({
			type:'POST',
			//url:"/spillmobile/process/api.php?rquest=login",
			url:getBaseURL()+"?rquest=signuppigeon",
			data: $("#signupform").serialize(),
			//dataType: 'json',
			success:function(responseText){ 
					endPageLoad();
					window.location.href= 'home.html';
					/*if(responseText > 0)
					{
						if(actionPending == "response")
						{
							$("#loginPopup").popup("close");
							showSuccessMessage("Response submitted. Thanks!");
							submitResponse();
							loadSpill();
							actionPending = null;
						}
						else if(actionPending == "hug")
						{
							loadSpill();
							actionPending = null;
						}
						else
						{
							window.location.href= getBaseURL()+'home.html';
						}
					}
					else
					{
						showMessage("Sign up failed. Please check your details..");
					}*/
					/*$.each(responseText, function(key, value){
						$("#result").html('Logged User: ' + value);   					
					});*/		
			},			
			failed:function(responseText)
			{
				endPageLoad();
				//alert(responseText);
				$.each(responseText, function(i,item)
				{
					alert(item);
				});
				//$("#divMessage").html(responseText);   					
			}
		});/*
		return false;*/
	}
}

function startPageLoad()
{
	$("#pagedimmer").show();
	$('#pagedimmer').animate({'opacity': .8}, 0);
	$.mobile.loading( 'show', {
		text: 'foo',
		textVisible: false,
		theme: 'e',
		//html: "Loading..."
	});
}

function endPageLoad()
{
	$("#pagedimmer").hide();
	$.mobile.loading( 'hide', {
		text: 'foo',
		textVisible: true,
		theme: 'a',
		html: "Loading..."
	});
}

function IsEmail(email) 
{
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function doLogin(){
		if( ($.trim($('#mob-num').val()) == '' ||  $.trim($('#mob-num').val()) == '') )
		{ 
			showMessage('Please Enter Mobile Num');
			$('#mob-num').select();
			return false;	
		}else if( ($.trim($('#pword').val()) == '' ||  $.trim($('#pword').val()) == 'Password') )
		{ 
			showMessage('Please Enter Password');
			$('#pword').select();
			return false;	
		}
		else {
			startPageLoad();
			$.ajax({
				type:'POST', 
				url:getBaseURL()+"?rquest=login",
				data: $("#login").serialize(),
				//dataType: 'json',
				success:function(responseText){
						endPageLoad(); 
						if(responseText == 0)
						{ 
							showMessage("Invalid User Credentials");
						}
						else
						{ 
							localStorage.setItem('userId',responseText.mobile_no);
							window.location.href= 'home.html';
						} 		
				},			
			});
			return false;
		}
}

function loadAllPigeons(){
	content = null; 
	startPageLoad();
			$.ajax({
				type:'POST', 
				url:getBaseURL()+"?rquest=loadPigeons",  
				data:{'userId':localStorage.getItem('userId')},
				success:function(responseText){ 
						if(responseText == 0)
						{ 
							showMessage("No Pigeons are Available !!!");
						}
						else
						{ 
							$("#pigeons").html(responseText);
							$("#pigeons").trigger('create'); 
						} 		
						endPageLoad(); 
				},			
			});
}

function isUser(){
	userId = localStorage.getItem('userId'); 
	if(userId.length > 0){
		return 1;
	}else{
		window.location.href = "login.html";
	}
}