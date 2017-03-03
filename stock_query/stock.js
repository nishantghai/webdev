function getStockQuote()
{
    //get the value of input text
    var input_symbol = $('#input-text-stock-ticker').val().trim();

    if( input_symbol === '' )
    {
        $('#result-para').text('Please enter valid US stock symbol.');
    }
    else
    {

        $('#result-para').text('Loading...');

        //  http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=AAPL&callback=myFunction

        var api_url = 'http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=' + input_symbol + '&callback=?';
        
        $.getJSON( api_url , function(result){
            //response data are now in the result variable
            console.log(  result.Name  ) ;
            console.log(  result.Symbol  ) ;
            console.log( result.LastPrice );


            $('#result-para').html('Stock price of ' + result.Name + ' ( ' + result.Symbol + ' ) : <b>' + result.LastPrice  + '</b>' );
            $('#result-para').append("<br>Change : "+ result.Change + "</i>");
            $('#result-para').append("<br>Change % : "+ result.ChangePercent + "</i>");
            $('#result-para').append("<br><br><i>Last time: "+ result.Timestamp + "</i>");
        });


    }

    //clear the input box
    $('#input-text-stock-ticker').val('');
}




$('#get-quote-button').click( function(){
	getStockQuote();
}); 